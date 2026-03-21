import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default function AirportPage() {
  return (
    <InnerPageShell
      title="Airport Commissionerate"
      intro="Passenger and cargo facilitation updates, baggage rules, notices, standing orders, and trade circulars."
      sectionLabel="Airport Section"
      sidebarLinks={[
        { label: "About Us", href: "/airport?tab=about-us" },
        { label: "Baggage Rules", href: "/airport?tab=baggage-rules" },
        { label: "Public Notice", href: "/airport?tab=public-notice" },
        { label: "Forms", href: "/airport?tab=forms" },
        { label: "Trade Facilitation", href: "/airport?tab=trade-facilitation" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Airport" }]}
    >
      <OrdersTable title="Airport Orders and Circulars" records={orderRecords} />
    </InnerPageShell>
  );
}
