import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeading } from "./section-heading";
import type { Action, Photo, SectionContent } from "./types";
export function CampusLifeGallery({ items, action, ...heading }: SectionContent & { items: (Photo & { title: string; href: string })[]; action: Action }) {
return <section className="home-container section-space"><Reveal><SectionHeading {...heading} action={action}/></Reveal><div className="grid gap-5 md:grid-cols-[1.4fr_1fr_1fr]">{items.map((item, index) => <Reveal key={item.title} delay={index * 0.1}><Link href={item.href} className="group relative block h-80 overflow-hidden rounded-xl"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"/><span className="absolute inset-x-6 bottom-6 flex items-center justify-between text-lg font-semibold text-white">{item.title}<ArrowUpRight size={22}/></span></Link></Reveal>)}</div></section>;
}
