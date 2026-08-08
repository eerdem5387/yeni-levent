"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("E-posta veya şifre hatalı.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md border border-line bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/theme/levent-akademik-logo.png"
            alt="Levent Koleji"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-navy">
            Yönetim Paneli
          </h1>
          <p className="mt-1 text-sm text-muted">Levent Koleji</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-muted">E-posta</span>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@leventkoleji.com"
              className="w-full border border-line px-3 py-2.5 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">Şifre</span>
            <input
              name="password"
              type="password"
              required
              defaultValue="admin123"
              className="w-full border border-line px-3 py-2.5 outline-none focus:ring-2 focus:ring-crimson/30"
            />
          </label>
          {error && <p className="text-sm text-crimson">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-soft disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
