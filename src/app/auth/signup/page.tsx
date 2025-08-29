'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { FaGoogle, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    isVolunteer: false,
    volunteerSkills: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSocialSignUp = async (providerId: string) => {
    try {
      setLoading(true)
      // Check if auth is available
      if (typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
        setError('Social sign-up is not available in this environment')
        return
      }
      
      const result = await signIn(providerId, { 
        callbackUrl: '/' 
      })
      if (result?.error) {
        setError(`Failed to sign up with ${providerId}`)
      }
    } catch (error) {
      setError('Social sign-up is not available. Please use email instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      // Check if registration API is available
      if (typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
        setError('User registration is not available in this environment')
        setLoading(false)
        return
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          volunteerSkills: formData.volunteerSkills ? formData.volunteerSkills.split(',').map(s => s.trim()) : []
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to sign in page with success message
      router.push('/auth/signin?message=Account created successfully! Please sign in.')

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Join Save Cute Paws</h1>
          <p className="text-gray-600 mt-2">Create your account to help save animals</p>
        </div>

        {/* Social Sign Up Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('google')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isVolunteer"
              name="isVolunteer"
              type="checkbox"
              checked={formData.isVolunteer}
              onChange={handleChange}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="isVolunteer" className="text-sm font-medium text-gray-700">
              I want to volunteer with Save Cute Paws
            </label>
          </div>

          {formData.isVolunteer && (
            <div>
              <label htmlFor="volunteerSkills" className="block text-sm font-medium text-gray-700 mb-1">
                Volunteer Skills (comma-separated)
              </label>
              <Input
                id="volunteerSkills"
                name="volunteerSkills"
                type="text"
                value={formData.volunteerSkills}
                onChange={handleChange}
                placeholder="e.g., Animal care, Photography, Marketing"
              />
            </div>
          )}

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Tell us about yourself
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Share why you want to help animals..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Additional Social Options */}
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">More social options coming soon:</p>
          <div className="flex justify-center space-x-4 text-gray-400">
            <FaInstagram className="w-6 h-6" title="Instagram (Coming Soon)" />
            <FaTwitter className="w-6 h-6" title="X/Twitter (Coming Soon)" />
            <FaTiktok className="w-6 h-6" title="TikTok (Coming Soon)" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
