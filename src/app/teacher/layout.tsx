import { requireRole } from "@/src/lib/authz";

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["TEACHER", "ADMIN"]);

  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>;
}