"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Palette,
  Globe,
  ShoppingCart,
  Code,
  BarChart,
  Smartphone,
} from "lucide-react";

const services = [
  {
    id: "web-design",
    icon: Palette,
    title: "Web Design",
    description:
      "Sophisticated, responsive websites that captivate your audience and reflect your brand's unique identity.",
    color: "sapphire",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-design",
  },
  {
    id: "e-commerce",
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Powerful online stores that drive sales and provide seamless shopping experiences.",
    color: "rose",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/ecommerce",
  },
  {
    id: "seo",
    icon: Globe,
    title: "SEO Optimization",
    description:
      "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    color: "beige",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/seo-optimization",
  },
  {
    id: "development",
    icon: Code,
    title: "Web Development",
    description:
      "Custom web applications and functionality tailored to your specific business needs.",
    color: "sapphire",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/web-development",
  },
  {
    id: "business",
    icon: BarChart,
    title: "Business Growth",
    description:
      "Strategic digital solutions that drive conversions, increase revenue, and help your business reach new heights.",
    color: "beige",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/business-growth",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that extend your digital presence to all devices.",
    color: "rose",
    image: "/placeholder.svg?height=600&width=800",
    link: "/services/mobile-apps",
  },
];

export function RedesignedServicesSection() {
  const [activeService, setActiveService] = useState(services[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const currentService =
    services.find((service) => service.id === activeService) || services[0];

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-rose/0 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sapphire/0 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-ivory sm:text-4xl md:text-5xl">
            Our <span className="text-gradient-soluvia">Services</span>
          </h2>
          <p className="mt-4 text-lg text-ivory/70">
            We offer a comprehensive range of services to help your business
            thrive in the digital landscape
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeService === service.id
                  ? "bg-gradient-to-r from-rose to-sapphire text-ivory"
                  : "bg-charcoal/50 text-ivory/70 hover:text-ivory hover:bg-charcoal/70 border border-ivory/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: services.findIndex((s) => s.id === service.id) * 0.1,
              }}
            >
              {service.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose mr-4">
                  {<currentService.icon className="h-6 w-6" />}
                </div>
                <h3 className="text-2xl font-anton tracking-wide text-ivory">
                  {currentService.title}
                </h3>
              </div>

              <p className="text-ivory/70 mb-6">{currentService.description}</p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link
                  href={currentService.link}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-rose to-sapphire text-ivory font-anton tracking-wide hover:shadow-lg hover:shadow-rose/20 transition-all duration-300"
                >
                  Learn More{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2 relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-rose to-sapphire rounded-xl opacity-70 blur-sm"></div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={currentService.image || "/placeholder.svg"}
                  alt={currentService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full bg-${currentService.color}/20 text-${currentService.color}`}
                  >
                    {currentService.title}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className="group relative overflow-hidden rounded-xl bg-charcoal/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-rose/5 border border-ivory/10 hover:border-rose/30"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-rose/10 to-sapphire/10 transition-transform duration-500 group-hover:scale-150"></div>

              <div className="relative p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-rose/20 to-sapphire/20 text-rose transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-rose group-hover:to-sapphire group-hover:text-ivory">
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-xl font-anton tracking-wide text-ivory group-hover:text-rose transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mb-4 text-ivory/70">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center text-rose transition-colors hover:text-sapphire"
                >
                  Learn more{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-rose to-sapphire transition-all duration-300 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
