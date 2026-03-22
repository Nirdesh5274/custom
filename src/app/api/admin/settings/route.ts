import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { siteSettingsBulkInputSchema } from "@/lib/validators";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  const originBlock = enforceTrustedOrigin(request);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(request, {
    keyPrefix: "admin-settings",
    limit: 40,
    windowMs: 60_000,
  });
  if (rateLimitBlock) {
    return rateLimitBlock;
  }

  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const parsed = siteSettingsBulkInputSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const settings = await prisma.$transaction(
    parsed.data.settings.map((entry) =>
      prisma.siteSetting.upsert({
        where: { key: entry.key },
        update: { value: entry.value },
        create: { key: entry.key, value: entry.value },
      }),
    ),
  );

  revalidatePath("/");
  revalidatePath("/admin");

  const latestUpdatedAt = settings.reduce<Date | null>((latest, setting) => {
    if (!latest || setting.updatedAt > latest) {
      return setting.updatedAt;
    }
    return latest;
  }, null);

  return NextResponse.json({
    settings,
    updatedCount: settings.length,
    savedAt: (latestUpdatedAt ?? new Date()).toISOString(),
  });
}
