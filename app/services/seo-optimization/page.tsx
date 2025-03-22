"use client"

import {
  Search,
  BarChart,
  Globe,
  FileText,
  Link2,
  Zap,
  Target,
  Users,
  TrendingUp,
  Map,
  LineChart,
  Compass,
} from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { ServiceFeatureSection } from "@/components/service-feature-section"
import { ServiceBenefitsSection } from "@/components/service-benefits-section"
import { RedesignedServicesSection } from "@/components/redesigned-services-section"

export default function SeoOptimizationPage() {
  const features = [
    {
      title: "On-Page SEO",
      description:
        "We optimize your website's content, structure, and HTML elements to improve visibility and rankings in search engine results.",
      icon: <FileText className="h-6 w-6" />,
      features: [
        "Keyword research and optimization",
        "Meta title and description optimization",
        "Header tag optimization",
        "Content optimization",
        "Image optimization",
        "URL structure improvement",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Off-Page SEO",
      description:
        "We build your website's authority through high-quality backlinks, social signals, and other external factors that influence search rankings.",
      icon: <Link2 className="h-6 w-6" />,
      features: [
        "Link building strategies",
        "Guest posting opportunities",
        "Social media integration",
        "Brand mentions monitoring",
        "Competitor backlink analysis",
        "Authority building",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Technical SEO",
      description:
        "We ensure your website's technical foundation is solid, allowing search engines to crawl, index, and rank your site effectively.",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Site speed optimization",
        "Mobile-friendliness improvements",
        "Schema markup implementation",
        "XML sitemap creation",
        "Robots.txt optimization",
        "Fixing crawl errors and broken links",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Local SEO",
      description:
        "We optimize your online presence to attract more business from relevant local searches, helping you connect with nearby customers.",
      icon: <Map className="h-6 w-6" />,
      features: [
        "Google Business Profile optimization",
        "Local keyword targeting",
        "Citation building and cleanup",
        "Review management",
        "Local link building",
        "Local content strategy",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
  ]

  const benefits = [
    {
      title: "Increased Organic Traffic",
      description: "Attract more visitors to your website through improved visibility in search engine results.",
      icon: <TrendingUp className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Better Quality Leads",
      description:
        "Attract visitors who are actively searching for your products or services, resulting in higher-quality leads.",
      icon: <Target className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Improved User Experience",
      description:
        "SEO improvements often enhance the overall user experience, leading to higher engagement and conversion rates.",
      icon: <Users className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Enhanced Brand Credibility",
      description:
        "Higher search rankings build trust and credibility with your audience, as users tend to trust top-ranking websites.",
      icon: <Globe className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Long-Term Results",
      description:
        "Unlike paid advertising, SEO provides sustainable, long-term results that continue to benefit your business over time.",
      icon: <LineChart className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Competitive Advantage",
      description:
        "Outrank your competitors in search results to gain a significant advantage in your industry or market.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "SEO Audit & Analysis",
      description:
        "We conduct a comprehensive analysis of your website's current SEO performance, identifying strengths, weaknesses, and opportunities.",
      icon: <Search className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "02",
      title: "Keyword Research",
      description:
        "We identify the most valuable and relevant keywords for your business, considering search volume, competition, and user intent.",
      icon: <Compass className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "03",
      title: "On-Page Optimization",
      description:
        "We optimize your website's content, meta tags, headers, and other on-page elements to improve relevance and rankings.",
      icon: <FileText className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
    {
      number: "04",
      title: "Technical Optimization",
      description:
        "We address technical issues that may be hindering your site's performance in search results, such as site speed and mobile-friendliness.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "05",
      title: "Off-Page Strategy",
      description:
        "We implement strategies to build your site's authority through quality backlinks, social signals, and other off-page factors.",
      icon: <Link2 className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "06",
      title: "Monitoring & Reporting",
      description:
        "We continuously monitor your SEO performance, providing regular reports and making adjustments to optimize results.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
  ]

  return (
    <ServicePageLayout
      title="SEO Optimization"
      subtitle="Boost your online visibility and drive organic traffic with our comprehensive SEO strategies and techniques."
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
        title="Benefits of SEO Optimization"
        subtitle="Investing in SEO offers numerous advantages for your business's online presence and growth"
        benefits={benefits}
      />

      {/* Process Section */}
      <RedesignedServicesSection
      />
    </ServicePageLayout>
  )
}

