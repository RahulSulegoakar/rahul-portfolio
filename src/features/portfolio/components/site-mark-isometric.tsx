"use client";

import { useEffect, useId, useRef } from "react";
import type { Transition } from "motion/react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { metalClickSound } from "@/lib/soundcn/metal-click";
import { useSound } from "@/hooks/soundcn/use-sound";
import {
  isMarkCellFilled,
  MARK_COLS,
  MARK_GRID,
  MARK_ROWS,
} from "@/components/site-mark";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
};

// Isometric projection of the mark lying flat: columns run up-right, rows run
// down-right, and each cell is extruded upward.
const W = 55.43;
const H = 32;
const HEIGHT = 32;
const PRESSED_HEIGHT = 16;
const PAD = 1;

const WIDTH = (MARK_COLS + MARK_ROWS) * W;
const TOP = -MARK_COLS * H - HEIGHT;
const BOTTOM = MARK_ROWS * H;

type Point = [number, number];

function project(x: number, y: number, z: number): Point {
  return [(x + y) * W, (y - x) * H - z];
}

function poly(points: Point[]) {
  return (
    points
      .map(
        ([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`
      )
      .join("") + "Z"
  );
}

function line(a: Point, b: Point) {
  return `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`;
}

type CellPaths = { sides: string; top: string; stroke: string };

function buildCell(x: number, y: number, z: number): CellPaths {
  const filled = isMarkCellFilled;
  const t = (cx: number, cy: number) => project(cx, cy, z);
  const g = (cx: number, cy: number) => project(cx, cy, 0);

  const showLeft = !filled(x - 1, y);
  const showFront = !filled(x, y + 1);

  const sides: string[] = [];
  const stroke: string[] = [];

  if (showLeft) {
    sides.push(poly([t(x, y), t(x, y + 1), g(x, y + 1), g(x, y)]));
    stroke.push(line(g(x, y), g(x, y + 1)));
    if (!filled(x, y - 1) || filled(x - 1, y - 1)) {
      stroke.push(line(t(x, y), g(x, y)));
    }
  }

  if (showFront) {
    sides.push(
      poly([t(x, y + 1), t(x + 1, y + 1), g(x + 1, y + 1), g(x, y + 1)])
    );
    stroke.push(line(g(x, y + 1), g(x + 1, y + 1)));
    if (!filled(x + 1, y) || filled(x + 1, y + 1)) {
      stroke.push(line(t(x + 1, y + 1), g(x + 1, y + 1)));
    }
  }

  if (showLeft || showFront) {
    stroke.push(line(t(x, y + 1), g(x, y + 1)));
  }

  if (!filled(x - 1, y)) stroke.push(line(t(x, y), t(x, y + 1)));
  if (!filled(x + 1, y)) stroke.push(line(t(x + 1, y), t(x + 1, y + 1)));
  if (!filled(x, y - 1)) stroke.push(line(t(x, y), t(x + 1, y)));
  if (!filled(x, y + 1)) stroke.push(line(t(x, y + 1), t(x + 1, y + 1)));

  return {
    sides: sides.join(""),
    top: poly([t(x, y), t(x + 1, y), t(x + 1, y + 1), t(x, y + 1)]),
    stroke: stroke.join(""),
  };
}

const CELLS = MARK_GRID.flatMap((row, y) =>
  [...row].flatMap((char, x) => (char === "#" ? [{ x, y }] : []))
)
  // Far cells first, so nearer blocks paint over them.
  .sort((a, b) => a.y - a.x - (b.y - b.x))
  .map(({ x, y }) => ({
    key: `${x}-${y}`,
    normal: buildCell(x, y, HEIGHT),
    pressed: buildCell(x, y, PRESSED_HEIGHT),
  }));

function variantsFor(key: keyof CellPaths, cell: (typeof CELLS)[number]) {
  return {
    normal: { d: cell.normal[key] },
    pressed: { d: cell.pressed[key] },
  };
}

export function SiteMarkIsometric() {
  const id = useId();
  const ids = {
    facePattern: `rs-face-pattern-${id}`,
    radialGradient: `rs-radial-gradient-${id}`,
  };

  const ref = useRef<SVGSVGElement>(null);

  const [play] = useSound(metalClickSound);

  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { margin: "80px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, WIDTH]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  const cy = useSpring(useTransform(mouseY, [0, 1], [TOP, BOTTOM]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  });

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return;
    }

    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  const guideA = [
    project(-12, MARK_ROWS, 0),
    project(MARK_COLS + 12, MARK_ROWS, 0),
  ];
  const guideB = [project(0, -10, 0), project(0, MARK_ROWS + 10, 0)];
  const guideC = [
    project(MARK_COLS, -10, 0),
    project(MARK_COLS, MARK_ROWS + 10, 0),
  ];

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox={`${-PAD} ${TOP - PAD} ${WIDTH + PAD * 2} ${BOTTOM - TOP + PAD * 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d={line(guideA[0], guideA[1])} />
        <path d={line(guideB[0], guideB[1])} />
        <path d={line(guideC[0], guideC[1])} />
      </g>

      {CELLS.map((cell) => (
        <g key={cell.key}>
          <motion.path
            className="fill-background"
            variants={variantsFor("sides", cell)}
            transition={transition}
          />
          <motion.path
            className="fill-background"
            variants={variantsFor("top", cell)}
            transition={transition}
          />
          <motion.path
            fill={`url(#${ids.facePattern})`}
            variants={variantsFor("top", cell)}
            transition={transition}
          />
          <motion.path
            stroke="var(--stroke)"
            variants={variantsFor("stroke", cell)}
            transition={transition}
          />
          <motion.path
            stroke={`url(#${ids.radialGradient})`}
            variants={variantsFor("stroke", cell)}
            transition={transition}
          />
        </g>
      ))}
    </motion.svg>
  );
}
