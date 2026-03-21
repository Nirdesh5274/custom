export type MenuItem = {
  label: string;
  href: string;
};

export type MegaMenuSection = {
  title: string;
  items: MenuItem[];
};

export type MegaMenuEntry = {
  label: string;
  href?: string;
  sections?: MegaMenuSection[];
};

export type PortalRecord = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: "Active" | "Archived";
};

export type LeaderProfile = {
  name: string;
  role: string;
  image: string;
};

export type FeatureCard = {
  title: string;
  subtitle: string;
  href: string;
};

export const megaMenu: MegaMenuEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Chief Commissionerate",
    sections: [
      {
        title: "Overview",
        items: [
          { label: "About Us", href: "/chief-commissionerate?tab=about-us" },
          { label: "History", href: "/chief-commissionerate?tab=history" },
          { label: "Sports", href: "/chief-commissionerate?tab=sports" },
        ],
      },
    ],
  },
  {
    label: "Notices / Orders",
    sections: [
      {
        title: "Publications",
        items: [
          { label: "Orders/Circulars", href: "/notices?type=orders" },
          { label: "Public Notice", href: "/notices?type=public-notice" },
        ],
      },
    ],
  },
  {
    label: "Organizational Info",
    sections: [
      {
        title: "Structure",
        items: [
          { label: "Jurisdiction", href: "/organizational-info?tab=jurisdiction" },
          { label: "Organizational Chart", href: "/organizational-info?tab=org-chart" },
          { label: "Officers Directory", href: "/organizational-info?tab=officers-directory" },
          { label: "Departmental Officers", href: "/organizational-info?tab=departmental-officers" },
          { label: "Transfer & Posting Policies", href: "/organizational-info?tab=transfer-policies" },
          { label: "Transfer Orders", href: "/organizational-info?tab=transfer-orders" },
          { label: "Staff Strength", href: "/organizational-info?tab=staff-strength" },
          { label: "Due List", href: "/organizational-info?tab=due-list" },
        ],
      },
    ],
  },
  {
    label: "Trade Facilitation",
    sections: [
      {
        title: "Trade Services",
        items: [
          { label: "Customs Broker", href: "/trade-facilitation?tab=customs-broker" },
          { label: "Committees", href: "/trade-facilitation?tab=committees" },
          { label: "Time Release Study", href: "/trade-facilitation?tab=time-release-study" },
          { label: "Zonal E-Helpline", href: "/trade-facilitation?tab=e-helpline" },
          { label: "CP-GRAMS", href: "/trade-facilitation?tab=cp-grams" },
        ],
      },
    ],
  },
  {
    label: "RTI Section",
    sections: [
      {
        title: "Right to Information",
        items: [
          { label: "CPIO List", href: "/rti?tab=cpio-list" },
          { label: "RTI Disclosure", href: "/rti?tab=rti-disclosure" },
          { label: "File RTI", href: "/rti?tab=file-rti" },
          { label: "RTI Reply", href: "/rti?tab=rti-reply" },
          { label: "FAQ", href: "/rti?tab=faq" },
        ],
      },
    ],
  },
  {
    label: "Reports",
    sections: [
      {
        title: "Reports & Documents",
        items: [
          { label: "AEO", href: "/reports?tab=aeo" },
          { label: "AEO Port", href: "/reports?tab=aeo-port" },
          { label: "SOP", href: "/reports?tab=sop" },
          { label: "Forms", href: "/reports?tab=forms" },
        ],
      },
    ],
  },
  {
    label: "Commissionerates",
    sections: [
      {
        title: "Field Formations",
        items: [
          { label: "Port Section", href: "/port" },
          { label: "Airport Section", href: "/airport" },
          { label: "Preventive Section", href: "/preventive" },
          { label: "Appeal Section", href: "/appeal" },
        ],
      },
    ],
  },
  {
    label: "Transit",
    sections: [
      {
        title: "Nepal / Bhutan",
        items: [
          { label: "Nepal Transit", href: "/transit?tab=nepal" },
          { label: "Bhutan Transit", href: "/transit?tab=bhutan" },
        ],
      },
    ],
  },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Legal Case Status", href: "/legal-case-status" },
  { label: "Download / Publications", href: "/downloads" },
];

