"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  highlightWords?: string[]
}

export function AnimatedText({ text, className = "", once = true, highlightWords = [] }: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  // Split text into words
  const words = text.split(" ")

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-1 inline-block" variants={child}>
          {highlightWords.includes(word) ? (
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.div>
  )
}

