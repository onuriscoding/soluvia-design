"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import ScrollReveal from "../app/animations/scroll-reveal";
import GradientText from "../app/animations/gradient-text";
import { RedesignedContactStepper } from "./stepper";
import { Palette, Globe, Code } from "lucide-react";
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

interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  image: string;
  link: string;
}

const services: Service[] = [
  {
    id: "web-design",
    icon: Palette,
    title: "Web Design & Development",
    description:
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "sapphire",
    image: "/soluvia.webp?height=600&width=800",
    link: "/services/web-design",
  },
  {
    id: "seo",
    icon: Globe,
    title: "SEO Optimization",
    description:
      "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    color: "beige",
    image: "/seo.png?height=600&width=800",
    link: "/services/seo-optimization",
  },
  {
    id: "automation",
    icon: Code,
    title: "AI Automation",
    description:
      "Automate repetitive tasks and streamline your workflow with our AI automation solutions.",
    color: "sapphire",
    image: "/ai.jpg?height=600&width=800",
    link: "/services/ai-solutions",
  },
];

const pricingPlans = [
  {
    name: "Essential",
    description: "Perfect for small businesses just getting started",
    price: {
      setup: 999,
      monthly: 89,
      yearly: 79,
    },
    features: [
      { included: true, text: "Custom website design" },
      { included: true, text: "Responsive design" },
      { included: true, text: "Basic SEO setup" },
      { included: false, text: "Advanced SEO optimization" },
      { included: false, text: "E-commerce functionality" },
      { included: false, text: "AI automation tools" },
      { included: false, text: "Custom functionality" },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses looking to expand",
    price: {
      setup: 1999,
      monthly: 149,
      yearly: 129,
    },
    features: [
      { included: true, text: "Custom website design" },
      { included: true, text: "Responsive design" },
      { included: true, text: "Basic SEO setup" },
      { included: true, text: "Advanced SEO optimization" },
      { included: true, text: "E-commerce functionality" },
      { included: false, text: "AI automation tools" },
      { included: false, text: "Custom functionality" },
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Comprehensive solution for established businesses",
    price: {
      setup: 2499,
      monthly: 249,
      yearly: 219,
    },
    features: [
      { included: true, text: "Custom website design" },
      { included: true, text: "Responsive design" },
      { included: true, text: "Basic SEO setup" },
      { included: true, text: "Advanced SEO optimization" },
      { included: true, text: "E-commerce functionality" },
      { included: true, text: "AI automation tools" },
      { included: true, text: "Custom functionality" },
    ],
    cta: "Get Started",
    popular: false,
  },
];

export function RedesignedPricingSection({ dictionary }: { dictionary: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });
  const [animationComplete, setAnimationComplete] = useState(false);
  const localizeUrl = useLocalizedUrl();

  // useEffect for the rotating border animation on the popular CTA
  useEffect(() => {
    if (!animationComplete) return;

    const popularButton = document.getElementById("popular-plan-cta") as HTMLElement | null;
    if (!popularButton) return;

    let angle = 0;
    let animationFrameId: number;

    const rotate = () => {
      angle = (angle + 0.7) % 360; // Adjust speed of rotation here (0.7 is a moderate speed)
      popularButton.style.setProperty("--angle", `${angle}deg`);
      animationFrameId = requestAnimationFrame(rotate);
    };

    rotate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animationComplete]);

  // Better way to determine current language
  // If the dictionary has French pricing title "Tarification", we're in French
  const isEnglish = dictionary?.pricing?.sectionTitle !== "Tarification";

  const handleContactSubmit = (data: {
    name: string;
    contactPreference: string;
    phone?: string;
    email?: string;
    description: string;
  }) => {
    console.log("Contact form submitted:", data);
    // The form submission is now handled directly in the stepper component
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden will-change-transform"
    >
      <div className="container relative z-10">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.1,
            onComplete: () => setAnimationComplete(true),
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            {/* Conditional rendering based on language */}
            {isEnglish ? (
              // English version: "Simple, Transparent Pricing"
              <h2 className="text-5xl font-bold tracking-tight sm:text-4xl md:text-7xl flex flex-wrap justify-center items-center gap-x-4">
                <span>{dictionary?.pricing?.sectionSimple || "Simple"}, </span>
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
                  {dictionary?.pricing?.sectionAdjective || "Transparent"}
                </GradientText>
                <span> {dictionary?.pricing?.sectionTitle || "Pricing"}</span>
              </h2>
            ) : (
              // French version: "Tarification simple, transparente"
              <h2 className="text-5xl font-bold tracking-tight sm:text-4xl md:text-7xl flex flex-wrap justify-center items-center gap-x-4">
                <span>
                  {dictionary?.pricing?.sectionTitle || "Tarification"}{" "}
                </span>
                <span>{dictionary?.pricing?.sectionSimple || "simple"}, </span>
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
                  {dictionary?.pricing?.sectionAdjective || "transparente"}
                </GradientText>
              </h2>
            )}
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {dictionary?.pricing?.sectionSubtitle ||
                "Choose the perfect plan for your business needs"}
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`pricing-card relative overflow-hidden rounded-2xl ${
                  plan.popular
                    ? "border-2 border-rose"
                    : "border border-ivory/10"
                } bg-charcoal/50 backdrop-blur-sm`}
                style={{
                  opacity: animationComplete ? 1 : 0,
                  transform: `translateY(${animationComplete ? 0 : 20}px)`,
                  transition: `opacity 0.5s ease ${
                    0.2 + index * 0.1
                  }s, transform 0.5s ease ${0.2 + index * 0.1}s`,
                }}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="relative h-20 w-20 overflow-hidden">
                      <div className="absolute right-[-40px] top-[32px] w-[170px] rotate-45 bg-gradient-to-r from-rose to-sapphire py-1 text-center text-xs font-semibold">
                        {dictionary?.pricing?.plans?.[index]?.popularText ||
                          "Most Popular"}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-ivory">
                    {dictionary?.pricing?.plans?.[index]?.name || plan.name}
                  </h3>
                  <p className="mt-2 text-ivory/70">
                    {dictionary?.pricing?.plans?.[index]?.description ||
                      plan.description}
                  </p>

                  <div className="mt-4 flex flex-col">
                    <div className="flex items-baseline text-ivory mb-1">
                      <div className="flex items-baseline">
                        <span className="text-sm font-medium text-ivory/70 mr-1">
                          {dictionary?.pricing?.from || "from"}
                        </span>
                        <span className="text-4xl font-bold tracking-tight">
                          €{plan.price.setup}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline text-ivory">
                      <span className="text-base text-ivory/70 mt-2 italic">
                        {dictionary?.pricing?.monthly ||
                          "+ Custom monthly maintenance"}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="mt-1 h-5 w-5 flex-shrink-0 text-rose" />
                        ) : (
                          <X className="mt-1 h-5 w-5 flex-shrink-0 text-ivory/30" />
                        )}
                        <span
                          className={
                            feature.included ? "text-ivory/90" : "text-ivory/50"
                          }
                        >
                          {dictionary?.pricing?.plans?.[index]?.features?.[i]
                            ?.text || feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={"https://cal.com/soluviaco/15min?overlayCalendar=true"}
                      id={plan.popular ? "popular-plan-cta" : undefined}
                      className={`group relative inline-flex w-full font-bold tracking-tighter items-center justify-center rounded-full px-6 py-3 transition-all duration-300 ${
                        plan.popular
                          ? "popular-cta-animated-border bg-rose text-ivory hover:text-charcoal hover:shadow-4xl hover:shadow-rose/90"
                          : "bg-ivory/70 border border-ivory/10 text-rose hover:text-charcoal hover:border-rose/30"
                      }`}
                    >
                      {dictionary?.pricing?.getaQuote || "GET A QUOTE"}{" "}
                      <div className="ml-2 inline-flex arrow-animation">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
           {/*
          <div className="mt-32 text-center">
            <ScrollReveal
              textClassName="text-4xl md:text-6xl mt-4 text-ivory"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {dictionary?.pricing?.custom?.title || "Need a custom solution?"}
            </ScrollReveal>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 text-ivory/70 mb-0"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {dictionary?.pricing?.custom?.subtitle ||
                "Contact us to get a custom solution for your business within 24 hours."}
            </ScrollReveal>
          </div>
          <div className="mt-24">
            {/* Redesigned Contact Stepper 
            <RedesignedContactStepper
              onSubmit={handleContactSubmit}
              dictionary={dictionary}
            />
          
          </div>
          */} 
        </motion.div>
      </div>

      <style jsx global>{`
        .arrow-animation {
          animation: arrowPulse 1.5s ease-in-out infinite alternate;
        }

        @keyframes arrowPulse {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(5px);
          }
        }

        .pricing-card {
          position: relative;
          transition: transform 1s ease, box-shadow 2s ease;
          z-index: 1;
          box-shadow: 0 0 0 0 rgba(183, 110, 121, 0);
        }

        .pricing-card:hover {
          transform: translateY(-10px) !important;
          box-shadow: 0 30px 30px -10px rgba(183, 110, 121, 0.3);
        }

        .popular-cta-animated-border {
          --angle: 0deg;
          border: 2px solid transparent !important; /* Ensure transparent border for conic gradient */
          background:
            linear-gradient(#B76E79, #B76E79) padding-box, /* Solid rose background */
            conic-gradient(from var(--angle), transparent, #F8F4F1 5%, transparent 15%) border-box; /* Animated border (ivory/white) */
          background-clip: padding-box, border-box;
          background-origin: padding-box, border-box;
          /* Text color is handled by Tailwind: text-charcoal hover:text-rose */
        }
      `}</style>
    </section>
  );
}
