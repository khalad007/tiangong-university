import { db } from "@/src/lib/db";
import Link from "next/link";

export default async function AcademicsPage() {
  const departments = await db.department.findMany({
    include: { programs: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Academics</h1>

      <div className="mt-8 space-y-10">
        {departments.map((dept) => (
          <section key={dept.id}>
            <h2 className="text-xl font-semibold">
              <Link
                href={`/academics/${dept.slug}`}
                className="hover:underline"
              >
                {dept.name}
              </Link>
            </h2>
            <p className="text-gray-600 mt-1">{dept.description}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {dept.programs.map((program) => (
                <div key={program.id} className="border rounded p-3">
                  <p className="text-sm text-gray-500">{program.degreeLevel}</p>
                  <h3 className="font-medium">{program.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
