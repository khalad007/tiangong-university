import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { HoverCard } from "@/src/components/home/motion";

export type ProgramData = { id: string; name: string; degreeLevel: string; description: string | null };

export function ProgramCard({ program }: { program: ProgramData }) {
  return <HoverCard className="h-full"><Card className="h-full border-primary/10 shadow-none"><CardContent className="p-6 sm:p-7"><Badge className={program.degreeLevel === "PhD" ? "bg-brand-dark text-primary-foreground" : program.degreeLevel === "Master" ? "bg-brand-pale text-brand-dark" : undefined}>{program.degreeLevel}</Badge><h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">{program.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{program.description}</p></CardContent></Card></HoverCard>;
}
