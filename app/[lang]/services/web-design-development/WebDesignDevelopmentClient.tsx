"use client";

import {
  ArrowRight,
  BarChart,
  ChevronDown,
  Code,
  Layers,
  Palette,
  Search,
  Shield,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import { ServiceFeatureSection } from "@/components/service-feature-section";
import Link from "next/link";
import Orb from "@/components/orb";
import { useLocalizedUrl } from "@/app/hooks/use-localized-url";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ListItem {
  text: string;
}

interface DictionaryBenefit {
  title: string;
  description: string;
}

interface WebDesignDevelopmentClientProps {
  dictionary: any;
}

export default function WebDesignDevelopmentClient({
  dictionary,
}: WebDesignDevelopmentClientProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const localizedUrl = useLocalizedUrl();
  // Define fallback features in case dictionary structure doesn't match
  const defaultFeatures = [
    {
      title: "Custom Website Design",
      description:
        "We create stunning, responsive websites that captivate your audience and reflect your brand's unique identity.",
      icon: <Palette className="h-6 w-6" />,
      features: [
        "Responsive design for all devices",
        "Custom UI/UX design",
        "Brand-aligned visual elements",
        "Intuitive navigation",
        "Optimized user journeys",
        "Accessibility compliance",
      ],
      image: "/web-design.png?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
      color: "rose",
    },
    {
      title: "Web Development",
      description:
        "Our development team builds robust, scalable websites and web applications that deliver exceptional performance and functionality.",
      icon: <Code className="h-6 w-6" />,
      features: [
        "Front-end development (React, Next.js)",
        "Back-end development (Node.js, Python)",
        "Database design and implementation",
        "API development and integration",
        "E-commerce functionality",
        "Content management systems",
      ],
      image: "/web-development.png?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
      color: "sapphire",
    },
    {
      title: "Mobile-First Approach",
      description:
        "We prioritize mobile experiences, ensuring your website performs flawlessly across all devices.",
      icon: <Smartphone className="h-6 w-6" />,
      features: [
        "Mobile-optimized layouts",
        "Touch-friendly interfaces",
        "Fast loading on mobile networks",
        "Progressive Web App capabilities",
        "Responsive images and media",
        "Mobile performance optimization",
      ],
      image: "/mobile.png?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
      color: "beige",
    },
  ];

  // Try to access the features from dictionary with safer fallback pattern
  const features = (() => {
    try {
      if (
        dictionary &&
        dictionary["web-design-development"] &&
        dictionary["web-design-development"].solutions &&
        dictionary["web-design-development"].solutions[0] &&
        dictionary["web-design-development"].solutions[0].features
      ) {
        return [
          {
            title:
              dictionary["web-design-development"].solutions[0].features[0]
                .title,
            description:
              dictionary["web-design-development"].solutions[0].features[0]
                .description,
            icon: <Palette className="h-6 w-6" />,
            features: dictionary[
              "web-design-development"
            ].solutions[0].features[0].list.map((item: ListItem) => item.text),
            image: "/web-design.png?height=600&width=800",
            gradient: "from-rose/20 to-sapphire/20",
            color: "rose",
          },
          {
            title:
              dictionary["web-design-development"].solutions[0].features[1]
                .title,
            description:
              dictionary["web-design-development"].solutions[0].features[1]
                .description,
            icon: <Code className="h-6 w-6" />,
            features: dictionary[
              "web-design-development"
            ].solutions[0].features[1].list.map((item: ListItem) => item.text),
            image: "/web-development.png?height=600&width=800",
            gradient: "from-sapphire/20 to-beige/20",
            color: "sapphire",
          },
          {
            title:
              dictionary["web-design-development"].solutions[0].features[2]
                .title,
            description:
              dictionary["web-design-development"].solutions[0].features[2]
                .description,
            icon: <Smartphone className="h-6 w-6" />,
            features: dictionary[
              "web-design-development"
            ].solutions[0].features[2].list.map((item: ListItem) => item.text),
            image: "/mobile.png?height=600&width=800",
            gradient: "from-beige/20 to-rose/20",
            color: "beige",
          },
        ];
      }
      return defaultFeatures;
    } catch (error) {
      console.error("Error accessing dictionary features:", error);
      return defaultFeatures;
    }
  })();

  // Default benefits
  const defaultBenefits = [
    {
      title: "Enhanced User Experience",
      description:
        "Create intuitive, engaging interfaces that keep visitors on your site longer and guide them toward conversion.",
      icon: Users,
    },
    {
      title: "Performance Optimization",
      description:
        "Fast-loading, optimized websites that provide a seamless experience and rank better in search results.",
      icon: Zap,
    },
    {
      title: "Scalable Solutions",
      description:
        "Future-proof websites that can grow with your business and adapt to changing needs and technologies.",
      icon: Layers,
    },
    {
      title: "SEO-Friendly Structure",
      description:
        "Built-in search engine optimization that helps your website rank higher and attract more organic traffic.",
      icon: Search,
    },
    {
      title: "Conversion-Focused Design",
      description:
        "Strategic layouts and elements designed to guide visitors toward taking desired actions on your site.",
      icon: BarChart,
    },
    {
      title: "Enhanced Security",
      description:
        "Robust security measures to protect your website and user data from threats and vulnerabilities.",
      icon: Shield,
    },
  ];

  // Try to access benefits from dictionary with safer fallback pattern
  const benefits: Benefit[] = (() => {
    try {
      if (
        dictionary &&
        dictionary["web-design-development"] &&
        dictionary["web-design-development"].benefits &&
        Array.isArray(dictionary["web-design-development"].benefits)
      ) {
        const icons = [Users, Zap, Layers, Search, BarChart, Shield];
        return dictionary["web-design-development"].benefits.map(
          (benefit: DictionaryBenefit, index: number) => ({
            title: benefit.title,
            description: benefit.description,
            icon: icons[index % icons.length],
          })
        );
      }
      return defaultBenefits;
    } catch (error) {
      console.error("Error accessing dictionary benefits:", error);
      return defaultBenefits;
    }
  })();

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

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Safely access dictionary values with fallbacks
  const getWebDesignText = (key: string, fallback: string): string => {
    try {
      if (dictionary && dictionary["web-design-development"]) {
        return dictionary["web-design-development"][key] || fallback;
      }
      return fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Access services section with fallback
  const getServiceText = (key: string, fallback: string): string => {
    try {
      if (dictionary && dictionary.services) {
        return dictionary.services[key] || fallback;
      }
      return fallback;
    } catch (error) {
      return fallback;
    }
  };

  // Access navigation texts with fallback
  const getNavigationText = (key: string, fallback: string): string => {
    try {
      if (dictionary && dictionary.navigation) {
        return dictionary.navigation[key] || fallback;
      }
      return fallback;
    } catch (error) {
      return fallback;
    }
  };

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
            className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full "
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
          className="container relative z-10 px-4 -mt-24"
        >
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-bold tracking-tight text-ivory md:text-[9rem] flex flex-col items-center text-center">
                <div className="leading-tight">Web Design</div>
                <div className="leading-tight text-[5rem] md:text-[7rem]">
                  &
                </div>
                <GradientText
                  colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                  animationSpeed={12}
                  showBorder={false}
                  className="inline-block"
                >
                  {getWebDesignText("development", "Development")}
                </GradientText>
              </h1>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                {getWebDesignText(
                  "subTitle",
                  "We create stunning, responsive websites that captivate your audience and reflect your brand's unique identity."
                )}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
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
          <div className="relative flex -left-1/2 items-center justify-center -mt-32">
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
              {getWebDesignText("ourSolutions", "Our")}{" "}
              <GradientText
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
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
              {getWebDesignText(
                "SolutionsSubTitle",
                "Comprehensive web solutions designed to elevate your online presence"
              )}
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
      <section className="relative py-24 md:py-32">
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
              {getWebDesignText("benefitsTitle1", "Our")}{" "}
              <GradientText
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                {getWebDesignText("benefitsTitle2", "Benefits")}
              </GradientText>{" "}
              {getWebDesignText("benefitsTitle3", "to your business")}
            </h2>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {getWebDesignText(
                "benefitsSubTitle",
                "Experience the advantages of our professional web design and development services"
              )}
            </ScrollReveal>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                {getWebDesignText("ctaTitle1", "Ready for a website that")}{" "}
                <GradientText
                  colors={["#b76e79", "#e0d5c0", "#b76e79", "#e0d5c0"]}
                  animationSpeed={12}
                  showBorder={false}
                  className="inline-block"
                >
                  {getWebDesignText("ctaTitle2", "stands out")}
                </GradientText>
                ?
              </h1>
              <ScrollReveal
                textClassName="text-lg md:text-2xl mt-4 -mb-18 text-ivory/70 max-w-6xl"
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
              >
                {getWebDesignText(
                  "ctaSubTitle",
                  "Let's create something extraordinary together. Transform your online presence with a stunning, high-performance website."
                )}
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
                  <motion.div className="flex flex-col items-center justify-center gap-4 pointer-events-auto">
                    <Link
                      href={localizedUrl("/contact")}
                      className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-ivory/90 text-rose hover:text-charcoal font-bold tracking-tighter px-6 py-3 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        {getNavigationText("getStarted", "GET STARTED")}
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
    </main>
  );
}
