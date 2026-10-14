"use client";

import { useActionState } from "react";
import type { FormState } from "@/src/app/actions/academics";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "email" | "password" | "date" | "datetime-local" | "select";
  required?: boolean;
  hint?: string;
  rows?: number;
  options?: string[];
};

type Props = {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  fields: FieldDef[];
  values?: Record<string, string | boolean | null | undefined>;
  withPublished?: boolean;
};

export function ContentForm({ action, fields, values, withPublished }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      {fields.map((f) => {
        const common = {
          name: f.name,
          required: f.required ?? true,
          defaultValue: String(values?.[f.name] ?? ""),
          className: "w-full border rounded px-3 py-2",
        };
        return (
          <div key={f.name}>
            <label className="block text-sm font-medium mb-1">
              {f.label}
              {f.hint && <span className="text-gray-500"> ({f.hint})</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={f.rows ?? 4} />
            ) : f.type === "select" ? (
              <select {...common}>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} />
            )}
          </div>
        );
      })}

      {withPublished && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked={Boolean(values?.published)} />
          Published
        </label>
      )}

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}