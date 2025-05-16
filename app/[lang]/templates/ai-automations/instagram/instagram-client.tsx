"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18nContext";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function InstagramAutomationClient({
  params,
  dictionary,
}: {
  params: { lang: string };
  dictionary: any;
}) {
  const { language } = useI18n();
  const localizeUrl = (path: string) =>
    path === "/" ? `/${language}` : `/${language}${path}`;

  return (
    <div className="relative min-h-screen overflow-hidden mt-24 pt-24 pb-32">
      <motion.div
        className="container relative z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <Link
            href={localizeUrl("/templates")}
            className="inline-flex items-center text-ivory/70 hover:text-ivory transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {dictionary?.templates?.backToTemplates || "Back to Templates"}
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* LEFT: Content */}
          <motion.div
            className="flex-1 min-w-[320px] max-w-xl"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-ivory mb-6 leading-tight">
              {dictionary?.templates?.templateDetails?.instagramAutomation
                ?.title || "Instagram Automation"}
            </h1>
            <p className="text-xl text-ivory/80 mb-8 max-w-lg">
              {dictionary?.templates?.templateDetails?.instagramAutomation
                ?.description ||
                "Automate your Instagram engagement with AI-powered comment replies and direct message responses. Save time while maintaining authentic connections with your audience."}
            </p>
            <motion.div variants={itemVariants}>
              <SpotlightCard
                variant="default"
                className="flex flex-col justify-between bg-ivory/90 border border-ivory/20 rounded-2xl shadow-lg p-6 overflow-hidden w-full"
              >
                <h2 className="text-lg font-bold text-charcoal mb-4 tracking-tight">
                  {dictionary?.templates?.templateDetails?.instagramAutomation
                    ?.howItWorksTitle || "How It Works"}
                </h2>
                <ul className="list-none space-y-3 text-base">
                  <li className="flex items-start text-charcoal/80">
                    <span className="inline-flex items-center justify-center rounded-full bg-rose/10 p-1 mr-3 mt-0.5">
                      <span className="inline-flex h-2 w-2 rounded-full bg-rose"></span>
                    </span>
                    {dictionary?.templates?.templateDetails?.instagramAutomation
                      ?.howItWorks?.[0] ||
                      "The automation listens to your Instagram webhooks for new comments."}
                  </li>
                  <li className="flex items-start text-charcoal/80">
                    <span className="inline-flex items-center justify-center rounded-full bg-rose/10 p-1 mr-3 mt-0.5">
                      <span className="inline-flex h-2 w-2 rounded-full bg-rose"></span>
                    </span>
                    {dictionary?.templates?.templateDetails?.instagramAutomation
                      ?.howItWorks?.[1] ||
                      "Smart, context-aware replies are generated instantly by the AI."}
                  </li>
                  <li className="flex items-start text-charcoal/80">
                    <span className="inline-flex items-center justify-center rounded-full bg-rose/10 p-1 mr-3 mt-0.5">
                      <span className="inline-flex h-2 w-2 rounded-full bg-rose"></span>
                    </span>
                    {dictionary?.templates?.templateDetails?.instagramAutomation
                      ?.howItWorks?.[2] ||
                      "It automatically replies to a comment and sends a custom DM to the user."}
                  </li>
                  <li className="flex items-start text-charcoal/80">
                    <span className="inline-flex items-center justify-center rounded-full bg-rose/10 p-1 mr-3 mt-0.5">
                      <span className="inline-flex h-2 w-2 rounded-full bg-rose"></span>
                    </span>
                    {dictionary?.templates?.templateDetails?.instagramAutomation
                      ?.howItWorks?.[3] ||
                      "You can customize the AI model and parameters to fit your needs."}
                  </li>
                </ul>
              </SpotlightCard>
            </motion.div>
          </motion.div>

          {/* RIGHT: Workflow image + download */}
          <motion.div
            className="flex-1 flex flex-col items-center gap-8 min-w-[320px] max-w-lg"
            variants={itemVariants}
          >
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl border border-ivory/10 bg-ivory/5 backdrop-blur-md flex items-center justify-center">
              <Image
                src="/instagram-automation.png"
                alt={
                  dictionary?.templates?.templateDetails?.instagramAutomation
                    ?.title + " workflow diagram" ||
                  "Instagram Automation Workflow diagram"
                }
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <a
              href="/Instagram.json"
              download="Instagram.json"
              className="group inline-flex items-center justify-center rounded-full bg-ivory/90 px-8 py-3 text-lg font-bold tracking-tighter text-rose transition-all duration-300 hover:shadow-rose/30 "
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-charcoal">
                {dictionary?.templates?.download || "Download Template"}
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
