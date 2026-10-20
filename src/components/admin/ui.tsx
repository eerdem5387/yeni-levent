import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#082a5e] sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-[#39557e]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminEmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d0dae9] bg-white px-6 py-14 text-center">
      <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
        {title}
      </p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#39557e]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function AdminRecordCard({
  children,
  unread = false,
}: {
  children: ReactNode;
  unread?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-[0_8px_24px_rgba(8,42,94,0.04)] transition sm:p-6 ${
        unread
          ? "border-[#1363df]/25 ring-1 ring-[#1363df]/10"
          : "border-[#e7effc]"
      }`}
    >
      {children}
    </article>
  );
}

export function AdminBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "info" | "success" | "warn";
}) {
  const tones = {
    neutral: "bg-[#f4f7fb] text-[#39557e]",
    info: "bg-[#e7effc] text-[#1363df]",
    success: "bg-[#e8f8ef] text-[#0f7a45]",
    warn: "bg-[#fff4db] text-[#9a6b00]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function AdminGhostButton({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "danger";
}) {
  const tones = {
    neutral:
      "border-[#d0dae9] bg-white text-[#082a5e] hover:border-[#1363df]/40 hover:text-[#1363df]",
    danger: "border-[#f3c4c8] bg-[#fff7f8] text-[#b42318] hover:bg-[#fde8ea]",
  };

  return (
    <button
      type="submit"
      className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${tones[tone]}`}
    >
      {children}
    </button>
  );
}
