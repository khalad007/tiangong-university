import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { NewsForm } from "@/src/components/editor/news-form";
import { updateNews } from "@/src/app/actions/news";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await db.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit article</h1>
      <NewsForm action={updateNews.bind(null, id)} news={news} />
    </div>
  );
}