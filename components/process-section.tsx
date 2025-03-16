export function ProcessSection() {
  return (
    <section className="py-20 bg-beige/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal mb-4">How it works</h2>
          <p className="text-lg text-charcoal/80">Our streamlined process makes getting your website quick and easy</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "01",
              title: "Consultation",
              description:
                "We start by understanding your business, goals, and target audience to create a solid foundation for your project.",
            },
            {
              number: "02",
              title: "Design & Development",
              description:
                "Our team creates a custom design and develops a fully functional website tailored to your specific needs.",
            },
            {
              number: "03",
              title: "Launch & Support",
              description:
                "After thorough testing, we launch your website and provide ongoing support to ensure your continued success.",
            },
          ].map((step) => (
            <div key={step.number} className="bg-ivory rounded-lg p-8 shadow-sm">
              <div className="text-5xl font-bold text-rose/30 mb-4">{step.number}</div>
              <h3 className="text-2xl font-bold text-charcoal mb-3">{step.title}</h3>
              <p className="text-charcoal/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

