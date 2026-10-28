import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";
import { StaffDirectory } from "@/components/site/StaffDirectory";
import { prisma } from "@/lib/prisma";
import { publishedStaffWithPhotoWhere } from "@/lib/staff";

export const metadata = { title: "Kadromuz" };

export default async function StaffPage() {
  const [categories, uncategorized] = await Promise.all([
    prisma.staffCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        staff: {
          where: publishedStaffWithPhotoWhere,
          orderBy: { order: "asc" },
        },
      },
    }),
    prisma.staff.findMany({
      where: {
        ...publishedStaffWithPhotoWhere,
        categoryId: null,
      },
      orderBy: { order: "asc" },
    }),
  ]);

  const sections = [
    ...categories
      .filter((category) => category.staff.length > 0)
      .map((category) => ({
        id: category.id,
        title: category.name,
        members: category.staff
          .filter((member) => Boolean(member.photoUrl))
          .map((member) => ({
            id: member.id,
            name: member.name,
            title: member.title,
            bio: member.bio,
            photoUrl: member.photoUrl!,
          })),
      }))
      .filter((section) => section.members.length > 0),
    ...(uncategorized.length
      ? [
          {
            id: "diger",
            title: "Diğer",
            members: uncategorized
              .filter((member) => Boolean(member.photoUrl))
              .map((member) => ({
                id: member.id,
                name: member.name,
                title: member.title,
                bio: member.bio,
                photoUrl: member.photoUrl!,
              })),
          },
        ]
      : []),
  ].filter((section) => section.members.length > 0);

  return (
    <div>
      <PageHero
        eyebrow="Kadromuz"
        title="Bölgenin En İyi Eğitmenleri"
        description="Uzman kadromuzla eğitimde mükemmelliği hedefliyoruz."
      />

      <div className="mx-auto max-w-[1320px] space-y-14 px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <StaffDirectory sections={sections} />

        <div className="border-t border-[#d0dae9] pt-8 text-center">
          <Link href="/hakkimizda" className="text-sm font-semibold text-[#1363df] hover:text-[#082a5e]">
            ← Hakkımızda sayfasına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
