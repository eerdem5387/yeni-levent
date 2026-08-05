import { prisma } from "@/lib/prisma";
import { StaffPhotoField } from "@/components/admin/StaffPhotoField";
import { deleteStaff, saveStaff } from "../actions";

export default async function AdminStaffPage() {
  const staff = await prisma.staff.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-10">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Kadro</h1>

      <form action={saveStaff} className="space-y-3 border border-line bg-white p-5">
        <h2 className="font-semibold text-navy">Yeni üye</h2>
        <input name="name" required placeholder="Ad Soyad" className="w-full border border-line px-3 py-2" />
        <input name="title" required placeholder="Unvan / Branş" className="w-full border border-line px-3 py-2" />
        <textarea name="bio" rows={3} placeholder="Kısa biyografi" className="w-full border border-line px-3 py-2" />
        <StaffPhotoField />
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">Sıra</label>
          <input name="order" type="number" defaultValue={0} className="w-32 border border-line px-3 py-2" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" defaultChecked /> Yayında
        </label>
        <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
      </form>

      {staff.map((member) => (
        <div key={member.id} className="border border-line bg-white p-5">
          <form action={saveStaff} className="space-y-3">
            <input type="hidden" name="id" value={member.id} />
            <input name="name" defaultValue={member.name} required className="w-full border border-line px-3 py-2" />
            <input name="title" defaultValue={member.title} required className="w-full border border-line px-3 py-2" />
            <textarea name="bio" defaultValue={member.bio} rows={3} className="w-full border border-line px-3 py-2" />
            <StaffPhotoField defaultUrl={member.photoUrl} />
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Sıra</label>
              <input name="order" type="number" defaultValue={member.order} className="w-32 border border-line px-3 py-2" />
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
    </div>
  );
}
