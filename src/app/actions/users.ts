"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/src/lib/db";
import { requireRole } from "@/src/lib/authz";
import type { FormState } from "@/src/app/actions/academics";

const roleSchema = z.enum(["ADMIN", "EDITOR", "TEACHER", "STUDENT"]);

const createSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: roleSchema,
});

export async function createUser(_p: FormState, fd: FormData): Promise<FormState> {
  await requireRole(["ADMIN"]);

  const parsed = createSchema.safeParse({
    name: fd.get("name"),
    email: fd.get("email"),
    password: fd.get("password"),
    role: fd.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { password, email, ...rest } = parsed.data;

  try {
    await db.user.create({
      data: { ...rest, email: email.toLowerCase(), password: await bcrypt.hash(password, 10) },
    });
  } catch (e: any) {
    if (e?.code === "P2002") return { error: "A user with that email already exists." };
    throw e;
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUserRole(id: string, fd: FormData) {
  const session = await requireRole(["ADMIN"]);
  const role = roleSchema.safeParse(fd.get("role"));
  if (!role.success) return;

  const target = await db.user.findUnique({ where: { id } });
  if (!target || target.email === session.user.email) return; // can't change own role

  await db.user.update({ where: { id }, data: { role: role.data } });
  revalidatePath("/admin/users");
}

export async function resetPassword(id: string, fd: FormData) {
  await requireRole(["ADMIN"]);
  const password = z.string().min(8).safeParse(fd.get("password"));
  if (!password.success) return;

  await db.user.update({
    where: { id },
    data: { password: await bcrypt.hash(password.data, 10) },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireRole(["ADMIN"]);
  const target = await db.user.findUnique({ where: { id } });
  if (!target || target.email === session.user.email) return; // can't delete yourself

  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}