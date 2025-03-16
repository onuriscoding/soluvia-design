"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
} from "framer-motion";
import { ArrowRight, MousePointer, ChevronDown } from "lucide-react";

export function RedesignedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Parallax effect for floating elements
  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallax4 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    // Staggered animation sequence
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  // Animated particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  const handleScrollDown = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20"
    >
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-rose/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Floating website examples */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Top left example */}
        <motion.div
          className="absolute -left-20 top-20 h-64 w-80 rotate-[-8deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:left-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y: parallax1 }}
        >
          <div className="floating-element-slow glass-effect h-full w-full">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-blue"></span>
              <span className="text-xs font-medium text-ivory/80">
                Web Design
              </span>
            </div>
          </div>
        </motion.div>

        {/* Top right example */}
        <motion.div
          className="absolute -right-20 top-40 h-72 w-96 rotate-[5deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ y: parallax2 }}
        >
          <div className="floating-element glass-effect h-full w-full">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-pink"></span>
              <span className="text-xs font-medium text-ivory/80">
                E-commerce
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom left example */}
        <motion.div
          className="absolute -bottom-10 -left-10 h-64 w-80 rotate-[10deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:left-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ y: parallax3 }}
        >
          <div className="floating-element-fast glass-effect h-full w-full">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={320}
              height={256}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-green"></span>
              <span className="text-xs font-medium text-ivory/80">
                Portfolio
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom right example */}
        <motion.div
          className="absolute -bottom-20 -right-20 h-72 w-96 rotate-[-6deg] overflow-hidden rounded-lg border border-ivory/10 shadow-lg md:right-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ y: parallax4 }}
        >
          <div className="floating-element glass-effect h-full w-full">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Website example"
              width={384}
              height={288}
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="dot-indicator dot-purple"></span>
              <span className="text-xs font-medium text-ivory/80">
                Business
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={scrollRef}
        className="container relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20"
        style={{ opacity, scale, y }}
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
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-charcoal/80 backdrop-blur-sm border border-ivory/10">
              <MousePointer className="h-6 w-6 text-rose" />
            </div>
          </motion.div>

          <motion.h1
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-ivory sm:text-6xl md:text-7xl lg:text-8xl"
            variants={itemVariants}
          >
            Solutions via
            <br />
            <span className="text-gradient-soluvia">Designs</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70 md:text-xl"
            variants={itemVariants}
          >
            We create sophisticated, elegant websites that drive business growth
            and optimize your online presence. Experience luxury digital
            solutions tailored to your brand.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link
              href="/contact"
              className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-6 py-3 text-base font-medium text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center">
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 px-6 py-3 text-base font-medium text-ivory backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/70 hover:shadow-lg"
            >
              OUR PROCESS
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <ChevronDown className="h-8 w-8 text-ivory/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
