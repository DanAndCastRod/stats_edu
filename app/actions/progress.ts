"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function markTopicAsCompleted(topicId: string, courseSlug: string) {
    const session = await auth()

    if (!session?.user?.id) return { error: "Unauthorized" }

    try {
        await db.userProgress.upsert({
            where: {
                userId_topicId: {
                    userId: session.user.id,
                    topicId: topicId
                }
            },
            update: {
                completed: true,
                updatedAt: new Date()
            },
            create: {
                userId: session.user.id,
                topicId: topicId,
                completed: true
            }
        })

        revalidatePath(`/courses/${courseSlug}`)
        return { success: true }
    } catch (error) {
        console.error("Error marking topic complete:", error)
        return { error: "Failed to update progress" }
    }
}

export async function submitQuizResult(topicId: string, score: number) {
    const session = await auth()

    if (!session?.user?.id) return { error: "Unauthorized" }

    try {
        await db.userProgress.upsert({
            where: {
                userId_topicId: {
                    userId: session.user.id,
                    topicId: topicId
                }
            },
            update: {
                score: score,
                completed: score >= 60, // Mark as completed if passed
                updatedAt: new Date()
            },
            create: {
                userId: session.user.id,
                topicId: topicId,
                score: score,
                completed: score >= 60
            }
        })

        return { success: true }
    } catch (error) {
        console.error("Error submitting quiz result:", error)
        return { error: "Failed to submit quiz result" }
    }
}
