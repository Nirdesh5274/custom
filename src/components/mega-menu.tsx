"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MegaMenuEntry } from "@/lib/portal-data";

type MegaMenuProps = {
  items: MegaMenuEntry[];
  onNavigate?: () => void;
};

export function MegaMenu({ items, onNavigate }: MegaMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-nowrap items-center gap-1 whitespace-nowrap lg:gap-3 xl:gap-4">
      {items.map((item) => {
        const isSimple = Boolean(item.href) && !item.sections;
        if (isSimple && item.href) {
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`inline-flex items-center border-b-2 px-2 py-2 text-[0.97rem] font-extrabold leading-none transition xl:text-sm ${
                pathname === item.href
                  ? "border-[#2a70c8] text-[#2a70c8]"
                  : "border-transparent text-[#1f3550] hover:border-[#7ea7d7] hover:text-[#295b8f]"
              }`}
            >
              {item.label}
            </Link>
          );
        }

        const dropdownItems = item.sections?.flatMap((section) => section.items) ?? [];

        return (
          <div key={item.label} className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 border-b-2 border-transparent px-2 py-2 text-[0.97rem] font-extrabold leading-none text-[#1f3550] transition group-hover:border-[#7ea7d7] group-hover:text-[#295b8f] xl:text-sm"
            >
              <span>{item.label}</span>
              <span className="text-[10px] leading-none">▼</span>
            </button>
            <div className="pointer-events-none invisible absolute left-0 top-full z-50 mt-1 w-[270px] overflow-hidden rounded-sm border border-[#31486b] bg-[#1a2742] opacity-0 shadow-[0_18px_36px_rgba(5,16,30,0.45)] transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <ul className="divide-y divide-[#2a3f61]">
                {dropdownItems.map((subItem, subIndex) => (
                  <li key={`${item.label}-${subItem.href}-${subItem.label}-${subIndex}`}>
                    <Link
                      href={subItem.href}
                      onClick={onNavigate}
                      className="flex items-center justify-between px-4 py-3 text-[1.02rem] font-semibold text-[#f2f6fc] transition hover:bg-[#223557] hover:text-white"
                    >
                      <span>{subItem.label}</span>
                      <span className="text-[0.72rem] text-[#c8d8ec]">□</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
