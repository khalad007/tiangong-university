"use client";

import { useActionState } from "react";
import type { FormState } from "@/src/app/actions/academics";

type Props = {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  departments: { id: string; name: string }[];
  program?: {
    name: string;
    slug: string;
    degreeLevel: string;
    description: string;
    departmentId: string;
  };
};

export function ProgramForm({ action, departments, program }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" defaultValue={program?.name} required
          className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Slug <span className="text-gray-500">(optional)</span>
        </label>
        <input name="slug" defaultValue={program?.slug}
          className="w-full border rounded px-3 py-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Degree level</label>
          <select name="degreeLevel" defaultValue={program?.degreeLevel ?? "Bachelor"}
            className="w-full border rounded px-3 py-2">
            <option>Bachelor</option>
            <option>Master</option>
            <option>PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select name="departmentId" defaultValue={program?.departmentId ?? ""} required
            className="w-full border rounded px-3 py-2">
            <option value="" disabled>Choose...</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" defaultValue={program?.description} rows={4} required
          className="w-full border rounded px-3 py-2" />
      </div>
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <button type="submit" disabled={pending}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-50">
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}