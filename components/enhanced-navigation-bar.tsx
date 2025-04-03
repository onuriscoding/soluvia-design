"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronUp, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "SERVICES",
    href: "/services",
    children: [
      {
        label: "WEB DESIGN & DEVELOPMENT",
        href: "/services/web-design-development",
        description:
          "Custom website design and development tailored to your brand",
        price: "from 699€",
      },
      {
        label: "AI AUTOMATION",
        href: "/services/ai-automation",
        description: "Automate repetitive tasks and streamline your workflow",
        price: "from 1499€",
      },
      {
        label: "SEO OPTIMIZATION",
        href: "/services/seo-optimization",
        description: "Improve your visibility in search engines",
        price: "from 499€",
      },
      {
        label: "ALL SERVICES",
        href: "/services",
        description: "Explore our complete range of digital services",
      },
    ],
  },

  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export function EnhancedNavigationBar() {
  // State
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [navWidth, setNavWidth] = useState(0);

  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Force check with the raw value
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(scrollY > 10);
    };

    // Initial check on mount
    handleScroll();

    // More frequent checks with passive event for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fallback with requestAnimationFrame for mobile
    let rafId: number;

    const pollScrollPosition = () => {
      handleScroll();
      rafId = requestAnimationFrame(pollScrollPosition);
    };

    // Start polling on mobile devices
    if (window.innerWidth < 768) {
      rafId = requestAnimationFrame(pollScrollPosition);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Get navigation bar width for mobile menu sizing
  useEffect(() => {
    if (navRef.current) {
      const updateNavWidth = () => {
        if (navRef.current) {
          setNavWidth(navRef.current.offsetWidth);
        }
      };

      // Initial measurement
      updateNavWidth();

      // Update on resize
      window.addEventListener("resize", updateNavWidth);
      return () => window.removeEventListener("resize", updateNavWidth);
    }
  }, [navRef, mobileMenuOpen]);

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
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 md:mt-0 mt-4"
      ref={headerRef}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`${
            scrolled || mobileMenuOpen
              ? "bg-charcoal/20 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          } transition-all duration-500 rounded-full border border-ivory/10`}
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
                        x: logoHovered ? "calc(100% * 13.4)" : "7px",
                        y: logoHovered ? "calc(100% * -0.5)" : "-6px",
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
                      <div className="flex items-center text-ivory/90 hover:text-ivory transition-colors font-ivory font-semibold tracking-tight py-2 relative cursor-pointer">
                        <Link
                          href={item.href!}
                          className="relative inline-block"
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <div className="ml-1 w-4 h-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose group-hover:hidden transition-all duration-300" />
                          <ChevronUp className="h-4 w-4 hidden group-hover:block transition-all duration-300 transform group-hover:rotate-180" />
                        </div>
                      </div>

                      {/* Desktop Dropdown (Hover-based) */}
                      <div className="absolute left-1/2 -translate-x-1/2 mt-4 py-6 bg-[#2b2d42]/95 rounded-xl border border-ivory/10 shadow-xl overflow-hidden min-w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="grid grid-cols-2 gap-6 p-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group p-4 rounded-lg hover:bg-ivory/5 transition-colors"
                            >
                              <div className="font-ivory tracking-tight text-ivory mb-1 group-hover:text-rose transition-colors">
                                {child.label}
                              </div>
                              {"description" in child && (
                                <div className="text-sm font-thin text-ivory/70 mb-2">
                                  {child.description}
                                </div>
                              )}
                              {"price" in child && child.price && (
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
                className="group relative overflow-hidden rounded-full bg-rose px-6 py-2.5 text-sm font-bold tracking-tighter text-ivory transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10">GET STARTED</span>
              </Link>
            </div>

            {/* Mobile Menu Button - Pink dot */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Pink dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: mobileMenuOpen ? 0.85 : 1,
                  opacity: mobileMenuOpen ? 0.8 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-3 h-3 rounded-full bg-rose shadow-md shadow-rose/20" />
              </motion.div>

              {/* X icon that appears when menu is open */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-ivory"
                  >
                    <X className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Sized to match navigation bar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm pointer-events-auto lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile menu sized to match navigation bar */}
            <div className="absolute top-full left-0 right-0 z-40 flex justify-center px-4 lg:hidden">
              <motion.div
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                  opacity: { duration: 0.3 },
                }}
                className="w-full bg-charcoal/20 max-w-[calc(100%-2rem)] overflow-hidden flex flex-col pointer-events-auto rounded-2xl border border-ivory/10 origin-top mt-2 max-h-[80vh]"
                style={{
                  width: navWidth > 0 ? `${navWidth}px` : "calc(100% - 2rem)",

                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Close button at top right */}
                <div className="absolute top-4 right-4 z-50">
                  <motion.button
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center h-8 w-8 rounded-full text-ivory/70 hover:text-ivory transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Menu items */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <nav className="p-6 pt-12">
                    <ul className="space-y-6">
                      {navItems.map((item, index) => (
                        <li
                          key={item.label}
                          className={`${
                            index < navItems.length - 1
                              ? "border-b border-ivory/10 pb-6"
                              : ""
                          }`}
                        >
                          {item.children ? (
                            <div>
                              {/* SERVICES with dropdown */}
                              <motion.button
                                onClick={(e) =>
                                  toggleMobileDropdown(item.label, e)
                                }
                                className="flex items-center text-3xl font-semibold tracking-thigh text-ivory hover:text-rose transition-colors relative group w-full"
                                whileHover={{
                                  x: 5,
                                  transition: { duration: 0.2 },
                                }}
                              >
                                {/* Text with hover underline animation */}
                                <Link
                                  href={item.href!}
                                  className="relative inline-block"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.label}
                                  <motion.span
                                    className="absolute -bottom-1 left-0 h-0.5 bg-rose"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </Link>

                                <div className="ml-2 w-4 h-4 flex items-center justify-center">
                                  {/* Dot that transforms to chevron, just like desktop */}
                                  <AnimatePresence mode="wait">
                                    {activeMobileItem === item.label ? (
                                      <motion.div
                                        key="chevron"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                          opacity: 1,
                                          scale: 1,
                                          rotate: 180,
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        whileHover={{ scale: 1.1 }}
                                      >
                                        <ChevronUp className="h-4 w-4 text-rose" />
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        key="dot"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-1.5 h-1.5 rounded-full bg-rose"
                                        whileHover={{
                                          scale: 1.3,
                                          boxShadow:
                                            "0 0 8px rgba(255, 107, 107, 0.6)",
                                        }}
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.button>

                              <AnimatePresence initial={false}>
                                {activeMobileItem === item.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                      height: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                      },
                                      opacity: { duration: 0.2 },
                                    }}
                                    className="overflow-visible mt-4 pl-4"
                                  >
                                    {/* Detailed sub-elements like desktop */}
                                    <div className="grid grid-cols-1 gap-4">
                                      {item.children.map((child) => (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={closeMobileMenu}
                                          className="p-3 rounded-lg hover:bg-ivory/5 transition-colors border border-ivory/5"
                                        >
                                          <div className="font-ivory tracking-wide text-ivory text-xl mb-1 hover:text-rose transition-colors">
                                            {child.label}
                                          </div>
                                          {"description" in child && (
                                            <div className="text-sm font-thin text-ivory/70 mb-2">
                                              {child.description}
                                            </div>
                                          )}
                                          {"price" in child && child.price && (
                                            <div className="text-sm font-bold font-inter tracking-wide text-rose">
                                              <span className="opacity-70 font-normal text-sm">
                                                from{" "}
                                              </span>
                                              <span className="text-lg font-inter text-ivory">
                                                {child.price.replace(
                                                  "from ",
                                                  ""
                                                )}
                                              </span>
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            // Other navigation items with consistent hover animations
                            <motion.div
                              whileHover={{
                                x: 5,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <Link
                                href={item.href!}
                                onClick={closeMobileMenu}
                                className="relative inline-block text-3xl font-semibold tracking-tighter text-ivory hover:text-rose transition-colors"
                              >
                                <span className="relative inline-block">
                                  {item.label}
                                  <motion.span
                                    className="absolute -bottom-1 left-0 h-0.5 bg-rose"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                  />
                                </span>
                              </Link>
                            </motion.div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Footer with CTA button */}
                <div className="p-6 border-t border-ivory/10">
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center w-full rounded-full bg-rose px-6 py-3 text-xl font-bold tracking-tighter text-ivory"
                  >
                    <span className="mr-2">GET STARTED</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
