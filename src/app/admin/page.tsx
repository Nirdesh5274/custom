import Link from "next/link";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/settings-form";
import { LogoutButton } from "@/components/admin/logout-button";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const editableSettingKeys = new Set([
    "ticker_message",
    "about_us_p1",
    "about_us_p2",
    "about_us_p3",
    "helpline_title",
    "helpline_subtitle",
  ]);

  if (!session) {
    redirect("/admin/login");
  }

  const [count, galleryCount, heroCount, siteSettings] = await Promise.all([
    prisma.updateItem.count(),
    prisma.galleryItem.count(),
    prisma.galleryItem.count({ where: { section: "Hero" } }),
    prisma.siteSetting.findMany(),
  ]);

  const configMap = siteSettings.reduce((acc, obj) => { acc[obj.key] = obj.value; return acc; }, {} as Record<string, string>);
  const latestEditableSavedAt = siteSettings
    .filter((entry) => editableSettingKeys.has(entry.key))
    .reduce<Date | null>((latest, entry) => {
      if (!latest || entry.updatedAt > latest) {
        return entry.updatedAt;
      }
      return latest;
    }, null)
    ?.toISOString() ?? null;
  
  const defaultSettings = {
    ticker_message: configMap["ticker_message"] || "All IEC holders and CBs are requested to create their ICEGATE ID and submit PAN based payment details.",
    about_us_p1: configMap["about_us_p1"] || "The Kolkata Customs Zone is headed by Chief Commissioner of Customs. There are four Commissionerates, namely Port, Airport and ACC, Preventive, and Appeals - each with dedicated jurisdiction and trade-facing operational responsibilities.",
    about_us_p2: configMap["about_us_p2"] || "The subordinate cadres consist of the Appraising wing and Preventive wing, supported by ministerial teams in administration and accounts, delivering efficient governance and anti-smuggling operations.",
    about_us_p3: configMap["about_us_p3"] || "Special Investigation Branch units and land customs stations ensure robust commercial fraud control, compliance, and border customs enforcement across the zone.",
    helpline_title: configMap["helpline_title"] || "Need Assistance on Customs Procedures?",
    helpline_subtitle: configMap["helpline_subtitle"] || "For trade support, baggage queries, and digital filing guidance, connect with helpline desks and grievance redressal channels.",
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div className="admin-shell p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="gov-kicker">Administrative Control Center</p>
            <h2 className="mt-2 font-heading text-3xl font-black text-[#0d2f52]">Welcome, {session.user.name}</h2>
            <p className="mt-1 text-[#4d627a]">Role: {session.user.role ?? "ADMIN"}</p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="admin-card p-5">
            <p className="text-sm font-semibold text-[#51667d]">Total Published/Stored Updates</p>
            <p className="mt-1 text-3xl font-black text-[#0f355a]">{count}</p>
          </div>
          <div className="admin-card p-5">
            <p className="text-sm font-semibold text-[#51667d]">Total Gallery Items</p>
            <p className="mt-1 text-3xl font-black text-[#0f355a]">{galleryCount}</p>
          </div>
          <div className="admin-card p-5">
            <p className="text-sm font-semibold text-[#51667d]">Hero Slider Images</p>
            <p className="mt-1 text-3xl font-black text-[#0f355a]">{heroCount}</p>
          </div>
          <div className="admin-card p-5 md:col-span-3">
            <h3 className="font-heading text-xl font-black text-[#0f355a]">Quick Actions</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/admin/updates/new" className="btn-primary text-sm">
                Add Notice / News / Event
              </Link>
              <Link href="/admin/updates" className="btn-secondary h-auto py-3 text-center">
              Manage Updates & News
            </Link>
            <Link href="/admin/pages" className="btn-primary h-auto py-3 text-center">
              Manage Custom Pages / Tabs
            </Link>
              <Link href="/admin/gallery/new" className="btn-primary text-sm">
                Add Gallery Item
              </Link>
              <Link href="/admin/gallery" className="btn-secondary text-sm">
                Manage Gallery
              </Link>
              <Link href="/admin/gallery?section=Hero" className="btn-primary text-sm bg-sky-600 hover:bg-sky-700">
                Manage Hero Slider
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SettingsForm settings={defaultSettings} initialLastSavedAt={latestEditableSavedAt} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#d0dceb] bg-white/70 p-4 text-sm text-[#4b6077]">
          Administrative actions are logged for operational transparency and governance compliance.
        </div>
      </div>
    </div>
  );
}
