"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

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

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section ref={ref} className="bg-muted/30 py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Explore our portfolio of successful projects that have helped businesses achieve their goals.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Badge className="mb-2">{item.category}</Badge>
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

