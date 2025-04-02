import type React from "react";
import { Inter, Anton } from "next/font/google";
import { EnhancedNavigationBar } from "@/components/enhanced-navigation-bar";
import { RedesignedFooter } from "@/components/redesigned-footer";
import { PageTransition } from "@/components/page-transition";
import ScrollIndicator from "@/components/scroll-indicator";
import FullPageWrapper from "@/components/full-page-wrapper";
import GlobalConstraint from "@/components/global-constraint";
import Iridescence from "./animations/bg";

import "./globals.css";
import "./mobile-fix.css";

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
        {/* Global constraint to prevent white space */}
        <GlobalConstraint />
        
        <ScrollIndicator />
        
        <FullPageWrapper>
          {/* Background */}
          <div className="fixed inset-0 overflow-hidden">
            <Iridescence />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <EnhancedNavigationBar />
            <PageTransition>
              <main className="overflow-x-hidden">{children}</main>
            </PageTransition>
            <RedesignedFooter />
          </div>
        </FullPageWrapper>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
