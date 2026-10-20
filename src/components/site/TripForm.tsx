"use client";

import { useState } from "react";

export function TripForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      fullName: String(fd.get("fullName") || "").trim(),
      classSection: String(fd.get("classSection") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      parentName: String(fd.get("parentName") || "").trim(),
    };

    try {
      const res = await fetch("/api/trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
            required
            minLength={2}
            placeholder="Öğrenci adı soyadı"
            className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-[#39557e]">Sınıf</span>
          <input
            name="classSection"
            required
            minLength={1}
            placeholder="Örn. 9-A"
            className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-[#39557e]">Telefon Numarası</span>
          <input
            name="phone"
            type="tel"
            required
            minLength={10}
            placeholder="05xx xxx xx xx"
            className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-[#39557e]">Veli Ad Soyad</span>
          <input
            name="parentName"
            required
            minLength={2}
            placeholder="Veli adı soyadı"
            className="w-full rounded-md border border-[#d0dae9] bg-white px-3 py-2.5 outline-none ring-[#1363df]/25 focus:ring-2"
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
