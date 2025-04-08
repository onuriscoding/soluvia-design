import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Prevent access to admin and private areas
        disallow: [
          '/admin/',
          '/private/',
          '/api/',
          '/*?*', // Block URLs with query strings
          '/*/amp/', // Block AMP pages if you don't use them
        ],
      },
      {
        // Special rules for image crawlers
        userAgent: 'Googlebot-Image',
        allow: '/images/',
      },
    ],
    sitemap: 'https://soluvia.com/sitemap.xml',
    host: 'https://soluvia.com',
  }
}

