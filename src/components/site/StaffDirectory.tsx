"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type StaffDirectoryMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
};

export type StaffDirectorySection = {
  id: string;
  title: string;
  members: StaffDirectoryMember[];
};

const INITIAL_VISIBLE = 8;
const LOAD_MORE = 8;
const ROOT_MARGIN = "600px 0px";

function MemberCard({
  member,
  priority,
}: {
  member: StaffDirectoryMember;
  priority?: boolean;
}) {
  return (
    <article className="instructor-card overflow-hidden">
      <div className="relative aspect-[4/5] bg-[#e7effc]">
        <Image
          src={member.photoUrl}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          quality={70}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="p-4 text-center">
        {member.title ? (
          <p className="text-sm font-medium text-[#1363df]">{member.title}</p>
        ) : null}
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
          {member.name}
        </h3>
        {member.bio ? (
          <p className="mt-2 text-sm leading-relaxed text-[#39557e]">{member.bio}</p>
        ) : null}
      </div>
    </article>
  );
}

export function StaffDirectory({ sections }: { sections: StaffDirectorySection[] }) {
  const flat = useMemo(
    () =>
      sections.flatMap((section) =>
        section.members.map((member) => ({
          sectionId: section.id,
          sectionTitle: section.title,
          member,
        })),
      ),
    [sections],
  );

  const [visibleCount, setVisibleCount] = useState(
    Math.min(INITIAL_VISIBLE, flat.length),
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_VISIBLE, flat.length));
  }, [flat.length]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || visibleCount >= flat.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisibleCount((current) => Math.min(current + LOAD_MORE, flat.length));
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visibleCount, flat.length]);

  const visible = flat.slice(0, visibleCount);
  const grouped = useMemo(() => {
    const order: string[] = [];
    const map = new Map<
      string,
      { id: string; title: string; members: { member: StaffDirectoryMember; index: number }[] }
    >();

    visible.forEach((item, index) => {
      let group = map.get(item.sectionId);
      if (!group) {
        group = { id: item.sectionId, title: item.sectionTitle, members: [] };
        map.set(item.sectionId, group);
        order.push(item.sectionId);
      }
      group.members.push({ member: item.member, index });
    });

    return order.map((id) => map.get(id)!);
  }, [visible]);

  if (flat.length === 0) {
    return <p className="text-[#39557e]">Kadro bilgileri yakında eklenecek.</p>;
  }

  return (
    <div className="space-y-14">
      {grouped.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e] sm:text-3xl">
            {section.title}
          </h2>
          <div className="gold-rule mt-4" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {section.members.map(({ member, index }) => (
              <MemberCard key={member.id} member={member} priority={index < 4} />
            ))}
          </div>
        </section>
      ))}

      {visibleCount < flat.length ? (
        <div
          ref={sentinelRef}
          className="flex flex-col items-center gap-3 py-6"
          aria-hidden
        >
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#e7effc]" />
          <p className="text-xs font-medium text-[#39557e]">
            Daha fazla eğitmen yükleniyor…
          </p>
        </div>
      ) : null}
    </div>
  );
}
