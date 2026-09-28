import { getCourseData } from "@/lib/courses"
import { notFound } from "next/navigation"
import Navbar from "@/components/shared/Navbar"
import { CourseSidebar } from "./components/CourseSidebar"
import { MobileBottomNav } from "@/components/shared/MobileBottomNav"
import { MobileSidebarDrawer } from "@/components/shared/MobileSidebarDrawer"
import { PresentationMode } from "@/components/widgets/PresentationMode"

export default async function CourseLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ slug: string }>
}) {

    // Await params
    const { slug } = await params

    const course = await getCourseData(slug)

    if (!course) notFound()

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Top Navbar */}
            <Navbar />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Desktop Sidebar */}
                <div className="hidden md:block border-r bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl shrink-0">
                    <CourseSidebar course={course} />
                </div>

                {/* Mobile Drawer (Hidden on MD) */}
                <MobileSidebarDrawer>
                    <CourseSidebar course={course} />
                </MobileSidebarDrawer>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px] pb-24 md:pb-0">
                    <div className="container max-w-4xl mx-auto py-12 px-6 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Nav */}
                <MobileBottomNav />

                {/* Floating Widgets */}
                <PresentationMode />
            </div>
        </div>
    )
}
