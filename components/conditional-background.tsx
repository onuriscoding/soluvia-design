"use client";

import { useEffect, useState } from "react";
import Iridescence from "@/app/animations/bg";

export function ConditionalBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render anything until client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  // For mobile, render a static charcoal background
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          background:
            "linear-gradient(135deg,rgb(85, 57, 55) 0%, #a86d6d 40%,rgb(198, 143, 130) 70%, #7e5a4d 100%)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      />
    );
  }

  // For desktop, render the animated background
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Iridescence />
    </div>
  );
}
