import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { CategoriesSection } from '@/components/landing/CategoriesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { LeadCaptureSection } from '@/components/landing/LeadCaptureSection';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <LeadCaptureSection />
      <Footer />
    </main>
  );
}
