import { db } from "@/src/lib/db";
import { ProgramForm } from "@/src/components/editor/program-form";
import { createProgram } from "@/src/app/actions/academics";

export default async function NewProgramPage() {
  const departments = await db.department.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New program</h1>
      <ProgramForm action={createProgram} departments={departments} />
    </div>
  );
}