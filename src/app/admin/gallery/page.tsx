import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { DeleteGalleryButton } from "@/components/admin/delete-gallery-button";
import { PublishToggleGalleryButton } from "@/components/admin/publish-toggle-gallery-button";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 8;

type GalleryRow = Awaited<ReturnType<typeof prisma.galleryItem.findMany>>[number];

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; section?: string }>;
}) {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const section = params.section?.trim() ?? "ALL";
  const page = Number(params.page ?? "1") > 0 ? Number(params.page ?? "1") : 1;

  const where = {
    ...(section !== "ALL" ? { section } : {}),
    ...(q
      ? {
          OR: [{ title: { contains: q } }, { caption: { contains: q } }],
        }
      : {}),
  };

  const [items, totalItems, sections] = await Promise.all([
    prisma.galleryItem.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.galleryItem.count({ where }),
    prisma.galleryItem.findMany({
      distinct: ["section"],
      select: { section: true },
      orderBy: { section: "asc" },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  const queryForPage = (targetPage: number) => {
    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (section !== "ALL") query.set("section", section);
    query.set("page", String(targetPage));
    return `/admin/gallery?${query.toString()}`;
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="gov-kicker">Media Administration</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-[#0c2f50]">Manage Gallery</h2>
          </div>
          <Link href="/admin/gallery/new" className="btn-primary text-sm">
            Add Gallery Item
          </Link>
        </div>

        <form className="mb-4 grid gap-3 rounded-xl border border-[#d2deeb] bg-white p-3 md:grid-cols-[1fr_220px_auto]">
          <input name="q" defaultValue={q} placeholder="Search title or caption" className="input-control" />
          <select name="section" defaultValue={section} className="input-control">
            <option value="ALL">All Sections</option>
            {sections.map((row) => (
              <option key={row.section} value={row.section}>
                {row.section}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-secondary">Apply Filters</button>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item: GalleryRow) => (
            <article key={item.id} className="admin-card overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={1200}
                height={800}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-black text-[#12385b]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#4e637a]">{item.caption}</p>
                <div className="mt-3 grid gap-1 text-xs text-[#60758b]">
                  <p>Section: {item.section}</p>
                  <p>Display order: {item.displayOrder}</p>
                  <p>Updated: {formatDate(item.updatedAt)}</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <PublishToggleGalleryButton id={item.id} isPublished={item.isPublished} />
                  <Link href={`/admin/gallery/${item.id}/edit`} className="btn-secondary text-xs">Edit</Link>
                  <DeleteGalleryButton id={item.id} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#d2deeb] bg-white px-4 py-3 text-sm text-[#3f5a75]">
          <p>
            Page {page} of {totalPages} | Total gallery items: {totalItems}
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
