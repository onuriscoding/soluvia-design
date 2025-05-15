"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import ScrollReveal from "@/app/animations/scroll-reveal";
import GradientText from "@/app/animations/gradient-text";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/i18nContext";

type FAQ = {
  question: string;
  answer: string;
};

interface FAQDictionary {
  faq?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    stillHaveQuestions?: string;
    contactUs?: string;
    questions?: FAQ[];
  };
}

const faqs: FAQ[] = [
  {
    question: "What services does Soluvia offer?",
    answer:
      "Soluvia offers a comprehensive range of digital services including web design, web development, AI automation, SEO optimization, content management systems, and e-commerce solutions. We create sophisticated, elegant websites that drive business growth and optimize your online presence.",
  },
  {
    question: "How does your pricing structure work?",
    answer:
      "Our pricing is transparent and consists of a one-time setup fee (starting from €999 for essential projects) plus a custom monthly maintenance fee based on your specific needs. We tailor our maintenance packages to each client's requirements, ensuring you only pay for what your business truly needs.",
  },
  {
    question: "What is your design and development process?",
    answer:
      "Our process begins with a discovery phase where we learn about your business, goals, and target audience. We then create wireframes and prototypes, followed by visual design. After your approval, we proceed to development, testing, and launch. Throughout the process, we maintain open communication and seek your feedback at key milestones.",
  },
  {
    question: "How can AI automation benefit my business?",
    answer:
      "Our AI automation solutions can streamline your workflow by automating repetitive tasks, enhancing customer interactions, analyzing data patterns, and providing valuable business insights. This leads to improved efficiency, reduced operational costs, and the ability to focus your team's efforts on strategic growth initiatives.",
  },
  {
    question: "How long does it take to complete a website project?",
    answer:
      "The timeline depends on your project's complexity and scope. A standard website typically takes 3-5 weeks, while more complex projects with custom functionality or e-commerce integration may take 8-12 weeks. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we collaborate effectively with clients globally using our digital workflow and communication tools. We schedule meetings at convenient times across different time zones to ensure smooth communication throughout your project.",
  },
  {
    question: "Do you offer ongoing support after the website launch?",
    answer:
      "Absolutely! We provide comprehensive ongoing support through our monthly maintenance plans. These include regular updates, security patches, performance monitoring, content updates, and technical support to ensure your website remains secure, up-to-date, and performing optimally.",
  },
];

// Helper hook to localize URLs
const useLocalizedUrl = () => {
  const { language } = useI18n();

  return (path: string) => {
    // Handle root path
    if (path === "/") {
      return `/${language}`;
    }

    // Handle other paths
    return `/${language}${path}`;
  };
};

export function RedesignedFAQSection({
  dictionary,
}: {
  dictionary?: FAQDictionary;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const localizeUrl = useLocalizedUrl();

  // Use FAQ questions and answers from dictionary if available, otherwise use default ones
  const faqItems: FAQ[] = dictionary?.faq?.questions || faqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <h2 className="text-5xl font-bold tracking-thight sm:text-4xl md:text-6xl">
            {dictionary?.faq?.sectionTitle || "Frequently Asked"}{" "}
            <GradientText
              colors={[
                "#b76e79",
                "#e0d5c0",
                "#b76e79",
                "#e0d5c0",
              ]}
              animationSpeed={12}
              showBorder={false}
              className="inline-block"
            >
              Questions
            </GradientText>
          </h2>
          <ScrollReveal
            textClassName="text-lg md:text-2xl mt-4 text-ivory/70"
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
          >
            {dictionary?.faq?.sectionSubtitle ||
              "Find answers to common questions about our services and process"}
          </ScrollReveal>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqItems.map((faq: FAQ, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-6 text-left rounded-xl transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gradient-to-r from-rose/20 to-sapphire/20 border-rose/30"
                    : "bg-charcoal/50 hover:bg-charcoal/70"
                } backdrop-blur-sm border border-ivory/10`}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-ivory">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-rose" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-ivory/70" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-charcoal/30 backdrop-blur-sm border border-t-0 border-ivory/10 rounded-b-xl">
                      <p className="text-ivory/70">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-ivory/70 mb-4">
            {dictionary?.faq?.stillHaveQuestions || "Still have questions?"}
          </p>
          <Link
            href={localizeUrl("/contact")}
            className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-ivory/90 hover:text-charcoal text-rose font-bold tracking-tighter px-5 py-3 transition-all duration-300 mb-16"
          >
            <span className="relative z-10 flex items-center">
              {dictionary?.faq?.contactUs || "CONTACT US"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
