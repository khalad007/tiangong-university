import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Action, SectionContent } from "./types";

export function SectionHeading({ eyebrow, title, description, action }: SectionContent & { action?: Action }) {
  return <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div className="max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{description && <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{description}</p>}</div>{action && <Link href={action.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">{action.label}<ArrowUpRight size={17}/></Link>}</div>;
}
