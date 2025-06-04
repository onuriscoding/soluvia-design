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
  Calendar,
} from "lucide-react";
import ScrollReveal from "../app/animations/scroll-reveal";
import GradientText from "@/app/animations/gradient-text";
import { useI18n } from "@/lib/i18n/i18nContext";
import { BookingIframe } from "@/components/ui/booking-iframe";

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
    id: "automation",
    icon: Code,
    title: "AI Solutions",
    description:
      "We create custom AI solutions to empower your business and decrease your costs by increasing your efficiency.",
    color: "rose",
    buttonGradient: "from-rose to-sapphire",
    image: "/n8n.png?height=600&width=800",
    link: "/services/ai-solutions",
    features: ["Custom AI solutions", "Workflow automation", "AI Chatbots"],
  },
  {
    id: "web-design",
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "rose",
    buttonGradient: "from-rose to-sapphire",
    image: "/md-cars.png?height=600&width=800",
    link: "/services/web-design-development",
    features: [
      "Custom responsive designs",
      "Interactive UI/UX",
      "Performance optimization",
    ],
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
  // Removed disappearing effect scroll animations
  // We're no longer using scroll-based animations for opacity, scale, and y transforms

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
    <section ref={ref} className="relative py-20 md:py-32 lg:py-48">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>{" "}
      <div className="px-4 relative z-10">
        <motion.div
          ref={scrollRef}
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={containerVariants}
          >
            {" "}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory"
              initial={{ opacity: 0.2, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {t("services.sectionTitle")}{" "}
              <GradientText
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                Services
              </GradientText>
            </motion.h2>{" "}
            <motion.p
              className="text-lg md:text-2xl mt-4 text-ivory/70"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("services.sectionSubtitle")}
            </motion.p>
          </motion.div>{" "}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold tracking-tighter transition-all duration-300 gap-1.5 sm:gap-2 ${
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
                {" "}
                <service.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                {t(`services.${service.id}`)}
              </motion.button>
            ))}
          </div>{" "}
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
              className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
            >
              {" "}
              <motion.div
                className="lg:col-span-5 xl:col-span-4 lg:order-1 order-1 lg:pr-8 xl:pr-12"
                initial={{ opacity: 0, x: isMobile ? 10 : 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: contentTransition,
                }}
                exit={{
                  opacity: 0,
                  x: isMobile ? 5 : 20,
                  transition: {
                    ...contentTransition,
                    duration: isMobile ? 0.15 : 0.3,
                  },
                }}
              >
                {" "}
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.2 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose mb-3 sm:mb-0 sm:mr-3">
                    {<currentService.icon className="h-6 w-6" />}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory">
                    {t(`services.${currentService.id}`)}
                  </h2>
                </motion.div>{" "}
                <motion.p
                  className="text-base md:text-lg lg:text-2xl text-ivory/70 mb-5 md:mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.25 }}
                >
                  {t(`services.${currentService.id}-description`)}
                </motion.p>{" "}
                {/* Feature list with optimized animations */}
                <motion.div
                  className="mb-6 md:mb-8 space-y-3 md:space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {currentService.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.35 + index * (isMobile ? 0.05 : 0.1),
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-sm text-ivory/80">
                        {t(`services.${currentService.id}-features.${index}`)}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>{" "}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Link
                    href={localizeUrl(currentService.link)}
                    className="group inline-flex items-center justify-center rounded-full bg-ivory/90 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-rose hover:text-charcoal font-bold tracking-tighter shadow-lg transition-all duration-300 hover:shadow-rose/30"
                  >
                    {t("navigation.learnMore")}
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>{" "}
              <motion.div
                className="lg:col-span-7 xl:col-span-8 order-2 lg:order-2 relative"
                initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -5 : -20 }}
                transition={imageTransition}
                layout={!isMobile && !isLoading}
              >
                {" "}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-70 blur-sm"
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{
                    duration: isMobile ? 0.3 : 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                ></motion.div>{" "}
                <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl">
                  <Image
                    src={currentService.image || "/placeholder.svg"}
                    alt={`Soluvia professional ${t(`services.${currentService.id}`)} services - Expert digital solutions for businesses`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
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
                    {" "}
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose/20 text-rose">
                      {t(`services.${currentService.id}`)}
                    </span>
                  </motion.div>
                </div>
              </motion.div>{" "}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>{" "}
      {/* Booking Section */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {" "}
            {/* Text Content - Mobile first order (shows on top for mobile) */}
            <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4 lg:pl-8 xl:pl-12">
              <div className="space-y-6">
                {" "}
                <div className="inline-block">
                  <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white/90 text-rose">
                    <Calendar className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                    {t("navigation.bookADiscoveryCallSmall")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory">
                  {t("navigation.bookADiscoveryCall")}
                </h2>
                <p className="text-base md:text-lg lg:text-2xl text-ivory/70 leading-relaxed">
                  {t("navigation.bookADiscoveryCallDescription")}
                </p>{" "}
                <div className="pt-2 space-y-3 md:space-y-4">
                  <div className="flex items-center text-xs sm:text-sm text-ivory/80">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                    <span>{t("navigation.bookADiscoveryCallfeature1")}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-ivory/80">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                    <span>{t("navigation.bookADiscoveryCallfeature2")}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-ivory/80">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                    <span>{t("navigation.bookADiscoveryCallfeature3")}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Booking Frame - Second order for mobile */}
            <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8">
              <BookingIframe height={700} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
