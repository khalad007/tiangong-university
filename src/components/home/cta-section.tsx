import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Reveal } from "./motion";
import type { Action, SectionContent } from "./types";
export function CallToAction({ eyebrow, title, description, primaryAction, secondaryAction }: SectionContent & { primaryAction: Action; secondaryAction: Action }) {
return <section className="relative overflow-hidden bg-primary py-20 text-white"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-48 size-[550px] rounded-full border-[70px] border-white/5"/><Reveal className="home-container relative flex flex-wrap items-center justify-between gap-8"><div className="max-w-xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">{eyebrow}</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2><p className="mt-4 text-white/75">{description}</p></div><div className="flex flex-wrap gap-3"><Button render={<Link href={primaryAction.href}/>} className="h-12 bg-white px-6 text-primary hover:bg-brand-tint">{primaryAction.label}<ArrowRight className="ml-2"/></Button><Button render={<Link href={secondaryAction.href}/>} variant="outline" className="h-12 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">{secondaryAction.label}</Button></div></Reveal></section>;
}
