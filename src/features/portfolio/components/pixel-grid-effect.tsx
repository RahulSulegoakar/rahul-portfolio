"use client"

import { useEffect, useRef } from "react"

/** Must match `background-size` of the `pixel-grid` utility. */
const CELL = 8
const MAX_ALPHA = 0.22
const TWINKLE_PER_10K_CELLS = 0.15
const TWINKLE_RISE = 0.008
const TWINKLE_DECAY = 0.004
const TRAIL_DECAY = 0.035

type Cell = { alpha: number; rise: number; decay: number }

/**
 * Lights individual cells of the `pixel-grid` bands: random twinkles plus a
 * fading trail under the cursor. The grid uses `background-attachment: fixed`,
 * so cells live in viewport coordinates and a single fixed canvas lines up.
 * Bands are elements marked with `data-pixel-grid="row"` (spans the viewport
 * width, like `pixel-divider`) or `data-pixel-grid="column"`.
 */
export function PixelGridEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cells = new Map<string, Cell>()
    let color = readColor()
    let frame = 0

    function readColor() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim()
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function getBands() {
      const width = window.innerWidth
      const height = window.innerHeight
      const bands: DOMRect[] = []

      document
        .querySelectorAll<HTMLElement>("[data-pixel-grid]")
        .forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.width === 0 || rect.bottom < 0 || rect.top > height) return
          bands.push(
            el.dataset.pixelGrid === "row"
              ? new DOMRect(0, rect.top, width, rect.height)
              : rect
          )
        })

      return bands
    }

    function isInBands(x: number, y: number, bands: DOMRect[]) {
      return bands.some(
        (b) => x >= b.left && x < b.right && y >= b.top && y < b.bottom
      )
    }

    function light(cx: number, cy: number, decay: number, rise = 0) {
      const key = `${cx},${cy}`
      const cell = cells.get(key)
      if (cell) {
        if (rise === 0) {
          cell.alpha = 1
          cell.rise = 0
          cell.decay = Math.min(cell.decay, decay)
        }
      } else {
        cells.set(key, { alpha: rise ? 0 : 1, rise, decay })
      }
    }

    function spawnTwinkles(bands: DOMRect[]) {
      for (const b of bands) {
        const cols = Math.floor(b.width / CELL)
        const rows = Math.floor(b.height / CELL)
        const expected = (cols * rows * TWINKLE_PER_10K_CELLS) / 10_000
        const count =
          Math.floor(expected) + (Math.random() < expected % 1 ? 1 : 0)

        for (let i = 0; i < count; i++) {
          const cx = Math.floor((b.left + Math.random() * b.width) / CELL)
          const cy = Math.floor((b.top + Math.random() * b.height) / CELL)
          light(cx, cy, TWINKLE_DECAY, TWINKLE_RISE)
        }
      }
    }

    function draw() {
      const bands = getBands()
      spawnTwinkles(bands)

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx!.fillStyle = color

      for (const [key, cell] of cells) {
        if (cell.rise) {
          cell.alpha += cell.rise
          if (cell.alpha >= 1) {
            cell.alpha = 1
            cell.rise = 0
          }
        } else {
          cell.alpha -= cell.decay
        }
        if (cell.alpha <= 0 && !cell.rise) {
          cells.delete(key)
          continue
        }

        const [cx, cy] = key.split(",").map(Number)
        const x = cx * CELL
        const y = cy * CELL
        if (!isInBands(x + 1, y + 1, bands)) continue

        ctx!.globalAlpha = cell.alpha * MAX_ALPHA
        ctx!.fillRect(x + 1, y + 1, CELL - 1, CELL - 1)
      }

      ctx!.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return
      if (!isInBands(e.clientX, e.clientY, getBands())) return
      light(
        Math.floor(e.clientX / CELL),
        Math.floor(e.clientY / CELL),
        TRAIL_DECAY
      )
    }

    const themeObserver = new MutationObserver(() => {
      color = readColor()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 size-full"
      aria-hidden
    />
  )
}
