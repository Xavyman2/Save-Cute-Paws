'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { client } from '@/sanity/lib/client'

interface UserData {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  role: string
  isVolunteer: boolean
  volunteerSkills: string[]
  bio: string
  joinedAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.id) {
      fetchUserData()
    }
  }, [session, status, router])

  const fetchUserData = async () => {
    try {
      const user = await client.fetch(
        `*[_type == "user" && _id == $id][0]`,
        { id: session?.user?.id }
      )
      setUserData(user)
    } catch (error) {
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) return

    setUpdating(true)
    setError('')

    try {
      await client
        .patch(userData._id)
        .set({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          bio: userData.bio,
          volunteerSkills: userData.volunteerSkills
        })
        .commit()

      alert('Profile updated successfully!')
    } catch (error) {
      setError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-red-600">Failed to load profile data</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account information</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (cannot be changed)
              </label>
              <Input
                type="email"
                value={userData.email}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                value={userData.phone || ''}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={userData.address || ''}
                onChange={(e) => setUserData({...userData, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={userData.bio || ''}
                onChange={(e) => setUserData({...userData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={4}
              />
            </div>

            {userData.isVolunteer && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volunteer Skills (comma-separated)
                </label>
                <Input
                  type="text"
                  value={userData.volunteerSkills?.join(', ') || ''}
                  onChange={(e) => setUserData({
                    ...userData, 
                    volunteerSkills: e.target.value.split(',').map(s => s.trim())
                  })}
                  placeholder="e.g., Animal care, Photography, Marketing"
                />
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
              <p className="text-sm text-gray-600">
                <strong>Role:</strong> {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Volunteer:</strong> {userData.isVolunteer ? 'Yes' : 'No'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Joined:</strong> {new Date(userData.joinedAt).toLocaleDateString()}
              </p>
            </div>

            <Button
              type="submit"
              disabled={updating}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
