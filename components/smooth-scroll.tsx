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

    // Apply Safari-specific fixes
    const applyIOSSafariFixes = () => {
      // Detect iOS Safari
      const ua = window.navigator.userAgent;
      const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      const webkit = !!ua.match(/WebKit/i);
      const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/FxiOS/i);
      
      if (iOSSafari) {
        // Apply fixes specific to iOS Safari
        document.documentElement.classList.add('ios-safari');
        document.body.setAttribute('style', '-webkit-overflow-scrolling: touch');
        
        // Prevent momentum scrolling from causing white space
        document.addEventListener('touchmove', (e) => {
          if (e.touches.length > 1) {
            e.preventDefault(); // Prevent pinch zoom
          }
        }, { passive: false });
        
        // Fix for "rubber-banding" effect
        document.addEventListener('scroll', () => {
          if (window.scrollY <= 0) {
            document.body.style.transform = 'translateY(1px)';
            setTimeout(() => {
              document.body.style.transform = '';
            }, 300);
          }
        });
      }
    };
    
    applyIOSSafariFixes();

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

      // Enhanced smooth scroll with better Safari support
      const headerOffset = 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
      window.removeEventListener('resize', setViewportHeight);
    }
  }, [])

  return <div className="smooth-scroll-container">{children}</div>
}

