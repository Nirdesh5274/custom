import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { siteSettingInputSchema } from "@/lib/validators";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const parsed = siteSettingInputSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const existingSetting = await prisma.siteSetting.findUnique({
    where: { key: parsed.data.key },
  });

  const setting = existingSetting
    ? await prisma.siteSetting.update({
        where: { id: existingSetting.id },
        data: { value: parsed.data.value },
      })
    : await prisma.siteSetting.create({
        data: parsed.data,
      });

  return NextResponse.json({ setting });
}
