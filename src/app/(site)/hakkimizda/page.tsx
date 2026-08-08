import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";
import { prisma } from "@/lib/prisma";
import { publishedStaffWithPhotoWhere } from "@/lib/staff";

export const metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const [page, categories] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "hakkimizda" } }),
    prisma.staffCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        staff: {
          where: publishedStaffWithPhotoWhere,
          orderBy: { order: "asc" },
          take: 4,
        },
      },
    }),
  ]);

  const previewSections = categories.filter((category) => category.staff.length > 0);

  return (
    <div>
      <PageHero
        eyebrow="Kurum"
        title={page?.title ?? "Hakkımızda"}
        description="Birikimli deneyim, başarıya açılan kapıdır."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="space-y-5 whitespace-pre-line text-base leading-relaxed text-[#39557e] sm:text-lg">
          {page?.content ?? "İçerik yakında eklenecek."}
        </div>
      </div>

      <section
        id="kadromuz"
        className="border-t border-[#d0dae9] bg-[#f4f7fb] px-4 py-12 sm:px-5 sm:py-16 md:px-8"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#1363df]">Kadromuz</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#082a5e] md:text-4xl">
                Bölgenin en iyi eğitmenleri
              </h2>
              <div className="gold-rule mt-5" />
            </div>
            <Link href="/kadro" className="btn-primary">
              Tüm kadroyu gör
            </Link>
          </div>

          {previewSections.length === 0 ? (
            <p className="mt-10 text-[#39557e]">Kadro bilgileri yakında eklenecek.</p>
          ) : (
            <div className="mt-10 space-y-12">
              {previewSections.slice(0, 3).map((category) => (
                <div key={category.id}>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#082a5e]">
                    {category.name}
                  </h3>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {category.staff.map((member) => (
                      <article key={member.id} className="instructor-card overflow-hidden">
                        <div className="relative aspect-square bg-[#e7effc]">
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
                          <h4 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                            {member.name}
                          </h4>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
