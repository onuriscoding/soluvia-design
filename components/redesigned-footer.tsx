"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RedesignedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ivory/10 bg-[#1a1c2a]/70 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ivory/10 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/soluvia-final-no-bg.png"
                  alt="Soluvia Design Logo"
                  width={150}
                  height={100}
                />
              </Link>

              <p className="mt-6 text-ivory/70 max-w-md translate-x-100px">
                Creating sophisticated, elegant websites that drive business
                growth and optimize your online presence. We specialize in
                delivering high-quality digital solutions tailored to your
                brand.
              </p>

              <div className="mt-8 flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252736] text-ivory/70 hover:bg-rose/20 hover:text-rose transition-all duration-300 border border-ivory/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-rose mr-3" />
                  <a
                    href="mailto:hello@soluviadesign.com"
                    className="text-ivory/70 hover:text-rose transition-colors"
                  >
                    info@soluvia.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-rose mr-3" />
                  <a
                    href="tel:+15551234567"
                    className="text-ivory/70 hover:text-rose transition-colors"
                  >
                    +32 (499) 24 29 51
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-ivory">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/web-design"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Web Design</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecommerce"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>E-commerce</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/seo-optimization"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>SEO Optimization</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-development"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Web Development</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/branding"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Branding</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital-marketing"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Digital Marketing</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-ivory">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Portfolio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Our Process</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-ivory">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/resources/guides"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Design Guides</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/case-studies"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Case Studies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/faq"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/testimonials"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Testimonials</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/support"
                  className="group flex items-center text-ivory/70 transition-colors hover:text-rose"
                >
                  <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 p-6 rounded-xl border border-ivory/10 bg-[#252736]"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-ivory mb-2">
                Business Hours
              </h3>
              <p className="text-ivory/70">
                We're available to help during these hours
              </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-ivory/10 bg-charcoal/30">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-rose mr-2" />
                  <h4 className="font-medium text-ivory">Weekdays</h4>
                </div>
                <p className="text-ivory/70">Monday - Friday</p>
                <p className="text-ivory">9:00 AM - 6:00 PM</p>
              </div>
              <div className="p-4 rounded-lg border border-ivory/10 bg-charcoal/30">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-rose mr-2" />
                  <h4 className="font-medium text-ivory">Saturday</h4>
                </div>
                <p className="text-ivory/70">Weekend</p>
                <p className="text-ivory">10:00 AM - 4:00 PM</p>
              </div>
              <div className="p-4 rounded-lg border border-ivory/10 bg-charcoal/30">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-rose mr-2" />
                  <h4 className="font-medium text-ivory">Sunday</h4>
                </div>
                <p className="text-ivory/70">Weekend</p>
                <p className="text-ivory">Closed</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between space-y-6 border-t border-ivory/10 pt-8 text-sm text-ivory/50 md:flex-row md:space-y-0"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>© {currentYear} Soluvia Design. All rights reserved.</p>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <select className="bg-transparent text-ivory/50 border-none focus:outline-none text-sm">
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies-policy"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              Cookies Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-ivory/50 hover:text-rose transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
