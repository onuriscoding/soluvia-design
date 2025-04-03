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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <style>{`
          /* Base styles for all browsers */
          html, body {
            overflow-x: hidden;
            width: 100%;
            position: relative;
          }
          
          /* Safari iOS fix - extremely aggressive */
          @supports (-webkit-touch-callout: none) {
            html {
              position: relative !important;
              width: 100vw !important;
              overflow-x: hidden !important;
            }
            
            body {
              width: 100vw !important;
              position: relative !important;
              overflow-x: hidden !important;
              margin: 0 !important;
              left: 0 !important;
              right: 0 !important;
            }
            
            /* Hide horizontal scrollbar on Safari */
            ::-webkit-scrollbar {
              display: none !important;
            }
            
            /* Force all containers to stay within viewport */
            div, main, section, nav, header, footer {
              max-width: 100vw !important;
              overflow-x: hidden !important;
            }
            
            /* Fix for fixed background */
            .fixed.inset-0 {
              width: 100vw !important;
              left: 0 !important;
              right: 0 !important;
            }
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // iOS Safari detection and super aggressive fix
            (function() {
              var ua = window.navigator.userAgent;
              var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
              var webkit = !!ua.match(/WebKit/i);
              var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
              
              if (iOSSafari) {
                // Apply viewport width to ROOT container
                document.documentElement.style.width = window.innerWidth + 'px';
                
                // Lock body width
                document.body.style.width = window.innerWidth + 'px';
                document.body.style.overflowX = 'hidden';
                
                // Apply to ALL direct children of body to ensure no overflow
                var bodyChildren = document.body.children;
                for (var i = 0; i < bodyChildren.length; i++) {
                  bodyChildren[i].style.maxWidth = window.innerWidth + 'px';
                  bodyChildren[i].style.overflowX = 'hidden';
                }
                
                // Apply additional constraints during scroll
                var lastScrollTop = 0;
                window.addEventListener('scroll', function() {
                  document.documentElement.style.width = window.innerWidth + 'px';
                  document.body.style.width = window.innerWidth + 'px';
                  document.body.style.overflowX = 'hidden';
                  
                  var st = window.pageYOffset || document.documentElement.scrollTop;
                  if (st > lastScrollTop) {
                    // Scrolling DOWN - brief overflow lock
                    document.documentElement.style.overflowX = 'hidden';
                  }
                  lastScrollTop = (st <= 0) ? 0 : st;
                }, {passive: true});
                
                // Handle resize
                window.addEventListener('resize', function() {
                  document.documentElement.style.width = window.innerWidth + 'px';
                  document.body.style.width = window.innerWidth + 'px';
                }, {passive: true});
                
                // Handle orientation change
                window.addEventListener('orientationchange', function() {
                  document.documentElement.style.width = window.innerWidth + 'px';
                  document.body.style.width = window.innerWidth + 'px';
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
