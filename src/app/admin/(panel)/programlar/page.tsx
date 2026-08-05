import { prisma } from "@/lib/prisma";
import { deleteProgram, saveProgram } from "../actions";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Programlar</h1>
      </div>

      <form action={saveProgram} className="space-y-3 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Yeni program</h2>
        <input name="title" required placeholder="Başlık" className="w-full border border-line px-3 py-2" />
        <input name="slug" placeholder="slug" className="w-full border border-line px-3 py-2" />
        <input name="summary" required placeholder="Kısa özet" className="w-full border border-line px-3 py-2" />
        <textarea name="description" required rows={4} placeholder="Açıklama" className="w-full border border-line px-3 py-2" />
        <input name="order" type="number" defaultValue={0} className="w-32 border border-line px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" defaultChecked /> Yayında
        </label>
        <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
      </form>

      {programs.map((program) => (
        <div key={program.id} className="border border-line bg-white p-5">
          <form action={saveProgram} className="space-y-3">
            <input type="hidden" name="id" value={program.id} />
            <input name="title" defaultValue={program.title} required className="w-full border border-line px-3 py-2" />
            <input name="slug" defaultValue={program.slug} className="w-full border border-line px-3 py-2" />
            <input name="summary" defaultValue={program.summary} required className="w-full border border-line px-3 py-2" />
            <textarea name="description" defaultValue={program.description} required rows={4} className="w-full border border-line px-3 py-2" />
            <input name="order" type="number" defaultValue={program.order} className="w-32 border border-line px-3 py-2" />
            <label className="flex items-center gap-2 text-sm">
              <input name="published" type="checkbox" defaultChecked={program.published} /> Yayında
            </label>
            <button className="bg-navy px-4 py-2 text-sm text-white">Güncelle</button>
          </form>
          <form action={deleteProgram} className="mt-2">
            <input type="hidden" name="id" value={program.id} />
            <button className="text-sm text-crimson underline">Sil</button>
          </form>
        </div>
      ))}
    </div>
  );
}
