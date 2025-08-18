import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connect } from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user }) {
            await connect();

            // check if user already exists
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: "google",
                });
            }

            return true;
        },
        async session({ session }) {
            if (!session.user) return session;
            await connect();
            const dbUser = await User.findOne({ email: session.user?.email });

            (session.user as any).id = dbUser?._id.toString()// attach MongoDB userId
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)