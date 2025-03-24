"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Calendar, Globe } from "lucide-react";
import ScrollVelocity from "../app/animations/scroll-velocity";

type Stat = {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  color: string;
};

const stats: Stat[] = [
  {
    icon: <Users className="h-6 w-6" />,
    value: 120,
    label: "Happy Clients",
    suffix: "+",
    color: "text-rose",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: 25,
    label: "Awards Won",
    suffix: "+",
    color: "text-sapphire",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    value: 8,
    label: "Years Experience",
    suffix: "+",
    color: "text-beige",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    value: 350,
    label: "Projects Completed",
    suffix: "+",
    color: "text-rose",
  },
];

export function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      const intervals = stats.map((stat, index) => {
        const duration = 2000; // 2 seconds for the count animation
        const increment = stat.value / (duration / 16); // 60fps
        let count = 0;

        return setInterval(() => {
          count = Math.min(count + increment, stat.value);
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(count);
            return newCounts;
          });

          if (count >= stat.value) {
            clearInterval(intervals[index]);
          }
        }, 16);
      });

      return () => {
        intervals.forEach((interval) => clearInterval(interval));
      };
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-12 overflow-hidden min-height-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="py-4">
        <ScrollVelocity
          texts={["What the numbers", "say", "about us", "and", "our", "work"]}
          velocity={50}
          className="custom-scroll-text"
        />
      </div>
      <div className="py-16 container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-charcoal/70 mb-4 ${stat.color}`}
              >
                {stat.icon}
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-ivory">
                  {counts[index]}
                </span>
                <span className="text-2xl font-bold text-rose ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-ivory/70 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
