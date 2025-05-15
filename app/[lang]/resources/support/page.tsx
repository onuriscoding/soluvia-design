import { Metadata } from "next";
import { RedesignedContactSection } from "@/components/redesigned-contact-section";
import { getDictionary } from "../../dictionaries";
import GradientText from "@/app/animations/gradient-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronDown,
  LifeBuoy,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";

export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  
  return {
    title: lang === "fr" 
      ? "Support | Soluvia" 
      : "Support | Soluvia",
    description: lang === "fr"
      ? "Nous sommes là pour vous aider avec toutes vos questions ou préoccupations concernant nos services."
      : "We're here to help with any questions or concerns you may have about our services.",
    alternates: {
      canonical: `https://www.soluvia.co/${lang}/resources/support`,
      languages: {
        'en': 'https://www.soluvia.co/en/resources/support',
        'fr': 'https://www.soluvia.co/fr/resources/support',
      },
    },
    openGraph: {
      title: "Support | Soluvia",
      description: "We're here to help with any questions or concerns you may have about our services.",
      url: `https://www.soluvia.co/${lang}/resources/support`,
      images: [
        {
          url: "/support-og.jpg",
          width: 1200,
          height: 630,
          alt: "Soluvia Support",
        },
      ],
    },
    twitter: {
      title: "Support | Soluvia",
      description: "We're here to help with any questions or concerns you may have about our services.",
    },
  };
}

export default async function SupportPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  // Support options
  const supportOptions = [
    {
      id: "faq",
      title: "FAQ",
      description: "Find answers to commonly asked questions.",
      icon: <FileText className="h-5 w-5" />,
      color: "text-rose",
      buttonGradient: "from-rose to-sapphire",
      link: "/resources/faq",
    },
    {
      id: "hours",
      title: "Business Hours",
      description: "Check our availability for support.",
      icon: <Clock className="h-5 w-5" />,
      color: "text-sapphire",
      buttonGradient: "from-sapphire to-beige",
      link: "#contact-section",
    },
    {
      id: "contact",
      title: "Contact Us",
      description: "Reach out with specific questions or concerns.",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-beige",
      buttonGradient: "from-beige to-rose",
      link: "#contact-section",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
          />
          <div
            className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full"
          />
        </div>

        <div
          className="container relative z-10 px-4"
        >
          <div
            className="mx-auto max-w-4xl text-center"
          >
            <div>
              <h1 className="text-6xl font-bold tracking-tight text-ivory md:text-8xl">
                <GradientText
                  colors={[
                    "#b76e79",
                    "#e0d5c0",
                    "#b76e79",
                    "#e0d5c0",
                  ]}
                  animationSpeed={12}
                  showBorder={false}
                  className="inline-block"
                >
                  Support
                </GradientText>
              </h1>
            </div>

            <div className="mt-8">
              <p className="leading-[1.5] tracking-tight font-medium text-xl md:text-3xl text-ivory/70">
                We're here to help with any questions or concerns you may have
                about our services.
              </p>
            </div>

            <div
              className="mt-12 flex flex-col items-center gap-6"
            >
              <div className="flex justify-center gap-4 flex-wrap">
                {supportOptions.map((option) => (
                  <div
                    key={option.id}
                  >
                    <Button
                      asChild
                      className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-full 
                        bg-gradient-to-r ${
                          option.buttonGradient
                        } text-ivory hover:shadow-lg 
                        hover:shadow-${option.color.replace(
                          "text-",
                          ""
                        )}/20 cursor-pointer`}
                    >
                      <Link
                        href={option.link}
                        className="flex items-center gap-2"
                      >
                        {option.icon}
                        <span className="whitespace-nowrap">
                          {option.title}
                        </span>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/30 to-sapphire/30 blur-sm"></div>
            <ChevronDown className="relative z-10 h-8 w-8 text-ivory" />
          </div>
        </div>
      </section>

      {/* Support Info Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose/5 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sapphire/5 blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose mb-6">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Documentation
                </h3>
                <p className="text-ivory/70 mb-4">
                  Browse our detailed documentation for guides, tutorials, and
                  best practices.
                </p>
                <Link
                  href="/resources/faq"
                  className="inline-flex items-center text-rose hover:underline"
                >
                  Visit FAQ
                  <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>

              <div
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire/10 text-sapphire mb-6">
                  <LifeBuoy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Technical Support
                </h3>
                <p className="text-ivory/70 mb-4">
                  Need help with technical issues? Our support team is here to
                  assist you.
                </p>
                <Link
                  href="#contact-section"
                  className="inline-flex items-center text-sapphire hover:underline"
                >
                  Get Support
                  <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>

              <div
                className="p-8 rounded-2xl border border-ivory/10 bg-charcoal/30 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige/10 text-beige mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-ivory mb-2">
                  Business Hours
                </h3>
                <p className="text-ivory/70 mb-4">
                  We're available to assist you during the following hours:
                </p>
                <ul className="text-ivory/70 space-y-1">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <RedesignedContactSection dictionary={dictionary} />
    </main>
  );
}
