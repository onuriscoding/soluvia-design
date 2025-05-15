import { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";
import { getDictionary } from "../dictionaries";

// Metadata for templates page
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
      ? "Modèles | Soluvia" 
      : "Templates | Soluvia",
    description: lang === "fr"
      ? "Découvrez notre collection de modèles gratuits pour l'automatisation IA et le design web, conçus pour vous aider à démarrer rapidement vos projets numériques."
      : "Explore our collection of free AI automation and web design templates, designed to help you kickstart your digital projects quickly.",
    keywords: [
      "free templates", "AI templates", "web design templates", 
      "automation templates", "free resources", "digital templates", 
      "website templates", "AI tools", "downloadable templates",
      "Soluvia templates", "design resources", "free web assets"
    ],
    alternates: {
      canonical: `https://soluvia.co/${lang}/templates`,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.co/${lang}/templates`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Modèles | Soluvia" : "Templates | Soluvia",
      description: lang === "fr"
        ? "Modèles gratuits pour l'automatisation IA et le design web."
        : "Free templates for AI automation and web design.",
      images: [
        {
          url: "/soluvia.png",
          width: 1200,
          height: 630,
          alt: "Soluvia Templates",
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
  
  return <TemplatesClient dictionary={dict} />;
} 