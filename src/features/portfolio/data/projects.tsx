import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "ai-agent-app-simulations",
    title: "AI Agent App Simulations",
    period: {
      start: "07.2025",
      end: "05.2026",
    },
    skills: [
      "AGI, Inc.",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "React Native",
      "Expo",
      "Agent Evaluation",
    ],
    description: `Functional, pixel-accurate clones of major consumer apps used as realistic training and evaluation environments for AI agents.
- Airbnb, Amazon, Gmail, Uber, LinkedIn, and 12+ other apps across web and mobile
- Deterministic sandboxes with configurable behaviors and real data
- Scoring frameworks so agent performance can be benchmarked reliably`,
    isExpanded: true,
  },
  {
    id: "realevals",
    title: "RealEvals",
    period: {
      start: "07.2025",
      end: "05.2026",
    },
    link: "https://realevals.xyz",
    skills: ["AGI, Inc.", "AI Agents", "Leaderboard", "Agent Evaluation"],
    description: "A public leaderboard for AI agent performance.",
  },
  {
    id: "pizza-brand-platform",
    title: "Pizza Brand Platform",
    period: {
      start: "11.2021",
      end: "05.2023",
    },
    skills: [
      "Nilede Technologies",
      "Mobile App",
      "Web App",
      "Admin Portal",
      "UI/UX Design",
    ],
    description: `A full-stack digital ecosystem for a pizza brand.
- Customer mobile app and web app
- Franchise and store order management admin portal`,
  },
  {
    id: "liplick-pizzeria",
    title: "Liplick Pizzeria",
    period: {
      start: "01.2019",
      end: "11.2021",
    },
    skills: ["buildnboost", "Mobile App", "Web App", "UI/UX Design", "Figma"],
    description: "Mobile and web ordering experience for Liplick Pizzeria.",
  },
  {
    id: "floret",
    title: "Floret — Mumbai University App",
    period: {
      start: "01.2019",
      end: "11.2021",
    },
    skills: ["buildnboost", "Mobile App", "UI/UX Design"],
    description:
      "A university app for attendance tracking, exam management, assignment submission, and syllabus access.",
  },
  {
    id: "flycloudcross",
    title: "FlyCloudCross",
    period: {
      start: "01.2019",
      end: "11.2021",
    },
    skills: ["buildnboost", "Next.js", "Tailwind CSS", "UI/UX Design"],
    description: "Website for FlyCloudCross LLC, a Dubai-based travel agency.",
  },
  {
    id: "bcp-event-site",
    title: "Bombay College of Pharmacy Event Site",
    period: {
      start: "01.2019",
      end: "11.2021",
    },
    skills: ["buildnboost", "Laravel", "Tailwind CSS", "CRM"],
    description:
      "Event website with an integrated admin panel for CRM, built for Bombay College of Pharmacy.",
  },
  {
    id: "smartbistro",
    title: "SmartBistro",
    period: {
      start: "01.2017",
      end: "12.2018",
    },
    skills: ["Freelance", "Ionic", "Angular", "Cordova", "Figma"],
    description:
      "A cross-platform app built with Ionic, Angular, and Cordova — first project owning both design and code on the same product.",
  },
  {
    id: "aatronix",
    title: "AaTronix",
    period: {
      start: "12.2014",
      end: "12.2016",
    },
    link: "https://aatronix.blogspot.com",
    skills: ["Android", "Custom ROMs", "XDA Developers", "Blogging"],
    description: `Custom Android ROMs and a monetized tech blog.
- Built and distributed custom ROMs on XDA Developers forums
- Monetized via AdSense and AdFly`,
  },
]
