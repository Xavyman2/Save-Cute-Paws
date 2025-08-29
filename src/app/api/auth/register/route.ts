import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { client } from '@/sanity/lib/client'

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address, isVolunteer, volunteerSkills, bio } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user document
    const userDoc = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      role: 'user',
      isVolunteer: isVolunteer || false,
      volunteerSkills: volunteerSkills || [],
      bio: bio || '',
      joinedAt: new Date().toISOString()
    }

    // Save to Sanity
    const newUser = await client.create(userDoc)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
