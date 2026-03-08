import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail || credentials.email !== adminEmail) return null;

        const hash = process.env.ADMIN_PASSWORD_HASH;

        if (hash) {
          // Production: compare against bcrypt hash
          const valid = await compare(credentials.password as string, hash);
          if (!valid) return null;
        } else {
          // Fallback: plain password (dev only — set ADMIN_PASSWORD_HASH in prod)
          const plain = process.env.ADMIN_PASSWORD;
          if (credentials.password !== plain) return null;
        }

        return { id: "admin", email: adminEmail, name: "Linevolt Admin" };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
});
