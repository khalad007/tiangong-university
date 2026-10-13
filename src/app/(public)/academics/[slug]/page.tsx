import { PageHero } from "@/src/components/shared/page-hero";
import { Button } from "@/src/components/ui/button";
import { Reveal } from "@/src/components/home/motion";
import { ArrowUpRight } from "lucide-react";
import { ProgramCard } from "@/src/components/shared/program-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = await db.department.findUnique({
    where: { slug },
    include: { programs: { orderBy: { name: "asc" } } },
  });
  if (!dept) notFound();

  return (<><PageHero title={dept.name} breadcrumb={[{label:"Academics",href:"/academics"},{label:dept.name}]} /><section className="home-container section-space" aria-labelledby="department-intro"><Link href="/academics" className="text-sm font-semibold text-primary hover:underline">← All academics</Link><Reveal><div className="my-12 max-w-3xl"><p className="eyebrow">Discover your department</p><h2 id="department-intro" className="section-title">Knowledge with purpose.</h2><p className="mt-5 whitespace-pre-line text-lg leading-8 text-muted-foreground">{dept.description}</p></div></Reveal><h2 className="mb-7 text-2xl font-semibold tracking-tight">Our programs</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{dept.programs.map(p => <ProgramCard key={p.id} program={p} />)}</div>{dept.programs.length === 0 && <p className="rounded-xl bg-surface p-8 text-muted-foreground">No programs yet.</p>}</section><section className="bg-brand-tint"><div className="home-container flex flex-wrap items-center justify-between gap-6 py-12"><div><p className="eyebrow">Your next chapter</p><h2 className="section-title">Start your journey at Tiangong.</h2><p className="mt-4 text-muted-foreground">Explore admissions and take the next step toward your future.</p></div><Button render={<Link href="/admissions" />} className="h-11 px-6">Explore admissions<ArrowUpRight /></Button></div></section></>);
}
