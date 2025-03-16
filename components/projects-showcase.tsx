"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowUpRight, ExternalLink } from "lucide-react"

type Project = {
  id: string
  title: string
  category: string
  image: string
  description: string
  link: string
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "Luxury Boutique Website",
    category: "e-commerce",
    image: "/placeholder.svg?height=600&width=800",
    description: "A sophisticated e-commerce platform for a high-end fashion boutique.",
    link: "/portfolio/luxury-boutique",
  },
  {
    id: "project-2",
    title: "Financial Advisory Firm",
    category: "corporate",
    image: "/placeholder.svg?height=600&width=800",
    description: "A professional website for a financial advisory firm with custom dashboards.",
    link: "/portfolio/financial-advisory",
  },
  {
    id: "project-3",
    title: "Gourmet Restaurant",
    category: "hospitality",
    image: "/placeholder.svg?height=600&width=800",
    description: "An elegant website for a fine dining restaurant with online reservations.",
    link: "/portfolio/gourmet-restaurant",
  },
  {
    id: "project-4",
    title: "Wellness Retreat",
    category: "hospitality",
    image: "/placeholder.svg?height=600&width=800",
    description: "A serene website for a luxury wellness retreat and spa.",
    link: "/portfolio/wellness-retreat",
  },
  {
    id: "project-5",
    title: "Tech Startup Platform",
    category: "tech",
    image: "/placeholder.svg?height=600&width=800",
    description: "A dynamic website for a tech startup with interactive features.",
    link: "/portfolio/tech-startup",
  },
  {
    id: "project-6",
    title: "Artisan Jewelry Shop",
    category: "e-commerce",
    image: "/placeholder.svg?height=600&width=800",
    description: "A boutique e-commerce site for handcrafted jewelry with custom product configurator.",
    link: "/portfolio/artisan-jewelry",
  },
]

const categories = ["all", "e-commerce", "corporate", "hospitality", "tech"]

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

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
            Our <span className="text-gradient-soluvia">Featured</span> Projects
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Explore our portfolio of sophisticated, elegant websites that drive business growth
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-rose to-sapphire text-ivory"
                  : "bg-charcoal/50 text-ivory/70 hover:text-ivory hover:bg-charcoal/70 border border-ivory/10"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 hover:border-rose/30 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal/70 backdrop-blur-sm text-ivory/90 border border-ivory/10">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ivory mb-2">{project.title}</h3>
                  <p className="text-ivory/70 mb-4">{project.description}</p>
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-rose hover:text-sapphire transition-colors"
                  >
                    View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={project.link}
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-rose text-ivory transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-medium hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
          >
            View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

