"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type GallerySlide = {
  imageUrl: string;
  title: string;
};

type PhotoGallerySliderProps = {
  items: GallerySlide[];
};

function getPerPage(width: number): number {
  if (width < 768) return 1;
  if (width < 1200) return 1.85;
  return 2.35;
}

export function PhotoGallerySlider({ items }: PhotoGallerySliderProps) {
  const [perPage, setPerPage] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => setPerPage(getPerPage(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - Math.ceil(perPage));
  const activeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (items.length <= perPage) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [items.length, maxIndex, perPage]);

  const showControls = items.length > perPage;

  const dots = useMemo(() => {
    const total = Math.max(1, maxIndex + 1);
    return Array.from({ length: total }, (_, dotIndex) => dotIndex);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex gap-3 transition-transform duration-500 ease-out md:gap-4"
          style={{ transform: `translateX(-${(activeIndex * 100) / perPage}%)` }}
        >
          {items.map((item, itemIndex) => (
            <article
              key={`${item.imageUrl}-${item.title}-${itemIndex}`}
              className="group relative shrink-0"
              style={{ width: `${100 / perPage}%` }}
            >
              <div className="relative overflow-hidden rounded-xl border border-[#d5e0ec] bg-white shadow-[0_10px_25px_rgba(7,23,39,0.08)]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1200}
                  height={800}
                  className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[250px]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {showControls ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          {dots.map((dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 w-2.5 rounded-full transition ${dotIndex === activeIndex ? "bg-[#2f7ee8]" : "bg-[#b8c9de]"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
