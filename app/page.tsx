import type { Metadata } from 'next'
import { HeroSection } from '@/components/shared/hero-section'
import { RealtimeStats } from '@/components/shared/realtime-stats'
import { ProjectsGrid } from '@/components/shared/projects-grid'
import { AudioShowcase } from '@/components/shared/audio-showcase'
import { JourneyTimeline } from '@/components/shared/journey-timeline'
import { RealtimeGuestbook } from '@/components/shared/realtime-guestbook'
import { ConversionSection } from '@/components/shared/conversion-section'

export const metadata: Metadata = {
  title: "Rafly Baehaqi — Junior Full-Stack Developer & Gitaris",
  description:
    "Portfolio Rafly Baehaqi — Developer & Gitaris Yogyakarta. Lihat proyek web unggulan dan audio showcase gitar.",
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RealtimeStats />
      <ProjectsGrid />
      <AudioShowcase />
      <JourneyTimeline />
      <RealtimeGuestbook />
      <ConversionSection />
    </>
  )
}