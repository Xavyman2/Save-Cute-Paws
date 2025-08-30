import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Dedicated client for blog posts with fresh data guarantee
export const blogClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Never use CDN for blog content
  perspective: 'published', // Only fetch published content
  stega: false, // Disable stega for performance
})
