"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import ScrollReveal from "../app/animations/scroll-reveal";
import GradientText from "../app/animations/gradient-text";
import { RedesignedContactStepper } from "./stepper";
import { Palette, Globe, Code } from "lucide-react";

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
    link: "/services/ai-automation",
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
      { included: true, text: "Content management system" },
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
      setup: 1899,
      monthly: 149,
      yearly: 129,
    },
    features: [
      { included: true, text: "Custom website design" },
      { included: true, text: "Responsive design" },
      { included: true, text: "Content management system" },
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
      { included: true, text: "Content management system" },
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

export function RedesignedPricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -200px 0px",
  });
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleContactSubmit = (data: { name: string; phone: string }) => {
    console.log("Contact form submitted:", data);
    // Here you would typically send this data to your backend
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
            <h2 className="text-5xl font-bold tracking-tight sm:text-4xl md:text-7xl flex flex-wrap justify-center items-center gap-x-4">
              <span>Simple,</span>
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
                Transparent
              </GradientText>
              <span>Pricing</span>
            </h2>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 -mb-4 text-ivory/70"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Choose the perfect plan for your business needs
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-2xl ${
                  plan.popular
                    ? "border-2 border-rose"
                    : "border border-ivory/10"
                } bg-charcoal/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose/95 transform hover:-translate-y-1`}
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
                        Most Popular
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-ivory">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-ivory/70">{plan.description}</p>

                  <div className="mt-4 flex flex-col">
                    <div className="flex items-baseline text-ivory mb-1">
                      <div className="flex items-baseline">
                        <span className="text-sm font-medium text-ivory/70 mr-1">
                          from
                        </span>
                        <span className="text-4xl font-bold tracking-tight">
                          €{plan.price.setup}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline text-ivory">
                      <span className="text-base text-ivory/70 mt-2 italic">
                        + Custom monthly maintenance
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
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`group relative inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-rose to-sapphire text-ivory hover:shadow-lg hover:shadow-rose/20"
                          : "bg-charcoal/70 border border-ivory/10 text-ivory hover:bg-charcoal/90 hover:border-rose/30"
                      }`}
                    >
                      Get a Quote{" "}
                      <div className="ml-2 inline-flex arrow-animation">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-32 text-center">
            <ScrollReveal
              textClassName="text-4xl md:text-6xl mt-4 text-ivory"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Need a custom solution?
            </ScrollReveal>
            <ScrollReveal
              textClassName="text-lg md:text-2xl mt-4 text-ivory/70 mb-0"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Contact us to get a custom solution for your business within 24
              hours.
            </ScrollReveal>
          </div>
          <div className="mt-24">
            {/* Redesigned Contact Stepper */}
            <RedesignedContactStepper onSubmit={handleContactSubmit} />
          </div>
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
      `}</style>
    </section>
  );
}
