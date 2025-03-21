"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

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
];

export function RedesignedFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
          <h2 className="text-3xl font-bold tracking-thight sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="text-gradient-soluvia">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
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
      </div>
    </section>
  );
}
