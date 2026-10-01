import { SITE_INFO } from "@/config/site";
import { CRAFTS } from "@/features/craft/data";
import type { CraftMedia } from "@/features/craft/types";

function formatMedia(media: CraftMedia) {
  switch (media.type) {
    case "video":
      return `Video: ${media.src}`;
    case "image":
      return `Image: ${media.src}`;
    case "gallery":
      return `Images: ${media.images.map((image) => image.src).join(", ")}`;
  }
}

const content = `# Craft

> Selected work.

${CRAFTS.length} entries, newest first. They are also shown on ${SITE_INFO.url}/craft.

${CRAFTS.map((item) =>
  [
    `- ${item.description} (${item.createdAt})`,
    item.media && `  ${formatMedia(item.media)}`,
    item.href && `  ${item.href}`,
    item.xPostUrl && `  Post on X: ${item.xPostUrl}`,
  ]
    .filter(Boolean)
    .join("\n")
).join("\n")}
`;

export const revalidate = false;
export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
