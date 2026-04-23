import { Navbar } from '@/components/Navbar';
import { BottomCTASection } from '@/components/landing/BottomCTASection';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { PainPointsSection } from '@/components/landing/PainPointsSection';
import { SolutionsSection } from '@/components/landing/SolutionsSection';
import { TrustSection } from '@/components/landing/TrustSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <PainPointsSection />
        <SolutionsSection />
        <ContactSection />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}
