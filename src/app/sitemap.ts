import { MetadataRoute } from 'next'
import { notes } from '@/lib/notes-data'

/**
 * @fileoverview Dynamic Sitemap Generator.
 * 
 * Generates a valid sitemap.xml at /sitemap.xml.
 * Automatically maps all topics from notes-data.ts to ensure search engines can index them.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skience.vercel.app'

  // Map our dynamic notes data to sitemap entries
  const noteUrls = notes.map((note) => ({
    url: `${baseUrl}${note.pagePath}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/biology`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...noteUrls,
  ]
}
