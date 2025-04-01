"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Lightbulb,
  MessageSquare,
  Code,
  Rocket,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import Orb from "@/components/orb";

export default function HowItWorksClient() {
  const heroRef = useRef(null);
  const processStepsRef = useRef(null);
  const approachRef = useRef(null);
  const ctaRef = useRef(null);

  const isProcessStepsInView = useInView(processStepsRef, { once: true, amount: 0.2 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Direct transform without spring for consistent behavior with other pages
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Animated particles for hero section
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Animated particles for CTA section
  const ctaParticles = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Optimized variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleScrollDown = () => {
    const processSection = document.getElementById("process-section");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: "Discovery",
      description: "We start by understanding your business, goals, and challenges through in-depth conversations and research.",
      icon: <Lightbulb className="h-8 w-8 text-rose" />,
      color: "from-rose to-sapphire",
    },
    {
      id: 2,
      title: "Strategy",
      description: "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives.",
      icon: <MessageSquare className="h-8 w-8 text-sapphire" />,
      color: "from-sapphire to-beige",
    },
    {
      id: 3,
      title: "Creation",
      description: "Our team combines human creativity with AI-enhanced tools to design and develop your digital solution.",
      icon: <Code className="h-8 w-8 text-beige" />,
      color: "from-beige to-rose",
    },
    {
      id: 4,
      title: "Launch & Growth",
      description: "We ensure a smooth deployment and provide ongoing support to help your digital presence evolve and grow.",
      icon: <Rocket className="h-8 w-8 text-rose" />,
      color: "from-rose to-sapphire",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="container relative z-10 px-4"
        >
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-8xl">
                How It{" "}
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
                  className="font-bold text-8xl"
                >
                  Works
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                A thoughtful journey from concept to completion, blending human creativity with AI-enhanced precision.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/50 cursor-pointer z-20 w-16 h-16 flex items-center justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleScrollDown}
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
          </div>
        </motion.div>
      </section>

      {/* Process Steps Section */}
      <section
        id="process-section"
        ref={processStepsRef}
        className="relative py-32 md:py-40"
      >
        <div className="container relative z-10">
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl text-center relative z-10 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessStepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 0.5,
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight mb-8 md:text-6xl">
              Our{" "}
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
                className="inline-block"
              >
                Process
              </GradientText>
            </h2>
            <p className="text-xl text-ivory/70 mt-4">
              A systematic approach to delivering exceptional digital solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessStepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 0.5,
                  delay: 0.1 * index,
                }}
              >
                <div className="absolute -top-3 -left-3 z-20">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-ivory text-xs font-bold`}>
                    {step.id}
                  </div>
                </div>
                
                <div className="relative h-full p-8 rounded-xl border border-ivory/10 backdrop-blur-md bg-charcoal/30 overflow-hidden group hover:shadow-lg hover:shadow-rose/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose/5 via-sapphire/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-gradient-to-r ${step.color} p-0.5`}>
                    <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-ivory">{step.title}</h3>
                  <p className="text-ivory/70">{step.description}</p>
                  
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[90px] -right-4 z-10">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="h-6 w-6 text-rose/70" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section 
        className="relative py-32 md:py-40" 
        ref={approachRef}
      >
        <div className="container relative z-10">
          <div className="absolute inset-0 z-0">
            <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
            <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl text-center relative z-10 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 0.5,
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight mb-8 md:text-6xl">
              Our{" "}
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
                className="inline-block"
              >
                Approach
              </GradientText>
            </h2>
            <p className="text-xl text-ivory/70 mt-4">
              What makes our process unique and effective
            </p>
          </motion.div>

          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div
              className="order-2 space-y-6 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isApproachInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                delay: 0.2,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ivory">Human-Centered</h3>
                    <p className="mt-2 text-ivory/70">
                      We prioritize human needs and experiences in every project. Our approach begins with empathy and understanding of your audience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-sapphire" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ivory">AI-Enhanced</h3>
                    <p className="mt-2 text-ivory/70">
                      We leverage cutting-edge AI tools to enhance efficiency, accuracy, and innovation without replacing the human creative touch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-beige" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ivory">Collaborative</h3>
                    <p className="mt-2 text-ivory/70">
                      We work closely with you throughout the process, ensuring your vision is reflected in every aspect of the final product.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-rose" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ivory">Iterative</h3>
                    <p className="mt-2 text-ivory/70">
                      We believe in constant refinement. Our process includes regular feedback loops and iterations to perfect the outcome.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isApproachInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                delay: 0.4,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-rose/20 via-sapphire/20 to-beige/20 opacity-70 blur-lg"></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory/10">
                  <Image
                    src="/ourstory.png"
                    alt="Our approach to digital solutions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-32 md:py-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-charcoal/80 backdrop-blur-sm border border-ivory/10 p-8 md:p-16">
            {/* Ambient glow effects */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-rose/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sapphire/20 blur-3xl"></div>
            
            {/* Animated particles */}
            {ctaParticles.map((particle) => (
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
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <h1 className="text-5xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl text-center">
                Ready to start your{" "}
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
                  className="inline-block"
                >
                  digital journey
                </GradientText>
                ?
              </h1>
            </div>
            
            <div className="relative z-10 md:mt-0 mt-28">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg md:text-2xl mt-4 text-ivory/70">
                  Let's work together to bring your vision to life with our proven process and approach.
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "600px",
                    position: "relative",
                  }}
                >
                  <div className="absolute inset-0 z-10">
                    <Orb
                      hoverIntensity={0.5}
                      rotateOnHover={true}
                      hue={0}
                      forceHoverState={false}
                    />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="flex flex-col items-center justify-center gap-4 pointer-events-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Link
                        href="/contact"
                        className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-6 py-3 text-base font-bold tracking-tight text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        <span className="relative z-10 flex items-center">
                          GET STARTED
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 