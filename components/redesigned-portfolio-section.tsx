"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  images: string[];
  link: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: "luxury-boutique",
    title: "Luxury Boutique Website",
    category: "E-commerce",
    client: "Elegance Boutique",
    description:
      "A sophisticated e-commerce platform for a high-end fashion boutique, featuring elegant design and seamless shopping experience.",
    challenge:
      "The client needed a website that reflected their luxury brand identity while providing a seamless shopping experience for their customers.",
    solution:
      "We created a custom design that emphasized elegance and sophistication, with high-quality imagery and smooth animations. The e-commerce functionality was integrated seamlessly, with a focus on a streamlined checkout process.",
    results:
      "The new website led to a 35% increase in online sales and a significant improvement in user engagement metrics.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shopify",
      "Framer Motion",
      "Stripe",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    link: "/portfolio/luxury-boutique",
  },
  {
    id: "financial-advisory",
    title: "Financial Advisory Firm",
    category: "Corporate",
    client: "Horizon Financial",
    description:
      "A professional website for a financial advisory firm with custom dashboards and client portal integration.",
    challenge:
      "Horizon Financial needed a website that conveyed trust and professionalism while providing secure access to client information through a custom portal.",
    solution:
      "We developed a sophisticated website with a secure client portal, custom dashboards for financial data visualization, and content that emphasized the firm's expertise and trustworthiness.",
    results:
      "Client engagement increased by 40%, and the firm reported a 25% increase in new client inquiries within the first three months after launch.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "AWS"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    link: "/portfolio/financial-advisory",
  },
  {
    id: "wellness-retreat",
    title: "Wellness Retreat",
    category: "Hospitality",
    client: "Serenity Spa & Resort",
    description:
      "An elegant website for a luxury wellness retreat with online booking system and virtual tour integration.",
    challenge:
      "The client needed a website that captured the serene and luxurious atmosphere of their wellness retreat while providing an efficient booking system for spa services and accommodations.",
    solution:
      "We designed a visually stunning website with immersive imagery, virtual tours, and an integrated booking system that allowed guests to easily reserve spa treatments and accommodations.",
    results:
      "Online bookings increased by 60%, and the average time spent on the website doubled, indicating higher user engagement with the content.",
    technologies: [
      "WordPress",
      "WooCommerce",
      "Custom PHP",
      "JavaScript",
      "Matterport Integration",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    link: "/portfolio/wellness-retreat",
  },
];

export function RedesignedPortfolioSection() {
  const [activeItem, setActiveItem] = useState(portfolioItems[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentItem =
    portfolioItems.find((item) => item.id === activeItem) || portfolioItems[0];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentItem.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) =>
        (prev - 1 + currentItem.images.length) % currentItem.images.length
    );
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured <span className="text-gradient-soluvia">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            Explore our portfolio of successful projects that have helped
            businesses achieve their goals
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {portfolioItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                setActiveImageIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeItem === item.id
                  ? "bg-gradient-to-r from-rose to-sapphire text-ivory"
                  : "bg-charcoal/50 text-ivory/70 hover:text-ivory hover:bg-charcoal/70 border border-ivory/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: portfolioItems.findIndex((i) => i.id === item.id) * 0.1,
              }}
            >
              {item.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="relative">
                {/* Image carousel */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-70 blur-sm"></div>

                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={
                            currentItem.images[activeImageIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`${currentItem.title} - Image ${
                            activeImageIndex + 1
                          }`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={80}
                          loading={activeImageIndex === 0 ? "eager" : "lazy"}
                          priority={activeImageIndex === 0}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {currentItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory hover:bg-rose hover:text-ivory transition-colors duration-300"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-ivory hover:bg-rose hover:text-ivory transition-colors duration-300"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Image indicators */}
                {currentItem.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {currentItem.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          activeImageIndex === index
                            ? "bg-rose w-6"
                            : "bg-ivory/30 hover:bg-ivory/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose/20 text-rose">
                    {currentItem.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-ivory mb-2">
                  {currentItem.title}
                </h3>
                <p className="text-ivory/70 mb-4">
                  Client:{" "}
                  <span className="text-ivory">{currentItem.client}</span>
                </p>
                <p className="text-ivory/70 mb-6">{currentItem.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-ivory mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-charcoal/70 text-ivory/90 border border-ivory/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={currentItem.link}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-medium hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
                >
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-charcoal/50 backdrop-blur-sm border border-ivory/10 rounded-xl p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose/5 hover:border-rose/30">
                <h4 className="text-lg font-medium text-ivory mb-3">
                  The Challenge
                </h4>
                <p className="text-ivory/70">{currentItem.challenge}</p>
              </div>
              <div className="bg-charcoal/50 backdrop-blur-sm border border-ivory/10 rounded-xl p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose/5 hover:border-rose/30">
                <h4 className="text-lg font-medium text-ivory mb-3">
                  Our Solution
                </h4>
                <p className="text-ivory/70">{currentItem.solution}</p>
              </div>
              <div className="bg-charcoal/50 backdrop-blur-sm border border-ivory/10 rounded-xl p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose/5 hover:border-rose/30">
                <h4 className="text-lg font-medium text-ivory mb-3">
                  The Results
                </h4>
                <p className="text-ivory/70">{currentItem.results}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-charcoal/70 backdrop-blur-sm border border-ivory/10 text-ivory font-medium hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-all duration-300"
          >
            View All Projects <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
