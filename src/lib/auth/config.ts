import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo",
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

        // Demo user for testing
        if (credentials.email === "demo@intellecty.com" && credentials.password === "demo123") {
          return {
            id: "demo-user",
            email: "demo@intellecty.com",
            name: "Demo User",
            role: "ADMIN",
            tenantId: "demo-tenant",
            tenant: { id: "demo-tenant", name: "Demo Company", tier: "FREE" }
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.tenantId = user.tenantId
        token.tenant = user.tenant
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.tenantId = token.tenantId as string
        session.user.tenant = token.tenant as any
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup"
  }
}
