import Link from "next/link";
import { db } from "@/src/lib/db";
import { deleteNews, togglePublish } from "@/src/app/actions/news";

export const dynamic = "force-dynamic";

export default async function EditorNewsPage() {
  const news = await db.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage News</h1>
        <Link href="/editor/news/new" className="bg-black text-white rounded px-4 py-2 text-sm">
          New article
        </Link>
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.title}</td>
              <td>{item.published ? "Published" : "Draft"}</td>
              <td>{item.createdAt.toDateString()}</td>
              <td className="flex gap-3 py-2">
                <Link href={`/editor/news/${item.id}/edit`} className="underline">
                  Edit
                </Link>
                <form action={togglePublish.bind(null, item.id)}>
                  <button className="underline">
                    {item.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteNews.bind(null, item.id)}>
                  <button className="underline text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          {news.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-gray-500">
                No articles yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}