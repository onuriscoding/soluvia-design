"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronUp, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/i18nContext";
import { LanguageSwitcher } from "./language-switcher";

// Helper hook to localize URLs
const useLocalizedUrl = () => {
  const { language } = useI18n();

  return (path: string) => {
    // Handle root path
    if (path === "/") {
      return `/${language}`;
    }

    // Handle other paths
    return `/${language}${path}`;
  };
};

const navItems = [
  {
    labelKey: "navigation.services",
    href: "/services",
    children: [
      {
        labelKey: "navigation.webDesign",
        href: "/services/web-design-development",
        descriptionKey: "navigation.webDesignDescription",
        price: "from 999€",
      },
      {
        labelKey: "navigation.aiAutomation",
        href: "/services/ai-solutions",
        descriptionKey: "navigation.aiAutomationDescription",
        price: "from 1499€",
      },
      {
        labelKey: "navigation.seoOptimization",
        href: "/services/seo-optimization",
        descriptionKey: "navigation.seoOptimizationDescription",
        price: "from 799€",
      },
      {
        labelKey: "navigation.allServices",
        href: "/services",
        descriptionKey: "navigation.allServicesDescription",
      },
    ],
  },

  { labelKey: "navigation.howItWorks", href: "/how-it-works" },
  { labelKey: "navigation.templates", href: "/templates" },
  { labelKey: "navigation.about", href: "/about" },
  { labelKey: "navigation.contact", href: "/contact" },
];

