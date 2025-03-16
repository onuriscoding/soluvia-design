"use client"

import Link from "next/link"

const plans = [
  {
    name: "Single Page",
    price: "$399",
    description: "Perfect for landing pages or simple online presence",
    features: [
      "One page website",
      "Mobile responsive design",
      "Contact form",
      "SEO optimization",
      "Social media integration",
      "3 rounds of revisions",
    ],
    popular: false,
  },
  {
    name: "Multi-page",
    price: "$699",
    description: "Ideal for small businesses and professionals",
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form",
      "SEO optimization",
      "Social media integration",
      "Blog functionality",
      "5 rounds of revisions",
    ],
    popular: true,
  },
  {
    name: "Custom",
    price: "Custom",
    description: "For businesses with specific requirements",
    features: [
      "Unlimited pages",
      "Custom functionality",
      "E-commerce integration",
      "Advanced SEO features",
      "Content management system",
      "Analytics dashboard",
      "Unlimited revisions",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-charcoal text-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Whatever your needs, we have a solution</h2>
          <p className="text-lg text-beige">Choose the package that best fits your business requirements</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg overflow-hidden ${
                plan.popular ? "border-2 border-rose relative" : "border border-ivory/20"
              }`}
            >
              {plan.popular && (
                <div className="bg-rose text-ivory text-center py-1 text-sm font-medium">Most Popular</div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <p className="text-ivory/70 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
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

                <Link
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-full transition-colors ${
                    plan.popular
                      ? "bg-rose hover:bg-rose/90 text-ivory"
                      : "border border-ivory/50 hover:bg-ivory/10 text-ivory"
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

