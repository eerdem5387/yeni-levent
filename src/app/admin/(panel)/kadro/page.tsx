import { StaffAdminClient } from "@/components/admin/StaffAdminClient";
import { prisma } from "@/lib/prisma";

export default async function AdminStaffPage() {
  const [staff, categories] = await Promise.all([
    prisma.staff.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { category: true },
    }),
    prisma.staffCategory.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <StaffAdminClient
      staff={staff.map((member) => ({
        id: member.id,
        name: member.name,
        title: member.title,
        photoUrl: member.photoUrl,
        order: member.order,
        published: member.published,
        categoryId: member.categoryId,
        category: member.category
          ? { id: member.category.id, name: member.category.name }
          : null,
      }))}
      categories={categories.map((category) => ({
        id: category.id,
        name: category.name,
        order: category.order,
      }))}
    />
  );
}
