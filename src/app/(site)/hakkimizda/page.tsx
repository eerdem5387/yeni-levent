import Image from "next/image";
import { PageHero } from "@/components/site/HomeSections";
import { prisma } from "@/lib/prisma";
import { publishedStaffWithPhotoWhere } from "@/lib/staff";

export const metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const [page, staff] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "hakkimizda" } }),
    prisma.staff.findMany({
      where: publishedStaffWithPhotoWhere,
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="Kurum"
        title={page?.title ?? "Hakkımızda"}
        description="Birikimli deneyim, başarıya açılan kapıdır."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="space-y-5 whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg">
          {page?.content ?? "İçerik yakında eklenecek."}
        </div>
      </div>

      <section
        id="kadromuz"
        className="border-t border-line bg-surface/50 px-4 py-12 sm:px-5 sm:py-16 md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson">
            Kadromuz
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-navy md:text-4xl">
            Bölgenin en iyi eğitmenleri
          </h2>
          <div className="gold-rule mt-5" />
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
            {staff.length === 0 && (
              <p className="text-muted sm:col-span-2 md:col-span-3">
                Kadro bilgileri yakında eklenecek.
              </p>
            )}
            {staff.map((member) => (
              <article key={member.id} className="border border-line bg-white p-4 pt-5 sm:p-5">
                <div className="relative mb-4 aspect-square overflow-hidden bg-navy/10">
                  <Image
                    src={member.photoUrl!}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-crimson">{member.title}</p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
