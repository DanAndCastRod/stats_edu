"use client"

export interface TopicProgress {
    completed: boolean
    score?: number
    updatedAt: string
}

const STORAGE_KEY = "stats_edu_progress_v1"

function getStorage(): Record<string, TopicProgress> {
    if (typeof window === "undefined") return {}
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch {
        return {}
    }
}

function saveStorage(data: Record<string, TopicProgress>) {
    if (typeof window === "undefined") return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
        // ignore
    }
}

export async function markTopicAsCompleted(topicId: string, _courseSlug?: string) {
    if (typeof window === "undefined") return { success: true }
    const progress = getStorage()
    progress[topicId] = {
        ...progress[topicId],
        completed: true,
        updatedAt: new Date().toISOString()
    }
    saveStorage(progress)
    return { success: true }
}

export async function submitQuizResult(topicId: string, score: number) {
    if (typeof window === "undefined") return { success: true }
    const roundedScore = Math.round(score)
    const progress = getStorage()
    progress[topicId] = {
        completed: roundedScore >= 60,
        score: roundedScore,
        updatedAt: new Date().toISOString()
    }
    saveStorage(progress)
    return { success: true }
}

export function getAllUserProgress(): Record<string, TopicProgress> {
    return getStorage()
}
