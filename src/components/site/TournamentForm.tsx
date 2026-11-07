"use client";

import { useState } from "react";
import {
  formatClassSection,
  formatPersonName,
  isValidClassSection,
  isValidPersonName,
  sanitizeClassSection,
  sanitizePersonName,
} from "@/lib/form-guards";

const inputClass =
  "w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2";

export function TournamentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [chess, setChess] = useState(false);
  const [mangala, setMangala] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const normalized = {
      fullName: formatPersonName(fullName),
      classSection: formatClassSection(classSection),
      chess,
      mangala,
    };

    if (!isValidPersonName(normalized.fullName)) {
      setStatus("error");
      setError("İsim soyisim en az iki kelime olacak şekilde yazın (yalnızca harf).");
      return;
    }
    if (!isValidClassSection(normalized.classSection)) {
      setStatus("error");
      setError("Sınıfı 5-A gibi yazın (5–12 arası sınıf + şube).");
      return;
    }
    if (!normalized.chess && !normalized.mangala) {
      setStatus("error");
      setError("En az bir turnuva seçmelisiniz (Satranç ve/veya Mangala).");
      return;
    }

    setFullName(normalized.fullName);
    setClassSection(normalized.classSection);

    try {
      const res = await fetch("/api/tournament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Başvuru gönderilemedi.");
      }

      setFullName("");
      setClassSection("");
      setChess(false);
      setMangala(false);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-[#d0dae9] bg-white p-5 shadow-[0_12px_36px_rgba(8,42,94,0.08)] sm:p-8"
    >
      <p className="text-sm font-medium text-[#1363df]">Turnuva Formu</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e]">
        Bireysel Başvuru
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#39557e]">
        Satranç ve mangala turnuvalarına bireysel olarak başvurabilirsiniz. İsterseniz her
        ikisini birden seçebilirsiniz.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-[#39557e]">İsim Soyisim</span>
          <input
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(sanitizePersonName(e.target.value))}
            onBlur={() => setFullName((v) => formatPersonName(v))}
            autoComplete="name"
            autoCapitalize="words"
            spellCheck={false}
            inputMode="text"
            required
            maxLength={60}
            placeholder="Örn. Ayşe Yılmaz"
            className={inputClass}
          />
          <span className="mt-1 block text-xs text-[#39557e]/80">
            Yalnızca harf; ad ve soyad ayrı yazılmalı.
          </span>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-[#39557e]">Sınıf ve Şube</span>
          <input
            name="classSection"
            value={classSection}
            onChange={(e) => setClassSection(sanitizeClassSection(e.target.value))}
            onBlur={() => setClassSection((v) => formatClassSection(v))}
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            required
            maxLength={5}
            placeholder="Örn. 9-A"
            className={inputClass}
          />
          <span className="mt-1 block text-xs text-[#39557e]/80">Örn. 9-A veya 11B</span>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-medium text-[#39557e]">
          Katılmak istediğiniz turnuva(lar)
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-4 py-3 text-sm font-medium text-[#082a5e] transition has-[:checked]:border-[#1363df] has-[:checked]:bg-[#e7effc]">
            <input
              type="checkbox"
              checked={chess}
              onChange={(e) => setChess(e.target.checked)}
              className="h-4 w-4 accent-[#1363df]"
            />
            Satranç
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-4 py-3 text-sm font-medium text-[#082a5e] transition has-[:checked]:border-[#1363df] has-[:checked]:bg-[#e7effc]">
            <input
              type="checkbox"
              checked={mangala}
              onChange={(e) => setMangala(e.target.checked)}
              className="h-4 w-4 accent-[#1363df]"
            />
            Mangala
          </label>
        </div>
        <p className="mt-2 text-xs text-[#39557e]/80">
          En az bir seçim zorunludur. İsterseniz ikisini birden işaretleyebilirsiniz.
        </p>
      </fieldset>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 w-full rounded-md bg-[#1363df] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2494e4] disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Gönderiliyor..." : "Başvuruyu Gönder"}
      </button>

      {status === "ok" && (
        <p className="mt-4 rounded-md bg-[#e8f8ef] px-4 py-3 text-sm text-[#0f7a45]">
          Başvurunuz alındı. Teşekkür ederiz.
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
