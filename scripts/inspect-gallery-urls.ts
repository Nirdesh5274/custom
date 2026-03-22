import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.galleryItem.findMany({
    where: { section: { in: ["Officer", "ChiefCard", "PortCard", "AirportCard"] } },
    select: { title: true, section: true, imageUrl: true },
    orderBy: [{ updatedAt: "desc" }],
    take: 30,
  });

  console.log(JSON.stringify(rows, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
