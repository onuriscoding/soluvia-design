"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Palette, Search, Bot } from "lucide-react"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { RedesignedPricingSection } from "@/components/redesigned-pricing-section"
import { RedesignedContactSection } from "@/components/redesigned-contact-section"
import { ClientOnly } from "@/components/client-only"
import ShinyText from "../animations/ShinyText.js"

export default function ServicesPage() {
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef(null)
  const { ref: heroInViewRef, inView: heroInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  useEffect(() => {
    setIsMounted(true)
    if (heroRef.current) {
      heroInViewRef(heroRef.current)
    }
  }, [heroInViewRef])

  // For floating animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  // Service data
  const services = [
    {
      id: "web-design",
      title: "Web Design & Development",
      description: "Create stunning, responsive websites that captivate your audience.",
      icon: <Palette className="h-5 w-5" />,
      color: "text-rose",
      buttonGradient: "from-rose to-sapphire",
      link: "/services/web-design-development",
    },
    {
      id: "seo-optimization",
      title: "SEO Optimization",
      description: "Improve visibility and rankings in search engine results.",
      icon: <Search className="h-5 w-5" />,
      color: "text-sapphire",
      buttonGradient: "from-sapphire to-beige",
      link: "/services/seo-optimization",
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      description: "Automate processes and enhance customer experiences with AI.",
      icon: <Bot className="h-5 w-5" />,
      color: "text-beige",
      buttonGradient: "from-beige to-rose",
      link: "/services/ai-automation",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 md:py-40 overflow-hidden">
        <div className="container relative z-10">
          <ClientOnly>
            <motion.div
              className="mx-auto max-w-5xl text-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-7xl font-bold tracking-tight sm:text-5xl md:text-8xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{
                  textShadow: "0 0 40px rgba(0,0,0,0.1)",
                }}
              >
                Our{" "}
                <ShinyText text="Services" className="relative inline-block" />
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-ivory/70 md:text-xl max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We offer a comprehensive range of services to help your business thrive in the digital landscape. From
                stunning web design to effective SEO optimization and AI automation.
              </motion.p>

              {/* Service Tabs */}
              <motion.div 
                className="mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex justify-center gap-4 flex-wrap">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        asChild
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full 
                          bg-gradient-to-r ${service.buttonGradient} text-ivory hover:shadow-lg 
                          hover:shadow-${service.color.replace("text-", "")}/20`}
                      >
                        <Link href={service.link}>
                          {service.icon}
                          <span className="whitespace-nowrap">{service.title}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </ClientOnly>
        </div>
      </section>

      {/* Pricing Section */}
      <RedesignedPricingSection />

      {/* Contact Section */}
      <RedesignedContactSection />
    </>
  )
}