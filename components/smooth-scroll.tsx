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
    
    // Fix white space without breaking scroll detection
    const fixWhitespace = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
      
      // Clean up any hard-set widths that might interfere with layout
      document.body.style.width = '';
      document.body.style.maxWidth = '';
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

  return <div className="smooth-scroll-container">{children}</div>
}

