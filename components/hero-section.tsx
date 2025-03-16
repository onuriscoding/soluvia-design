"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20">
      {/* Floating website examples */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top left example */}
        <motion.div
          className="absolute -left-20 top-20 h-64 w-80 rotate-[-8deg] overflow-hidden rounded-lg border border-muted shadow-lg md:left-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="floating-element-slow">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-blue"></span>
              <span className="text-xs font-medium text-white/80">Web Design</span>
            </div>
          </div>
        </motion.div>

        {/* Top right example */}
        <motion.div
          className="absolute -right-20 top-40 h-72 w-96 rotate-[5deg] overflow-hidden rounded-lg border border-muted shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="floating-element">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-pink"></span>
              <span className="text-xs font-medium text-white/80">E-commerce</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom left example */}
        <motion.div
          className="absolute -bottom-10 -left-10 h-64 w-80 rotate-[10deg] overflow-hidden rounded-lg border border-muted shadow-lg md:left-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="floating-element-fast">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-green"></span>
              <span className="text-xs font-medium text-white/80">Portfolio</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom right example */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-96 rotate-[-6deg] overflow-hidden rounded-lg border border-muted shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="floating-element">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-purple"></span>
              <span className="text-xs font-medium text-white/80">Business</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your website
            <br />
            <span className="gradient-text">made for you</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            We create stunning websites that drive business growth and optimize your online presence. Elevate your brand
            with our premium web design services.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-3 text-base font-medium text-white"
            >
              <span className="relative z-10 flex items-center">
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              HOW IT WORKS
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

