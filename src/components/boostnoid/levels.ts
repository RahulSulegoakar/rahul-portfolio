import { MARK_GRID } from "@/components/site-mark";

/**
 * A level is a grid of "pixels": "#" places a brick, anything else is a gap.
 * The canvas is 800 wide, so `800 / brickWidth` columns fit across.
 */
export type Level = {
  name: string;
  brickWidth: number;
  pattern: readonly string[];
  rowScale?: number;
  colOffset?: number;
  rowOffset?: number;
};

export const LEVELS: Level[] = [
  {
    name: "RS",
    brickWidth: 80,
    pattern: MARK_GRID,
    rowScale: 2,
    colOffset: 1,
    rowOffset: 1,
  },
  {
    name: "404",
    brickWidth: 40,
    pattern: [
      "#.#.###.#.#",
      "#.#.#.#.#.#",
      "###.#.#.###",
      "..#.#.#...#",
      "..#.###...#",
    ],
    rowScale: 2,
    colOffset: 4,
    rowOffset: 1,
  },
  {
    name: "LazyApp",
    brickWidth: 40,
    pattern: [
      ".###########.",
      "#############",
      "###.##.##.###",
      "#############",
      ".###########.",
      "..##.........",
      ".##..........",
    ],
    rowScale: 1,
    colOffset: 3,
    rowOffset: 2,
  },
];
