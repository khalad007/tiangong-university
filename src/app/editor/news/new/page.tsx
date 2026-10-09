import { NewsForm } from "@/src/components/editor/news-form";
import { createNews } from "@/src/app/actions/news";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New article</h1>
      <NewsForm action={createNews} />
    </div>
  );
}