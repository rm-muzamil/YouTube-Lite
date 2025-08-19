import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        // 🔹 Called once when signing in
        async signIn({ user }) {
            await connect();

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

        // 🔹 Add MongoDB userId into the JWT
        async jwt({ token, user }) {
            await connect();

            if (user) {
                const dbUser = await User.findOne({ email: user.email });
                token.id = dbUser?._id.toString(); // store userId in token
            }

            return token;
        },

        // 🔹 Expose MongoDB userId in session
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id; // attach MongoDB userId
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
