import type { Metadata } from "next";
import { Manrope, Merriweather } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { prisma } from "@/lib/prisma";
import { headerMegaMenu } from "@/lib/portal-data";

export const dynamic = "force-dynamic";

const headingFont = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Customs Digital Portal",
  description: "Government customs portal with integrated admin CMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customMenus = await prisma.galleryItem.findMany({
    where: { section: { startsWith: "Menu" }, isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  // Group dynamic menus by section (e.g. MenuPort)
  const menuMap: Record<string, { label: string; href?: string; sections?: any[] }> = {};

  for (const item of customMenus) {
    const sectionName = item.section; // e.g. "MenuPort"
    const groupTitle = item.caption || "Links"; // Use caption as group title
    
    if (!menuMap[sectionName]) {
      menuMap[sectionName] = { label: sectionName.replace("Menu", ""), sections: [] };
    }
    
    const menuObj = menuMap[sectionName];
    let group = menuObj.sections?.find(s => s.title === groupTitle);
    
    if (!group) {
      group = { title: groupTitle, items: [] };
      menuObj.sections?.push(group);
    }
    
    group.items.push({ label: item.title, href: item.imageUrl || "/" });
  }

  const dynamicMegaMenu = headerMegaMenu.map((defaultMenu) => {
    // Override if we have a dynamic Menu{Label} matching the root menu item
    const match = menuMap[`Menu${defaultMenu.label.replace(/\s+/g, "")}`];
    if (match) {
      return { ...defaultMenu, sections: match.sections };
    }
    return defaultMenu;
  });

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body id="top" className="portal-bg min-h-full text-slate-900">
        <div className="flex min-h-screen flex-col">
          <SiteHeader headerMegaMenu={dynamicMegaMenu} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
