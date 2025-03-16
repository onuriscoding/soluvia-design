"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glowEffect?: boolean
}

export function EnhancedCard({ children, className, hoverEffect = true, glowEffect = true }: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hoverEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300",
        isHovered && hoverEffect ? "border-white/20 shadow-lg" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient background that follows mouse position */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(79, 70, 229, 0.15) 0%,
              rgba(79, 70, 229, 0.05) 25%,
              transparent 50%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Glow effect */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "inset 0 0 30px rgba(79, 70, 229, 0.5)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  )
}

