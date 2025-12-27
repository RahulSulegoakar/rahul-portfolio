import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "Rahul",
  lastName: "Sulegaokar",
  displayName: "Rahul Sulegaokar",
  username: "rahulsulegaokar",
  gender: "male",
  pronouns: "he/him",
  bio: "Been crafting seamless web experiences for almost a decade, always on a mission to make things look awesome, one pixel at a time.",
  flipSentences: [
    "Product Designer and Developer",
    "Crafting seamless web experiences",
    "Making things look awesome, one pixel at a time",
  ],
  address: "Mumbai, India",
  phoneNumber: "KzkxNzkwMDE1MTg4Mw", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "cnN1bGVnYW9rYXJAZ21haWwuY29t", // base64 encoded
  website: "https://rahulsulegaokar.com",
  jobTitle: "Product Designer and Developer",
  jobs: [
    {
      title: "Frontend Developer",
      company: "AGI, Inc",
      website: "https://www.theagi.company",
    },
    {
      title: "Founder",
      company: "buildnboost",
      website: "https://buildnboost.com",
    },
  ],

  about: `
Been crafting seamless web experiences for almost a decade, always on a mission to make things look awesome, one pixel at a time.

Designing and developing websites, software interfaces, tailwind css, react, and next.js — that's my zone, dedicating my skills to perfecting these realms.

I'm all about that constant level-up — learning, unlearning, and refining the craft. If it's digital, I'll make it dope.

And, of course, nowadays, leveraging AI IDEs like Cursor and Windsurf makes my work faster and more efficient.
`,
  avatar: "https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?t=1764345394",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Kolkata",
  keywords: [
    "rahul sulegaokar",
    "rahulsulegaokar",
    "product designer",
    "web developer",
    "tailwind css",
    "react developer",
    "nextjs developer",
    "ui designer",
    "frontend developer",
    "web design",
    "software interface design",
    "cursor ide",
    "windsurf",
    "ai development",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
} satisfies User;
