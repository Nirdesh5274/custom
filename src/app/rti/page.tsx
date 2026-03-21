import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default async function RTIPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const filtered = orderRecords.filter((record) => record.title.toLowerCase().includes(q) || record.category.toLowerCase().includes(q));

  const sidebarLinks = [
    { label: "CPIO List", href: "/rti?tab=cpio-list" },
    { label: "RTI Disclosure", href: "/rti?tab=rti-disclosure" },
    { label: "File RTI", href: "/rti?tab=file-rti" },
    { label: "RTI Reply", href: "/rti?tab=rti-reply" },
    { label: "FAQ", href: "/rti?tab=faq" },
  ];

  return (
    <InnerPageShell
      title="Right to Information"
      intro="RTI services including CPIO details, proactive disclosures, and citizen support for information requests."
      sectionLabel="RTI Section"
      sidebarLinks={sidebarLinks}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "RTI" }]}
    >
      <form className="admin-card p-4">
        <label className="form-label">Search RTI records</label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input name="q" defaultValue={params.q ?? ""} placeholder="Search by topic" className="input-control" />
          <button type="submit" className="btn-secondary">Search</button>
        </div>
      </form>
      <OrdersTable title="RTI and Disclosure Records" records={filtered} />
    </InnerPageShell>
  );
}
