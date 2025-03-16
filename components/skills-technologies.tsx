"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Globe, ShoppingCart, BarChart, Search } from "lucide-react"

type Skill = {
  icon: React.ReactNode
  title: string
  description: string
  technologies: string[]
}

const skills: Skill[] = [
  {
    icon: <Palette className="h-6 w-6 text-rose" />,
    title: "UI/UX Design",
    description: "Creating intuitive, elegant user interfaces that enhance user experience and engagement.",
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
  },
  {
    icon: <Code className="h-6 w-6 text-sapphire" />,
    title: "Web Development",
    description: "Building responsive, high-performance websites with modern frameworks and technologies.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-beige" />,
    title: "E-commerce",
    description: "Developing sophisticated online stores with seamless checkout experiences and inventory management.",
    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "Snipcart"],
  },
  {
    icon: <Search className="h-6 w-6 text-rose" />,
    title: "SEO Optimization",
    description: "Improving search engine visibility and driving organic traffic through strategic optimization.",
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Moz", "Schema Markup"],
  },
  {
    icon: <Globe className="h-6 w-6 text-sapphire" />,
    title: "Content Management",
    description: "Implementing flexible content management systems that empower clients to update their websites.",
    technologies: ["WordPress", "Sanity", "Contentful", "Strapi", "Prismic"],
  },
  {
    icon: <BarChart className="h-6 w-6 text-beige" />,
    title: "Performance Analytics",
    description: "Monitoring website performance and user behavior to drive continuous improvement.",
    technologies: ["Google Analytics", "Hotjar", "Mixpanel", "Lighthouse", "WebPageTest"],
  },
]

export function SkillsTechnologies() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
            Our <span className="text-gradient-soluvia">Expertise</span> & Technologies
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            We combine creative design with cutting-edge technology to deliver exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 p-6 hover:border-rose/30 transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-rose/10 to-sapphire/10 rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

              <div className="flex items-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal/70 backdrop-blur-sm border border-ivory/10 mr-4">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-ivory">{skill.title}</h3>
              </div>

              <p className="text-ivory/70 mb-6">{skill.description}</p>

              <div>
                <h4 className="text-sm font-semibold text-ivory/90 mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal/70 text-ivory/90 border border-ivory/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

