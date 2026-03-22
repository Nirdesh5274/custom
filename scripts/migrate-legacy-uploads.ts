import fs from "node:fs/promises";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jfif": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

function toUploadFileName(imageUrl: string): string | null {
  try {
    if (/^https?:\/\/localhost(?::\d+)?\/uploads\//i.test(imageUrl)) {
      const parsed = new URL(imageUrl);
      const base = path.basename(parsed.pathname);
      return base || null;
    }
  } catch {
    return null;
  }

  if (imageUrl.startsWith("/uploads/")) {
    const base = path.basename(imageUrl);
    return base || null;
  }

  return null;
}

async function ensureFileStorageEntry(fileName: string): Promise<string | null> {
  const existing = await prisma.fileStorage.findFirst({ where: { filename: fileName } });
  if (existing) {
    return existing.id;
  }

  const diskPath = path.join(process.cwd(), "public", "uploads", fileName);

  try {
    const fileBuffer = await fs.readFile(diskPath);
    const created = await prisma.fileStorage.create({
      data: {
        filename: fileName,
        mimetype: getMimeType(fileName),
        size: fileBuffer.length,
        data: fileBuffer.toString("base64"),
      },
    });
    return created.id;
  } catch {
    return null;
  }
}

async function main() {
  const legacyRows = await prisma.galleryItem.findMany({
    where: {
      OR: [
        { imageUrl: { startsWith: "/uploads/" } },
        { imageUrl: { startsWith: "http://localhost" } },
        { imageUrl: { startsWith: "https://localhost" } },
      ],
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      section: true,
    },
  });

  if (legacyRows.length === 0) {
    console.log("No legacy /uploads URLs found. Nothing to migrate.");
    return;
  }

  let migrated = 0;
  const missingFiles: string[] = [];

  for (const row of legacyRows) {
    const fileName = toUploadFileName(row.imageUrl);
    if (!fileName) {
      continue;
    }

    const fileId = await ensureFileStorageEntry(fileName);
    if (!fileId) {
      missingFiles.push(`${row.id} | ${row.title} | ${row.imageUrl}`);
      continue;
    }

    await prisma.galleryItem.update({
      where: { id: row.id },
      data: { imageUrl: `/api/files/${fileId}` },
    });

    migrated += 1;
  }

  console.log(`Legacy gallery records found: ${legacyRows.length}`);
  console.log(`Successfully migrated: ${migrated}`);
  console.log(`Missing source files: ${missingFiles.length}`);

  if (missingFiles.length > 0) {
    console.log("Missing file rows:");
    for (const line of missingFiles) {
      console.log(`- ${line}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
