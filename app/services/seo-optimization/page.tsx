"use client";

import {
  Search,
  BarChart,
  Globe,
  FileText,
  Link2,
  Zap,
  Target,
  Users,
  TrendingUp,
  Map,
  LineChart,
  Compass,
  Settings,
  MapPin,
  type LucideIcon,
  Smartphone,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { ServiceFeatureSection } from "@/components/service-feature-section";
import { ServiceBenefitsSection } from "@/components/service-benefits-section";
import { RedesignedServicesSection } from "@/components/redesigned-services-section";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import { ParallaxSection } from "@/components/parallax-section";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RedesignedCTASection } from "@/components/redesigned-cta-section";
import Orb from "@/components/orb";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function SeoOptimizationPage() {
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

  const features = [
    {
      title: "On-Page SEO",
      description:
        "We optimize your website's content, structure, and HTML elements to improve visibility and rankings in search engine results.",
      icon: <FileText className="h-6 w-6" />,
      features: [
        "Keyword research and optimization",
        "Meta title and description optimization",
        "Header tag optimization",
        "Content optimization",
        "Image optimization",
        "URL structure improvement",
      ],
      image: "/on-page-seo.png?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Off-Page SEO",
      description:
        "We build your website's authority through high-quality backlinks, social signals, and other external factors that influence search rankings.",
      icon: <Link2 className="h-6 w-6" />,
      features: [
        "Link building strategies",
        "Guest posting opportunities",
        "Social media integration",
        "Brand mentions monitoring",
        "Competitor backlink analysis",
        "Authority building",
      ],
      image: "/off-page-seo.png?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Technical SEO",
      description:
        "We ensure your website's technical foundation is solid, allowing search engines to crawl, index, and rank your site effectively.",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Site speed optimization",
        "Mobile-friendliness improvements",
        "Schema markup implementation",
        "XML sitemap creation",
        "Robots.txt optimization",
        "Fixing crawl errors and broken links",
      ],
      image: "/technical-seo.png?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Local SEO",
      description:
        "We optimize your online presence to attract more business from relevant local searches, helping you connect with nearby customers.",
      icon: <Map className="h-6 w-6" />,
      features: [
        "Google Business Profile optimization",
        "Local keyword targeting",
        "Citation building and cleanup",
        "Review management",
        "Local link building",
        "Local content strategy",
      ],
      image: "/local-seo.png?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Higher Rankings",
      description:
        "Improve your website's visibility in search engine results pages.",
      icon: TrendingUp,
    },
    {
      title: "Quality Traffic",
      description:
        "Attract more qualified visitors who are actively searching for your services.",
      icon: Users,
    },
    {
      title: "Content Optimization",
      description:
        "Create and optimize content that resonates with your target audience.",
      icon: FileText,
    },
    {
      title: "Technical SEO",
      description:
        "Ensure your website meets all technical requirements for better rankings.",
      icon: Settings,
    },
    {
      title: "Performance Metrics",
      description:
        "Track and analyze your SEO performance with detailed analytics.",
      icon: BarChart,
    },
    {
      title: "Local SEO",
      description:
        "Enhance your visibility in local search results and Google Maps.",
      icon: MapPin,
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "SEO Audit & Analysis",
      description:
        "We conduct a comprehensive analysis of your website's current SEO performance, identifying strengths, weaknesses, and opportunities.",
      icon: <Search className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "02",
      title: "Keyword Research",
      description:
        "We identify the most valuable and relevant keywords for your business, considering search volume, competition, and user intent.",
      icon: <Compass className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "03",
      title: "On-Page Optimization",
      description:
        "We optimize your website's content, meta tags, headers, and other on-page elements to improve relevance and rankings.",
      icon: <FileText className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
    {
      number: "04",
      title: "Technical Optimization",
      description:
        "We address technical issues that may be hindering your site's performance in search results, such as site speed and mobile-friendliness.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "05",
      title: "Off-Page Strategy",
      description:
        "We implement strategies to build your site's authority through quality backlinks, social signals, and other off-page factors.",
      icon: <Link2 className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "06",
      title: "Monitoring & Reporting",
      description:
        "We continuously monitor your SEO performance, providing regular reports and making adjustments to optimize results.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
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
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-8xl">
                SEO{" "}
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
                  Optimization
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                We boost your online visibility and drive organic traffic with
                our comprehensive SEO strategies.
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
              textClassName="text-lg md:text-2xl text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Strategic SEO solutions designed to boost your online visibility
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
              Maximize your online presence with our proven SEO strategies
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
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-16">
            <div className="relative z-10 md:mt-0">
              <motion.div className="mx-auto max-w-3xl text-center">
                <h1 className="text-5xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl">
                  Ready to boost your{" "}
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
                  textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={3}
                  blurStrength={4}
                >
                  Let's optimize your website for better visibility and drive
                  more organic traffic to your business.
                </ScrollReveal>
                <div
                  style={{
                    width: "100%",
                    height: "600px",
                    position: "relative",
                  }}
                >
                  <div className="absolute inset-0 z-10">
                    <Orb
                      hoverIntensity={0.5}
                      rotateOnHover={true}
                      hue={0}
                      forceHoverState={false}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div className="flex flex-col items-center justify-center gap-4 pointer-events-auto">
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
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
