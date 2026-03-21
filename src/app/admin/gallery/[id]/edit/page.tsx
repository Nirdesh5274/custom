import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { GalleryForm } from "@/components/admin/gallery-form";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });

  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Revise Gallery Media</p>
            <h2 className="mt-1 font-heading text-3xl font-black text-[#0c2f50]">Edit Gallery Item</h2>
          </div>
          <Link href="/admin/gallery" className="gov-link text-sm">
            Back to Gallery List
          </Link>
        </div>
        <GalleryForm
          mode="edit"
          galleryId={item.id}
          initialValue={{
            title: item.title,
            caption: item.caption,
            imageUrl: item.imageUrl,
            section: item.section,
            isPublished: item.isPublished,
            displayOrder: item.displayOrder,
          }}
        />
      </div>
    </section>
  );
}
