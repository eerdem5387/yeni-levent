"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ImageIcon, Search, Upload, X } from "lucide-react";

type MediaItem = {
  id: string;
  url: string;
  filename: string;
  alt: string;
};

type StaffPhotoFieldProps = {
  defaultUrl?: string | null;
  required?: boolean;
};

export function StaffPhotoField({ defaultUrl, required = false }: StaffPhotoFieldProps) {
  const [photoUrl, setPhotoUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!required) return;

    const form = rootRef.current?.closest("form");
    if (!form) return;

    function handleSubmit(event: SubmitEvent) {
      if (uploading) {
        event.preventDefault();
        setError("Fotoğraf yükleniyor, lütfen bekleyin.");
        return;
      }
      if (!photoUrl.trim()) {
        event.preventDefault();
        setError("Fotoğraf zorunludur.");
      }
    }

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [photoUrl, uploading, required]);

  async function loadLibrary(search = "") {
    setLoadingLibrary(true);
    setError("");
    try {
      const params = new URLSearchParams({ folder: "staff" });
      if (search.trim()) params.set("q", search.trim());
      const response = await fetch(`/api/admin/media?${params.toString()}`);
      const data = (await response.json()) as { items?: MediaItem[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Kütüphane yüklenemedi.");
      setItems(data.items ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Kütüphane yüklenemedi.");
    } finally {
      setLoadingLibrary(false);
    }
  }

  async function openLibrary() {
    setLibraryOpen(true);
    setQuery("");
    await loadLibrary();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("folder", "staff");

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        url?: string;
        item?: MediaItem;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Fotoğraf yüklenemedi.");
      }

      if (!data.url) {
        throw new Error("Fotoğraf yüklenemedi.");
      }

      setPhotoUrl(data.url);
      setLibraryOpen(false);
      setError("");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Fotoğraf yüklenemedi.",
      );
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  return (
    <div ref={rootRef} className="space-y-3">
      <label className="block text-sm font-medium text-navy">
        Fotoğraf{required && <span className="text-crimson"> *</span>}
      </label>

      <div className="flex flex-wrap items-start gap-4">
        <div className="relative h-28 w-24 overflow-hidden rounded-xl border border-[#d0dae9] bg-[#e7effc]">
          {photoUrl ? (
            <Image src={photoUrl} alt="Kadro fotoğrafı" fill className="object-cover object-top" />
          ) : (
            <div className="flex h-full items-center justify-center text-[#39557e]/50">
              <ImageIcon className="h-6 w-6" />
            </div>
          )}
        </div>

        <div className="flex min-w-[220px] flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openLibrary}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d0dae9] bg-white px-3 py-2 text-sm font-semibold text-[#082a5e] transition hover:border-[#1363df]/40"
            >
              <ImageIcon className="h-4 w-4" />
              Kütüphaneden seç
            </button>
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#082a5e] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1363df] disabled:opacity-60"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Yükleniyor..." : "Yeni yükle"}
            </button>
            {photoUrl ? (
              <button
                type="button"
                onClick={() => setPhotoUrl("")}
                className="inline-flex items-center gap-2 rounded-xl border border-[#f3c4c8] bg-[#fff7f8] px-3 py-2 text-sm font-semibold text-[#b42318]"
              >
                Kaldır
              </button>
            ) : null}
          </div>
          <p className="text-xs text-[#39557e]">
            Medya kütüphanesinden seçin veya bilgisayardan yeni fotoğraf yükleyin.
            JPG / PNG / WebP · en fazla 5 MB · önerilen 800×1000 (4:5)
          </p>
        </div>
      </div>

      <input type="hidden" name="photoUrl" value={photoUrl} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={uploading}
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-xs text-crimson">{error}</p>}

      {libraryOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#061e43]/55 backdrop-blur-sm"
            aria-label="Kapat"
            onClick={() => setLibraryOpen(false)}
          />
          <div className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#d0dae9] bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-[#e7effc] px-5 py-4">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
                  Medya Kütüphanesi
                </h3>
                <p className="text-xs text-[#39557e]">Öğretmen fotoğraflarından birini seçin</p>
              </div>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="rounded-xl border border-[#d0dae9] p-2 text-[#082a5e]"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-b border-[#e7effc] px-5 py-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#39557e]/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void loadLibrary(query);
                    }
                  }}
                  placeholder="Dosya adına göre ara..."
                  className="w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1363df]"
                />
              </div>
              <button
                type="button"
                onClick={() => void loadLibrary(query)}
                className="rounded-xl border border-[#d0dae9] px-3 py-2 text-sm font-semibold text-[#082a5e]"
              >
                Ara
              </button>
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl bg-[#082a5e] px-3 py-2 text-sm font-semibold text-white"
              >
                Yeni yükle
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {loadingLibrary ? (
                <p className="py-16 text-center text-sm text-[#39557e]">Yükleniyor...</p>
              ) : items.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#39557e]">
                  Kütüphanede görsel yok. Yeni yükleyebilirsiniz.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {items.map((item) => {
                    const selected = photoUrl === item.url;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setPhotoUrl(item.url);
                          setLibraryOpen(false);
                          setError("");
                        }}
                        className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                          selected
                            ? "border-[#1363df] ring-2 ring-[#1363df]/30"
                            : "border-[#e7effc] hover:border-[#1363df]/40"
                        }`}
                      >
                        <div className="relative aspect-[4/5] bg-[#e7effc]">
                          <Image
                            src={item.url}
                            alt={item.alt || item.filename}
                            fill
                            className="object-cover object-top"
                            unoptimized
                          />
                          {selected ? (
                            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1363df] text-white">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : null}
                        </div>
                        <p className="truncate px-2.5 py-2 text-xs text-[#39557e]">
                          {item.alt || item.filename}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
