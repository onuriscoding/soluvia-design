"use client";

import { useEffect, useState, useRef } from "react";

export function FixedScrollIndicator() {
  // Only run this on the client side
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(100, (window.scrollY / scrollHeight) * 100));
      
      setScrollPercent(scrolled);
      setVisible(true);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, 2000);
    };

    // Initial update
    updateScroll();
    
    // Add scroll listener
    window.addEventListener("scroll", updateScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Desktop horizontal indicator (bottom)
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      zIndex: 99999,
      pointerEvents: 'none',
      opacity: visible ? 0.5 : 0,
      transition: 'opacity 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${scrollPercent}%`,
        backgroundColor: '#21222c',
        transition: 'width 0.1s ease'
      }} />
    </div>
  );
} 