"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { CheckCircle, ArrowRight, Palette, Code, ShoppingCart, Search, BarChart, Smartphone } from "lucide-react"

type Service = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  image: string
  link: string
}

const services: Service[] = [
  {
    id: "web-design",
    icon: <Palette className="h-6 w-6" />,
    title: "Web Design",
    description:
      "We create stunning, responsive websites that captivate your audience and reflect your brand's unique identity. Our design process focuses on user experience, visual appeal, and conversion optimization.",
    features: [
      "Custom website design",
      "Responsive design for all devices",
      "User experience (UX) optimization",
      "Visual identity integration",
      "Conversion-focused layouts",
      "Interactive prototyping",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-design",
  },
  {
    id: "web-development",
    icon: <Code className="h-6 w-6" />,
    title: "Web Development",
    description:
      "Our development team brings designs to life with clean, efficient code that ensures your website performs flawlessly across all devices and browsers. We focus on performance, security, and scalability.",
    features: [
      "Front-end development",
      "Back-end development",
      "Content management systems",
      "E-commerce functionality",
      "Performance optimization",
      "Security implementation",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-development",
  },
  {
    id: "e-commerce",
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "E-commerce",
    description:
      "We develop sophisticated online stores that drive sales and provide seamless shopping experiences. Our e-commerce solutions include inventory management, secure payment processing, and customer account features.",
    features: [
      "Custom e-commerce design",
      "Product catalog management",
      "Secure payment processing",
      "Inventory management",
      "Customer account creation",
      "Order tracking and history",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/e-commerce",
  },
  {
    id: "seo",
    icon: <Search className="h-6 w-6" />,
    title: "SEO Optimization",
    description:
      "Improve your search engine visibility and drive organic traffic with our comprehensive SEO strategies. We focus on technical SEO, content optimization, and link building to improve your rankings.",
    features: [
      "Keyword research and analysis",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Content strategy for SEO",
      "Link building campaigns",
      "Performance tracking and reporting",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/seo-optimization",
  },
  {
    id: "business-growth",
    icon: <BarChart className="h-6 w-6" />,
    title: "Business Growth",
    description:
      "Strategic digital solutions that drive conversions, increase revenue, and help your business reach new heights. We develop comprehensive strategies tailored to your specific goals and target audience.",
    features: [
      "Digital strategy development",
      "Conversion rate optimization",
      "Email marketing campaigns",
      "Social media management",
      "Content marketing strategies",
      "Analytics and performance tracking",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/business-growth",
  },
  {
    id: "mobile-apps",
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that extend your digital presence to all devices. Our mobile app development focuses on intuitive interfaces, performance, and seamless integration with your existing systems.",
    features: [
      "iOS and Android development",
      "Cross-platform solutions",
      "UI/UX design for mobile",
      "App store optimization",
      "Performance optimization",
      "Ongoing maintenance and updates",
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/mobile-apps",
  },
]

export function ServicesDetail() {
  const [activeService, setActiveService] = useState(services[0].id)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const currentService = services.find((service) => service.id === activeService) || services[0]

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our <span className="text-gradient-soluvia">Services</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">Comprehensive digital solutions tailored to your business needs</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeService === service.id
                  ? "bg-gradient-to-r from-rose to-sapphire text-ivory"
                  : "bg-charcoal/50 text-ivory/70 hover:text-ivory hover:bg-charcoal/70 border border-ivory/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: services.findIndex((s) => s.id === service.id) * 0.1 }}
            >
              {service.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose mr-4">
                  {currentService.icon}
                </div>
                <h3 className="text-2xl font-bold text-ivory">{currentService.title}</h3>
              </div>

              <p className="text-ivory/70 mb-6">{currentService.description}</p>

              <div className="mb-8">
                <h4 className="text-lg font-medium text-ivory mb-4">Key Features:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-rose mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-ivory/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={currentService.link}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-medium hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-70 blur-sm"></div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={currentService.image || "/placeholder.svg"}
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

