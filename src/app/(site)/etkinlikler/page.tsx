import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Etkinliklerimiz" };

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { eventDate: "desc" },
    include: { categories: true },
  });

  return (
    <div>
      <div className="brand-gradient px-4 pb-12 pt-8 text-white sm:px-5 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">
            Etkinliklerimiz
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Okulumuzda düzenlenen geziler, atölyeler ve özel programlar.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:space-y-8 sm:px-5 sm:py-16 md:px-8">
        {events.length === 0 && (
          <p className="text-muted">Yakında yeni etkinlikler eklenecek.</p>
        )}
        {events.map((event) => (
          <article key={event.id} className="border-b border-line pb-8">
            {event.coverImage && (
              <div className="relative mb-4 aspect-[16/9] overflow-hidden border border-line bg-navy/5">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <time className="text-xs uppercase tracking-wider text-muted">
              {new Date(event.eventDate).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-navy">
              <Link href={`/etkinlikler/${event.slug}`} className="hover:text-crimson">
                {event.title}
              </Link>
            </h2>
            {event.categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {event.categories.map((category) => (
                  <span
                    key={category.id}
                    className="rounded-sm bg-navy/8 px-2 py-0.5 text-xs font-medium text-navy"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
            {event.location && (
              <p className="mt-1 text-sm font-medium text-crimson">{event.location}</p>
            )}
            <p className="mt-2 max-w-3xl text-muted">{event.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
