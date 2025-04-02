"use client";

import { useEffect, useState, useRef } from "react";

export function ScrollIndicator() {
  const [mounted, setMounted] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Only run after component mounts on client
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const percentage = Math.min(100, Math.max(0, (scrollPosition / scrollHeight) * 100));
      
      setScrollPercentage(percentage);
      setIsVisible(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Don't render anything during SSR
  if (!mounted) return null;
  
  return (
    <>
      {/* Vertical indicator (right side) */}
      <div className={`scroll-indicator-vertical ${isVisible ? 'visible' : ''}`}>
        <div 
          className="scroll-indicator-progress"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>
      
      {/* Horizontal indicator (bottom) */}
      <div className={`scroll-indicator-horizontal ${isVisible ? 'visible' : ''}`}>
        <div 
          className="scroll-indicator-progress"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>
    </>
  );
} 