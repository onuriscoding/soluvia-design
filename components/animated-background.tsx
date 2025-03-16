"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full viewport size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial resize
    resizeCanvas()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    // Animation loop
    const animate = () => {
      // Create a sophisticated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(43, 45, 66, 1)") // Charcoal
      gradient.addColorStop(0.3, "rgba(40, 42, 60, 1)") // Slightly darker charcoal
      gradient.addColorStop(0.7, "rgba(38, 40, 58, 1)") // Even darker charcoal
      gradient.addColorStop(1, "rgba(43, 45, 66, 1)") // Back to charcoal

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient overlays for depth
      const createGradientOverlay = (x, y, radius, color1, color2, opacity) => {
        const overlay = ctx.createRadialGradient(x, y, 0, x, y, radius)
        overlay.addColorStop(0, color1)
        overlay.addColorStop(1, color2)

        ctx.globalAlpha = opacity
        ctx.fillStyle = overlay
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Top left rose gold glow
      createGradientOverlay(
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4,
        "rgba(183, 110, 121, 0.08)",
        "rgba(43, 45, 66, 0)",
        0.8,
      )

      // Bottom right sapphire glow
      createGradientOverlay(
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.4,
        "rgba(61, 90, 128, 0.08)",
        "rgba(43, 45, 66, 0)",
        0.8,
      )

      // Center beige subtle glow
      createGradientOverlay(
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.3,
        "rgba(224, 213, 192, 0.03)",
        "rgba(43, 45, 66, 0)",
        0.5,
      )

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen bg-charcoal"
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -10 }}
    />
  )
}

