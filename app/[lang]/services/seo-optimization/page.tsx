import { Metadata } from "next";
import SeoOptimizationClient from "./SeoOptimizationClient";
import { ServiceStructuredData, FAQStructuredData } from "@/components/structured-data";
import { seoServices } from "@/lib/seo-services";
import { BreadcrumbsNav } from "@/components/breadcrumbs-nav";
import { getDictionary } from "../../dictionaries";

// Enhanced metadata with multi-language support, better structured data, and SEO optimizations
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  // Ensure we await the params
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Optimisation SEO | Soluvia" 
      : "SEO Optimization | Soluvia",
    description: lang === "fr"
      ? "Améliorez votre visibilité en ligne et augmentez votre trafic organique avec nos stratégies SEO complètes. Services d'experts en référencement pour propulser votre entreprise."
      : "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies. Expert search engine optimization services to propel your business forward.",
    metadataBase: new URL("https://soluvia.com"),
    keywords: [
      "SEO", "search engine optimization", "keyword research", 
      "on-page SEO", "off-page SEO", "technical SEO", 
      "local SEO", "SEO strategy", "SEO services",
      "Google rankings", "search rankings", "SEO agency"
    ],
    alternates: {
      canonical: `https://soluvia.com/${lang}/services/seo-optimization`,
      languages: {
        'en': 'https://soluvia.com/en/services/seo-optimization',
        'fr': 'https://soluvia.com/fr/services/seo-optimization',
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.com/${lang}/services/seo-optimization`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Optimisation SEO | Soluvia" : "SEO Optimization | Soluvia",
      description: lang === "fr"
        ? "Améliorez votre visibilité en ligne avec nos services SEO experts."
        : "Boost your online visibility with our expert SEO services.",
      images: [
        {
          url: "/seo.png",
          width: 1200,
          height: 630,
          alt: "Soluvia SEO Optimization Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? "Optimisation SEO | Soluvia" : "SEO Optimization | Soluvia",
      description: lang === "fr"
        ? "Améliorez votre visibilité en ligne avec nos services SEO experts."
        : "Boost your online visibility with our expert SEO services.",
      images: ["/seo.png"],
    },
  };
}

export default async function Page({ 
  params 
}: { 
  params: { lang: string } 
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const homeLabel = lang === "fr" ? "Accueil" : "Home";
  const dictionary = await getDictionary(lang);
  
  return (
    <>
      <ServiceStructuredData service="SEO Optimization" />
      <FAQStructuredData faqs={seoServices.faqs} />
      <SeoOptimizationClient dictionary={dictionary} />
    </>
  );
}
