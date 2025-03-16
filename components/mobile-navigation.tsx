"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

interface NavItem {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

interface MobileNavigationProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  items: NavItem[]
}

export function MobileNavigation({ isOpen, setIsOpen, items }: MobileNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={() => setIsOpen(false)}
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
              {items.map((item) => (
                <div key={item.label} className="py-1">
                  {item.children ? (
                    <div className="mb-2">
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="flex w-full items-center justify-between py-2 text-lg font-medium text-ivory"
                      >
                        {item.label}
                        <motion.div
                          animate={{ rotate: expandedItems.includes(item.label) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-ivory/70" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.label) && (
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
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center py-2 text-ivory/70 hover:text-rose transition-colors"
                                >
                                  <ArrowRight className="mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
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
                      onClick={() => setIsOpen(false)}
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
                  onClick={() => setIsOpen(false)}
                  className="group relative overflow-hidden flex items-center justify-center w-full rounded-full bg-gradient-to-r from-rose to-sapphire py-3 text-base font-medium text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                >
                  GET STARTED
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

