import { db } from "@/src/lib/db";

export default async function AdmissionsPage() {
  const admissions = await db.admissionInfo.findMany({
    where: { published: true },
    orderBy: { deadline: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Admissions</h1>

      <div className="mt-8 space-y-6">
        {admissions.map((item) => (
          <article key={item.id} className="border-b pb-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            {item.deadline && (
              <p className="text-sm text-gray-500 mt-1">
                Deadline: {item.deadline.toDateString()}
              </p>
            )}
            <p className="text-gray-600 mt-2">{item.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}