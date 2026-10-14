import Link from "next/link";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [users, news, pages, admissions, events, departments] = await Promise.all([
    db.user.count(),
    db.news.count(),
    db.page.count(),
    db.admissionInfo.count(),
    db.event.count(),
    db.department.count(),
  ]);

  const cards = [
    { label: "Users", count: users, href: "/admin/users" },
    { label: "News", count: news, href: "/editor/news" },
    { label: "Pages", count: pages, href: "/editor/pages" },
    { label: "Admissions", count: admissions, href: "/editor/admissions" },
    { label: "Events", count: events, href: "/editor/events" },
    { label: "Departments", count: departments, href: "/editor/academics" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="border rounded p-4 hover:bg-gray-50">
            <p className="text-3xl font-bold">{c.count}</p>
            <p className="text-sm text-gray-600 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}