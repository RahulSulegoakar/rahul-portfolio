"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ProjectCarousel({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  const maxIndex = Math.max(0, totalImages - 2);

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (totalImages === 0) return null;

  const visibleImages = images.slice(currentIndex, currentIndex + 2);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2">
        {visibleImages.map((image, index) => (
          <div
            key={currentIndex + index}
            className="relative aspect-video w-full overflow-hidden rounded-lg border border-edge bg-muted"
          >
            <Image
              src={image}
              alt={`${projectTitle} screenshot ${currentIndex + index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>

      {totalImages > 2 && (
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
              canGoPrev
                ? "hover:bg-accent2 text-foreground"
                : "cursor-not-allowed text-muted-foreground opacity-50"
            )}
            aria-label="Previous images"
          >
            <ChevronLeftIcon className="size-4" />
            <span>Previous</span>
          </button>

          <div className="text-xs text-muted-foreground">
            {currentIndex + 1}-{Math.min(currentIndex + 2, totalImages)} of{" "}
            {totalImages}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
              canGoNext
                ? "hover:bg-accent2 text-foreground"
                : "cursor-not-allowed text-muted-foreground opacity-50"
            )}
            aria-label="Next images"
          >
            <span>Next</span>
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
