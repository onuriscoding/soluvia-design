"use client";

import { useEffect } from 'react';

export default function ViewportFix() {
  useEffect(() => {
    // More aggressive fix for mobile viewport issues and white space
    const fixViewport = () => {
      // Set viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Force overflow control - stricter approach
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
      
      // Constrain width with !important
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        html, body {
          overflow-x: hidden !important;
          width: 100% !important;
          max-width: 100vw !important;
          margin: 0 !important;
          padding: 0 !important;
          position: relative !important;
        }
        #__next, main, .smooth-scroll-container {
          overflow-x: hidden !important;
          width: 100% !important;
          max-width: 100vw !important;
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Run on mount and on all potential triggers
    fixViewport();
    window.addEventListener('resize', fixViewport);
    window.addEventListener('orientationchange', fixViewport);
    window.addEventListener('scroll', fixViewport);
    
    // Also set a timeout to ensure it runs after all content loads
    const timeoutId = setTimeout(fixViewport, 500);
    
    return () => {
      window.removeEventListener('resize', fixViewport);
      window.removeEventListener('orientationchange', fixViewport);
      window.removeEventListener('scroll', fixViewport);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return null;
} 