import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Politique de confidentialité | Soluvia" 
      : "Privacy Policy | Soluvia",
    description: lang === "fr"
      ? "Découvrez comment Soluvia protège vos données et respecte votre vie privée. Notre politique de confidentialité explique nos pratiques concernant les informations personnelles."
      : "Learn how Soluvia protects your data and respects your privacy. Our privacy policy explains our practices regarding personal information.",
    metadataBase: new URL("https://soluvia.co"),
    alternates: {
      canonical: `https://soluvia.co/${lang}/privacy-policy`,
      languages: {
        'en': 'https://soluvia.co/en/privacy-policy',
        'fr': 'https://soluvia.co/fr/privacy-policy',
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: `https://soluvia.co/${lang}/privacy-policy`,
      siteName: "Soluvia",
      title: lang === "fr" ? "Politique de confidentialité | Soluvia" : "Privacy Policy | Soluvia",
      description: lang === "fr"
        ? "Découvrez comment Soluvia protège vos données et respecte votre vie privée."
        : "Learn how Soluvia protects your data and respects your privacy.",
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const dict = await getDictionary(params.lang);
  const lang = params.lang || "en";
  
  return <PrivacyPolicyClient dictionary={dict} lang={lang} />;
} 