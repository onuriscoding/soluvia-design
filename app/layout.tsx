import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { VideoBackground } from "@/components/video-background";
import { PageTransition } from "@/components/page-transition";
import { SmoothScroll } from "@/components/smooth-scroll";
import ScrollIndicator from "@/components/scroll-indicator";
import ViewportFix from "@/components/viewport-fix";
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
    <html lang="en" className={`${inter.className} ${anton.variable} overflow-x-hidden`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="relative min-h-screen overflow-x-hidden w-full">
        {/* ViewportFix component to eliminate white space on mobile */}
        <ViewportFix />
        
        {/* Scroll Indicator - Outside of SmoothScroll to work correctly */}
        <ScrollIndicator />
        
        <SmoothScroll>
          {/* Video background - positioned absolutely to cover the entire viewport */}
          <div className="fixed inset-0 w-full h-full">
            <Iridescence />
          </div>

          {/* Site content - positioned above video with transparent background */}
          <div className="relative z-10 w-full overflow-hidden">
            <div className="flex min-h-screen flex-col justify-between w-full">
              <EnhancedNavigationBar />
              <PageTransition>
                <main className="flex-1 w-full">{children}</main>
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
