"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export function ContactCTA() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Let's <span className="text-gradient-soluvia">Connect</span>
            </h2>
            <p className="text-lg text-ivory/70 mb-8">
              Ready to transform your digital presence? Get in touch with our team to discuss your project and discover
              how we can help you achieve your goals.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ivory mb-1">Email Us</h3>
                  <a href="mailto:hello@soluviadesign.com" className="text-ivory/70 hover:text-rose transition-colors">
                    hello@soluviadesign.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire/10 text-sapphire mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ivory mb-1">Call Us</h3>
                  <a href="tel:+15551234567" className="text-ivory/70 hover:text-sapphire transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige/10 text-beige mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ivory mb-1">Visit Us</h3>
                  <p className="text-ivory/70">
                    123 Design Street
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-medium hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
            >
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] rounded-xl overflow-hidden"
          >
            {/* Gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-70"></div>

            <div className="relative h-full w-full rounded-xl overflow-hidden">
              {/* This would typically be a Google Maps or Mapbox integration */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948322!3d37.75781499657613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623285386115!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Soluvia Design Office Location"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

