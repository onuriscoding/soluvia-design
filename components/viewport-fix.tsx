"use client";

import { useEffect } from 'react';

export default function ViewportFix() {
  useEffect(() => {
    // Fix for mobile viewport issues and white space
    const fixViewport = () => {
      // Set viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Force overflow hidden on mobile
      document.documentElement.style.overflow = 'hidden auto';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflow = 'hidden auto';
      document.body.style.overflowX = 'hidden';
      
      // Constrain width
      document.documentElement.style.width = '100%';
      document.documentElement.style.maxWidth = '100vw';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      
      // Disable body margin
      document.body.style.margin = '0';
      
      // Force position
      document.body.style.position = 'relative';
    };
    
    // Run on mount and resize
    fixViewport();
    window.addEventListener('resize', fixViewport);
    window.addEventListener('orientationchange', fixViewport);
    
    return () => {
      window.removeEventListener('resize', fixViewport);
      window.removeEventListener('orientationchange', fixViewport);
    };
  }, []);
  
  return null; // This component doesn't render anything
} 