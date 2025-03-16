"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Lightbulb, Users, Target, Zap, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about what we do and bring enthusiasm to every project we undertake.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly explore new ideas and technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and partnership with our clients.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from design to implementation to client service.",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description:
      "We value efficiency and effectiveness, delivering solutions that maximize results with minimal waste.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "We operate with honesty, transparency, and ethical standards in all our interactions.",
  },
]

export function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Core Values</h2>
          <p className="mt-4 text-lg text-muted-foreground">The principles that guide everything we do</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <value.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

