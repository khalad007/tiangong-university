import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = await db.department.findUnique({
    where: { slug },
    include: { programs: { orderBy: { name: "asc" } } },
  });
  if (!dept) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/academics" className="text-sm underline">← All academics</Link>
      <h1 className="text-3xl font-bold mt-6">{dept.name}</h1>
      <p className="text-gray-600 mt-3">{dept.description}</p>

      <h2 className="text-xl font-semibold mt-10">Programs</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {dept.programs.map((p) => (
          <div key={p.id} className="border rounded p-4">
            <p className="text-sm text-gray-500">{p.degreeLevel}</p>
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{p.description}</p>
          </div>
        ))}
        {dept.programs.length === 0 && <p className="text-gray-500">No programs yet.</p>}
      </div>
    </div>
  );
}