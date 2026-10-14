import { ContentForm, type FieldDef } from "@/src/components/editor/content-form";
import { createUser } from "@/src/app/actions/users";

const fields: FieldDef[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password", hint: "min 8 characters" },
  { name: "role", label: "Role", type: "select", options: ["STUDENT", "TEACHER", "EDITOR", "ADMIN"] },
];

export default function NewUserPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New user</h1>
      <ContentForm action={createUser} fields={fields} />
    </div>
  );
}