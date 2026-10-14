import { Hero } from "@/src/components/home/hero";
import { StatsBar } from "@/src/components/home/stats-bar";
import { AboutIntro } from "@/src/components/home/about-intro";
import { ProgramsHighlight } from "@/src/components/home/programs-highlight";
import { NewsPreview } from "@/src/components/home/news-preview";
import { EventsPreview } from "@/src/components/home/events-preview";
import { CampusLifeGallery } from "@/src/components/home/campus-life-gallery";
import { InternationalBanner } from "@/src/components/home/international-banner";
import { CallToAction } from "@/src/components/home/cta-section";
import { homeContent as c } from "@/src/components/home/content";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [news, events, programs] = await Promise.all([
    db.news.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    db.event.findMany({ where: { startsAt: { gte: new Date() } }, orderBy: { startsAt: "asc" }, take: 3 }),
    db.program.findMany({ include: { department: { select: { name: true, slug: true } } }, orderBy: { createdAt: "desc" }, take: 4 }),
  ]);
  const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Shanghai" });
  const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Shanghai" });
  const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "Asia/Shanghai" });
  const dayFormat = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: "Asia/Shanghai" });
  return (
    <>
      <Hero {...c.hero} />
      <StatsBar items={c.stats} />
      <AboutIntro {...c.about} />
      <ProgramsHighlight {...c.programs} items={programs.map((item, index) => ({ id: item.id, title: item.name, description: item.description, category: item.degreeLevel, department: item.department.name, icon: c.programs.items[index % c.programs.items.length].icon, href: `/academics/${item.department.slug}` }))} />
      <NewsPreview {...c.news} items={news.map(item => ({ id: item.id, title: item.title, summary: item.summary, date: item.createdAt.toISOString(), formattedDate: dateFormat.format(item.createdAt), category: "News", image: { src: "/images/campus.jpg", alt: "" }, href: `/news/${item.slug}` }))} />
      <EventsPreview {...c.events} action={{ ...c.events.action, href: "/events" }} items={events.map(item => ({ id: item.id, title: item.title, location: item.location, summary: item.summary, startsAt: item.startsAt.toISOString(), formattedDate: dateFormat.format(item.startsAt), month: monthFormat.format(item.startsAt), day: dayFormat.format(item.startsAt), time: timeFormat.format(item.startsAt), category: "Campus event", href: "/events" }))} />
      <CampusLifeGallery {...c.campus} />
      <InternationalBanner {...c.international} />
      <CallToAction {...c.cta} />
    </>
  );
}
