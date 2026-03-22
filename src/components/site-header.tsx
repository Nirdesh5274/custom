"use client";

import Link from "next/link";
import { useState } from "react";
import { MegaMenuEntry } from "@/lib/portal-data";
import { MegaMenu } from "@/components/mega-menu";

export function SiteHeader({ headerMegaMenu }: { headerMegaMenu: MegaMenuEntry[] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d5dfeb] bg-white shadow-[0_6px_14px_rgba(9,28,47,0.06)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="emblem-mark grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#2a5a86] bg-[#0d2f52] text-[8px] font-bold uppercase tracking-[0.12em] text-white sm:h-14 sm:w-14 sm:text-[9px]">
            INDIA
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-[1.45rem] font-black leading-none text-[#214670] sm:text-[1.62rem] md:text-[1.95rem]">Kolkata Customs</h1>
            <p className="mt-0.5 max-w-full truncate text-[9px] font-semibold text-[#4d6780] sm:text-[10px]">भारत सरकार | वित्त मंत्रालय | राजस्व विभाग</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen((prev) => !prev)}
          aria-expanded={drawerOpen}
          aria-label="Toggle menu"
          className="btn-secondary shrink-0 px-4 py-2 text-base lg:hidden"
        >
          Menu
        </button>
        <div className="hidden min-w-0 lg:block">
          <MegaMenu items={headerMegaMenu} />
        </div>
      </div>

      {drawerOpen ? (
        <div className="border-t border-[#d7e2ee] bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto w-full max-w-6xl max-h-[calc(100dvh-5.25rem)] space-y-3 overflow-y-auto overscroll-contain pr-1">
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
