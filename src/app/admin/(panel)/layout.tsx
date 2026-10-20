import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { authOptions } from "@/lib/auth";
import { isNextAuthConfigured } from "@/lib/env";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isNextAuthConfigured()) {
    redirect("/admin/login?error=config");
  }

  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    redirect("/admin/login?error=config");
  }

  if (!session) redirect("/admin/login");

  return <AdminShell email={session.user?.email}>{children}</AdminShell>;
}
