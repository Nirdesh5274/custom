"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SettingsFormProps = {
  settings: Record<string, string>;
  initialLastSavedAt?: string | null;
};

export function SettingsForm({ settings: initialSettings, initialLastSavedAt = null }: SettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(initialSettings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(initialLastSavedAt);

  const formattedLastSavedAt = lastSavedAt
    ? new Date(lastSavedAt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setErrorText(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: Object.entries(form).map(([key, value]) => ({ key, value })),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Save failed");
      }

      const result: { savedAt?: string } = await response.json();

      setStatus("saved");
      setLastSavedAt(result.savedAt ?? new Date().toISOString());
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Save failed");
    }
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSave} className="admin-card p-5">
      <h3 className="font-heading text-xl font-black text-[#0d2f52]">App Content Settings</h3>
      <p className="mt-1 mb-4 text-sm text-[#4b6077]">Modify the text blocks and titles displayed on the homepage.</p>
      {formattedLastSavedAt ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#456385]">Last saved: {formattedLastSavedAt}</p>
      ) : null}
      
      <div className="space-y-4">
        <div>
          <label className="form-label text-xs uppercase tracking-wide">Homepage Ticker Message</label>
          <textarea rows={2} value={form.ticker_message} onChange={(e) => handleChange("ticker_message", e.target.value)} className="input-control text-sm" />
        </div>
        <div>
          <label className="form-label text-xs uppercase tracking-wide">About Us (Paragraph 1)</label>
          <textarea rows={2} value={form.about_us_p1} onChange={(e) => handleChange("about_us_p1", e.target.value)} className="input-control text-sm" />
        </div>
        <div>
          <label className="form-label text-xs uppercase tracking-wide">About Us (Paragraph 2)</label>
          <textarea rows={2} value={form.about_us_p2} onChange={(e) => handleChange("about_us_p2", e.target.value)} className="input-control text-sm" />
        </div>
        <div>
          <label className="form-label text-xs uppercase tracking-wide">About Us (Paragraph 3)</label>
          <textarea rows={2} value={form.about_us_p3} onChange={(e) => handleChange("about_us_p3", e.target.value)} className="input-control text-sm" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="form-label text-xs uppercase tracking-wide">Helpline Block Title</label>
            <textarea rows={2} value={form.helpline_title} onChange={(e) => handleChange("helpline_title", e.target.value)} className="input-control text-sm" />
          </div>
          <div>
            <label className="form-label text-xs uppercase tracking-wide">Helpline Block Subtitle</label>
            <textarea rows={2} value={form.helpline_subtitle} onChange={(e) => handleChange("helpline_subtitle", e.target.value)} className="input-control text-sm" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={status === "saving"} className="btn-primary mt-6 text-sm disabled:opacity-70">
        {status === "saving" ? "Saving..." : "Save all text settings"}
      </button>
      {status === "saved" ? <p className="mt-2 text-sm text-emerald-700">All configurations successfully saved.</p> : null}
      {status === "error" ? <p className="mt-2 text-sm text-red-600">Save failed. {errorText ?? "Please retry."}</p> : null}
    </form>
  );
}
