import React from 'react';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'LocalBusiness' | 'Service' | 'FAQPage';
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
    url: 'https://soluvia.com',
    logo: 'https://soluvia.com/soluvia-no-bg.png',
    sameAs: [
      'https://twitter.com/SoluviaDesign',
      'https://www.linkedin.com/company/soluvia',
      'https://www.facebook.com/SoluviaDesign'
    ],
    description: 'Soluvia provides expert web design, development, SEO optimization, and AI solutions to help businesses thrive in the digital world.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Belgium',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32-000-000-000',
      contactType: 'customer service',
      email: 'contact@soluvia.com'
    }
  };

  return <StructuredData type="Organization" data={data} />;
}

// Website structured data
export function WebsiteStructuredData() {
  const data = {
    name: 'Soluvia',
    url: 'https://soluvia.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://soluvia.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
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
      url: 'https://soluvia.com'
    }
  };

  // Customize based on service type
  switch (service) {
    case 'Web Design':
      data = {
        ...data,
        description: 'Professional web design services for businesses looking to enhance their online presence with beautiful, responsive websites.',
        areaServed: 'Worldwide',
      };
      break;
    case 'Web Development':
      data = {
        ...data,
        description: 'Expert web development services using the latest technologies to build fast, scalable, and secure websites and web applications.',
        areaServed: 'Worldwide',
      };
      break;
    case 'SEO Optimization':
      data = {
        ...data,
        description: 'Comprehensive SEO optimization services to improve your website visibility and ranking in search engine results.',
        areaServed: 'Worldwide',
      };
      break;
    case 'AI Automation':
      data = {
        ...data,
        description: 'Advanced AI automation solutions to streamline business processes and improve efficiency.',
        areaServed: 'Worldwide',
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