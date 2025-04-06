import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { getDictionary } from "../dictionaries";

// Enhanced metadata for services page
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  // Ensure we await the params
  const params = await Promise.resolve(paramsPromise);
  
  // Ensure we have a string for the language
  const lang = params.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Nos Services | Soluvia" 
      : "Our Services | Soluvia",
    description: lang === "fr"
      ? "Découvrez notre gamme complète de services numériques, y compris la conception et le développement web, l'optimisation SEO et l'automatisation par IA pour aider votre entreprise à prospérer en ligne."
      : "Explore our comprehensive range of digital services, including web design and development, SEO optimization, and AI automation to help your business thrive online.",
    keywords: [
      "digital services", "web design", "web development", 
      "SEO optimization", "AI automation", "business solutions", 
      "digital transformation", "online presence", "digital agency",
      "web services", "internet marketing", "website creation"
    ],
    alternates: {
      canonical: `https://soluvia.com/${lang}/services`,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.com/${lang}/services`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Nos Services | Soluvia" : "Our Services | Soluvia",
      description: lang === "fr"
        ? "Services numériques experts pour propulser votre entreprise."
        : "Expert digital services to propel your business forward.",
      images: [
        {
          url: "/soluvia.png",
          width: 1200,
          height: 630,
          alt: "Soluvia Digital Services",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  // Get the dictionary based on the current language
  const dict = await getDictionary(params.lang);
  
  return <ServicesClient dictionary={dict} />;
}
