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
import { cn } from "@/lib/utils";

export default function ContactPageClient({ dictionary }: { dictionary: any }) {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, {
    once: true,
    amount: 0.05, // Reduced from 0.2 to 0.05 to trigger earlier
    margin: "0px 0px -10% 0px", // Negative bottom margin to trigger before element is in view
  });

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollDown = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
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
                    colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
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

      {/* Contact Section */}
      <div ref={contactRef} id="booking-section" className="mt-[-5vh] md:mt-0">
        <RedesignedContactSection dictionary={dictionary} />
      </div>
    </>
  );
}
