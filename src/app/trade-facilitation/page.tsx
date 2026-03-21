import Link from "next/link";
import { InnerPageShell } from "@/components/inner-page-shell";

const cards = [
  { title: "Customs Broker", desc: "Licensing, renewals, and process guidelines.", href: "/trade-facilitation?tab=customs-broker" },
  { title: "Trade Facilitation Committee", desc: "Regular issue resolution with stakeholders.", href: "/trade-facilitation?tab=committees" },
  { title: "Customs Clearance Facilitation Committee", desc: "Clearance performance reviews and interventions.", href: "/trade-facilitation?tab=ccfc" },
  { title: "Time Release Study", desc: "Publication and analysis of cargo release timelines.", href: "/trade-facilitation?tab=time-release-study" },
  { title: "Zonal E-Helpline", desc: "Operational support desk and escalation matrix.", href: "/trade-facilitation?tab=e-helpline" },
  { title: "CP-GRAMS", desc: "Public grievance monitoring and closure support.", href: "/trade-facilitation?tab=cp-grams" },
];

export default function TradeFacilitationPage() {
  return (
    <InnerPageShell
      title="Trade Facilitation"
      intro="Single-window information and facilitation resources for importers, exporters, and customs brokers."
      sectionLabel="Trade Facilitation"
      sidebarLinks={cards.map((item) => ({ label: item.title, href: item.href }))}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trade Facilitation" }]}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="gov-card rounded-2xl p-5">
            <h3 className="text-lg font-bold text-[#0d3558]">{card.title}</h3>
            <p className="mt-2 text-sm text-[#4d627a]">{card.desc}</p>
          </Link>
        ))}
      </div>
    </InnerPageShell>
  );
}
