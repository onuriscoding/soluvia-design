import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { VideoBackground } from "@/components/video-background";
import { PageTransition } from "@/components/page-transition";
import { SmoothScroll } from "@/components/smooth-scroll";
import ScrollIndicator from "@/components/scroll-indicator";
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
        <style>{`
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
            position: relative !important;
          }
          
          /* This specifically targets the background container to prevent white space */
          .fixed.inset-0 {
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            left: 0 !important;
            right: 0 !important;
          }
        `}</style>
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
        <ScrollIndicator />
        
        <SmoothScroll>
          {/* Video background - positioned absolutely to cover the entire viewport */}
          <div className="fixed inset-0 w-full h-full overflow-hidden">
            <Iridescence />
          </div>

          {/* Site content - positioned above video with transparent background */}
          <div className="relative z-10">
            <div className="flex min-h-screen flex-col justify-between">
              <EnhancedNavigationBar />
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
              <RedesignedFooter />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
