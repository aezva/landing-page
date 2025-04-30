'use client';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Business from '../components/Business';
import WhyChooseNIA from '../components/WhyChooseNIA';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import CTASection from '../components/CTASection';
import FAQs from '../components/FAQs';
import News from '../components/News';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Business />
      <HowItWorks />
      <Pricing />
      <WhyChooseNIA />
      <CTASection />
      <FAQs />
      <News />
      <Footer />
    </main>
  );
} 