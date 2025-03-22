"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface Benefit {
  title: string
  description: string
  icon: ReactNode
  gradient: string
}

interface ServiceBenefitsSectionProps {
  title: string
  subtitle: string
  benefits: Benefit[]
}

export function ServiceBenefitsSection({ title, subtitle, benefits }: ServiceBenefitsSectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-ivory/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-ivory/10 bg-charcoal/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-ivory/20 hover:shadow-lg hover:shadow-rose/5"
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose/10 to-sapphire/10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                style={{
                  transformOrigin: "center",
                }}
              />

              <div className="relative">
                <motion.div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${benefit.gradient}`}
                  animate={{
                    y: [0, -10, 0],
                    transition: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  {benefit.icon}
                </motion.div>
                <motion.h3
                  className="mb-2 text-xl font-bold text-ivory"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                >
                  {benefit.title}
                </motion.h3>
                <motion.p
                  className="text-ivory/70"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  {benefit.description}
                </motion.p>
              </div>

              <motion.div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${benefit.gradient}`}
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

