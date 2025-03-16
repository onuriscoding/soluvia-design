"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

const navItems = [
  {
    label: "SERVICES",
    children: [
      { label: "WEB DESIGN", href: "/services/web-design" },
      { label: "E-COMMERCE", href: "/services/ecommerce" },
      { label: "SEO OPTIMIZATION", href: "/services/seo-optimization" },
      { label: "WEB DEVELOPMENT", href: "/services/web-development" },
    ],
  },
  {
    label: "PORTFOLIO",
    children: [
      { label: "RECENT WORK", href: "/portfolio" },
      { label: "CASE STUDIES", href: "/portfolio/case-studies" },
    ],
  },
  { label: "OUR PROCESS", href: "/how-it-works" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
]

export function EnhancedNavigationBar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div
          className={`${
            scrolled ? "bg-charcoal/80 shadow-lg" : "bg-charcoal/40"
          } backdrop-blur-md rounded-2xl transition-all duration-500`}
        >
          <div className="flex items-center justify-between h-16 px-6">
            <Link href="/" className="flex items-center space-x-2 z-10">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-ivory/20">
                <div className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-ivory">S</div>
              </div>
              <span className="text-xl font-bold">
                <span className="text-rose">Soluvia</span>
                <span className="text-ivory">Design</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center text-ivory/80 hover:text-rose transition-colors font-medium px-1 py-2"
                        aria-expanded={hoveredItem === item.label}
                      >
                        {item.label}
                        <motion.div
                          animate={{ rotate: hoveredItem === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {hoveredItem === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-56 py-2 bg-charcoal/90 backdrop-blur-md rounded-xl border border-ivory/10 shadow-lg overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-sapphire/5 z-0"></div>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="relative z-10 block px-4 py-2 text-ivory/80 hover:text-rose hover:bg-ivory/5 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="text-ivory/80 hover:text-rose transition-colors font-medium px-1 py-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-full bg-rose px-6 py-2 text-sm font-medium text-ivory transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10">GET STARTED</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full bg-charcoal/50 text-ivory border border-ivory/10 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-rose/5 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
            </div>

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-charcoal/95 shadow-xl overflow-y-auto"
            >
              <div className="flex flex-col p-6 pt-24">
                {navItems.map((item) => (
                  <div key={item.label} className="py-1">
                    {item.children ? (
                      <div className="mb-2">
                        <button
                          onClick={() => setHoveredItem(hoveredItem === item.label ? null : item.label)}
                          className="flex w-full items-center justify-between py-2 text-lg font-medium text-ivory"
                        >
                          {item.label}
                          <motion.div
                            animate={{ rotate: hoveredItem === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-5 w-5 text-ivory/70" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {hoveredItem === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 border-l-2 border-rose/30 pl-4 space-y-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center py-2 text-ivory/70 hover:text-rose transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-lg font-medium text-ivory hover:text-rose transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* CTA Button (Mobile) */}
                <div className="mt-8">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group relative overflow-hidden flex items-center justify-center w-full rounded-full bg-gradient-to-r from-rose to-sapphire py-3 text-base font-medium text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                  >
                    GET STARTED
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

