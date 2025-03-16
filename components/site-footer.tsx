"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-muted bg-background py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                soluvia<span className="text-primary">design</span>
              </span>
            </Link>
            <p className="text-white/70">
              Creating stunning websites that drive business growth and optimize your online presence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-design" className="text-white/70 transition-colors hover:text-primary">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="text-white/70 transition-colors hover:text-primary">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/services/seo-optimization" className="text-white/70 transition-colors hover:text-primary">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-white/70 transition-colors hover:text-primary">
                  Web Development
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
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-white/70 transition-colors hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-colors hover:text-primary">
                  Contact
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
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-white/70">
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
          className="mt-16 border-t border-muted pt-8 text-center text-sm text-white/50"
        >
          <p>© {currentYear} Soluvia Design. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

