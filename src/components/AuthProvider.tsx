'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render SessionProvider on client side and if we're not in static export mode
  if (!isClient) {
    return <>{children}</>
  }

  // Check if we're in a static export environment
  if (typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
    // In production static mode, don't use SessionProvider
    return <>{children}</>
  }

  return (
    <SessionProvider
      // Reduce refetch interval to prevent constant API calls
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  )
}
