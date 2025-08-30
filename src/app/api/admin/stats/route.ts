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

interface Post {
  _type: string;
  publishedAt?: string;
}

interface User {
  _type: string;
  isVolunteer?: boolean;
}

export async function GET() {
  try {
    // Fetch all data and count on the client side
    const [allPosts, allUsers] = await Promise.all([
      client.fetch(`*[_type == "post"]`) as Promise<Post[]>,
      client.fetch(`*[_type == "user"]`) as Promise<User[]>
    ])

    // Calculate stats
    const totalPosts = allPosts.length
    const publishedPosts = allPosts.filter((post: Post) => post.publishedAt).length
    const draftPosts = allPosts.filter((post: Post) => !post.publishedAt).length
    const totalUsers = allUsers.length
    const volunteers = allUsers.filter((user: User) => user.isVolunteer === true).length

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
