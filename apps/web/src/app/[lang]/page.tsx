'use client';

import { Hero } from '@/components/landing/Hero';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Showcase } from '@/components/landing/Showcase';
import { Benefits } from '@/components/landing/Benefits';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { Comparison } from '@/components/landing/Comparison';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Problem -> Solution */}
      <ProblemSolution />

      {/* 4. Features */}
      <Features />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Visual Showcase */}
      <Showcase />

      {/* 7. Benefits */}
      <Benefits />

      {/* 8. Testimonials */}
      <Testimonials />

      {/* 9. Pricing */}
      <Pricing />

      {/* 10. Comparison */}
      <Comparison />

      {/* 11. CTA */}
      <CTA />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}