"use client"

import type React from "react"
import { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    // Fix for white space when scrolling down
    const fixWhitespaceOnScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      scrollingDown = currentScroll > lastScrollTop;
      
      if (scrollingDown && !ticking) {
        ticking = true;
        
        window.requestAnimationFrame(() => {
          // Very minimal fix that won't affect the background
          document.documentElement.style.overflowX = 'hidden';
          document.body.style.overflowX = 'hidden';
          
          ticking = false;
        });
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
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
    }
  }, [])

  return <div className="smooth-scroll-container w-full overflow-x-hidden">{children}</div>
}

