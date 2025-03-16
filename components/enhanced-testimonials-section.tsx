"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    content:
      "Solutions via designs transformed our online presence completely. Their attention to detail and understanding of our brand resulted in a website that perfectly captures our essence.",
    author: "Sarah Johnson",
    role: "CEO, Luxury Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    content:
      "Working with Solutions via designs was a game-changer for our business. Their strategic approach to web design and business growth helped us increase conversions by 150% within just three months of launch.",
    author: "Michael Chen",
    role: "Marketing Director, Tech Innovations",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    content:
      "The team at Solutions via designs exceeded all our expectations. Their expertise in SEO optimization has put us on the first page of search results for our key terms, driving qualified leads to our business daily.",
    author: "Emma Rodriguez",
    role: "Founder, Wellness Studio",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

export function EnhancedTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl md:text-5xl">
            What Our <span className="text-gradient-soluvia">Clients Say</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
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
            <div className="relative overflow-hidden rounded-2xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 p-8 md:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-rose/20" />

              <div className="relative z-10 min-h-[300px] flex flex-col justify-between">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="mb-8 flex flex-col items-center gap-6 md:flex-row md:items-start">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-rose/20">
                        <Image
                          src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                          alt={testimonials[activeIndex].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-ivory">{testimonials[activeIndex].author}</h3>
                        <p className="text-ivory/70">{testimonials[activeIndex].role}</p>
                        <div className="mt-2 flex items-center justify-center md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonials[activeIndex].rating ? "text-yellow-400" : "text-gray-400"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg italic leading-relaxed text-ivory/90">{testimonials[activeIndex].content}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/80 text-ivory transition-colors hover:bg-rose"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1)
                      setActiveIndex(index)
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      activeIndex === index ? "bg-rose w-6" : "bg-ivory/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/80 text-ivory transition-colors hover:bg-rose"
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

