import { EventCategoryPicker } from "@/components/admin/EventCategoryPicker";
import { EventCoverField } from "@/components/admin/EventCoverField";
import { prisma } from "@/lib/prisma";
import { deleteEvent, deleteEventCategory, saveEvent, saveEventCategory } from "../actions";

export default async function AdminEventsPage() {
  const [events, categories] = await Promise.all([
    prisma.event.findMany({
      orderBy: { eventDate: "desc" },
      include: { categories: true },
    }),
    prisma.eventCategory.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">
          Etkinlikler
        </h1>
        <p className="mt-1 text-sm text-muted">
          Etkinlik ekleyin, kategorilere ayırın ve yönetin.
        </p>
      </div>

      <section className="space-y-4 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Kategoriler</h2>
        <form action={saveEventCategory} className="flex flex-wrap gap-2">
          <input
            name="name"
            required
            placeholder="Yeni kategori adı"
            className="min-w-[200px] flex-1 border border-line px-3 py-2"
          />
          <button className="bg-crimson px-4 py-2 text-sm text-white">Kategori Ekle</button>
        </form>
        {categories.length === 0 ? (
          <p className="text-sm text-muted">Henüz kategori yok.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center gap-2 rounded-sm border border-line bg-cream/50 px-3 py-2 text-sm"
              >
                <span className="font-medium text-navy">{category.name}</span>
                <form action={deleteEventCategory}>
                  <input type="hidden" name="id" value={category.id} />
                  <button className="text-crimson underline">Sil</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form action={saveEvent} className="space-y-3 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Yeni etkinlik</h2>
        <input name="title" required placeholder="Başlık" className="w-full border border-line px-3 py-2" />
        <textarea name="content" required rows={5} placeholder="İçerik" className="w-full border border-line px-3 py-2" />
        <EventCoverField defaultUrl={null} />
        <EventCategoryPicker categories={categories} />
        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" defaultChecked />
          Yayında
        </label>
        <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
      </form>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="border border-line bg-white p-5">
            <form action={saveEvent} className="space-y-3">
              <input type="hidden" name="id" value={event.id} />
              <input name="title" defaultValue={event.title} required className="w-full border border-line px-3 py-2" />
              <textarea name="content" defaultValue={event.content} required rows={4} className="w-full border border-line px-3 py-2" />
              <EventCoverField defaultUrl={event.coverImage} />
              <EventCategoryPicker
                categories={categories}
                selectedIds={event.categories.map((category) => category.id)}
              />
              <label className="flex items-center gap-2 text-sm">
                <input name="published" type="checkbox" defaultChecked={event.published} />
                Yayında
              </label>
              <button className="bg-navy px-4 py-2 text-sm text-white">Güncelle</button>
            </form>
            <form action={deleteEvent} className="mt-2">
              <input type="hidden" name="id" value={event.id} />
              <button className="text-sm text-crimson underline">Sil</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
