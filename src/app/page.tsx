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
export default function HomePage() {
  return (
    <>
      <Hero {...c.hero} />
      <StatsBar items={c.stats} />
      <AboutIntro {...c.about} />
      <ProgramsHighlight {...c.programs} />
      <NewsPreview {...c.news} />
      <EventsPreview {...c.events} />
      <CampusLifeGallery {...c.campus} />
      <InternationalBanner {...c.international} />
      <CallToAction {...c.cta} />
    </>
  );
}