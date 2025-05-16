"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Brain,
  FileText,
  Sparkles,
  Code,
  Zap,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import { useI18n } from "@/lib/i18n/i18nContext";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import dynamic from "next/dynamic";
import { websiteDesigns } from "@/data/website-designs";
import React from "react";
import Image from "next/image";
import Orb from "@/components/orb";

// Dynamically import the original InfiniteScroll component
const InfiniteScroll = dynamic(() => import("@/components/infinite-scroll"), {
  ssr: false,
  loading: () => (
    // Consistent loading state
    <div className="w-full h-[700px] flex items-center justify-center bg-charcoal/30 backdrop-blur-sm rounded-xl border border-rose/20 shadow-xl">
      <div className="text-ivory/70 flex flex-col items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-rose mb-4"></div>
        <span className="text-lg">Loading portfolio...</span>
      </div>
    </div>
  ),
});

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

// Main component
export default function TemplatesClient({ dictionary }: { dictionary: any }) {
  const heroRef = useRef(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Direct transform without spring for consistent behavior
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const templatesRef = useRef(null);
  const ctaRef = useRef(null);
  const isTemplatesInView = useInView(templatesRef, {
    once: true,
    amount: 0.2,
  });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  const localizeUrl = useLocalizedUrl();
  const { t } = useI18n();

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
    const templatesSection = document.getElementById("templates-section");
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
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
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-[9rem] flex flex-wrap items-center justify-center gap-x-12">
                <GradientText
                  colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                  animationSpeed={12}
                  showBorder={false}
                  className="font-bold text-6xl md:text-[9rem]"
                >
                  {dictionary.templates.title}
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                {dictionary.templates.subtitle}
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

      {/* AI Templates Section */}
      <div
        id="templates-section"
        ref={templatesRef}
        className="container px-4 relative z-10 py-24 md:py-32"
      >
        <motion.div
          className="mb-16 relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-ivory mb-6">
            {dictionary.templates.aiTemplatesTitle1
              ? dictionary.templates.aiTemplatesTitle1
              : "Explore Our"}{" "}
            <GradientText
              colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
              animationSpeed={12}
              showBorder={false}
              className="inline-block"
            >
              {dictionary.templates.aiTemplatesTitle2
                ? dictionary.templates.aiTemplatesTitle2
                : "AI Automation Solutions"}
            </GradientText>
          </h2>
          <ScrollReveal
            textClassName="text-xl text-ivory/70 max-w-3xl mx-auto"
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
          >
            {dictionary.templates.aiTemplatesDescription
              ? dictionary.templates.aiTemplatesDescription
              : "Discover powerful AI automation solutions designed to solve real business challenges. Each template can be customized and integrated into your existing systems."}
          </ScrollReveal>
        </motion.div>

        {/* Instagram Automation Template Card as a square listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="w-full h-full flex"
            initial={{ opacity: 0, y: 20 }}
            animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SpotlightCard
              variant="default"
              className="flex flex-col justify-between bg-ivory/90 border border-ivory/20 rounded-2xl shadow-lg p-0 overflow-hidden w-full h-full min-h-[420px] max-w-full"
            >
              <div className="flex-1 flex flex-col items-center justify-center p-8 pb-4">
                <div className="w-full flex items-center justify-center mb-6">
                  <Image
                    src="/instagram-automation.png"
                    alt="Instagram Automation Workflow"
                    width={320}
                    height={320}
                    className="rounded-lg shadow object-contain bg-white"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-lg bg-rose/20">
                      <MessageSquare className="h-7 w-7 text-charcoal" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal">
                      {
                        dictionary.templates.templateDetails.instagramAutomation
                          .title
                      }
                    </h3>
                  </div>
                  <p className="text-charcoal/80 text-base mb-4">
                    {
                      dictionary.templates.templateDetails.instagramAutomation
                        .description
                    }
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end p-6 pt-0">
                <Link
                  href={localizeUrl("/templates/ai-automations/instagram")}
                  className="group relative z-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-ivory/90 px-6 py-2.5 text-sm font-bold tracking-tighter text-rose transition-all duration-300 hover:shadow-lg hover:shadow-rose/30"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-charcoal">
                    {dictionary.templates.viewDetails
                      ? dictionary.templates.viewDetails
                      : "Explore Template"}
                  </span>
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>

      {/* CTA Section - Styled like home page */}
      <section className="py-24 md:py-32">
        <motion.div className="container">
          <div className="absolute inset-0 z-0 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl">
              {dictionary.templates.needCustomSolution1}{" "}
              <GradientText
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                {dictionary.templates.needCustomSolution2}
              </GradientText>{" "}
              ?
            </h1>
          </div>
          <div className="relative z-10 md:mt-0 mt-28">
            <motion.div
              ref={ctaRef}
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
                {dictionary.templates.customSolutionDescription}
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
                      className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-ivory/90 text-rose hover:text-charcoal font-bold tracking-tighter px-6 py-3 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        {dictionary.about.ctaButton}
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
    </div>
  );
}

// Client-only wrapper for InfiniteScroll
function ClientOnlyPortfolio() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemHeight = 400;
  const desiredSpacing = "1rem"; // Keep spacing reasonable

  const scrollItems = websiteDesigns.map((design, index) => ({
    content: (
      <div
        className="relative w-full rounded-xl overflow-hidden bg-slate-800/70 border border-slate-700/50 shadow-lg"
        style={{ height: `${itemHeight}px` }} // Explicit height here is good
      >
        <Image
          src={design.imageUrl}
          alt={design.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="infinite-scroll-image object-cover"
          priority={index < 2}
          loading={index < 2 ? "eager" : "lazy"}
        />
        <div className="infinite-scroll-caption p-3">
          <h3 className="text-sm font-semibold text-white truncate">
            {design.title}
          </h3>
          <p className="text-xs text-slate-300 opacity-80 truncate">
            {design.description}
          </p>
        </div>
      </div>
    ),
  }));

  if (!isMounted) {
    // Consistent loading state
    return (
      <div className="w-full h-full flex items-center justify-center bg-charcoal/30 backdrop-blur-sm rounded-xl border border-rose/20 shadow-xl">
        <div className="text-ivory/70 flex flex-col items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-rose mb-4"></div>
          <span className="text-lg">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    // Ensure this div takes full height of its parent (which now has fixed height)
    <div className="w-full h-full relative">
      <InfiniteScroll
        items={scrollItems}
        itemMinHeight={itemHeight}
        itemSpacing={desiredSpacing}
        isTilted={false} // Keep tilt disabled for now
        autoplay={false} // Disable autoplay for now
        // autoplaySpeed={0.3}
        // autoplayDirection="down"
        // pauseOnHover={true}
      />
    </div>
  );
}
