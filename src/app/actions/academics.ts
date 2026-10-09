"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { requireRole } from "@/src/lib/authz";
import { slugify } from "@/src/lib/slugify";

export type FormState = { error?: string };

function refresh() {
  revalidatePath("/academics");
  revalidatePath("/editor/academics");
}

/* ---------- Departments ---------- */

const deptSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().optional(),
  description: z.string().min(3, "Description must be at least 3 characters"),
});

function parseDept(fd: FormData) {
  return deptSchema.safeParse({
    name: fd.get("name"),
    slug: fd.get("slug") || undefined,
    description: fd.get("description"),
  });
}

export async function createDepartment(_p: FormState, fd: FormData): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);
  const parsed = parseDept(fd);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { slug, ...rest } = parsed.data;

  try {
    await db.department.create({ data: { ...rest, slug: slugify(slug || rest.name) } });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }
  refresh();
  redirect("/editor/academics");
}

export async function updateDepartment(
  id: string,
  _p: FormState,
  fd: FormData
): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);
  const parsed = parseDept(fd);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { slug, ...rest } = parsed.data;

  try {
    await db.department.update({
      where: { id },
      data: { ...rest, slug: slugify(slug || rest.name) },
    });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }
  refresh();
  redirect("/editor/academics");
}

export async function deleteDepartment(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  await db.department.delete({ where: { id } });
  refresh();
}

/* ---------- Programs ---------- */

const programSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().optional(),
  degreeLevel: z.enum(["Bachelor", "Master", "PhD"]),
  description: z.string().min(3, "Description must be at least 3 characters"),
  departmentId: z.string().min(1, "Choose a department"),
});

function parseProgram(fd: FormData) {
  return programSchema.safeParse({
    name: fd.get("name"),
    slug: fd.get("slug") || undefined,
    degreeLevel: fd.get("degreeLevel"),
    description: fd.get("description"),
    departmentId: fd.get("departmentId"),
  });
}

export async function createProgram(_p: FormState, fd: FormData): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);
  const parsed = parseProgram(fd);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { slug, ...rest } = parsed.data;

  try {
    await db.program.create({ data: { ...rest, slug: slugify(slug || rest.name) } });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }
  refresh();
  redirect("/editor/academics");
}

export async function updateProgram(
  id: string,
  _p: FormState,
  fd: FormData
): Promise<FormState> {
  await requireRole(["ADMIN", "EDITOR"]);
  const parsed = parseProgram(fd);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { slug, ...rest } = parsed.data;

  try {
    await db.program.update({
      where: { id },
      data: { ...rest, slug: slugify(slug || rest.name) },
    });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "That slug is already used." };
    throw e;
  }
  refresh();
  redirect("/editor/academics");
}

export async function deleteProgram(id: string) {
  await requireRole(["ADMIN", "EDITOR"]);
  await db.program.delete({ where: { id } });
  refresh();
}