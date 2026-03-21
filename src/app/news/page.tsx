import { prisma } from "@/lib/prisma";
import { UpdateGrid } from "@/components/update-grid";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const fromDate = params.from ? new Date(params.from) : null;

  const news = await prisma.updateItem.findMany({
    where: {
      type: "NEWS",
      isPublished: true,
      ...(q ? { OR: [{ title: { contains: q } }, { summary: { contains: q } }] } : {}),
      ...(fromDate && !Number.isNaN(fromDate.getTime()) ? { publishedAt: { gte: fromDate } } : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="gov-section p-6 md:p-8">
        <p className="gov-kicker">Media and Bulletin Wing</p>
        <h2 className="mt-2 font-heading text-3xl font-black text-[#0c2f50]">Latest News</h2>
        <p className="mt-2 text-[#4d627a]">Key events and official media updates from customs formation.</p>
        <form className="mt-4 grid gap-3 rounded-xl border border-[#d4dfeb] bg-white p-3 md:grid-cols-[1fr_210px_auto]">
          <input name="q" defaultValue={q} placeholder="Search news" className="input-control" />
          <input name="from" type="date" defaultValue={params.from ?? ""} className="input-control" />
          <button type="submit" className="btn-secondary">Filter</button>
        </form>
        <div className="mt-6">
          <UpdateGrid items={news} emptyMessage="No news published yet." />
        </div>
      </div>
    </section>
  );
}
