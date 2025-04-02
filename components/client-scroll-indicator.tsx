"use client";

import dynamic from "next/dynamic";

// Import the ScrollIndicator with ssr:false inside a client component
const ScrollIndicator = dynamic(() => import("./scroll-indicator").then(mod => mod.ScrollIndicator), {
  ssr: false
});

export function ClientScrollIndicator() {
  return <ScrollIndicator />;
} 