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

export interface StudentProfile {
    name: string
    email: string
    studentCode: string
    career: string
    semester: string
}

const PROFILE_KEY = "stats_edu_student_profile_v1"

export function getStudentProfile(): StudentProfile {
    if (typeof window === "undefined") {
        return { name: "Estudiante UTP", email: "estudiante@utp.edu.co", studentCode: "", career: "Ingeniería Industrial", semester: "4" }
    }
    try {
        const raw = localStorage.getItem(PROFILE_KEY)
        if (raw) return JSON.parse(raw)
    } catch {
        // ignore
    }
    return { name: "Estudiante UTP", email: "estudiante@utp.edu.co", studentCode: "", career: "Ingeniería Industrial", semester: "4" }
}

export function saveStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
    const current = getStudentProfile()
    const updated = { ...current, ...profile }
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(updated))
        } catch {
            // ignore
        }
    }
    return updated
}

export function exportProgressBackup(): string {
    const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        profile: getStudentProfile(),
        progress: getAllUserProgress()
    }
    return JSON.stringify(data, null, 2)
}

export function importProgressBackup(jsonString: string): boolean {
    try {
        const parsed = JSON.parse(jsonString)
        if (parsed && typeof parsed === "object") {
            if (parsed.profile) {
                saveStudentProfile(parsed.profile)
            }
            if (parsed.progress && typeof parsed.progress === "object") {
                saveStorage(parsed.progress)
            }
            return true
        }
    } catch {
        return false
    }
    return false
}
