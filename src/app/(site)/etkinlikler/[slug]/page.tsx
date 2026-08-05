import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  return { title: event?.title ?? "Etkinlik" };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { categories: true },
  });
  if (!event || !event.published) notFound();

  return (
    <div>
      <div className="brand-gradient px-4 pb-12 pt-8 text-white sm:px-5 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/etkinlikler" className="text-sm text-white/70 hover:text-white">
            ← Etkinliklerimiz
          </Link>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl">
            {event.title}
          </h1>
          {event.coverImage && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-sm border border-white/20 bg-white/5">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          {event.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {event.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-sm bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
          <time className="mt-4 block text-sm text-white/70">
            {new Date(event.eventDate).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          {event.location && (
            <p className="mt-2 text-sm text-gold-light">{event.location}</p>
          )}
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        <p className="text-lg text-muted">{event.excerpt}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/90 whitespace-pre-line">
          {event.content}
        </div>
      </article>
    </div>
  );
}
