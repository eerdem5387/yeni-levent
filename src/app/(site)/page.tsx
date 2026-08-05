import Image from "next/image";
import Link from "next/link";
import { EducatorsSection } from "@/components/site/EducatorsSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [settings, programs, events] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "main" } }),
    prisma.program.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "desc" },
      take: 3,
    }),
  ]);

  const heroTitle = settings?.heroTitle ?? "Levent Koleji";
  const heroSubtitle =
    settings?.heroSubtitle ??
    "Öğrencilerimizi en yüksek başarıya ulaştırmak için uzman kadromuzla yanınızdayız.";
  const aboutPreview =
    settings?.aboutPreview ??
    "Bölgenin köklü eğitim kurumlarından biri olarak akademik başarıyı ve karakter gelişimini birlikte büyütüyoruz.";

  return (
    <>
      <section className="brand-gradient relative min-h-[100svh] overflow-hidden text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(192,0,12,0.35) 40.5%, rgba(192,0,12,0.35) 52%, transparent 52.5%), linear-gradient(115deg, transparent 55%, rgba(0,48,72,0.5) 55.5%, rgba(0,48,72,0.5) 68%, transparent 68.5%)",
          }}
        />
        <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-end gap-6 px-4 pb-0 pt-8 sm:gap-8 sm:px-5 sm:pt-10 md:items-center md:px-8 md:pb-0 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="max-w-2xl pb-8 sm:pb-12 md:pb-24 lg:pb-20">
            <div className="animate-fade mb-4 sm:mb-6">
              <Image
                src="/logo.png"
                alt="Levent Koleji"
                width={96}
                height={96}
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
                priority
              />
            </div>
            <h1 className="animate-rise font-[family-name:var(--font-display)] text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">
              {heroTitle}
            </h1>
            <div className="animate-rise-delay gold-rule mt-4 sm:mt-6" />
            <p className="animate-rise-delay mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg md:text-xl">
              {heroSubtitle}
            </p>
            <div className="animate-rise-delay-2 mt-6 flex flex-wrap gap-3 sm:mt-10">
              <Link
                href="/iletisim"
                className="bg-crimson px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-crimson-soft"
              >
                İletişime Geçin
              </Link>
              <Link
                href="/programlar"
                className="border border-white/35 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
              >
                Programları İncele
              </Link>
            </div>
          </div>

          <div className="animate-fade relative mx-auto flex w-full items-end justify-center lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:w-[58%] lg:max-w-none lg:justify-end lg:translate-x-[8%] xl:translate-x-[14%]">
            <div className="hero-student-mask relative z-10 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[620px] xl:max-w-[700px]">
              <Image
                src="/anasayfa.png"
                alt="Levent Koleji öğrencisi"
                width={900}
                height={1200}
                className="h-auto w-full max-h-[45vh] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,36,60,0.35)] mix-blend-lighten sm:max-h-[55vh] md:max-h-[70vh] lg:max-h-[92vh]"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 700px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson">Kurum</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-navy md:text-4xl">
            Başarı bizim DNA&apos;mızın bir parçası
          </h2>
          <div className="gold-rule mt-5" />
          <p className="mt-6 text-lg leading-relaxed text-muted">{aboutPreview}</p>
          <Link
            href="/hakkimizda"
            className="mt-8 inline-flex text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            Hakkımızda daha fazla
          </Link>
        </div>
      </section>

      <EducatorsSection />

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
              Programlar
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Eğitim kademelerimiz
            </h2>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <article key={program.id} className="border-t border-gold/50 pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl">{program.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{program.summary}</p>
              </article>
            ))}
          </div>
          <Link
            href="/programlar"
            className="mt-10 inline-flex text-sm font-semibold text-gold-light hover:text-white"
          >
            Tüm programlar →
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-surface">
        <div
          className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--gold-light) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-8 h-48 w-48 opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--crimson) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:gap-12 sm:px-5 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center md:px-8">
          <div>
            <p className="inline-block bg-navy/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Benzersiz Eğitim Anlayışı
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight text-navy md:text-4xl">
              Karşınızda{" "}
              <span className="relative inline-block">
                Levent College Concept
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--gold), var(--gold-light), transparent)",
                  }}
                  aria-hidden
                />
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Eğitimde öğrencilerimizi en yüksek başarıya ulaştırmak için uzman
              kadromuzla geliştirdiğimiz Levent College Concept.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {conceptFeatures.map((feature) => (
              <article
                key={feature.title}
                className="group flex flex-col items-center border border-line bg-cream/60 px-4 py-6 text-center transition duration-300 hover:border-gold/50 hover:bg-cream sm:py-7 lg:col-span-2 lg:[&:nth-child(1)]:col-start-2 lg:[&:nth-child(2)]:col-start-4 lg:[&:nth-child(3)]:col-start-1 lg:[&:nth-child(4)]:col-start-3 lg:[&:nth-child(5)]:col-start-5"
              >
                <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-gold-light shadow-[0_0_0_4px_rgba(0,48,72,0.08)] transition duration-300 group-hover:bg-navy-soft group-hover:text-gold-light">
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-base leading-snug text-navy">
                  {feature.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson">
              Etkinlikler
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-navy md:text-4xl">
              Etkinliklerimiz
            </h2>
          </div>
          <Link href="/etkinlikler" className="text-sm font-semibold text-navy hover:text-crimson">
            Tümü →
          </Link>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="border-b border-line pb-6">
              <time className="text-xs uppercase tracking-wider text-muted">
                {new Date(event.eventDate).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl text-navy">
                <Link href={`/etkinlikler/${event.slug}`} className="hover:text-crimson">
                  {event.title}
                </Link>
              </h3>
              {event.location && (
                <p className="mt-1 text-sm font-medium text-crimson">{event.location}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted">{event.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

const conceptFeatures = [
  {
    title: "Katman Rehberlik",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M33 14c3.5.5 6 3.5 6 7v2.5a2.5 2.5 0 0 1-2.5 2.5H35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="36.5" cy="21" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Akademik Takip",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path
          d="M16 8h16a2 2 0 0 1 2 2v30l-10-5-10 5V10a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M20 18h8M20 24h8M20 30h5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ayrıştırılmış Matematik",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path
          d="M10 38 38 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 10h8v8M34 30h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22h10M17 17v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="34" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M28 34h12M34 28v12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Çoklu Gelişmiş Yabancı Dil",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <rect
          x="8"
          y="10"
          width="32"
          height="22"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16 40h16M24 32v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 26V16h4.5a4 4 0 0 1 0 8H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 16v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ortaokul ve Liseyi 3 Yılda Bitirme",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path
          d="M24 9 9 16.5 24 24l15-7.5L24 9z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M14 21v9c0 3.5 4.5 7 10 7s10-3.5 10-7v-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M37.5 16.5V28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="37.5" cy="30" r="2" fill="currentColor" />
        <path
          d="M20 34h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];
