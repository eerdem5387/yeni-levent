"use client";

import Image from "next/image";
import { useState } from "react";

type EventCoverFieldProps = {
  defaultUrl?: string | null;
};

export function EventCoverField({ defaultUrl }: EventCoverFieldProps) {
  const [coverUrl, setCoverUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("/api/upload/event-cover", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Görsel yüklenemedi.");
      }

      if (!data.url) {
        throw new Error("Görsel yüklenemedi.");
      }

      setCoverUrl(data.url);
    } catch (uploadError) {
      setCoverUrl(defaultUrl ?? "");
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Görsel yüklenemedi.",
      );
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy">Etkinlik Görseli</label>

      {coverUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-navy/5">
          <Image
            src={coverUrl}
            alt="Etkinlik görseli"
            fill
            className="object-cover"
          />
        </div>
      )}

      <input type="hidden" name="coverImage" value={coverUrl} />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={uploading}
        onChange={handleFileChange}
        className="w-full border border-line px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:text-white disabled:opacity-60"
      />

      <p className="text-xs text-muted">
        Dosya seçildiğinde otomatik yüklenir · JPG, PNG, WebP veya GIF · en fazla 5 MB
      </p>

      {error && <p className="text-xs text-crimson">{error}</p>}
    </div>
  );
}

