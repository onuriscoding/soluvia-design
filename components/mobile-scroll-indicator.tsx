"use client";

import { useEffect, useState, useRef } from "react";

export function MobileScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };
    
    // Only continue if we're on mobile
    if (!checkMobile()) return;
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percentage = Math.min(100, Math.max(0, (scrollPosition / scrollHeight) * 100));
      
      setScrollPercentage(percentage);
      setIsVisible(true);
      
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide after 2 seconds of no scrolling
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };
    
    // Initial calculation
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Don't render anything on desktop
  if (!isMobile) return null;
  
  return (
    <div className={`mobile-scroll-indicator ${isVisible ? 'visible' : ''}`}>
      <div 
        className="mobile-scroll-indicator-progress"
        style={{ height: `${scrollPercentage}%` }}
      />
    </div>
  );
} 