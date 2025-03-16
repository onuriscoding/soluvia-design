"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Zap, BarChart, Globe, Lock } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Creative Design",
    description: "Our designs are crafted to captivate your audience and reflect your brand's unique identity.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "We build with clean, efficient code that ensures your website performs flawlessly.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Speed matters. We optimize every aspect to ensure lightning-fast loading times.",
  },
  {
    icon: BarChart,
    title: "Growth Focused",
    description: "Every design decision is made with your business growth objectives in mind.",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "We implement proven SEO strategies to improve your visibility in search results.",
  },
  {
    icon: Lock,
    title: "Secure Solutions",
    description: "Security is built-in from the ground up, protecting your data and your customers.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
            Why Choose <span className="text-rose">Soluvia Design</span>
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            We combine creativity, technology, and strategy to deliver exceptional results
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-rose/30 hover:shadow-md"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-rose/5 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose/10 text-rose transition-colors duration-300 group-hover:bg-rose group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-charcoal">{feature.title}</h3>
                <p className="text-charcoal/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

