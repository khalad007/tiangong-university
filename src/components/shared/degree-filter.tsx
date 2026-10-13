"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Reveal } from "@/src/components/home/motion";
import { ProgramCard, type ProgramData } from "./program-card";

type DepartmentData = { id: string; name: string; slug: string; description: string | null; programs: ProgramData[] };
const levels = ["All", "Bachelor", "Master", "PhD"];

export function DegreeFilter({ departments }: { departments: DepartmentData[] }) {
  const [level, setLevel] = useState("All");
  const filtered = departments.map(dept => ({ ...dept, programs: dept.programs.filter(p => level === "All" || p.degreeLevel === level) })).filter(dept => level === "All" || dept.programs.length > 0);
  const count = filtered.reduce((sum, dept) => sum + dept.programs.length, 0);
  return <div>
    <div className="mb-12 flex flex-wrap items-center justify-between gap-5 border-b pb-6"><div role="group" aria-label="Filter programs by degree level" className="flex flex-wrap gap-2">{levels.map(value => <Button key={value} variant={value === level ? "default" : "outline"} aria-pressed={value === level} onClick={() => setLevel(value)} className="h-10 px-5">{value}</Button>)}</div><p role="status" className="text-sm text-muted-foreground">{count} {count === 1 ? "program" : "programs"}</p></div>
    <div className="space-y-16">{filtered.map(dept => <section key={dept.id} aria-labelledby={`department-${dept.id}`}><Reveal><div className="mb-7 max-w-3xl"><p className="eyebrow">Department</p><h2 id={`department-${dept.id}`} className="section-title"><Link href={`/academics/${dept.slug}`} className="group inline-flex items-center gap-3 hover:text-primary">{dept.name}<ArrowUpRight className="size-6 shrink-0 text-primary" aria-hidden="true" /></Link></h2><p className="mt-4 leading-7 text-muted-foreground">{dept.description}</p></div></Reveal><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{dept.programs.map(program => <ProgramCard key={program.id} program={program} />)}</div>{dept.programs.length === 0 && <p className="rounded-xl bg-surface p-6 text-muted-foreground">No programs yet.</p>}</section>)}</div>
    {filtered.length === 0 && <p className="rounded-2xl bg-surface p-10 text-center text-muted-foreground">{level === "All" ? "No departments yet." : `No ${level} programs available yet. Try another degree level.`}</p>}
  </div>;
}
