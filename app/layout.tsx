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
          /* Base styles for all browsers */
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }
          
          /* Safari-only fix */
          @supports (-webkit-touch-callout: none) {
            html, body {
              position: relative !important;
            }
            
            /* This class is added via JS only on Safari */
            .safari-fix {
              position: absolute !important;
              width: 100% !important;
              overflow-x: hidden !important;
            }
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Safari detection and fix
            (function() {
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              if (isSafari) {
                document.documentElement.classList.add('safari-fix');
                document.body.classList.add('safari-fix');
                
                // Monitor scroll position to prevent white space during momentum scrolling
                var lastScrollTop = 0;
                window.addEventListener('scroll', function() {
                  var st = window.pageYOffset || document.documentElement.scrollTop;
                  if (st > lastScrollTop) {
                    // Scrolling DOWN - apply more aggressive constraints
                    document.documentElement.style.overflow = 'hidden';
                    setTimeout(function() {
                      document.documentElement.style.overflow = '';
                    }, 10);
                  }
                  lastScrollTop = (st <= 0) ? 0 : st;
                }, {passive: true});
              }
            })();
          `
        }} />
      </head>
      <body className="relative min-h-screen">
        <ScrollIndicator />
        
        <SmoothScroll>
          {/* Video background - positioned absolutely to cover the entire viewport */}
          <div className="fixed inset-0 w-full h-full">
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
