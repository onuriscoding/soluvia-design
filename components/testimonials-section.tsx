"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    content:
      "Soluvia Design transformed our online presence completely. Their attention to detail and understanding of our brand resulted in a website that perfectly captures our essence.",
    author: "Sarah Johnson",
    role: "CEO, Luxury Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "Working with Soluvia Design was a game-changer for our business. Their strategic approach to web design and business growth helped us increase conversions by 150% within just three months of launch.",
    author: "Michael Chen",
    role: "Marketing Director, Tech Innovations",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "The team at Soluvia Design exceeded all our expectations. Their expertise in SEO optimization has put us on the first page of search results for our key terms, driving qualified leads to our business daily.",
    author: "Emma Rodriguez",
    role: "Founder, Wellness Studio",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Don't just take our word for it. Hear from some of our satisfied clients.
          </p>
        </motion.div>

        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="relative overflow-hidden rounded-lg bg-secondary p-8 md:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/20" />

              <div className="relative z-10">
                <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].author}</h3>
                    <p className="text-white/70">{testimonials[activeIndex].role}</p>
                  </div>
                </div>

                <p className="text-lg italic leading-relaxed text-white/90">{testimonials[activeIndex].content}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      activeIndex === index ? "bg-primary w-6" : "bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

