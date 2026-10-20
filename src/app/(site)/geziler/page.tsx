import {
  CalendarDays,
  Clock3,
  MapPin,
  Landmark,
} from "lucide-react";
import { PageHero } from "@/components/site/HomeSections";
import { TripForm } from "@/components/site/TripForm";
import { tripInfo } from "@/lib/trip";

export const metadata = {
  title: tripInfo.title,
  description: `${tripInfo.title} başvuru formu ve gezi bilgileri.`,
};

export default function TripsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Okul Gezileri"
        title={tripInfo.title}
        description="Kültür ve tarih dolu Tiflis gezimize katılmak için başvurunuzu hemen yapabilirsiniz."
      />

      <div className="bg-[#f4f7fb]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-8 lg:gap-14">
          <section className="overflow-hidden rounded-2xl border border-[#d0dae9] bg-white shadow-[0_12px_36px_rgba(8,42,94,0.06)]">
            <div className="bg-gradient-to-r from-[#082a5e] to-[#1363df] px-5 py-5 sm:px-7">
              <p className="text-sm text-white/85">Gezi Bilgileri</p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold !text-white sm:text-2xl">
                {tripInfo.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white">
                  <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                  Tarih: {tripInfo.dateLabel}
                </p>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white">
                  <Clock3 className="h-4 w-4 shrink-0" aria-hidden />
                  Süre: {tripInfo.duration}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7effc] text-[#1363df]">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                  Gezilecek Yerler
                </h3>
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {tripInfo.places.map((place) => (
                  <div
                    key={place}
                    className="flex items-start gap-2.5 rounded-xl border border-[#e7effc] bg-[#f4f7fb] px-3.5 py-3 text-sm text-[#082a5e]"
                  >
                    <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-[#1363df]" aria-hidden />
                    <span className="font-medium leading-snug">{place}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <TripForm />
        </div>
      </div>
    </div>
  );
}
