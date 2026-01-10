
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder", // Avoid crash if missing
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // 🔹 DEV LOGIN (Bypass for development)
        Credentials({
            name: "Modo Desarrollo",
            credentials: {
                email: { label: "Email (dev@utp.edu.co)", type: "text", placeholder: "dev@utp.edu.co" },
                password: { label: "Contraseña", type: "password", placeholder: "Cualquiera" }
            },
            async authorize(credentials) {
                // Only allow specific dev email to prevent abuse in prod
                if (process.env.NODE_ENV === "development" && credentials?.email === "dev@utp.edu.co") {
                    // Check if dev user exists, if not create it ensures Dashboard works
                    let user = await db.user.findUnique({ where: { email: "dev@utp.edu.co" } })

                    if (!user) {
                        user = await db.user.create({
                            data: {
                                email: "dev@utp.edu.co",
                                name: "Usuario Desarrollador",
                                role: "ADMIN",
                                isMock: true,
                            }
                        })
                    }
                    return user
                }
                return null
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                return (
                    profile?.email?.endsWith("@utp.edu.co") ||
                    profile?.email === "admin_email@example.com"
                )
            }
            return true // Allow Credentials login
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            return session
        }
    },
    // pages: {
    //     signIn: '/login', // Custom login page
    // },
    session: {
        strategy: "jwt"
    }
})
