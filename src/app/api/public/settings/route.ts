import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
  });

  return NextResponse.json({ settings });
}
