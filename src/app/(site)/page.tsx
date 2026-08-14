import Image from "next/image";
import { EducatorsSection } from "@/components/site/EducatorsSection";
import {
  BranchesHiring,
  ConceptGrid,
  ConceptPlusCta,
  HiringBanners,
  HomeEvents,
  JobsCta,
  RankingsGrid,
  YksPromoBanner,
} from "@/components/site/HomeSections";
import { homeRankings } from "@/lib/home-content";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [settings, events] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "main" } }),
    prisma.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "desc" },
      take: 3,
    }),
  ]);

  const featured = homeRankings[0];
  const phone = settings?.phone ?? "(0464) 217 15 55";
  const phoneDigits = phone.replace(/\s/g, "");

  return (
    <>
      <HiringBanners />

      <section className="brand-gradient relative overflow-hidden">
        <div className="relative mx-auto grid max-w-[1320px] gap-8 px-4 pb-10 pt-10 sm:px-5 sm:pb-14 sm:pt-14 md:grid-cols-2 md:items-end md:gap-10 md:px-8 md:pt-16 lg:gap-6">
          <div className="relative z-10 text-center md:pb-16 md:text-left lg:pb-24">
            <Image
              src="/theme/bshape_01.png"
              alt=""
              width={58}
              height={58}
              className="animate-float pointer-events-none absolute -left-2 top-0 hidden w-9 sm:block md:-left-6 md:w-12 lg:-left-10 lg:w-14"
              aria-hidden
            />
            <Image
              src="/theme/bshape_02.png"
              alt=""
              width={44}
              height={44}
              className="animate-float-slow pointer-events-none absolute -top-2 right-[18%] hidden w-8 sm:block md:w-10"
              aria-hidden
            />

            <p className="animate-fade pill">100% Başarı için Levent College</p>
            <h1 className="animate-rise mt-5 font-[family-name:var(--font-display)] text-[33px] font-semibold leading-[1.2] text-[#082a5e] sm:text-[40px] lg:text-[48px] xl:text-[55px]">
              2025 YKS TÜRKİYE 151.si{" "}
              <span className="relative inline-block text-[#1363df]">
                {featured.name}
                <svg
                  className="absolute -bottom-2 left-1/2 h-3 w-[110%] -translate-x-1/2 text-[#fab123]"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 8c40-8 80-8 120 0s40 4 76-2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <div className="animate-rise-delay mt-8 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              <div className="flex items-center gap-3 text-left">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7effc] text-[#1363df]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[15px] font-medium text-[#39557e]">İletişim Numaramız</p>
                  <a
                    href="tel:+904642171555"
                    className="font-[family-name:var(--font-display)] text-xl font-bold text-[#082a5e] transition hover:text-[#1363df]"
                  >
                    {phoneDigits}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-rise-delay relative mx-auto w-full max-w-lg md:max-w-none">
            <Image
              src="/theme/bshape_03.png"
              alt=""
              width={65}
              height={65}
              className="animate-float pointer-events-none absolute left-[12%] top-[8%] z-0 w-12 md:w-14"
              aria-hidden
            />
            <Image
              src="/theme/bshape_04.png"
              alt=""
              width={87}
              height={87}
              className="animate-float-slow pointer-events-none absolute -left-6 bottom-[28%] z-0 hidden w-16 lg:block"
              aria-hidden
            />
            <Image
              src="/theme/bshape_05.png"
              alt=""
              width={52}
              height={52}
              className="animate-float pointer-events-none absolute right-2 top-[18%] z-0 w-10 md:w-12"
              aria-hidden
            />

            <div className="relative z-[1]">
              <Image
                src="/theme/rana-banner-img-min.png"
                alt="Levent College öğrencisi"
                width={720}
                height={900}
                className="mx-auto h-auto w-full max-w-md object-contain md:max-w-none"
                priority
                sizes="(max-width: 768px) 420px, 560px"
              />
            </div>
          </div>
        </div>
      </section>

      <RankingsGrid />
      <YksPromoBanner />
      <BranchesHiring />
      <ConceptPlusCta />
      <EducatorsSection />
      <JobsCta />
      <ConceptGrid />

      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 pt-14 sm:px-5 sm:pt-16 md:px-8">
          <p className="text-sm font-medium text-[#1363df]">
            Her Zaman Takip Etmek İsteyeceğiniz
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#082a5e] md:text-4xl">
            Levent College Haber &amp; Etkinlikler
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#39557e] sm:text-base">
            Okulumuzda, öğrencilerimizle birlikte gerçekleştirilen bilimsel ve
            teknolojik projelerin gelişim sürecini, gezi programlarımıza ve
            bursluluk sınavlarımıza ilişkin duyuruları buradan takip edebilirsiniz.
          </p>
        </div>
        <HomeEvents events={events} hideHeader />
      </section>
    </>
  );
}
