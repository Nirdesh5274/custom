"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useRef } from "react";

type FormState = {
  title: string;
  caption: string;
  imageUrl: string;
  section: string;
  isPublished: boolean;
  displayOrder: number;
};

type GalleryFormProps = {
  mode: "create" | "edit";
  galleryId?: string;
  initialValue?: Partial<FormState>;
};

export function GalleryForm({ mode, galleryId, initialValue }: GalleryFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormState>({
    title: initialValue?.title ?? "",
    caption: initialValue?.caption ?? "",
    imageUrl: initialValue?.imageUrl ?? "",
    section: initialValue?.section ?? "Chief Commissionerate",
    isPublished: initialValue?.isPublished ?? true,
    displayOrder: initialValue?.displayOrder ?? 0,
  });

  const payload = useMemo(() => ({ ...form }), [form]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    let finalImageUrl = form.imageUrl.trim();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setError("Failed to upload image. Please ensure the file is valid.");
        setIsSaving(false);
        return;
      }

      const uploadData = await uploadRes.json();
      finalImageUrl = uploadData.url;
    } else if (!finalImageUrl) {
      setError("Please either provide an image URL or upload a file.");
      setIsSaving(false);
      return;
    }

    if (finalImageUrl.startsWith("/uploads/") || /^https?:\/\/localhost(?::\d+)?\/uploads\//i.test(finalImageUrl)) {
      setError("Legacy /uploads URL not allowed. Please upload file again so it is stored in MongoDB.");
      setIsSaving(false);
      return;
    }

    const payloadToSubmit = { ...payload, imageUrl: finalImageUrl };

    const endpoint = mode === "create" ? "/api/admin/gallery" : `/api/admin/gallery/${galleryId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadToSubmit),
    });

    setIsSaving(false);

    if (!response.ok) {
      const message = await response.text();
      setError(message || "Unable to save gallery item. Check all fields and retry.");
      return;
    }

    router.push("/admin/gallery");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-4 p-6">
      <div>
        <label className="form-label">Title</label>
        <input
          required
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          className="input-control"
        />
      </div>

      <div>
        <label className="form-label">Caption</label>
        <textarea
          required
          rows={3}
          value={form.caption}
          onChange={(event) => setForm((prev) => ({ ...prev, caption: event.target.value }))}
          className="input-control"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="form-label">Upload New Image <span className="text-xs font-normal text-[#60758b]">(Recommended)</span></label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="input-control file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
          />
        </div>

        <div>
          <label className="form-label">Or Custom Image URL / Card Link Target (URL)</label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
            placeholder="/gallery/1.svg or link href"
            className="input-control"
            disabled={!!selectedFile}
          />
        </div>

        <div>
          <label className="form-label">Section</label>
          <input
            required
            list="gallery-sections"
            value={form.section}
            onChange={(event) => setForm((prev) => ({ ...prev, section: event.target.value }))}
            className="input-control"
            placeholder="e.g. Hero, Events"
          />
          <datalist id="gallery-sections">
            <option value="Hero" />
            <option value="Officer" />
            <option value="ChiefCard" />
            <option value="PortCard" />
            <option value="AirportCard" />
            <option value="MenuChiefCommissionerate" />
            <option value="MenuPort" />
            <option value="MenuAirport" />
            <option value="MenuPreventive" />
            <option value="MenuAppeals" />
            <option value="MenuCRCL" />
            <option value="Chief Commissionerate" />
            <option value="Events" />
          </datalist>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="form-label">Display order</label>
          <input
            type="number"
            min={0}
            value={form.displayOrder}
            onChange={(event) => setForm((prev) => ({ ...prev, displayOrder: Number(event.target.value || 0) }))}
            className="input-control"
          />
        </div>

        <div className="flex items-end md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#30516f]">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
            />
            Publish this gallery item
          </label>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" disabled={isSaving} className="btn-primary disabled:opacity-70">
        {isSaving ? "Saving..." : mode === "create" ? "Create gallery item" : "Save gallery changes"}
      </button>
    </form>
  );
}
