import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";
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
        members: category.staff,
      })),
    ...(uncategorized.length
      ? [{ id: "diger", title: "Diğer", members: uncategorized }]
      : []),
  ];

  return (
    <div>
      <PageHero
        eyebrow="Kadromuz"
        title="Bölgenin En İyi Eğitmenleri"
        description="Uzman kadromuzla eğitimde mükemmelliği hedefliyoruz."
      />

      <div className="mx-auto max-w-[1320px] space-y-14 px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        {sections.length === 0 ? (
          <p className="text-[#39557e]">Kadro bilgileri yakında eklenecek.</p>
        ) : (
          sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e] sm:text-3xl">
                {section.title}
              </h2>
              <div className="gold-rule mt-4" />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.members.map((member) => (
                  <article key={member.id} className="instructor-card overflow-hidden">
                    <div className="relative aspect-[4/5] bg-[#e7effc]">
                      <Image
                        src={member.photoUrl!}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized={member.photoUrl!.startsWith("http")}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm font-medium text-[#1363df]">{member.title}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                        {member.name}
                      </h3>
                      {member.bio ? (
                        <p className="mt-2 text-sm leading-relaxed text-[#39557e]">{member.bio}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        )}

        <div className="border-t border-[#d0dae9] pt-8 text-center">
          <Link href="/hakkimizda" className="text-sm font-semibold text-[#1363df] hover:text-[#082a5e]">
            ← Hakkımızda sayfasına dön
          </Link>
        </div>
      </div>
    </div>
  );
}
