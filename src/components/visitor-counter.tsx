import { prisma } from "@/lib/prisma";

const VISITOR_KEY = "visitor_count";

export async function VisitorCounter() {
  let count: number | null = null;

  try {
    const current = await prisma.siteSetting.findUnique({
      where: { key: VISITOR_KEY },
      select: { value: true },
    });

    const currentVal = current ? parseInt(current.value, 10) || 0 : 0;
    const nextVal = currentVal + 1;

    await prisma.siteSetting.upsert({
      where: { key: VISITOR_KEY },
      update: { value: String(nextVal) },
      create: { key: VISITOR_KEY, value: String(nextVal) },
    });

    count = nextVal;
  } catch {
    count = null;
  }

  if (count === null) {
    return (
      <span className="rounded-md bg-[#2f80ed] px-3 py-1 font-black text-white opacity-60">
        ···
      </span>
    );
  }

  return (
    <span className="rounded-md bg-[#2f80ed] px-3 py-1 font-black text-white tabular-nums">
      {count.toLocaleString("en-IN")}
    </span>
  );
}
