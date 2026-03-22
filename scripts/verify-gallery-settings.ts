import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const legacyCount = await prisma.galleryItem.count({ where: { imageUrl: { startsWith: "/uploads/" } } });
  const sample = await prisma.galleryItem.findMany({
    where: { section: "Officer" },
    select: { title: true, imageUrl: true, updatedAt: true },
    orderBy: [{ updatedAt: "desc" }],
    take: 6,
  });

  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: ["ticker_message", "about_us_p1", "about_us_p2", "about_us_p3", "helpline_title", "helpline_subtitle"] } },
    select: { key: true, updatedAt: true },
    orderBy: { key: "asc" },
  });

  console.log(JSON.stringify({ legacyCount, sample, settings }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
