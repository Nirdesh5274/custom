import { InnerPageShell } from "@/components/inner-page-shell";
import { OrdersTable } from "@/components/orders-table";
import { orderRecords } from "@/lib/portal-data";

export default function AppealPage() {
  return (
    <InnerPageShell
      title="Appeal Commissionerate"
      intro="Appeal notices, hearing schedules, appeal orders, and citizen charter related publications."
      sectionLabel="Appeal Section"
      sidebarLinks={[
        { label: "About Us", href: "/appeal?tab=about-us" },
        { label: "Appeal Orders", href: "/appeal?tab=appeal-orders" },
        { label: "Personal Hearing", href: "/appeal?tab=personal-hearing" },
        { label: "CRCL", href: "/appeal?tab=crcl" },
        { label: "Citizen Charter", href: "/appeal?tab=citizen-charter" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Appeal" }]}
    >
      <OrdersTable title="Appeal Section Orders" records={orderRecords} />
    </InnerPageShell>
  );
}
