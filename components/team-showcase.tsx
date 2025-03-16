"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"

type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Sarah Johnson",
    role: "Founder & Creative Director",
    bio: "With over 15 years of experience in design and digital marketing, Sarah leads our creative team with passion and innovation.",
    image: "/placeholder.svg?height=600&width=600",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:sarah@soluviadesign.com",
    },
  },
  {
    id: "member-2",
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Michael brings technical expertise and creative problem-solving to every project, ensuring seamless functionality and performance.",
    image: "/placeholder.svg?height=600&width=600",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:michael@soluviadesign.com",
    },
  },
  {
    id: "member-3",
    name: "Emma Rodriguez",
    role: "UX/UI Designer",
    bio: "Emma's eye for detail and user-centered approach creates intuitive, elegant interfaces that enhance user experience and engagement.",
    image: "/placeholder.svg?height=600&width=600",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:emma@soluviadesign.com",
    },
  },
  {
    id: "member-4",
    name: "David Thompson",
    role: "SEO Specialist",
    bio: "David's analytical approach and deep understanding of search algorithms help our clients achieve top rankings and increased visibility.",
    image: "/placeholder.svg?height=600&width=600",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:david@soluviadesign.com",
    },
  },
]

export function TeamShowcase() {
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
            Meet Our <span className="text-gradient-soluvia">Team</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            The talented individuals behind our exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-square">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay with social links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex justify-center gap-3 mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      {member.social.linkedin && (
                        <Link
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory hover:bg-rose hover:text-ivory transition-colors duration-300"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </Link>
                      )}
                      {member.social.twitter && (
                        <Link
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory hover:bg-rose hover:text-ivory transition-colors duration-300"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="h-5 w-5" />
                        </Link>
                      )}
                      {member.social.email && (
                        <Link
                          href={member.social.email}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory hover:bg-rose hover:text-ivory transition-colors duration-300"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-ivory group-hover:text-rose transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-rose mb-2">{member.role}</p>
                <p className="text-ivory/70 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-charcoal/70 backdrop-blur-sm border border-ivory/10 text-ivory font-medium hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-all duration-300"
          >
            Learn More About Us <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

