import type { MetadataRoute } from 'next'
import { RESUME_PATH, SITE_URL } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}${RESUME_PATH}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
