import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Sınırsız\nKaynak",
    color: "bg-[#e7effc] text-[#1363df]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M12 10h20a3 3 0 0 1 3 3v26l-13-6.5L9 39V13a3 3 0 0 1 3-3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M36 14h4a2 2 0 0 1 2 2v24l-6-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Çözüm\nOdaklı",
    color: "bg-[#fff4db] text-[#c98a00]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M10 22c0-6.627 5.373-12 12-12h2c6.627 0 12 5.373 12 12v2c0 2.2-1.8 4-4 4h-1.5l-3.5 4v-4H22c-6.627 0-12-5.373-12-12z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="m28 26 4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Yüksek\nBaşarı",
    color: "bg-[#e8f8ef] text-[#12bb6a]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M24 8 8 16l16 8 16-8-16-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 20v10c0 4 5.5 8 12 8s12-4 12-8V20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Destekleyici\nVideolar",
    color: "bg-[#f3e8ff] text-[#9b51e0]",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" aria-hidden>
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M22 20v8l7-4-7-4z" fill="currentColor" />
      </svg>
    ),
  },
];

export function EducatorsSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:gap-12 sm:px-5 sm:py-20 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto w-full max-w-md pb-16 sm:pb-20 lg:max-w-none lg:pb-0">
          <Image
            src="/theme/about_dots.svg"
            alt=""
            width={120}
            height={120}
            className="pointer-events-none absolute -left-2 top-6 w-20 opacity-70 sm:-left-4 sm:w-28"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute -left-2 top-0 h-36 w-36 rounded-full border-[10px] border-[#fab123]/40 sm:-left-4 sm:h-44 sm:w-44"
            style={{ clipPath: "inset(0 50% 50% 0)" }}
            aria-hidden
          />

          <div className="relative mx-auto w-[88%] max-w-sm pt-6 sm:ml-auto sm:pt-10">
            <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_50px_rgba(8,42,94,0.12)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/theme/kamerhoca-e1724766207132.png"
                  alt="Levent College eğitmen kadrosu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 380px"
                />
              </div>
            </div>

            <div className="absolute -bottom-8 left-0 z-20 w-[58%] overflow-hidden rounded-2xl border-4 border-white shadow-[0_16px_40px_rgba(8,42,94,0.14)] sm:-bottom-10 sm:-left-6 sm:w-[62%]">
              <div className="relative aspect-square w-full">
                <Image
                  src="/theme/burak-hoca-web-yeni.png"
                  alt="Levent College eğitmen kadrosu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 55vw, 280px"
                />
              </div>
            </div>

            <div className="absolute -right-2 bottom-8 z-20 hidden rounded-xl bg-[#1363df] px-4 py-3 text-white shadow-lg sm:block">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-none">
                Concept +
              </p>
              <p className="mt-1 text-xs text-white/85">Zirveyi Keşfet</p>
            </div>
          </div>
        </div>

        <div>
          <p className="pill">Hakkımızda Bilgi Edinin</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[#082a5e] sm:mt-5 sm:text-3xl md:text-4xl">
            Bölgenin En İyi{" "}
            <span className="relative inline-block text-[#1363df]">
              Eğitmenleri
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#fab123] to-transparent"
                aria-hidden
              />
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#39557e] sm:mt-6 md:text-lg">
            Birikimli deneyim, başarıya açılan kapıdır. Okulumuz, uzman kadrosuyla
            eğitimde mükemmelliği hedefler. Başarı, bizim DNA&apos;mızın bir parçasıdır.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6">
            {features.map((feature) => (
              <article key={feature.title} className="flex items-center gap-2.5 sm:gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="whitespace-pre-line font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-[#082a5e] sm:text-lg">
                  {feature.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <Link
              href="/hakkimizda"
              className="btn-primary !px-2 !py-2.5 text-center !text-[11px] leading-tight sm:!px-6 sm:!py-3.5 sm:!text-sm"
            >
              Hakkımızda
            </Link>
            <Link
              href="/kadro"
              className="btn-outline !px-2 !py-2.5 text-center !text-[11px] leading-tight sm:!px-6 sm:!py-3.5 sm:!text-sm"
            >
              Kadromuz
            </Link>
            <Link
              href="/etkinlikler"
              className="btn-outline !px-2 !py-2.5 text-center !text-[11px] leading-tight sm:!px-6 sm:!py-3.5 sm:!text-sm"
            >
              Öğrencilerimiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
