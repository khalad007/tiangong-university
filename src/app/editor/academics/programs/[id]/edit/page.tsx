import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { ProgramForm } from "@/src/components/editor/program-form";
import { updateProgram } from "@/src/app/actions/academics";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [program, departments] = await Promise.all([
    db.program.findUnique({ where: { id } }),
    db.department.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  if (!program) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit program</h1>
      <ProgramForm action={updateProgram.bind(null, id)} departments={departments} program={program} />
    </div>
  );
}