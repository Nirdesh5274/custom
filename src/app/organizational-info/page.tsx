import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default function OrganizationalInfoPage() {
  return (
    <InnerPageShell
      title="Organizational Information"
      intro="Jurisdiction, organizational chart, postings, officer directory, staff strength, and due list information."
      sectionLabel="Organizational Info"
      sidebarLinks={[
        { label: "Jurisdiction", href: "/organizational-info?tab=jurisdiction" },
        { label: "Organizational Chart", href: "/organizational-info?tab=org-chart" },
        { label: "Officers Directory", href: "/organizational-info?tab=officers" },
        { label: "Transfer Orders", href: "/organizational-info?tab=transfer-orders" },
        { label: "Due List for ICT", href: "/organizational-info?tab=due-list" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Organizational Info" }]}
    >
      <OrdersTable title="Administrative Orders Register" records={orderRecords} />
    </InnerPageShell>
  );
}
