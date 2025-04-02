"use client";

/**
 * Opera-specific fix for scrolling issues
 */
export function initOperaFix() {
  // Only run on client
  if (typeof window === 'undefined') return;
  
  // Detect Opera
  const isOpera = 
    navigator.userAgent.indexOf('OPR') !== -1 || 
    navigator.userAgent.indexOf('Opera') !== -1;
  
  if (!isOpera) return;
  
  // Opera-specific CSS
  const operaStyle = document.createElement('style');
  operaStyle.textContent = `
    /* Opera-specific fix to ensure scrolling works properly */
    html, body {
      position: static !important;
      overflow: auto !important;
      height: auto !important;
      touch-action: auto !important;
    }
    
    /* Ensure Opera can scroll properly */
    .smooth-scroll-container {
      overflow: visible !important;
      height: auto !important;
    }
  `;
  
  document.head.appendChild(operaStyle);

  // Important: Remove any position:fixed or overflow:hidden styles that might be blocking scrolling
  const fixOperaScrolling = () => {
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');
    document.body.style.removeProperty('top');
    document.documentElement.style.removeProperty('overflow');
  };
  
  // Apply fixes
  fixOperaScrolling();
  window.addEventListener('resize', fixOperaScrolling);
  
  return () => {
    window.removeEventListener('resize', fixOperaScrolling);
    if (document.head.contains(operaStyle)) {
      document.head.removeChild(operaStyle);
    }
  };
} 