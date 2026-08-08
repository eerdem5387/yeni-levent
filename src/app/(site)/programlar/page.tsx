import { PageHero } from "@/components/site/HomeSections";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Programlar" };

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <PageHero
        eyebrow="Eğitim"
        title="Programlar"
        description="Öğrencilerimizin hedeflerine uygun yapılandırılmış eğitim programlarımız."
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:space-y-8 sm:px-5 sm:py-16 md:px-8">
        {programs.map((program) => (
          <article
            key={program.id}
            className="border border-line bg-white px-5 py-7 sm:px-6 sm:py-8"
          >
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-navy md:text-3xl">
              {program.title}
            </h2>
            <p className="mt-3 font-medium text-crimson">{program.summary}</p>
            <p className="mt-4 max-w-3xl whitespace-pre-line leading-relaxed text-muted">
              {program.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
