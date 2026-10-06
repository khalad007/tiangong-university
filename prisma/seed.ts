import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.news.createMany({
    data: [
      {
        title: "Welcome to the new site",
        slug: "welcome-to-the-new-site",
        summary: "This is a placeholder announcement.",
        content: "Full content goes here.",
        published: true,
      },
    ],
  });
  const dept = await db.department.create({
  data: {
    name: "School of Computer Science and Technology",
    slug: "computer-science",
    description: "Programs in computing, software engineering, and AI.",
  },
});

await db.program.createMany({
  data: [
    {
      name: "BSc Computer Science & Technology",
      slug: "bsc-computer-science",
      degreeLevel: "Bachelor",
      description: "A 4-year undergraduate program covering core CS fundamentals.",
      departmentId: dept.id,
    },
    {
      name: "MSc Software Engineering",
      slug: "msc-software-engineering",
      degreeLevel: "Master",
      description: "A graduate program focused on large-scale software systems.",
      departmentId: dept.id,
    },
  ],
});

await db.admissionInfo.create({
  data: {
    title: "2026 Undergraduate Admissions",
    slug: "2026-undergraduate-admissions",
    content: "Application details for the 2026 intake.",
    deadline: new Date("2026-06-30"),
    published: true,
  },
});

await db.event.create({
  data: {
    title: "Open Campus Day",
    slug: "open-campus-day-2026",
    location: "Main Campus, Tianjin",
    startsAt: new Date("2026-11-15T09:00:00"),
    summary: "Tour the campus and meet faculty.",
  },
});
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });