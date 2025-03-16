"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function EnhancedCtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-ivory/10 bg-gradient-to-br from-charcoal/80 via-charcoal to-charcoal/80 p-8 md:p-16 backdrop-blur-sm">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/20 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/20 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl md:text-5xl">
                Ready for a website that <span className="text-gradient-soluvia">stands out</span>?
              </h2>
              <p className="mt-6 text-lg text-ivory/80 md:text-xl">
                Tell us about your project and receive a personalized consultation, no commitment required.
              </p>

              <motion.div
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-8 py-4 text-base font-medium text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center">
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 px-8 py-4 text-base font-medium text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/70 hover:shadow-lg"
                >
                  OUR PROCESS
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

