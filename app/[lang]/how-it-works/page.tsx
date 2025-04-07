import { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  
  return {
    title: `${dict["how-it-works"].title1} ${dict["how-it-works"].title2} | Soluvia`,
    description: dict["how-it-works"].subTitle,
    openGraph: {
      title: `${dict["how-it-works"].title1} ${dict["how-it-works"].title2} | Soluvia`,
      description: dict["how-it-works"].subTitle,
      url: "https://soluviadesign.com/how-it-works",
      images: [
        {
          url: "/how-it-works-og.jpg",
          width: 1200,
          height: 630,
          alt: `${dict["how-it-works"].title1} ${dict["how-it-works"].title2}`,
        },
      ],
    },
    twitter: {
      title: `${dict["how-it-works"].title1} ${dict["how-it-works"].title2} | Soluvia`,
      description: dict["how-it-works"].subTitle,
    },
  };
}

export default async function HowItWorksPage({ params }: { params: { lang: string } }) {
  // Get the dictionary based on the current language
  const dict = await getDictionary(params.lang);
  
  return <HowItWorksClient dictionary={dict} />;
} 