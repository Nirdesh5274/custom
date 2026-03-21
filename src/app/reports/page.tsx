import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const rows = orderRecords.filter((row) => row.title.toLowerCase().includes(q) || row.category.toLowerCase().includes(q));

  return (
    <InnerPageShell
      title="Reports and Publications"
      intro="AEO, SOP, designated officer publications, and downloadable forms/circulars."
      sectionLabel="Reports"
      sidebarLinks={[
        { label: "AEO", href: "/reports?tab=aeo" },
        { label: "AEO Port", href: "/reports?tab=aeo-port" },
        { label: "Designated Officers", href: "/reports?tab=designated-officers" },
        { label: "SOP", href: "/reports?tab=sop" },
        { label: "Forms/Circulars", href: "/reports?tab=forms" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reports" }]}
    >
      <form className="admin-card p-4">
        <label className="form-label">Search reports and forms</label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input name="q" defaultValue={params.q ?? ""} placeholder="Search title/category" className="input-control" />
          <button type="submit" className="btn-secondary">Search</button>
        </div>
      </form>
      <OrdersTable title="Reports Register" records={rows} />
    </InnerPageShell>
  );
}
