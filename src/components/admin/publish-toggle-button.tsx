"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PublishToggleButtonProps = {
  id: string;
  isPublished: boolean;
};

export function PublishToggleButton({ id, isPublished }: PublishToggleButtonProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleToggle() {
    setIsSaving(true);

    const response = await fetch(`/api/admin/updates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !isPublished }),
    });

    setIsSaving(false);

    if (!response.ok) {
      window.alert("Status update failed");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isSaving}
      className={`rounded-md border px-2.5 py-1 text-xs font-bold ${
        isPublished
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      } disabled:opacity-60`}
    >
      {isSaving ? "Updating..." : isPublished ? "Mark Draft" : "Publish"}
    </button>
  );
}
