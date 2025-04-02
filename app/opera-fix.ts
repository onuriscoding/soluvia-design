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
      overflow-y: auto !important;
      height: auto !important;
    }
  `;
  
  document.head.appendChild(operaStyle);

  // Minimal fix for Opera - just remove overflow constraints
  const fixOperaScrolling = () => {
    document.documentElement.style.removeProperty('overflow');
    document.body.style.removeProperty('overflow');
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