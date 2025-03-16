"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { EnhancedHamburgerMenu } from "./enhanced-hamburger-menu"

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/how-it-works", label: "OUR PROCESS" },
  { href: "/about", label: "ABOUT US" },
  { href: "/portfolio", label: "PORTFOLIO" },
]

export function EnhancedSiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-charcoal/80 backdrop-blur-md py-4 shadow-lg shadow-black/10" : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="relative h-10 w-10 overflow-hidden rounded-full border border-ivory/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-ivory">S</div>
          </motion.div>
          <motion.span
            className="text-xl font-bold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-rose">Soluvia</span>
            <span className="text-ivory">Design</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:text-rose ${
                pathname === item.href ? "text-rose" : "text-ivory/80"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-rose to-sapphire"
                  layoutId="navunderline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="overflow-hidden rounded-full">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-rose px-6 py-2 text-sm font-medium text-ivory transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10">GET STARTED</span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <EnhancedHamburgerMenu />
        </div>
      </div>
    </header>
  )
}

