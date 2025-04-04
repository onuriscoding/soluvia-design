import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team to discuss how we can help you achieve your digital goals.",
  openGraph: {
    title: "Contact Us | Soluvia Design",
    description: "Get in touch with our team to discuss how we can help you achieve your digital goals.",
    url: "https://soluviadesign.com/contact",
    images: [
      {
        url: "/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Soluvia Design",
      },
    ],
  },
  twitter: {
    title: "Contact Us | Soluvia Design",
    description: "Get in touch with our team to discuss how we can help you achieve your digital goals.",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

