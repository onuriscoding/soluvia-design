"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useInView } from "react-intersection-observer"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Elevate Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Working with Soluvia Design transformed our online presence. Their attention to detail and understanding of our brand resulted in a website that perfectly captures our luxury aesthetic while driving significant business growth.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Horizon Financial",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The team at Soluvia Design delivered beyond our expectations. Their strategic approach to web design has not only improved our user experience but has also significantly increased our conversion rates and client engagement.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Founder",
    company: "Artisan Collective",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Soluvia Design understood our vision from day one. They created an e-commerce platform that showcases our products beautifully and provides a seamless shopping experience. Our sales have increased by 40% since launch.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Manager",
    company: "Wellness Haven",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The website Soluvia Design created for us perfectly captures the serene and luxurious atmosphere of our wellness retreat. Their attention to detail and responsive design has significantly improved our booking process.",
  },
]

export function RedesignedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const ref = useRef(null)
  const [isInView, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    // Auto-advance testimonials
    intervalRef.current = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

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
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our <span className="text-gradient-soluvia">Clients</span> Say
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Hear from businesses that have transformed their digital presence with Soluvia Design
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          {/* Large quote icon */}
          <div className="absolute -top-10 -left-10 opacity-10">
            <Quote className="h-32 w-32 text-rose" />
          </div>

          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div className="mb-8 text-center">
                  <p className="text-xl text-ivory/90 italic mb-8">"{testimonials[currentIndex].content}"</p>
                  <div className="flex items-center justify-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-rose mr-4">
                      <Image
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-ivory">{testimonials[currentIndex].name}</h4>
                      <p className="text-ivory/70">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-rose w-6" : "bg-ivory/30 hover:bg-ivory/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

