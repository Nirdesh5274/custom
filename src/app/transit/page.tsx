import { InnerPageShell } from "@/components/inner-page-shell";

export default function TransitPage() {
  return (
    <InnerPageShell
      title="Nepal / Bhutan Transit"
      intro="Transit facilitation updates, operational procedures, and movement guidelines for Nepal and Bhutan trade corridors."
      sectionLabel="Transit"
      sidebarLinks={[
        { label: "Nepal", href: "/transit?tab=nepal" },
        { label: "Bhutan", href: "/transit?tab=bhutan" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Nepal / Bhutan Transit" }]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <article className="gov-card rounded-2xl p-5">
          <h3 className="text-lg font-bold text-[#0d3558]">Nepal Transit</h3>
          <p className="mt-2 text-sm text-[#4d627a]">Route advisories, customs formalities, and document checkpoints.</p>
        </article>
        <article className="gov-card rounded-2xl p-5">
          <h3 className="text-lg font-bold text-[#0d3558]">Bhutan Transit</h3>
          <p className="mt-2 text-sm text-[#4d627a]">Cross-border movement workflow and procedural notices.</p>
        </article>
      </div>
    </InnerPageShell>
  );
}
