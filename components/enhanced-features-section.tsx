"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Zap, BarChart, Globe, Lock, Smartphone, Layers } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Sophisticated Design",
    description:
      "Our designs are meticulously crafted to captivate your audience and reflect your brand's unique identity.",
    gradient: "from-rose to-sapphire",
  },
  {
    icon: Code,
    title: "Clean Code",
    description:
      "We build with clean, efficient code that ensures your website performs flawlessly across all devices.",
    gradient: "from-sapphire to-rose",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Speed matters. We optimize every aspect to ensure lightning-fast loading times for a seamless user experience.",
    gradient: "from-rose to-sapphire",
  },
  {
    icon: BarChart,
    title: "Growth Focused",
    description:
      "Every design decision is made with your business growth objectives in mind, driving measurable results.",
    gradient: "from-sapphire to-rose",
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description:
      "We implement proven SEO strategies to improve your visibility in search results and attract qualified leads.",
    gradient: "from-rose to-sapphire",
  },
  {
    icon: Lock,
    title: "Secure Solutions",
    description:
      "Security is built-in from the ground up, protecting your data and your customers with the latest protocols.",
    gradient: "from-sapphire to-rose",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "All our websites are fully responsive and optimized for all devices and screen sizes, ensuring a perfect experience.",
    gradient: "from-rose to-sapphire",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "We build websites that can grow with your business, adapting to your changing needs and future requirements.",
    gradient: "from-sapphire to-rose",
  },
]

export function EnhancedFeaturesSection() {
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
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose <span className="text-gradient-soluvia">Soluvia Design</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            We combine sophistication, innovation, and strategy to deliver exceptional results
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-ivory/20 hover:shadow-lg hover:shadow-rose/5"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose/10 to-sapphire/10 transition-transform duration-500 group-hover:scale-150"></div>

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-rose/20 to-sapphire/20 text-ivory transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-rose group-hover:to-sapphire">
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-ivory">{feature.title}</h3>
                <p className="text-ivory/70">{feature.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-rose to-sapphire transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

