import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { PageTransition } from "@/components/page-transition";
import { I18nProvider } from "@/lib/i18n/i18nContext";
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/structured-data";
import "@/styles/enhanced-animations.css";
import Iridescence from "../animations/bg";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function RootLayout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  // Ensure we await the params
  const params = await Promise.resolve(paramsPromise);

  // Ensure the language is one of the supported languages
  const lang = params.lang === "fr" ? "fr" : "en";

  return (
    <html lang={lang} className={`${inter.className} ${anton.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://soluvia.com/${lang}`} />
        <meta name="google-site-verification" content="your-verification-code" />
        {/* Structured Data for SEO */}
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body>
        {/* Background */}
        <div className="fixed inset-0 w-full h-full">
          <Iridescence />
        </div>

        <I18nProvider defaultLang={lang}>
          <div className="relative flex flex-col min-h-screen">
            {/* Header */}
            <EnhancedNavigationBar />

            {/* Main content */}
            <div className="flex-1">
              <PageTransition>
                <main>{children}</main>
              </PageTransition>
              <RedesignedFooter />
            </div>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Soluvia | Creative Digital Solutions",
  description: "Soluvia provides expert web design, development, SEO optimization, and AI solutions to help businesses thrive in the digital world. Elevate your online presence with our creative digital solutions.",
  generator: "v0.dev",
  keywords: ["web design", "web development", "SEO", "AI solutions", "digital marketing", "Soluvia"],
  openGraph: {
    title: "Soluvia | Creative Digital Solutions",
    description: "Expert web design, development, SEO optimization, and AI solutions to help your business thrive online.",
    url: "https://soluvia.com",
    siteName: "Soluvia",
    images: [
      {
        url: "/soluvia.png",
        width: 1200,
        height: 630,
        alt: "Soluvia Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluvia | Creative Digital Solutions",
    description: "Expert web design, development, SEO optimization, and AI solutions to help your business thrive online.",
    images: ["/soluvia.png"],
    creator: "@SoluviaDesign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};
