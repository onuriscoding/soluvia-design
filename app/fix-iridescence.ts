"use client";

/**
 * Fix specifically for the Iridescence background to prevent brightness/appearance changes
 */
export function fixIridescence() {
  if (typeof document === 'undefined') return () => {};

  // Find and apply fixes to the canvas element when it appears
  const observer = new MutationObserver((mutations) => {
    // Look for added canvas elements in the background
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'CANVAS') {
            // Found canvas, apply specific fix
            const canvas = node as HTMLCanvasElement;
            
            // Preserve rendering options
            canvas.style.imageRendering = 'auto';
            canvas.style.opacity = '1';
            
            // Prevent brightness changes
            const container = canvas.parentElement;
            if (container) {
              container.style.filter = 'none';
              container.style.transform = 'none';
              container.style.backfaceVisibility = 'visible';
              container.style.perspective = 'none';
            }
          }
        });
      }
    }
  });
  
  // Start observing the document with configured parameters
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  return () => {
    observer.disconnect();
  };
} 