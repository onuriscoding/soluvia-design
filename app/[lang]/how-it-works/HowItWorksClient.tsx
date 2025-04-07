"use client";

import { useRef, useEffect, useState } from "react";
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
import { RedesignedProcessSection } from "@/components/redesigned-process-section";

export default function HowItWorksClient({ dictionary }: { dictionary: any }) {
  const heroRef = useRef(null);
  const approachRef = useRef(null);
  const ctaRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  const isApproachInView = useInView(approachRef, { once: true, amount: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Direct transform without spring for consistent behavior with other pages
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
    const processSection = document.getElementById("process-section");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Set mounted flag to true
    setIsMounted(true);
    document.documentElement.style.scrollBehavior = "smooth";

    // Log that component has mounted (for debugging)
    console.log("HowItWorksClient has mounted");

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
                {dictionary["how-it-works"].title1}{" "}
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
                  className="font-bold text-6xl md:text-[9rem]"
                >
                  {dictionary["how-it-works"].title2}
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                {dictionary["how-it-works"].subTitle}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
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
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
          </div>
        </motion.div>
      </section>

      {/* Our Approach Section */}
      <section
        className="relative py-32 md:py-40"
        ref={approachRef}
        id="approach-section"
      >
        <div className="container relative z-10">
          <div className="absolute inset-0 z-0">
            <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
            <div className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          </div>

          <div className="mx-auto max-w-3xl text-center relative z-10 mb-24">
            <h2 className="text-5xl font-bold tracking-tight mb-8 md:text-6xl">
              {dictionary["how-it-works"].ourApproachTitle1}{" "}
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
                {dictionary["how-it-works"].ourApproachTitle2}
              </GradientText>
            </h2>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={2}
              blurStrength={3}
            >
              {dictionary["how-it-works"].ourApproachSubTitle}
            </ScrollReveal>
          </div>

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
                {dictionary["how-it-works"].steps.map((step: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className={`h-6 w-6 ${index % 4 === 0 ? 'text-rose' : index % 4 === 1 ? 'text-sapphire' : index % 4 === 2 ? 'text-beige' : 'text-ivory'}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-ivory">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-ivory/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
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
                    src="/ourapproach.png"
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
      <RedesignedProcessSection dictionary={dictionary} />
    </>
  );
}
