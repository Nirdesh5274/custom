import Link from "next/link";
import { footerGroups } from "@/lib/portal-data";
import { VisitorCounter } from "@/components/visitor-counter";

export function SiteFooter() {
  const quickLinks = [
    { label: "Notices", href: "/notices" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "RTI", href: "/rti" },
    { label: "Downloads", href: "/downloads" },
    { label: "Legal Case Status", href: "/legal-case-status" },
  ];

  return (
    <footer className="mt-16 bg-[#1a2747] text-[#d7e7f8]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        {/* Top row: branding + quick links pill */}
        <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-center">
          <div className="flex items-center gap-3">
            <div className="emblem-mark grid h-14 w-14 place-items-center rounded-full border border-[#4f88be] bg-[#1f3f69] text-[9px] font-bold text-white">
              INDIA
            </div>
            <div>
              <h3 className="font-heading text-3xl font-black text-white">Kolkata Customs</h3>
              <p className="text-xs text-[#9dc0e3]">Government of India | Department of Revenue</p>
            </div>
          </div>

          {/* Quick Links Banner */}
          <nav className="flex flex-wrap gap-2">
            {quickLinks.map((ql) => (
              <Link
                key={ql.href}
                href={ql.href}
                className="rounded-full border border-[#3a5e8c] bg-[#1f3561] px-4 py-1.5 text-xs font-semibold text-[#b8d6f4] transition hover:bg-[#2f80ed] hover:text-white hover:border-[#2f80ed]"
              >
                {ql.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[240px_1fr]">
          <div>
            <Link href="/contact-us" className="inline-flex w-full items-center justify-center rounded-lg bg-[#2f80ed] px-5 py-3 text-base font-bold text-white transition hover:bg-[#1a6bcd] md:w-auto md:min-w-[200px]">
              Contact Us
            </Link>
            <p className="mt-4 text-xs leading-6 text-[#8bacc9]">
              For trade queries, RTI, and public grievances — reach us through the helpline or CP-GRAMS portal.
            </p>
          </div>
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-base font-black text-white">{group.title}</h4>
                <div className="mt-2 h-1 w-6 rounded-full bg-[#2f80ed]" />
                <ul className="mt-3 space-y-2 text-sm text-[#d2e3f5]">
                  {group.links.map((link, i) => (
                    <li key={`${group.title}-${link.label}-${i}`}>
                      <Link href={link.href} className="transition hover:text-white hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-[#2c3a5a] pt-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/admin/login" className="rounded-md border border-[#3d5f86] px-3 py-1 text-[#cde2f8] hover:bg-[#22385c]">Admin Login</Link>
            <Link href="/trade-facilitation" className="rounded-md border border-[#3d5f86] px-3 py-1 text-[#cde2f8] hover:bg-[#22385c]">E-Helpline</Link>
            <Link href="/rti" className="rounded-md border border-[#3d5f86] px-3 py-1 text-[#cde2f8] hover:bg-[#22385c]">RTI</Link>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#d6e7f8]">
            <p>
              © {new Date().getFullYear()} Kolkata Customs, All Rights Reserved{" "}
              <span className="font-bold">| Last Updated: {new Date().toLocaleDateString("en-IN")}</span>
            </p>
            <div className="flex items-center gap-3">
              <p>Total Visitor</p>
              <VisitorCounter />
              <a href="#top" className="grid h-10 w-10 place-items-center rounded-full border border-[#2f80ed] text-[#2f80ed] hover:bg-[#2f80ed] hover:text-white transition">↑</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
