import type React from "react";
import { Inter } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { VideoBackground } from "@/components/video-background";
import { PageTransition } from "@/components/page-transition";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#0B0B14] text-white antialiased">
        <SmoothScroll>
          {/* Scroll progress indicator */}
          <ScrollProgress />
          {/* Video background */}
          <VideoBackground />

          {/* Site content */}
          <div className="relative flex min-h-screen flex-col">
            <EnhancedNavigationBar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <RedesignedFooter />
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
