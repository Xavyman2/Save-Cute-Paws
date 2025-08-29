function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-29'

export const dataset = 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gcn1lnqk'

export const useCdn = false
