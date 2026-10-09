export function slugify(text: string) {
  const s = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || `news-${Date.now()}`;
}