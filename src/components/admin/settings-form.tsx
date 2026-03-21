"use client";

import { useState } from "react";

type SettingsFormProps = {
  settings: Record<string, string>;
};

export function SettingsForm({ settings: initialSettings }: SettingsFormProps) {
  const [form, setForm] = useState(initialSettings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    const promises = Object.entries(form).map(([key, value]) =>
      fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      })
    );

    try {
      await Promise.all(promises);
      setStatus("saved");
    } catch (e) {
      setStatus("error");
    }
  }

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSave} className="admin-card p-5">
      <h3 className="font-heading text-xl font-black text-[#0d2f52]">App Content Settings</h3>
      <p className="mt-1 mb-4 text-sm text-[#4b6077]">Modify the text blocks and titles displayed on the homepage.</p>
      
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
      {status === "error" ? <p className="mt-2 text-sm text-red-600">Save failed. Settings schema validation might have failed.</p> : null}
    </form>
  );
}
