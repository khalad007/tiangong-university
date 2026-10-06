import { db } from "@/src/lib/db"

export default async function NewsPage() {
  const news = await db.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">News</h1>
      <div className="mt-6 space-y-6">
        {news.map((item) => (
          <article key={item.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 mt-1">{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}