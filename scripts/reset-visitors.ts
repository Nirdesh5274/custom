import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  await p.siteSetting.upsert({
    where: { key: "visitor_count" },
    update: { value: "0" },
    create: { key: "visitor_count", value: "0" },
  });
  console.log("Visitor count reset to 0 — first visit will show 1");
  await p.$disconnect();
}

main();
