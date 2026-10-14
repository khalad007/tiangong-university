import Link from "next/link";

const links = [
  { href: "/editor/news", label: "Manage News" },
  { href: "/editor/academics", label: "Manage Departments & Programs" },
  { href: "/editor/pages", label: "Manage Pages" },
  { href: "/editor/admissions", label: "Manage Admissions" },
  { href: "/editor/events", label: "Manage Events" },
];

export default function EditorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Editor Dashboard</h1>
      <ul className="mt-4 list-disc pl-5 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}