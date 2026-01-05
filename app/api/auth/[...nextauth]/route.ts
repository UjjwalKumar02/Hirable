import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
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
  },
});

export { handler as GET, handler as POST };
