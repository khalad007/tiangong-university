export type Action = { label: string; href: string };
export type Photo = { src: string; alt: string };
export type SectionContent = { eyebrow: string; title: string; description?: string };
export type Program = { id: string; title: string; description: string; category: string; href: string; icon: "engineering" | "science" | "design" | "business" };
export type NewsItem = { id: string; title: string; summary: string; date: string; category: string; image: Photo; href: string };
export type EventItem = { id: string; title: string; startsAt: string; location: string; category: string; href: string };
