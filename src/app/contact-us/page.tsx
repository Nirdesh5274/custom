import { InnerPageShell } from "@/components/inner-page-shell";

export default function ContactUsPage() {
  return (
    <InnerPageShell
      title="Contact Us"
      intro="Get in touch with the Kolkata Customs Zone for trade support, helpline, and grievance redressal."
      sectionLabel="Contact"
      sidebarLinks={[
        { label: "Contact Us", href: "/contact-us" },
        { label: "Zonal E-Helpline", href: "/trade-facilitation?tab=e-helpline" },
        { label: "CP-GRAMS", href: "/trade-facilitation?tab=cp-grams" },
        { label: "RTI", href: "/rti" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
    >
      <div className="admin-card space-y-6 p-6 md:p-8">
        <h2 className="font-heading text-2xl font-black text-[#0f355a]">Office of the Chief Commissioner of Customs</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#d6e0ed] bg-white p-5">
            <h3 className="font-bold text-[#0d3558]">Head Office Address</h3>
            <p className="mt-3 leading-8 text-sm text-[#3d5a72]">
              Chief Commissioner of Customs, Kolkata Customs Zone<br />
              15/1, Strand Road, Custom House<br />
              Kolkata – 700 001<br />
              West Bengal, India
            </p>
          </div>
          <div className="rounded-xl border border-[#d6e0ed] bg-white p-5">
            <h3 className="font-bold text-[#0d3558]">General Helpline</h3>
            <p className="mt-3 leading-8 text-sm text-[#3d5a72]">
              For trade-related queries, import/export assistance, and general information, please use the Zonal E-Helpline portal.
            </p>
            <a href="/trade-facilitation?tab=e-helpline" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-4 py-2 text-sm font-bold text-white">
              Open E-Helpline →
            </a>
          </div>
          <div className="rounded-xl border border-[#d6e0ed] bg-white p-5">
            <h3 className="font-bold text-[#0d3558]">Grievance Redressal</h3>
            <p className="mt-3 leading-8 text-sm text-[#3d5a72]">
              For public grievances, use the CP-GRAMS (Centralised Public Grievance Redress and Monitoring System) portal of the Government of India.
            </p>
            <a href="/trade-facilitation?tab=cp-grams" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-4 py-2 text-sm font-bold text-white">
              CP-GRAMS Portal →
            </a>
          </div>
          <div className="rounded-xl border border-[#d6e0ed] bg-white p-5">
            <h3 className="font-bold text-[#0d3558]">Right to Information</h3>
            <p className="mt-3 leading-8 text-sm text-[#3d5a72]">
              For RTI applications, please refer to the designated CPIO (Central Public Information Officer) for the relevant commissionerate.
            </p>
            <a href="/rti" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#2f80ed] px-4 py-2 text-sm font-bold text-white">
              RTI Section →
            </a>
          </div>
        </div>
      </div>
    </InnerPageShell>
  );
}
