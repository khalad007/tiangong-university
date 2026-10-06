import Link from "next/link";
import { db } from "@/src/lib/db";

export default async function HomePage() {
  const [latestNews, upcomingEvents] = await Promise.all([
    db.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    db.event.findMany({
      where: { startsAt: { gte: new Date() } },
      orderBy: { startsAt: "asc" },
      take: 3,
    }),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">Tiangong University</h1>
        <p className="mt-4 text-gray-600">Tianjin, China</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 border-t">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {latestNews.map((item) => (
            <article key={item.id} className="border rounded p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
            </article>
          ))}
        </div>
        <Link href="/news" className="inline-block mt-4 text-sm underline">
          View all news
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 border-t">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article key={event.id} className="border rounded p-4">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.location}</p>
              <p className="text-sm text-gray-500 mt-1">
                {event.startsAt.toDateString()}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}