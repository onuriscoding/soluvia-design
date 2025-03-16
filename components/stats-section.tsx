"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 150, label: "Projects Completed", suffix: "+" },
  { value: 98, label: "Satisfied Clients", suffix: "%" },
  { value: 12, label: "Years Experience", suffix: "" },
  { value: 25, label: "Team Members", suffix: "" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000 // 2 seconds
      const increment = Math.ceil(value / (duration / 16)) // 60fps

      const timer = setInterval(() => {
        start += increment
        if (start > value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={nodeRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="bg-charcoal py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Our Impact <span className="text-rose">By Numbers</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">We're proud of what we've accomplished for our clients</p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <p className="text-4xl font-bold text-white md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-white/70">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

