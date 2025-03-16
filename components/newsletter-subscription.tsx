"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setMessage("Thank you for subscribing to our newsletter!")
      setEmail("")
    }, 1500)
  }

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose/10 to-sapphire/10"></div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl rounded-2xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 p-8 md:p-12">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stay Updated with <span className="text-gradient-soluvia">Soluvia Design</span>
            </h2>
            <p className="mt-4 text-ivory/70">
              Subscribe to our newsletter for the latest design trends, industry insights, and company news
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-grow relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-full bg-charcoal/70 border border-ivory/10 text-ivory placeholder:text-ivory/50 focus:outline-none focus:border-rose/50"
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-medium hover:shadow-lg hover:shadow-rose/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {status === "loading" ? (
                <div className="h-5 w-5 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
              ) : status === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <>
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>

          {message && (
            <motion.div
              className={`mt-4 text-center ${status === "success" ? "text-green-400" : "text-red-400"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center">
                {status === "success" ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                <span>{message}</span>
              </div>
            </motion.div>
          )}

          <motion.p
            className="mt-6 text-center text-xs text-ivory/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

