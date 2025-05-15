"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Palette,
  Globe,
  ShoppingCart,
  Code,
  BarChart,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import ScrollReveal from "../app/animations/scroll-reveal";
import GradientText from "@/app/animations/gradient-text";
import { useI18n } from "@/lib/i18n/i18nContext";

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

const services = [
  {
    id: "web-design",
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "rose",
    buttonGradient: "from-rose to-sapphire",
    image: "/soluvia.png?height=600&width=800",
    link: "/services/web-design-development",
    features: [
      "Custom responsive designs",
      "Interactive UI/UX",
      "Performance optimization",
    ],
  },
  {
    id: "seo",
    icon: Globe,
    title: "SEO Optimization",
    description:
      "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    color: "sapphire",
    buttonGradient: "from-sapphire to-beige",
    image: "/seo.png?height=600&width=800",
    link: "/services/seo-optimization",
    features: [
      "Keyword research & analysis",
      "On-page optimization",
      "Content strategy",
    ],
  },
  {
    id: "automation",
    icon: Code,
    title: "AI Automation",
    description:
      "Automate repetitive tasks and streamline your workflow with our AI automation solutions.",
    color: "beige",
    buttonGradient: "from-beige to-rose",
    image: "/ai.png?height=600&width=800",
    link: "/services/ai-automation",
    features: ["Custom AI solutions", "Workflow automation", "AI Chatbots"],
  },
];

export function RedesignedServicesSection() {
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef);
  const controls = useAnimation();
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

  // Mark component as loaded after initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile ? ["start 20%", "end start"] : ["start -20%", "end 50%"],
  });

  // Transform values with different configurations for mobile
  const rawOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.5, 0.9] : [0, 0.9],
    isMobile ? [1, 1, 0] : [1, 0]
  );

  const rawScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.5, 0.9] : [0, 0.9],
    isMobile ? [1, 1, 0.95] : [1, 0.95]
  );

  const rawY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.5, 0.9] : [0, 0.9],
    isMobile ? [0, 0, 30] : [0, 30]
  );

  // Apply spring physics for smoother animations
  const opacity = useSpring(rawOpacity, {
    stiffness: isMobile ? 80 : 100,
    damping: isMobile ? 25 : 30,
    mass: isMobile ? 0.8 : 1,
  });

  const scale = useSpring(rawScale, {
    stiffness: isMobile ? 80 : 100,
    damping: isMobile ? 25 : 30,
    mass: isMobile ? 0.8 : 1,
  });

  const y = useSpring(rawY, {
    stiffness: isMobile ? 80 : 100,
    damping: isMobile ? 25 : 30,
    mass: isMobile ? 0.8 : 1,
  });

  // Add useEffect to handle initial animation state
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

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

  const currentService = services.find(
    (service) => service.id === activeService
  )!;

  // Memoize the service selection handler to prevent unnecessary re-renders
  const handleServiceClick = useCallback((serviceId: string) => {
    setActiveService(serviceId);
  }, []);

  // Adjust animation properties based on device and preferences
  const getTransitionProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        type: "tween",
        duration: 0.2,
        delay: delay * 0.5,
      };
    }

    return {
      type: "spring",
      stiffness: isMobile ? 70 : 100,
      damping: isMobile ? 15 : 20,
      mass: isMobile ? 0.6 : 0.5,
      duration: isMobile ? 0.4 : 0.5,
      delay: delay,
    };
  };

  // Precompute transition properties to avoid recalculation during animation
  const contentTransition = getTransitionProps(0.1);
  const imageTransition = getTransitionProps(0.2);

  return (
    <section ref={ref} className="relative py-32 md:py-48">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <motion.div
        ref={scrollRef}
        className="container relative z-10"
        style={{
          opacity,
          scale,
          y,
        }}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight text-ivory md:text-6xl"
            initial={{ opacity: 0.2, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {t("services.sectionTitle")}{" "}
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
              Services
            </GradientText>
          </motion.h1>
          <ScrollReveal
            textClassName="text-lg md:text-2xl mt-8 text-ivory/70"
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
          >
            {t("services.sectionSubtitle")}
          </ScrollReveal>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm font-bold tracking-thighter transition-all duration-300 gap-2 ${
                activeService === service.id
                  ? "bg-transparent text-ivory/90 shadow-rose/30 border border-ivory/10 backdrop-blur-sm"
                  : "bg-ivory/90 text-rose hover:text-charcoal hover:shadow-rose/30 shadow-lg"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: services.findIndex((s) => s.id === service.id) * 0.1,
              }}
            >
              <service.icon className="h-4 w-4" />
              {t(`services.${service.id}`)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: contentTransition,
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: {
                ...contentTransition,
                duration: isMobile ? 0.2 : 0.3,
              },
            }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: contentTransition,
              }}
              exit={{
                opacity: 0,
                x: isMobile ? -5 : -20,
                transition: {
                  ...contentTransition,
                  duration: isMobile ? 0.15 : 0.3,
                },
              }}
            >
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.2 }}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-${currentService.color}/20 to-${currentService.color}-light/20 text-${currentService.color} mr-4`}
                >
                  {<currentService.icon className="h-6 w-6" />}
                </div>
                <h3 className="text-2xl font-bold tracking-thight text-ivory">
                  {t(`services.${currentService.id}`)}
                </h3>
              </motion.div>

              <motion.p
                className="text-ivory/70 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.25 }}
              >
                {t(`services.${currentService.id}-description`)}
              </motion.p>

              {/* Feature list with optimized animations */}
              <motion.div
                className="mb-8 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {currentService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.35 + index * (isMobile ? 0.05 : 0.1),
                    }}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 text-${currentService.color}`}
                    />
                    <span className="text-ivory/80">
                      {t(`services.${currentService.id}-features.${index}`)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                  href={localizeUrl(currentService.link)}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ivory/90 px-8 py-3 text-rose font-bold tracking-thighter hover:text-charcoal shadow-lg transition-all duration-300 hover:shadow-rose/30"
                >
                  {t("navigation.learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: isMobile ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? 5 : 20 }}
              transition={imageTransition}
              layout={!isMobile && !isLoading}
            >
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-br from-${currentService.color} to-${currentService.color}-light rounded-xl opacity-70 blur-sm`}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{
                  duration: isMobile ? 0.3 : 0.5,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              ></motion.div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={currentService.image || "/placeholder.svg"}
                  alt={`Soluvia professional ${t(`services.${currentService.id}`)} services - Expert digital solutions for businesses`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                  priority={!isLoading}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-60"></div>
                <motion.div
                  className="absolute bottom-4 left-4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: isMobile ? 0.2 : 0.4,
                    delay: isMobile ? 0.3 : 0.5,
                  }}
                >
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full bg-${currentService.color}/20 text-${currentService.color}`}
                  >
                    {t(`services.${currentService.id}`)}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
