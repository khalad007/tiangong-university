import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { ContentForm, type FieldDef } from "@/src/components/editor/content-form";
import { savePage } from "@/src/app/actions/pages";

const fields: FieldDef[] = [
  { name: "title", label: "Title" },
  { name: "slug", label: "Slug", required: false, hint: "optional, generated from title" },
  { name: "content", label: "Content", type: "textarea", rows: 12 },
];

export default async function PageEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const page = isNew ? null : await db.page.findUnique({ where: { id } });
  if (!isNew && !page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? "New page" : "Edit page"}</h1>
      <ContentForm
        action={savePage.bind(null, isNew ? null : id)}
        fields={fields}
        withPublished
        values={
          page
            ? { title: page.title, slug: page.slug, content: page.content, published: page.published }
            : undefined
        }
      />
    </div>
  );
}