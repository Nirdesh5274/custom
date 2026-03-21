import { InnerPageShell } from "@/components/inner-page-shell";

export default function PrivacyPolicyPage() {
  return (
    <InnerPageShell
      title="Privacy Policy"
      intro="How Kolkata Customs handles your data when you use this portal."
      sectionLabel="Legal"
      sidebarLinks={[
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Downloads", href: "/downloads" },
      ]}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
    >
      <div className="admin-card space-y-5 p-6 md:p-8">
        <h2 className="font-heading text-2xl font-black text-[#0f355a]">Privacy Policy</h2>
        <p className="leading-8 text-[#3d5a72]">
          This Privacy Policy describes how <strong>Kolkata Customs</strong> collects, uses, and shares information
          when you use this official government web portal.
        </p>
        <h3 className="mt-4 font-heading text-xl font-bold text-[#0f355a]">Information We Collect</h3>
        <ul className="list-disc space-y-2 pl-6 text-[#3d5a72]">
          <li>General visitor statistics (page views, browser type) collected anonymously for analytics purposes.</li>
          <li>Contact information submitted through helpline or grievance forms.</li>
          <li>No personally identifiable information is collected unless explicitly submitted by the user.</li>
        </ul>
        <h3 className="mt-4 font-heading text-xl font-bold text-[#0f355a]">Use of Information</h3>
        <p className="leading-8 text-[#3d5a72]">
          Information collected is used solely to improve portal services, respond to public queries, and comply with
          statutory obligations under Government of India policies. No data is sold or shared with third parties for
          commercial purposes.
        </p>
        <h3 className="mt-4 font-heading text-xl font-bold text-[#0f355a]">Cookies</h3>
        <p className="leading-8 text-[#3d5a72]">
          This website may use session cookies to support navigation and form submission. These cookies do not collect
          personal information and are cleared when you close your browser.
        </p>
        <h3 className="mt-4 font-heading text-xl font-bold text-[#0f355a]">Contact</h3>
        <p className="leading-8 text-[#3d5a72]">
          For privacy-related queries, please contact the office of the Chief Commissioner of Customs, Kolkata Customs Zone.
        </p>
      </div>
    </InnerPageShell>
  );
}
