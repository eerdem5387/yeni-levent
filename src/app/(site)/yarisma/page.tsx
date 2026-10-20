import {
  BookOpen,
  Landmark,
  Map,
  Music2,
  Sparkles,
  Trophy,
  Users,
  Brain,
  Newspaper,
  CalendarDays,
} from "lucide-react";
import { PageHero } from "@/components/site/HomeSections";
import { CompetitionForm } from "@/components/site/CompetitionForm";
import { competitionInfo } from "@/lib/competition";

export const metadata = {
  title: competitionInfo.title,
  description: `${competitionInfo.title} başvuru formu ve yarışma bilgileri.`,
};

const subjectIcons = [Landmark, BookOpen, Map, Sparkles, Music2, Brain, Newspaper];

export default function CompetitionPage() {
  return (
    <div>
      <PageHero
        eyebrow="Okul Yarışması"
        title={competitionInfo.title}
        description="Bilgiyi, takım ruhunu ve heyecanı bir araya getiren lise bilgi yarışmamıza bireysel olarak başvurun."
      />

      <div className="bg-[#f4f7fb]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-8 lg:gap-14">
          <div>
            <section className="overflow-hidden rounded-2xl border border-[#d0dae9] bg-white shadow-[0_12px_36px_rgba(8,42,94,0.06)]">
              <div className="bg-gradient-to-r from-[#082a5e] to-[#1363df] px-5 py-5 sm:px-7">
                <p className="text-sm text-white/85">Yarışma Bilgileri</p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold !text-white sm:text-2xl">
                  {competitionInfo.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white">
                  <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                  Yarışma Tarihi: {competitionInfo.dateLabel}
                </p>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                <article className="rounded-xl bg-[#fff8e8] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fab123]/25 text-[#c98a00]">
                      <Trophy className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                      Ödüller
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {competitionInfo.prizes.map((prize) => (
                      <li
                        key={prize.place}
                        className="flex items-start gap-3 text-sm text-[#39557e]"
                      >
                        <span className="inline-flex min-w-10 items-center justify-center rounded-md bg-[#fab123] px-2 py-1 text-xs font-bold text-[#082a5e]">
                          {prize.place}
                        </span>
                        <span className="pt-0.5 font-medium text-[#082a5e]">{prize.label}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-xl bg-[#e7effc] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1363df]">
                      <Users className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                      Katılım Şartları
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {competitionInfo.rules.map((rule) => (
                      <li key={rule} className="flex gap-2 text-sm leading-relaxed text-[#39557e]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1363df]" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="border-t border-[#e7effc] px-5 py-6 sm:px-7">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                  Yarışma Konuları
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {competitionInfo.subjects.map((subject, index) => {
                    const Icon = subjectIcons[index % subjectIcons.length];
                    return (
                      <span
                        key={subject}
                        className="inline-flex items-center gap-2 rounded-full border border-[#d0dae9] bg-[#f4f7fb] px-3.5 py-2 text-sm font-medium text-[#082a5e]"
                      >
                        <Icon className="h-4 w-4 text-[#1363df]" aria-hidden />
                        {subject}
                      </span>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          <CompetitionForm />
        </div>
      </div>
    </div>
  );
}
