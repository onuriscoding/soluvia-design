export const metadata = {
  title: "Soluvia | Creative Digital Solutions",
  description:
    "Soluvia provides expert web design, development, SEO optimization, and AI solutions to help businesses thrive in the digital world. Elevate your online presence with our creative digital solutions.",
  generator: "v0.dev",
  metadataBase: new URL("https://www.soluvia.co"),
  keywords: [
    "web design",
    "web development",
    "SEO",
    "AI solutions",
    "digital marketing",
    "Soluvia",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Soluvia | Creative Digital Solutions",
    description:
      "Expert web design, development, SEO optimization, and AI solutions to help your business thrive online.",
    url: "https://www.soluvia.co",
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
    description:
      "Expert web design, development, SEO optimization, and AI solutions to help your business thrive online.",
    images: ["/soluvia.png"],
    creator: "@SoluviaDesign",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { PageTransition } from "@/components/page-transition";
import { I18nProvider } from "@/lib/i18n/i18nContext";
import {
  OrganizationStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import "@/styles/enhanced-animations.css";
import { ConditionalBackground } from "@/components/conditional-background";
import { WhatsAppButton } from "@/components/whatsapp-button";

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
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const lang = resolvedParams.lang === "fr" ? "fr" : "en";

  return (
    <html lang={lang} className={`${inter.className} ${anton.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="C6PFuzOdUFnB3OIMk6MlfM6u0Q7326NrvzVxrj58Ilo"
        />

        {/* Logo Specific Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://www.soluvia.co",
              logo: "https://www.soluvia.co/soluvia-s-no-bg.png",
            }),
          }}
        />

        {/* Structured Data for SEO */}
        <OrganizationStructuredData />
        <WebsiteStructuredData />
      </head>
      <body>
        {/* Conditional Background */}
        <ConditionalBackground />

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

            {/* WhatsApp Button */}
            <WhatsAppButton />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
