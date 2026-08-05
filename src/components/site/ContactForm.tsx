"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Mesaj gönderilemedi.");
      }

      form.reset();
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Ad Soyad</span>
          <input
            name="name"
            required
            className="w-full border border-line bg-white px-3 py-2.5 outline-none ring-crimson/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">E-posta</span>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-line bg-white px-3 py-2.5 outline-none ring-crimson/30 focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Telefon</span>
          <input
            name="phone"
            className="w-full border border-line bg-white px-3 py-2.5 outline-none ring-crimson/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Konu</span>
          <input
            name="subject"
            className="w-full border border-line bg-white px-3 py-2.5 outline-none ring-crimson/30 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Mesajınız</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-line bg-white px-3 py-2.5 outline-none ring-crimson/30 focus:ring-2"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-crimson px-5 py-3 text-sm font-medium text-white transition hover:bg-crimson-soft disabled:opacity-60"
      >
        {status === "loading" ? "Gönderiliyor..." : "Mesaj Gönder"}
      </button>
      {status === "ok" && (
        <p className="text-sm text-navy">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>
      )}
      {status === "error" && <p className="text-sm text-crimson">{error}</p>}
    </form>
  );
}
