import { prisma } from "@/lib/prisma";
import { savePage } from "../actions";

export default async function AdminPagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="space-y-10">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Sayfalar</h1>
      {pages.map((page) => (
        <form key={page.id} action={savePage} className="space-y-3 border border-line bg-white p-5">
          <input type="hidden" name="id" value={page.id} />
          <p className="text-xs uppercase tracking-wider text-muted">/{page.slug}</p>
          <input name="title" defaultValue={page.title} required className="w-full border border-line px-3 py-2" />
          <textarea name="content" defaultValue={page.content} required rows={8} className="w-full border border-line px-3 py-2" />
          <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
        </form>
      ))}
    </div>
  );
}
