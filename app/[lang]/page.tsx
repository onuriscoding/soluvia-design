import { Metadata } from "next";
import dynamic from 'next/dynamic';
import { RedesignedHeroSection } from "@/components/redesigned-hero-section";
import { RedesignedServicesSection } from "@/components/redesigned-services-section";
import { ParallaxSection } from "@/components/parallax-section";
import { getDictionary } from "./dictionaries";

// Dynamically import non-critical components



const RedesignedTestimonialsSection = dynamic(() => 
  import("@/components/redesigned-testimonials-section").then(mod => mod.RedesignedTestimonialsSection),
  { ssr: true, loading: () => <div className="min-h-[50vh]" /> }
);

const RedesignedPricingSection = dynamic(() => 
  import("@/components/redesigned-pricing-section").then(mod => mod.RedesignedPricingSection),
  { ssr: true, loading: () => <div className="min-h-[50vh]" /> }
);

const RedesignedFAQSection = dynamic(() => 
  import("@/components/redesigned-faq-section").then(mod => mod.RedesignedFAQSection),
  { ssr: true, loading: () => <div className="min-h-[50vh]" /> }
);

const RedesignedCTASection = dynamic(() => 
  import("@/components/redesigned-cta-section").then(mod => mod.RedesignedCTASection),
  { ssr: true, loading: () => <div className="min-h-[20vh]" /> }
);

type Props = {
  params: Promise<{ lang: string }> | { lang: string };
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  // Await params before accessing properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Soluvia | Solutions Digitales Créatives" 
      : "Soluvia | Creative Digital Solutions",
    description: lang === "fr"
      ? "Soluvia fournit des services experts en conception web, développement, optimisation SEO et solutions IA pour aider les entreprises à prospérer dans le monde numérique."
      : "Soluvia provides expert web design, development, SEO optimization, and AI solutions to help businesses thrive in the digital world. Transform your online presence with our innovative approach.",
    metadataBase: new URL("https://www.soluvia.co"),
    keywords: [
      "web design", "web development", "SEO", "AI solutions", 
      "digital marketing", "Soluvia", "creative agency",
      "responsive design", "user experience", "UI/UX",
      "business growth", "online presence", "digital transformation"
    ],
    alternates: {
      canonical: `https://www.soluvia.co/${lang}`,
      languages: {
        'en': 'https://www.soluvia.co/en',
        'fr': 'https://www.soluvia.co/fr',
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://www.soluvia.co/${lang}`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Soluvia | Solutions Numériques Créatives" : "Soluvia | Creative Digital Solutions",
      description: lang === "fr"
        ? "Services experts en conception web, développement, SEO et IA pour votre entreprise."
        : "Expert web design, development, SEO optimization, and AI solutions for your business.",
      images: [
        {
          url: "/soluvia-placeholder.png",
          width: 1200,
          height: 630,
          alt: "Soluvia Design",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? "Soluvia | Solutions Numériques Créatives" : "Soluvia | Creative Digital Solutions",
      description: lang === "fr"
        ? "Services experts en conception web, développement, SEO et IA pour votre entreprise."
        : "Expert web design, development, SEO optimization, and AI solutions for your business.",
      images: ["/soluvia.png"],
      creator: "@SoluviaDesign",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home({ params }: { params: { lang: string } }) {
  // Await params before accessing properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const dict = await getDictionary(lang);

  return (
    <>
      <RedesignedHeroSection dictionary={dict} />
      <ParallaxSection speed={0.3}>
        <RedesignedServicesSection />
      </ParallaxSection>
      {/*<StatsCounter />*/}

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
