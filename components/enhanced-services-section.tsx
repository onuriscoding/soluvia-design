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
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "sapphire",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-design",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Powerful online stores that drive sales and provide seamless shopping experiences.",
    color: "rose",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/ecommerce",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    color: "beige",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/seo-optimization",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications and functionality tailored to your specific business needs.",
    color: "sapphire",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-development",
  },
  {
    icon: BarChart,
    title: "Business Growth",
    description:
      "Strategic digital solutions that drive conversions, increase revenue, and help your business reach new heights.",
    color: "beige",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/business-growth",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that extend your digital presence to all devices.",
    color: "rose",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/mobile-apps",
  },
]

export function EnhancedServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl md:text-5xl">
            Our <span className="text-gradient-soluvia">Services</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
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
              className="group relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose/10 to-sapphire/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-60"></div>
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className={`dot-indicator dot-${service.color}`}></span>
                  <span className="text-xs font-medium text-ivory">{service.title}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-ivory">{service.title}</h3>
                <p className="mb-4 text-ivory/70">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-rose transition-colors hover:text-sapphire"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