export const headerMegaMenu: MegaMenuEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Chief Commissionerate",
    sections: [
      {
        title: "Chief Commissionerate",
        items: [
          { label: "About Us", href: "/chief-commissionerate?tab=about-us" },
          { label: "History", href: "/chief-commissionerate?tab=history" },
          { label: "Sports", href: "/chief-commissionerate?tab=sports" },
        ],
      },
      {
        title: "Organizational Info",
        items: [
          { label: "Jurisdiction", href: "/organizational-info?tab=jurisdiction" },
          { label: "Organizational Chart", href: "/organizational-info?tab=org-chart" },
          { label: "Officers Directory", href: "/organizational-info?tab=officers" },
          { label: "Transfer & Posting Policies", href: "/organizational-info?tab=transfer-policies" },
          { label: "Transfer Orders", href: "/organizational-info?tab=transfer-orders" },
          { label: "Staff Strength", href: "/organizational-info?tab=staff-strength" },
        ],
      },
      {
        title: "Notices / Orders",
        items: [
          { label: "Orders/Circulars", href: "/notices?type=orders" },
          { label: "Public Notice", href: "/notices?type=public-notice" },
          { label: "Reports", href: "/reports" },
          { label: "Photo Gallery", href: "/gallery" },
        ],
      },
    ],
  },
  {
    label: "Port",
    sections: [
      {
        title: "Port Section",
        items: [
          { label: "About Us", href: "/port?tab=about-us" },
          { label: "Jurisdiction", href: "/port?tab=jurisdiction" },
          { label: "Officers", href: "/port?tab=officers" },
          { label: "Sections", href: "/port?tab=sections" },
          { label: "Photo Gallery", href: "/gallery?section=port" },
          { label: "EDI", href: "/port?tab=edi" },
        ],
      },
      {
        title: "Notices / Orders",
        items: [
          { label: "Public Notice", href: "/port?tab=public-notice" },
          { label: "Standing Orders", href: "/port?tab=standing-orders" },
          { label: "Administrative Orders", href: "/port?tab=administrative-orders" },
          { label: "Tenders", href: "/port?tab=tenders" },
          { label: "SCN / Demand Notices", href: "/port?tab=scn-demand" },
          { label: "Adjudication Orders", href: "/port?tab=adjudication-orders" },
        ],
      },
      {
        title: "Trade Facilitation",
        items: [
          { label: "Customs Broker", href: "/trade-facilitation?tab=customs-broker" },
          { label: "Trade Facilitation Committee", href: "/trade-facilitation?tab=committees" },
          { label: "Customs Clearance Facilitation Committee", href: "/trade-facilitation?tab=committees" },
          { label: "Time Release Study", href: "/trade-facilitation?tab=time-release-study" },
          { label: "Legal Case Status", href: "/legal-case-status" },
        ],
      },
    ],
  },
  {
    label: "Airport",
    sections: [
      {
        title: "Airport Section",
        items: [
          { label: "About Us", href: "/airport?tab=about-us" },
          { label: "Jurisdiction", href: "/airport?tab=jurisdiction" },
          { label: "Officers", href: "/airport?tab=officers" },
          { label: "Public Notice", href: "/airport?tab=public-notice" },
          { label: "Standing Orders", href: "/airport?tab=standing-orders" },
          { label: "Administrative Orders", href: "/airport?tab=administrative-orders" },
          { label: "Baggage Rules", href: "/airport?tab=baggage-rules" },
          { label: "राजभाषा", href: "/airport?tab=official-language" },
        ],
      },
    ],
  },
  {
    label: "Preventive",
    sections: [
      {
        title: "Preventive Section",
        items: [
          { label: "About Us", href: "/preventive?tab=about-us" },
          { label: "Jurisdiction", href: "/preventive?tab=jurisdiction" },
          { label: "Public Notice", href: "/preventive?tab=public-notice" },
          { label: "Standing Orders", href: "/preventive?tab=standing-orders" },
          { label: "Administrative Orders", href: "/preventive?tab=administrative-orders" },
          { label: "Form", href: "/preventive?tab=form" },
          { label: "Other Informations", href: "/preventive?tab=other-info" },
          { label: "Download", href: "/downloads" },
        ],
      },
    ],
  },
  {
    label: "Appeals",
    sections: [
      {
        title: "Appeal Section",
        items: [
          { label: "About Us", href: "/appeal?tab=about-us" },
          { label: "Jurisdiction", href: "/appeal?tab=jurisdiction" },
          { label: "Officers", href: "/appeal?tab=officers" },
          { label: "Public Notice", href: "/appeal?tab=public-notice" },
          { label: "Appeal Orders", href: "/appeal?tab=appeal-orders" },
          { label: "Personal Hearing", href: "/appeal?tab=personal-hearing" },
          { label: "CRCL", href: "/appeal?tab=crcl" },
          { label: "Citizen Charter", href: "/appeal?tab=citizen-charter" },
        ],
      },
    ],
  },
  {
    label: "CRCL",
    sections: [
      {
        title: "Special Sections",
        items: [
          { label: "RTI Section", href: "/rti" },
          { label: "CPIO List", href: "/rti?tab=cpio-list" },
          { label: "RTI Disclosure", href: "/rti?tab=rti-disclosure" },
          { label: "Nepal / Bhutan Transit", href: "/transit" },
          { label: "Downloads / Publications", href: "/downloads" },
        ],
      },
    ],
  },
  { label: "Citizen Charter", href: "/downloads?doc=citizen-charter" },
];

