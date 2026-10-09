import Link from "next/link";
import { db } from "@/src/lib/db";
import { deleteDepartment, deleteProgram } from "@/src/app/actions/academics";

export const dynamic = "force-dynamic";

export default async function EditorAcademicsPage() {
  const departments = await db.department.findMany({
    include: { programs: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Departments & Programs</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/editor/academics/departments/new" className="border rounded px-4 py-2">
            New department
          </Link>
          <Link href="/editor/academics/programs/new" className="bg-black text-white rounded px-4 py-2">
            New program
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {departments.map((dept) => (
          <section key={dept.id} className="border rounded p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{dept.name}</h2>
              <div className="flex gap-3 text-sm">
                <Link href={`/editor/academics/departments/${dept.id}/edit`} className="underline">
                  Edit
                </Link>
                <form action={deleteDepartment.bind(null, dept.id)}>
                  <button className="underline text-red-600">Delete</button>
                </form>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{dept.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Deleting a department also deletes its programs.
            </p>

            <ul className="mt-4 divide-y text-sm">
              {dept.programs.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2">
                  <span>
                    {p.name} <span className="text-gray-500">({p.degreeLevel})</span>
                  </span>
                  <span className="flex gap-3">
                    <Link href={`/editor/academics/programs/${p.id}/edit`} className="underline">
                      Edit
                    </Link>
                    <form action={deleteProgram.bind(null, p.id)}>
                      <button className="underline text-red-600">Delete</button>
                    </form>
                  </span>
                </li>
              ))}
              {dept.programs.length === 0 && (
                <li className="py-2 text-gray-500">No programs yet.</li>
              )}
            </ul>
          </section>
        ))}
        {departments.length === 0 && <p className="text-gray-500">No departments yet.</p>}
      </div>
    </div>
  );
}