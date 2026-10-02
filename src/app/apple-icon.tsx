import { ImageResponse } from "next/og";

import { MARK_PATH, MARK_VIEWBOX } from "@/components/site-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div tw="flex h-full w-full items-center justify-center bg-zinc-950 text-zinc-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={MARK_VIEWBOX}
        width={112}
        height={70}
      >
        <path fill="currentColor" d={MARK_PATH} />
      </svg>
    </div>,
    size
  );
}
