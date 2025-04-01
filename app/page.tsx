import { RedesignedHeroSection } from "@/components/redesigned-hero-section";
import { RedesignedServicesSection } from "@/components/redesigned-services-section";
import { RedesignedProcessSection } from "@/components/redesigned-process-section";
import { RedesignedPortfolioSection } from "@/components/redesigned-portfolio-section";
import { RedesignedTestimonialsSection } from "@/components/redesigned-testimonials-section";
import { RedesignedPricingSection } from "@/components/redesigned-pricing-section";
import { RedesignedFAQSection } from "@/components/redesigned-faq-section";
import { RedesignedCTASection } from "@/components/redesigned-cta-section";
import { RedesignedContactSection } from "@/components/redesigned-contact-section";
import { StatsCounter } from "@/components/stats-counter";
import { ParallaxSection } from "@/components/parallax-section";

export default function Home() {
  return (
    <>
      <RedesignedHeroSection />
      <ParallaxSection speed={0.3}>
        <RedesignedServicesSection />
      </ParallaxSection>
      {/*<StatsCounter />*/}
      <ParallaxSection speed={0.4} direction="down">
        <RedesignedProcessSection />
      </ParallaxSection>

      <ParallaxSection speed={0.3}>
        <RedesignedTestimonialsSection />
      </ParallaxSection>
      <RedesignedPricingSection />
      <ParallaxSection speed={0.4} direction="down">
        <RedesignedFAQSection />
      </ParallaxSection>
      <RedesignedCTASection />
    </>
  );
}
