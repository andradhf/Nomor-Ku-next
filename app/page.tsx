import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import ProductGrid from '@/components/sections/ProductGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import SectionCategory from '@/components/sections/SectionCategory';
import AdditionalProducts from '@/components/sections/additionalproducts';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <SocialProof />
        <SectionCategory />
        <ProductGrid />
        <AdditionalProducts />
        <Testimonials />
        <HowItWorks />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
