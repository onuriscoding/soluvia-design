import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://soluvia.co';
  
  // Define shared pathnames with their associated images
  const pathnames = [
    {
      path: '',
      images: [
        '/soluvia-s-no-bg.png',
        '/soluvia.png',
        '/soluvia-final-no-bg.png'
      ]
    },
    {
      path: '/services',
      images: [
        '/web-design.png',
        '/seo.png',
        '/ai.png'
      ]
    },
    {
      path: '/services/web-design-development',
      images: [
        '/web-design.png',
        '/web-development.png',
        '/mobile.png'
      ]
    },
    {
      path: '/services/seo-optimization',
      images: [
        '/seo.png',
        '/on-page-seo.png',
        '/off-page-seo.png',
        '/technical-seo.png',
        '/local-seo.png'
      ]
    },
    {
      path: '/services/ai-solutions',
      images: [
        '/ai.png',
        '/ai-chatbot.png',
        '/ai-content.png',
        '/ai-analytics.png'
      ]
    },
    {
      path: '/about',
      images: [
        '/our-story-2.png',
        '/our-approach.png'
      ]
    },
    { path: '/contact' },
    { path: '/how-it-works' },
    { path: '/resources/faq' },
    { path: '/resources/support' },
    { path: '/privacy-policy' },
    { path: '/terms-of-service' },
  ];

  // Generate entries for English language
  const enEntries = pathnames.map(({ path, images }) => ({
    url: `${baseUrl}/en${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 
             path.startsWith('/services/') ? 0.9 : 
             path === '/services' ? 0.8 : 
             path.startsWith('/resources/') ? 0.7 : 0.8,
    images: images?.map(img => `${baseUrl}${img}`)
  }));

  // Generate entries for French language
  const frEntries = pathnames.map(({ path, images }) => ({
    url: `${baseUrl}/fr${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 0.9 : 
             path.startsWith('/services/') ? 0.8 : 
             path === '/services' ? 0.7 : 
             path.startsWith('/resources/') ? 0.6 : 0.7,
    images: images?.map(img => `${baseUrl}${img}`)
  }));

  // Add the root URL with a redirect notice
  const rootEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, 
    priority: 1,
    images: [
      `${baseUrl}/soluvia.png`,
      `${baseUrl}/soluvia-final-no-bg.png`,
      `${baseUrl}/soluvia-s-no-bg.png`
    ]
  };

  return [rootEntry, ...enEntries, ...frEntries];
}

