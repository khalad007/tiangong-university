import Link from "next/link";

export default function EditorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Editor Dashboard</h1>
      <ul className="mt-4 list-disc pl-5">
        <li>
          <Link href="/editor/news" className="underline">
            Manage News
          </Link>
        </li>
        <li>
          <Link href="/editor/academics" className="underline">
            Manage Departments & Programs
          </Link>
        </li>
      </ul>
    </div>
  );
}
