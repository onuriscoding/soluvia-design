import type React from "react"

interface SectionTransitionProps {
  children: React.ReactNode
  withFadeTop?: boolean
  withFadeBottom?: boolean
  className?: string
}

export function SectionTransition({
  children,
  withFadeTop = false,
  withFadeBottom = false,
  className = "",
}: SectionTransitionProps) {
  return (
    <div className={`relative ${className}`}>
      {withFadeTop && (
        <div className="section-fade-top pointer-events-none absolute top-0 left-0 right-0 z-10 h-32 bg-gradient-to-b from-[#0B0B14] to-transparent opacity-80" />
      )}
      {children}
      {withFadeBottom && (
        <div className="section-fade-bottom pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#0B0B14] to-transparent opacity-80" />
      )}
    </div>
  )
}

