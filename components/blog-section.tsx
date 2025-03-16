"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Art of Minimalist Web Design: Less is More",
    excerpt:
      "Explore how minimalist design principles can create more effective and elegant websites that drive user engagement and conversions.",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "June 15, 2023",
    readTime: "5 min read",
    slug: "/blog/minimalist-web-design",
  },
  {
    id: "post-2",
    title: "How AI is Transforming Web Development in 2023",
    excerpt:
      "Discover the latest AI-powered tools and techniques that are revolutionizing the way websites are designed and developed.",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=800",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "May 22, 2023",
    readTime: "7 min read",
    slug: "/blog/ai-web-development",
  },
  {
    id: "post-3",
    title: "The Psychology of Color in Luxury Web Design",
    excerpt:
      "Learn how strategic use of color psychology can elevate your brand and create emotional connections with your audience.",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800",
    author: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    date: "April 10, 2023",
    readTime: "6 min read",
    slug: "/blog/color-psychology-luxury-design",
  },
]

export function BlogSection() {
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
            Latest <span className="text-gradient-soluvia">Insights</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Explore our latest thoughts on design, development, and digital strategy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 hover:border-rose/30 transition-all duration-300"
            >
              <Link href={post.slug} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose/20 text-rose backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ivory mb-3 group-hover:text-rose transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-ivory/70 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center mb-4">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-ivory/70">{post.author.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-ivory/60">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-charcoal/70 backdrop-blur-sm border border-ivory/10 text-ivory font-medium hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-all duration-300"
          >
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

