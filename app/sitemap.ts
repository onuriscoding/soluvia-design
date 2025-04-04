import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the site
  const baseUrl = 'https://soluvia.com';
  
  // Languages supported
  const languages = ['en', 'fr'];
  
  // Common routes for both languages
  const routes = [
    '',
    '/services',
    '/services/web-design-development',
    '/services/seo-optimization',
    '/services/ai-automation',
    '/how-it-works',
    '/about',
    '/contact',
  ];

  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = [];
  
  // Add entries for each language and route
  languages.forEach(lang => {
    routes.forEach(route => {
      const path = route === '' ? `/${lang}` : `/${lang}${route}`;
      sitemap.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });
  
  return sitemap;
}

