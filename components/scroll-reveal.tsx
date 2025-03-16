"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 }
      case "down":
        return { opacity: 0, y: -50 }
      case "left":
        return { opacity: 0, x: 50 }
      case "right":
        return { opacity: 0, x: -50 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={isInView ? getFinalPosition() : getInitialPosition()}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

