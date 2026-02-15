import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://justtalk.ai'
  const pages = ['', '/platform', '/becometeacher', '/terms']
  
  // Generate sitemap entries for all locales
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : page === '/terms' ? 'monthly' : 'weekly',
      priority: page === '' ? 1 : page === '/platform' ? 0.9 : page === '/becometeacher' ? 0.8 : 0.3,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page}`])
        )
      }
    }))
  )
}
