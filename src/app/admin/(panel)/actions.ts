"use server";

import { revalidatePath } from "next/cache";
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

export async function saveStaff(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "");
  const title = String(formData.get("title") || "");
  const bio = String(formData.get("bio") || "");
  const photoUrl = String(formData.get("photoUrl") || "").trim() || null;
  const categoryId = String(formData.get("categoryId") || "").trim() || null;
  const order = Number(formData.get("order") || 0);
  const published = formData.get("published") === "on";

  if (!id && !photoUrl) {
    throw new Error("Yeni kadro üyesi için fotoğraf zorunludur.");
  }

  const data = {
    name,
    title,
    bio,
    photoUrl,
    order,
    published,
    categoryId,
  };

  if (id) {
    await prisma.staff.update({
      where: { id },
      data,
    });
  } else {
    await prisma.staff.create({
      data,
    });
  }
  revalidatePath("/admin/kadro");
  revalidatePath("/hakkimizda");
  revalidatePath("/kadro");
}

export async function deleteStaff(formData: FormData) {
  await requireAdmin();
  await prisma.staff.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/kadro");
  revalidatePath("/hakkimizda");
  revalidatePath("/kadro");
}

export async function saveStaffCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const order = Number(formData.get("order") || 0);
  if (!name) throw new Error("Kategori adı gerekli.");

  const slugBase = slugify(name);
  const slug = slugBase || `kategori-${Date.now()}`;

  if (id) {
    await prisma.staffCategory.update({
      where: { id },
      data: { name, order },
    });
  } else {
    await prisma.staffCategory.create({
      data: { name, slug, order },
    });
  }
  revalidatePath("/admin/kadro");
  revalidatePath("/kadro");
  revalidatePath("/hakkimizda");
}

export async function deleteStaffCategory(formData: FormData) {
  await requireAdmin();
  await prisma.staffCategory.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/kadro");
  revalidatePath("/kadro");
  revalidatePath("/hakkimizda");
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

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id: String(formData.get("id")) },
    data: { read: true },
  });
  revalidatePath("/admin/mesajlar");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/mesajlar");
}
