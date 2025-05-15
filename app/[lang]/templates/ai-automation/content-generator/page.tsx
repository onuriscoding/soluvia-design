'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, FileText, Type, BarChart, Tag, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';
import GradientText from '@/app/animations/gradient-text';
import ScrollReveal from '@/app/animations/scroll-reveal';
import { SpotlightCard } from '@/components/ui/spotlight-card';

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

export default function ContentGeneratorPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const { language } = useI18n();
  
  // Helper function to localize URLs
  const localizeUrl = (path: string) => {
    // Handle root path
    if (path === "/") {
      return `/${language}`;
    }
    // Handle other paths
    return `/${language}${path}`;
  };
  
  const features = [
    {
      title: "Brand Voice Customization",
      description: "Fine-tune AI outputs to match your unique brand voice and style",
      icon: Type
    },
    {
      title: "SEO Optimization",
      description: "Generate content with built-in SEO best practices for better rankings",
      icon: Tag
    },
    {
      title: "Multi-format Content",
      description: "Create blog posts, social media updates, emails, and product descriptions",
      icon: FileText
    },
    {
      title: "Performance Analytics",
      description: "Track engagement metrics and optimize your content strategy",
      icon: BarChart
    }
  ];
  
  const contentTypes = [
    "Blog Articles",
    "Social Media Posts",
    "Email Newsletters",
    "Product Descriptions",
    "Ad Copy",
    "Landing Page Content",
    "Press Releases",
    "Video Scripts"
  ];
  
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-beige/5 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4">
        <Link 
          href={localizeUrl("/templates")}
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
                colors={["#3d5a80", "#e0d5c0", "#3d5a80"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                AI Content Generator
              </GradientText>
            </h1>
            
            <ScrollReveal
              textClassName="text-xl text-ivory/70 mb-10"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              Generate high-quality marketing content, product descriptions, blog posts, and 
              social media updates tailored to your brand voice and target audience.
            </ScrollReveal>
            
            <div className="bg-charcoal/40 backdrop-blur-sm border border-sapphire/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-ivory mb-6">
                Content Types
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentTypes.map((type, index) => (
                  <div key={index} className="bg-sapphire/10 rounded-lg p-3 text-center">
                    <span className="text-ivory/90 font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <SpotlightCard 
              variant="sapphire" 
              className="p-8 mb-6"
              buttonText="Request Demo"
              buttonHref={localizeUrl("/contact")}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-ivory mb-2">Transform Your Content Strategy</h3>
                  <p className="text-ivory/70">Generate engaging content in minutes instead of hours.</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <SpotlightCard variant="default" className="h-full">
              <h3 className="text-2xl font-bold text-ivory mb-6">The AI Content Advantage</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-sapphire rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-ivory" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-ivory">10x Faster Content Creation</h4>
                    <p className="text-ivory/70">Generate month's worth of content in a single afternoon</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-sapphire rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-ivory" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-ivory">Consistent Brand Voice</h4>
                    <p className="text-ivory/70">Maintain consistent messaging across all channels</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-sapphire rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-ivory" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-ivory">SEO-Optimized By Default</h4>
                    <p className="text-ivory/70">Built-in optimization for search engines</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-sapphire rounded-full p-1 mr-3 mt-0.5">
                    <Check className="h-3 w-3 text-ivory" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-ivory">Scalable Content Production</h4>
                    <p className="text-ivory/70">Scale your content strategy without expanding your team</p>
                  </div>
                </li>
              </ul>
            </SpotlightCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <SpotlightCard key={index} variant={index % 2 === 0 ? "sapphire" : "beige"}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-3">
                      <div className={`mr-3 p-2 rounded-lg ${index % 2 === 0 ? 'bg-sapphire/20' : 'bg-beige/20'}`}>
                        <feature.icon className="h-5 w-5 text-ivory" />
                      </div>
                      <h3 className="text-lg font-bold text-ivory">{feature.title}</h3>
                    </div>
                    <p className="text-ivory/70 text-sm">{feature.description}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-ivory mb-6">How Our AI Content Generator Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <SpotlightCard variant="default" className="h-full">
              <h3 className="text-2xl font-bold text-ivory mb-6">Process Visualization</h3>
              
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src="/images/ai-content-workflow.webp" 
                  alt="AI Content Generation Workflow" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className="rounded-lg"
                />
              </div>
            </SpotlightCard>
            
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex gap-4 items-center">
                <div className="bg-sapphire/20 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-ivory">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ivory">Define Your Brief</h3>
                  <p className="text-ivory/70">Specify topic, audience, tone, and format through our intuitive interface.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="bg-beige/20 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-ivory">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ivory">AI Generation</h3>
                  <p className="text-ivory/70">Our AI analyzes your brand voice and industry to generate relevant content.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="bg-sapphire/20 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-ivory">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ivory">Review & Publish</h3>
                  <p className="text-ivory/70">Edit the content if needed, then publish to your desired platform.</p>
                </div>
              </div>
            </div>
          </div>
          
          <SpotlightCard 
            className="text-center p-10"
            buttonText="Get Started Today"
            buttonHref={localizeUrl("/contact")}
          >
            <h3 className="text-2xl font-bold text-ivory mb-6">Ready to Revolutionize Your Content Strategy?</h3>
            <p className="text-ivory/70 mb-6 max-w-2xl mx-auto">
              Our AI Content Generator can help you create consistent, high-quality content at scale, 
              freeing up your team to focus on strategy and creativity.
            </p>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  );
} 