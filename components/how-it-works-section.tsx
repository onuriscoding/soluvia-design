"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and target audience to create a solid foundation for your project.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our designers create a custom design that aligns with your brand and goals, focusing on user experience and visual appeal.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Our development team brings the design to life, building a fully functional website with all the features you need.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "After thorough testing, we launch your website and provide training so you can manage your site with confidence.",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Our streamlined process ensures a smooth experience from start to finish
          </p>
        </motion.div>

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-muted md:left-[120px] md:translate-x-0"></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-16">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                    {step.number}
                  </div>

                  <div className="mt-6 text-center md:mt-0 md:text-left">
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-white/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

