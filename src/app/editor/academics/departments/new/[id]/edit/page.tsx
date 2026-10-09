import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { DepartmentForm } from "@/src/components/editor/department-form";
import { updateDepartment } from "@/src/app/actions/academics";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const department = await db.department.findUnique({ where: { id } });
  if (!department) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit department</h1>
      <DepartmentForm action={updateDepartment.bind(null, id)} department={department} />
    </div>
  );
}