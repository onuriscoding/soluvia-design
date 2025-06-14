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
import parse from "html-react-parser";
import GradientText from "@/app/animations/gradient-text";
import { useI18n } from "@/lib/i18n/i18nContext";
import { BookingIframe } from "@/components/ui/booking-iframe";
import CardSwap, { Card } from "./card-swap";

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
    <section ref={ref} className="relative py-20 md:py-28 lg:py-36">
      {" "}
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={scrollRef}
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {" "}
          <motion.div
            className="mx-auto max-w-4xl text-center mb-16"
            variants={containerVariants}
          >
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory"
              initial={{ opacity: 0.2, y: 80 }}
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
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl mt-6 md:mt-8 text-ivory/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {parse(t("services.sectionSubtitle"))}
            </motion.p>
          </motion.div>
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
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
                <service.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                {t(`services.${service.id}`)}
              </motion.button>
            ))}
          </div>{" "}
          <div className="mt-20 lg:mt-36 flex flex-col lg:flex-row items-start">
            {/* Text Content Column */}
            <div className="w-full lg:w-1/2 px-4">
              <AnimatePresence mode="wait" initial={false}>
                {" "}
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
                  className="px-0 sm:px-0 lg:pr-16 xl:pr-20"
                >
                  <motion.div
                    className="flex flex-row sm:items-center mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.2 }}
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-rose/10 text-rose mr-3 sm:mr-4">
                      {
                        <currentService.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      }
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory">
                      {t(`services.${currentService.id}`)}
                    </h2>
                  </motion.div>
                  <motion.p
                    className="text-base sm:text-lg md:text-xl text-ivory/70 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0.25 }}
                  >
                    {parse(t(`services.${currentService.id}-description`))}
                  </motion.p>
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
                        <span className="text-sm sm:text-base text-ivory/80">
                          {parse(
                            t(`services.${currentService.id}-features.${index}`)
                          )}
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
                      className="group inline-flex items-center justify-center rounded-full bg-ivory/90 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-rose hover:text-charcoal font-bold tracking-tighter shadow-lg transition-all duration-300 hover:shadow-rose/30"
                    >
                      {t("navigation.learnMore")}
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>{" "}
            {/* Cards Column */}
            <div className="mt-20 lg:mt-0 mb-16 lg:mb-0 w-full lg:w-1/2">
              <div className="w-full h-[400px] relative lg:h-auto lg:transform lg:-translate-x-32 xl:translate-x-48 xl:translate-y-72">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 xl:-translate-x-48 -translate-y-1/2 lg:static lg:transform-none">
                  <CardSwap
                    width={isMobile ? 300 : 450}
                    height={isMobile ? 320 : 340}
                    cardDistance={isMobile ? 35 : 30}
                    verticalDistance={isMobile ? 18 : 14}
                    delay={4500}
                    pauseOnHover={true}
                    easing="elastic"
                  >
                    {" "}
                    {/* Card 1 - Video Card */}
                    <Card className="p-3 sm:p-4 bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden h-full flex flex-col">
                      <div className="bg-gradient-to-r from-rose-500 to-white p-2 sm:p-3 text-left">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Code className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
                          <h3 className="text-charcoal text-sm sm:text-base md:text-lg font-bold drop-shadow-sm">
                            AI Solutions
                          </h3>
                        </div>
                      </div>
                      <div className="h-px bg-rose-500"></div>
                      <div className="flex-1 p-1 sm:p-3">
                        <video
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src="/1.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </Card>
                    {/* Card 2 - Video Card */}
                    <Card className="p-3 sm:p-4 bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden h-full flex flex-col">
                      <div className="bg-gradient-to-r from-rose-500 to-white p-2 sm:p-3 text-left">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
                          <h3 className="text-charcoal text-sm sm:text-base md:text-lg font-bold drop-shadow-sm">
                            Web Design
                          </h3>
                        </div>
                      </div>
                      <div className="h-px bg-rose-500"></div>
                      <div className="flex-1 p-1 sm:p-3">
                        <video
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src="/2.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </Card>
                    {/* Card 3 - Video Card */}
                    <Card className="p-3 sm:p-4 bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden h-full flex flex-col">
                      <div className="bg-gradient-to-r from-rose-500 to-white p-2 sm:p-3 text-left">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal" />
                          <h3 className="text-charcoal text-sm sm:text-base md:text-lg font-bold drop-shadow-sm">
                            Web Development
                          </h3>
                        </div>
                      </div>
                      <div className="h-px bg-rose-500"></div>
                      <div className="flex-1 p-1 sm:p-3">
                        <video
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          loop
                          muted
                          playsInline
                        >
                          <source src="/3.mp4" type="video/mp4" />
                        </video>
                      </div>{" "}
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>{" "}
      {/* Booking Section */}
      <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-center">
          {/* Text Content */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4">
            <div className="space-y-5 sm:space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium bg-white/90 text-rose">
                  <Calendar className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                  {parse(t("navigation.bookADiscoveryCallSmall"))}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ivory">
                {parse(t("navigation.bookADiscoveryCall"))}
              </h2>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-ivory/70 leading-relaxed">
                {parse(t("navigation.bookADiscoveryCallDescription"))}
              </p>
              <div className="pt-2 space-y-3 md:space-y-4">
                <div className="flex items-center text-sm text-ivory/80">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                  <span>
                    {parse(t("navigation.bookADiscoveryCallfeature1"))}
                  </span>
                </div>
                <div className="flex items-center text-sm text-ivory/80">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                  <span>
                    {parse(t("navigation.bookADiscoveryCallfeature2"))}
                  </span>
                </div>
                <div className="flex items-center text-sm text-ivory/80">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-rose mr-2 md:mr-3 flex-shrink-0" />
                  <span>
                    {parse(t("navigation.bookADiscoveryCallfeature3"))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Frame */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <BookingIframe height={650} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
