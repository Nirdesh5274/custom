import { InnerPageShell } from "@/components/inner-page-shell";

export default function DisclaimerPage() {
  return (
    <InnerPageShell
      title="Disclaimer"
      intro="Legal disclaimer for the Kolkata Customs official portal."
      sectionLabel="Legal"
      sidebarLinks={[
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Downloads", href: "/downloads" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]}
    >
      <div className="admin-card space-y-5 p-6 md:p-8">
        <h2 className="font-heading text-2xl font-black text-[#0f355a]">Website Disclaimer</h2>
        <p className="leading-8 text-[#3d5a72]">
          This website is maintained by <strong>Kolkata Customs, Office of the Chief Commissioner of Customs</strong>,
          Government of India. The information published on this portal is intended to facilitate public access to
          information about customs procedures, notices, and official publications.
        </p>
        <p className="leading-8 text-[#3d5a72]">
          While all efforts have been made to ensure accuracy and currency of the content on this website, the same
          should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or
          doubt, users are advised to verify/check with the department or other source(s), and to obtain appropriate
          professional advice.
        </p>
        <p className="leading-8 text-[#3d5a72]">
          <strong>Kolkata Customs accepts no responsibility</strong> for any loss or damage caused to any person on
          account of information provided on this website. External links provided on this website are provided purely
          for the convenience of the visitors and Kolkata Customs bears no responsibility for the content at linked websites.
        </p>
        <p className="leading-8 text-[#3d5a72]">
          The content on this website is updated as and when required. However, users are requested to verify the
          currency of the information before taking decisions based on it.
        </p>
      </div>
    </InnerPageShell>
  );
}
