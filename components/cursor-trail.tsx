"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorTrailProps {
  color?: string
  size?: number
  trail?: number
}

export function CursorTrail({ color = "rgba(99, 102, 241, 0.6)", size = 8, trail = 8 }: CursorTrailProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail1, setTrail1] = useState({ x: 0, y: 0 })
  const [trail2, setTrail2] = useState({ x: 0, y: 0 })
  const [trail3, setTrail3] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update trail positions with delay
      setTimeout(() => {
        setTrail1({ x: e.clientX, y: e.clientY })
      }, 50)

      setTimeout(() => {
        setTrail2({ x: e.clientX, y: e.clientY })
      }, 100)

      setTimeout(() => {
        setTrail3({ x: e.clientX, y: e.clientY })
      }, 150)

      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="pointer-events-none fixed z-50"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />

          {Array.from({ length: trail }).map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none fixed z-50"
              style={{
                left: trail1.x,
                top: trail1.y,
                width: size - (i * size) / trail,
                height: size - (i * size) / trail,
                borderRadius: "50%",
                backgroundColor: color,
                opacity: 1 - i / trail,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1 - i / trail, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}

