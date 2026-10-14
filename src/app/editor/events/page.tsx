import Link from "next/link";
import { db } from "@/src/lib/db";
import { deleteEvent } from "@/src/app/actions/events";

export const dynamic = "force-dynamic";

export default async function EditorEvents() {
  const events = await db.event.findMany({ orderBy: { startsAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Link href="/editor/events/new" className="bg-black text-white rounded px-4 py-2 text-sm">
          New event
        </Link>
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th>Starts</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-b">
              <td className="py-2">{e.title}</td>
              <td>{e.startsAt.toLocaleString()}</td>
              <td>{e.location}</td>
              <td className="flex gap-3 py-2">
                <Link href={`/editor/events/${e.id}`} className="underline">Edit</Link>
                <form action={deleteEvent.bind(null, e.id)}>
                  <button className="underline text-red-600">Delete</button>
                </form>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr><td colSpan={4} className="py-6 text-gray-500">No events yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}