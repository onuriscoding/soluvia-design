"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18nContext";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  AnimatePresence,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, MousePointer, ChevronDown } from "lucide-react";
import { RotatingText } from "@/app/animations/rotating-text";
import GradientText from "@/app/animations/gradient-text";

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

export function RedesignedHeroSection({ dictionary }: { dictionary: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef);
  const controls = useAnimation();
  const [rotatingText, setRotatingText] = useState("Designs");
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();
  const localizeUrl = useLocalizedUrl();
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start 5%", "end start"] : ["start start", "end start"],
  });

  // Transform values with different configurations for mobile
  const rawOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.7] : [0, 0.4, 0.6],
    isMobile ? [1, 1, 0] : [1, 0.6, 0]
  );

  const rawScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.7] : [0, 0.4, 0.6],
    isMobile ? [1, 0.95, 0.9] : [1, 0.9, 0.85]
  );

  const rawY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.7] : [0, 0.4, 0.6],
    isMobile ? [0, 20, 40] : [0, 30, 60]
  );

  // Apply spring physics for smoother animations
  const opacity = useSpring(rawOpacity, {
    stiffness: isMobile ? 50 : 80,
    damping: isMobile ? 15 : 20,
    mass: 0.8,
  });

  const scale = useSpring(rawScale, {
    stiffness: isMobile ? 50 : 80,
    damping: isMobile ? 15 : 20,
    mass: 0.8,
  });

  const y = useSpring(rawY, {
    stiffness: isMobile ? 50 : 80,
    damping: isMobile ? 15 : 20,
    mass: 0.8,
  });

  // Parallax effect for floating elements with improved dynamics
  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const parallax4 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  useEffect(() => {
    // For Safari iOS - ensures scroll animations work with passive listeners
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    ) {
      window.addEventListener(
        "scroll",
        () => {
          window.dispatchEvent(new CustomEvent("resize"));
        },
        { passive: true }
      );
    }

    // Staggered animation sequence
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((current) => (current === "Designs" ? "AI" : "DESIGNS"));
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optimized animation variants with adaptive timings based on device
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.1,
        delayChildren: isMobile ? 0.2 : 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* Floating website examples - Temporarily disabled */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-20 h-64 w-80 rotate-[-8deg] overflow-hidden rounded-lg  border-ivory/10 shadow-lg md:left-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y: parallax1 }}
        >
          <div className="floating-element-slow glass-effect h-full w-full">
            <Image
              src="/www.md-cars.be_ (2).png?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute -right-20 top-40 h-72 w-96 rotate-[5deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ y: parallax2 }}
        >
          <div className="floating-element glass-effect h-full w-full">
            <Image
              src="/www.md-cars.be_ (2).png?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -left-10 h-64 w-80 rotate-[10deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:left-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ y: parallax3 }}
        >
          <div className="floating-element-fast glass-effect h-full w-full">
            <Image
              src="/www.md-cars.be_ (2).png?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-96 rotate-[-6deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ y: parallax4 }}
        >
          <div className="floating-element glass-effect h-full w-full">
            <Image
              src="/www.md-cars.be_ (2).png?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
          </div>
        </motion.div>
      </div> */}

      <motion.div
        ref={scrollRef}
        className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20"
        style={{
          opacity,
          scale,
          y,
          willChange: "transform, opacity",
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="text-center">
          <motion.div
            className="relative mb-6 inline-block"
            variants={itemVariants}
          >
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose via-sapphire to-rose opacity-75 blur-lg"
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.7, 0.85, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.h1
            className="mx-auto max-w-4xl text-5xl -mt-10 md:-mt-6 font-ivory font-bold tracking-tight text-ivory md:text-[9rem]"
            variants={itemVariants}
          >
            <span className="block leading-tight">Solutions via</span>
            <div className="relative flex items-center justify-center md:-mt-6 py-0">
              <RotatingText
                texts={["Designs", dictionary.hero.rotatingText2]}
                interval={3000}
                textClassName="inline-block"
                className="flex items-center justify-center"
                renderText={(text) => (
                  <GradientText
                    colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                    animationSpeed={12}
                    showBorder={false}
                    className="inline-block leading-tight"
                    aria-label={`Soluvia ${text} - Creative Digital Solutions`}
                  >
                    {text}
                  </GradientText>
                )}
              />
            </div>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 font-inter text-lg max-w-3xl text-medium text-ivory/90 md:text-2xl"
            variants={itemVariants}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link
              href={localizeUrl("/contact")}
              className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-ivory/90 px-6 py-3 text-rose font-bold tracking-thighter hover:text-charcoal shadow-lg transition-all duration-300 hover:shadow-rose/30"
            >
              <span className="relative z-10 flex items-center">
                {dictionary.navigation.getStarted}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href={localizeUrl("/how-it-works")}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-ivory/30 bg-transparent px-6 py-3 text-ivory font-bold tracking-thighter transition-all duration-300 hover:bg-ivory/10"
            >
              {dictionary.navigation.ourProcess}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
          <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
        </motion.div>
      </motion.div>
    </section>
  );
}
