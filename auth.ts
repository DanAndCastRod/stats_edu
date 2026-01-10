import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { authConfig } from "@/auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Credentials({
            name: "Modo Desarrollo",
            credentials: {
                email: { label: "Email (dev@utp.edu.co)", type: "text", placeholder: "dev@utp.edu.co" },
                password: { label: "Contraseña", type: "password", placeholder: "Cualquiera" }
            },
            async authorize(credentials) {
                if (process.env.NODE_ENV === "development" && credentials?.email === "dev@utp.edu.co") {
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
    // Callbacks are inherited from authConfig
})
