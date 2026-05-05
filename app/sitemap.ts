import type { MetadataRoute } from 'next'

import { getDesignIds } from './_lib/designs'
import { getAllStories, isExternalStory } from './_lib/stories'

const SITE_URL = 'https://gridbeam.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/designs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/stories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/suppliers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${SITE_URL}/tools/cutting-planner`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools-and-resources`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/subscribe`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: `${SITE_URL}/legal/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const designIds = await getDesignIds()
  const designEntries: MetadataRoute.Sitemap = designIds.map((id) => ({
    url: `${SITE_URL}/designs/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // External stories are linked from the index but not hosted on this site,
  // so they don't get sitemap entries — only the in-repo MDX stories do.
  const stories = getAllStories().filter((story) => !isExternalStory(story.metadata))
  const storyEntries: MetadataRoute.Sitemap = stories.map(({ metadata }) => ({
    url: `${SITE_URL}/stories/${metadata.slug}`,
    lastModified: new Date(metadata.updatedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticEntries, ...designEntries, ...storyEntries]
}
