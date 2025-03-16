"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  gradientText?: boolean
  glowEffect?: boolean
}

export function EnhancedButton({
  children,
  className,
  gradientText = false,
  glowEffect = true,
  ...props
}: EnhancedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/30 blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <Button
        className={cn(
          "relative overflow-hidden",
          gradientText && "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600",
          className,
        )}
        {...props}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  )
}

