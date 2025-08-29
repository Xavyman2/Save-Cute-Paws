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
    // Fetch all stats in parallel
    const [totalPosts, publishedPosts, draftPosts, totalUsers, volunteers] = await Promise.all([
      client.fetch(`count(*[_type == "post"])`),
      client.fetch(`count(*[_type == "post" && defined(publishedAt)])`),
      client.fetch(`count(*[_type == "post" && !defined(publishedAt)])`),
      client.fetch(`count(*[_type == "user"])`),
      client.fetch(`count(*[_type == "user" && isVolunteer == true])`)
    ])

    const stats = {
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      draftPosts: draftPosts || 0,
      totalUsers: totalUsers || 0,
      volunteers: volunteers || 0,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
