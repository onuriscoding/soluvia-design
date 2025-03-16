"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/how-it-works", label: "HOW IT WORKS" },
  { href: "/about", label: "ABOUT US" },
  { href: "/resources", label: "RESOURCES" },
]

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-md focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative h-6 w-8">
          <motion.span
            className="absolute left-0 top-0 h-0.5 w-8 bg-white"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-0 top-2.5 h-0.5 w-8 bg-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-0 top-5 h-0.5 w-8 bg-white"
            animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </button>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <nav className="flex flex-col items-center space-y-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-3xl font-bold tracking-wide transition-colors hover:text-primary ${
                        pathname === item.href ? "text-primary" : "text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  GET STARTED
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

