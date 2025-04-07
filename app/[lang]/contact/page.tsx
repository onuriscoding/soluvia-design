import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import { getDictionary } from "../dictionaries"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  
  return {
    title: `${dict.contact.contactTitle1}${dict.contact.contactTitle2} | Soluvia`,
    description: dict.contact.contactSubTitle,
    openGraph: {
      title: `${dict.contact.contactTitle1} ${dict.contact.contactTitle2} | Soluvia`,
      description: dict.contact.contactSubTitle,
      url: "https://soluviadesign.com/contact",
      images: [
        {
          url: "/contact-og.jpg",
          width: 1200,
          height: 630,
          alt: `${dict.contact.contactTitle1} ${dict.contact.contactTitle2}`,
        },
      ],
    },
    twitter: {
      title: `${dict.contact.contactTitle1} ${dict.contact.contactTitle2} | Soluvia`,
      description: dict.contact.contactSubTitle,
    },
  };
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  // Get the dictionary based on the current language
  const dict = await getDictionary(params.lang);
  
  return <ContactPageClient dictionary={dict} />;
}

