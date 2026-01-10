import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    providers: [], // Providers added in auth.ts (server-side)
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const allowedEmails = ["dancastarod@gmail.com", "admin_email@example.com"];
                return (
                    profile?.email?.endsWith("@utp.edu.co") ||
                    allowedEmails.includes(profile?.email || "")
                )
            }
            return true // Allow Credentials login
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                // @ts-ignore - 'id' is not in default SessionUser type but we add it
                session.user.id = token.sub
            }
            return session
        },
        authorized({ auth, request: nextUrl }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.nextUrl.pathname.startsWith('/dashboard');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    // pages: {
    //     signIn: '/api/auth/signin', // Default signin page
    // },
    session: {
        strategy: "jwt"
    }
} satisfies NextAuthConfig
