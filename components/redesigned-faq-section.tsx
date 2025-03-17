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
    question: "What services does Soluvia Design offer?",
    answer:
      "Soluvia Design offers a comprehensive range of digital services including web design, web development, e-commerce solutions, SEO optimization, content management systems, and digital strategy consulting. We specialize in creating sophisticated, elegant websites that drive business growth and optimize your online presence.",
  },
  {
    question: "How long does it take to complete a website project?",
    answer:
      "The timeline for a website project depends on its complexity and scope. A simple website might take 4-6 weeks, while more complex projects with custom functionality could take 8-12 weeks or more. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements.",
  },
  {
    question: "What is your design process like?",
    answer:
      "Our design process begins with a discovery phase where we learn about your business, goals, and target audience. We then move to wireframing and prototyping, followed by visual design. After your approval, we proceed to development, testing, and launch. Throughout the process, we maintain open communication and seek your feedback at key milestones.",
  },
  {
    question: "Do you offer website maintenance services?",
    answer:
      "Yes, we offer ongoing website maintenance services to ensure your site remains secure, up-to-date, and performing optimally. Our maintenance packages include regular updates, security monitoring, performance optimization, content updates, and technical support.",
  },
  {
    question: "How much does a website project cost?",
    answer:
      "The cost of a website project varies based on its complexity, features, and requirements. We offer different packages to accommodate various budgets and needs. During our consultation, we'll discuss your requirements and provide a detailed quote tailored to your specific project.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we work with clients globally. Our digital workflow and communication tools allow us to collaborate effectively with clients regardless of their location. We schedule meetings at convenient times across different time zones to ensure smooth communication.",
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
          <h2 className="text-3xl font-anton tracking-wide sm:text-4xl md:text-5xl">
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
