import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { VideoBackground } from "@/components/video-background";
import { PageTransition } from "@/components/page-transition";
import { SmoothScroll } from "@/components/smooth-scroll";
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
      <body className="relative min-h-screen">
        <SmoothScroll>
          {/* Video background - positioned absolutely to cover the entire viewport */}
          <div className="fixed inset-0 w-full h-full">
            <VideoBackground />
          </div>

          {/* Site content - positioned above video with transparent background */}
          <div className="relative z-10">
            {/* Scroll progress indicator */}
            <ScrollProgress />

            <div className="flex min-h-screen flex-col">
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

import "./globals.css";

export const metadata = {
  generator: "v0.dev",
};
