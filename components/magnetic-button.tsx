"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: React.ElementType
  href?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  strength = 30,
  radius = 200,
  as = "button",
  href,
  onClick,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const Component = as

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Calculate distance from center (Pythagorean theorem)
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // If cursor is within the magnetic radius
    if (distance < radius) {
      // Calculate magnetic pull (stronger when closer to center)
      const pull = 1 - distance / radius

      setPosition({
        x: distanceX * pull * (strength / 10),
        y: distanceY * pull * (strength / 10),
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Reset position when component unmounts
  useEffect(() => {
    return () => resetPosition()
  }, [])

  const componentProps = {
    className: cn("relative", className),
    onMouseMove: handleMouseMove,
    onMouseLeave: resetPosition,
    onMouseEnter: () => setIsHovered(true),
    ref: buttonRef,
    ...(as === "a" ? { href } : {}),
    onClick,
    ...props,
  }

  return (
    <Component {...componentProps}>
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {children}
      </motion.div>
    </Component>
  )
}

