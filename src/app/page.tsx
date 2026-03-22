import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { airportFeatureCards, chiefFeatureCards, leaders, portFeatureCards } from "@/lib/portal-data";
import { formatDate, shortenText } from "@/lib/utils";
import { HeroSlider } from "@/components/hero-slider";
import { PhotoGallerySlider } from "@/components/photo-gallery-slider";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [siteSettingsArray, latestNews, latestNotices, galleryItems, heroItems, officerItems, chiefCardItems, portCardItems, airportCardItems] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.updateItem.findMany({
      where: { type: "NEWS", isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
    }),
    prisma.updateItem.findMany({
      where: { type: "NOTICE", isPublished: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 4,
    }),
    prisma.galleryItem.findMany({
      where: { isPublished: true, section: { notIn: ["Hero", "Officer"] } },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
      take: 3,
    }),
    prisma.galleryItem.findMany({
      where: { section: "Hero", isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.galleryItem.findMany({
      where: { section: "Officer", isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.galleryItem.findMany({
      where: { section: "ChiefCard", isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.galleryItem.findMany({
      where: { section: "PortCard", isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.galleryItem.findMany({
      where: { section: "AirportCard", isPublished: true },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
  ]);

  const settings = siteSettingsArray.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
  const defaultSettings = {
    ticker_message: settings["ticker_message"] || "All IEC holders and CBs are requested to create their ICEGATE ID and submit PAN based payment details.",
    about_us_p1: settings["about_us_p1"] || "The Kolkata Customs Zone is headed by Chief Commissioner of Customs. There are four Commissionerates, namely Port, Airport and ACC, Preventive, and Appeals - each with dedicated jurisdiction and trade-facing operational responsibilities.",
    about_us_p2: settings["about_us_p2"] || "The subordinate cadres consist of the Appraising wing and Preventive wing, supported by ministerial teams in administration and accounts, delivering efficient governance and anti-smuggling operations.",
    about_us_p3: settings["about_us_p3"] || "Special Investigation Branch units and land customs stations ensure robust commercial fraud control, compliance, and border customs enforcement across the zone.",
    helpline_title: settings["helpline_title"] || "Need Assistance on Customs Procedures?",
    helpline_subtitle: settings["helpline_subtitle"] || "For trade support, baggage queries, and digital filing guidance, connect with helpline desks and grievance redressal channels.",
  };

  const displayLeaders = officerItems.length > 0 
    ? officerItems.map(item => ({ name: item.title, role: item.caption, image: item.imageUrl }))
    : leaders;

  const chiefCards = chiefCardItems.length > 0 ? chiefCardItems.map(item => ({ title: item.title, subtitle: item.caption, href: item.imageUrl })) : chiefFeatureCards;
  const portCards = portCardItems.length > 0 ? portCardItems.map(item => ({ title: item.title, subtitle: item.caption, href: item.imageUrl })) : portFeatureCards;
  const airportCards = airportCardItems.length > 0 ? airportCardItems.map(item => ({ title: item.title, subtitle: item.caption, href: item.imageUrl })) : airportFeatureCards;

  return (
    <div className="pb-10">
      <section className="border-b border-[#d4dee9] bg-[#eef3fa]">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-3 px-4 py-2 md:items-center md:gap-5 md:px-6 md:py-3">
          <span className="shrink-0 rounded-md bg-[#1c2f4c] px-2 py-1.5 text-xs font-bold text-white md:px-3 md:py-2 md:text-sm">Important News</span>
          <p className="text-xs leading-5 text-[#2b4360] md:text-sm">
            {defaultSettings.ticker_message}
          </p>
        </div>
      </section>

      <HeroSlider images={heroItems.length > 0 ? heroItems.map((item) => item.imageUrl) : undefined} />

      <section className="mx-auto mt-6 w-full max-w-7xl px-4 md:mt-8 md:px-6">
        <h2 className="portal-title">About Us</h2>
        <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[260px_1fr]">
          <article className="gov-feature-card overflow-hidden">
            <Image src={displayLeaders[0].image} alt={displayLeaders[0].name} width={420} height={520} className="h-[240px] w-full object-cover md:h-[320px]" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-black text-[#1b2f4a] md:text-2xl">{displayLeaders[0].name}</h3>
              <p className="mt-1 text-base font-semibold text-[#3f72ad] md:text-lg">{displayLeaders[0].role}</p>
            </div>
          </article>
          <div className="soft-panel p-5 md:p-8">
            <p className="text-sm leading-relaxed text-[#304960] md:text-base">
              {defaultSettings.about_us_p1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#304960] md:text-base">
              {defaultSettings.about_us_p2}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#304960] md:text-base">
              {defaultSettings.about_us_p3}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 grid-cols-2 md:mt-8 md:grid-cols-2 xl:grid-cols-4">
          {displayLeaders.slice(1).map((leader, index) => (
            <article key={`${leader.name}-${leader.image}-${index}`} className="gov-feature-card overflow-hidden">
              <Image src={leader.image} alt={leader.name} width={420} height={520} className="h-[180px] w-full object-cover md:h-[240px]" />
              <div className="bg-white p-3 text-center md:p-4">
                <h3 className="text-base font-black text-[#1b2f4a] md:text-xl">{leader.name}</h3>
                <p className="text-xs mt-1 font-semibold text-[#3f72ad] md:text-sm">{leader.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-7xl px-4 md:px-6">
        <h2 className="portal-title">Latest News</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestNews.map((item) => (
            <article key={item.id} className="gov-feature-card p-6">
              <span className="mini-badge">{formatDate(item.publishedAt ?? item.createdAt).toUpperCase()}</span>
              <p className="mt-4 text-lg leading-relaxed text-[#304960]">{shortenText(item.summary, 110)}</p>
              <Link href={`/updates/${item.id}`} className="home-read-more">Read More.</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-7xl px-4 md:px-6">
        <h2 className="portal-title">Chief Commissionerate</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {chiefCards.map((card) => (
            <Link key={card.title} href={card.href} className="gov-feature-card gov-feature-card-animated group relative overflow-hidden p-6">
              <span className="card-orb text-5xl text-[#3b8cf1]">◔</span>
              <h3 className="home-card-title mt-5">{card.title}</h3>
              <p className="home-card-subtitle">{card.subtitle}</p>
              <p className="home-read-more">Read More <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&gt;</span></p>
            </Link>
          ))}
        </div>
        <div className="section-dots"><span /><span className="active" /><span /></div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-7xl px-4 md:px-6">
        <h2 className="portal-title">Commissionerate of Customs (Port)</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portCards.map((card) => (
            <Link key={card.title} href={card.href} className="gov-feature-card gov-feature-card-animated group relative overflow-hidden p-6">
              <span className="card-orb text-5xl text-[#3b8cf1]">◔</span>
              <h3 className="home-card-title mt-5">{card.title}</h3>
              <p className="home-card-subtitle">{card.subtitle}</p>
              <p className="home-read-more">Read More <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&gt;</span></p>
            </Link>
          ))}
        </div>
        <div className="section-dots"><span /><span className="active" /></div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-7xl px-4 md:px-6">
        <h2 className="portal-title">Commissionerate of Customs (Airport)</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {airportCards.map((card) => (
            <Link key={card.title} href={card.href} className="gov-feature-card gov-feature-card-animated group relative overflow-hidden p-6">
              <span className="card-orb text-5xl text-[#3b8cf1]">◔</span>
              <h3 className="home-card-title mt-5">{card.title}</h3>
              <p className="home-card-subtitle">{card.subtitle}</p>
              <p className="home-read-more">Read More <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&gt;</span></p>
            </Link>
          ))}
        </div>
        <div className="section-dots"><span /><span /><span className="active" /></div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div>
            <h2 className="font-heading text-2xl font-black leading-tight text-[#1b2f4a] md:text-4xl">Photo Gallery &amp; Events</h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-[#3b8cf1] md:w-28" />
            <p className="mt-4 text-sm text-[#4f657d] md:text-lg">Showcasing key customs initiatives and national events.</p>
          </div>
          <PhotoGallerySlider
            items={
              galleryItems.length > 0
                ? galleryItems.map((item) => ({ imageUrl: item.imageUrl, title: item.title }))
                : [
                    { imageUrl: "/gallery/gallery-1.svg", title: "Official Event 1" },
                    { imageUrl: "/gallery/gallery-2.svg", title: "Official Event 2" },
                    { imageUrl: "/gallery/gallery-3.svg", title: "Official Event 3" },
                  ]
            }
          />
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 md:px-6">
        <h2 className="portal-title">Latest Notices</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {latestNotices.map((item) => (
            <article key={item.id} className="gov-feature-card p-6">
              <span className="mini-badge">{formatDate(item.publishedAt ?? item.createdAt).toUpperCase()}</span>
              <h3 className="home-card-title mt-5">{shortenText(item.title, 42)}</h3>
              <p className="home-card-subtitle">{shortenText(item.summary, 72)}</p>
              <Link href={`/updates/${item.id}`} className="home-read-more">Read More.</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-7xl px-4 md:mt-12 md:px-6">
        <div className="hero-grid rounded-2xl p-5 text-white md:rounded-3xl md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Zonal E-Helpline</p>
          <h2 className="mt-2 font-heading text-xl font-black md:text-3xl lg:text-4xl">{defaultSettings.helpline_title}</h2>
          <p className="mt-3 text-sm text-sky-100 md:mt-4 md:max-w-4xl md:text-lg lg:text-xl">
            {defaultSettings.helpline_subtitle}
          </p>
          <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row md:flex-wrap md:gap-4">
            <Link href="/trade-facilitation" className="w-full rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#0e3c63] md:w-auto md:text-base">
              Open Helpline Desk
            </Link>
            <Link href="/trade-facilitation" className="w-full rounded-full border border-white/40 px-5 py-2.5 text-center text-sm font-bold text-white md:w-auto md:text-base">
              CP-GRAMS Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
