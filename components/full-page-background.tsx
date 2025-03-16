"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FullPageBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position as percentage of window
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      // Smooth the movement
      setMousePosition((prev) => ({
        x: prev.x + (x - prev.x) * 0.05,
        y: prev.y + (y - prev.y) * 0.05,
      }))
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#0B0B14]" />

      {/* Primary gradient that follows mouse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0.05) 25%, transparent 50%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Secondary gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 25%, transparent 50%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"
        style={{ backgroundRepeat: "repeat" }}
      />
    </div>
  )
}

