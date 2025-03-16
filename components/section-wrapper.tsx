import type React from "react"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0B14] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0B14] to-transparent pointer-events-none" />
    </section>
  )
}

