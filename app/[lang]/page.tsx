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
import { getDictionary } from "./dictionaries";

type Props = {
  params: Promise<{ lang: string }> | { lang: string };
};

export default async function Home({ params: paramsPromise }: Props) {
  // Ensure we await the params
  const params = await Promise.resolve(paramsPromise);

  // Ensure we have a string for the language
  const lang = params.lang || "en";
  const dict = await getDictionary(lang);

  return (
    <>
      <RedesignedHeroSection dictionary={dict} />
      <ParallaxSection speed={0.3}>
        <RedesignedServicesSection />
      </ParallaxSection>
      {/*<StatsCounter />*/}
      <ParallaxSection speed={0.4} direction="down">
        <RedesignedProcessSection dictionary={dict} />
      </ParallaxSection>

      <ParallaxSection speed={0.3}>
        <RedesignedTestimonialsSection dictionary={dict} />
      </ParallaxSection>
      <RedesignedPricingSection dictionary={dict} />
      <ParallaxSection speed={0.4} direction="down">
        <RedesignedFAQSection dictionary={dict} />
      </ParallaxSection>
      <RedesignedCTASection dictionary={dict} />
    </>
  );
}
