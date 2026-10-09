import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await db.news.findUnique({ where: { slug } });

  if (!item || !item.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/news" className="text-sm underline">
        ← Back to news
      </Link>
      <p className="text-sm text-gray-500 mt-6">{item.createdAt.toDateString()}</p>
      <h1 className="text-3xl font-bold mt-1">{item.title}</h1>
      <p className="text-gray-600 mt-3">{item.summary}</p>
      <div className="mt-8 whitespace-pre-line">{item.content}</div>
    </article>
  );
}