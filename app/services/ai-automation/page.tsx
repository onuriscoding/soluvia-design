"use client";

import {
  Cpu,
  Bot,
  MessageSquare,
  BarChart,
  Clock,
  Zap,
  Database,
  TrendingUp,
  Lightbulb,
  FileText,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { ServiceFeatureSection } from "@/components/service-feature-section";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Orb from "@/components/orb";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function AiAutomationPage() {
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

  const features = [
    {
      title: "AI-Powered Chatbots",
      description:
        "We develop intelligent chatbots that can handle customer inquiries, provide support, and guide users through your website or application.",
      icon: <MessageSquare className="h-6 w-6" />,
      features: [
        "Natural language processing",
        "24/7 customer support",
        "Personalized user interactions",
        "Multi-channel deployment",
        "Integration with existing systems",
        "Continuous learning and improvement",
      ],
      image: "/ai-chatbot.png?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Business Process Automation",
      description:
        "We implement AI solutions that automate repetitive tasks and workflows, freeing up your team to focus on more strategic activities.",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Workflow automation",
        "Document processing",
        "Data entry and extraction",
        "Email automation",
        "Task scheduling and management",
        "Custom automation solutions",
      ],
      image: "/ai-automation.png?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "AI-Driven Analytics",
      description:
        "We harness the power of AI to analyze your data, uncover insights, and provide actionable recommendations for your business.",
      icon: <BarChart className="h-6 w-6" />,
      features: [
        "Predictive analytics",
        "Customer behavior analysis",
        "Sales forecasting",
        "Performance monitoring",
        "Trend identification",
        "Automated reporting",
      ],
      image: "/ai-analytics.png?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Intelligent Content Generation",
      description:
        "We leverage AI to create high-quality, relevant content for your website, marketing campaigns, and social media channels.",
      icon: <FileText className="h-6 w-6" />,
      features: [
        "Blog post generation",
        "Product descriptions",
        "Email content",
        "Social media posts",
        "SEO-optimized content",
        "Multilingual content creation",
      ],
      image: "/ai-content.png?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Increased Efficiency",
      description:
        "Automate repetitive tasks and streamline workflows to save time and resources.",
      icon: Zap,
    },
    {
      title: "Enhanced Accuracy",
      description:
        "Minimize human error and ensure consistent results with AI-powered automation.",
      icon: CheckCircle,
    },
    {
      title: "24/7 Operation",
      description:
        "Keep your business running around the clock with automated processes.",
      icon: Clock,
    },
    {
      title: "Scalable Solutions",
      description:
        "Easily scale your operations without proportionally increasing costs.",
      icon: TrendingUp,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Gain valuable insights from automated data collection and analysis.",
      icon: BarChart,
    },
    {
      title: "Cost Reduction",
      description:
        "Reduce operational costs by automating manual and time-consuming tasks.",
      icon: DollarSign,
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "We analyze your business processes, challenges, and goals to identify opportunities for AI automation.",
      icon: <Lightbulb className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "02",
      title: "Solution Design",
      description:
        "We design a customized AI automation solution tailored to your specific needs and objectives.",
      icon: <Bot className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "03",
      title: "Development & Training",
      description:
        "We develop and train the AI models and systems, integrating them with your existing infrastructure.",
      icon: <Cpu className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
    {
      number: "04",
      title: "Testing & Refinement",
      description:
        "We rigorously test the solution, gathering feedback and making refinements to ensure optimal performance.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "05",
      title: "Deployment & Integration",
      description:
        "We deploy the solution and integrate it seamlessly with your existing systems and workflows.",
      icon: <Database className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "06",
      title: "Monitoring & Optimization",
      description:
        "We continuously monitor the performance of your AI automation solution, making optimizations as needed.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
  ];

  const { ref: benefitsRef, inView: isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

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
                AI &{" "}
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
                  Automation
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                We automate processes and enhance customer experiences with
                cutting-edge AI solutions.
              </p>
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
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 md:py-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.5,
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight text-ivory md:text-6xl mb-6">
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
                Solutions
              </GradientText>
            </h2>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Innovative AI solutions designed to transform your business
              operations
            </ScrollReveal>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="mb-32 last:mb-0"
                variants={{
                  hidden: { opacity: 0, y: 50 },
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
                }}
              >
                <ServiceFeatureSection
                  feature={feature}
                  reversed={index % 2 !== 0}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section with Enhanced Animations */}
      <section ref={benefitsRef} className="relative py-24 md:py-32">
        <div className="container relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.5,
            }}
          >
            <h2 className="text-5xl font-bold tracking-tight text-ivory md:text-6xl mb-6">
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
                Benefits
              </GradientText>{" "}
              to your business
            </h2>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Discover how AI automation can transform your business operations
            </ScrollReveal>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="group relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose/5 border border-ivory/10 hover:border-rose/30"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose/10 to-sapphire/10 transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="relative p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-rose group-hover:to-sapphire group-hover:text-ivory">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-ivory group-hover:text-rose transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-ivory/70">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <motion.div className="container">
            <div className="relative z-10 md:mt-0">
              <motion.div className="mx-auto max-w-6xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl">
                  Ready to automate your{" "}
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
                    business
                  </GradientText>
                  ?
                </h1>
                <ScrollReveal
                  textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70 max-w-6xl"
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={3}
                  blurStrength={4}
                >
                  Transform your operations with intelligent AI solutions that
                  drive efficiency and growth.
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
                  {/* Get Started Button */}
                  <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none md:mt-0 -mt-52">
                    <motion.div className="flex flex-col items-center justify-center gap-4 pointer-events-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/contact"
                          className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-6 py-3 text-base font-bold tracking-tight text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                          <span className="relative z-10 flex items-center">
                            GET STARTED
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
        </motion.div>
      </section>
    </main>
  );
}
