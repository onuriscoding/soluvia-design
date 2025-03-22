"use client"

import {
  Palette,
  Code,
  Smartphone,
  Layers,
  Zap,
  Shield,
  PenTool,
  FileCode,
  Cpu,
  Users,
  Search,
  BarChart,
} from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { ServiceFeatureSection } from "@/components/service-feature-section"
import { ServiceBenefitsSection } from "@/components/service-benefits-section"
import { RedesignedServicesSection } from "@/components/redesigned-services-section"

export default function WebDesignDevelopmentPage() {
  const features = [
    {
      title: "Custom Website Design",
      description:
        "We create stunning, responsive websites that captivate your audience and reflect your brand's unique identity. Our designs are tailored to your specific needs and goals.",
      icon: <Palette className="h-6 w-6" />,
      features: [
        "Responsive design for all devices",
        "Custom UI/UX design",
        "Brand-aligned visual elements",
        "Intuitive navigation",
        "Optimized user journeys",
        "Accessibility compliance",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Web Development",
      description:
        "Our development team builds robust, scalable websites and web applications that deliver exceptional performance and functionality using cutting-edge technologies.",
      icon: <Code className="h-6 w-6" />,
      features: [
        "Front-end development (React, Next.js)",
        "Back-end development (Node.js, Python)",
        "Database design and implementation",
        "API development and integration",
        "E-commerce functionality",
        "Content management systems",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Mobile-First Approach",
      description:
        "We prioritize mobile experiences, ensuring your website performs flawlessly across all devices while maintaining visual appeal and functionality.",
      icon: <Smartphone className="h-6 w-6" />,
      features: [
        "Mobile-optimized layouts",
        "Touch-friendly interfaces",
        "Fast loading on mobile networks",
        "Progressive Web App capabilities",
        "Responsive images and media",
        "Mobile performance optimization",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
    },
  ]

  const benefits = [
    {
      title: "Enhanced User Experience",
      description: "Create intuitive, engaging interfaces that keep visitors on your site longer and guide them toward conversion.",
      icon: <Users className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20"
    },
    {
      title: "Improved Performance",
      description: "Fast-loading, optimized websites that provide a seamless experience and rank better in search results.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20"
    },
    {
      title: "Scalable Solutions",
      description: "Future-proof websites that can grow with your business and adapt to changing needs and technologies.",
      icon: <Layers className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20"
    },
    {
      title: "SEO Optimization",
      description: "Built-in search engine optimization that helps your website rank higher and attract more organic traffic.",
      icon: <Search className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20"
    },
    {
      title: "Conversion-Focused Design",
      description: "Strategic layouts and elements designed to guide visitors toward taking desired actions on your site.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20"
    },
    {
      title: "Enhanced Security",
      description: "Robust security measures to protect your website and user data from threats and vulnerabilities.",
      icon: <Shield className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20"
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We begin by understanding your business, goals, target audience, and requirements to create a solid foundation for your project.",
      icon: <PenTool className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description:
        "Our designers create wireframes and visual designs that align with your brand and provide an optimal user experience.",
      icon: <Palette className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "03",
      title: "Development",
      description:
        "Our development team brings the designs to life, building a robust, scalable website with clean, efficient code.",
      icon: <FileCode className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
    {
      number: "04",
      title: "Testing & Optimization",
      description:
        "We rigorously test your website across devices and browsers, optimizing for performance, accessibility, and SEO.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "05",
      title: "Launch & Support",
      description:
        "After a successful launch, we provide ongoing support and maintenance to ensure your website continues to perform at its best.",
      icon: <Cpu className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
  ]

  return (
    <ServicePageLayout
      title="Web Design & Development"
      subtitle="Create stunning, high-performance websites that captivate your audience and drive results for your business."
    >
      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          {features.map((feature, index) => (
            <div key={index} className="mb-24 last:mb-0">
              <ServiceFeatureSection feature={feature} reversed={index % 2 !== 0} />
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <ServiceBenefitsSection
        title="Benefits of Professional Web Design & Development"
        subtitle="Investing in professional web design and development offers numerous advantages for your business"
        benefits={benefits}
      />

      {/* Process Section */}
      <RedesignedServicesSection
      />
    </ServicePageLayout>
  )
}

