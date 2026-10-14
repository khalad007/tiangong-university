import Link from "next/link";
import { db } from "@/src/lib/db";
import { requireRole } from "@/src/lib/authz";
import { updateUserRole, resetPassword, deleteUser } from "@/src/app/actions/users";

export const dynamic = "force-dynamic";

const ROLES = ["ADMIN", "EDITOR", "TEACHER", "STUDENT"];

export default async function UsersPage() {
  const session = await requireRole(["ADMIN"]);
  const users = await db.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/admin/users/new" className="bg-black text-white rounded px-4 py-2 text-sm">
          New user
        </Link>
      </div>

      <table className="w-full mt-6 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Reset password</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isMe = u.email === session.user.email;
            return (
              <tr key={u.id} className="border-b align-top">
                <td className="py-2">
                  {u.name} {isMe && <span className="text-gray-500">(you)</span>}
                </td>
                <td>{u.email}</td>
                <td>
                  {isMe ? (
                    u.role
                  ) : (
                    <form action={updateUserRole.bind(null, u.id)} className="flex gap-2">
                      <select name="role" defaultValue={u.role} className="border rounded px-2 py-1">
                        {ROLES.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                      <button className="underline">Save</button>
                    </form>
                  )}
                </td>
                <td>
                  <form action={resetPassword.bind(null, u.id)} className="flex gap-2">
                    <input
                      name="password"
                      type="password"
                      minLength={8}
                      placeholder="New password"
                      required
                      className="border rounded px-2 py-1"
                    />
                    <button className="underline">Set</button>
                  </form>
                </td>
                <td>
                  {!isMe && (
                    <form action={deleteUser.bind(null, u.id)}>
                      <button className="underline text-red-600">Delete</button>
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}