export const quickAccess = [
  { title: "Zonal E-Helpline", description: "Grievance and trade support desk", href: "/trade-facilitation?tab=e-helpline" },
  { title: "CP-GRAMS", description: "Register and monitor grievances", href: "/trade-facilitation?tab=cp-grams" },
  { title: "RTI Services", description: "Public information and disclosures", href: "/rti" },
  { title: "Forms & Circulars", description: "Download operational documents", href: "/downloads" },
];

export const leaders: LeaderProfile[] = [
  { name: "R. Srinivasa Naik", role: "Chief Commissioner", image: "/officials/chief.svg" },
  { name: "Shivaji Hanumant Dange", role: "Pr. Commissioner Airport", image: "/officials/airport.svg" },
  { name: "Atul Saxena", role: "Pr. Commissioner Port", image: "/officials/port.svg" },
  { name: "Vinayak Azaad", role: "Pr. Commissioner Preventive", image: "/officials/preventive.svg" },
  { name: "Debjyoti Chakravarty", role: "Commissioner Appeals", image: "/officials/appeal.svg" },
];

export const chiefFeatureCards: FeatureCard[] = [
  { title: "CP-Grams", subtitle: "CP-Grams", href: "/trade-facilitation?tab=cp-grams" },
  { title: "Right to Information", subtitle: "Right to Information", href: "/rti" },
  { title: "AEO", subtitle: "AEO", href: "/reports?tab=aeo" },
  { title: "Photo Gallery", subtitle: "Photo Gallery", href: "/gallery" },
];

export const portFeatureCards: FeatureCard[] = [
  { title: "Nepal / Bhutan Transit", subtitle: "Nepal / Bhutan Transit", href: "/transit" },
  { title: "Trade Facilitation", subtitle: "Trade Facilitation", href: "/trade-facilitation" },
  { title: "Photo Gallery", subtitle: "Photo Gallery", href: "/gallery?section=port" },
  { title: "EDI", subtitle: "EDI", href: "/port?tab=edi" },
];

export const airportFeatureCards: FeatureCard[] = [
  { title: "Trade Facilitation", subtitle: "Trade Facilitation", href: "/trade-facilitation" },
  { title: "BRC Letters", subtitle: "BRC Letters", href: "/airport?tab=brc-letters" },
  { title: "Special Economic Zones", subtitle: "Special Economic Zones", href: "/airport?tab=sez" },
  { title: "Photo Gallery", subtitle: "Photo Gallery", href: "/gallery?section=airport" },
];

export const galleryImages = [
  { src: "/gallery/gallery-1.svg", alt: "Customs event at office" },
  { src: "/gallery/gallery-2.svg", alt: "Ceremonial parade event" },
  { src: "/gallery/gallery-3.svg", alt: "Flag hoisting event" },
];

export const orderRecords: PortalRecord[] = [
  { id: "ORD-2026-101", title: "Standing Order on Digital Filing", category: "Standing Orders", date: "2026-03-18", status: "Active" },
  { id: "PN-2026-022", title: "Public Notice on Baggage Assessment", category: "Public Notice", date: "2026-03-14", status: "Active" },
  { id: "TR-2026-013", title: "Transfer and Posting Order", category: "Administrative Orders", date: "2026-03-10", status: "Active" },
  { id: "ADV-2026-009", title: "Trade Advisory on EGM Filing", category: "Orders/Circulars", date: "2026-03-01", status: "Archived" },
  { id: "LIC-2026-004", title: "Customs Broker Renewal Circular", category: "Orders/Circulars", date: "2026-02-27", status: "Active" },
  { id: "LEG-2026-002", title: "Personal Hearing Schedule - March", category: "SCN / Demand Notices", date: "2026-02-20", status: "Active" },
];

export const footerGroups = [
  {
    title: "Information",
    links: [
      { label: "About Us", href: "/chief-commissionerate" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Baggage Rules", href: "/airport" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Public Interface",
    links: [
      { label: "Zonal E-Helpline", href: "/trade-facilitation" },
      { label: "RTI", href: "/rti" },
      { label: "CP-GRAMS", href: "/trade-facilitation" },
      { label: "Twitter / X", href: "https://x.com/" },
    ],
  },
  {
    title: "Commissionerate",
    links: [
      { label: "Port", href: "/port" },
      { label: "Airport", href: "/airport" },
      { label: "Preventive", href: "/preventive" },
      { label: "Appeal", href: "/appeal" },
    ],
  },
];
