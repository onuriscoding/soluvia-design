"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Lightbulb,
  Code,
  Zap,
  Brain,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionTransition } from "@/components/section-transition";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import Orb from "@/components/orb";

export default function AboutPageClient() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const whyUsRef = useRef(null);
  const ctaRef = useRef(null);

  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 });
  const isWhyUsInView = useInView(whyUsRef, { once: true, amount: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Direct transform without spring for consistent behavior with service pages
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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
    const storySection = document.getElementById("story-section");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
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
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="container relative z-10 px-4 -mt-24"
        >
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-[9rem]">
                About{" "}
                <span className="inline-flex items-center relative">
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
                    className="font-anton lowercase text-6xl md:text-[8.5rem]"
                  >
                    soluvia
                  </GradientText>
                  <span
                    className="absolute w-3.5 h-3.5 bg-rose rounded-full"
                    style={{
                      bottom: "0.2rem",
                      right: "-1rem",
                    }}
                  ></span>
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                We blend human creativity with AI technology to create digital
                experiences that matter.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 -mt-24"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          onClick={handleScrollDown}
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
        >
          <div className="relative flex items-center justify-center -left-1/2 -mt-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory " />
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <SectionTransition>
        <div
          id="story-section"
          ref={storyRef}
          className="container relative py-32 md:py-40"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl text-center relative z-10 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
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
                Story
              </GradientText>
            </h2>
            <p className="text-xl text-ivory/70 mt-4">
              Where human creativity meets AI innovation
            </p>
          </motion.div>

          <div className="mt-4 grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              className="order-2 space-y-6 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                delay: 0.2,
              }}
            >
              <p className="text-lg text-ivory/80">
                Soluvia was founded with a vision to bridge the gap between
                human creativity and artificial intelligence. We believe that
                the future of design lies in this harmony – where human
                intuition and AI capabilities amplify each other.
              </p>
              <p className="text-lg text-ivory/80">
                Our approach combines the irreplaceable human touch – empathy,
                creativity, and strategic thinking – with the efficiency and
                analytical power of AI technologies. This unique blend allows us
                to deliver solutions that are both innovative and authentic.
              </p>
              <p className="text-lg text-ivory/80">
                Today, we're proud to work with clients across various
                industries, from startups to established enterprises, helping
                them achieve their goals through our human-driven, AI-enhanced
                creative process.
              </p>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
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
                    src="/our-story-2.png?height=600&width=800"
                    alt="Our journey"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      {/* Values Section - Enhanced version */}
      <SectionTransition>
        <div className="container relative py-32 md:py-40">
          <div className="absolute inset-0 z-0">
            <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
            <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl text-center relative z-10 mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 0.5,
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight mb-8 md:text-6xl">
              Our Core{" "}
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
                Values
              </GradientText>
            </h2>
            <p className="text-xl text-ivory/70 mt-4">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {[
              {
                title: "Human Creativity",
                description:
                  "We believe in the power of human creativity, intuition, and the emotional intelligence that only people can provide.",
                icon: <Lightbulb className="h-6 w-6" />,
              },
              {
                title: "AI Augmentation",
                description:
                  "We leverage AI technologies to enhance human capabilities, automate repetitive tasks, and provide data-driven insights.",
                icon: <Bot className="h-6 w-6" />,
              },
              {
                title: "Innovation",
                description:
                  "We constantly explore new ideas, technologies, and methodologies to deliver cutting-edge solutions for our clients.",
                icon: <Zap className="h-6 w-6" />,
              },
              {
                title: "Collaboration",
                description:
                  "We believe in the power of partnership – between humans and AI, as well as with our clients and within our team.",
                icon: <Brain className="h-6 w-6" />,
              },
              {
                title: "Excellence",
                description:
                  "We strive for excellence in everything we do, from design to implementation to client service.",
                icon: <Code className="h-6 w-6" />,
              },
              {
                title: "Adaptability",
                description:
                  "We embrace change and continuously evolve our approach to stay at the forefront of design and technology.",
                icon: <Zap className="h-6 w-6" />,
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                      mass: 0.5,
                    },
                  },
                }}
                className="group relative overflow-hidden rounded-xl border border-ivory/10 bg-charcoal/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-ivory/20 hover:shadow-lg hover:shadow-rose/5"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose/10 to-beige/10 transition-transform duration-500 group-hover:scale-150"></div>

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-rose group-hover:to-sapphire group-hover:text-ivory">
                    {value.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-ivory group-hover:text-rose transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-ivory/70">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionTransition>

      {/* Our Approach Section */}
      <SectionTransition>
        <div ref={whyUsRef} className="container relative py-32 md:py-40">
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl text-center relative z-10 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isWhyUsInView ? { opacity: 1, y: 0 } : {}}
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
              Human-driven creativity enhanced by AI technologies
            </p>
          </motion.div>

          <div className="mt-4 grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isWhyUsInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                delay: 0.2,
              }}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-rose/20 via-sapphire/20 to-beige/20 opacity-70 blur-lg"></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory/10">
                <Image
                  src="/our-approach.png?height=600&width=800"
                  alt="Human-AI collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={isWhyUsInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 0.5,
                delay: 0.4,
              }}
            >
              <div>
                <h3 className="text-2xl font-bold text-ivory">
                  The Human Element
                </h3>
                <p className="mt-3 text-lg text-ivory/80">
                  Our creative process begins with human insights, emotional
                  intelligence, and strategic thinking. We listen, empathize,
                  and understand your unique challenges before crafting
                  solutions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-ivory">
                  AI Enhancement
                </h3>
                <p className="mt-3 text-lg text-ivory/80">
                  We integrate AI technologies to augment our human
                  capabilities, analyze data patterns, automate repetitive
                  tasks, and unlock creative possibilities that wouldn't be
                  possible otherwise.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-ivory">
                  Balanced Harmony
                </h3>
                <p className="mt-3 text-lg text-ivory/80">
                  The magic happens in the balance – where human creativity and
                  AI capabilities enhance each other. This approach allows us to
                  deliver solutions that are both innovative and authentic,
                  efficient and emotive.
                </p>
              </div>
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-rose px-6 py-3 text-base font-bold tracking-tight text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10 flex items-center">
                  EXPLORE OUR SERVICES
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </SectionTransition>

      {/* CTA Section - Styled like home page */}
      <section ref={ctaRef} className="py-24 md:py-32">
        <motion.div
          className="container"
          initial={{ opacity: 0.2, y: 100 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 z-0 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl">
              Ready to create something{" "}
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
                extraordinary
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
              <ScrollReveal
                textClassName="text-lg md:text-2xl -mt-12 -mb-4 text-ivory/70"
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
              >
                Let's combine human creativity with AI innovation to build your
                digital future.
              </ScrollReveal>

              <div
                style={{
                  width: "100%",
                  height: "600px",
                  position: "relative",
                }}
              >
                <div className="absolute inset-0 z-10 md:mt-0 -mt-52">
                  <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:mt-0 -mt-52">
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
        </motion.div>
      </section>

      {/* Styles for the animated logo effect */}
      <style jsx global>{`
        /* No custom styles needed */
      `}</style>
    </>
  );
}
