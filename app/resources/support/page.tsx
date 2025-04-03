"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  LifeBuoy,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GradientText from "@/app/animations/gradient-text";
import { RedesignedContactSection } from "@/components/redesigned-contact-section";

export default function SupportPage() {
  const [isMounted, setIsMounted] = useState(false);
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

  // Support options
  const supportOptions = [
    {
      id: "faq",
      title: "FAQ",
      description: "Find answers to commonly asked questions.",
      icon: <FileText className="h-5 w-5" />,
      color: "text-rose",
      buttonGradient: "from-rose to-sapphire",
      link: "/resources/faq",
    },
    {
      id: "hours",
      title: "Business Hours",
      description: "Check our availability for support.",
      icon: <Clock className="h-5 w-5" />,
      color: "text-sapphire",
      buttonGradient: "from-sapphire to-beige",
      link: "#contact-section",
    },
    {
      id: "contact",
      title: "Contact Us",
      description: "Reach out with specific questions or concerns.",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-beige",
      buttonGradient: "from-beige to-rose",
      link: "#contact-section",
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
                  Support
                </GradientText>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                We're here to help with any questions or concerns you may have
                about our services.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-col items-center gap-6"
            >
              <div className="flex justify-center gap-4 flex-wrap">
                {supportOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      asChild
                      className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full 
                        bg-gradient-to-r ${
                          option.buttonGradient
                        } text-ivory hover:shadow-lg 
                        hover:shadow-${option.color.replace(
                          "text-",
                          ""
                        )}/20 cursor-pointer`}
                    >
                      <Link
                        href={option.link}
                        className="flex items-center gap-2"
                      >
                        {option.icon}
                        <span className="whitespace-nowrap">
                          {option.title}
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
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
              .getElementById("contact-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
          </div>
        </motion.div>
      </section>

      {/* Support Info Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose mb-6">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Documentation
                </h3>
                <p className="text-ivory/70 mb-4">
                  Browse our detailed documentation for guides, tutorials, and
                  best practices.
                </p>
                <Link
                  href="/resources/faq"
                  className="inline-flex items-center text-rose hover:underline"
                >
                  Visit FAQ
                  <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire/10 text-sapphire mb-6">
                  <LifeBuoy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Technical Support
                </h3>
                <p className="text-ivory/70 mb-4">
                  Need help with technical issues? Our support team is here to
                  assist you.
                </p>
                <Link
                  href="#contact-section"
                  className="inline-flex items-center text-sapphire hover:underline"
                >
                  Get Support
                  <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige/10 text-beige mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Business Hours
                </h3>
                <p className="text-ivory/70 mb-4">
                  We're available to assist you during the following hours:
                </p>
                <ul className="text-ivory/70 space-y-1">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <RedesignedContactSection />
    </main>
  );
}
