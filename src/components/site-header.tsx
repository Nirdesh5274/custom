"use client";

import Link from "next/link";
import { useState } from "react";
import { MegaMenuEntry } from "@/lib/portal-data";
import { MegaMenu } from "@/components/mega-menu";

export function SiteHeader({ headerMegaMenu }: { headerMegaMenu: MegaMenuEntry[] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d5dfeb] bg-white shadow-[0_6px_14px_rgba(9,28,47,0.06)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <div className="emblem-mark grid h-14 w-14 place-items-center rounded-full border border-[#2a5a86] bg-[#0d2f52] text-[9px] font-bold uppercase tracking-[0.12em] text-white">
            INDIA
          </div>
          <div>
            <h1 className="font-heading text-[1.7rem] font-black leading-none text-[#214670] md:text-[1.95rem]">Kolkata Customs</h1>
            <p className="text-[10px] font-semibold text-[#4d6780]">भारत सरकार | वित्त मंत्रालय | राजस्व विभाग</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="btn-secondary lg:hidden"
        >
          Menu
        </button>
        <div className="hidden min-w-0 lg:block">
          <MegaMenu items={headerMegaMenu} />
        </div>
      </div>

      {drawerOpen ? (
        <div className="border-t border-[#d7e2ee] bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto w-full max-w-6xl space-y-3">
            {headerMegaMenu.map((entry) => (
              <div key={entry.label} className="rounded-xl border border-[#d5deeb] bg-[#f8fbff] p-3">
                <Link
                  href={entry.href ?? entry.sections?.[0]?.items?.[0]?.href ?? "/"}
                  onClick={() => setDrawerOpen(false)}
                  className="text-sm font-extrabold text-[#153f68]"
                >
                  {entry.label}
                </Link>
                {entry.sections ? (
                  <ul className="mt-2 grid gap-1 text-sm">
                    {entry.sections
                      .flatMap((section) => section.items.map((item) => ({ ...item, sectionTitle: section.title })))
                      .slice(0, 6)
                      .map((child, index) => (
                      <li key={`${entry.label}-${child.sectionTitle}-${child.href}-${child.label}-${index}`}>
                        <Link href={child.href} onClick={() => setDrawerOpen(false)} className="text-[#345b7f]">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
