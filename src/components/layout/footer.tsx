export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
        <p>Unofficial concept project. Not affiliated with Tiangong University.</p>
        <p>© {new Date().getFullYear()} Tiangong University Concept Site.</p>
      </div>
    </footer>
  );
}