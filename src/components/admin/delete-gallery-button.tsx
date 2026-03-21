"use client";

import { useRouter } from "next/navigation";

type DeleteGalleryButtonProps = {
  id: string;
};

export function DeleteGalleryButton({ id }: DeleteGalleryButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this gallery item?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      window.alert("Delete failed");
      return;
    }

    router.refresh();
  }

  return (
    <button type="button" onClick={handleDelete} className="btn-danger text-xs">
      Delete
    </button>
  );
}
