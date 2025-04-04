export const seoServices = {
  mainService: {
    title: "SEO Optimization",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.",
    longDescription: "Our SEO services are designed to improve your website's visibility in search engine results, drive more qualified traffic, and increase conversions. We use data-driven strategies, advanced analytics, and proven techniques to help your business rank higher for relevant keywords and reach your target audience.",
    benefits: [
      "Higher search engine rankings for relevant keywords",
      "Increased organic traffic to your website",
      "Better user experience and website usability",
      "Improved conversion rates and ROI",
      "Long-term sustainable results",
      "Competitive advantage in your industry"
    ],
    image: "/seo.png",
    structuredData: {
      "@type": "Service",
      "name": "SEO Optimization Services",
      "description": "Comprehensive SEO optimization services to improve your website visibility and ranking in search engine results.",
      "provider": {
        "@type": "Organization",
        "name": "Soluvia",
        "url": "https://soluvia.com"
      },
      "areaServed": "Worldwide",
      "serviceType": "SEO Optimization"
    }
  },
  subServices: [
    {
      id: "on-page-seo",
      title: "On-Page SEO",
      description: "We optimize your website's content, structure, and HTML elements to improve visibility and rankings in search engine results.",
      icon: "FileText",
      features: [
        "Keyword research and optimization",
        "Meta title and description optimization",
        "Header tag optimization",
        "Content optimization",
        "Image optimization",
        "URL structure improvement",
      ],
      image: "/on-page-seo.png",
      structuredData: {
        "@type": "Service",
        "name": "On-Page SEO Services",
        "description": "Optimize your website's content, structure, and HTML elements to improve visibility and rankings in search engine results.",
        "provider": {
          "@type": "Organization",
          "name": "Soluvia",
          "url": "https://soluvia.com"
        }
      }
    },
    {
      id: "off-page-seo",
      title: "Off-Page SEO",
      description: "We build your website's authority through high-quality backlinks, social signals, and other external factors that influence search rankings.",
      icon: "Link2",
      features: [
        "Link building strategies",
        "Guest posting opportunities",
        "Social media integration",
        "Brand mentions monitoring",
        "Competitor backlink analysis",
        "Authority building",
      ],
      image: "/off-page-seo.png",
      structuredData: {
        "@type": "Service",
        "name": "Off-Page SEO Services",
        "description": "Build your website's authority through high-quality backlinks, social signals, and other external factors that influence search rankings.",
        "provider": {
          "@type": "Organization",
          "name": "Soluvia",
          "url": "https://soluvia.com"
        }
      }
    },
    {
      id: "technical-seo",
      title: "Technical SEO",
      description: "We ensure your website's technical foundation is solid, allowing search engines to crawl, index, and rank your site effectively.",
      icon: "Zap",
      features: [
        "Site speed optimization",
        "Mobile-friendliness improvements",
        "Schema markup implementation",
        "XML sitemap creation",
        "Robots.txt optimization",
        "Fixing crawl errors and broken links",
      ],
      image: "/technical-seo.png",
      structuredData: {
        "@type": "Service",
        "name": "Technical SEO Services",
        "description": "Ensure your website's technical foundation is solid, allowing search engines to crawl, index, and rank your site effectively.",
        "provider": {
          "@type": "Organization",
          "name": "Soluvia",
          "url": "https://soluvia.com"
        }
      }
    },
    {
      id: "local-seo",
      title: "Local SEO",
      description: "We optimize your online presence to attract more business from relevant local searches, helping you connect with nearby customers.",
      icon: "Map",
      features: [
        "Google Business Profile optimization",
        "Local keyword targeting",
        "Citation building and cleanup",
        "Review management",
        "Local link building",
        "Local content strategy",
      ],
      image: "/local-seo.png",
      structuredData: {
        "@type": "Service",
        "name": "Local SEO Services",
        "description": "Optimize your online presence to attract more business from relevant local searches, helping you connect with nearby customers.",
        "provider": {
          "@type": "Organization",
          "name": "Soluvia",
          "url": "https://soluvia.com"
        }
      }
    }
  ],
  processSteps: [
    {
      number: "01",
      title: "SEO Audit & Analysis",
      description: "We conduct a comprehensive analysis of your website's current SEO performance, identifying strengths, weaknesses, and opportunities.",
      icon: "Search",
    },
    {
      number: "02",
      title: "Keyword Research",
      description: "We identify the most valuable and relevant keywords for your business, considering search volume, competition, and user intent.",
      icon: "Compass",
    },
    {
      number: "03",
      title: "On-Page Optimization",
      description: "We optimize your website's content, meta tags, headers, and other on-page elements to improve relevance and rankings.",
      icon: "FileText",
    },
    {
      number: "04",
      title: "Technical Optimization",
      description: "We address technical issues that may be hindering your site's performance in search results, such as site speed and mobile-friendliness.",
      icon: "Zap",
    },
    {
      number: "05",
      title: "Off-Page Strategy",
      description: "We implement strategies to build your site's authority through quality backlinks, social signals, and other off-page factors.",
      icon: "Link2",
    },
    {
      number: "06",
      title: "Monitoring & Reporting",
      description: "We continuously monitor your SEO performance, providing regular reports and making adjustments to optimize results.",
      icon: "BarChart",
    },
  ],
  faqs: [
    {
      question: "How long does it take to see results from SEO?",
      answer: "SEO is a long-term strategy. While some improvements may be visible within a few weeks, significant results typically take 3-6 months. This timeline varies based on your website's current state, competition in your industry, and the specific strategies implemented."
    },
    {
      question: "What makes your SEO services different from others?",
      answer: "Our approach combines human expertise with AI-powered tools for maximum effectiveness. We focus on sustainable, white-hat techniques that build lasting results rather than quick fixes that could harm your site in the long run. We also provide transparent reporting and maintain open communication throughout the process."
    },
    {
      question: "Do you guarantee first-page rankings?",
      answer: "While we have a strong track record of achieving first-page rankings for our clients, no ethical SEO company can guarantee specific rankings. Search engines use complex algorithms that consider hundreds of factors. We focus on implementing best practices that significantly improve your chances of ranking well."
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track multiple metrics to measure success, including organic traffic growth, keyword rankings, conversion rates, bounce rates, page load times, and more. We provide regular reports that show these metrics and explain what they mean for your business."
    },
    {
      question: "Will I need to make changes to my website?",
      answer: "Most SEO strategies require some website changes to optimize performance. These may include content updates, metadata improvements, speed optimizations, or structural changes. We'll clearly communicate any recommended changes and can implement many of them for you."
    }
  ]
}; 