"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { HamburgerMenu } from "./hamburger-menu"

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/how-it-works", label: "HOW IT WORKS" },
  { href: "/about", label: "ABOUT US" },
  { href: "/resources", label: "RESOURCES" },
]

export function SiteHeader() {
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">
            soluvia<span className="text-primary">design</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-white/80"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                  layoutId="navunderline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              GET STARTED
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  )
}

