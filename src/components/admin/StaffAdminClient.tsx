"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  ChevronDown,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { StaffPhotoField } from "@/components/admin/StaffPhotoField";
import {
  deleteStaff,
  deleteStaffCategory,
  saveStaff,
  saveStaffCategory,
} from "@/app/admin/(panel)/actions";

type Category = {
  id: string;
  name: string;
  order: number;
};

type StaffMember = {
  id: string;
  name: string;
  title: string;
  photoUrl: string | null;
  order: number;
  published: boolean;
  categoryId: string | null;
  category: { id: string; name: string } | null;
};

const fieldClass =
  "w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-3.5 py-2.5 text-sm text-[#082a5e] outline-none transition focus:border-[#1363df] focus:ring-4 focus:ring-[#1363df]/15";

function CategorySelect({
  categories,
  defaultValue,
}: {
  categories: Category[];
  defaultValue?: string | null;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-[#39557e]">Kategori</span>
      <select
        name="categoryId"
        defaultValue={defaultValue ?? ""}
        className={fieldClass}
      >
        <option value="">Kategorisiz</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Modal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#061e43]/55 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-[#d0dae9] bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#e7effc] px-5 py-4">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
              {title}
            </h3>
            {description ? (
              <p className="mt-0.5 text-xs text-[#39557e]">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#d0dae9] p-2 text-[#082a5e]"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}

export function StaffAdminClient({
  staff,
  categories,
}: {
  staff: StaffMember[];
  categories: Category[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editMember, setEditMember] = useState<StaffMember | null>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return staff.filter((member) => {
      if (filterCategory === "uncategorized" && member.categoryId) return false;
      if (
        filterCategory !== "all" &&
        filterCategory !== "uncategorized" &&
        member.categoryId !== filterCategory
      ) {
        return false;
      }
      if (!q) return true;
      return (
        member.name.toLocaleLowerCase("tr-TR").includes(q) ||
        member.title.toLocaleLowerCase("tr-TR").includes(q) ||
        (member.category?.name.toLocaleLowerCase("tr-TR").includes(q) ?? false)
      );
    });
  }, [staff, query, filterCategory]);

  const grouped = useMemo(() => {
    const groups = [
      ...categories.map((category) => ({
        key: category.id,
        title: category.name,
        members: filtered.filter((member) => member.categoryId === category.id),
      })),
      {
        key: "uncategorized",
        title: "Kategorisiz",
        members: filtered.filter((member) => !member.categoryId),
      },
    ].filter((group) => group.members.length > 0);

    if (filterCategory !== "all") {
      return groups.filter((group) =>
        filterCategory === "uncategorized"
          ? group.key === "uncategorized"
          : group.key === filterCategory,
      );
    }
    return groups;
  }, [categories, filtered, filterCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#082a5e] sm:text-3xl">
            Kadro Yönetimi
          </h1>
          <p className="mt-1.5 text-sm text-[#39557e]">
            {staff.length} üye · {categories.length} kategori
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#082a5e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1363df]"
        >
          <Plus className="h-4 w-4" />
          Yeni üye ekle
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e7effc] bg-white p-3 shadow-[0_8px_24px_rgba(8,42,94,0.04)]">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#39557e]/55" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İsim, unvan veya kategori ara..."
            className="w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1363df]"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-3 py-2.5 text-sm text-[#082a5e] outline-none"
        >
          <option value="all">Tüm kategoriler</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          <option value="uncategorized">Kategorisiz</option>
        </select>
      </div>

      {grouped.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d0dae9] bg-white px-6 py-16 text-center">
          <Users className="mx-auto h-8 w-8 text-[#39557e]/40" />
          <p className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
            {staff.length === 0 ? "Henüz kadro üyesi yok" : "Sonuç bulunamadı"}
          </p>
          <p className="mt-1 text-sm text-[#39557e]">
            {staff.length === 0
              ? "Sağ üstten yeni üye ekleyerek başlayın."
              : "Arama veya filtreyi değiştirin."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.key} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                  {group.title}
                </h2>
                <span className="rounded-full bg-[#e7effc] px-2.5 py-1 text-xs font-semibold text-[#1363df]">
                  {group.members.length}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.members.map((member) => (
                  <article
                    key={member.id}
                    className="overflow-hidden rounded-2xl border border-[#e7effc] bg-white shadow-[0_8px_24px_rgba(8,42,94,0.04)]"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#e7effc]">
                        {member.photoUrl ? (
                          <Image
                            src={member.photoUrl}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            unoptimized={member.photoUrl.startsWith("http")}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#39557e]/40">
                            <Users className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {!member.published ? (
                            <span className="rounded-full bg-[#fff4db] px-2 py-0.5 text-[10px] font-semibold text-[#9a6b00]">
                              Taslak
                            </span>
                          ) : null}
                          <span className="rounded-full bg-[#f4f7fb] px-2 py-0.5 text-[10px] font-semibold text-[#39557e]">
                            Sıra {member.order}
                          </span>
                        </div>
                        <h3 className="mt-1 truncate font-semibold text-[#082a5e]">
                          {member.name}
                        </h3>
                        <p className="truncate text-sm text-[#1363df]">{member.title}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setEditMember(member)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d0dae9] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#082a5e] hover:border-[#1363df]/40"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Düzenle
                          </button>
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => {
                              if (!confirm(`${member.name} silinsin mi?`)) return;
                              const formData = new FormData();
                              formData.set("id", member.id);
                              startTransition(async () => {
                                await deleteStaff(formData);
                                router.refresh();
                              });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#f3c4c8] bg-[#fff7f8] px-2.5 py-1.5 text-xs font-semibold text-[#b42318] disabled:opacity-60"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <details
        open={categoriesOpen}
        onToggle={(e) => setCategoriesOpen((e.target as HTMLDetailsElement).open)}
        className="rounded-2xl border border-[#e7effc] bg-white shadow-[0_8px_24px_rgba(8,42,94,0.04)]"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="font-semibold text-[#082a5e]">Kategori ayarları</p>
            <p className="text-xs text-[#39557e]">
              Nadiren kullanılır · {categories.length} kategori
            </p>
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#39557e] transition ${
              categoriesOpen ? "rotate-180" : ""
            }`}
          />
        </summary>
        <div className="space-y-4 border-t border-[#e7effc] px-5 py-4">
          <form action={saveStaffCategory} className="flex flex-wrap items-end gap-2">
            <label className="min-w-[200px] flex-1 text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Yeni kategori</span>
              <input
                name="name"
                required
                placeholder="Örn. Matematik"
                className={fieldClass}
              />
            </label>
            <input type="hidden" name="order" value={categories.length + 1} />
            <button
              type="submit"
              className="rounded-xl bg-[#082a5e] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Ekle
            </button>
          </form>

          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col gap-2 rounded-xl border border-[#e7effc] bg-[#f8fbff] p-3 sm:flex-row sm:items-center"
              >
                <form
                  action={saveStaffCategory}
                  className="flex flex-1 flex-wrap items-center gap-2"
                >
                  <input type="hidden" name="id" value={category.id} />
                  <input
                    name="name"
                    defaultValue={category.name}
                    required
                    className={`${fieldClass} min-w-[160px] flex-1`}
                  />
                  <input
                    name="order"
                    type="number"
                    defaultValue={category.order}
                    className={`${fieldClass} w-20`}
                    title="Sıra"
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-[#d0dae9] bg-white px-3 py-2 text-xs font-semibold text-[#082a5e]"
                  >
                    Kaydet
                  </button>
                </form>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (!confirm(`“${category.name}” kategorisi silinsin mi?`)) return;
                    const formData = new FormData();
                    formData.set("id", category.id);
                    startTransition(async () => {
                      await deleteStaffCategory(formData);
                      router.refresh();
                    });
                  }}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-[#b42318] disabled:opacity-60"
                >
                  Sil
                </button>
              </div>
            ))}
            {categories.length === 0 ? (
              <p className="text-sm text-[#39557e]">Henüz kategori yok.</p>
            ) : null}
          </div>
        </div>
      </details>

      {addOpen ? (
        <Modal
          title="Yeni üye ekle"
          description="Fotoğraf, ad, unvan ve kategori yeterli."
          onClose={() => setAddOpen(false)}
        >
          <form action={saveStaff} className="space-y-4">
            <StaffPhotoField required />
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Ad Soyad</span>
              <input name="name" required className={fieldClass} placeholder="Örn. Ayşe Yılmaz" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Unvan / Branş</span>
              <input
                name="title"
                required
                className={fieldClass}
                placeholder="Örn. Matematik Öğretmeni"
              />
            </label>
            <CategorySelect categories={categories} />
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#39557e]">Sıra</span>
                <input name="order" type="number" defaultValue={0} className={fieldClass} />
              </label>
              <label className="flex items-end gap-2 pb-2.5 text-sm font-medium text-[#082a5e]">
                <input name="published" type="checkbox" defaultChecked className="h-4 w-4" />
                Yayında
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="rounded-xl border border-[#d0dae9] px-4 py-2.5 text-sm font-semibold text-[#082a5e]"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#082a5e] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Kaydet
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {editMember ? (
        <Modal
          title="Üyeyi düzenle"
          description={editMember.name}
          onClose={() => setEditMember(null)}
        >
          <form key={editMember.id} action={saveStaff} className="space-y-4">
            <input type="hidden" name="id" value={editMember.id} />
            <StaffPhotoField defaultUrl={editMember.photoUrl} required />
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Ad Soyad</span>
              <input
                name="name"
                required
                defaultValue={editMember.name}
                className={fieldClass}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-[#39557e]">Unvan / Branş</span>
              <input
                name="title"
                required
                defaultValue={editMember.title}
                className={fieldClass}
              />
            </label>
            <CategorySelect
              categories={categories}
              defaultValue={editMember.categoryId}
            />
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-[#39557e]">Sıra</span>
                <input
                  name="order"
                  type="number"
                  defaultValue={editMember.order}
                  className={fieldClass}
                />
              </label>
              <label className="flex items-end gap-2 pb-2.5 text-sm font-medium text-[#082a5e]">
                <input
                  name="published"
                  type="checkbox"
                  defaultChecked={editMember.published}
                  className="h-4 w-4"
                />
                Yayında
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditMember(null)}
                className="rounded-xl border border-[#d0dae9] px-4 py-2.5 text-sm font-semibold text-[#082a5e]"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#082a5e] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Güncelle
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
