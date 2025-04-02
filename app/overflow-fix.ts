"use client"

/**
 * Safari/Mobile white space fix and Opera scrolling fix
 * 
 * This is a lightweight fix that:
 * 1. Uses a CSS-only approach to prevent white space
 * 2. Avoids manipulating position:fixed which breaks scrolling in Opera
 * 3. Works by forcing the viewport to respect container boundaries
 */

export function setupOverflowFix() {
  // Add CSS rule to html element
  if (typeof document !== 'undefined') {
    // Create style element
    const style = document.createElement('style');
    
    // Add CSS rules that work universally
    style.textContent = `
      html, body {
        width: 100%;
        overflow-x: hidden;
        max-width: 100vw;
        position: relative;
      }
      
      /* High specificity to enforce the rule */
      html[lang], body {
        overflow-x: hidden !important;
        max-width: 100vw !important;
        width: 100% !important;
      }
      
      /* Ensure container stays within viewport */
      .smooth-scroll-container {
        width: 100%;
        max-width: 100vw; 
        overflow-x: hidden;
      }
      
      /* Fix for background container */
      .fixed.inset-0 {
        width: 100%;
        max-width: 100vw;
        left: 0;
        right: 0;
      }
      
      /* Mobile-specific fixes */
      @media (max-width: 768px) {
        html, body {
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    
    // Append to head
    document.head.appendChild(style);
    
    return () => {
      // Clean up
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }
  
  return () => {};
} 