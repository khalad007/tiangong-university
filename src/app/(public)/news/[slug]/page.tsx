import { PageHero } from "@/src/components/shared/page-hero";
import { Button } from "@/src/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await db.news.findUnique({ where: { slug } });

  if (!item || !item.published) notFound();

  return (<><PageHero title={item.title} subtitle={item.summary} breadcrumb={[{label:"News",href:"/news"},{label:"Article"}]} /><article className="mx-auto max-w-3xl px-6 py-12 sm:px-10 lg:py-16"><Link href="/news" className="text-sm font-semibold text-primary hover:underline">← Back to news</Link><div className="mt-8 border-b pb-6"><p className="eyebrow">University news</p><time dateTime={item.createdAt.toISOString()} className="text-sm text-muted-foreground">{item.createdAt.toDateString()}</time></div><div className="mt-8 whitespace-pre-line break-words text-base leading-8 text-foreground/85 sm:text-lg sm:leading-9">{item.content}</div></article><aside className="bg-brand-tint" aria-labelledby="latest-news"><div className="home-container flex flex-wrap items-center justify-between gap-6 py-12"><div><p className="eyebrow">Keep exploring</p><h2 id="latest-news" className="section-title">Latest news</h2><p className="mt-3 text-muted-foreground">Discover more stories from our university community.</p></div><Button render={<Link href="/news" />} className="h-11 px-6">Browse latest news<ArrowUpRight /></Button></div></aside></>);
}
