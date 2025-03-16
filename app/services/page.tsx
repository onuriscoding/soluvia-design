"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Palette, TrendingUp, Search, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServicesPage() {
  const heroRef = useRef(null)
  const processRef = useRef(null)
  const pricingRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 })
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2 })

  const [activeTab, setActiveTab] = useState("web-design")

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-32 md:py-40">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/70 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We offer a comprehensive range of services to help your business thrive in the digital landscape. From
              stunning web design to effective business growth strategies and SEO optimization.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Services Tabs Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <Tabs defaultValue="web-design" value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-5xl">
            <TabsList className="mb-12 grid w-full grid-cols-3 bg-white/5 p-1">
              {[
                { value: "web-design", label: "Web Design" },
                { value: "business-growth", label: "Business Growth" },
                { value: "seo-optimization", label: "SEO Optimization" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`relative text-sm sm:text-base transition-all duration-300 ${
                    activeTab === tab.value
                      ? "text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Web Design Tab */}
              <TabsContent value="web-design" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-12 md:grid-cols-2 md:items-center"
                >
                  <div>
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-blue-400">
                      <Palette className="h-6 w-6" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold">Web Design</h2>
                    <p className="mb-6 text-lg text-white/70">
                      We create stunning, responsive websites that captivate your audience and reflect your brand's
                      unique identity. Our web design services focus on creating an exceptional user experience while
                      ensuring your site stands out from the competition.
                    </p>

                    <div className="mb-8 space-y-4">
                      {[
                        "Custom website design tailored to your brand",
                        "Responsive design for all devices",
                        "User experience (UX) optimization",
                        "Content management system integration",
                        "E-commerce functionality",
                        "Website maintenance and support",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                          <span className="text-white/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Link href="/contact">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-600/20 opacity-70 blur-lg"></div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Web Design"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Business Growth Tab */}
              <TabsContent value="business-growth" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-12 md:grid-cols-2 md:items-center"
                >
                  <div>
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-indigo-400">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold">Business Growth</h2>
                    <p className="mb-6 text-lg text-white/70">
                      Strategic digital solutions that drive conversions, increase revenue, and help your business reach
                      new heights. We develop comprehensive strategies tailored to your specific goals and target
                      audience.
                    </p>

                    <div className="mb-8 space-y-4">
                      {[
                        "Digital strategy development",
                        "Conversion rate optimization",
                        "Email marketing campaigns",
                        "Social media management",
                        "Content marketing strategies",
                        "Analytics and performance tracking",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-indigo-400" />
                          <span className="text-white/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20"
                    >
                      <Link href="/contact">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-600/20 opacity-70 blur-lg"></div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Business Growth"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* SEO Optimization Tab */}
              <TabsContent value="seo-optimization" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-12 md:grid-cols-2 md:items-center"
                >
                  <div>
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-400">
                      <Search className="h-6 w-6" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold">SEO Optimization</h2>
                    <p className="mb-6 text-lg text-white/70">
                      Boost your online visibility and drive organic traffic with our comprehensive SEO strategies and
                      techniques. We help you rank higher in search engine results and attract more qualified leads to
                      your website.
                    </p>

                    <div className="mb-8 space-y-4">
                      {[
                        "Keyword research and analysis",
                        "On-page SEO optimization",
                        "Technical SEO improvements",
                        "Content strategy for SEO",
                        "Link building campaigns",
                        "Local SEO optimization",
                        "Regular performance reporting",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" />
                          <span className="text-white/80">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <Link href="/contact">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-600/20 opacity-70 blur-lg"></div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="SEO Optimization"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70">
              We follow a structured approach to ensure the success of every project.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Discovery",
                description:
                  "We start by understanding your business, goals, and target audience to create a solid foundation for your project.",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                number: "02",
                title: "Strategy",
                description:
                  "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives.",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                number: "03",
                title: "Implementation",
                description:
                  "Our team of experts brings the strategy to life, creating a solution that aligns with your brand and goals.",
                gradient: "from-purple-500 to-pink-600",
              },
              {
                number: "04",
                title: "Optimization",
                description:
                  "We continuously monitor and optimize your solution to ensure it delivers the best possible results.",
                gradient: "from-pink-500 to-red-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 transition-transform duration-500 group-hover:scale-150"></div>

                <div className="relative">
                  <span
                    className={`mb-4 block text-4xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.number}
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-300 group-hover:w-full`}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20 md:py-32">
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pricing{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Plans
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/70">Flexible options to suit your needs and budget.</p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Basic",
                price: "$999",
                description: "Perfect for small businesses just getting started.",
                features: [
                  "Custom website design",
                  "Responsive design",
                  "Content management system",
                  "Basic SEO setup",
                  "1 month of support",
                ],
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                name: "Professional",
                price: "$1,999",
                description: "Ideal for growing businesses looking to expand their online presence.",
                features: [
                  "Everything in Basic",
                  "E-commerce functionality",
                  "Advanced SEO optimization",
                  "Social media integration",
                  "Content strategy",
                  "3 months of support",
                ],
                highlighted: true,
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                name: "Enterprise",
                price: "$3,999",
                description: "Comprehensive solution for established businesses with complex needs.",
                features: [
                  "Everything in Professional",
                  "Custom functionality",
                  "Business growth strategy",
                  "Conversion optimization",
                  "Analytics dashboard",
                  "Priority support",
                  "6 months of support",
                ],
                gradient: "from-purple-500 to-pink-600",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl ${
                  plan.highlighted
                    ? "border-transparent bg-gradient-to-b from-indigo-500/20 to-purple-600/20"
                    : "border border-white/10 bg-white/5"
                } backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5`}
              >
                {plan.highlighted && (
                  <div className="absolute right-0 top-0">
                    <div className="relative h-20 w-20 overflow-hidden">
                      <div className="absolute right-[-40px] top-[32px] w-[170px] rotate-45 bg-gradient-to-r from-blue-500 to-indigo-600 py-1 text-center text-xs font-medium text-white">
                        Most Popular
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span
                      className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                    >
                      {plan.price}
                    </span>
                    <span className="ml-1 text-white/70">/ project</span>
                  </div>
                  <p className="mt-2 text-white/70">{plan.description}</p>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isPricingInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + i * 0.05 }}
                      >
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                        <span className="text-white/80">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      asChild
                      className={`w-full ${
                        plan.highlighted
                          ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg hover:shadow-blue-500/20`
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-white/70">
              Need a custom solution?{" "}
              <Link href="/contact" className="text-blue-400 hover:underline">
                Contact us
              </Link>{" "}
              for a personalized quote.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>

              {/* Animated particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-8 md:p-16">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    Digital Presence
                  </span>
                  ?
                </h2>
                <p className="mt-4 text-lg text-white/80 md:text-xl">
                  Let's create something extraordinary together. Contact us today to start your journey towards digital
                  excellence.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <Link href="/contact">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:border-blue-500/50 hover:text-blue-400"
                  >
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

