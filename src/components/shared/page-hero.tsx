import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/src/components/home/motion";

type Crumb = { label: string; href?: string };

export function PageHero({ title, subtitle, breadcrumb }: { title: string; subtitle?: string | null; breadcrumb?: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-primary to-brand-dark text-primary-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 size-96 rounded-full border border-primary-foreground/10" />
      <div className="home-container py-12 sm:py-16 lg:py-20">
        <Reveal>
          {breadcrumb && <nav aria-label="Breadcrumb" className="mb-8"><ol className="flex flex-wrap items-center gap-2 text-xs text-primary-foreground/75"><li><Link href="/" className="hover:underline">Home</Link></li>{breadcrumb.map((crumb, i) => <li key={i} className="flex items-center gap-2"><ChevronRight size={12} aria-hidden="true" />{crumb.href ? <Link href={crumb.href} className="hover:underline">{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}</li>)}</ol></nav>}
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl lg:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
