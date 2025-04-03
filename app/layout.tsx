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
                
                // More effective solution that doesn't break animations
                var preventBounce = function(e) {
                  // Prevent only if at the boundary
                  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  var isAtTop = scrollTop <= 0;
                  var isAtBottom = (window.innerHeight + scrollTop) >= document.body.offsetHeight;
                  
                  if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                    e.preventDefault();
                  }
                };
                
                // Add the event listener with passive: false to allow preventDefault
                window.addEventListener('wheel', preventBounce, { passive: false });
                window.addEventListener('touchmove', function(e) {
                  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  var isAtBottom = (window.innerHeight + scrollTop) >= document.body.offsetHeight - 5;
                  
                  if (isAtBottom) {
                    // Add a tiny bit of padding at the bottom when at the end
                    document.body.style.paddingBottom = '1px';
                    setTimeout(function() {
                      document.body.style.paddingBottom = '0px';
                    }, 300);
                  }
                }, { passive: true });
              }
            })();
          `
        }} />
      </head>
      <body className="relative min-h-screen">
        <ScrollIndicator />
        
        <SmoothScroll>
          {/* Video background - positioned fixed to cover the entire viewport */}
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
