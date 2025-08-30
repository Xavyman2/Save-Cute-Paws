import { NextRequest, NextResponse } from 'next/server'
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
    // Fetch posts from Sanity
    const posts = await client.fetch(`
      *[_type == "post"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        "author": author->name,
        publishedAt,
        _createdAt
      }
    `)

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
