import { Suspense } from "react"
import type { Metadata } from "next"
import type { ProfilePage, WithContext } from "schema-dts"

import { CARBON_ADS } from "@/config/ads"
import { JSON_LD_ID } from "@/config/json-ld"
import { JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import { FloatingCarbonAds } from "@/components/floating-carbon-ads"
import { Blog } from "@/features/portfolio/components/blog"
import { Education } from "@/features/portfolio/components/education"
import { Experiences } from "@/features/portfolio/components/experiences"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Hello } from "@/features/portfolio/components/hello"
import {
  Insights,
  InsightsSkeleton,
} from "@/features/portfolio/components/insights"
import { Overview } from "@/features/portfolio/components/overview"
import { PixelGridEffect } from "@/features/portfolio/components/pixel-grid-effect"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { Testimonials } from "@/features/portfolio/components/testimonials"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />
      {CARBON_ADS && <FloatingCarbonAds />}
      <PixelGridEffect />

      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div className="relative mx-auto md:max-w-3xl">
          <div
            className="pointer-events-none absolute inset-y-0 right-full w-(--separator-height) border-l pixel-grid max-lg:hidden"
            data-pixel-grid="column"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-full w-(--separator-height) border-r pixel-grid max-lg:hidden"
            data-pixel-grid="column"
            aria-hidden
          />

          <ProfileHeader />
          <Separator />

          <SocialLinks />
          <Overview />
          <GitHubContributions />
          <Separator />

          <Hello />
          <Testimonials />
          <Separator />

          <Blog />
          <Separator />

          <TechStack />
          <Separator />

          <Experiences />
          <Separator />

          <Education />
          <Separator />

          <Projects />
          <Separator />

          <Suspense fallback={<InsightsSkeleton />}>
            <Insights />
          </Suspense>
        </div>
      </div>
    </>
  )
}

function getProfilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    // Reference the Person defined in the WebSite node (rendered globally in
    // the root layout) so both blocks resolve to the same entity.
    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pixel-divider h-(--separator-height) w-full border-x",
        className
      )}
      data-pixel-grid="row"
    >
      {/* <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      /> */}
    </div>
  )
}
