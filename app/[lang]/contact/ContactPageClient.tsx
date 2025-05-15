"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  Send,
  MapPin,
  ChevronDown,
  Hand,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RedesignedContactSection } from "@/components/redesigned-contact-section";
import GradientText from "@/app/animations/gradient-text";

export default function ContactPageClient({ dictionary }: { dictionary: any }) {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants
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

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
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
        <motion.div
          style={{ y, opacity }}
          className="container relative z-10 px-4"
        >
          <motion.div
            className="mx-auto max-w-4xl -mt-24 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-[9rem] flex flex-wrap items-center justify-center gap-x-8">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {dictionary.contact.title1}
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block"
                >
                  <GradientText
                    colors={[
                      "#b76e79",
                      "#e0d5c0",
                      "#b76e79",
                      "#e0d5c0",
                    ]}
                    animationSpeed={12}
                    showBorder={false}
                    className="inline-block"
                  >
                    {dictionary.contact.title2}
                  </GradientText>
                </motion.div>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                {dictionary.contact.subTitle}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Touch Icon Animation - Centered */}
        <motion.div
          className="absolute -mt-24 top-3/4 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.1,
            y: [0, -5, 0],
            transition: {
              y: {
                duration: 0.5,
                repeat: 3,
                repeatType: "reverse",
              },
            },
          }}
          onClick={handleScrollToContact}
        >
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-rose to-sapphire opacity-60 blur-md"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-charcoal/70 backdrop-blur-sm border border-ivory/20 shadow-xl">
              <Hand className="h-10 w-10 text-ivory" />
            </div>
            <motion.p
              className="absolute -bottom-10 whitespace-nowrap text-center text-base font-medium text-ivory/90"
              animate={{
                y: [0, 3, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {dictionary.contact.ctaButton}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Elegant divider with gradient effect */}
      <div className="relative h-24 overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-rose/30 to-transparent"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} id="contact-section">
        <RedesignedContactSection dictionary={dictionary} />
      </div>
    </>
  );
}
