import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Rahul",
  lastName: "Sulegaokar",
  displayName: "Rahul Sulegaokar",
  username: "rahulsulegaokar",
  gender: "male",
  pronouns: "he/him",
  bio: "Full-stack engineer and agency founder. Design through deployment.",
  flipSentences: [
    "Design through deployment.",
    "Full-Stack Engineer & Agency Founder.",
    "Shipping web and mobile products for 10+ years.",
    "Built app simulations for AI agent training.",
  ],
  address: "Mumbai, India",
  phoneNumberB64: "KzkxNzkwMDE1MTg4Mw==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  emailB64: "cnN1bGVnYW9rYXJAZ21haWwuY29t", // base64 encoded
  website: "https://rahulsulegaokar.com",
  jobTitle: "Full-Stack Engineer & Agency Founder",
  jobs: [
    {
      title: "Founder",
      company: "buildnboost",
      website: "https://rahulsulegaokar.com",
      experienceId: "buildnboost",
    },
  ],
  about: `- I’m Rahul — a full-stack engineer and agency founder who takes products from idea to deployed: design, development, and delivery under one roof.
- 10+ years shipping web and mobile products for international clients across the US, Israel, Dubai, the UK, and Oman.
- Most recently at AGI, Inc., built pixel-accurate clones of Airbnb, Amazon, Gmail, Uber, LinkedIn, and 12+ other apps used to train and evaluate AI agents, and contributed to [realevals.xyz](https://realevals.xyz).
- Founder of buildnboost, a web and app development agency building SaaS products for founders end-to-end.
`,
  avatar: "https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp",
  avatarSketch: "https://assets.chanhdai.com/images/avatar-sketch.webp",
  ogImage: `/og/simple?title=${encodeURIComponent("Rahul Sulegaokar")}&description=${encodeURIComponent("Full-stack engineer and agency founder. Design through deployment.")}`,
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "rahul sulegaokar",
    "rahulsulegaokar",
    "full-stack engineer",
    "full-stack developer",
    "agency founder",
    "buildnboost",
    "nilede technologies",
    "agi inc",
    "ai agent evaluation",
    "react developer",
    "nextjs developer",
    "react native developer",
    "laravel developer",
    "ui/ux designer",
    "mumbai developer",
    "india web developer",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
