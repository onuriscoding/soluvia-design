"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Palette, Search, Bot, ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { RedesignedPricingSection } from "@/components/redesigned-pricing-section";
import { RedesignedContactSection } from "@/components/redesigned-contact-section";
import { ClientOnly } from "@/components/client-only";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";

export default function ServicesClient({ dictionary }: { dictionary: any }) {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      },
    },
  };

  // Service data
  const services = [
    {
      id: "web-design",
      title: "Web Design & Development",
      description:
        "Create stunning, responsive websites that captivate your audience.",
      icon: <Palette className="h-5 w-5" />,
      color: "text-rose",
      buttonGradient: "from-rose to-sapphire",
      link: "/services/web-design-development",
    },
    {
      id: "seo-optimization",
      title: "SEO Optimization",
      description: "Improve visibility and rankings in search engine results.",
      icon: <Search className="h-5 w-5" />,
      color: "text-sapphire",
      buttonGradient: "from-sapphire to-beige",
      link: "/services/seo-optimization",
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      description:
        "Automate processes and enhance customer experiences with AI.",
      icon: <Bot className="h-5 w-5" />,
      color: "text-beige",
      buttonGradient: "from-beige to-rose",
      link: "/services/ai-automation",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        ref={ref}
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
          className="container relative z-10 px-4"
        >
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-[9rem]">
                {currentLang === "fr" ? "Nos " : "Our "}
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
                  {currentLang === "fr" ? "Services" : "Services"}
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                {currentLang === "fr"
                  ? "Nous offrons une gamme complète de services pour aider votre entreprise à prospérer dans le paysage numérique. Cliquez pour en savoir plus sur chaque service."
                  : "We offer a comprehensive range of services to help your business thrive in the digital landscape. Click to learn more about each service."}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <div className="flex justify-center gap-4 flex-wrap">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      asChild
                      className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full 
                        bg-gradient-to-r ${
                          service.buttonGradient
                        } text-ivory hover:shadow-lg 
                        hover:shadow-${service.color.replace(
                          "text-",
                          ""
                        )}/20 cursor-pointer`}
                    >
                      <Link
                        href={`/${currentLang}${service.link}`}
                        className="flex items-center gap-2"
                      >
                        {service.icon}
                        <span className="whitespace-nowrap">
                          {currentLang === "fr"
                            ? service.id === "web-design"
                              ? "Web Design & Développement"
                              : service.id === "seo-optimization"
                              ? "Optimisation SEO"
                              : "Automatisation IA"
                            : service.title}
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          onClick={() => {
            document
              .getElementById("pricing")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 md:py-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
        </div>
        <div className="container relative z-10 max-w-10xl mx-auto px-0 sm:px-0 lg:px-8">
          <RedesignedPricingSection dictionary={dictionary} />
        </div>
      </section>
    </main>
  );
} 