"use client";

import { useEffect, useState } from "react";

export function DesktopScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    // Only show on desktop
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return !mobile; // Return true if desktop
    };
    
    // Only continue if we're on desktop
    if (!checkDevice()) return;
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percentage = Math.min(100, Math.max(0, (scrollPosition / scrollHeight) * 100));
      
      setScrollPercentage(percentage);
    };
    
    // Initial calculation
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkDevice);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkDevice);
    };
  }, []);
  
  // Don't render anything on mobile
  if (isMobile) return null;
  
  return (
    <div className="desktop-scroll-indicator">
      <div 
        className="desktop-scroll-indicator-progress"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
} 