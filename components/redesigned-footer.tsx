"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Facebook, ArrowRight } from "lucide-react"

export function RedesignedFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ivory/10 bg-charcoal py-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-ivory/20">
                <div className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-ivory">S</div>
              </div>
              <span className="text-xl font-bold">
                <span className="text-rose">Soluvia</span>
                <span className="text-ivory">Design</span>
              </span>
            </Link>
            <p className="text-ivory/70">
              Creating sophisticated, elegant websites that drive business growth and optimize your online presence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-ivory">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/web-design"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Web Design</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecommerce"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>E-commerce</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/seo-optimization"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>SEO Optimization</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-development"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Web Development</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-ivory">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="group flex items-center text-ivory/70 transition-colors hover:text-rose">
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Portfolio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Our Process</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-ivory">Connect</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory/70 hover:bg-rose/20 hover:text-rose transition-colors duration-300 border border-ivory/10"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory/70 hover:bg-rose/20 hover:text-rose transition-colors duration-300 border border-ivory/10"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory/70 hover:bg-rose/20 hover:text-rose transition-colors duration-300 border border-ivory/10"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory/70 hover:bg-rose/20 hover:text-rose transition-colors duration-300 border border-ivory/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-ivory/70">
              Email: hello@soluviadesign.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-ivory/10 pt-8 text-center text-sm text-ivory/50"
        >
          <p>© {currentYear} Soluvia Design. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy-policy" className="text-ivory/50 hover:text-rose transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-ivory/50 hover:text-rose transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

