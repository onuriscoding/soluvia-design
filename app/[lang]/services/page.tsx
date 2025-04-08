import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { getDictionary } from "../dictionaries";

// Enhanced metadata for services page
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  
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
      canonical: `https://soluvia.co/${lang}/services`,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.co/${lang}/services`,
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

export default async function Page({ 
  params 
}: { 
  params: { lang: string } 
}) {
  // Await params before accessing properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);
  
  return <ServicesClient dictionary={dict} />;
}
