"use client";

import { useEffect } from 'react';

export default function GlobalConstraint() {
  useEffect(() => {
    // Apply constraints to all elements to prevent white space
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        max-width: 100vw;
        box-sizing: border-box;
      }
      
      html, body {
        overflow-x: clip !important;
        width: 100% !important;
        max-width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        position: relative !important;
      }
      
      /* Force all fixed/absolute elements to stay contained */
      .fixed, [style*="position:fixed"], [style*="position: fixed"],
      .absolute, [style*="position:absolute"], [style*="position: absolute"] {
        max-width: 100vw !important;
        overflow: clip !important;
      }
      
      /* Canvas elements can cause overflow */
      canvas {
        max-width: 100vw !important;
        overflow: clip !important;
      }
    `;
    document.head.appendChild(style);
    
    // Apply a constraint container around the body content
    const constraintDiv = document.createElement('div');
    constraintDiv.style.width = '100%';
    constraintDiv.style.maxWidth = '100vw';
    constraintDiv.style.overflow = 'clip';
    constraintDiv.style.position = 'relative';
    
    // Move body children into constraint div
    while (document.body.firstChild) {
      constraintDiv.appendChild(document.body.firstChild);
    }
    
    document.body.appendChild(constraintDiv);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  return null;
} 