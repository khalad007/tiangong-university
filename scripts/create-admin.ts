import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const email = "admin@tiangong.local";
  const password = "admin123"; // change this after first login
  const hashed = await bcrypt.hash(password, 10);

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Site Admin",
      email,
      password: hashed,
      role: "ADMIN",
    },
  });

  console.log("Admin user ready:", user.email);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });