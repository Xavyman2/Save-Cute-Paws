'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { FaGoogle, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [providers, setProviders] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    
    // Handle URL message on client side only
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const urlMessage = urlParams.get('message')
      if (urlMessage) {
        setMessage(urlMessage)
      }
    }

    // Get available providers safely
    if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
      getProviders().then(setProviders).catch(() => {
        console.log('Auth providers not available')
      })
    }
  }, [])

  const handleSocialSignIn = async (providerId: string) => {
    try {
      setLoading(true)
      // Check if auth is available
      if (typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
        setError('Social login is not available in this environment')
        return
      }
      
      const result = await signIn(providerId, { 
        callbackUrl: '/' 
      })
      if (result?.error) {
        setError(`Failed to sign in with ${providerId}`)
      }
    } catch (error) {
      setError('Social login is not available. Please use email instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Check if auth is available
      if (typeof window !== 'undefined' && !window.location.origin.includes('localhost')) {
        setError('Authentication is not available in this environment')
        return
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Check user session to determine redirect
        const session = await getSession()
        if (session?.user?.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      setError('Authentication service is not available.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your Save Cute Paws account</p>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Social Login Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignIn('google')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignIn('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-50"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>

          {/* Additional Social Options */}
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">More social options coming soon:</p>
            <div className="flex justify-center space-x-4 text-gray-400">
              <FaInstagram className="w-6 h-6" title="Instagram (Coming Soon)" />
              <FaTwitter className="w-6 h-6" title="X/Twitter (Coming Soon)" />
              <FaTiktok className="w-6 h-6" title="TikTok (Coming Soon)" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
