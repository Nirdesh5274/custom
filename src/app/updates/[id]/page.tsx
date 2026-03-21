import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.updateItem.findUnique({ where: { id } });

  if (!item || !item.isPublished) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      <div className="gov-section p-6 md:p-8">
        <Link href="/" className="gov-link text-sm">
          ← Back to Home
        </Link>
        <p className="gov-kicker mt-4">Official Publication</p>
        <h1 className="mt-2 font-heading text-3xl font-black leading-tight text-[#0b2f50] md:text-4xl">{item.title}</h1>
        <p className="mt-3 rounded-xl border border-[#d8e1ec] bg-white px-3 py-2 text-sm text-[#4c647b]">
          Published on {formatDate(item.publishedAt ?? item.createdAt)}
        </p>
        <p className="mt-8 whitespace-pre-line text-base leading-8 text-[#1e3c59]">{item.body}</p>

        {item.pdfUrl && (
          <div className="mt-8 rounded-xl border border-[#c1d8ed] bg-[#eef5fc] p-4">
            <p className="text-sm font-semibold text-[#1b4f72]">📎 Attached Document</p>
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-[#1a6bcd] transition-colors"
            >
              📄 Download / View PDF
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
