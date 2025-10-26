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

        // Demo users for testing
        const demoUsers = [
          {
            email: "demo@intellecty.com",
            password: "demo123",
            user: {
              id: "demo-user",
              email: "demo@intellecty.com",
              name: "Demo User",
              role: "ADMIN",
              tenantId: "demo-tenant",
              tenant: { id: "demo-tenant", name: "Demo Company", tier: "FREE" }
            }
          },
          {
            email: "admin@intellecty.com",
            password: "admin123",
            user: {
              id: "admin-user",
              email: "admin@intellecty.com",
              name: "Admin User",
              role: "ADMIN",
              tenantId: "admin-tenant",
              tenant: { id: "admin-tenant", name: "Admin Company", tier: "PREMIUM" }
            }
          },
          {
            email: "customer@intellecty.com",
            password: "customer123",
            user: {
              id: "customer-user",
              email: "customer@intellecty.com",
              name: "Customer User",
              role: "USER",
              tenantId: "customer-tenant",
              tenant: { id: "customer-tenant", name: "Customer Company", tier: "GROWTH" }
            }
          }
        ];

        const foundUser = demoUsers.find(u => u.email === credentials.email && u.password === credentials.password);
        return foundUser ? foundUser.user : null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // For Google OAuth users, create default tenant info
        if (account?.provider === "google") {
          token.role = "USER";
          token.tenantId = `google-${user.id}`;
          token.tenant = { 
            id: `google-${user.id}`, 
            name: `${user.name}'s Company`, 
            tier: "FREE" 
          };
        } else {
          token.role = user.role;
          token.tenantId = user.tenantId;
          token.tenant = user.tenant;
        }
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
