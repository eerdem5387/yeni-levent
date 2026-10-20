import {
  AdminEmptyState,
  AdminGhostButton,
  AdminPageHeader,
  AdminRecordCard,
} from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteMessage } from "../actions";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Mesajlar"
        description={`${messages.length} mesaj`}
      />

      {messages.length === 0 ? (
        <AdminEmptyState
          title="Henüz mesaj yok"
          description="İletişim formundan gelen mesajlar burada listelenir."
        />
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <AdminRecordCard key={msg.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-[#082a5e]">{msg.name}</h2>
                  <p className="mt-1 text-sm text-[#39557e]">
                    {msg.email}
                    {msg.phone ? ` · ${msg.phone}` : ""}
                  </p>
                  {msg.subject ? (
                    <p className="mt-2 text-sm font-medium text-[#082a5e]">{msg.subject}</p>
                  ) : null}
                </div>
                <time className="text-xs text-[#39557e]/80">
                  {new Date(msg.createdAt).toLocaleString("tr-TR")}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-line rounded-xl bg-[#f4f7fb] px-4 py-3 text-sm leading-relaxed text-[#39557e]">
                {msg.message}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={msg.id} />
                  <AdminGhostButton tone="danger">Sil</AdminGhostButton>
                </form>
              </div>
            </AdminRecordCard>
          ))}
        </div>
      )}
    </div>
  );
}
