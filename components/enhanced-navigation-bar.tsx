"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronUp, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  {
    label: "SERVICES",
    children: [
      {
        label: "WEB DESIGN",
        href: "/services/web-design",
        description: "Custom website design tailored to your brand",
        price: "from 1299€",
      },
      {
        label: "AI AUTOMATION",
        href: "/services/ai-automation",
        description: "Automate repetitive tasks and streamline your workflow",
        price: "from 1899€",
      },
      {
        label: "SEO OPTIMIZATION",
        href: "/services/seo-optimization",
        description: "Improve your visibility in search engines",
        price: "from 899€",
      },
      {
        label: "WEB DEVELOPMENT",
        href: "/services/web-development",
        description: "Custom web applications and functionality",
        price: "from 2499€",
      },
    ],
  },

  { label: "OUR PROCESS", href: "/how-it-works" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export function EnhancedNavigationBar() {
  // State
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        // Only close if clicking outside the menu and not on the toggle button
        const toggleButton = document.getElementById("mobile-menu-toggle");
        if (!toggleButton?.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset active item when menu closes
      setActiveMobileItem(null);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (label: string, event: React.MouseEvent) => {
    // Prevent event from bubbling up
    event.stopPropagation();
    setActiveMobileItem((prev) => (prev === label ? null : label));
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <div className="mx-auto max-w-7xl">
        <div
          className={`${
            scrolled
              ? "bg-charcoal/10 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          } transition-all duration-300 rounded-full border border-ivory/10`}
          ref={navRef}
        >
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center z-10 w-[120px]"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className="relative flex items-center w-full">
                <motion.div
                  className="flex items-center font-anton text-4xl tracking-[-0.05em] relative"
                  animate={{
                    width: logoHovered ? "auto" : "1.5em",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-white relative">
                    s
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-rose absolute -bottom-0.5 right-0 translate-x-0 "
                      animate={{
                        x: logoHovered ? "calc(100% * 13.5)" : "7px",
                        y: logoHovered ? "calc(100% * -0.5)" : "-4px",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </span>
                  <motion.span
                    className="text-white overflow-hidden whitespace-nowrap"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: logoHovered ? "auto" : 0,
                      opacity: logoHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      marginLeft: "-0.05em",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    oluvia
                  </motion.span>
                </motion.div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <div className="flex items-center text-ivory/90 hover:text-ivory transition-colors font-inter font-semibold tracking-wide py-2 relative cursor-pointer">
                        <span className="relative inline-block">
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <div className="ml-1 w-4 h-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose group-hover:hidden transition-all duration-300" />
                          <ChevronUp className="h-4 w-4 hidden group-hover:block transition-all duration-300 transform group-hover:rotate-180" />
                        </div>
                      </div>

                      {/* Desktop Dropdown (Hover-based) */}
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 py-6 bg-charcoal/60 backdrop-blur-md rounded-xl border border-ivory/10 shadow-xl overflow-hidden min-w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-sapphire/5 z-0"></div>
                        <div className="grid grid-cols-2 gap-6 p-4 relative z-10">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group p-4 rounded-lg hover:bg-ivory/5 transition-colors"
                            >
                              <div className="font-inter tracking-wide text-ivory mb-1 group-hover:text-rose transition-colors">
                                {child.label}
                              </div>
                              {"description" in child && (
                                <div className="text-sm font-thin text-ivory/70 mb-2">
                                  {child.description}
                                </div>
                              )}
                              {"price" in child && (
                                <div className="text-sm font-bold font-inter tracking-wide text-rose">
                                  <span className="opacity-70 font-normal text-sm">
                                    from{" "}
                                  </span>
                                  <span className="text-lg font-inter text-ivory">
                                    {child.price.replace("from ", "")}
                                  </span>
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="text-ivory/90 hover:text-ivory transition-colors font-inter font-semibold tracking-wide py-2 relative group"
                    >
                      <span className="relative inline-block">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-full bg-rose px-6 py-2.5 text-sm font-anton tracking-wide text-ivory transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10">GET STARTED</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full bg-charcoal/50 text-ivory border border-ivory/10 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: mobileMenuOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: mobileMenuOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />

            {/* Menu panel - Updated background to match website color */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-charcoal shadow-xl overflow-hidden flex flex-col"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(43, 45, 66, 0.98), rgba(43, 45, 66, 0.95))",
              }}
            >
              {/* Subtle background accents */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full opacity-5">
                  <div className="absolute top-1/4 -left-20 h-40 w-40 rounded-full bg-rose/20 blur-3xl"></div>
                  <div className="absolute bottom-1/4 -right-20 h-60 w-60 rounded-full bg-sapphire/20 blur-3xl"></div>
                </div>
              </div>

              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-ivory/10 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={closeMobileMenu}
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src="/soluvia-s-no-bg.png"
                      alt="Soluvia Design Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Full logo with slide animation */}
                  <div className="overflow-hidden h-10 w-32">
                    <motion.div
                      className="relative h-full w-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: logoHovered ? 1 : 0,
                        x: logoHovered ? 0 : -20,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Image
                        src="/soluvia-no-bg.png"
                        alt="Soluvia Design"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>
                </Link>

                <motion.button
                  onClick={closeMobileMenu}
                  className="rounded-full bg-rose/10 text-rose border border-rose/20 h-10 w-10 flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(183, 110, 121, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto relative z-10">
                <motion.nav
                  className="p-6 space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.07,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="border-b border-ivory/10 pb-6"
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                            delay: index * 0.05,
                          },
                        },
                      }}
                    >
                      {item.children ? (
                        <div>
                          <motion.button
                            onClick={(e) => toggleMobileDropdown(item.label, e)}
                            className="flex w-full items-center justify-between text-2xl font-anton tracking-wide text-ivory relative"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="relative">
                              {item.label}
                              {/* Animated underline */}
                              <motion.span
                                className="absolute -bottom-1 left-0 h-0.5 bg-rose"
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    activeMobileItem === item.label
                                      ? "100%"
                                      : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            </span>
                            <motion.div
                              animate={{
                                rotate:
                                  activeMobileItem === item.label ? 180 : 0,
                                color:
                                  activeMobileItem === item.label
                                    ? "#b76e79"
                                    : "#f8f4f1",
                              }}
                              transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 200,
                              }}
                            >
                              <div className="ml-1 w-4 h-4 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose group-hover:hidden transition-all duration-300" />
                                <ChevronUp className="h-4 w-4 hidden group-hover:block transition-all duration-300 transform group-hover:rotate-180" />
                              </div>
                            </motion.div>
                          </motion.button>

                          <AnimatePresence initial={false}>
                            {activeMobileItem === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  transition: {
                                    height: {
                                      duration: 0.3,
                                      type: "spring",
                                      stiffness: 100,
                                      damping: 20,
                                    },
                                    opacity: { duration: 0.2, delay: 0.1 },
                                  },
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                  transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2 },
                                  },
                                }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 pl-4 border-l border-rose/30 space-y-4">
                                  {item.children.map((child, childIndex) => (
                                    <motion.div
                                      key={child.href}
                                      initial={{ x: -10, opacity: 0 }}
                                      animate={{
                                        x: 0,
                                        opacity: 1,
                                        transition: {
                                          delay: childIndex * 0.05 + 0.1,
                                          type: "spring",
                                          stiffness: 300,
                                          damping: 24,
                                        },
                                      }}
                                    >
                                      <Link
                                        href={child.href}
                                        onClick={closeMobileMenu}
                                        className="block py-2 text-ivory/80 hover:text-rose transition-colors group"
                                      >
                                        <div className="flex items-center">
                                          <motion.div
                                            className="mr-2 opacity-0"
                                            initial={{ x: -5, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                              delay: childIndex * 0.05 + 0.2,
                                            }}
                                          >
                                            <ArrowRight className="h-4 w-4 text-rose" />
                                          </motion.div>
                                          <span className="text-lg relative">
                                            {child.label}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300"></span>
                                          </span>
                                        </div>
                                        {"description" in child && (
                                          <div className="text-sm text-ivory/60 mt-1 ml-6">
                                            {child.description}
                                          </div>
                                        )}
                                        {"price" in child && (
                                          <div className="text-sm font-bold font-inter tracking-wide text-rose mt-1 ml-6">
                                            <span className="opacity-70 font-normal text-sm">
                                              from{" "}
                                            </span>
                                            <span className="text-xl font-anton tracking-wider">
                                              {child.price.replace("from ", "")}
                                            </span>
                                          </div>
                                        )}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={item.href!}
                            onClick={closeMobileMenu}
                            className="block text-2xl font-anton tracking-wide text-ivory hover:text-rose transition-colors relative group"
                          >
                            <span className="relative">
                              {item.label}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300"></span>
                            </span>
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.nav>
              </div>

              {/* Footer with enhanced CTA button - Removed white shine animation */}
              <motion.div
                className="p-6 border-t border-ivory/10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden rounded-full"
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-rose/30 to-sapphire/30 blur-md"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center w-full rounded-full bg-gradient-to-r from-rose to-sapphire py-4 text-base font-anton tracking-wide text-ivory relative z-10 group"
                  >
                    <span className="mr-2">GET STARTED</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
