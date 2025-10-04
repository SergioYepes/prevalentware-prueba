import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account }) {
    if (!user.email) return false;

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      // 🔥 Vincular cuenta nueva al mismo usuario
      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: account!.provider,
            providerAccountId: account!.providerAccountId,
          },
        },
        update: {},
        create: {
          userId: existingUser.id,
          type: account!.type,
          provider: account!.provider,
          providerAccountId: account!.providerAccountId,
          accessToken: account!.access_token,
          refreshToken: account!.refresh_token,
          idToken: account!.id_token,
          scope: account!.scope,
          accessTokenExpiresAt: account!.expires_at
            ? new Date(account!.expires_at * 1000)
            : null,
        },
      });

      return true; // dejarlo pasar
    }

    return true; // usuario nuevo -> lo crea el PrismaAdapter
    },

     async session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
          session.user.role = user.role; 
        }
        return session;
      },
  },
  events: {
    async createUser({ user }: { user: User }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" }, 
      });
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
};

export default NextAuth(authOptions);
