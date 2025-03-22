"use client"

import {
  Cpu,
  Bot,
  MessageSquare,
  BarChart,
  Clock,
  Zap,
  Database,
  Users,
  TrendingUp,
  Shield,
  Lightbulb,
  FileText,
} from "lucide-react"
import { ServicePageLayout } from "@/components/service-page-layout"
import { ServiceFeatureSection } from "@/components/service-feature-section"
import { ServiceBenefitsSection } from "@/components/service-benefits-section"
import { RedesignedServicesSection } from "@/components/redesigned-services-section"

export default function AiAutomationPage() {
  const features = [
    {
      title: "AI-Powered Chatbots",
      description:
        "We develop intelligent chatbots that can handle customer inquiries, provide support, and guide users through your website or application.",
      icon: <MessageSquare className="h-6 w-6" />,
      features: [
        "Natural language processing",
        "24/7 customer support",
        "Personalized user interactions",
        "Multi-channel deployment",
        "Integration with existing systems",
        "Continuous learning and improvement",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Business Process Automation",
      description:
        "We implement AI solutions that automate repetitive tasks and workflows, freeing up your team to focus on more strategic activities.",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Workflow automation",
        "Document processing",
        "Data entry and extraction",
        "Email automation",
        "Task scheduling and management",
        "Custom automation solutions",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "AI-Driven Analytics",
      description:
        "We harness the power of AI to analyze your data, uncover insights, and provide actionable recommendations for your business.",
      icon: <BarChart className="h-6 w-6" />,
      features: [
        "Predictive analytics",
        "Customer behavior analysis",
        "Sales forecasting",
        "Performance monitoring",
        "Trend identification",
        "Automated reporting",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Intelligent Content Generation",
      description:
        "We leverage AI to create high-quality, relevant content for your website, marketing campaigns, and social media channels.",
      icon: <FileText className="h-6 w-6" />,
      features: [
        "Blog post generation",
        "Product descriptions",
        "Email content",
        "Social media posts",
        "SEO-optimized content",
        "Multilingual content creation",
      ],
      image: "/placeholder.svg?height=600&width=800",
      gradient: "from-rose/20 to-sapphire/20",
    },
  ]

  const benefits = [
    {
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and streamline workflows to save time and resources.",
      icon: <Clock className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Enhanced Customer Experience",
      description: "Provide personalized, 24/7 support and interactions that improve customer satisfaction.",
      icon: <Users className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Data-Driven Decisions",
      description: "Gain valuable insights from your data to make more informed business decisions.",
      icon: <Database className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20",
    },
    {
      title: "Scalable Operations",
      description: "Easily scale your operations without proportionally increasing costs or resources.",
      icon: <TrendingUp className="h-6 w-6 text-ivory" />,
      gradient: "from-rose/20 to-sapphire/20",
    },
    {
      title: "Reduced Errors",
      description: "Minimize human error in repetitive tasks and data processing for more accurate results.",
      icon: <Shield className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire/20 to-beige/20",
    },
    {
      title: "Competitive Advantage",
      description: "Stay ahead of competitors by leveraging cutting-edge AI technology in your business.",
      icon: <Lightbulb className="h-6 w-6 text-ivory" />,
      gradient: "from-beige/20 to-rose/20",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "We analyze your business processes, challenges, and goals to identify opportunities for AI automation.",
      icon: <Lightbulb className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "02",
      title: "Solution Design",
      description: "We design a customized AI automation solution tailored to your specific needs and objectives.",
      icon: <Bot className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "03",
      title: "Development & Training",
      description:
        "We develop and train the AI models and systems, integrating them with your existing infrastructure.",
      icon: <Cpu className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
    {
      number: "04",
      title: "Testing & Refinement",
      description:
        "We rigorously test the solution, gathering feedback and making refinements to ensure optimal performance.",
      icon: <Zap className="h-6 w-6 text-ivory" />,
      gradient: "from-rose to-sapphire",
    },
    {
      number: "05",
      title: "Deployment & Integration",
      description: "We deploy the solution and integrate it seamlessly with your existing systems and workflows.",
      icon: <Database className="h-6 w-6 text-ivory" />,
      gradient: "from-sapphire to-beige",
    },
    {
      number: "06",
      title: "Monitoring & Optimization",
      description:
        "We continuously monitor the performance of your AI automation solution, making optimizations as needed.",
      icon: <BarChart className="h-6 w-6 text-ivory" />,
      gradient: "from-beige to-rose",
    },
  ]

  return (
    <ServicePageLayout
      title="AI Automation"
      subtitle="Harness the power of artificial intelligence to automate processes, enhance customer experiences, and drive business growth."
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
        title="Benefits of AI Automation"
        subtitle="Implementing AI automation offers numerous advantages for your business operations and growth"
        benefits={benefits}
      />

      {/* Process Section */}
      <RedesignedServicesSection
      />
    </ServicePageLayout>
  )
}

