import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@RahulSulegaokar",
    href: "https://x.com/RahulSulegaokar",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "RahulSulegoakar",
    href: "https://github.com/RahulSulegoakar",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "rahulsulegaokar",
    href: "https://linkedin.com/in/rahulsulegaokar",
    sameAs: true,
  },
  // dailydotdev: {
  //   title: "daily.dev",
  //   handle: "@ncdai",
  //   href: "https://app.daily.dev/ncdai",
  //   sameAs: true,
  // },
  discord: {
    title: "Discord",
    handle: "ncdai",
    href: "https://discord.com/users/1186630645443739651",
  },
  youtube: {
    title: "YouTube",
    handle: "@rahulsulegaokar",
    href: "https://www.youtube.com/@rahulsulegaokar",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
