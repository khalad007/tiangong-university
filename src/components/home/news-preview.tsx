import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Reveal, HoverCard } from "./motion";
import { SectionHeading } from "./section-heading";
import type { Action, NewsItem, SectionContent } from "./types";
export function NewsPreview({ items, action, ...heading }: SectionContent & { items: NewsItem[]; action: Action }) {
return <section className="home-container section-space"><Reveal><SectionHeading {...heading} action={action}/></Reveal><div className="grid gap-7 md:grid-cols-3">{items.map((item, index) => <Reveal key={item.id} delay={index * 0.1}><HoverCard className="h-full"><Card className="h-full overflow-hidden border-0 shadow-none"><article><Link href={item.href} className="relative block aspect-[1.65] overflow-hidden rounded-xl"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover transition-transform duration-500 hover:scale-105"/></Link><CardContent className="px-0 pb-0 pt-5"><div className="flex items-center gap-3 text-[11px]"><span className="rounded bg-brand-tint px-2 py-1 font-semibold text-primary">{item.category}</span><time dateTime={item.date} className="text-muted-foreground">{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></div><h3 className="mt-3 text-xl font-semibold leading-snug"><Link href={item.href} className="hover:text-primary">{item.title}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p><Link href={item.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read story<ArrowUpRight size={16}/></Link></CardContent></article></Card></HoverCard></Reveal>)}</div></section>;
}
