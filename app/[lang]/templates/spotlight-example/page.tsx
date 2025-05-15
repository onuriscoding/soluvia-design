'use client';

import React from 'react';
import Link from 'next/link';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { useI18n } from '@/lib/i18n/i18nContext';
import { ArrowLeft, Check } from 'lucide-react';
import GradientText from '@/app/animations/gradient-text';
import ScrollReveal from '@/app/animations/scroll-reveal';
import { motion } from 'framer-motion';

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function SpotlightTemplatePage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const { t, language } = useI18n();
  
  const features = [
    "Interactive hover effects with spotlight",
    "Tailwind CSS styling that matches your theme",
    "Compatible with React 18+ and Next.js",
    "Supports multiple color variants",
    "Customizable spotlight color and border",
    "Fully responsive design"
  ];
  
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
          Back to Templates
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
                Spotlight Card Component
              </GradientText>
            </h1>
            
            <ScrollReveal
              textClassName="text-xl text-ivory/70 mb-10"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              An elegant interactive card component with a dynamic spotlight effect that follows the user's cursor movement.
            </ScrollReveal>
            
            <div className="bg-charcoal/40 backdrop-blur-sm border border-rose/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-ivory mb-6">
                Features
              </h2>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-rose rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-ivory" />
                    </div>
                    <span className="text-ivory/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <SpotlightCard variant="default" className="h-full">
              <h3 className="text-2xl font-bold text-ivory mb-4">Default Variant</h3>
              <p className="text-ivory/70">
                Hover over this card to see the default spotlight effect. This component creates an interactive experience that responds to user mouse movements.
              </p>
            </SpotlightCard>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard variant="rose">
                <h3 className="text-lg font-bold text-ivory mb-2">Rose Variant</h3>
                <p className="text-ivory/70 text-sm">
                  Themed with the rose color palette.
                </p>
              </SpotlightCard>
              
              <SpotlightCard variant="sapphire">
                <h3 className="text-lg font-bold text-ivory mb-2">Sapphire Variant</h3>
                <p className="text-ivory/70 text-sm">
                  Themed with the sapphire color palette.
                </p>
              </SpotlightCard>
              
              <SpotlightCard variant="beige">
                <h3 className="text-lg font-bold text-ivory mb-2">Beige Variant</h3>
                <p className="text-ivory/70 text-sm">
                  Themed with the beige color palette.
                </p>
              </SpotlightCard>
            </div>
            
            <SpotlightCard 
              spotlightColor="rgba(183, 110, 121, 0.5)" 
              className="border-rose/50"
            >
              <h3 className="text-xl font-bold text-ivory mb-2">Custom Spotlight</h3>
              <p className="text-ivory/70">
                You can customize the spotlight color and other properties to match your design needs.
              </p>
            </SpotlightCard>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-ivory mb-6">How to Use</h2>
          
          <SpotlightCard className="mb-10">
            <pre className="text-ivory/80 overflow-auto p-4">
              {`import { SpotlightCard } from '@/components/ui/spotlight-card';

// In your component:
<SpotlightCard variant="rose" className="p-6">
  <h3 className="text-xl font-bold">Your Content Here</h3>
  <p>Any content can go inside the card component.</p>
</SpotlightCard>`}
            </pre>
          </SpotlightCard>
          
          <h2 className="text-3xl font-bold text-ivory mb-6">Props</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard>
              <h3 className="text-xl font-bold text-ivory mb-4">Basic Props</h3>
              <ul className="space-y-3">
                <li className="text-ivory/80">
                  <span className="font-bold">className</span>: Additional CSS classes
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">children</span>: React children to render inside the card
                </li>
              </ul>
            </SpotlightCard>
            
            <SpotlightCard>
              <h3 className="text-xl font-bold text-ivory mb-4">Appearance Props</h3>
              <ul className="space-y-3">
                <li className="text-ivory/80">
                  <span className="font-bold">variant</span>: 'default', 'rose', 'sapphire', or 'beige'
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">spotlightColor</span>: Custom spotlight color (rgba format)
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">hoverEffect</span>: Enable/disable the hover effect (boolean)
                </li>
              </ul>
            </SpotlightCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 