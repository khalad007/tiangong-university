import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "./motion";
import { SectionHeading } from "./section-heading";
import type { Action, EventItem, SectionContent } from "./types";
export function EventsPreview({ items, action, ...heading }: SectionContent & { items: EventItem[]; action: Action }) {
return <section className="border-y bg-surface section-space"><div className="home-container"><Reveal><SectionHeading {...heading} action={action}/></Reveal><div className="grid gap-6 lg:grid-cols-3">{items.map((item, index) => { const date = new Date(item.startsAt); return <Reveal key={item.id} delay={index * 0.08}><article className="flex h-full gap-5 rounded-xl border bg-background p-6"><time dateTime={item.startsAt} className="flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-tint text-primary"><span className="text-xs font-semibold uppercase">{date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}</span><span className="text-3xl font-semibold">{date.getUTCDate()}</span></time><div><p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{item.category}</p><h3 className="mt-2 font-semibold leading-snug"><Link href={item.href} className="hover:text-primary">{item.title}<ArrowUpRight className="ml-1 inline" size={14}/></Link></h3><p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground"><MapPin size={13} className="shrink-0"/>{item.location}</p></div></article></Reveal>; })}</div></div></section>;
}
