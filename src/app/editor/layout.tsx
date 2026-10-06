import { requireRole } from "@/src/lib/authz";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["EDITOR", "ADMIN"]);

  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>;
}