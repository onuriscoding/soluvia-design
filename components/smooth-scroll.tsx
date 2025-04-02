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
    
    // Fix the white space issue aggressively
    const fixWhiteSpace = () => {
      // Fix html and body
      document.documentElement.style.width = '100%';
      document.documentElement.style.maxWidth = '100%';
      document.documentElement.style.overflowX = 'hidden';
      
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100vw';
      document.body.style.overflowX = 'hidden';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      
      // Fix for mobile
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Check if there's white space
        const isOverflowing = document.body.offsetWidth > window.innerWidth;
        if (isOverflowing) {
          document.body.style.width = window.innerWidth + 'px';
          document.documentElement.style.width = window.innerWidth + 'px';
        }
      }
    };
    
    // Apply fix immediately and on resize
    fixWhiteSpace();
    window.addEventListener('resize', fixWhiteSpace);
    
    // Use MutationObserver to catch any dynamically added content that might cause overflow
    const observer = new MutationObserver(() => {
      fixWhiteSpace();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

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
      window.removeEventListener('resize', fixWhiteSpace);
      observer.disconnect();
    }
  }, [])

  return <div className="smooth-scroll-container overflow-x-hidden w-full">{children}</div>
}

