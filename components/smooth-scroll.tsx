"use client"

import type React from "react"
import { useEffect, useState } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isIOS, setIsIOS] = useState(false);
  const [storedScrollY, setStoredScrollY] = useState(0);
  
  useEffect(() => {
    // Detect iOS devices
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
    
    // Set initial viewport height for mobile browsers
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Run on mount and resize
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Track scroll position to fix white space only during downward scrolling
    let lastScrollTop = 0;
    let scrollingDown = false;
    let ticking = false;
    let touchInProgress = false;

    // Fix for white space when scrolling down
    const fixWhitespaceOnScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      scrollingDown = currentScroll > lastScrollTop;
      
      if (scrollingDown && !ticking) {
        ticking = true;
        
        requestAnimationFrame(() => {
          // Force body to stay contained 
          document.documentElement.style.overflowX = 'hidden';
          document.body.style.overflowX = 'hidden';
          
          // Stronger fix for mobile browsers
          document.body.style.width = '100%';
          document.body.style.maxWidth = '100%';
          
          // Special fix for iOS momentum scrolling
          if (isIOS || touchInProgress) {
            if (scrollingDown) {
              // Store scroll position
              setStoredScrollY(currentScroll);
              
              // Fix the body in place during downward momentum scrolling
              document.body.style.position = 'fixed';
              document.body.style.top = `-${currentScroll}px`;
              document.body.style.width = '100%';
              document.body.style.height = '100%';
              document.body.style.overflowY = 'auto';
              
              // Set timeout to restore scrolling after a short delay
              setTimeout(() => {
                document.body.style.position = 'relative';
                document.body.style.top = '';
                document.body.style.height = '';
                window.scrollTo(0, storedScrollY);
              }, 300);
            }
          }
          
          ticking = false;
        });
      } else if (!scrollingDown && isIOS && document.body.style.position === 'fixed') {
        // Revert to normal scrolling when going up
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = 'relative';
        document.body.style.top = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollY);
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };
    
    // Touch event handling to catch momentum scrolling
    const handleTouchStart = () => {
      touchInProgress = true;
    };
    
    const handleTouchEnd = () => {
      touchInProgress = false;
      // Apply fix briefly after touch end to catch momentum scrolling
      setTimeout(() => {
        fixWhitespaceOnScroll();
      }, 100);
    };
    
    // Basic fix for mobile
    const fixWhitespace = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    };
    
    // Apply fixes
    fixWhitespace();
    window.addEventListener('resize', fixWhitespace);
    window.addEventListener('scroll', fixWhitespaceOnScroll, { passive: true });
    window.addEventListener('orientationchange', fixWhitespace);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Simple smooth scrolling for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return
      const href = link.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      // Don't interfere with modifier keys or non-left clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

      const targetElement = document.getElementById(href.substring(1))
      if (!targetElement) return

      e.preventDefault()

      // Simple smooth scroll
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('resize', fixWhitespace);
      window.removeEventListener('scroll', fixWhitespaceOnScroll);
      window.removeEventListener('orientationchange', fixWhitespace);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    }
  }, [isIOS])

  // Apply iOS specific wrapper if needed
  return (
    <div className={`smooth-scroll-container w-full overflow-x-hidden ${isIOS ? 'ios-scroll-fix' : ''}`}>
      {children}
    </div>
  )
}

