"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PageFormInitialData = {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
};

export function PageForm({ initialData }: { initialData?: PageFormInitialData }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMsg("");

    const url = initialData?.id ? `/api/admin/pages/${initialData.id}` : "/api/admin/pages";
    const method = initialData?.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push("/admin/pages");
      router.refresh();
    } else {
      const data = await response.json();
      setErrorMsg(data.message || "Something went wrong.");
      setStatus("error");
    }
  }

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    
    setStatus("saving");
    await fetch(`/api/admin/pages/${initialData.id}`, { method: "DELETE" });
    router.push("/admin/pages");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-5 p-5">
      <div>
        <label className="form-label">Page Title</label>
        <input
          required
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input-control"
          placeholder="e.g. History of Port"
        />
      </div>

      <div>
        <label className="form-label">URL Slug</label>
        <input
          required
          type="text"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="input-control font-mono"
          placeholder="e.g. port-about-us"
        />
        <p className="mt-1 text-xs text-[#617c99]">This will be the URL: /p/[Your Slug]</p>
      </div>

      <div>
        <label className="form-label">Content (HTML Supported)</label>
        <textarea
          required
          rows={16}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="input-control font-mono text-sm leading-relaxed"
          placeholder="<h1>Heading</h1><p>Your paragraph here...</p>"
        />
      </div>

      {status === "error" && <p className="text-sm font-semibold text-red-600">{errorMsg}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary">
          {status === "saving" ? "Saving..." : initialData ? "Update Page" : "Create Page"}
        </button>
        {initialData && (
          <button type="button" onClick={handleDelete} className="btn-secondary text-red-600 hover:border-red-200 hover:bg-red-50">
            Delete Page
          </button>
        )}
      </div>
    </form>
  );
}
