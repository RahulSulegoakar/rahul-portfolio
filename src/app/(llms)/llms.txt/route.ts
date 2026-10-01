import { SITE_INFO } from "@/config/site";
import { getBlogPosts } from "@/features/doc/data/documents";

const allPosts = getBlogPosts();

const content = `# rahulsulegaokar.com

> Portfolio of Rahul Sulegaokar, a full-stack engineer and agency founder — design through deployment.

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.
- [Craft](${SITE_INFO.url}/craft.md): Selected work, newest first.
- [Blog](${SITE_INFO.url}/blog.md): Every blog post, newest first, with publish dates.

## Blog

${allPosts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.md): ${item.metadata.description}`).join("\n")}
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
