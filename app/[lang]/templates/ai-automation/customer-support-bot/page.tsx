'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MessageSquare, Users, Database, Award, ArrowRight } from 'lucide-react';
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

export default function CustomerSupportBotPage({ 
  params 
}: { 
  params: { lang: string } 
}) {
  const { language } = useI18n();
  
  // Helper hook to localize URLs
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
      title: "24/7 Automated Support",
      description: "Provide round-the-clock customer service without human intervention",
      icon: MessageSquare
    },
    {
      title: "Natural Language Understanding",
      description: "AI that comprehends customer queries with high accuracy",
      icon: Database
    },
    {
      title: "Multi-channel Integration",
      description: "Deploy across website, messaging apps, and social platforms",
      icon: Users
    },
    {
      title: "Knowledge Base Integration",
      description: "Automatically pull answers from your existing documentation",
      icon: Award
    }
  ];
  
  const benefits = [
    "Reduce support costs by up to 70%",
    "Decrease average response time from hours to seconds",
    "Improve customer satisfaction with instant responses",
    "Free up human agents to handle complex issues",
    "Scale your support operations without adding headcount",
    "Gather valuable customer insights through conversation analysis"
  ];
  
  return (
    <div className="relative min-h-screen overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
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
                colors={["#b76e79", "#e0d5c0", "#b76e79", "#3d5a80"]}
                animationSpeed={12}
                showBorder={false}
                className="inline-block"
              >
                Customer Support Chatbot
              </GradientText>
            </h1>
            
            <ScrollReveal
              textClassName="text-xl text-ivory/70 mb-10"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              AI-powered chatbot that handles customer inquiries, provides instant responses, 
              and escalates complex issues to human agents when necessary.
            </ScrollReveal>
            
            <div className="bg-charcoal/40 backdrop-blur-sm border border-rose/10 rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-ivory mb-6">
                Key Benefits
              </h2>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-rose rounded-full p-1 mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-ivory" />
                    </div>
                    <span className="text-ivory/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <SpotlightCard variant="rose" className="p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-ivory mb-2">Ready to Implement?</h3>
                  <p className="text-ivory/70">Get started with our Customer Support Chatbot solution today.</p>
                </div>
                <Link 
                  href={localizeUrl("/contact")}
                  className="inline-flex items-center justify-center h-12 px-8 font-medium transition-colors border-2 border-rose text-ivory hover:bg-rose/10 rounded-full whitespace-nowrap"
                >
                  <span className="flex items-center">
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <SpotlightCard variant="default" className="h-full">
              <h3 className="text-2xl font-bold text-ivory mb-6">Solution Overview</h3>
              
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src="/images/ai-chatbot-workflow.webp" 
                  alt="AI Chatbot Workflow Diagram" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className="rounded-lg"
                />
              </div>
            </SpotlightCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <SpotlightCard 
                  key={index} 
                  variant={index % 2 === 0 ? "rose" : "sapphire"}
                  buttonText={index === 0 ? "Learn More" : undefined}
                  buttonHref={index === 0 ? localizeUrl("/solutions") : undefined}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-3">
                      <div className={`mr-3 p-2 rounded-lg ${index % 2 === 0 ? 'bg-rose/20' : 'bg-sapphire/20'}`}>
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
          <h2 className="text-3xl font-bold text-ivory mb-6">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <SpotlightCard>
              <h3 className="text-xl font-bold text-ivory mb-4">Integration Options</h3>
              <ul className="space-y-3">
                <li className="text-ivory/80">
                  <span className="font-bold">APIs:</span> REST, GraphQL
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">Platforms:</span> Web, iOS, Android, WhatsApp, Facebook Messenger
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">CRM Systems:</span> Salesforce, HubSpot, Zendesk
                </li>
              </ul>
            </SpotlightCard>
            
            <SpotlightCard>
              <h3 className="text-xl font-bold text-ivory mb-4">AI Capabilities</h3>
              <ul className="space-y-3">
                <li className="text-ivory/80">
                  <span className="font-bold">Language Models:</span> GPT-4, BERT, Custom-trained models
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">Languages:</span> 40+ languages with automatic detection
                </li>
                <li className="text-ivory/80">
                  <span className="font-bold">Sentiment Analysis:</span> Real-time customer emotion tracking
                </li>
              </ul>
            </SpotlightCard>
          </div>
          
          <SpotlightCard 
            className="text-center p-10"
            buttonText="Contact Our AI Team"
            buttonHref={localizeUrl("/contact")}
          >
            <h3 className="text-2xl font-bold text-ivory mb-6">Need a customized solution?</h3>
            <p className="text-ivory/70 mb-6 max-w-2xl mx-auto">
              Our team can tailor this chatbot solution to your specific business requirements, 
              integrating with your existing systems and customizing the AI to your industry terminology.
            </p>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  );
} 