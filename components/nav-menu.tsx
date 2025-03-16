"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
]

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Toggle body scroll
    document.body.style.overflow = isOpen ? "unset" : "hidden"
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className="relative z-50 h-12 w-12 rounded-full bg-black p-2 text-white"
        aria-label="Toggle menu"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-current transition-colors"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6 bg-current transition-colors"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 bg-current transition-colors"
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <nav className="container flex h-full flex-col items-center justify-center">
              <ul className="space-y-6 text-center">
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={`text-4xl font-bold transition-colors hover:text-neutral-500 ${
                        pathname === item.href ? "text-neutral-500" : "text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

