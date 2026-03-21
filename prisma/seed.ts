import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@custom.gov.in";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        passwordHash: hashedPassword,
        role: "ADMIN",
        name: "System Admin",
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "System Admin",
        passwordHash: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  const tickerValue =
    "All IEC holders/CBs are requested to create their ICEGATE ID at the earliest and submit PAN based payment details.";
  const existingTicker = await prisma.siteSetting.findUnique({ where: { key: "ticker_message" } });
  if (existingTicker) {
    await prisma.siteSetting.update({
      where: { id: existingTicker.id },
      data: { value: tickerValue },
    });
  } else {
    await prisma.siteSetting.create({
      data: {
        key: "ticker_message",
        value: tickerValue,
      },
    });
  }

  const existing = await prisma.updateItem.count();
  if (existing === 0) {
    await prisma.updateItem.create({
      data: {
        title: "78th Independence Day celebrated at Custom House",
        summary: "Kolkata Customs Zone celebrated the 78th Independence Day.",
        body: "The 78th Independence Day was celebrated at the Custom House, Kolkata with participation from all commissionerates.",
        type: "NEWS",
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    await prisma.updateItem.create({
      data: {
        title: "Notice: Updated baggage rules for international arrivals",
        summary: "Please review revised baggage declaration norms.",
        body: "Passengers are advised to review the updated baggage and declaration rules before arriving at Kolkata Airport.",
        type: "NOTICE",
        isPublished: true,
        publishedAt: new Date(),
      },
    });
  }

  const existingGallery = await prisma.galleryItem.count();
  if (existingGallery === 0) {
    await prisma.galleryItem.create({
      data: {
        title: "Swachh Bharat Initiative Inauguration",
        caption: "Commissionerate team during civic initiative launch.",
        imageUrl: "/gallery/gallery-1.svg",
        section: "Chief Commissionerate",
        isPublished: true,
        displayOrder: 1,
      },
    });

    await prisma.galleryItem.create({
      data: {
        title: "Ceremonial Parade at Custom House",
        caption: "Official ceremonial event and guard line-up.",
        imageUrl: "/gallery/gallery-2.svg",
        section: "Airport",
        isPublished: true,
        displayOrder: 2,
      },
    });

    await prisma.galleryItem.create({
      data: {
        title: "Flag Hoisting Ceremony",
        caption: "National event celebration by customs officers.",
        imageUrl: "/gallery/gallery-3.svg",
        section: "Port",
        isPublished: true,
        displayOrder: 3,
      },
    });
  }
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
