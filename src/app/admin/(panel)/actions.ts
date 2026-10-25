"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Yetkisiz");
}

export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const content = String(formData.get("content") || "");
  const coverImage = String(formData.get("coverImage") || "") || null;
  const published = formData.get("published") === "on";
  const slug = slugify(title);
  const categoryIds = formData.getAll("categoryIds").map(String);
  const categoryWhereUniques = categoryIds.map((categoryId) => ({ id: categoryId }));

  // NOTE: Prisma nested inputs for `create` don't support `set` (only `connect/create`),
  // while `update` supports `set`. Bu yüzden iki ayrı nested input hazırlıyoruz.
  const categoriesCreate =
    categoryWhereUniques.length > 0 ? { connect: categoryWhereUniques } : undefined;
  const categoriesUpdate = { set: categoryWhereUniques };

  if (id) {
    await prisma.event.update({
      where: { id },
      data: { title, slug, content, coverImage, published, categories: categoriesUpdate },
    });
  } else {
    const excerpt = content.trim().slice(0, 200) || title;
    await prisma.event.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        location: "",
        eventDate: new Date(),
        coverImage,
        published,
        ...(categoriesCreate ? { categories: categoriesCreate } : {}),
      },
    });
  }
  revalidatePath("/admin/etkinlikler");
  revalidatePath("/etkinlikler");
  revalidatePath("/");
}

export async function saveEventCategory(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") || "").trim();
  if (!name) return;

  const slug = slugify(name);
  const existing = await prisma.eventCategory.findUnique({ where: { slug } });
  if (existing) return;

  await prisma.eventCategory.create({ data: { name, slug } });
  revalidatePath("/admin/etkinlikler");
}

export async function deleteEventCategory(formData: FormData) {
  await requireAdmin();
  await prisma.eventCategory.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/etkinlikler");
  revalidatePath("/etkinlikler");
  revalidatePath("/");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  await prisma.event.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/etkinlikler");
  revalidatePath("/etkinlikler");
  revalidatePath("/");
}

export async function saveProgram(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "");
  const summary = String(formData.get("summary") || "");
  const description = String(formData.get("description") || "");
  const order = Number(formData.get("order") || 0);
  const published = formData.get("published") === "on";
  const slug = slugify(String(formData.get("slug") || title));

  if (id) {
    await prisma.program.update({
      where: { id },
      data: { title, slug, summary, description, order, published },
    });
  } else {
    await prisma.program.create({
      data: { title, slug, summary, description, order, published },
    });
  }
  revalidatePath("/admin/programlar");
  revalidatePath("/programlar");
  revalidatePath("/");
}

export async function deleteProgram(formData: FormData) {
  await requireAdmin();
  await prisma.program.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/programlar");
  revalidatePath("/programlar");
  revalidatePath("/");
}

function revalidateStaffPaths() {
  revalidatePath("/admin/kadro");
  revalidatePath("/hakkimizda");
  revalidatePath("/kadro");
}

async function nextStaffOrder(categoryId: string | null) {
  const max = await prisma.staff.aggregate({
    where: { categoryId },
    _max: { order: true },
  });
  return (max._max.order ?? 0) + 1;
}

