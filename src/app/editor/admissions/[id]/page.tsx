import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { ContentForm, type FieldDef } from "@/src/components/editor/content-form";
import { saveAdmission } from "@/src/app/actions/admissions";
import { toDateInput } from "@/src/lib/datetime";

const fields: FieldDef[] = [
  { name: "title", label: "Title" },
  { name: "slug", label: "Slug", required: false, hint: "optional" },
  { name: "deadline", label: "Deadline", type: "date", required: false },
  { name: "content", label: "Content", type: "textarea", rows: 10 },
];

export default async function AdmissionEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const item = isNew ? null : await db.admissionInfo.findUnique({ where: { id } });
  if (!isNew && !item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? "New admission entry" : "Edit admission entry"}</h1>
      <ContentForm
        action={saveAdmission.bind(null, isNew ? null : id)}
        fields={fields}
        withPublished
        values={
          item
            ? {
                title: item.title,
                slug: item.slug,
                deadline: toDateInput(item.deadline),
                content: item.content,
                published: item.published,
              }
            : undefined
        }
      />
    </div>
  );
}