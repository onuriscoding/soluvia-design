import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import { getDictionary } from "../dictionaries"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.about.title1} | Soluvia`,
    description: dict.about.subTitle,
    openGraph: {
      title: `${dict.about.title1} | Soluvia Design`,
      description: dict.about.subTitle,
      url: "https://soluviadesign.com/about",
      images: [
        {
          url: "/about-og.jpg",
          width: 1200,
          height: 630,
          alt: `${dict.about.title1} Soluvia Design`,
        },
      ],
    },
    twitter: {
      title: `${dict.about.title1} | Soluvia Design`,
      description: dict.about.subTitle,
    },
  };
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);
  
  return <AboutPageClient dictionary={dict} />
}

