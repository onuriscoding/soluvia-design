"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const portfolioItems = [
  {
    id: 1,
    title: "Luxury Brand Website",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/luxury-brand",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Business Growth",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/ecommerce-platform",
  },
  {
    id: 3,
    title: "Tech Startup Rebrand",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/tech-startup",
  },
  {
    id: 4,
    title: "SEO Campaign",
    category: "SEO Optimization",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/seo-campaign",
  },
]

const categories = ["All", "Web Design", "Business Growth", "SEO Optimization"]

export function EnhancedPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our <span className="text-gradient-soluvia">Portfolio</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Explore our collection of successful projects that have helped businesses achieve their goals
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-rose to-sapphire text-ivory"
                  : "border-ivory/20 text-ivory/70 hover:border-rose/50 hover:text-rose"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.link} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    initial={false}
                    animate={hoveredItem === item.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="mb-2 bg-gradient-to-r from-rose to-sapphire text-ivory">{item.category}</Badge>
                    <h3 className="text-lg font-medium text-ivory">{item.title}</h3>
                    <div className="mt-3 flex items-center text-rose">
                      <span className="text-sm">View Project</span>
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-ivory/20 text-ivory hover:border-rose/50 hover:text-rose"
          >
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

