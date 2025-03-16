"use client"

export function MinimalBackgroundFix() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0B0B14]">
      {/* This is a simple fixed background that ensures full coverage */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-indigo-900/5 to-purple-900/5" />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
    </div>
  )
}

