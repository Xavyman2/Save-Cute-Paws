import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from "bcryptjs"
import { client } from "@/sanity/lib/client"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user by email
        const user = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: credentials.email }
        )

        if (!user) {
          return null
        }

        // Check password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isVolunteer: user.isVolunteer
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // For social logins, create user in Sanity if they don't exist
      if (account?.provider !== 'credentials' && user.email) {
        const existingUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        )

        if (!existingUser) {
          // Create new user for social login
          const newUser = await client.create({
            _type: 'user',
            name: user.name || '',
            email: user.email,
            password: '', // No password for social logins
            role: 'user',
            isVolunteer: false,
            joinedAt: new Date().toISOString(),
            provider: account?.provider || 'unknown'
          })
          
          user.id = newUser._id
          user.role = 'user'
          user.isVolunteer = false
        } else {
          user.id = existingUser._id
          user.role = existingUser.role
          user.isVolunteer = existingUser.isVolunteer
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isVolunteer = user.isVolunteer
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
        session.user.isVolunteer = token.isVolunteer as boolean
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
