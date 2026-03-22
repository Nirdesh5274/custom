import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { sanitizeRichHtml } from "@/lib/html-sanitize";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

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
  const originBlock = enforceTrustedOrigin(req);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(req, {
    keyPrefix: "admin-pages-write",
    limit: 30,
    windowMs: 60_000,
  });
  if (rateLimitBlock) {
    return rateLimitBlock;
  }

  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  
  const data = await req.json();
  const parsed = pageSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });

  try {
    const page = await prisma.page.create({
      data: {
        ...parsed.data,
        content: sanitizeRichHtml(parsed.data.content),
      },
    });
    return NextResponse.json({ page });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "Slug must be unique. Choose another URL path." }, { status: 400 });
    }
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
