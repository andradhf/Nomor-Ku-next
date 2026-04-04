import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import ProductGrid from '@/components/sections/ProductGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import CustomizationPreviewer from '@/components/sections/CustomizationPreviewer';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <SocialProof />
        <ProductGrid />
        <HowItWorks />
        <CustomizationPreviewer />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
