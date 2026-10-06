import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

type Role = "ADMIN" | "EDITOR" | "TEACHER" | "STUDENT";

export async function requireRole(allowed: Role[]) {
  const session = await auth();

  if (!session || !allowed.includes(session.user.role as Role)) {
    redirect("/login");
  }

  return session;
}