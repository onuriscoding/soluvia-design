import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { PageTransition } from "@/components/page-transition";
import "@/styles/enhanced-animations.css";
import Iridescence from "./animations/bg";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${anton.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Background */}
        <div className="fixed inset-0 w-full h-full">
          <Iridescence />
        </div>

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
      </body>
    </html>
  );
}
export const metadata = {
  generator: "v0.dev",
};
