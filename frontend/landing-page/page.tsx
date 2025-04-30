import Hero from './components/Hero';
import Features from './components/Features';
import Business from './components/Business';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import WhyChooseNIA from './components/WhyChooseNIA';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Business />
      <HowItWorks />
      <Pricing />
      <WhyChooseNIA />
      <CTASection />
    </main>
  );
} 