"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configError = searchParams.get("error") === "config";
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
      setError(
        res.error === "Configuration"
          ? "Sunucu auth ayarı eksik. Vercel’e NEXTAUTH_SECRET ve NEXTAUTH_URL ekleyin."
          : "E-posta veya şifre hatalı.",
      );
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061e43] px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(19,99,223,0.45), transparent 35%), radial-gradient(circle at 80% 10%, rgba(250,177,35,0.18), transparent 25%), radial-gradient(circle at 70% 80%, rgba(36,148,228,0.25), transparent 30%)",
        }}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="bg-[linear-gradient(135deg,#082a5e_0%,#1363df_100%)] px-8 py-7 text-white">
          <div className="flex items-center gap-3">
            <Image
              src="/theme/levent-akademik-logo.png"
              alt="Levent Koleji"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain p-1"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Yönetim</p>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Levent Koleji
              </h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/80">
            İçerik ve başvuru yönetimine güvenli giriş.
          </p>
        </div>

        <div className="px-8 py-7">
          {configError && (
            <div className="mb-5 rounded-xl border border-[#f3c4c8] bg-[#fff7f8] px-4 py-3 text-sm text-[#b42318]">
              Auth yapılandırması eksik. Vercel Environment Variables içine
              <code className="mx-1 rounded bg-white px-1">NEXTAUTH_SECRET</code> ve
              <code className="mx-1 rounded bg-white px-1">NEXTAUTH_URL</code>
              ekleyip redeploy edin.
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">E-posta</span>
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@leventkoleji.com"
                className="w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-3.5 py-3 outline-none transition focus:border-[#1363df] focus:ring-4 focus:ring-[#1363df]/15"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Şifre</span>
              <input
                name="password"
                type="password"
                required
                defaultValue="admin123"
                className="w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-3.5 py-3 outline-none transition focus:border-[#1363df] focus:ring-4 focus:ring-[#1363df]/15"
              />
            </label>
            {error && (
              <p className="rounded-xl bg-[#fff7f8] px-3 py-2 text-sm text-[#b42318]">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#082a5e] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1363df] disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor..." : "Panele Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#061e43] text-sm text-white/70">
          Yükleniyor...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
