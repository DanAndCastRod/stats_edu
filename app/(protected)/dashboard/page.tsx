"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/Header"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { CourseGrid } from "@/components/dashboard/CourseGrid"
import { getAllUserProgress } from "@/lib/progress"

const AVAILABLE_COURSES = [
    {
        id: "estadistica-i",
        title: "Estadística I",
        code: "511-23",
        slug: "estadistica-i",
        description: "Fundamentos de Estadística Descriptiva y Probabilidad para la toma de decisiones basada en datos.",
        isMock: false,
    },
    {
        id: "estadistica-ii",
        title: "Estadística II",
        code: "511-24",
        slug: "estadistica-ii",
        description: "Inferencia estadística avanzada, intervalos de confianza, pruebas de hipótesis y ANOVA.",
        isMock: false,
    },
    {
        id: "investigacion-operaciones-i",
        title: "Investigación de Operaciones I",
        code: "511-31",
        slug: "investigacion-operaciones-i",
        description: "Programación lineal, método simplex, teoría de la dualidad, análisis de sensibilidad y optimización.",
        isMock: false,
    },
    {
        id: "investigacion-operaciones-ii",
        title: "Investigación de Operaciones II",
        code: "511-32",
        slug: "investigacion-operaciones-ii",
        description: "Programación dinámica, cadenas de Markov, teoría de colas, inventarios probabilísticos y simulación.",
        isMock: false,
    },
]

export default function DashboardPage() {
    const [progressData, setProgressData] = useState<Record<string, { completed: boolean; score?: number }>>({})
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setProgressData(getAllUserProgress())
    }, [])

    const progressEntries = Object.values(progressData)
    const completedCount = progressEntries.filter(p => p.completed).length
    const scores = progressEntries.filter(p => typeof p.score === "number").map(p => p.score as number)
    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0

    const enrollments = AVAILABLE_COURSES.map(course => {
        const courseTopics = progressEntries.length > 0 ? completedCount : 0
        const progress = Math.min(100, courseTopics > 0 ? (courseTopics * 5) : 0)
        return {
            course,
            progress
        }
    })

    return (
        <div className="space-y-8">
            <DashboardHeader />

            <StatsCards
                totalCourses={AVAILABLE_COURSES.length}
                averageScore={averageScore}
                completedModules={completedCount}
            />

            <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Mis Cursos
                </h2>
                <CourseGrid enrollments={enrollments} />
            </div>
        </div>
    )
}
