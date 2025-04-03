"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { ArrowRight, MousePointer, ChevronDown } from "lucide-react";
import { RotatingText } from "@/app/animations/rotating-text";
import GradientText from "@/app/animations/gradient-text";

export function RedesignedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef);
  const controls = useAnimation();
  const [rotatingText, setRotatingText] = useState("Designs");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    // More stable scroll configuration for Safari
    layoutEffect: false
  });

  // Add a custom damped scroll value for smoother animations
  const dampedScroll = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001
  });

  // Use the dampedScroll for transforms
  const opacity = useTransform(dampedScroll, [0, 0.5], [1, 0]);
  const scale = useTransform(dampedScroll, [0, 0.5], [1, 0.95]);
  const y = useTransform(dampedScroll, [0, 0.5], [0, 30]);

  // Parallax effect for floating elements
  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -550]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const parallax4 = useTransform(scrollYProgress, [0, 1], [0, -520]);

  useEffect(() => {
    // Staggered animation sequence
    const sequence = async () => {
      await controls.start("visible");
    };
    sequence();
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((current) => (current === "Designs" ? "AI" : "DESIGNS"));
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ maxWidth: '100vw', overflowX: 'hidden' }}
    >
      {/* Particles */}
      <div className="absolute inset-0 w-full overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-rose/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              willChange: "transform",
              transform: "translate3d(0,0,0)",
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: [0.4, 0, 0.2, 1], // Custom easing that's more Safari-friendly
              type: "tween",
            }}
          />
        ))}
      </div>

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
        className="container relative z-10 flex flex-col items-center justify-center min-h-screen"
        style={{
          opacity,
          scale,
          y,
          maxWidth: '100vw',
          overflow: 'hidden',
          // Add Safari-specific properties for better handling of inertia
          WebkitOverflowScrolling: 'touch',
          transform: 'translate3d(0,0,0)', // Force GPU acceleration
          backfaceVisibility: 'hidden', // Prevent artifacts
          paddingTop: '0',
          paddingBottom: '0',
          // Ensure vertical centering
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="text-center px-4">
          <motion.h1
            className="mx-auto max-w-4xl text-5xl font-ivory font-bold tracking-tight text-ivory md:text-[9rem]"
            variants={itemVariants}
          >
            <span className="block leading-tight">Solutions via</span>
            <div className="relative flex items-center justify-center py-0">
              <RotatingText
                texts={["Designs", "AI"]}
                interval={3000}
                textClassName="inline-block"
                className="flex items-center justify-center"
                renderText={(text) => (
                  <GradientText
                    colors={[
                      "#3d5a80",
                      "#b76e79",
                      "#e0d5c0",
                      "#3d5a80",
                      "#b76e79",
                      "#3d5a80",
                    ]}
                    animationSpeed={12}
                    showBorder={false}
                    className="inline-block leading-tight"
                  >
                    {text}
                  </GradientText>
                )}
              />
            </div>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 font-inter text-lg max-w-3xl text-medium text-ivory/70 md:text-2xl"
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
              className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-6 py-3 text-ivory font-bold tracking-thighter shadow-lg transition-all duration-300 hover:shadow-rose/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 flex items-center">
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 px-6 py-3 text-ivory font-bold tracking-thighter backdrop-blur-sm transition-all duration-300 hover:bg-charcoal/70 hover:shadow-lg"
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
        style={{ zIndex: 20 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
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
