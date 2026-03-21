import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

type ShellLink = {
  label: string;
  href: string;
};

type InnerPageShellProps = {
  title: string;
  intro: string;
  sectionLabel: string;
  sidebarLinks: ShellLink[];
  breadcrumbs: { label: string; href?: string }[];
  children: React.ReactNode;
};

export function InnerPageShell({
  title,
  intro,
  sectionLabel,
  sidebarLinks,
  breadcrumbs,
  children,
}: InnerPageShellProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <Breadcrumbs items={breadcrumbs} />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="admin-card h-fit p-4">
          <p className="gov-kicker">{sectionLabel}</p>
          <nav className="mt-3 space-y-2">
            {sidebarLinks.map((link, i) => (
              <Link key={`${link.href}-${i}`} href={link.href} className="block rounded-lg border border-[#d6dfeb] bg-white px-3 py-2 text-sm font-semibold text-[#1b486f] hover:bg-[#edf4fb]">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="space-y-5">
          <div className="gov-section p-6 md:p-8">
            <p className="gov-kicker">{sectionLabel}</p>
            <h1 className="mt-2 font-heading text-3xl font-black text-[#0b2f51] md:text-4xl">{title}</h1>
            <p className="mt-3 text-[#4a6078]">{intro}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
