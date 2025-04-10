"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ScrollVelocity from "@/app/animations/scroll-velocity";
import ScrollReveal from "@/app/animations/scroll-reveal";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Elevate Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Working with Soluvia Design transformed our online presence. Their attention to detail and understanding of our brand resulted in a website that perfectly captures our luxury aesthetic while driving significant business growth.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Horizon Financial",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The team at Soluvia Design delivered beyond our expectations. Their strategic approach to web design has not only improved our user experience but has also significantly increased our conversion rates and client engagement.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Founder",
    company: "Artisan Collective",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Soluvia Design understood our vision from day one. They created an e-commerce platform that showcases our products beautifully and provides a seamless shopping experience. Our sales have increased by 40% since launch.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Manager",
    company: "Wellness Haven",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The website Soluvia Design created for us perfectly captures the serene and luxurious atmosphere of our wellness retreat. Their attention to detail and responsive design has significantly improved our booking process.",
  },
];

export function RedesignedTestimonialsSection({
  dictionary,
}: {
  dictionary: any;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);
  const ref = useRef(null);
  const [isInView, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Use testimonials from dictionary if available, otherwise use the default ones
  const testimonialsToUse = dictionary?.testimonials?.clients || testimonials;

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll progress with gentler spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values - adjusted to start later and progress more slowly
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.8], [1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.8], [1, 1, 0.9]);
  const y = useTransform(smoothProgress, [0, 0.3, 0.8], [0, 0, 50]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsToUse.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialsToUse.length) % testimonialsToUse.length
    );
  };

  useEffect(() => {
    // Auto-advance testimonials
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-24 overflow-hidden"
    >
      <motion.div
        ref={ref}
        className="flex flex-col items-center justify-center"
        style={{
          opacity,
          scale,
          y,
        }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full flex justify-center md:mb-4 -mb-12">
            <ScrollVelocity
              texts={[
                dictionary?.testimonials?.sectionTitle1 || "What our",
                dictionary?.testimonials?.sectionTitle2 || "clients say",
                dictionary?.testimonials?.sectionTitle3 || "about us",
              ]}
              className="md:text-[6.8rem] md:h-[6.5rem]"
              velocity={50}
            />
          </div>
          <div className="w-full max-w-[90%] md:max-w-2xl mx-auto md:-mt-16 -mt-32">
            <ScrollReveal
              textClassName="text-4xl md:text-6xl text-ivory text-center px-4"
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={1}
              blurStrength={2}
            >
              {dictionary?.testimonials?.subheading ||
                "Hear from businesses that have transformed their digital presence with"}
            </ScrollReveal>
          </div>

          {/* Soluvia Logo with synchronized animation */}
          <div className="mt-4 mb-16">
            <div className="flex justify-center">
              <div className="logo-wrapper">
                <div className="font-anton text-7xl text-white inline-flex">
                  s<span className="logo-expand">oluvia</span>
                </div>
                <div className="logo-dot"></div>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .logo-wrapper {
              position: relative;
            }

            .logo-expand {
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              margin-left: -0.05em;
              letter-spacing: -0.05em;
              max-width: 0;
              opacity: 0;
              animation: expandLogoText 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }

            .logo-dot {
              position: absolute;
              width: 10px;
              height: 10px;
              background-color: #b76e79;
              border-radius: 50%;
              bottom: 2px;
              left: 35px;
              animation: moveLogoDot 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }

            @keyframes expandLogoText {
              0%,
              15% {
                max-width: 0;
                opacity: 0;
              }
              25%,
              75% {
                max-width: 200px;
                opacity: 1;
              }
              85%,
              100% {
                max-width: 0;
                opacity: 0;
              }
            }

            @keyframes moveLogoDot {
              0%,
              15% {
                transform: translateX(0);
              }
              25%,
              75% {
                transform: translateX(150px);
              }
              85%,
              100% {
                transform: translateX(0);
              }
            }
          `}</style>
        </div>

        <div className="container relative z-10 py-6 md:-mt-16 ">
          <div className="relative mx-auto max-w-4xl">
            <div className="relative h-[400px] overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6"
                >
                  <div className="mb-8 text-center">
                    <p className="text-xl text-ivory/90 italic mb-8">
                      "
                      {testimonialsToUse[currentIndex].testimonial ||
                        testimonialsToUse[currentIndex].content}
                      "
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-rose mr-4">
                        <Image
                          src={
                            testimonialsToUse[currentIndex].avatar ||
                            "/md-cars.jpg"
                          }
                          alt={testimonialsToUse[currentIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-ivory">
                          {testimonialsToUse[currentIndex].name}
                        </h4>
                        <p className="text-ivory/70">
                          {testimonialsToUse[currentIndex].role ||
                            testimonialsToUse[currentIndex].position}
                          , {testimonialsToUse[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/** 
            *
            * Navigation buttons
            <div className="flex justify-center gap-4 -mt-10">
              <button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/20 border border-ivory/10 text-ivory hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonialsToUse.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-rose w-6"
                        : "bg-ivory/30 hover:bg-ivory/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/20 border border-ivory/10 text-ivory hover:bg-rose/20 hover:text-rose hover:border-rose/30 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
