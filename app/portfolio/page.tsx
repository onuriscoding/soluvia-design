"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const portfolioItems = [
  {
    id: 1,
    title: "Luxury Brand Website",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/luxury-brand",
    client: "Elegance Boutique",
    description:
      "A premium website for a high-end fashion brand, featuring elegant design and seamless e-commerce integration.",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Business Growth",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/ecommerce-platform",
    client: "Urban Market",
    description: "A comprehensive e-commerce solution that increased sales by 200% within the first six months.",
  },
  {
    id: 3,
    title: "Tech Startup Rebrand",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/tech-startup",
    client: "InnovateTech",
    description:
      "A complete rebrand and website redesign for a growing tech startup, resulting in improved user engagement and brand recognition.",
  },
  {
    id: 4,
    title: "SEO Campaign",
    category: "SEO Optimization",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/seo-campaign",
    client: "Global Solutions",
    description:
      "A targeted SEO campaign that boosted organic traffic by 150% and improved search engine rankings for key terms.",
  },
  {
    id: 5,
    title: "Restaurant Website",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/restaurant-website",
    client: "Savory Bites",
    description:
      "A mouth-watering website design with online reservation system and menu showcase for a fine dining restaurant.",
  },
  {
    id: 6,
    title: "Digital Marketing Strategy",
    category: "Business Growth",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/digital-marketing",
    client: "Fitness Revolution",
    description:
      "A comprehensive digital marketing strategy that helped a fitness brand expand its online presence and customer base.",
  },
  {
    id: 7,
    title: "Local Business SEO",
    category: "SEO Optimization",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/local-business-seo",
    client: "City Dental",
    description:
      "Local SEO optimization that put a dental practice on the map, resulting in a 300% increase in new patient inquiries.",
  },
  {
    id: 8,
    title: "Mobile App Design",
    category: "Web Design",
    image: "/placeholder.svg?height=600&width=800",
    link: "/portfolio/mobile-app",
    client: "Travel Explorer",
    description:
      "An intuitive and visually stunning mobile app design for a travel company, enhancing user experience and engagement.",
  },
]

const categories = ["All", "Web Design", "Business Growth", "SEO Optimization"]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Explore our collection of successful projects that have helped businesses achieve their goals. From
              stunning websites to effective growth strategies and SEO campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg">
                <Link href={item.link} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Badge className="mb-2">{item.category}</Badge>
                    <h3 className="text-xl font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80">Client: {item.client}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Case Study</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Take a deeper look at one of our most successful projects.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="E-commerce Platform Case Study"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <Badge>Business Growth</Badge>
              <h3 className="text-3xl font-bold">E-commerce Platform Transformation</h3>
              <p className="text-lg text-muted-foreground">
                Urban Market came to us with a challenge: transform their outdated online store into a modern,
                user-friendly e-commerce platform that would drive sales and enhance customer experience.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Increase in Sales</p>
                  <p className="text-3xl font-bold text-primary">200%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold text-primary">4.8%</p>
                </div>
              </div>
              <Button asChild>
                <Link href="/portfolio/ecommerce-platform">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
              Let's create something extraordinary together. Contact us today to start your journey towards digital
              excellence.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

