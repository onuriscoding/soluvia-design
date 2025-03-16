"use client"

import type React from "react"
import { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return <>{children}</>
}

