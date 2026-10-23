import { notFound } from "next/navigation";

export const metadata = { title: "Kadromuz" };

/** Geçici: kadro sayfası ziyaretçilere kapalı; yönetim paneli açık kalır. */
export default function StaffPage() {
  notFound();
}
