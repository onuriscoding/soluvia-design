"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Palette, Globe, ShoppingCart, Code, BarChart, Smartphone } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Beautiful, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "blue",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-design",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Powerful online stores that drive sales and provide seamless shopping experiences.",
    color: "pink",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/ecommerce",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    color: "green",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/seo-optimization",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications and functionality tailored to your specific business needs.",
    color: "purple",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-development",
  },
  {
    icon: BarChart,
    title: "Business Growth",
    description:
      "Strategic digital solutions that drive conversions, increase revenue, and help your business reach new heights.",
    color: "yellow",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/business-growth",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that extend your digital presence to all devices.",
    color: "orange",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/mobile-apps",
  },
]

export function ServicesSection() {
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
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            We offer a comprehensive range of services to help your business thrive in the digital landscape
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-secondary p-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-md">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className={`dot-indicator dot-${service.color}`}></span>
                  <span className="text-xs font-medium text-white">{service.title}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="mb-4 text-white/70">{service.description}</p>
                <Link href={service.link} className="inline-flex items-center text-primary hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

