import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.name || !user.image) {
        return false;
      }

      // Create user if not exists or update if exists
      await prisma.user.upsert({
        create: {
          email: user.email,
          name: user.name,
          avatar: user.image,
        },
        update: {
          name: user.name,
          avatar: user.image,
        },
        where: {
          email: user.email,
        },
      });

      return true;
    },

    // Storing userID in token and session.user for future db queries
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.userId = dbUser?.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
