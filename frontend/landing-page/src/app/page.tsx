import HeroSection from '@/components/hero/hero-section'
import FeaturesSection from '@/components/features/features-section'
import PricingSection from '@/components/pricing/pricing-section'
import TestimonialsSection from '@/components/testimonials/testimonials-section'
import CTASection from '@/components/cta/cta-section'

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
} 