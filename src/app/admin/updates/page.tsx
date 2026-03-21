import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteUpdateButton } from "@/components/admin/delete-update-button";
import { PublishToggleButton } from "@/components/admin/publish-toggle-button";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { formatDate } from "@/lib/utils";

type UpdateRow = Awaited<ReturnType<typeof prisma.updateItem.findMany>>[number];

const PAGE_SIZE = 8;

export default async function AdminUpdatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; type?: "NOTICE" | "NEWS" | "EVENT" | "ALL" }>;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const selectedType = params.type ?? "ALL";
  const page = Number(params.page ?? "1") > 0 ? Number(params.page ?? "1") : 1;

  const where = {
    ...(selectedType !== "ALL" ? { type: selectedType } : {}),
    ...(q
      ? {
          OR: [{ title: { contains: q } }, { summary: { contains: q } }],
        }
      : {}),
  };

  const [items, totalItems] = await Promise.all([
    prisma.updateItem.findMany({
      where,
      orderBy: [{ updatedAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.updateItem.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  const queryForPage = (targetPage: number) => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (selectedType && selectedType !== "ALL") query.set("type", selectedType);
    query.set("page", String(targetPage));
    return `/admin/updates?${query.toString()}`;
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Content Administration</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-[#0c2f50]">Manage Updates</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/gallery" className="btn-secondary text-sm">
              Manage Gallery
            </Link>
            <Link href="/admin/updates/new" className="btn-primary text-sm">
              Create New
            </Link>
          </div>
        </div>

        <form className="mb-4 grid gap-3 rounded-xl border border-[#d2deeb] bg-white p-3 md:grid-cols-[1fr_180px_auto]">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search title or summary"
            className="input-control"
          />
          <select name="type" defaultValue={selectedType} className="input-control">
            <option value="ALL">All Types</option>
            <option value="NOTICE">Notice</option>
            <option value="NEWS">News</option>
            <option value="EVENT">Event</option>
          </select>
          <button type="submit" className="btn-secondary">Apply Filters</button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-[#cfdaea] bg-white shadow-[0_12px_24px_rgba(11,34,57,0.08)]">
          <table className="data-table w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: UpdateRow) => (
                <tr key={item.id} className="border-t border-[#e2e9f1]">
                  <td className="px-4 py-3 font-semibold text-[#173b5d]">{item.title}</td>
                  <td className="px-4 py-3 text-[#3f5a75]">{item.type}</td>
                  <td className="px-4 py-3 text-[#3f5a75]">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#3f5a75]">{formatDate(item.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <PublishToggleButton id={item.id} isPublished={item.isPublished} />
                      <Link href={`/admin/updates/${item.id}/edit`} className="btn-secondary text-xs">
                        Edit
                      </Link>
                      <DeleteUpdateButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#d2deeb] bg-white px-4 py-3 text-sm text-[#3f5a75]">
          <p>
            Page {page} of {totalPages} | Total records: {totalItems}
          </p>
          <div className="flex items-center gap-2">
            <Link href={queryForPage(prevPage)} className="btn-secondary text-xs">Previous</Link>
            <Link href={queryForPage(nextPage)} className="btn-secondary text-xs">Next</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
