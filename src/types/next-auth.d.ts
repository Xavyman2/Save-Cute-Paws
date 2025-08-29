import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      isVolunteer: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    isVolunteer: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    isVolunteer: boolean
  }
}
