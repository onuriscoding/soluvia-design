import React from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'LocalBusiness' | 'Service' | 'FAQPage' | 'BreadcrumbList' | 'Article';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  // Base structured data for different types
  let structuredData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  // Convert to JSON string
  const jsonLd = JSON.stringify(structuredData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

// Organization structured data
export function OrganizationStructuredData() {
  const data = {
    name: 'Soluvia',
    url: 'https://soluvia.co',
    logo: {
      '@type': 'ImageObject',
      url: 'https://soluvia.co/soluvia-s-no-bg.png',
      width: 112,
      height: 112,
      caption: 'Soluvia Logo'
    },
    sameAs: [
      'https://www.instagram.com/soluviaco/',
      'https://www.linkedin.com/company/soluviaco',

    ],
    description: 'Soluvia provides expert web design, development, SEO optimization, and AI solutions to help businesses thrive in the digital world.',
    address: {
      '@type': '1050',
      addressCountry: 'Belgium',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-20-3318-6185',
      contactType: 'customer service',
      email: 'info@soluvia.co'
    }
  };

  return <StructuredData type="Organization" data={data} />;
}

// Website structured data
export function WebsiteStructuredData() {
  const data = {
    name: 'Soluvia',
    url: 'https://soluvia.co',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://soluvia.co/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'fr']
  };

  return <StructuredData type="WebSite" data={data} />;
}

// Service structured data
export function ServiceStructuredData({ service }: { service: string }) {
  let data: Record<string, any> = {
    name: `${service} - Soluvia`,
    provider: {
      '@type': 'Organization',
      name: 'Soluvia',
      url: 'https://soluvia.co'
    }
  };

  // Customize based on service type
  switch (service) {
    case 'Web Design & Development':
      data = {
        ...data,
        description: 'Professional web design and development services for businesses looking to enhance their online presence with beautiful, responsive websites and web applications.',
        areaServed: 'Worldwide',
        serviceType: 'Web Development',
        offers: {
          '@type': 'Offer',
          price: '999',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '999',
            priceCurrency: 'EUR',
            unitText: 'Project'
          }
        }
      };
      break;
    case 'SEO Optimization':
      data = {
        ...data,
        description: 'Comprehensive SEO optimization services to improve your website visibility and ranking in search engine results, driving more organic traffic to your business.',
        areaServed: 'Worldwide',
        serviceType: 'Search Engine Optimization',
        offers: {
          '@type': 'Offer',
          price: '499',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '499',
            priceCurrency: 'EUR',
            unitText: 'Project'
          }
        }
      };
      break;
    case 'AI Automation':
      data = {
        ...data,
        description: 'Advanced AI automation solutions to streamline business processes, enhance customer experiences, and improve efficiency while reducing operational costs.',
        areaServed: 'Worldwide',
        serviceType: 'Business Automation',
        offers: {
          '@type': 'Offer',
          price: '799',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '799',
            priceCurrency: 'EUR',
            unitText: 'Project'
          }
        }
      };
      break;
    default:
      data = {
        ...data,
        description: 'Professional digital services provided by Soluvia to help businesses succeed online.',
        areaServed: 'Worldwide',
      };
  }

  return <StructuredData type="Service" data={data} />;
}

// FAQ Page structured data
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const data = {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return <StructuredData type="FAQPage" data={data} />;
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }));

  return <StructuredData 
    type="BreadcrumbList" 
    data={{ itemListElement }} 
  />;
}

// Article structured data
export function ArticleStructuredData({ 
  headline, 
  description, 
  authorName, 
  publishDate, 
  modifiedDate,
  imageUrl
}: { 
  headline: string;
  description: string;
  authorName: string;
  publishDate: string;
  modifiedDate: string;
  imageUrl: string;
}) {
  const data = {
    headline,
    description,
    author: {
      '@type': 'Person',
      name: authorName
    },
    image: imageUrl,
    datePublished: publishDate,
    dateModified: modifiedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Soluvia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://soluvia.co/soluvia-s-no-bg.png'
      }
    }
  };

  return <StructuredData type="Article" data={data} />;
} 