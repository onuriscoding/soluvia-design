"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Rocket,
  BarChart,
} from "lucide-react";

const processSteps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery",
    description:
      "We begin by understanding your business, goals, target audience, and competitors to establish a solid foundation for your project.",
    color: "bg-rose",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategy",
    description:
      "Based on our research, we develop a comprehensive strategy that outlines the approach, features, and technologies for your website.",
    color: "bg-sapphire",
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Design",
    description:
      "Our designers create wireframes and visual designs that align with your brand identity and provide an exceptional user experience.",
    color: "bg-beige",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Development",
    description:
      "Our development team brings the designs to life, building a responsive, high-performance website with clean, efficient code.",
    color: "bg-rose",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Launch",
    description:
      "After thorough testing and your approval, we deploy your website and ensure everything is functioning perfectly.",
    color: "bg-sapphire",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Growth",
    description:
      "We provide ongoing support, maintenance, and optimization to help your website evolve and continue driving business results.",
    color: "bg-beige",
  },
];

export function RedesignedProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-anton tracking-wide sm:text-4xl md:text-5xl">
            Our <span className="text-gradient-soluvia">Process</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            A structured approach to delivering exceptional digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mx-auto max-w-5xl"
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose via-sapphire to-beige opacity-50 md:transform md:-translate-x-1/2"></div>

          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-charcoal bg-charcoal z-10">
                <div
                  className={`absolute inset-0 rounded-full ${step.color} animate-pulse`}
                ></div>
              </div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="p-6 rounded-xl bg-charcoal/50 backdrop-blur-sm border border-ivory/10 hover:border-rose/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-rose/5">
                  <div className="flex items-center mb-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-ivory mr-4`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-anton tracking-wide text-ivory">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-ivory/70">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
