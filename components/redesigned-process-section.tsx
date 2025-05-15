"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Rocket,
  BarChart,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
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

const processSteps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery",
    description:
      "We begin by understanding your business, goals, target audience, and challenges through in-depth research to establish a solid foundation for your project.",
    color: "bg-rose text-ivory",
    details: [
      "Comprehensive market research",
      "User persona development",
      "Competitor analysis",
      "Business goals alignment",
      "Pain point identification",
      "Opportunity mapping",
    ],
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategy",
    description:
      "Using human insights enhanced by AI analysis, we develop a comprehensive strategy that outlines the approach, features, and technologies for your digital solution.",
    color: "bg-sapphire text-ivory",
    details: [
      "Human-AI collaborative planning",
      "Technology stack selection",
      "Feature prioritization",
      "Development roadmap",
      "Success metrics definition",
      "Resource allocation",
    ],
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Design",
    description:
      "Our designers blend creativity with AI assistance to create wireframes and visual designs that align with your brand identity and provide an exceptional user experience.",
    color: "bg-beige text-charcoal",
    details: [
      "Wireframing & prototyping",
      "AI-enhanced UI/UX design",
      "Brand integration",
      "Design system creation",
      "Accessibility compliance",
      "Responsive layouts",
    ],
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Development",
    description:
      "Our development team brings designs to life, leveraging both human expertise and AI tools to build responsive, high-performance digital solutions with clean, efficient code.",
    color: "bg-rose text-ivory",
    details: [
      "AI-assisted coding",
      "Responsive optimization",
      "Performance tuning",
      "API integrations",
      "CMS implementation",
      "Quality assurance",
    ],
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Launch",
    description:
      "After thorough testing and your approval, we deploy your solution and ensure everything is functioning perfectly through automated and manual verification.",
    color: "bg-sapphire text-ivory",
    details: [
      "Pre-launch checklist",
      "Performance optimization",
      "Cross-platform testing",
      "Deployment preparation",
      "Go-live support",
      "Launch monitoring",
    ],
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Growth",
    description:
      "We provide ongoing support, AI-powered analytics, and continuous optimization to help your digital presence evolve and continue driving business results.",
    color: "bg-beige text-charcoal",
    details: [
      "AI-driven analytics",
      "Conversion optimization",
      "Content strategy",
      "Performance monitoring",
      "Continuous improvement",
      "Scaling strategy",
    ],
  },
];

