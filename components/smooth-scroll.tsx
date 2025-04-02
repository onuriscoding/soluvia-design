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
    
    // Only fix horizontal overflow, don't touch vertical scroll
    const fixWhitespace = () => {
      // Only fix overflow-x but don't touch overflow-y to ensure scroll detection works
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      
      // Reset any properties that might interfere with scroll detection
      document.documentElement.style.position = '';
      document.body.style.position = 'relative';
      
      // Fix for iOS Safari and other mobile browsers
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Ensure body takes up full height but scrolls normally
        document.body.style.minHeight = '100vh';
        document.body.style.height = 'auto';
        
        // Force repaint to ensure scroll works properly
        setTimeout(() => {
          window.scrollTo(0, window.scrollY + 1);
          window.scrollTo(0, window.scrollY - 1);
        }, 0);
      }
    };
    
    fixWhitespace();
    window.addEventListener('resize', fixWhitespace);

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
    }
  }, [])

  return <div className="smooth-scroll-container overflow-x-hidden">{children}</div>
}

