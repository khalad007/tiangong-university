"use client";

import { useActionState } from "react";
import type { NewsFormState } from "@/src/app/actions/news";

type Props = {
  action: (prev: NewsFormState, formData: FormData) => Promise<NewsFormState>;
  news?: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    published: boolean;
  };
};

export function NewsForm({ action, news }: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          defaultValue={news?.title}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Slug <span className="text-gray-500">(leave empty to generate from title)</span>
        </label>
        <input
          name="slug"
          defaultValue={news?.slug}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea
          name="summary"
          defaultValue={news?.summary}
          rows={2}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          name="content"
          defaultValue={news?.content}
          rows={10}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={news?.published} />
        Published
      </label>

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