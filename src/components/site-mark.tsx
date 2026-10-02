/** "RS" drawn on a block grid. `#` is a filled cell; rows run top to bottom. */
export const MARK_GRID = [
  "####.###",
  "#..#.#..",
  "####.###",
  "#.#....#",
  "#.##.###",
] as const;

export const MARK_CELL_SIZE = 64;

export const MARK_COLS = MARK_GRID[0].length;
export const MARK_ROWS = MARK_GRID.length;

export function isMarkCellFilled(col: number, row: number) {
  return MARK_GRID[row]?.[col] === "#";
}

function buildMarkPath(cell: number) {
  const parts: string[] = [];

  MARK_GRID.forEach((line, row) => {
    let col = 0;
    while (col < line.length) {
      if (line[col] !== "#") {
        col++;
        continue;
      }
      const start = col;
      while (line[col] === "#") col++;
      parts.push(
        `M${start * cell} ${row * cell}h${(col - start) * cell}v${cell}h${-(col - start) * cell}z`
      );
    }
  });

  return parts.join("");
}

export const MARK_PATH = buildMarkPath(MARK_CELL_SIZE);
export const MARK_VIEWBOX = `0 0 ${MARK_COLS * MARK_CELL_SIZE} ${MARK_ROWS * MARK_CELL_SIZE}`;

export function SiteMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={MARK_VIEWBOX}
      aria-hidden
      {...props}
    >
      <path fill="currentColor" d={MARK_PATH} />
    </svg>
  );
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="${MARK_VIEWBOX}"><path fill="currentColor" d="${MARK_PATH}"/></svg>`;
}
