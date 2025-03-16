import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from a database or CMS
const portfolioItems = [
  {
    slug: "luxury-brand",
    title: "Luxury Brand Website",
    client: "Elegance Boutique",
    category: "Web Design",
    date: "January 2023",
    image: "/placeholder.svg?height=800&width=1200",
    description:
      "A premium website for a high-end fashion brand, featuring elegant design and seamless e-commerce integration.",
    challenge:
      "The client needed a website that reflected their luxury brand identity while providing a seamless shopping experience for their customers.",
    solution:
      "We created a custom design that emphasized elegance and sophistication, with high-quality imagery and smooth animations. The e-commerce functionality was integrated seamlessly, with a focus on a streamlined checkout process.",
    results:
      "The new website led to a 35% increase in online sales and a significant improvement in user engagement metrics.",
  },
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    client: "Urban Market",
    category: "Business Growth",
    date: "March 2023",
    image: "/placeholder.svg?height=800&width=1200",
    description: "A comprehensive e-commerce solution that increased sales by 200% within the first six months.",
    challenge:
      "Urban Market was struggling with an outdated online store that was difficult to navigate and had a high cart abandonment rate.",
    solution:
      "We redesigned their e-commerce platform with a focus on user experience, mobile responsiveness, and conversion optimization. We also implemented advanced product filtering and recommendation systems.",
    results: "Within six months, online sales increased by 200%, and the cart abandonment rate decreased by 45%.",
  },
  // Add more portfolio items as needed
]

type Props = {
  params: { slug: string }
}

// Generate metadata for each portfolio item
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const portfolio = portfolioItems.find((item) => item.slug === params.slug)

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    }
  }

  return {
    title: portfolio.title,
    description: portfolio.description,
    openGraph: {
      title: `${portfolio.title} | Soluvia Design Portfolio`,
      description: portfolio.description,
      url: `https://soluviadesign.com/portfolio/${portfolio.slug}`,
      images: [
        {
          url: portfolio.image,
          width: 1200,
          height: 800,
          alt: portfolio.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: portfolio.title,
      description: portfolio.description,
      images: [portfolio.image],
    },
  }
}

// Generate static paths for all portfolio items
export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }))
}

export default function PortfolioDetailPage({ params }: Props) {
  const portfolio = portfolioItems.find((item) => item.slug === params.slug)

  if (!portfolio) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold">Portfolio Item Not Found</h1>
        <p className="mt-4 text-muted-foreground">The portfolio item you're looking for doesn't exist.</p>
        <Button asChild className="mt-8">
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{portfolio.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">{portfolio.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                <span>Client: {portfolio.client}</span>
              </div>
              <div className="flex items-center">
                <Tag className="mr-2 h-5 w-5 text-primary" />
                <span>Category: {portfolio.category}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                <span>Date: {portfolio.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={portfolio.image || "/placeholder.svg"}
              alt={portfolio.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">The Challenge</h2>
                <p className="text-muted-foreground">{portfolio.challenge}</p>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold">Our Solution</h2>
                <p className="text-muted-foreground">{portfolio.solution}</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">Results</h2>
              <p className="text-muted-foreground">{portfolio.results}</p>
            </div>

            <div className="mt-16 flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Related Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems
              .filter((item) => item.slug !== params.slug)
              .slice(0, 3)
              .map((item) => (
                <div key={item.slug} className="group relative overflow-hidden rounded-lg">
                  <Link href={`/portfolio/${item.slug}`} className="block">
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
                      <h3 className="text-xl font-medium text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/80">Client: {item.client}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

