import Image from "next/image";

const features = [
  {
    title: "Sınırsız Kaynak",
    color: "bg-navy/8 text-navy",
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
    title: "Çözüm Odaklı",
    color: "bg-navy-soft/10 text-navy-soft",
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
    title: "Yüksek Başarı",
    color: "bg-gold/12 text-gold",
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
    title: "Destekleyici Videolar",
    color: "bg-crimson/8 text-crimson",
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
    <section className="overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:gap-12 sm:px-5 sm:py-20 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto w-full max-w-md pb-16 sm:pb-20 lg:max-w-none lg:pb-0">
          <div
            className="pointer-events-none absolute -left-2 top-2 grid grid-cols-5 gap-1.5 opacity-25 sm:-left-6"
            aria-hidden
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <span key={index} className="h-1.5 w-1.5 rounded-full bg-navy/40" />
            ))}
          </div>

          <div
            className="pointer-events-none absolute -left-2 top-0 h-36 w-36 rounded-full border-[10px] border-gold/35 sm:-left-4 sm:h-44 sm:w-44"
            style={{ clipPath: "inset(0 50% 50% 0)" }}
            aria-hidden
          />

          <div className="relative mx-auto w-[88%] max-w-sm pt-6 sm:ml-auto sm:pt-10">
            <div className="relative z-10 overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,48,72,0.15)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/kamerhoca.png"
                  alt="Levent Koleji eğitmen kadrosu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 380px"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 left-0 z-20 w-[42%] overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(0,48,72,0.18)] sm:-left-8 sm:w-[46%]">
              <div className="relative aspect-square w-full">
                <Image
                  src="/burakhoca.png"
                  alt="Levent Koleji eğitmen kadrosu"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 35vw, 180px"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="inline-block bg-navy/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
            Hakkımızda Bilgi Edinir
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-navy sm:mt-5 sm:text-3xl md:text-4xl">
            Bölgenin En İyi{" "}
            <span className="relative inline-block">
              Eğitmenleri
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
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:mt-6 md:text-lg">
            Birikimli deneyim, başarıya açılan kapıdır. Okulumuz, uzman kadrosuyla
            eğitimde mükemmelliği hedefler. Başarı, bizim DNA&apos;mızın bir parçasıdır.
          </p>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6">
            {features.map((feature) => (
              <article key={feature.title} className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${feature.color}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-base text-navy sm:text-lg">
                  {feature.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
