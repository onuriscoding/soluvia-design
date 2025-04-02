// This script executes immediately to prevent white space on mobile
(function() {
  // Execute immediately
  function fix() {
    // Prevent horizontal scroll
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.width = '100vw';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100vw';
    document.body.style.maxWidth = '100vw';
    document.body.style.overscrollBehavior = 'none';
    
    // Additional fix for iOS
    document.documentElement.style.height = 'calc(100vh)';
    document.body.style.height = 'calc(100vh)';
    
    // Force position
    document.body.style.position = 'relative';
  }
  
  // Apply immediately
  fix();
  
  // Apply on window events
  window.addEventListener('resize', fix);
  window.addEventListener('orientationchange', fix);
  window.addEventListener('load', fix);
})(); 