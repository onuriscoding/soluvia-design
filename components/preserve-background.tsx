"use client";

import { useEffect } from 'react';
import { fixIridescence } from '@/app/fix-iridescence';

/**
 * This component ensures that the background appearance doesn't change during scrolling
 */
export default function PreserveBackground() {
  useEffect(() => {
    // Add CSS to preserve the background's appearance 
    const style = document.createElement('style');
    
    style.textContent = `
      /* Ensure background container renders consistently */
      .fixed.inset-0 {
        opacity: 1 !important;
        filter: none !important;
        transform: none !important;
        background: none !important;
        backdrop-filter: none !important;
      }
      
      /* Prevent brightness changes when scrolling */
      .smooth-scroll-container,
      .fixed.inset-0 canvas,
      .fixed.inset-0 * {
        will-change: auto !important;
        backface-visibility: visible !important;
        perspective: none !important;
        transform: none !important;
        filter: none !important;
      }
    `;
    
    document.head.appendChild(style);
    
    // Apply specific fix for Iridescence background
    const iridescenceCleanup = fixIridescence();
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      iridescenceCleanup();
    };
  }, []);
  
  return null;
} 