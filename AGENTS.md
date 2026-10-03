# AI agent guidelines for rahulsulegaokar.com

Next.js 16 (App Router) portfolio and blog.

**Stack**: TypeScript, React 19, Tailwind CSS v4, shadcn/ui, MDX, Vitest, pnpm, Vercel

## Project structure

| Directory                              | Purpose                                       |
| -------------------------------------- | --------------------------------------------- |
| `src/app/`                             | App Router pages, layouts, API routes         |
| `src/components/`                      | Shared UI components                          |
| `src/features/`                        | Feature modules: `doc`, `blog`, `portfolio`   |
| `src/config/`                          | Site (`site.ts`) and JSON-LD config           |
| `src/hooks/`, `src/lib/`, `src/utils/` | Hooks, libraries, utilities                   |

**Key files**: `components.json` (shadcn config), `src/features/portfolio/data/` (portfolio data), `.env.example` (env vars)

## Content system

All content lives in `src/features/doc/content/` as MDX files under `blog/`. The category is derived from the immediate subfolder name (not declared in frontmatter).

- **Data layer**: `src/features/doc/data/documents.ts` (`getAllDocs`, `getDocBySlug`, `getDocsByCategory`)
- **Blog UI**: `src/features/blog/` (rendering only, imports data from `features/doc`)

## Coding guidelines

- TypeScript strict mode; explicit types when necessary
- kebab-case file naming
- Descriptive names; comments only for "why", not "what"
- No emojis in code, comments, or commit messages
- Tailwind CSS v4 syntax; support dark/light modes
- Follow SOLID principles
- Headings in sentence-case (capitalize only the first word and proper nouns), applies to Markdown/MDX docs and prose

## Commands

```bash
pnpm dev                # Dev server
pnpm build              # Production build
pnpm test               # Vitest (watch)
pnpm test:run           # Vitest (single run)
pnpm lint               # ESLint
pnpm lint:fix           # ESLint with --fix
pnpm format:write       # Prettier
pnpm check-types        # Type checking (tsc --noEmit)
```

### Local dev URL

A dev server is usually already running behind `https://rahul.localhost` (see `allowedDevOrigins` in `next.config.ts` and `NEXT_PUBLIC_APP_URL` in `.env.local`). Use that origin to test pages and routes, never `http://localhost:3000` or a raw port. It also makes generated absolute URLs match what the code produces.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
