import { InnerPageShell } from "@/components/inner-page-shell";
import { prisma } from "@/lib/prisma";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; section?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const section = params.section?.trim() ?? "ALL";

  const where = {
    isPublished: true,
    ...(section !== "ALL" ? { section } : {}),
    ...(q ? { OR: [{ title: { contains: q } }, { caption: { contains: q } }] } : {}),
  };

  const [items, sections] = await Promise.all([
    prisma.galleryItem.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.galleryItem.findMany({
      where: { isPublished: true },
      distinct: ["section"],
      select: { section: true },
      orderBy: { section: "asc" },
    }),
  ]);

  return (
    <InnerPageShell
      title="Photo Gallery"
      intro="Official events, outreach activities, and ceremonial engagements managed through admin login."
      sectionLabel="Gallery"
      sidebarLinks={[
        { label: "All Sections", href: "/gallery?section=ALL" },
        ...sections.map((row) => ({ label: row.section, href: `/gallery?section=${encodeURIComponent(row.section)}` })),
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Photo Gallery" }]}
    >
      <form className="admin-card p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input name="q" defaultValue={q} placeholder="Search title/caption" className="input-control" />
          <select name="section" defaultValue={section} className="input-control">
            <option value="ALL">All Sections</option>
            {sections.map((row) => (
              <option key={row.section} value={row.section}>
                {row.section}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-secondary">Filter</button>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length > 0 ? (
          items.map((item) => (
            <article key={item.id} className="gov-card rounded-2xl p-3">
              <img src={item.imageUrl} alt={item.title} className="h-52 w-full rounded-xl object-cover" />
              <h3 className="mt-3 text-base font-bold text-[#10395d]">{item.title}</h3>
              <p className="text-sm text-[#4d627a]">{item.caption}</p>
              <p className="mt-1 text-xs font-semibold text-[#6b7f95]">Section: {item.section}</p>
            </article>
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-dashed border-[#c3d2e3] p-8 text-center text-[#566f88]">
            No gallery items available right now.
          </p>
        )}
      </div>
    </InnerPageShell>
  );
}
