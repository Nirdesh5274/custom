import Link from "next/link";
import { redirect } from "next/navigation";
import { GalleryForm } from "@/components/admin/gallery-form";
import { requireAdmin } from "@/lib/require-admin";

export default async function NewGalleryPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Publish Gallery Media</p>
            <h2 className="mt-1 font-heading text-3xl font-black text-[#0c2f50]">Create Gallery Item</h2>
          </div>
          <Link href="/admin/gallery" className="gov-link text-sm">
            Back to Gallery List
          </Link>
        </div>
        <GalleryForm mode="create" />
      </div>
    </section>
  );
}
