function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

// Use hardcoded values if environment variables are not available
export const apiVersion = '2025-08-29'
export const dataset = 'production'
export const projectId = 'gcn1lnqk'
export const useCdn = false
