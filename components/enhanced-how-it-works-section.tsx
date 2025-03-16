"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, ArrowDown } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and target audience to create a solid foundation for your project.",
    features: ["In-depth consultation", "Business goals analysis", "Target audience research", "Competitor analysis"],
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our designers create a custom design that aligns with your brand and goals, focusing on user experience and visual appeal.",
    features: ["Custom UI/UX design", "Responsive layouts", "Brand integration", "Interactive prototypes"],
  },
  {
    number: "03",
    title: "Development",
    description:
      "Our development team brings the design to life, building a fully functional website with all the features you need.",
    features: [
      "Clean, efficient code",
      "Performance optimization",
      "SEO best practices",
      "Cross-browser compatibility",
    ],
  },
  {
    number: "04",
    title: "Launch",
    description:
      "After thorough testing, we launch your website and provide training so you can manage your site with confidence.",
    features: ["Quality assurance testing", "Content migration", "Search engine submission", "Analytics setup"],
  },
]

export function EnhancedHowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl md:text-5xl">
            How It <span className="text-gradient-soluvia">Works</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Our streamlined process ensures a smooth experience from start to finish
          </p>
        </motion.div>

        <div className="mt-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="grid gap-8 md:grid-cols-[1fr,3fr] items-start">
                {/* Step number and connector */}
                <div className="flex flex-col items-center md:items-end">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose to-sapphire text-3xl font-bold text-ivory shadow-lg shadow-rose/20">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden h-full w-0.5 bg-gradient-to-b from-rose/50 to-sapphire/50 md:block"></div>
                  )}
                </div>

                {/* Step content */}
                <div className="relative mb-16 rounded-2xl bg-charcoal/50 p-8 backdrop-blur-sm border border-ivory/10 shadow-lg">
                  <h3 className="mb-3 text-2xl font-bold text-ivory">{step.title}</h3>
                  <p className="mb-6 text-ivory/70">{step.description}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-rose" />
                        <span className="text-ivory/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="flex justify-center md:hidden">
                  <ArrowDown className="h-8 w-8 text-rose/50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

