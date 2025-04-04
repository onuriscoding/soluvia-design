import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { PageTransition } from "@/components/page-transition";
import { I18nProvider } from "@/lib/i18n/i18nContext";
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
  generator: "v0.dev",
};
