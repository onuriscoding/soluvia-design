import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://soluvia.co';
  
  // Define shared pathnames for both languages
  const pathnames = [
    '',
    '/about',
    '/services',
    '/services/web-design-development',
    '/services/seo-optimization',
    '/services/ai-automation',
    '/contact',
    '/how-it-works',
    '/resources/faq',
    '/resources/support',
  ];

  // Generate entries for English language
  const enEntries = pathnames.map(pathname => ({
    url: `${baseUrl}/en${pathname}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: pathname === '' ? 1 : 
             pathname.startsWith('/services/') ? 0.9 : 
             pathname === '/services' ? 0.8 : 
             pathname.startsWith('/resources/') ? 0.7 : 0.8,
  }));

  // Generate entries for French language
  const frEntries = pathnames.map(pathname => ({
    url: `${baseUrl}/fr${pathname}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: pathname === '' ? 0.9 : 
             pathname.startsWith('/services/') ? 0.8 : 
             pathname === '/services' ? 0.7 : 
             pathname.startsWith('/resources/') ? 0.6 : 0.7,
  }));

  // Add the root URL with a redirect notice
  const rootEntry = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, 
    priority: 1,
  };

  return [rootEntry, ...enEntries, ...frEntries];
}

