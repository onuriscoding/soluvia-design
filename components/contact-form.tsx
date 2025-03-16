"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "web-design",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
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
        message: "",
        service: "web-design",
      })
    }, 1500)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal/50 p-8 backdrop-blur-sm">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {isSubmitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose/20 to-sapphire/20">
              <CheckCircle className="h-10 w-10 text-rose" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-ivory">Message Sent!</h3>
            <p className="mb-6 text-ivory/70">Thank you for reaching out. We'll get back to you as soon as possible.</p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-rose to-sapphire hover:shadow-lg hover:shadow-rose/20"
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-ivory/80">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-ivory/80">
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
                  className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-ivory/80">
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Your phone number"
                  value={formState.phone}
                  onChange={handleChange}
                  className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service" className="text-ivory/80">
                  Service Interested In
                </Label>
                <select
                  id="service"
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className="w-full rounded-md border border-ivory/10 bg-charcoal/50 px-3 py-2 text-ivory focus:border-rose/50 focus:outline-none"
                >
                  <option value="web-design">Web Design</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="seo">SEO Optimization</option>
                  <option value="development">Web Development</option>
                  <option value="business">Business Growth</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-ivory/80">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your project"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
                className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose to-sapphire hover:shadow-lg hover:shadow-rose/20"
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
                <span className="flex items-center">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

