"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { requireRole } from "@/src/lib/authz";
import { slugify } from "@/src/lib/slugify";
import { auth } from "@/src/lib/auth";

export type NewsFormState = { error?: string };

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  summary: z.string().min(3, "Summary must be at least 3 characters"),
  content: z.string().min(3, "Content must be at least 3 characters"),
  published: z.boolean(),
});

function parseForm(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    summary: formData.get("summary"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
  });
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/editor/news");
}

export async function createNews(
  _prev: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireRole(["ADMIN", "EDITOR"]);

  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { slug, ...rest } = parsed.data;

  try {
    await db.news.create({ data: { ...rest, slug: slugify(slug || rest.title) } });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used. Change it." };
    throw e;
  }

  refresh();
  redirect("/editor/news");
}

export async function updateNews(
  id: string,
  _prev: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  await requireRole(["ADMIN", "EDITOR"]);

  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { slug, ...rest } = parsed.data;

  try {
    await db.news.update({
      where: { id },
      data: { ...rest, slug: slugify(slug || rest.title) },
    });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used. Change it." };
    throw e;
  }

  refresh();
  redirect("/editor/news");
}

export async function deleteNews(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  await db.news.delete({ where: { id } });
  refresh();
}

export async function togglePublish(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  const item = await db.news.findUnique({ where: { id } });
  if (!item) return;
  await db.news.update({ where: { id }, data: { published: !item.published } });
  refresh();
}