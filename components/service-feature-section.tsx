"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface ServiceFeature {
  title: string
  description: string
  icon: ReactNode
  features: string[]
  image: string
  gradient: string
}

interface ServiceFeatureSectionProps {
  feature: ServiceFeature
  reversed?: boolean
}

export function ServiceFeatureSection({ feature, reversed = false }: ServiceFeatureSectionProps) {
  const { title, description, icon, features, image, gradient } = feature

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`grid gap-12 md:grid-cols-2 md:items-center ${reversed ? "md:flex-row-reverse" : ""}`}
    >
      <div className={`${reversed ? "md:order-2" : "md:order-1"}`}>
        <motion.div
          className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${gradient} text-ivory`}
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
          {icon}
        </motion.div>
        <motion.h2
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mb-6 text-lg text-ivory/70"
          initial={{ opacity: 0, x: reversed ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>

        <div className="mb-8 space-y-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: reversed ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                whileHover={{
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-rose" />
              </motion.div>
              <span className="text-ivory/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="relative"
        style={{
          perspective: "1000px",
        }}
        initial={{ opacity: 0, scale: 0.9, rotateY: reversed ? -15 : 15 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100,
        }}
        className={`${reversed ? "md:order-1" : "md:order-2"}`}
      >
        <motion.div
          className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${gradient} opacity-70 blur-lg`}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory/10"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1000px)",
          }}
          whileHover={{
            scale: 1.03,
            rotateY: reversed ? -5 : 5,
            rotateX: -5,
            transition: { duration: 0.3 },
          }}
        >
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
            whileHover={{ opacity: 0.3, transition: { duration: 0.3 } }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

