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
            height: 100%;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Safari-only fix */
          @supports (-webkit-touch-callout: none) {
            html, body {
              position: relative !important;
              height: -webkit-fill-available;
            }
            
            /* This class is added via JS only on Safari */
            .safari-fix {
              -webkit-overflow-scrolling: touch;
              overscroll-behavior: none;
            }
            
            /* Prevent overscroll glow effect */
            body {
              overscroll-behavior-y: none;
            }
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Safari detection and fix
            (function() {
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                             /iPad|iPhone|iPod/.test(navigator.userAgent);
              
              if (isSafari) {
                document.documentElement.classList.add('safari-fix');
                document.body.classList.add('safari-fix');
                
                // Ensure animations work properly with scrolling
                var lastScrollTime = 0;
                var scrollThrottle = 10; // ms

                function throttledScroll() {
                  var now = Date.now();
                  if (now - lastScrollTime > scrollThrottle) {
                    lastScrollTime = now;
                    window.dispatchEvent(new CustomEvent('scroll:throttled'));
                  }
                }
                
                // Safari scrolling fixes
                window.addEventListener('scroll', throttledScroll, { passive: true });
                                
                // Prevent bounce only at bottom of page
                var touchStartY = 0;
                window.addEventListener('touchstart', function(e) {
                  touchStartY = e.touches[0].clientY;
                }, { passive: true });
                
                window.addEventListener('touchmove', function(e) {
                  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  var touchY = e.touches[0].clientY;
                  var direction = touchStartY - touchY;
                  var isAtBottom = (window.innerHeight + scrollTop) >= document.body.offsetHeight - 5;
                  
                  // Only prevent scrolling down when at the bottom of the page
                  if (isAtBottom && direction > 0) {
                    e.preventDefault();
                  }
                }, { passive: false });
              }
            })();
          `
        }} />
      </head>
      <body className="relative min-h-screen bg-charcoal">
        <ScrollIndicator />
        
        <SmoothScroll>
          {/* Video background - positioned fixed to cover the entire viewport */}
          <div className="fixed inset-0 w-full h-full">
            <Iridescence />
          </div>

          {/* Site content - positioned above video with transparent background */}
          <div className="relative z-10 w-full">
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
