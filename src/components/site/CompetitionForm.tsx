"use client";

import { useState } from "react";
import { competitionInfo } from "@/lib/competition";

export function CompetitionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const members = Array.from({ length: competitionInfo.teamSize }, (_, index) => ({
      fullName: String(fd.get(`member${index + 1}Name`) || "").trim(),
      classSection: String(fd.get(`member${index + 1}Class`) || "").trim(),
    }));

    try {
      const res = await fetch("/api/competition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Başvuru gönderilemedi.");
      }

      form.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#d0dae9] bg-white p-5 shadow-[0_12px_36px_rgba(8,42,94,0.08)] sm:p-8"
    >
      <p className="text-sm font-medium text-[#1363df]">Yarışma Formu</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e]">
        Takım Başvurusu
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#39557e]">
        Her takım {competitionInfo.teamSize} kişiden oluşur. Lütfen tüm takım
        üyelerinin bilgilerini eksiksiz doldurun.
      </p>

      <div className="mt-8 space-y-6">
        {Array.from({ length: competitionInfo.teamSize }, (_, index) => (
          <fieldset
            key={index}
            className="rounded-xl border border-[#e7effc] bg-[#f4f7fb] p-4 sm:p-5"
          >
            <legend className="px-1 font-[family-name:var(--font-display)] text-sm font-semibold text-[#082a5e]">
              {index + 1}. Takım Üyesi
            </legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-[#39557e]">İsim Soyisim</span>
                <input
                  name={`member${index + 1}Name`}
                  required
                  minLength={2}
                  placeholder="Ad Soyad"
                  className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-[#39557e]">Sınıf ve Şube</span>
                <input
                  name={`member${index + 1}Class`}
                  required
                  minLength={1}
                  placeholder="Örn. 9-A"
                  className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
                />
              </label>
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 w-full rounded-md bg-[#1363df] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2494e4] disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </button>

      {status === "ok" && (
        <p className="mt-4 rounded-md bg-[#e8f8ef] px-4 py-3 text-sm text-[#0f7a45]">
          Başvurunuz alındı. Takımınız yarışma listesine eklendi.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-md bg-[#fde8ea] px-4 py-3 text-sm text-[#C0000C]">
          {error}
        </p>
      )}
    </form>
  );
}
