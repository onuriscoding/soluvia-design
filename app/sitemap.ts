import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://soluviadesign.com"

  // Main pages
  const routes = ["", "/about", "/services", "/portfolio", "/contact", "/how-it-works"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Portfolio items
  const portfolioItems = [
    "luxury-brand",
    "ecommerce-platform",
    "tech-startup",
    "seo-campaign",
    "restaurant-website",
    "digital-marketing",
    "local-business-seo",
    "mobile-app",
  ].map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Service pages
  const servicePages = [
    "web-design",
    "ecommerce",
    "seo-optimization",
    "web-development",
    "business-growth",
    "mobile-apps",
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...portfolioItems, ...servicePages]
}