export function RedesignedProcessSection({ dictionary }: { dictionary: any }) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const localizeUrl = useLocalizedUrl();

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Timeline progress
  const timelineHeight = useTransform(
    smoothProgress,
    [0, 0.95],
    ["0%", "100%"]
  );

  // Update active step based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;

      // If container is not in view, no active step
      if (
        containerTop > window.innerHeight ||
        containerTop + containerHeight < 0
      ) {
        setActiveStep(null);
        return;
      }

      // Calculate which step should be active based on scroll position
      const scrollPosition = -containerTop;
      const stepHeight = containerHeight / processSteps.length;
      const currentStep = Math.floor(scrollPosition / stepHeight);

      if (currentStep >= 0 && currentStep < processSteps.length) {
        setActiveStep(currentStep);
      } else {
        setActiveStep(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle expanded step
  const toggleExpandedStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

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

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      id="process-section"
    >
      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl font-bold tracking-tight md:text-6xl"
            variants={itemVariants}
          >
            {t("process.sectionTitle1")}{" "}
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
              {t("process.sectionTitle2")}
            </GradientText>
          </motion.h2>
          <ScrollReveal
            textClassName="text-lg md:text-2xl mt-8 text-ivory/70"
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={2}
            blurStrength={3}
            containerClassName="max-w-3xl mx-auto"
          >
            {t("process.sectionSubtitle")}
          </ScrollReveal>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline line with precise positioning */}
          <div
            ref={timelineRef}
            className="absolute md:left-1/2 top-0 bottom-0 w-[2px]"
            style={{
              zIndex: 1,
              left: isMobile ? "7px" : "50%",
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-rose via-sapphire to-beige"
              style={{
                height: timelineHeight,
                filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.3))",
              }}
              initial={{ height: "0%" }}
              animate={{ height: isInView ? "100%" : "0%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Process steps */}
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline dot with precise positioning */}
              <div
                className="absolute"
                style={{
                  top: 0,
                  left: isMobile ? "7px" : "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  width: "20px",
                  height: "20px",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-white/20 bg-charcoal"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <motion.div
                    className={`absolute inset-0.5 rounded-full ${
                      step.color.split(" ")[0]
                    }`}
                    animate={
                      activeStep === index
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }
                        : { scale: 1, opacity: 0.7 }
                    }
                    transition={{
                      duration: 2,
                      repeat:
                        activeStep === index ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                    }}
                  />
                  {/* Pulse effect for active step */}
                  {activeStep === index && (
                    <motion.div
                      className={`absolute inset-[-4px] rounded-full ${
                        step.color.split(" ")[0]
                      } opacity-30`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content with enhanced animations */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  className={cn(
                    "p-6 rounded-xl border border-white/10 bg-charcoal/30 overflow-hidden relative group",
                    expandedStep === index && "!border-white/20"
                  )}
                  whileHover={{
                    borderColor: "rgba(183, 110, 121, 0.3)",
                    boxShadow: "0 10px 25px rgba(183, 110, 121, 0.1)",
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  animate={
                    activeStep === index
                      ? {
                          borderColor: "rgba(183, 110, 121, 0.3)",
                          boxShadow: "0 10px 25px rgba(183, 110, 121, 0.1)",
                          y: -5,
                        }
                      : {}
                  }
                  layout
                >
                  {/* Simple gradient background without blur */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose/5 via-sapphire/10 to-beige/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="flex items-center mb-4 relative z-10">
                    <motion.div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color} mr-4`}
                      whileHover={{ scale: 1.1, rotate: 0 }}
                      initial={{ rotate: -10, scale: 0.9 }}
                      animate={
                        activeStep === index
                          ? {
                              rotate: 0,
                              scale: 1.1,
                              boxShadow: "0 0 15px rgba(183, 110, 121, 0.5)",
                            }
                          : {
                              rotate: -10,
                              scale: 0.9,
                              boxShadow: "none",
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-rose transition-colors duration-300">
                      {dictionary?.process?.steps?.[index]?.title || step.title}
                    </h3>
                  </div>

                  <p className="text-white/70 relative z-10">
                    {dictionary?.process?.steps?.[index]?.description ||
                      step.description}
                  </p>

                  {/* Expandable details with original design */}
                  <AnimatePresence>
                    {expandedStep === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10 relative z-10"
                      >
                        <h4 className="text-sm font-semibold text-white/90 mb-2">
                          Key Activities:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dictionary?.process?.steps?.[index]
                            ?.activities?.[0] ?
                            Object.values(
                              dictionary.process.steps[index].activities[0]
                            ).map((activity, i) => (
                              <motion.li
                                key={i}
                                className="flex items-center text-white/70 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    step.color.split(" ")[0]
                                  } mr-2`}
                                />
                                {activity as string}
                              </motion.li>
                            )) :
                            step.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="flex items-center text-white/70 text-sm"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    step.color.split(" ")[0]
                                  } mr-2`}
                                />
                                {detail}
                              </motion.li>
                            ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Simplified expand/collapse button */}
                  <motion.button
                    onClick={() => toggleExpandedStep(index)}
                    className="mt-4 flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors relative z-10 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedStep === index
                      ? dictionary?.process?.showLess || "Show less"
                      : dictionary?.process?.showMore || "Show more"}
                    <motion.div
                      animate={{ rotate: expandedStep === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-1"
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  </motion.button>

                  {/* Restored animated bottom line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose to-sapphire"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with improved animations matching the hero section */}
        <motion.div
          className="mt-40 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-thighter mb-8">
            {dictionary?.process?.cta || "Ready to start your journey?"}
          </h3>
          <Link
            href={localizeUrl("/contact")}
            className="group relative text-rose inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-ivory/90 px-6 py-3 font-bold tracking-thighter hover:text-charcoal shadow-lg transition-all duration-300 hover:shadow-rose/30"
          >
            <span className="relative z-10 flex items-center">
              {dictionary?.navigation?.getStarted || "GET STARTED"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
