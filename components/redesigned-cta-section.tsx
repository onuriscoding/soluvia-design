"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Orb from "@/components/orb";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";

export function RedesignedCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animated particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section ref={ref} className="py-24 md:py-32">
      <motion.div
        className="container"
        initial={{ opacity: 0.2, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 ">
          {/* Animated particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-1 w-1 rounded-full bg-rose/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.delay,
              }}
            />
          ))}
          <div className="absolute inset-0 z-0 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-ivory sm:text-4xl md:text-6xl">
              Ready for a solution that{" "}
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
                stands out
              </GradientText>
              ?
            </h1>
          </div>
          <div className="relative z-10 md:mt-0 mt-28">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <ScrollReveal
                textClassName="text-lg md:text-2xl md:mt-4 text-ivory/70"
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={3}
                blurStrength={4}
              >
                Let's create something extraordinary together.
              </ScrollReveal>

              <div
                className="md:mt-0 -mt-12"
                style={{ width: "100%", height: "600px", position: "relative" }}
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
                  <motion.div
                    className="flex flex-col items-center justify-center gap-4 pointer-events-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Link
                      href="/contact"
                      className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-rose px-3 py-2 md:px-6 md:py-3 text-base font-bold tracking-tight text-ivory shadow-lg transition-all duration-300 hover:shadow-rose/30"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-rose to-sapphire opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      <span className="relative z-10 flex items-center">
                        GET STARTED
                        <ArrowRight className="ml-2 md:h-5 md:w-5 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
  );
}
