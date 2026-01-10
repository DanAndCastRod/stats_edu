import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Navbar from "@/components/shared/Navbar"
import Sidebar from "@/components/shared/Sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/api/auth/signin")
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <Navbar user={session.user} />
            <div className="flex flex-1 container mx-auto max-w-7xl pt-4 gap-6 px-4">
                <aside className="hidden lg:block w-64 shrink-0">
                    <Sidebar />
                </aside>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