async function reindexStaffInCategory(categoryId: string | null) {
  const members = await prisma.staff.findMany({
    where: { categoryId },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  if (members.length === 0) return;
  await prisma.$transaction(
    members.map((member, index) =>
      prisma.staff.update({ where: { id: member.id }, data: { order: index + 1 } }),
    ),
  );
}

async function reindexStaffCategories() {
  const categories = await prisma.staffCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  if (categories.length === 0) return;
  await prisma.$transaction(
    categories.map((category, index) =>
      prisma.staffCategory.update({
        where: { id: category.id },
        data: { order: index + 1 },
      }),
    ),
  );
}

export async function saveStaff(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const title = String(formData.get("title") || "");
  const photoUrl = String(formData.get("photoUrl") || "").trim() || null;
  const categoryId = String(formData.get("categoryId") || "").trim() || null;
  const published = formData.get("published") === "on";

  if (!id && !photoUrl) {
    throw new Error("Yeni kadro üyesi için fotoğraf zorunludur.");
  }

  if (id) {
    const existing = await prisma.staff.findUnique({ where: { id } });
    if (!existing) throw new Error("Üye bulunamadı.");

    const categoryChanged = existing.categoryId !== categoryId;
    await prisma.staff.update({
      where: { id },
      data: {
        name,
        title,
        photoUrl,
        published,
        categoryId,
        ...(categoryChanged ? { order: await nextStaffOrder(categoryId) } : {}),
      },
    });
    if (categoryChanged) {
      await reindexStaffInCategory(existing.categoryId);
      await reindexStaffInCategory(categoryId);
    }
  } else {
    await prisma.staff.create({
      data: {
        name,
        title,
        bio: "",
        photoUrl,
        order: await nextStaffOrder(categoryId),
        published,
        categoryId,
      },
    });
  }
  revalidateStaffPaths();
  redirect("/admin/kadro");
}

export async function deleteStaff(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const existing = await prisma.staff.findUnique({ where: { id } });
  await prisma.staff.delete({ where: { id } });
  if (existing) await reindexStaffInCategory(existing.categoryId);
  revalidateStaffPaths();
}

export async function moveStaff(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const direction = String(formData.get("direction") || "");
  if (direction !== "up" && direction !== "down") return;

  const member = await prisma.staff.findUnique({ where: { id } });
  if (!member) return;

  const siblings = await prisma.staff.findMany({
    where: { categoryId: member.categoryId },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  const index = siblings.findIndex((item) => item.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= siblings.length) return;

  const ordered = [...siblings];
  const [item] = ordered.splice(index, 1);
  ordered.splice(target, 0, item);

  await prisma.$transaction(
    ordered.map((entry, i) =>
      prisma.staff.update({ where: { id: entry.id }, data: { order: i + 1 } }),
    ),
  );
  revalidateStaffPaths();
}

export async function saveStaffCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Kategori adı gerekli.");

  const slugBase = slugify(name);
  const slug = slugBase || `kategori-${Date.now()}`;

  if (id) {
    await prisma.staffCategory.update({
      where: { id },
      data: { name },
    });
  } else {
    const max = await prisma.staffCategory.aggregate({ _max: { order: true } });
    await prisma.staffCategory.create({
      data: { name, slug, order: (max._max.order ?? 0) + 1 },
    });
  }
  revalidateStaffPaths();
}

export async function moveStaffCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const direction = String(formData.get("direction") || "");
  if (direction !== "up" && direction !== "down") return;

  const categories = await prisma.staffCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  const index = categories.findIndex((item) => item.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || target < 0 || target >= categories.length) return;

  const ordered = [...categories];
  const [item] = ordered.splice(index, 1);
  ordered.splice(target, 0, item);

  await prisma.$transaction(
    ordered.map((entry, i) =>
      prisma.staffCategory.update({ where: { id: entry.id }, data: { order: i + 1 } }),
    ),
  );
  revalidateStaffPaths();
}

export async function deleteStaffCategory(formData: FormData) {
  await requireAdmin();
  await prisma.staffCategory.delete({ where: { id: String(formData.get("id")) } });
  await reindexStaffCategories();
  revalidateStaffPaths();
}

export async function savePage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const title = String(formData.get("title") || "");
  const content = String(formData.get("content") || "");
  await prisma.page.update({ where: { id }, data: { title, content } });
  revalidatePath("/admin/sayfalar");
  revalidatePath("/hakkimizda");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: {
      siteName: String(formData.get("siteName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      heroTitle: String(formData.get("heroTitle") || ""),
      heroSubtitle: String(formData.get("heroSubtitle") || ""),
      aboutPreview: String(formData.get("aboutPreview") || ""),
    },
    create: {
      id: "main",
      siteName: String(formData.get("siteName") || "Levent Koleji"),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      address: String(formData.get("address") || ""),
      heroTitle: String(formData.get("heroTitle") || ""),
      heroSubtitle: String(formData.get("heroSubtitle") || ""),
      aboutPreview: String(formData.get("aboutPreview") || ""),
    },
  });
  revalidatePath("/admin/ayarlar");
  revalidatePath("/");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/mesajlar");
}

export async function deleteCompetitionApplication(formData: FormData) {
  await requireAdmin();
  await prisma.competitionApplication.delete({
    where: { id: String(formData.get("id")) },
  });
  revalidatePath("/admin/yarisma-basvurulari");
  revalidatePath("/admin");
}

export async function deleteTripApplication(formData: FormData) {
  await requireAdmin();
  await prisma.tripApplication.delete({
    where: { id: String(formData.get("id")) },
  });
  revalidatePath("/admin/gezi-basvurulari");
  revalidatePath("/admin");
}
