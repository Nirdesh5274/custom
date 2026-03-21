"use client";

import { useRouter } from "next/navigation";

type DeleteUpdateButtonProps = {
  id: string;
};

export function DeleteUpdateButton({ id }: DeleteUpdateButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this update?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/updates/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      window.alert("Delete failed");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="btn-danger text-xs"
    >
      Delete
    </button>
  );
}
