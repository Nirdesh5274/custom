import { InnerPageShell } from "@/components/inner-page-shell";

export default function ChiefCommissioneratePage() {
  return (
    <InnerPageShell
      title="Chief Commissionerate"
      intro="Institutional profile, administrative history, and welfare activities of the zonal chief commissionerate."
      sectionLabel="Chief Commissionerate"
      sidebarLinks={[
        { label: "About Us", href: "/chief-commissionerate?tab=about-us" },
        { label: "History", href: "/chief-commissionerate?tab=history" },
        { label: "Sports", href: "/chief-commissionerate?tab=sports" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Chief Commissionerate" }]}
    >
      <div className="admin-card p-6">
        <h3 className="font-heading text-xl font-black text-[#0f355a]">Department Overview</h3>
        <p className="mt-3 text-sm leading-7 text-[#4d627a]">
          The commissionerate delivers trade facilitation, revenue protection, and public communication through
          transparent digital governance and modern administrative practices.
        </p>
      </div>
    </InnerPageShell>
  );
}
