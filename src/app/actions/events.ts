"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { requireRole } from "@/src/lib/authz";
import { slugify } from "@/src/lib/slugify";
import type { FormState } from "@/src/app/actions/academics";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  summary: z.string().min(3, "Summary must be at least 3 characters"),
  startsAt: z.string().min(1, "Start date is required"),
  endsAt: z.string().optional(),
});

export async function saveEvent(id: string | null, _p: FormState, fd: FormData): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);

  const parsed = schema.safeParse({
    title: fd.get("title"),
    slug: fd.get("slug") || undefined,
    location: fd.get("location"),
    summary: fd.get("summary"),
    startsAt: fd.get("startsAt"),
    endsAt: fd.get("endsAt") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { slug, startsAt, endsAt, ...rest } = parsed.data;
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;

  if (isNaN(start.getTime())) return { error: "Invalid start date." };
  if (end && end < start) return { error: "End must be after start." };

  const data = { ...rest, slug: slugify(slug || rest.title), startsAt: start, endsAt: end };

  try {
    if (id) await db.event.update({ where: { id }, data });
    else await db.event.create({ data });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }

  revalidatePath("/");
  revalidatePath("/editor/events");
  redirect("/editor/events");
}

export async function deleteEvent(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  await db.event.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/editor/events");
}