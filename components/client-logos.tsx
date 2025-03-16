"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

const clients = [
  { name: "Acme Inc", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Globex", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Soylent Corp", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Initech", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Umbrella Corp", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Stark Industries", logo: "/placeholder.svg?height=80&width=200" },
]

export function ClientLogos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Trusted by <span className="text-gradient-soluvia">Industry Leaders</span>
          </h2>
          <p className="mt-4 text-ivory/70">We've had the privilege of working with these amazing companies</p>
        </motion.div>

        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-charcoal to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-charcoal to-transparent z-10"></div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-16 w-32 md:w-40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image src={client.logo || "/placeholder.svg"} alt={client.name} fill className="object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

