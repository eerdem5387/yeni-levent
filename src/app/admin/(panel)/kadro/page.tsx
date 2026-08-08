import { prisma } from "@/lib/prisma";
import { StaffPhotoField } from "@/components/admin/StaffPhotoField";
import {
  deleteStaff,
  deleteStaffCategory,
  saveStaff,
  saveStaffCategory,
} from "../actions";

function CategorySelect({
  categories,
  defaultValue,
}: {
  categories: { id: string; name: string }[];
  defaultValue?: string | null;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-navy">Kategori</label>
      <select
        name="categoryId"
        defaultValue={defaultValue ?? ""}
        className="w-full border border-line px-3 py-2"
      >
        <option value="">Kategori seçin</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default async function AdminStaffPage() {
  const [staff, categories] = await Promise.all([
    prisma.staff.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { category: true },
    }),
    prisma.staffCategory.findMany({ orderBy: { order: "asc" } }),
  ]);

  const groupedStaff = [
    ...categories.map((category) => ({
      key: category.id,
      title: category.name,
      members: staff.filter((member) => member.categoryId === category.id),
    })),
    {
      key: "uncategorized",
      title: "Kategorisiz",
      members: staff.filter((member) => !member.categoryId),
    },
  ].filter((group) => group.members.length > 0);

  return (
    <div className="space-y-10">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Kadro</h1>

      <section className="space-y-4 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Kategoriler</h2>
        <p className="text-sm text-muted">
          Kaynak sitedeki gibi branş grupları. Üyeleri bu kategorilere atayın.
        </p>
        <form action={saveStaffCategory} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label className="mb-1 block text-sm font-medium text-navy">Yeni kategori</label>
            <input
              name="name"
              required
              placeholder="Örn. Matematik"
              className="w-full border border-line px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy">Sıra</label>
            <input
              name="order"
              type="number"
              defaultValue={categories.length + 1}
              className="w-24 border border-line px-3 py-2"
            />
          </div>
          <button className="bg-navy px-4 py-2 text-sm text-white">Ekle</button>
        </form>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-3 border border-line p-3 sm:flex-row sm:items-end"
            >
              <form action={saveStaffCategory} className="flex flex-1 flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={category.id} />
                <div className="min-w-[200px] flex-1">
                  <input
                    name="name"
                    defaultValue={category.name}
                    required
                    className="w-full border border-line px-3 py-2"
                  />
                </div>
                <div>
                  <input
                    name="order"
                    type="number"
                    defaultValue={category.order}
                    className="w-24 border border-line px-3 py-2"
                  />
                </div>
                <button className="bg-navy px-3 py-2 text-sm text-white">Güncelle</button>
              </form>
              <form action={deleteStaffCategory}>
                <input type="hidden" name="id" value={category.id} />
                <button className="text-sm text-crimson underline">Sil</button>
              </form>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-muted">Henüz kategori yok. Seed veya yukarıdan ekleyin.</p>
          )}
        </div>
      </section>

      <form action={saveStaff} className="space-y-3 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Yeni üye</h2>
        <input name="name" required placeholder="Ad Soyad" className="w-full border border-line px-3 py-2" />
        <input
          name="title"
          required
          placeholder="Unvan / Branş"
          className="w-full border border-line px-3 py-2"
        />
        <CategorySelect categories={categories} />
        <textarea
          name="bio"
          rows={3}
          placeholder="Kısa biyografi"
          className="w-full border border-line px-3 py-2"
        />
        <StaffPhotoField required />
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">
            Sıra <span className="font-normal text-muted">(küçük sayı = daha önde)</span>
          </label>
          <input name="order" type="number" defaultValue={0} className="w-32 border border-line px-3 py-2" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" defaultChecked /> Yayında
        </label>
        <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
      </form>

      {groupedStaff.map((group) => (
        <section key={group.key} className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-navy">
              {group.title}
            </h2>
            <p className="text-xs text-muted">Sıraya göre listelenir</p>
          </div>
          {group.members.map((member) => (
            <div key={member.id} className="border border-line bg-white p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded bg-navy/8 px-2 py-1 font-semibold text-navy">
                  Sıra: {member.order}
                </span>
                {member.category ? (
                  <span className="rounded bg-[#e7effc] px-2 py-1 text-[#1363df]">
                    {member.category.name}
                  </span>
                ) : null}
              </div>
              <form action={saveStaff} className="space-y-3">
                <input type="hidden" name="id" value={member.id} />
                <input
                  name="name"
                  defaultValue={member.name}
                  required
                  className="w-full border border-line px-3 py-2"
                />
                <input
                  name="title"
                  defaultValue={member.title}
                  required
                  className="w-full border border-line px-3 py-2"
                />
                <CategorySelect categories={categories} defaultValue={member.categoryId} />
                <textarea
                  name="bio"
                  defaultValue={member.bio}
                  rows={3}
                  className="w-full border border-line px-3 py-2"
                />
                <StaffPhotoField defaultUrl={member.photoUrl} />
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    Sıra <span className="font-normal text-muted">(küçük sayı = daha önde)</span>
                  </label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={member.order}
                    className="w-32 border border-line px-3 py-2"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input name="published" type="checkbox" defaultChecked={member.published} /> Yayında
                </label>
                <button className="bg-navy px-4 py-2 text-sm text-white">Güncelle</button>
              </form>
              <form action={deleteStaff} className="mt-2">
                <input type="hidden" name="id" value={member.id} />
                <button className="text-sm text-crimson underline">Sil</button>
              </form>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
