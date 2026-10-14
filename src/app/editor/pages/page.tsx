import Link from "next/link";
import { db } from "@/src/lib/db";
import { deletePage } from "@/src/app/actions/pages";

export const dynamic = "force-dynamic";

export default async function EditorPages() {
  const pages = await db.page.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Pages</h1>
        <Link href="/editor/pages/new" className="bg-black text-white rounded px-4 py-2 text-sm">
          New page
        </Link>
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th>URL</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2">{p.title}</td>
              <td>/pages/{p.slug}</td>
              <td>{p.published ? "Published" : "Draft"}</td>
              <td className="flex gap-3 py-2">
                <Link href={`/editor/pages/${p.id}`} className="underline">Edit</Link>
                {p.published && (
                  <Link href={`/pages/${p.slug}`} className="underline">View</Link>
                )}
                <form action={deletePage.bind(null, p.id)}>
                  <button className="underline text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          {pages.length === 0 && (
            <tr><td colSpan={4} className="py-6 text-gray-500">No pages yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}