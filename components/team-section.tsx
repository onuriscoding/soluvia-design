"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & Creative Director",
    bio: "With over 15 years of experience in design and digital marketing, Sarah leads our creative team with passion and innovation.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "Lead Web Developer",
    bio: "Michael brings technical expertise and creative problem-solving to every project, ensuring seamless functionality and performance.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Emma Rodriguez",
    role: "SEO Specialist",
    bio: "Emma's analytical approach and deep understanding of search algorithms help our clients achieve top rankings and increased visibility.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "David Thompson",
    role: "Business Growth Strategist",
    bio: "David combines data-driven insights with creative thinking to develop strategies that drive measurable business results.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">The talented individuals behind our success</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <Link
                      key={platform}
                      href={url}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
                    >
                      <span className="sr-only">{platform}</span>
                      {platform === "linkedin" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      )}
                      {platform === "twitter" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      )}
                      {platform === "instagram" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      )}
                      {platform === "github" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mb-2 text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

