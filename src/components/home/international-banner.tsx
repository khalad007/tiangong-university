import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Reveal } from "./motion";
import { Button } from "@/src/components/ui/button";
import type { Action, Photo, SectionContent } from "./types";
export function InternationalBanner({ eyebrow, title, description, action, image, stat, statLabel }: SectionContent & { action: Action; image: Photo; stat: string; statLabel: string }) {
return <section className="bg-brand-tint"><div className="home-container grid items-center gap-10 py-16 lg:grid-cols-2"><Reveal><p className="eyebrow flex items-center gap-2"><Globe2 size={16}/>{eyebrow}</p><h2 className="section-title">{title}</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">{description}</p><Button render={<Link href={action.href}/>} className="mt-7 h-11 px-5">{action.label}<ArrowUpRight className="ml-2"/></Button></Reveal><Reveal className="relative"><div className="relative h-72 overflow-hidden rounded-xl"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover"/></div><div className="absolute bottom-5 left-5 rounded-lg bg-background/95 px-6 py-4 shadow-sm"><p className="text-3xl font-semibold text-primary">{stat}</p><p className="mt-1 text-xs text-muted-foreground">{statLabel}</p></div></Reveal></div></section>;
}
