"use client";

import { useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type Rect = [x: number, y: number, w: number, h: number];

const CELL = 32;
const ROWS = 8;

// Pixel glyphs as bars in cell units, on the 8-row grid of the original
// logotype. Each bar is filled and outlined on its own.
const GLYPHS: { width: number; bars: Rect[] }[] = [
  // R
  {
    width: 5,
    bars: [
      [0, 0, 1, 8],
      [1, 0, 3, 1],
      [4, 1, 1, 2],
      [1, 3, 3, 1],
      [3, 4, 1, 1],
      [4, 5, 1, 3],
    ],
  },
  // a
  {
    width: 5,
    bars: [
      [1, 2, 3, 1],
      [4, 2, 1, 6],
      [0, 3, 1, 4],
      [1, 7, 2, 1],
      [3, 6, 1, 1],
    ],
  },
  // h
  {
    width: 5,
    bars: [
      [0, 0, 1, 8],
      [1, 2, 3, 1],
      [4, 3, 1, 5],
    ],
  },
  // u
  {
    width: 5,
    bars: [
      [0, 2, 1, 5],
      [1, 7, 3, 1],
      [4, 2, 1, 6],
    ],
  },
  // l
  {
    width: 2,
    bars: [
      [0, 0, 1, 1],
      [1, 0, 1, 8],
    ],
  },
];

const GAP = 1;

// Same canvas width as the original logotype, so letters keep its scale.
const CANVAS_COLS = 44;

const WORD_COLS =
  GLYPHS.reduce((sum, glyph) => sum + glyph.width, 0) +
  GAP * (GLYPHS.length - 1);

const BARS: Rect[] = (() => {
  const bars: Rect[] = [];
  let offset = Math.floor((CANVAS_COLS - WORD_COLS) / 2);
  for (const glyph of GLYPHS) {
    for (const [x, y, w, h] of glyph.bars) {
      bars.push([x + offset, y, w, h]);
    }
    offset += glyph.width + GAP;
  }
  return bars;
})();

// 1px inset so the 2px outline isn't clipped at the edges.
const VIEWBOX_WIDTH = CANVAS_COLS * CELL + 2;
const VIEWBOX_HEIGHT = ROWS * CELL + 2;

const BARS_PATH = BARS.map(
  ([x, y, w, h]) =>
    `M${x * CELL + 1} ${y * CELL + 1}H${(x + w) * CELL + 1}V${(y + h) * CELL + 1}H${x * CELL + 1}Z`
).join("");

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion();
  const gradientId = `footer-logotype-gradient-${useId()}`;

  const gradientX1Raw = useMotionValue(0.5);
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;

    const containerRect = event.currentTarget.getBoundingClientRect();
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    );
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    gradientX1Raw.set(0.5);
  };

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={BARS_PATH} fill={`url(#${gradientId})`} />
            <path
              className="stroke-foreground/10"
              d={BARS_PATH}
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id={gradientId}
                x1={gradientX1}
                y1="1"
                x2={VIEWBOX_WIDTH / 2}
                y2={VIEWBOX_HEIGHT - 1}
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
