import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { writeClient, isSanityConfigured } from "@/sanity/lib/client";

/** Check Sanity first (dashboard-managed), fall back to env var */
async function getPasswordHash(): Promise<string | null> {
  if (isSanityConfigured()) {
    try {
      const doc = await writeClient.fetch(
        `*[_type == "adminSettings" && _id == "adminSettings"][0]{passwordHash}`
      );
      if (doc?.passwordHash) return doc.passwordHash;
    } catch {}
  }
  return process.env.ADMIN_PASSWORD_HASH ?? null;
}

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

        const hash = await getPasswordHash();

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
