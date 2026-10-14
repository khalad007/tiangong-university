import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";
import { ContentForm, type FieldDef } from "@/src/components/editor/content-form";
import { saveEvent } from "@/src/app/actions/events";
import { toDateTimeInput } from "@/src/lib/datetime";

const fields: FieldDef[] = [
  { name: "title", label: "Title" },
  { name: "slug", label: "Slug", required: false, hint: "optional" },
  { name: "location", label: "Location" },
  { name: "startsAt", label: "Starts", type: "datetime-local" },
  { name: "endsAt", label: "Ends", type: "datetime-local", required: false },
  { name: "summary", label: "Summary", type: "textarea", rows: 4 },
];

export default async function EventEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const event = isNew ? null : await db.event.findUnique({ where: { id } });
  if (!isNew && !event) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{isNew ? "New event" : "Edit event"}</h1>
      <ContentForm
        action={saveEvent.bind(null, isNew ? null : id)}
        fields={fields}
        values={
          event
            ? {
                title: event.title,
                slug: event.slug,
                location: event.location,
                startsAt: toDateTimeInput(event.startsAt),
                endsAt: toDateTimeInput(event.endsAt),
                summary: event.summary,
              }
            : undefined
        }
      />
    </div>
  );
}