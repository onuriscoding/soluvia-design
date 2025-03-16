"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Mail, Phone, Send, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPageClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 md:py-40">
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Talk
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/70 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have a project in mind? We'd love to hear from you. Get in touch with our team to discuss how we can help
              you achieve your goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section ref={formRef} className="py-20 md:py-32">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-3xl font-bold">Send Us a Message</h2>
              <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
                <CardContent className="relative z-10 p-6">
                  {isSubmitted ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-12 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-blue-400">
                        <Send className="h-8 w-8" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
                      <p className="mb-6 text-white/70">
                        Thank you for reaching out. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white/80">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white/80">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white/80">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Your phone number"
                            value={formState.phone}
                            onChange={handleChange}
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-white/80">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white/80">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-blue-500/50"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="mb-6 text-3xl font-bold">Contact Information</h2>
              <div className="mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-white/70">hello@solutionsvia.designs</p>
                    <p className="text-white/70">support@solutionsvia.designs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Phone</h3>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                    <p className="text-white/70">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Address</h3>
                    <p className="text-white/70">
                      123 Design Street
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mb-4 text-xl font-medium text-white">Business Hours</h3>
              <div className="mb-8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>

              <h3 className="mb-4 text-xl font-medium text-white">Follow Us</h3>
              <div className="flex gap-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
                  <Link
                    key={platform}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-600/20 hover:text-blue-400"
                  >
                    {platform === "facebook" && (
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
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
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
                    <span className="sr-only">{platform}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
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
                    Project
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
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

