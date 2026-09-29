import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  LightbulbIcon,
  SmartphoneIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "buildnboost",
    companyName: "buildnboost",
    companyIcon: <LightbulbIcon strokeWidth={1.8} />,
    location: "Mumbai, India",
    positions: [
      {
        id: "2",
        title: "Founder",
        employmentPeriod: {
          start: "05.2023",
        },
        employmentType: "Self-employed",
        icon: <LightbulbIcon />,
        description: `- Resumed and scaled the agency, serving international clients across the US, Israel, Dubai, and the UK.
- Build and launch SaaS products for founders end-to-end — design, development, deployment — outsourcing selectively as builds scale.
- Shipped web3 and full-stack projects.
- Now running the agency selectively alongside full-time work.`,
        skills: [
          "Business Ownership",
          "SaaS Development",
          "Full-stack Development",
          "Next.js",
          "React",
          "Laravel",
          "Tailwind CSS",
          "Web3",
          "Figma",
        ],
        isExpanded: true,
      },
      {
        id: "1",
        title: "Founder",
        employmentPeriod: {
          start: "01.2019",
          end: "11.2021",
        },
        employmentType: "Self-employed",
        icon: <LightbulbIcon />,
        description: `- Founded a web/app development agency at 20, serving clients across India, Dubai, and Oman.
- Shipped Liplick Pizzeria (mobile + web), FlyCloudCross (Dubai), the Floret Mumbai University app, and a CRM-integrated event site for Bombay College of Pharmacy.
- Owned every project end-to-end — design to deployment.
- Paused solo operations in 2021 to take a founding product role at Nilede Technologies.`,
        skills: ["Laravel", "Next.js", "React", "Tailwind CSS", "Figma"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "agi-inc",
    companyName: "AGI, Inc.",
    companyIcon: <CodeXmlIcon strokeWidth={1.8} />,
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Full-Stack Engineer",
        employmentPeriod: {
          start: "07.2025",
          end: "05.2026",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Built functional, pixel-accurate clones of major consumer apps — Airbnb, Amazon, Gmail, Uber, LinkedIn, and 12+ others — used as realistic training and evaluation environments for AI agents.
- Shipped deterministic sandboxes with configurable behaviors, real data, and scoring frameworks so agent performance could be benchmarked reliably.
- Extended the same approach to mobile, building React Native + Expo simulations alongside the Next.js/Redux/Tailwind web stack.
- Contributed to [realevals.xyz](https://realevals.xyz), a public leaderboard for AI agent performance.
- Picked up RLHF and reward engineering on the job to improve evaluation accuracy.`,
        skills: [
          "TypeScript",
          "Next.js",
          "Redux",
          "Tailwind CSS",
          "React Native",
          "Expo",
          "RLHF",
          "Agent Evaluation",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "nilede-technologies",
    companyName: "Nilede Technologies",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Founding Member & Product Lead",
        employmentPeriod: {
          start: "11.2021",
          end: "05.2023",
        },
        employmentType: "Full-time",
        icon: <DraftingCompassIcon />,
        description: `- Joined as a founding team member, owning product direction, sales, and development oversight.
- Led a 4-person development team shipping CRM backends and multi-tenant SaaS infrastructure.
- Built a full-stack pizza brand platform spanning mobile app, web app, and franchise admin portal.
- Drove business development — cold outreach, partnerships, client acquisition — across clients in India, the US, and the UK.`,
        skills: [
          "Product Management",
          "Team Leadership",
          "CRM Development",
          "Multi-tenant SaaS",
          "UI/UX Design",
          "Business Development",
          "Sales",
        ],
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "1",
        title: "Product Designer & Developer",
        employmentPeriod: {
          start: "01.2017",
          end: "12.2018",
        },
        employmentType: "Freelance",
        icon: <DraftingCompassIcon />,
        description: `- Designed and built websites and apps independently for local businesses.
- Shipped SmartBistro, a cross-platform app built with Ionic, Angular, and Cordova — first project owning both design and code on the same product.`,
        skills: ["UI/UX Design", "Figma", "Ionic", "Angular", "Cordova"],
      },
    ],
  },
  {
    id: "aatronix",
    companyName: "AaTronix",
    companyIcon: <SmartphoneIcon strokeWidth={1.8} />,
    companyWebsite: "https://aatronix.blogspot.com",
    positions: [
      {
        id: "1",
        title: "Android Custom ROM Developer & Blogger",
        employmentPeriod: {
          start: "12.2014",
          end: "12.2016",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Built and distributed custom Android ROMs on XDA Developers forums.
- Ran a monetized blog with consistent traffic via AdSense and AdFly.`,
        skills: [
          "Android",
          "Custom ROM Development",
          "Blogging",
          "Content Monetization",
        ],
      },
    ],
  },
]
