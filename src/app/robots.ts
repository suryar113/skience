import { MetadataRoute } from 'next'

/**
 * @fileoverview Robots.txt Generator.
 * 
 * Directs search engine crawlers to the dynamic sitemap.xml.
 * Next.js automatically serves this as /robots.txt when deployed.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://skience.vercel.app/sitemap.xml',
  }
}
