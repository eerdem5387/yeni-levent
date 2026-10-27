import { PageHero } from "@/components/site/HomeSections";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Hakkımızda" };

export default async function AboutPage() {
  const page = await prisma.page.findUnique({ where: { slug: "hakkimizda" } });

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
    </div>
  );
}
