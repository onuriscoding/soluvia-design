"use client"

/**
 * Minimal white space fix that won't impact background appearance
 */
export function setupOverflowFix() {
  // Add CSS rule to html element
  if (typeof document !== 'undefined') {
    // Create style element
    const style = document.createElement('style');
    
    // Add minimal CSS rules that work without affecting appearance
    style.textContent = `
      html, body {
        overflow-x: hidden;
        max-width: 100vw;
      }
      
      /* Ensure container stays within viewport */
      .smooth-scroll-container {
        overflow-x: hidden;
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