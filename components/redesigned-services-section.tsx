"use client";

import { useRef, useState, useEffect } from "react";
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

const services = [
  {
    id: "web-design",
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "rose",
    buttonGradient: "from-rose to-sapphire",
    image: "/soluvia.webp?height=600&width=800",
    link: "/services/web-design",
    features: [
      "Custom responsive designs",
      "Interactive UI/UX",
      "Performance optimization",
      "CMS integration",
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
      "Performance tracking",
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
    image: "/ai.jpg?height=600&width=800",
    link: "/services/ai-automation",
    features: [
      "Custom AI solutions",
      "Workflow automation",
      "AI Chatbots",
      "Integration with existing systems",
    ],
  },
];

export function RedesignedServicesSection() {
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef);
  const controls = useAnimation();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile
      ? ["start end", "end start"]
      : ["start start", "end start"],
  });

  // Transform values with different configurations for mobile
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [1, 1, 0] : [1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [1, 1, 0.95] : [1, 0.8]
  );

  const y = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [0, 0, 30] : [0, 100]
  );

  // Add smooth spring animation for mobile only
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 20 : 100,
    damping: isMobile ? 40 : 30,
    restDelta: 0.001,
  });

  // Use different progress values based on viewport
  const finalOpacity = useTransform(
    isMobile ? smoothProgress : scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [1, 1, 0] : [1, 0]
  );

  const finalScale = useTransform(
    isMobile ? smoothProgress : scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [1, 1, 0.95] : [1, 0.8]
  );

  const finalY = useTransform(
    isMobile ? smoothProgress : scrollYProgress,
    isMobile ? [0, 0.4, 0.9] : [0, 0.5],
    isMobile ? [0, 0, 30] : [0, 100]
  );

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

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <motion.div
        ref={scrollRef}
        className="container relative z-10"
        style={{
          opacity: finalOpacity,
          scale: finalScale,
          y: finalY,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
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
            We offer a comprehensive range of services to help your business
            thrive in the digital landscape
          </ScrollReveal>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                activeService === service.id
                  ? "text-ivory backdrop-blur-sm border border-ivory/10"
                  : "bg-charcoal/50 text-ivory/70 hover:text-ivory hover:bg-charcoal/70 border border-ivory/10"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{
                scale: activeService === service.id ? 1 : 1.05,
              }}
              style={{
                background:
                  activeService === service.id
                    ? `linear-gradient(to right, var(--${service.color}), var(--${service.color}-light))`
                    : undefined,
              }}
              transition={{
                duration: 0.5,
                delay: services.findIndex((s) => s.id === service.id) * 0.1,
              }}
            >
              <service.icon className="h-4 w-4" />
              {service.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
                duration: 0.5,
              },
            }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.5,
                  duration: 0.5,
                  delay: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.5,
                  duration: 0.5,
                },
              }}
            >
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-${currentService.color}/20 to-${currentService.color}-light/20 text-${currentService.color} mr-4`}
                >
                  {<currentService.icon className="h-6 w-6" />}
                </div>
                <h3 className="text-2xl font-bold tracking-thight text-ivory">
                  {currentService.title}
                </h3>
              </motion.div>

              <motion.p
                className="text-ivory/70 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {currentService.description}
              </motion.p>
              {/* New feature list */}
              <motion.div
                className="mb-8 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {currentService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 text-${currentService.color}`}
                    />
                    <span className="text-ivory/80">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  href={currentService.link}
                  className={`inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-${currentService.color} to-${currentService.color}-light text-ivory font-bold tracking-tighter hover:shadow-lg hover:shadow-${currentService.color}/20 transition-all duration-300`}
                >
                  Learn More{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Gradient border effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-br from-${currentService.color} to-${currentService.color}-light rounded-xl opacity-70 blur-sm`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              ></motion.div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={currentService.image || "/placeholder.svg"}
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-60"></div>
                <motion.div
                  className="absolute bottom-4 left-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full bg-${currentService.color}/20 text-${currentService.color}`}
                  >
                    {currentService.title}
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
