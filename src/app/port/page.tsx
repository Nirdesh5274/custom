import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default function PortPage() {
  return (
    <InnerPageShell
      title="Port Commissionerate"
      intro="Operational updates, notices, standing orders, tenders, and trade facilitation information for port operations."
      sectionLabel="Port Section"
      sidebarLinks={[
        { label: "About Us", href: "/port?tab=about-us" },
        { label: "Jurisdiction", href: "/port?tab=jurisdiction" },
        { label: "Officers", href: "/port?tab=officers" },
        { label: "Standing Orders", href: "/port?tab=standing-orders" },
        { label: "Public Notice", href: "/port?tab=public-notice" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Port" }]}
    >
      <OrdersTable title="Port Notices and Orders" records={orderRecords} />
    </InnerPageShell>
  );
}
