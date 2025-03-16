"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Create springs for smoother movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Only add cursor effect on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (!isMobile) {
      window.addEventListener("mousemove", moveCursor)
      window.addEventListener("mouseenter", handleMouseEnter)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px").matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border border-rose/30 bg-transparent"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
    </motion.div>
  )
}

