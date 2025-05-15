"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18nContext";
import GradientText from "@/app/animations/gradient-text";
import ScrollReveal from "@/app/animations/scroll-reveal";
import { useEffect, useState } from "react";

export default function PortfolioTemplatePage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const { t, language } = useI18n();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4">
        <Link 
          href={`/${language}/templates`}
          className="inline-flex items-center text-ivory/70 hover:text-ivory transition-colors mb-12"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("templates.backToTemplates")}
        </Link>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              <GradientText
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#3d5a80"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                {t("templates.templateDetails.portfolio.title")}
              </GradientText>
            </h1>
            
            <ScrollReveal
              textClassName="text-xl text-ivory/70 mb-10"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {t("templates.templateDetails.portfolio.description")}
            </ScrollReveal>
            
            <div className="bg-charcoal/40 backdrop-blur-sm border border-rose/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-ivory mb-6">
                {t("templates.features")}
              </h2>
              
              <ul className="space-y-4">
                {(t("templates.templateDetails.portfolio.features") as unknown as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-rose rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-ivory" />
                    </div>
                    <span className="text-ivory/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link 
              href="#"
              className="inline-flex items-center justify-center h-12 px-8 font-medium transition-colors border-2 border-rose text-ivory hover:bg-rose/10 rounded-full btn-hover-slide"
            >
              <span className="flex items-center">
                {t("templates.download")}
                <Download className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="relative h-96 rounded-xl overflow-hidden mb-10 bg-gradient-to-tr from-rose/20 to-sapphire/20 border border-rose/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-ivory/40 text-lg">Template Preview</span>
              </div>
            </div>
            
            <div className="bg-charcoal/40 backdrop-blur-sm border border-rose/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-ivory mb-4">
                {t("templates.howToUse")}
              </h2>
              
              <p className="text-ivory/70 mb-8">
                {t("templates.templateDetails.portfolio.usage")}
              </p>
              
              <ol className="space-y-6">
                {(t("templates.templateDetails.portfolio.steps") as unknown as string[]).map((step, index) => (
                  <li key={index} className="flex group">
                    <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-rose to-sapphire rounded-full flex items-center justify-center mr-4 transition-transform group-hover:scale-110">
                      <span className="text-ivory font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-ivory/80 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-ivory/10 to-transparent my-24"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">
            {t("templates.needCustomDesign")}
          </h2>
          
          <ScrollReveal
            textClassName="text-xl text-ivory/70 mb-10"
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
          >
            {t("templates.templateDetails.portfolio.customSolution")}
          </ScrollReveal>
          
          <Link 
            href={`/${language}/contact`}
            className="inline-flex items-center justify-center h-12 px-8 font-medium transition-colors border-2 border-rose text-ivory hover:bg-rose/10 rounded-full btn-hover-slide"
          >
            <span className="flex items-center">
              {t("templates.contactUs")}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 