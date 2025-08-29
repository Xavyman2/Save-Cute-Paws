import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Server-side Sanity client
const client = createClient({
  projectId: 'gcn1lnqk',
  dataset: 'production',
  apiVersion: '2025-08-29',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function GET() {
  try {
    // Test Sanity connection
    const result = await client.fetch(`*[_type == "user"] | count()`)
    
    return NextResponse.json({ 
      status: 'connected',
      userCount: result,
      message: 'Sanity CMS is properly configured'
    })
  } catch (error) {
    console.error('Sanity connection error:', error)
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to Sanity CMS. Check your configuration.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
