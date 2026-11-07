import { CalendarDays, CheckCircle2, Puzzle, Swords, Users } from "lucide-react";
import { PageHero } from "@/components/site/HomeSections";
import { TournamentForm } from "@/components/site/TournamentForm";
import { tournamentInfo } from "@/lib/tournament";

export const metadata = {
  title: tournamentInfo.title,
  description: `${tournamentInfo.title} başvuru formu ve turnuva bilgileri.`,
};

export default function TournamentPage() {
  return (
    <div>
      <PageHero
        eyebrow="Okul Turnuvası"
        title={tournamentInfo.title}
        description="Satranç ve mangala turnuvalarına bireysel olarak başvurun; dilerseniz her ikisine birden katılın."
      />

      <div className="bg-[#f4f7fb]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-8 lg:gap-14">
          <div>
            <section className="overflow-hidden rounded-2xl border border-[#d0dae9] bg-white shadow-[0_12px_36px_rgba(8,42,94,0.06)]">
              <div className="bg-gradient-to-r from-[#082a5e] to-[#1363df] px-5 py-5 sm:px-7">
                <p className="text-sm text-white/85">Turnuva Bilgileri</p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold !text-white sm:text-2xl">
                  {tournamentInfo.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white">
                  <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                  Turnuva Tarihi: {tournamentInfo.dateLabel}
                </p>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                <article className="rounded-xl bg-[#e7effc] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1363df]">
                      <Puzzle className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                      Turnuvalar
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {tournamentInfo.games.map((game) => (
                      <li
                        key={game.id}
                        className="flex items-center gap-3 text-sm font-medium text-[#082a5e]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1363df]/10 text-[#1363df]">
                          {game.id === "chess" ? (
                            <Swords className="h-4 w-4" aria-hidden />
                          ) : (
                            <Puzzle className="h-4 w-4" aria-hidden />
                          )}
                        </span>
                        {game.label}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-xl bg-[#fff8e8] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fab123]/25 text-[#c98a00]">
                      <Users className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                      Katılım Şartları
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {tournamentInfo.rules.map((rule) => (
                      <li key={rule} className="flex gap-2 text-sm leading-relaxed text-[#39557e]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1363df]" aria-hidden />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </div>

          <TournamentForm />
        </div>
      </div>
    </div>
  );
}
