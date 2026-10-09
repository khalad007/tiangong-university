"use client";

import { useActionState } from "react";
import type { FormState } from "@/src/app/actions/academics";

type Props = {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  department?: { name: string; slug: string; description: string };
};

export function DepartmentForm({ action, department }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" defaultValue={department?.name} required
          className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Slug <span className="text-gray-500">(optional)</span>
        </label>
        <input name="slug" defaultValue={department?.slug}
          className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea name="description" defaultValue={department?.description} rows={4} required
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