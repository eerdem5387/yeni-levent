import Image from "next/image";
import Link from "next/link";
import {
  homeHiringBranches,
  homeRankings,
  homeStats,
} from "@/lib/home-content";

export function HiringBanners() {
  return (
    <div className="space-y-0">
      <a
        href="https://ik.leventokullari.com/"
        rel="noopener noreferrer"
        className="block bg-[#1363df] px-4 py-4 text-center transition hover:bg-[#2494e4] sm:py-5"
      >
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
          Muhasebe Uzmanı Aranıyor
        </span>
      </a>
      <a
        href="https://ik.leventokullari.com/"
        rel="noopener noreferrer"
        className="block bg-[#082a5e] px-4 py-4 text-center transition hover:bg-[#061e43] sm:py-5"
      >
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-wide text-[#fab123] sm:text-2xl md:text-3xl">
          Çalışma Arkadaşları Arıyoruz
        </span>
      </a>
    </div>
  );
}

export function RankingsGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-5 sm:py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeRankings.map((item) => (
            <article key={item.name} className="instructor-card group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e2faff]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-[center_18%] transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  priority
                />
              </div>
              <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
                <div>
                  <p className="text-sm font-medium text-[#39557e]">{item.name}</p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#082a5e] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function YksPromoBanner() {
  return (
    <section className="bg-[#f4f7fb]">
      <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-5 sm:py-8 md:px-8">
        <div className="overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(8,42,94,0.08)]">
          <Image
            src="/theme/yks-promo-banner.jpeg"
            alt="Levent College YKS başarıları"
            width={1600}
            height={969}
            className="h-auto w-full"
            sizes="(max-width: 1320px) 100vw, 1320px"
          />
        </div>
      </div>
    </section>
  );
}

export function BranchesHiring() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/theme/categories_shape01.png"
        alt=""
        width={80}
        height={80}
        className="pointer-events-none absolute left-4 top-8 w-16 opacity-70 sm:w-20"
        aria-hidden
      />
      <Image
        src="/theme/categories_shape02-1.png"
        alt=""
        width={96}
        height={96}
        className="pointer-events-none absolute bottom-6 right-6 w-20 opacity-70 sm:w-24"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1320px] px-4 py-14 sm:px-5 sm:py-16 md:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e] sm:text-3xl">
              Çalışma Arkadaşları Arıyoruz
            </h2>
          </div>
          <a href="https://ik.leventokullari.com/" rel="noopener noreferrer" className="btn-primary">
            Başvuru için Tıklayın
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {homeHiringBranches.map((branch, index) => (
            <a
              key={branch}
              href="https://ik.leventokullari.com/"
              rel="noopener noreferrer"
              className={
                index === 1
                  ? "btn-outline min-w-[140px]"
                  : "btn-primary min-w-[140px]"
              }
            >
              {branch}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConceptPlusCta() {
  return (
    <section
      className="relative overflow-hidden bg-[#082a5e] text-white"
      style={{
        backgroundImage: "url(/theme/cta_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-5 sm:py-14 md:px-8">
        <div>
          <p className="text-sm font-medium text-[#fab123]">Concept +</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold !text-white sm:text-4xl">
            Zirveyi Keşfet
          </h2>
        </div>
        <Link
          href="/hakkimizda"
          className="inline-flex rounded border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#082a5e]"
        >
          Hakkımızda Bilgi Edinin
        </Link>
      </div>
    </section>
  );
}

const conceptFeatures = [
  {
    title: "Katman Rehberlik",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M10 38c1.8-7 7.2-11 14-11s12.2 4 14 11"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M31 14.5c2.2.4 4 2.4 4 5.2v1.2M31 14.5c0-1.8 1.3-3.5 3.4-3.8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M34.5 20.5h5.2c.7 0 1.3.6 1.3 1.3v2.2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Akademik Takip",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path
          d="M16 8h14a3 3 0 0 1 3 3v29l-10-5.2L13 40V11a3 3 0 0 1 3-3z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M19 16h10M19 22h10M19 28h7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ayrıştırılmış Matematik",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <path d="M10 38 30 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 12h10v10" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path
          d="M28 28h12v12H28z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="m28 34 6-4 6 4v6H28v-6z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M34 8v8M30 12h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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
          rx="2.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path d="M18 40h12M24 32v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d="M18 18h4.5c2.2 0 3.8 1.5 3.8 3.5S24.7 25 22.5 25H18V18zm0 7h5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 25c1.6-1 2.6-2.5 2.6-4.2 0-2.6-1.8-4.3-4.4-4.3h-.4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Ortaokul ve Liseyi 3 Yılda Bitirme",
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
        <circle cx="15" cy="14" r="4" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="24" cy="12" r="4.5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="33" cy="14" r="4" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M8 36c1.2-5.5 4.8-8.5 7-8.5s5.5 2.5 7 6.5c1.2-4.8 4.2-8.5 9-8.5s6.5 3.5 8 8.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M10.5 18.5 15 16l4.5 2.5M19.5 16.5 24 14l4.5 2.5M28.5 18.5 33 16l4.5 2.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function ConceptGrid() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:gap-12 sm:px-5 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center md:px-8">
        <div>
          <p className="pill">Benzersiz Eğitim Anlayışı</p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#082a5e] md:text-4xl">
            Karşınızda{" "}
            <span className="relative inline-block text-[#1363df]">
              Levent College Concept
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#fab123] to-transparent"
                aria-hidden
              />
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#39557e] md:text-lg">
            Eğitimde öğrencilerimizi en yüksek başarıya ulaştırmak için uzman
            kadromuzla geliştirdiğimiz Levent College Concept.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          {conceptFeatures.map((item) => (
            <article
              key={item.title}
              className="instructor-card flex flex-col items-center px-3 py-6 text-center sm:px-4 sm:py-7 lg:col-span-2 lg:[&:nth-child(1)]:col-start-2 lg:[&:nth-child(2)]:col-start-4 lg:[&:nth-child(3)]:col-start-1 lg:[&:nth-child(4)]:col-start-3 lg:[&:nth-child(5)]:col-start-5"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e7effc] text-[#1363df]">
                {item.icon}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-[#082a5e] sm:text-base">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JobsCta() {
  return (
    <section
      className="relative overflow-hidden bg-[#1363df] text-white"
      style={{
        backgroundImage: "url(/theme/cta_bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto flex max-w-[1320px] flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-14 md:px-8">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold !text-white sm:text-3xl">
            Bizimle Çalışmak İster Misiniz ?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
            Matematik, Fizik, Kimya, Biyoloji, Türkçe, Edebiyat ve REHBERLİK
          </p>
        </div>
        <a
          href="https://ik.leventokullari.com/"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 rounded bg-white px-6 py-3.5 text-sm font-semibold text-[#1363df] transition hover:bg-[#e7effc]"
        >
          Başvuru için Tıklayın
        </a>
      </div>
    </section>
  );
}

type HomeEvent = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  eventDate: Date;
  location: string;
};

export function HomeEvents({
  events,
  hideHeader = false,
}: {
  events: HomeEvent[];
  hideHeader?: boolean;
}) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-10 sm:px-5 sm:py-14 md:px-8 md:pb-20">
      {!hideHeader ? (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-sm font-medium text-[#1363df]">
              Her Zaman Takip Etmek İsteyeceğiniz
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#082a5e] md:text-4xl">
              Levent College Haber &amp; Etkinlikler
            </h2>
          </div>
          <Link
            href="/etkinlikler"
            className="text-sm font-semibold text-[#1363df] hover:text-[#082a5e]"
          >
            Diğer Etkinliklerimiz →
          </Link>
        </div>
      ) : (
        <div className="mb-8 flex justify-end">
          <Link
            href="/etkinlikler"
            className="text-sm font-semibold text-[#1363df] hover:text-[#082a5e]"
          >
            Diğer Etkinliklerimiz →
          </Link>
        </div>
      )}
      {events.length === 0 ? (
        <p className="text-[#39557e]">Yakında yeni etkinlikler eklenecek.</p>
      ) : (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="instructor-card overflow-hidden">
              <div className="h-2 bg-[#1363df]" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1363df]">
                  Diğer Etkinliklerimiz
                </p>
                <time className="mt-3 block text-xs uppercase tracking-wider text-[#39557e]">
                  {new Date(event.eventDate).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#082a5e]">
                  <Link href={`/etkinlikler/${event.slug}`} className="hover:text-[#1363df]">
                    {event.title}
                  </Link>
                </h3>
                {event.location ? (
                  <p className="mt-1 text-sm font-medium text-[#1363df]">{event.location}</p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-[#39557e]">{event.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="brand-gradient border-b border-[#d0dae9] px-4 pb-10 pt-10 sm:px-5 sm:pb-14 md:px-8 md:pb-16">
      <div className="mx-auto max-w-[1320px]">
        {eyebrow ? <p className="pill">{eyebrow}</p> : null}
        <h1
          className={`font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[#082a5e] sm:text-4xl md:text-5xl ${
            eyebrow ? "mt-4" : ""
          }`}
        >
          {title}
        </h1>
        <div className="gold-rule mt-5" />
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#39557e] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function StatsStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`bg-[#082a5e] text-white ${compact ? "py-8 sm:py-10" : "py-12 sm:py-14"}`}>
      <div className="mx-auto grid max-w-[1320px] gap-8 px-4 sm:grid-cols-2 sm:gap-10 sm:px-5 md:px-8">
        {homeStats.map((stat) => (
          <div key={stat.label} className="border-t border-[#fab123]/50 pt-5 text-center sm:text-left">
            <p
              className={`font-[family-name:var(--font-display)] text-[#fab123] ${
                compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl"
              }`}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
