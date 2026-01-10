import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/Header"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { CourseGrid } from "@/components/dashboard/CourseGrid"
import { Course } from "@prisma/client"

export default async function DashboardPage() {
    const session = await auth()
    const userId = session?.user?.id

    // Robustness: Handle unauthenticated state
    // Robustness: Handle unauthenticated state
    if (!userId) {
        redirect("/api/auth/signin")
    }

    // Verify user exists in DB (handle zombie sessions after DB reset)
    const userExists = await db.user.findUnique({ where: { id: userId } })
    if (!userExists) {
        // Force re-login to recreate user
        redirect("/api/auth/signin?error=SessionExpired")
    }

    // 1. Get existing enrollments
    let enrollments = await db.enrollment.findMany({
        where: { userId },
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    code: true,
                    slug: true,
                    description: true,
                    isMock: true
                }
            }
        }
    })

    // 2. Demo Onboarding: If no enrollments, auto-enroll in Mock Courses
    if (enrollments.length === 0) {
        const mockCourses = await db.course.findMany({
            where: { isMock: true }
        })

        if (mockCourses.length > 0) {
            console.log(`✨ Auto-enrolling user ${userId} in ${mockCourses.length} mock courses.`)

            // Transaction to ensure atomicity
            await db.$transaction(
                mockCourses.map((course: Course) =>
                    db.enrollment.create({
                        data: {
                            userId: userId,
                            courseId: course.id
                        }
                    })
                )
            )

            // Refresh enrollments for display
            enrollments = await db.enrollment.findMany({
                where: { userId },
                include: {
                    course: {
                        select: {
                            id: true,
                            title: true,
                            code: true,
                            slug: true,
                            description: true,
                            isMock: true
                        }
                    }
                }
            })
        }
    }

    // 3. Calculate Real Stats
    const totalCourses = enrollments.length

    // Calculate Avg Score (Mock implementation until QuizAttempt is populated)
    const stats = await db.quizAttempt.aggregate({
        where: { userId },
        _avg: { score: true },
        _count: { id: true }
    })

    const averageScore = stats._avg.score || 0
    const completedModules = 0

    // Transform data for the grid
    const formattedEnrollments = enrollments.map(e => ({
        course: e.course,
        progress: e.progress
    }))

    return (
        <div className="space-y-8">
            <DashboardHeader />

            <StatsCards
                totalCourses={totalCourses}
                averageScore={averageScore || 0}
                completedModules={completedModules}
            />

            <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Mis Cursos
                </h2>
                <CourseGrid enrollments={formattedEnrollments} />
            </div>
        </div>
    )
}
