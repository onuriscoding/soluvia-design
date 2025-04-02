"use client";

import { useEffect } from 'react';

export default function GlobalConstraint() {
  useEffect(() => {
    // Apply constraints to body only
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        position: relative !important;
      }
      
      /* Canvas elements can cause overflow */
      canvas {
        max-width: 100vw !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return null;
} 