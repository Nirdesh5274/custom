import Link from "next/link";
import { formatDate, shortenText } from "@/lib/utils";

type UpdateType = "NOTICE" | "NEWS" | "EVENT";

type UpdateItem = {
  id: string;
  title: string;
  summary: string;
  body: string;
  type: UpdateType;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type UpdateGridProps = {
  items: UpdateItem[];
  emptyMessage: string;
};

const typeLabel: Record<UpdateType, string> = {
  NOTICE: "Notice",
  NEWS: "News",
  EVENT: "Event",
};

export function UpdateGrid({ items, emptyMessage }: UpdateGridProps) {
  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-[#b8c9da] bg-white/60 p-8 text-[#4d627a]">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="group rounded-2xl border border-[#d3dfeb] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fd_100%)] p-5 shadow-[0_10px_22px_rgba(11,34,57,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(11,34,57,0.14)]"
        >
          <span className="inline-flex rounded-full bg-[#ddecfb] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#1a568a]">
            {typeLabel[item.type]}
          </span>
          <h3 className="mt-3 text-lg font-bold text-[#0d2f52]">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#4d627a]">{shortenText(item.summary, 130)}</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-[#5f738a]">{formatDate(item.publishedAt ?? item.createdAt)}</span>
            <Link className="gov-link group-hover:underline" href={`/updates/${item.id}`}>
              Read more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
