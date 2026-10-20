import { Download } from "lucide-react";

export function ExportExcelButton({
  href,
  label = "Excel İndir",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-[#082a5e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1363df]"
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
