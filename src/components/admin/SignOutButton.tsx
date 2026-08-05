"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm text-navy underline hover:text-crimson md:text-white/80 md:hover:text-white"
    >
      Çıkış yap
    </button>
  );
}
