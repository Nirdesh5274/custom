import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { UpdateForm } from "@/components/admin/update-form";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export default async function EditUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const item = await prisma.updateItem.findUnique({ where: { id } });

  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Revise Published Content</p>
            <h2 className="mt-1 font-heading text-3xl font-black text-[#0c2f50]">Edit Update</h2>
          </div>
          <Link href="/admin/updates" className="gov-link text-sm">
            Back to List
          </Link>
        </div>
        <UpdateForm
          mode="edit"
          updateId={item.id}
          initialValue={{
            title: item.title,
            summary: item.summary,
            body: item.body,
            type: item.type,
            isPublished: item.isPublished,
            publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 16) : "",
          }}
        />
      </div>
    </section>
  );
}
