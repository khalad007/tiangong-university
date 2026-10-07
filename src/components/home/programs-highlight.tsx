import Link from "next/link";
import { Cpu, FlaskConical, Palette, ChartNoAxesCombined, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Reveal, HoverCard } from "./motion";
import { SectionHeading } from "./section-heading";
import type { Program, SectionContent, Action } from "./types";
const icons = { engineering: Cpu, science: FlaskConical, design: Palette, business: ChartNoAxesCombined };
export function ProgramsHighlight({ items, action, ...heading }: SectionContent & { items: Program[]; action: Action }) {
return <section id="programs" className="bg-surface section-space"><div className="home-container"><Reveal><SectionHeading {...heading} action={action}/></Reveal><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => { const Icon = icons[item.icon]; return <Reveal key={item.id} delay={index * 0.07}><HoverCard className="h-full"><Card className="h-full border-border/70 shadow-none"><CardContent className="flex h-full flex-col p-7"><div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-brand-tint text-primary"><Icon size={25}/></div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.category}</p><h3 className="mt-2 text-lg font-semibold">{item.title}</h3><p className="mb-8 mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p><Link href={item.href} className="mt-auto flex items-center justify-between text-sm font-semibold text-primary">Learn more<ArrowUpRight size={18}/></Link></CardContent></Card></HoverCard></Reveal>; })}</div></div></section>;
}
