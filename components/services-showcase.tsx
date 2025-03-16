"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: "web-design",
    title: "Web Design",
    description:
      "Beautiful, responsive websites that captivate your audience and reflect your brand's unique identity.",
    image: "/placeholder.svg?height=600&width=800",
    price: "from $399",
    features: [
      "Custom design tailored to your brand",
      "Mobile-responsive layouts",
      "User experience optimization",
      "Fast loading speeds",
      "SEO-friendly structure",
    ],
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    description:
      "Powerful online stores that drive sales and provide seamless shopping experiences for your customers.",
    image: "/placeholder.svg?height=600&width=800",
    price: "from $899",
    features: [
      "Product catalog management",
      "Secure payment processing",
      "Inventory management",
      "Customer account creation",
      "Order tracking and history",
    ],
  },
  {
    id: "business",
    title: "Business Sites",
    description: "Professional websites that establish credibility and help grow your business online.",
    image: "/placeholder.svg?height=600&width=800",
    price: "from $599",
    features: [
      "Professional business layout",
      "Service/product showcases",
      "Contact forms and maps",
      "Testimonial sections",
      "Team member profiles",
    ],
  },
]

export function ServicesShowcase() {
  const [activeService, setActiveService] = useState(services[0])

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4">Explore our services</h2>
          <p className="text-lg text-charcoal/80">We create stunning websites tailored to your specific needs</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`px-6 py-3 rounded-full transition-colors ${
                activeService.id === service.id ? "bg-rose text-ivory" : "bg-beige/30 text-charcoal hover:bg-beige/50"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={activeService.image || "/placeholder.svg"}
              alt={activeService.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-charcoal mb-3">{activeService.title}</h3>
            <p className="text-xl text-rose font-medium mb-4">{activeService.price}</p>
            <p className="text-lg text-charcoal/80 mb-6">{activeService.description}</p>

            <ul className="space-y-3 mb-8">
              {activeService.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-rose flex-shrink-0 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={`/services/${activeService.id}`} className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

