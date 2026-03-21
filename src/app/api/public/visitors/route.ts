import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VISITOR_KEY = "visitor_count";

export async function POST() {
  // Atomically increment visitor count using upsert
  try {
    const current = await prisma.siteSetting.findUnique({
      where: { key: VISITOR_KEY },
    });

    const currentVal = current ? parseInt(current.value, 10) || 0 : 0;
    const newVal = currentVal + 1;

    await prisma.siteSetting.upsert({
      where: { key: VISITOR_KEY },
      update: { value: String(newVal) },
      create: { key: VISITOR_KEY, value: "1" },
    });

    return NextResponse.json({ count: newVal });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: VISITOR_KEY },
    });
    const count = setting ? parseInt(setting.value, 10) || 0 : 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
