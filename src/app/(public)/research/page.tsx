export default function ResearchPage() {
  const areas = [
    { title: "Artificial Intelligence", description: "Machine learning, NLP, and computer vision research." },
    { title: "Textile Engineering", description: "Smart textiles and materials science." },
    { title: "Renewable Energy", description: "Sustainable energy systems and storage." },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Research</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {areas.map((area) => (
          <div key={area.title} className="border rounded p-4">
            <h2 className="font-semibold">{area.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}