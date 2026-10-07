import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "./motion";
import type { Action, Photo, SectionContent } from "./types";
export function AboutIntro({ eyebrow, title, description, image, action, note }: SectionContent & { image: Photo; action: Action; note: string }) {
 return <section id="discover" className="home-container section-space grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><Reveal className="relative pb-5 pr-5"><div className="relative aspect-[1.28] overflow-hidden rounded-xl"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover"/></div><div className="absolute bottom-0 right-0 flex max-w-[250px] items-center gap-4 rounded-lg bg-primary p-5 text-white shadow-lg"><Sparkles className="shrink-0" size={28}/><p className="text-sm leading-5">{note}</p></div></Reveal><Reveal delay={0.1}><p className="eyebrow">{eyebrow}</p><h2 className="section-title max-w-md">{title}</h2><p className="mt-6 leading-7 text-muted-foreground">{description}</p><Link href={action.href} className="mt-7 inline-flex items-center gap-3 font-semibold text-primary">{action.label}<ArrowUpRight size={18}/></Link></Reveal></section>;
}
