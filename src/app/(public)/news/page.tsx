import Link from "next/link";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);

  const [items, total] = await Promise.all([
    db.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (current - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.news.count({ where: { published: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">News</h1>

      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <article key={item.id} className="border-b pb-4">
            <p className="text-sm text-gray-500">{item.createdAt.toDateString()}</p>
            <h2 className="text-xl font-semibold mt-1">
              <Link href={`/news/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-1">{item.summary}</p>
          </article>
        ))}
        {items.length === 0 && <p className="text-gray-500">No news yet.</p>}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center gap-4 text-sm">
          {current > 1 && <Link href={`/news?page=${current - 1}`}>← Previous</Link>}
          <span>
            Page {current} of {totalPages}
          </span>
          {current < totalPages && <Link href={`/news?page=${current + 1}`}>Next →</Link>}
        </div>
      )}
    </div>
  );
}