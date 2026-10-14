import Link from "next/link";
import { db } from "@/src/lib/db";
import { deleteAdmission } from "@/src/app/actions/admissions";

export const dynamic = "force-dynamic";

export default async function EditorAdmissions() {
  const items = await db.admissionInfo.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Admissions</h1>
        <Link href="/editor/admissions/new" className="bg-black text-white rounded px-4 py-2 text-sm">
          New entry
        </Link>
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="py-2">{i.title}</td>
              <td>{i.deadline ? i.deadline.toDateString() : "-"}</td>
              <td>{i.published ? "Published" : "Draft"}</td>
              <td className="flex gap-3 py-2">
                <Link href={`/editor/admissions/${i.id}`} className="underline">Edit</Link>
                <form action={deleteAdmission.bind(null, i.id)}>
                  <button className="underline text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={4} className="py-6 text-gray-500">No entries yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}