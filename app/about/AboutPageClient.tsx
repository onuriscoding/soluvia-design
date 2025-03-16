"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionTransition } from "@/components/section-transition"

export default function AboutPageClient() {
  const storyRef = useRef(null)
  const whyUsRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 })
  const isWhyUsInView = useInView(whyUsRef, { once: true, amount: 0.2 })

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  We Create{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Digital Experiences
                  </span>{" "}
                  That Matter
                </h1>
              </motion.div>
              <motion.p
                className="text-lg text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Solutions via designs is a creative agency specializing in web design, business growth, and SEO
                optimization. We're passionate about helping businesses thrive in the digital landscape.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative aspect-square overflow-hidden rounded-2xl md:translate-y-8"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-70 blur-lg"></div>
              <div className="relative h-full w-full rounded-2xl">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Our team collaborating"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <SectionTransition>
        <div ref={storyRef} className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70">From humble beginnings to industry leaders</p>
          </motion.div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              className="order-2 space-y-6 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-white/80">
                Founded in 2015, Solutions via designs began with a simple mission: to create beautiful, functional
                websites that drive real business results. What started as a small team of passionate designers and
                developers has grown into a full-service digital agency.
              </p>
              <p className="text-lg text-white/80">
                Over the years, we've expanded our services to include business growth strategies and SEO optimization,
                providing our clients with comprehensive solutions to their digital challenges.
              </p>
              <p className="text-lg text-white/80">
                Today, we're proud to work with clients across various industries, from startups to established
                enterprises, helping them achieve their goals and make a lasting impact in their respective fields.
              </p>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-600/20 opacity-70 blur-lg"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                  <Image src="/placeholder.svg?height=600&width=800" alt="Our journey" fill className="object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      {/* Values Section - Enhanced version */}
      <SectionTransition>
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Core{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70">The principles that guide everything we do</p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Passion",
                description: "We're passionate about what we do and bring enthusiasm to every project we undertake.",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                title: "Innovation",
                description: "We constantly explore new ideas and technologies to deliver cutting-edge solutions.",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                title: "Collaboration",
                description: "We believe in the power of teamwork and partnership with our clients.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from design to implementation to client service.",
                gradient: "from-pink-500 to-red-600",
              },
              {
                title: "Efficiency",
                description:
                  "We value efficiency and effectiveness, delivering solutions that maximize results with minimal waste.",
                gradient: "from-red-500 to-orange-600",
              },
              {
                title: "Integrity",
                description: "We operate with honesty, transparency, and ethical standards in all our interactions.",
                gradient: "from-orange-500 to-yellow-600",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 transition-transform duration-500 group-hover:scale-150"></div>

                <div className="relative">
                  <div
                    className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${value.gradient} transition-all duration-300 group-hover:w-20`}
                  ></div>
                  <h3 className="mb-3 text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* Team Section - Enhanced version */}
      <SectionTransition>
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70">The talented individuals behind our success</p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & Creative Director",
                bio: "With over 15 years of experience in design and digital marketing, Sarah leads our creative team with passion and innovation.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Michael Chen",
                role: "Lead Web Developer",
                bio: "Michael brings technical expertise and creative problem-solving to every project, ensuring seamless functionality and performance.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Emma Rodriguez",
                role: "SEO Specialist",
                bio: "Emma's analytical approach and deep understanding of search algorithms help our clients achieve top rankings and increased visibility.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "David Thompson",
                role: "Business Growth Strategist",
                bio: "David combines data-driven insights with creative thinking to develop strategies that drive measurable business results.",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      {["twitter", "linkedin", "instagram"].map((platform) => (
                        <Link
                          key={platform}
                          href="#"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-blue-500 hover:text-white"
                        >
                          <span className="sr-only">{platform}</span>
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
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="mb-2 text-blue-400">{member.role}</p>
                  <p className="text-sm text-white/70">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* Why Choose Us Section */}
      <SectionTransition>
        <div ref={whyUsRef} className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isWhyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Us
              </span>
              ?
            </h2>
            <p className="mt-4 text-lg text-white/70">We're not just another agency. Here's what sets us apart.</p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Tailored Solutions",
                description:
                  "We don't believe in one-size-fits-all. Every solution we create is customized to meet your specific needs and goals.",
              },
              {
                title: "Results-Driven Approach",
                description:
                  "We focus on delivering measurable results that contribute to your business growth and success.",
              },
              {
                title: "Transparent Communication",
                description:
                  "We maintain open and honest communication throughout the project, ensuring you're always in the loop.",
              },
              {
                title: "Cutting-Edge Technology",
                description:
                  "We stay ahead of the curve, utilizing the latest technologies and trends to give you a competitive edge.",
              },
              {
                title: "Dedicated Support",
                description:
                  "Our relationship doesn't end at launch. We provide ongoing support to ensure your continued success.",
              },
              {
                title: "Holistic Perspective",
                description:
                  "We look at the big picture, considering how each element of your digital presence works together to achieve your goals.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isWhyUsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 transition-transform duration-500 group-hover:scale-150"></div>

                <div className="relative">
                  <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-20"></div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* CTA Section */}
      <SectionTransition>
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

              {/* Animated particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Start Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Journey
                  </span>
                  ?
                </h2>
                <p className="mt-4 text-lg text-white/80 md:text-xl">
                  Let's create something extraordinary together. Contact us today to start your journey towards digital
                  excellence.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:border-blue-500/50 hover:text-blue-400"
                  >
                    <Link href="/services">Explore Our Services</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SectionTransition>
    </>
  )
}

