import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const pageSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(100000),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ pages });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  
  const data = await req.json();
  const parsed = pageSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });

  try {
    const page = await prisma.page.create({ data: parsed.data });
    return NextResponse.json({ page });
  } catch (err: any) {
    if (err.code === "P2002") return NextResponse.json({ message: "Slug must be unique. Choose another URL path." }, { status: 400 });
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
