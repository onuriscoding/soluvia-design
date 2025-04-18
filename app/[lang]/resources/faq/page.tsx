import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import FAQClient from "./FAQClient";

export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "FAQ | Soluvia" 
      : "FAQ | Soluvia",
    description: lang === "fr"
      ? "Trouvez des réponses aux questions fréquemment posées sur nos services, notre processus et notre approche."
      : "Find answers to commonly asked questions about our services, process, and approach.",
    alternates: {
      canonical: `https://www.soluvia.co/${lang}/resources/faq`,
      languages: {
        'en': 'https://www.soluvia.co/en/resources/faq',
        'fr': 'https://www.soluvia.co/fr/resources/faq',
      },
    },
    openGraph: {
      title: "FAQ | Soluvia",
      description: "Find answers to commonly asked questions about our services, process, and approach.",
      url: `https://www.soluvia.co/${lang}/resources/faq`,
      images: [
        {
          url: "/faq-og.jpg",
          width: 1200,
          height: 630,
          alt: "Soluvia FAQ",
        },
      ],
    },
    twitter: {
      title: "FAQ | Soluvia",
      description: "Find answers to commonly asked questions about our services, process, and approach.",
    },
  };
}

export default async function FAQPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dictionary = await getDictionary(lang);
  
  return <FAQClient dictionary={dictionary} />;
}
