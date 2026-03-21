import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { formatDate } from "@/lib/utils";

export default async function AdminPagesPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Content Management</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-[#0c2f50]">Custom Pages</h2>
          </div>
          <Link href="/admin/pages/new" className="btn-primary text-sm">
            Create Page
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d2deeb] bg-white">
          <table className="w-full text-left text-sm text-[#4b6077]">
            <thead className="bg-[#f0f5fa] font-bold text-[#1f3044]">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">URL Slug / Link</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e3ebf3]">
              {pages.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-[#f8fbfd]">
                  <td className="px-4 py-3 font-semibold text-[#18324e]">{p.title}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#2f80ed]">/p/{p.slug}</td>
                  <td className="px-4 py-3">{formatDate(p.updatedAt)}</td>
                  <td className="flex justify-end gap-2 px-4 py-3">
                    <Link href={`/p/${p.slug}`} target="_blank" className="btn-secondary text-xs">View Live</Link>
                    <Link href={`/admin/pages/${p.id}/edit`} className="btn-secondary text-xs border-[#2f80ed] text-[#2f80ed]">Edit Code</Link>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center">No custom pages created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
