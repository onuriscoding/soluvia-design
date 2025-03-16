"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function UnifiedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  // Transform scroll progress into gradient position
  const gradientPosition = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-[#0B0B14]" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.03), transparent 60%),
                      radial-gradient(circle at ${100 - mousePosition.x * 100}% ${100 - mousePosition.y * 100}%, rgba(99, 102, 241, 0.03), transparent 60%)`,
          transform: `translateY(${gradientPosition}px)`,
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
    </div>
  )
}

