import { prisma } from "@/lib/prisma";

export const metadata = { title: "Programlar" };

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="brand-gradient px-4 pb-12 pt-8 text-white sm:px-5 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">Programlar</h1>
          <p className="mt-4 max-w-xl text-white/80">
            Öğrencilerimizin hedeflerine uygun yapılandırılmış eğitim programlarımız.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:space-y-10 sm:px-5 sm:py-16 md:px-8">
        {programs.map((program) => (
          <article key={program.id} className="border-t border-line pt-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-navy md:text-3xl">
              {program.title}
            </h2>
            <p className="mt-3 text-muted">{program.summary}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink/80 whitespace-pre-line">
              {program.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
