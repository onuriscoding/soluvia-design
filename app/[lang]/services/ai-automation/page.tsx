import { Metadata } from "next";
import { ServiceStructuredData } from "@/components/structured-data";
import AiAutomationClientComponent from "./AiAutomationClient";

// Enhanced metadata with multi-language support
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  // Ensure we await the params
  const params = await Promise.resolve(paramsPromise);
  
  // Ensure we have a string for the language
  const lang = params.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Automatisation IA | Soluvia" 
      : "AI Automation | Soluvia",
    description: lang === "fr"
      ? "Automatisez les processus répétitifs et améliorez les expériences clients grâce à nos solutions d'automatisation IA. Nos technologies d'intelligence artificielle augmentent l'efficacité et réduisent les coûts."
      : "Automate repetitive processes and enhance customer experiences with our AI automation solutions. Our artificial intelligence technologies increase efficiency and reduce costs for your business.",
    keywords: [
      "AI automation", "artificial intelligence", "machine learning", 
      "business automation", "AI chatbots", "workflow automation", 
      "process automation", "AI integration", "data analysis",
      "predictive analytics", "natural language processing", "AI solutions"
    ],
    alternates: {
      canonical: `https://soluvia.com/${lang}/services/ai-automation`,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.com/${lang}/services/ai-automation`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Automatisation IA | Soluvia" : "AI Automation | Soluvia",
      description: lang === "fr"
        ? "Solutions d'automatisation IA pour améliorer l'efficacité de votre entreprise."
        : "AI automation solutions to improve your business efficiency.",
      images: [
        {
          url: "/ai.png",
          width: 1200,
          height: 630,
          alt: "Soluvia AI Automation Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? "Automatisation IA | Soluvia" : "AI Automation | Soluvia",
      description: lang === "fr"
        ? "Solutions d'automatisation IA pour améliorer l'efficacité de votre entreprise."
        : "AI automation solutions to improve your business efficiency.",
      images: ["/ai.png"],
    },
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  
  return (
    <>
      <ServiceStructuredData service="AI Automation" />
      <AiAutomationClientComponent />
    </>
  );
}
