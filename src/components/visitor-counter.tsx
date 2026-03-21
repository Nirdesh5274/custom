"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Increment visitor count on first page load
    fetch("/api/public/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((data) => setCount(data.count))
      .catch(() => {
        // Fallback: just read the current count
        fetch("/api/public/visitors")
          .then((r) => r.json())
          .then((data) => setCount(data.count))
          .catch(() => setCount(null));
      });
  }, []);

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
