import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Rahul",
  lastName: "Sulegaokar",
  displayName: "Rahul Sulegaokar",
  username: "rahulsulegaokar",
  gender: "male",
  pronouns: "he/him",
  bio: "Product Designer & Frontend Developer with 7+ years of experience, specializing in end-to-end product development from concept to launch.",
  flipSentences: [
    "Product Designer & Frontend Developer",
    "Building user-centric web experiences",
    "Turning ideas into polished products",
  ],
  address: "Mumbai, India",
  phoneNumber: "KzkxNzkwMDE1MTg4Mw", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "cnN1bGVnYW9rYXJAZ21haWwuY29t", // base64 encoded
  website: "https://rahulsulegaokar.com",
  jobTitle: "Lead Product Designer & Frontend Developer",
  jobs: [
    {
      title: "Lead Product Designer & Frontend Developer",
      company: "Proton lab",
      website: "https://protonlab.ai",
    },
    {
      title: "Design Engineer",
      company: "shadcncraft",
      website: "https://shadcncraft.com",
      experienceId: "shadcncraft",
    },
    {
      title: "Founder",
      company: "Quaric",
      website: "https://quaric.com",
      experienceId: "quaric",
    },
  ],
  about: `
Product Designer & Frontend Developer with 7+ years of experience, specializing in end-to-end product development from concept to launch.

Led development teams and founded buildnboost, a web and app development agency serving international clients across USA, Israel, Dubai, and UK. Specialized in building SaaS products and scalable applications with modern tech stacks.

As founding team member at Nilede Technologies, led a team of 4 developers building multi-tenant SaaS platforms and CRM solutions for clients across multiple countries.

Currently leading product design and development at Proton lab, building HyperWarp—an AI-powered email automation platform.

Built and scaled AaTronix blog to 150k+ views, creating custom Android ROMs and building an engaged community in the Android development space.

Skilled in Next.js, React, TypeScript, Tailwind CSS, and modern frontend technologies—delivering high-quality, user-centric web and mobile applications with a strong focus on both design excellence and technical implementation.
`,
  avatar: "https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?v=8",
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3?v=3",
  timeZone: "Asia/Ho_Chi_Minh",
  keywords: [
    "rahul sulegaokar",
    "rahulsulegaokar",
    "product designer",
    "frontend developer",
    "lead product designer",
    "web developer",
    "saas development",
    "tailwind css",
    "react developer",
    "nextjs developer",
    "typescript developer",
    "ui/ux designer",
    "mobile app developer",
    "fullstack developer",
    "design engineer",
    "proton lab",
    "hyperwarp",
    "buildnboost",
    "mumbai developer",
    "india web developer",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
