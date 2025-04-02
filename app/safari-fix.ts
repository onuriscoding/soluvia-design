"use client";

/**
 * Safari-specific fix for white space during downward scrolling
 */
export function initSafariFix() {
  // Only run on client
  if (typeof window === 'undefined') return;
  
  // Detect Safari - crucial as this fix is Safari-specific
  const isSafari = 
    navigator.userAgent.indexOf('Safari') !== -1 && 
    navigator.userAgent.indexOf('Chrome') === -1;
  
  if (!isSafari) return;
  
  // Safari-specific CSS - only applied to Safari browsers
  const safariStyle = document.createElement('style');
  safariStyle.textContent = `
    /* Safari-specific overflow fix */
    html, body {
      overflow-x: hidden !important;
      width: 100% !important;
      position: relative !important;
    }
    
    /* Fix Safari's tendency to show white space on momentum scroll */
    .fixed.inset-0 {
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  `;
  
  document.head.appendChild(safariStyle);
  
  // Safari-specific scroll event handling
  let lastScrollTop = 0;
  
  const handleScroll = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Detect downward scrolling - where white space typically appears
    if (currentScroll > lastScrollTop) {
      document.documentElement.style.overflowX = 'hidden';
      // No need to restore - just keep it hidden
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  };
  
  // Use passive true for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (document.head.contains(safariStyle)) {
      document.head.removeChild(safariStyle);
    }
  };
} 