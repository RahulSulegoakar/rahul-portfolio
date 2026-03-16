import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "shadcraft",
    companyName: "Shadcraft",
    companyLogo:
      "https://assets.chanhdai.com/images/companies/shadcraft.svg?v=2",
    companyWebsite: "https://shadcraft.com",
    positions: [
      {
        id: "1",
        title: "Design Engineer",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Full-time",
        icon: "code",
        description:
          "- Work on the registry and React component library.\n- Design and build Pro application components and blocks, from Figma to production-ready React.",
        skills: [
          "TypeScript",
          "Next.js",
          "Tailwind CSS",
          "shadcn/registry",
          "Figma",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "quaric",
    companyName: "Quaric",
    companyLogo: "https://assets.chanhdai.com/images/companies/quaric.svg",
    companyWebsite: "https://quaric.com",
    positions: [
      {
        id: "2",
        title: "Design Engineer",
        employmentPeriod: {
          start: "03.2024",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `- Created Quaric Brand Identity.
- Created the Quaric Design System to standardize design practices and accelerate development.

In-house Project: [Quaric Website](https://quaric.com)
- Designed the UI/UX for Quaric Website, delivering a seamless experience.
- Developed online ordering to streamline purchases.
- Integrated VNPAY-QR for secure transactions.
- Registered the e-commerce site with [online.gov.vn](http://online.gov.vn/website/chi-tiet-115855) for compliance.

In-house Project: [ZaDark](https://zadark.com)
- Build and maintain ZaDark.com with Docusaurus, integrating AdSense.
- Develop and maintain the ZaDark extension for Zalo Web on Chrome, Safari, Edge, and Firefox — with 20k+ active users via Chrome Web Store (as of Sep 2025).`,
        skills: [
          "Next.js",
          "Strapi",
          "Auth0",
          "VNPAY-QR",
          "Docker",
          "NGINX",
          "Google Cloud",
          "Docusaurus",
          "Extension",
          "UI/UX Design",
          "UX Writing",
          "Design System",
          "Brand Design",
          "Figma",
          "Research",
        ],
      },
      {
        id: "1",
        title: "Founder",
        employmentPeriod: {
          start: "03.2024",
        },
        employmentType: "Part-time",
        icon: "idea",
        skills: ["Business Ownership", "Business Law", "Business Tax"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "simplamo",
    companyName: "Simplamo",
    companyLogo: "https://assets.chanhdai.com/images/companies/simplamo.webp",
    positions: [
      {
        id: "2",
        title: "Senior Frontend Developer",
        employmentPeriod: {
          start: "10.2022",
          end: "01.2026",
        },
        employmentType: "Full-time",
        icon: "code",
        description: `- Built Tree & Gantt views features to improve goal organization, visibility, and progress tracking.
- Developed [AI Chat](https://help.simplamo.com/features/simplamo-ai/ai-chat/guide_simplamo_ai_chat?ref=IN-926722) and [AI Assistant](https://help.simplamo.com/features/simplamo-ai/ai-expert/aiexpert-rockdiscribe?ref=IN-926722) features.
- Developed [Whiteboards](https://help.simplamo.com/features/whiteboard/overview?ref=IN-926722) with real-time collaboration.
- Built and maintained the [Zalo Mini App](https://zalo.me/s/1736112917405511258/) for Simplamo with seamless integration.
- Developed interactive chart and analytics widgets for the [Dashboard](https://help.simplamo.com/features/dashboard/overview) to enhance data visualization.
- Developed and maintained core features to enhance functionality and user experience.
- Ensured UI/UX consistency and adherence to standards.
- Implemented robust frontend solutions for web and mobile platforms.
- Analyzed technical capabilities and provided optimal solutions.`,
        skills: [
          "TypeScript",
          "Next.js",
          "React Native",
          "MobX",
          "MobX-State-Tree",
          "Tailwind CSS",
          "Dify",
          "Zalo Mini App",
          "Agile",
          "Teamwork",
          "Research",
          "Problem-solving",
        ],
      },
      {
        id: "1",
        title: "UI Lead",
        employmentPeriod: {
          start: "10.2022",
          end: "01.2026",
        },
        employmentType: "Full-time",
        icon: "design",
        description: `- Ensured UI/UX consistency and high-quality standards.
- Designed intuitive, user-focused interfaces aligned with business goals.
- Defined and established a cohesive UI style for Simplamo.`,
        skills: ["Creativity", "UI/UX Design", "Figma"],
      },
    ],
  },
  {
    id: "tungtung",
    companyName: "Tung Tung",
    companyLogo: "https://assets.chanhdai.com/images/companies/tungtung.webp",
    positions: [
      {
        id: "3",
        title: "Web Developer",
        employmentPeriod: {
          start: "2020",
          end: "2022",
        },
        employmentType: "Full-time",
        description: `- Built a scalable design system for consistency and efficiency.
- Built a complex rich-text editor based on ProseMirror and Slate for customizable content creation.
- Integrated APIs with the Backend Team to enhance functionality.`,
        icon: "code",
        skills: [
          "React",
          "Redux",
          "Storybook",
          "Lerna",
          "Agile",
          "Teamwork",
          "Research",
        ],
      },
      {
        id: "2",
        title: "Mobile Developer",
        employmentPeriod: {
          start: "2019",
          end: "2020",
        },
        employmentType: "Full-time",
        description: `- Rebuilt the app with React Native for better UX and performance.
- Integrated MoMo and in-app purchases for seamless payments.
- Optimized deployment for staging and production.
- Published on App Store and Google Play, ensuring compliance.`,
        icon: "code",
        skills: [
          "React Native",
          "Redux",
          "MoMo Payment API",
          "App Store",
          "Google Play Store",
          "App Center",
          "Agile",
          "Teamwork",
          "Research",
        ],
      },
      {
        id: "1",
        title: "UI/UX Designer",
        employmentPeriod: {
          start: "2018",
          end: "2019",
        },
        employmentType: "Full-time",
        description: `- Designed a Landing Page for enterprise clients.
- Redesigned the Online Quiz Platform for a modern look on web and mobile.
- Redesigned the Pricing interface for individual customers.
- Enhanced UX by improving usability, navigation, and user flow.`,
        icon: "design",
        skills: ["UI/UX Design", "Sketch"],
      },
    ],
  },
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "2",
        title: "Full-stack Developer",
        employmentPeriod: {
          start: "2018",
          end: "2020",
        },
        employmentType: "Part-time",
        description: `- Built an order management website with real-time delivery tracking.
- Developed an e-commerce site for bird's nest products.
- Created a map to display monitoring station data.
- Designed a customizable WordPress landing page.`,
        icon: "code",
        skills: [
          "Laravel",
          "React",
          "Express.js",
          "Socket.IO",
          "MongoDB",
          "Firebase",
          "WordPress",
          "Docker",
          "NGINX",
        ],
      },
      {
        id: "1",
        title: "Graphic & UI/UX Designer",
        employmentPeriod: {
          start: "2018",
          end: "2019",
        },
        employmentType: "Part-time",
        description: "Designed logos, posters, ads, and UI.",
        icon: "design",
        skills: [
          "Creativity",
          "UI/UX Design",
          "Graphic Design",
          "Sketch",
          "Adobe Photoshop",
          "Adobe Illustrator",
        ],
      },
    ],
  },
]
