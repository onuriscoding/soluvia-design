import { Metadata } from "next";
import { ServiceStructuredData } from "@/components/structured-data";
import WebDesignDevelopmentClient from "./WebDesignDevelopmentClient";
import { getDictionary } from "../../dictionaries";

// Enhanced metadata with multi-language support, better structured data, and SEO optimizations
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
      ? "Design & Développement Web | Soluvia" 
      : "Web Design & Development | Soluvia",
    description: lang === "fr"
      ? "Création de sites web magnifiques et réactifs qui captent votre audience et reflètent l'identité unique de votre marque. Notre équipe utilise les dernières technologies pour construire des sites web performants."
      : "Create stunning, responsive websites that captivate your audience and reflect your brand's unique identity. Our team uses cutting-edge technologies to build high-performance websites with exceptional user experiences.",
    keywords: [
      "web design", "web development", "responsive design", 
      "UI/UX design", "front-end development", "back-end development", 
      "custom website", "mobile-first websites", "website optimization",
      "business website", "e-commerce website", "web applications"
    ],
    alternates: {
      canonical: `https://soluvia.co/${lang}/services/web-design-development`,
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.co/${lang}/services/web-design-development`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Conception et Développement Web | Soluvia" : "Web Design & Development | Soluvia",
      description: lang === "fr"
        ? "Sites web magnifiques et réactifs qui captent votre audience."
        : "Stunning, responsive websites that captivate your audience.",
      images: [
        {
          url: "/web-design.png",
          width: 1200,
          height: 630,
          alt: "Soluvia Web Design & Development Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "fr" ? "Conception et Développement Web | Soluvia" : "Web Design & Development | Soluvia",
      description: lang === "fr"
        ? "Sites web magnifiques et réactifs qui captent votre audience."
        : "Stunning, responsive websites that captivate your audience.",
      images: ["/web-design.png"],
    },
  };
}

// Split component for better performance and proper separation of server/client code
export default async function Page({ 
  params 
}: { 
  params: { lang: string } 
}) {
  // Await params before accessing properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);
  
  return (
    <>
      <ServiceStructuredData service="Web Design & Development" />
      <WebDesignDevelopmentClient dictionary={dictionary} />
    </>
  );
}
