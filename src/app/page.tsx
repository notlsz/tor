import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import LogoTicker from "@/components/sections/logo-ticker";
import FeaturesIntro from "@/components/sections/features-intro";
import FeatureInvestorMatching from "@/components/sections/feature-investor-matching";
import FeatureAutomatedOutreach from "@/components/sections/feature-automated-outreach";
import FeatureInvestorRelationships from "@/components/sections/feature-investor-relationships";
import TrustedBrands from "@/components/sections/trusted-brands";
import HowItWorks from "@/components/sections/how-it-works";
import TestimonialsGrid from "@/components/sections/testimonials-grid";
import CtaSection from "@/components/sections/cta-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <LogoTicker />
        <FeaturesIntro />
        <FeatureInvestorMatching />
        <FeatureAutomatedOutreach />
        <FeatureInvestorRelationships />
        <TrustedBrands />
        <HowItWorks />
        <TestimonialsGrid />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}