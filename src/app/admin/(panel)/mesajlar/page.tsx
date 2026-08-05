import { prisma } from "@/lib/prisma";
import { deleteMessage, markMessageRead } from "../actions";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Mesajlar</h1>
      {messages.length === 0 && <p className="text-muted">Henüz mesaj yok.</p>}
      {messages.map((msg) => (
        <article
          key={msg.id}
          className={`border border-line bg-white p-5 ${msg.read ? "opacity-80" : "border-l-4 border-l-crimson"}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-navy">{msg.name}</h2>
              <p className="text-sm text-muted">
                {msg.email}
                {msg.phone ? ` · ${msg.phone}` : ""}
              </p>
              {msg.subject && <p className="mt-1 text-sm font-medium">{msg.subject}</p>}
            </div>
            <time className="text-xs text-muted">
              {new Date(msg.createdAt).toLocaleString("tr-TR")}
            </time>
          </div>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{msg.message}</p>
          <div className="mt-4 flex gap-4">
            {!msg.read && (
              <form action={markMessageRead}>
                <input type="hidden" name="id" value={msg.id} />
                <button className="text-sm text-navy underline">Okundu işaretle</button>
              </form>
            )}
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={msg.id} />
              <button className="text-sm text-crimson underline">Sil</button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
