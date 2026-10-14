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
  content: z.string().min(3, "Content must be at least 3 characters"),
  deadline: z.string().optional(),
  published: z.boolean(),
});

export async function saveAdmission(id: string | null, _p: FormState, fd: FormData): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);

  const parsed = schema.safeParse({
    title: fd.get("title"),
    slug: fd.get("slug") || undefined,
    content: fd.get("content"),
    deadline: fd.get("deadline") || undefined,
    published: fd.get("published") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { slug, deadline, ...rest } = parsed.data;
  const data = {
    ...rest,
    slug: slugify(slug || rest.title),
    deadline: deadline ? new Date(deadline) : null,
  };

  try {
    if (id) await db.admissionInfo.update({ where: { id }, data });
    else await db.admissionInfo.create({ data });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }

  revalidatePath("/admissions");
  revalidatePath("/editor/admissions");
  redirect("/editor/admissions");
}

export async function deleteAdmission(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  await db.admissionInfo.delete({ where: { id } });
  revalidatePath("/admissions");
  revalidatePath("/editor/admissions");
}