import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const users = [
    { name: "Site Admin", email: "admin@tiangong.local", role: "ADMIN" as const },
    { name: "Content Editor", email: "editor@tiangong.local", role: "EDITOR" as const },
    { name: "Test Teacher", email: "teacher@tiangong.local", role: "TEACHER" as const },
    { name: "Test Student", email: "student@tiangong.local", role: "STUDENT" as const },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash("password123", 10);
    const user = await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hashed },
    });
    console.log(`${user.role} ready:`, user.email);
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });