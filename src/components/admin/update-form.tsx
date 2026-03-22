"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type UpdateType = "NOTICE" | "NEWS" | "EVENT";

type FormState = {
  title: string;
  summary: string;
  body: string;
  type: UpdateType;
  isPublished: boolean;
  publishedAt: string;
  pdfUrl: string;
};

type UpdateFormProps = {
  mode: "create" | "edit";
  updateId?: string;
  initialValue?: Partial<FormState>;
};

export function UpdateForm({ mode, updateId, initialValue }: UpdateFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploadStatus, setPdfUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    title: initialValue?.title ?? "",
    summary: initialValue?.summary ?? "",
    body: initialValue?.body ?? "",
    type: initialValue?.type ?? "NOTICE",
    isPublished: initialValue?.isPublished ?? true,
    publishedAt: initialValue?.publishedAt ?? new Date().toISOString().slice(0, 16),
    pdfUrl: initialValue?.pdfUrl ?? "",
  });

  async function uploadPdf(file: File): Promise<string | null> {
    setPdfUploadStatus("uploading");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) { setPdfUploadStatus("error"); return null; }
    const data = await res.json();
    setPdfUploadStatus("done");
    return data.url as string;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    let finalPdfUrl = form.pdfUrl;
    if (pdfFile) {
      const uploaded = await uploadPdf(pdfFile);
      if (!uploaded) {
        setError("PDF upload failed. Please try again.");
        setIsSaving(false);
        return;
      }
      finalPdfUrl = uploaded;
    }

    const payload = {
      ...form,
      pdfUrl: finalPdfUrl || null,
      publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
    };

    const endpoint = mode === "create" ? "/api/admin/updates" : `/api/admin/updates/${updateId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.message ? JSON.stringify(data.message) : "Unable to save update. Check all fields and retry.");
      return;
    }

    router.push("/admin/updates");
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
          placeholder="Enter notice/news title..."
        />
      </div>

      <div>
        <label className="form-label">Summary</label>
        <textarea
          required
          rows={3}
          value={form.summary}
          onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
          className="input-control"
          placeholder="Short summary shown on cards..."
        />
      </div>

      <div>
        <label className="form-label">Body / Full Content</label>
        <textarea
          required
          rows={10}
          value={form.body}
          onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
          className="input-control"
          placeholder="Full text of the notice or news article..."
        />
      </div>

      {/* ─── PDF UPLOAD SECTION ─── */}
      <div className="rounded-xl border border-dashed border-[#b8cedf] bg-[#f4f9ff] p-4">
        <label className="form-label">Attach PDF <span className="ml-2 text-xs font-normal text-[#6b8aa5]">(optional — for official notices, orders, circulars)</span></label>

        <input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setPdfFile(f);
            setPdfUploadStatus("idle");
            if (!f) setForm((prev) => ({ ...prev, pdfUrl: "" }));
          }}
        />

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => pdfInputRef.current?.click()}
            className="btn-secondary text-sm"
          >
            📎 {pdfFile ? "Change PDF" : "Select PDF"}
          </button>

          {pdfFile && (
            <span className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-[#1b4f72] shadow-sm">
              📄 {pdfFile.name}
              <button
                type="button"
                onClick={() => { setPdfFile(null); setPdfUploadStatus("idle"); if (pdfInputRef.current) pdfInputRef.current.value = ""; }}
                className="text-red-400 hover:text-red-600"
              >✕</button>
            </span>
          )}

          {pdfUploadStatus === "uploading" && <span className="text-xs text-[#2f80ed]">Uploading PDF...</span>}
          {pdfUploadStatus === "done" && <span className="text-xs text-emerald-600">✓ PDF uploaded</span>}
          {pdfUploadStatus === "error" && <span className="text-xs text-red-600">Upload failed</span>}
        </div>

        {/* Show existing PDF if editing */}
        {form.pdfUrl && !pdfFile && (
          <p className="mt-2 text-xs text-[#3a7bd5]">
            Current PDF: <a href={form.pdfUrl} target="_blank" rel="noopener" className="underline">{form.pdfUrl}</a>
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="form-label">Type</label>
          <select
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as UpdateType }))}
            className="input-control"
          >
            <option value="NOTICE">Notice</option>
            <option value="NEWS">News</option>
            <option value="EVENT">Event</option>
          </select>
        </div>

        <div>
          <label className="form-label">Publish date</label>
          <input
            type="datetime-local"
            value={form.publishedAt}
            onChange={(event) => setForm((prev) => ({ ...prev, publishedAt: event.target.value }))}
            className="input-control"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#30516f]">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
            />
            Publish immediately
          </label>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isSaving}
        className="btn-primary disabled:opacity-70"
      >
        {isSaving ? "Saving..." : mode === "create" ? "Create update" : "Save changes"}
      </button>
    </form>
  );
}
