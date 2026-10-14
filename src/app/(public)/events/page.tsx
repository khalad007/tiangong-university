import { PageHero } from "@/src/components/shared/page-hero";
import { Card, CardContent } from "@/src/components/ui/card";
import { Reveal, HoverCard } from "@/src/components/home/motion";
import { MapPin } from "lucide-react";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    db.event.findMany({ where: { startsAt: { gte: now } }, orderBy: { startsAt: "asc" } }),
    db.event.findMany({ where: { startsAt: { lt: now } }, orderBy: { startsAt: "desc" }, take: 12 }),
  ]);
  const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Shanghai" });
  const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Shanghai" });

  return (
    <>
      <PageHero title="Events" subtitle="Connect, discover, and take part in life at Tiangong." breadcrumb={[{ label: "Events" }]} />
      {[
        { title: "Upcoming", id: "upcoming", items: upcoming, empty: "No upcoming events right now" },
        { title: "Past", id: "past", items: past, empty: "No past events yet" },
      ].map(group => (
        <section key={group.id} className="home-container section-space" aria-labelledby={`${group.id}-heading`}>
          <h2 id={`${group.id}-heading`} className="section-title mb-9">{group.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <HoverCard className="h-full">
                  <Card className="h-full border-primary/10">
                    <article className="h-full">
                      <CardContent className="flex h-full flex-col p-7">
                        <time dateTime={item.startsAt.toISOString()} className="text-xs text-muted-foreground">
                          {dateFormat.format(item.startsAt)} · {timeFormat.format(item.startsAt)} (China time)
                        </time>
                        <h3 className="mt-5 text-xl font-semibold leading-snug">{item.title}</h3>
                        <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground"><MapPin size={13} className="shrink-0" />{item.location}</p>
                        <p className="mb-7 mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                      </CardContent>
                    </article>
                  </Card>
                </HoverCard>
              </Reveal>
            ))}
          </div>
          {group.items.length === 0 && <p className="rounded-2xl bg-surface p-12 text-center text-muted-foreground">{group.empty}</p>}
        </section>
      ))}
    </>
  );
}
