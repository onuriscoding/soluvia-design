const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Base URL of the website
const BASE_URL = 'https://soluvia.co';

// Languages supported
const LANGUAGES = ['en', 'fr'];

// Common routes for all languages
const ROUTES = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/services/web-design-development', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/seo-optimization', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/ai-automation', priority: 0.8, changefreq: 'monthly' },
  { path: '/how-it-works', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
];

// Function to get current date in ISO format
function getCurrentDate() {
  return new Date().toISOString();
}

// Function to generate the sitemap
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${LANGUAGES.map(lang => 
    ROUTES.map(route => {
      const urlPath = route.path === '' ? `/${lang}` : `/${lang}${route.path}`;
      const url = `${BASE_URL}${urlPath}`;
      
      const alternateLinks = LANGUAGES.map(altLang => {
        const altPath = route.path === '' ? `/${altLang}` : `/${altLang}${route.path}`;
        return `<xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}${altPath}" />`;
      }).join('\n      ');
      
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${alternateLinks}
  </url>`;
    }).join('')
  ).join('')}
</urlset>`;

  // Format the XML with prettier
  const formattedSitemap = prettier.format(sitemap, {
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore',
  });

  // Create the public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write the sitemap to the public directory
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), formattedSitemap);
  console.log('Enhanced sitemap generated successfully!');
}

// Generate the sitemap
generateSitemap(); 