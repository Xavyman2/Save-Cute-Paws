import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Server-side Sanity client with private credentials
const client = createClient({
  projectId: 'gcn1lnqk',
  dataset: 'production',
  apiVersion: '2025-08-29',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // This will be server-side only
})

export async function GET() {
  try {
    // Fetch users from Sanity
    const users = await client.fetch(`
      *[_type == "user"] | order(_createdAt desc) {
        _id,
        name,
        email,
        role,
        isVolunteer,
        volunteerSkills,
        _createdAt
      }
    `)

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    
    // Create user in Sanity
    const newUser = await client.create({
      _type: 'user',
      ...userData,
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
