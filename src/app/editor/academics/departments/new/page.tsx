import { DepartmentForm } from "@/src/components/editor/department-form";
import { createDepartment } from "@/src/app/actions/academics";

export default function NewDepartmentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New department</h1>
      <DepartmentForm action={createDepartment} />
    </div>
  );
}