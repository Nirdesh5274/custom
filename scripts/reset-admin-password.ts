import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [, , emailArg, passwordArg] = process.argv;
  const adminEmail = (emailArg ?? process.env.ADMIN_EMAIL)?.toLowerCase();
  const adminPassword = passwordArg ?? process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Usage: npm run admin:password -- <email> <newPassword>\nOr set ADMIN_EMAIL and ADMIN_PASSWORD in environment.",
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name: "System Admin",
      email: adminEmail,
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin password updated for ${adminEmail}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
