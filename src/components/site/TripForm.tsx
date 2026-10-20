"use client";

import { useState } from "react";
import {
  formatClassSection,
  formatPersonName,
  formatPhoneDisplay,
  isValidClassSection,
  isValidPersonName,
  isValidPhone,
  normalizePhone,
  sanitizeClassSection,
  sanitizePersonName,
  sanitizePhoneDigits,
} from "@/lib/form-guards";

const inputClass =
  "w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2";

export function TripForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const normalized = {
      fullName: formatPersonName(fullName),
      classSection: formatClassSection(classSection),
      phone: normalizePhone(phone),
      parentName: formatPersonName(parentName),
    };

    if (!isValidPersonName(normalized.fullName)) {
      setStatus("error");
      setError("Ad soyadı en az iki kelime olacak şekilde yazın (yalnızca harf).");
      return;
    }
    if (!isValidClassSection(normalized.classSection)) {
      setStatus("error");
      setError("Sınıfı 5-A gibi yazın (5–12 arası sınıf + şube).");
      return;
    }
    if (!isValidPhone(normalized.phone)) {
      setStatus("error");
      setError("Telefon 05xxxxxxxxx formatında 11 haneli olmalıdır.");
      return;
    }
    if (!isValidPersonName(normalized.parentName)) {
      setStatus("error");
      setError("Veli ad soyadını en az iki kelime olacak şekilde yazın.");
      return;
    }

    setFullName(normalized.fullName);
    setClassSection(normalized.classSection);
    setPhone(formatPhoneDisplay(normalized.phone));
    setParentName(normalized.parentName);

    try {
      const res = await fetch("/api/trip", {
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
      setPhone("");
      setParentName("");
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
      <p className="text-sm font-medium text-[#1363df]">Gezi Formu</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#082a5e]">
        Gezi Başvurusu
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#39557e]">
        Lütfen öğrenci ve veli bilgilerini eksiksiz doldurun.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-[#39557e]">Ad Soyad</span>
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
          <span className="mb-1.5 block text-[#39557e]">Sınıf</span>
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
        <label className="block text-sm">
          <span className="mb-1.5 block text-[#39557e]">Telefon Numarası</span>
          <input
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhoneDisplay(sanitizePhoneDigits(e.target.value)))}
            autoComplete="tel"
            inputMode="numeric"
            required
            maxLength={14}
            placeholder="05xx xxx xx xx"
            className={inputClass}
          />
          <span className="mt-1 block text-xs text-[#39557e]/80">11 haneli cep telefonu</span>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-[#39557e]">Veli Ad Soyad</span>
          <input
            name="parentName"
            value={parentName}
            onChange={(e) => setParentName(sanitizePersonName(e.target.value))}
            onBlur={() => setParentName((v) => formatPersonName(v))}
            autoComplete="name"
            autoCapitalize="words"
            spellCheck={false}
            inputMode="text"
            required
            maxLength={60}
            placeholder="Örn. Mehmet Yılmaz"
            className={inputClass}
          />
        </label>
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
