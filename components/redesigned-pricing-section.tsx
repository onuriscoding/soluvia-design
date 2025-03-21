"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-thight sm:text-4xl md:text-5xl">
            Transparent <span className="text-gradient-soluvia">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Starting prices for projects with customized monthly maintenance
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl ${
                plan.popular ? "border-2 border-rose" : "border border-ivory/10"
              } bg-charcoal/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose/5 transform hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0">
                  <div className="relative h-20 w-20 overflow-hidden">
                    <div className="absolute right-[-40px] top-[32px] w-[170px] rotate-45 bg-gradient-to-r font-anton from-rose to-sapphire py-1 text-center text-xs font-medium text-ivory">
                      Most Popular
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-anton tracking-wide text-ivory">
                  {plan.name}
                </h3>
                <p className="mt-2 text-ivory/70">{plan.description}</p>

                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline text-ivory mb-1">
                    <div className="flex items-baseline">
                      <span className="text-sm font-medium text-ivory/70 mr-1">
                        from
                      </span>
                      <span className="text-5xl font-anton tracking-wide">
                        €{plan.price.setup}
                      </span>
                    </div>
                    <span className="ml-1 text-2xl font-anton tracking-wide text-ivory/70">
                      setup
                    </span>
                  </div>
                  <div className="flex items-baseline text-ivory">
                    <span className="text-base text-ivory/70 mt-2 italic">
                      + Custom monthly maintenance
                    </span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + i * 0.05,
                      }}
                    >
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
                    </motion.li>
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
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="ml-2 inline-flex"
                    >
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 rounded-2xl border border-ivory/10 bg-charcoal/50 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-bold text-ivory">
                Need a custom solution?
              </h3>
              <p className="mt-2 text-ivory/70">
                Our team can build tailored solutions to fit your needs. Get in
                touch to discuss your project.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose to-sapphire px-6 py-3 font-medium text-ivory hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
            >
              Get a Quote{" "}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="ml-2 inline-flex"
              >
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
