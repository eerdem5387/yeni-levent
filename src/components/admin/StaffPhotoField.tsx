"use client";

import Image from "next/image";
import { useState } from "react";

type StaffPhotoFieldProps = {
  defaultUrl?: string | null;
};

export function StaffPhotoField({ defaultUrl }: StaffPhotoFieldProps) {
  const [photoUrl, setPhotoUrl] = useState(defaultUrl ?? "");
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
      const response = await fetch("/api/upload/staff", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Fotoğraf yüklenemedi.");
      }

      if (!data.url) {
        throw new Error("Fotoğraf yüklenemedi.");
      }

      setPhotoUrl(data.url);
    } catch (uploadError) {
      setPhotoUrl(defaultUrl ?? "");
      setError(
        uploadError instanceof Error ? uploadError.message : "Fotoğraf yüklenemedi.",
      );
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-navy">Fotoğraf</label>
      {photoUrl && (
        <div className="relative h-24 w-24 overflow-hidden border border-line bg-navy/5">
          <Image src={photoUrl} alt="Kadro fotoğrafı" fill className="object-cover" />
        </div>
      )}
      <input type="hidden" name="photoUrl" value={photoUrl} />
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={uploading}
        onChange={handleFileChange}
        className="w-full border border-line px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:text-white disabled:opacity-60"
      />
      <p className="text-xs text-muted">
        {uploading
          ? "Fotoğraf yükleniyor..."
          : "Dosya seçildiğinde otomatik yüklenir · JPG, PNG, WebP veya GIF · en fazla 5 MB"}
      </p>
      {error && <p className="text-xs text-crimson">{error}</p>}
    </div>
  );
}
