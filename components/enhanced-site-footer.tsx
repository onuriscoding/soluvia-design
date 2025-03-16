"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EnhancedSiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ivory/10 bg-charcoal py-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Newsletter Section */}
        <div className="mx-auto mb-16 max-w-3xl rounded-2xl border border-ivory/10 bg-charcoal/50 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-ivory">Stay Updated</h3>
            <p className="mt-2 text-ivory/70">
              Subscribe to our newsletter for the latest design trends and company news.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-ivory/10 bg-charcoal/50 text-ivory placeholder:text-ivory/50 focus:border-rose/50"
            />
            <Button className="bg-gradient-to-r from-rose to-sapphire hover:shadow-lg hover:shadow-rose/20">
              Subscribe <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

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
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory transition-colors hover:bg-rose/20 hover:text-rose hover:border-rose/30"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory transition-colors hover:bg-rose/20 hover:text-rose hover:border-rose/30"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory transition-colors hover:bg-rose/20 hover:text-rose hover:border-rose/30"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 border border-ivory/10 text-ivory transition-colors hover:bg-rose/20 hover:text-rose hover:border-rose/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-ivory">Services</h3>
            <ul className="space-y-3">
              {[
                { label: "Web Design", href: "/services/web-design" },
                { label: "E-commerce", href: "/services/ecommerce" },
                { label: "SEO Optimization", href: "/services/seo-optimization" },
                { label: "Web Development", href: "/services/web-development" },
                { label: "Business Growth", href: "/services/business-growth" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-ivory">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                  >
                    <ArrowRight className="mr-2 h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-ivory">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose/10">
                  <Mail className="h-4 w-4 text-rose" />
                </div>
                <div>
                  <p className="text-ivory">Email Us</p>
                  <a href="mailto:hello@soluviadesign.com" className="text-ivory/70 hover:text-rose">
                    hello@soluviadesign.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sapphire/10">
                  <Phone className="h-4 w-4 text-sapphire" />
                </div>
                <div>
                  <p className="text-ivory">Call Us</p>
                  <a href="tel:+15551234567" className="text-ivory/70 hover:text-rose">
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-beige/10">
                  <MapPin className="h-4 w-4 text-beige" />
                </div>
                <div>
                  <p className="text-ivory">Visit Us</p>
                  <p className="text-ivory/70">
                    123 Design Street
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 border-t border-ivory/10 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-ivory/50">© {currentYear} Soluvia Design. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-sm text-ivory/50 hover:text-rose">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-ivory/50 hover:text-rose">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-ivory/50 hover:text-rose">
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

