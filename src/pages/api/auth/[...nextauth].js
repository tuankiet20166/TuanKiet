import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),

    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        maxAge: 24 * 60 * 60, 
        updateAge: 24 * 60 * 60, 
    }

}
export default NextAuth(authOptions)