export function EnhancedNavigationBar() {
  // State
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [navWidth, setNavWidth] = useState(0);
  const { t } = useI18n();
  const localizeUrl = useLocalizedUrl();

  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Memoized scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollY =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    setScrolled(scrollY > 10);
  }, []);

  // Handle scroll detection with throttling
  useEffect(() => {
    let ticking = false;

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScroll]);

  // Get navigation bar width for mobile menu sizing - optimized
  useEffect(() => {
    if (!navRef.current) return;

    const updateNavWidth = () => {
      if (navRef.current) {
        setNavWidth(navRef.current.offsetWidth);
      }
    };

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(updateNavWidth);
    resizeObserver.observe(navRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle clicks outside the menu to close it - optimized
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const toggleButton = document.getElementById("mobile-menu-toggle");
        if (!toggleButton?.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open - optimized
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setActiveMobileItem(null);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Memoized toggle functions for better performance
  const toggleMobileDropdown = useCallback(
    (label: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setActiveMobileItem((prev) => (prev === label ? null : label));
    },
    []
  );

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Memoized mobile menu items to prevent unnecessary re-renders
  const mobileMenuItems = useMemo(
    () => (
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <motion.li
            key={item.labelKey}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className={`${index < navItems.length - 1 ? "border-b border-ivory/10 pb-4" : ""}`}
          >
            {item.children ? (
              <div>
                <motion.button
                  onClick={(e) => toggleMobileDropdown(item.labelKey, e)}
                  className="flex items-center text-2xl font-semibold tracking-tight text-ivory hover:text-rose transition-colors w-full"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={localizeUrl(item.href!)}
                    className="relative inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t(item.labelKey)}
                  </Link>

                  <div className="ml-2 w-4 h-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {activeMobileItem === item.labelKey ? (
                        <motion.div
                          key="chevron"
                          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                          animate={{ opacity: 1, scale: 1, rotate: 180 }}
                          exit={{ opacity: 0, scale: 0.5, rotate: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-4 h-4"
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
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {activeMobileItem === item.labelKey && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeOut" },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden mt-3 pl-4 space-y-2"
                    >
                      {item.children.map((child, childIndex) => (
                        <motion.div
                          key={child.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: childIndex * 0.05,
                          }}
                        >
                          <Link
                            href={localizeUrl(child.href)}
                            onClick={closeMobileMenu}
                            className="block p-2 rounded-lg hover:bg-ivory/5 transition-colors"
                          >
                            <div className="font-medium text-ivory text-lg mb-1 hover:text-rose transition-colors">
                              {t(child.labelKey)}
                            </div>
                            {"descriptionKey" in child && (
                              <div className="text-sm text-ivory/70">
                                {t(child.descriptionKey)}
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={localizeUrl(item.href!)}
                  onClick={closeMobileMenu}
                  className="block text-2xl font-semibold tracking-tight text-ivory hover:text-rose transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              </motion.div>
            )}
          </motion.li>
        ))}
      </ul>
    ),
    [activeMobileItem, t, localizeUrl, toggleMobileDropdown, closeMobileMenu]
  );

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
              href={localizeUrl("/")}
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
                <div key={item.labelKey} className="relative group">
                  {item.children ? (
                    <>
                      <div className="flex items-center text-ivory/90 hover:text-ivory transition-colors font-ivory font-semibold tracking-tight py-2 relative cursor-pointer">
                        <Link
                          href={localizeUrl(item.href!)}
                          className="relative inline-block"
                        >
                          {t(item.labelKey)}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ivory group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <div className="ml-1 w-4 h-4 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose group-hover:hidden transition-all duration-300" />
                          <ChevronUp className="h-4 w-4 hidden group-hover:block transition-all duration-300 transform group-hover:rotate-180" />
                        </div>
                      </div>

                      {/* Desktop Dropdown (Hover-based) */}
                      <div className="absolute left-1/2 -translate-x-1/2 mt-4 py-6 bg-ivory/90 rounded-xl border border-ivory/10 shadow-xl overflow-hidden min-w-[600px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="grid grid-cols-2 gap-6 p-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={localizeUrl(child.href)}
                              className="group p-4 rounded-lg hover:bg-[#2b2d42]/5 transition-colors"
                            >
                              <div className="font-bold tracking-tight text-ivory mb-1 group-hover:text-rose transition-colors">
                                {t(child.labelKey)}
                              </div>
                              {"descriptionKey" in child && (
                                <div className="text-sm font-medium text-[#2b2d42]/100 mb-2">
                                  {t(child.descriptionKey)}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={localizeUrl(item.href!)}
                      className="text-ivory/90 hover:text-ivory transition-colors font-inter font-semibold tracking-wide py-2 relative group"
                    >
                      <span className="relative inline-block">
                        {t(item.labelKey)}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ivory group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher variant="minimal" className="mr-2" />
              <div className="relative overflow-hidden rounded-full">
                <Link
                  href={localizeUrl("/contact")}
                  className="group relative z-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-ivory/90 px-6 py-2.5 text-sm font-bold tracking-tighter text-rose transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-charcoal">
                    {t("navigation.getStarted")}
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button - Optimized with light animations */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-rose shadow-md shadow-rose/20"
                animate={{
                  scale: mobileMenuOpen ? 0.8 : 1,
                  opacity: mobileMenuOpen ? 0.7 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
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

      {/* Mobile Navigation Menu - Optimized with beautiful animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm pointer-events-auto lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile menu */}
            <div className="absolute top-full left-0 right-0 z-40 flex justify-center px-4 lg:hidden">
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="w-full bg-charcoal/20 max-w-[calc(100%-2rem)] overflow-hidden flex flex-col pointer-events-auto rounded-2xl border border-ivory/10 origin-top mt-2 max-h-[80vh]"
                style={{
                  width: navWidth > 0 ? `${navWidth}px` : "calc(100% - 2rem)",
                  backdropFilter: "blur(12px)",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Close button */}
                <div className="absolute top-4 right-4 z-50">
                  <motion.button
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-transparent text-ivory/70 hover:text-ivory transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Language Switcher */}
                <div className="w-full flex justify-center py-4 border-b border-ivory/10 bg-transparent">
                  <LanguageSwitcher variant="pill" className="shadow-lg" />
                </div>

                {/* Menu items */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <nav className="p-6 pt-6">{mobileMenuItems}</nav>
                </div>

                {/* Footer with CTA button */}
                <div className="p-6 border-t border-ivory/10">
                  <Link
                    href={localizeUrl("/contact")}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center w-full rounded-full bg-ivory/90 px-6 py-3 text-xl font-bold tracking-tighter text-rose"
                  >
                    <span className="mr-2">{t("navigation.getStarted")}</span>
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
