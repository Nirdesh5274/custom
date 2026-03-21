import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default async function LegalCaseStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const filtered = orderRecords.filter((record) => record.title.toLowerCase().includes(q) || record.id.toLowerCase().includes(q));

  return (
    <InnerPageShell
      title="Legal Case Status"
      intro="Track appeal matters, adjudication records, hearing schedules, and status of legal notices."
      sectionLabel="Legal"
      sidebarLinks={[
        { label: "Case Registry", href: "/legal-case-status" },
        { label: "Hearing Schedule", href: "/legal-case-status?tab=hearings" },
        { label: "Adjudication Orders", href: "/legal-case-status?tab=adjudication" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Legal Case Status" }]}
    >
      <form className="admin-card p-4">
        <label className="form-label">Search by case id / title</label>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input name="q" defaultValue={params.q ?? ""} placeholder="Example: ORD-2026-101" className="input-control" />
          <button type="submit" className="btn-secondary">Search</button>
        </div>
      </form>
      <OrdersTable title="Legal Case Register" records={filtered} />
    </InnerPageShell>
  );
}
