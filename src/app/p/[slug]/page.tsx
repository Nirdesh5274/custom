import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InnerPageShell } from "@/components/inner-page-shell";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return { title: "Not Found | Customs Digital Portal" };
  return { title: `${page.title} | Customs Digital Portal` };
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <InnerPageShell
      title={page.title}
      intro=""
      sectionLabel="Information"
      sidebarLinks={[]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
    >
      <div 
        className="prose prose-slate max-w-none md:prose-lg prose-headings:font-heading prose-headings:text-[#1b2f4a] prose-a:text-[#2f80ed]"
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </InnerPageShell>
  );
}
