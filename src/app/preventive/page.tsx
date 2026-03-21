import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default function PreventivePage() {
  return (
    <InnerPageShell
      title="Preventive Commissionerate"
      intro="Preventive intelligence, enforcement publications, notices/orders, and operational communication archives."
      sectionLabel="Preventive Section"
      sidebarLinks={[
        { label: "About Us", href: "/preventive?tab=about-us" },
        { label: "Jurisdiction", href: "/preventive?tab=jurisdiction" },
        { label: "Public Notice", href: "/preventive?tab=public-notice" },
        { label: "Official Language", href: "/preventive?tab=official-language" },
        { label: "Publications", href: "/preventive?tab=publications" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Preventive" }]}
    >
      <OrdersTable title="Preventive Orders and Communications" records={orderRecords} />
    </InnerPageShell>
  );
}
