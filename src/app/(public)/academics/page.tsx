import { PageHero } from "@/src/components/shared/page-hero";
import { DegreeFilter } from "@/src/components/shared/degree-filter";
import { db } from "@/src/lib/db";

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const departments = await db.department.findMany({
    include: { programs: true },
    orderBy: { name: "asc" },
  });

  return (<><PageHero title="Find your path." subtitle="Explore our departments and programs. Build the knowledge, curiosity, and confidence to shape what comes next." breadcrumb={[{label:"Academics"}]} /><section className="home-container section-space" aria-label="Departments and programs"><DegreeFilter departments={departments} /></section></>);
}
