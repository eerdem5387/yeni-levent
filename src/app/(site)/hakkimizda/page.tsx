import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const [page, staff] = await Promise.all([
    prisma.page.findUnique({ where: { slug: "hakkimizda" } }),
    prisma.staff.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div>
      <div className="brand-gradient px-4 pb-12 pt-8 text-white sm:px-5 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">
            {page?.title ?? "Hakkımızda"}
          </h1>
          <div className="gold-rule mt-5" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="space-y-5 whitespace-pre-line text-lg leading-relaxed text-muted">
          {page?.content ?? "İçerik yakında eklenecek."}
        </div>
      </div>

      <section id="kadromuz" className="border-t border-line bg-surface/50 px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-navy md:text-4xl">
            Kadromuz
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Birikimli deneyim, başarıya açılan kapıdır.
          </p>
          <div className="gold-rule mt-5" />
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
            {staff.map((member) => (
              <article key={member.id} className="border-t border-gold pt-6">
                <div className="relative mb-4 aspect-square overflow-hidden bg-navy/10">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-navy text-4xl text-gold-light">
                      {member.name.charAt(0)}
                    </div>
                  )}
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
