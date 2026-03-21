import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";

const docs = [
  { name: "Publications Handbook 2026", type: "Publication", href: "/downloads?doc=handbook-2026" },
  { name: "Citizen Charter", type: "Public Interface", href: "/downloads?doc=citizen-charter" },
  { name: "Privacy Policy", type: "Policy", href: "/downloads?doc=privacy-policy" },
  { name: "Disclaimer", type: "Policy", href: "/downloads?doc=disclaimer" },
  { name: "Forms and Circulars", type: "Download", href: "/downloads?doc=forms" },
];

export default function DownloadsPage() {
  return (
    <InnerPageShell
      title="Downloads and Publications"
      intro="Official forms, circulars, manuals, public notices, policy documents, and downloadable publications."
      sectionLabel="Downloads"
      sidebarLinks={docs.map((doc) => ({ label: doc.name, href: doc.href }))}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Downloads / Publications" }]}
    >
      <div className="grid gap-3">
        {docs.map((doc) => (
          <Link key={doc.name} href={doc.href} className="admin-card flex items-center justify-between p-4">
            <div>
              <p className="font-bold text-[#0d3558]">{doc.name}</p>
              <p className="text-sm text-[#4d627a]">{doc.type}</p>
            </div>
            <span className="btn-secondary text-xs">Download</span>
          </Link>
        ))}
      </div>
    </InnerPageShell>
  );
}
