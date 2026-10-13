import { PageHero } from "@/src/components/shared/page-hero";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Reveal, HoverCard } from "@/src/components/home/motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);

  const [items, total] = await Promise.all([
    db.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (current - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.news.count({ where: { published: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (<><PageHero title="News & stories" subtitle="Ideas, discoveries, and moments from across the Tiangong community." breadcrumb={[{label: "News"}]} /><section className="home-container section-space" aria-labelledby="latest-heading"><p className="eyebrow">From our community</p><h2 id="latest-heading" className="section-title mb-9">The latest at Tiangong</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map((item,index) => <Reveal key={item.id} delay={index * 0.05}><HoverCard className="h-full"><Card className="h-full border-primary/10"><article className="h-full"><CardContent className="flex h-full flex-col p-7"><time dateTime={item.createdAt.toISOString()} className="text-xs text-muted-foreground">{item.createdAt.toDateString()}</time><h3 className="mt-5 text-xl font-semibold leading-snug"><Link href={"/news/" + item.slug} className="hover:text-primary">{item.title}</Link></h3><p className="mt-4 mb-7 text-sm leading-7 text-muted-foreground">{item.summary}</p><Link href={"/news/" + item.slug} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Read story<ArrowUpRight size={16} /></Link></CardContent></article></Card></HoverCard></Reveal>)}</div>{items.length === 0 && <p className="rounded-2xl bg-surface p-12 text-center text-muted-foreground">No news yet.</p>}{totalPages > 1 && <nav aria-label="News pagination" className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t pt-8">{current > 1 && <Button variant="outline" render={<Link href={"/news?page=" + (current - 1)} />} className="h-10 px-4">← Previous</Button>}<span className="text-sm text-muted-foreground">Page {current} of {totalPages}</span>{current < totalPages && <Button variant="outline" render={<Link href={"/news?page=" + (current + 1)} />} className="h-10 px-4">Next →</Button>}</nav>}</section></>);
}
