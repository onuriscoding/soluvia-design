import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import TermsOfServiceClient from "./TermsOfServiceClient";

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Conditions d'utilisation | Soluvia" 
      : "Terms of Service | Soluvia",
    description: lang === "fr"
      ? "Consultez les conditions d'utilisation de Soluvia qui régissent l'utilisation de notre site web et de nos services."
      : "Review Soluvia's terms of service that govern your use of our website and services.",
    metadataBase: new URL("https://www.soluvia.co"),
    alternates: {
      canonical: `https://www.soluvia.co/${lang}/terms-of-service`,
      languages: {
        'en': 'https://www.soluvia.co/en/terms-of-service',
        'fr': 'https://www.soluvia.co/fr/terms-of-service',
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://www.soluvia.co/${lang}/terms-of-service`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Conditions d'utilisation | Soluvia" : "Terms of Service | Soluvia",
      description: lang === "fr"
        ? "Consultez les conditions d'utilisation qui régissent l'utilisation de notre site web et de nos services."
        : "Review our terms of service that govern your use of our website and services.",
    },
  };
}

export default async function TermsOfServicePage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const lang = params.lang || "en";
  
  return <TermsOfServiceClient dictionary={dict} lang={lang} />;
} 