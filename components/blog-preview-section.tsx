"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "10 Web Design Trends to Watch in 2023",
    excerpt:
      "Discover the latest web design trends that are shaping the digital landscape and how you can incorporate them into your website.",
    image: "/placeholder.svg?height=600&width=800",
    date: "June 15, 2023",
    category: "Web Design",
    slug: "/blog/web-design-trends-2023",
  },
  {
    title: "How SEO Can Transform Your Business Growth",
    excerpt:
      "Learn how implementing effective SEO strategies can significantly impact your business growth and online visibility.",
    image: "/placeholder.svg?height=600&width=800",
    date: "May 22, 2023",
    category: "SEO",
    slug: "/blog/seo-business-growth",
  },
  {
    title: "The Psychology of Color in Web Design",
    excerpt:
      "Explore how different colors evoke specific emotions and how to strategically use color psychology in your website design.",
    image: "/placeholder.svg?height=600&width=800",
    date: "April 10, 2023",
    category: "Design",
    slug: "/blog/color-psychology-web-design",
  },
]

export function BlogPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32">
      <div className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
            Latest <span className="text-rose">Insights</span>
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            Stay updated with our latest thoughts on design, business growth, and digital trends
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <Link href={post.slug} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-rose/10 px-3 py-1 text-xs font-medium text-rose">
                      {post.category}
                    </span>
                    <span className="text-sm text-charcoal/60">{post.date}</span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-charcoal transition-colors duration-300 group-hover:text-rose">
                    {post.title}
                  </h3>

                  <p className="mb-4 text-charcoal/70">{post.excerpt}</p>

                  <div className="flex items-center text-rose">
                    <span className="font-medium">Read More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/blog" className="inline-flex items-center text-lg font-medium text-rose hover:underline">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

