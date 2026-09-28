"use client"

import { useEffect, useState, useMemo } from "react"
import { DashboardHeader } from "@/components/dashboard/Header"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { CourseGrid } from "@/components/dashboard/CourseGrid"
import { AcademicCertificateModal } from "@/components/dashboard/AcademicCertificateModal"
import { OFFICIAL_COURSES, type OfficialCourse } from "@/lib/curriculum-catalog"
import { getAllUserProgress, getStudentProfile, type StudentProfile } from "@/lib/progress"
import {
    Award,
    GraduationCap,
    BookOpen,
    Filter,
    Search,
    CheckCircle2,
    FileText,
    Sparkles
} from "lucide-react"

type DashboardFilter = "todos" | "pregrado" | "posgrado" | "en-progreso"

export default function DashboardPage() {
    const [progressData, setProgressData] = useState<Record<string, { completed: boolean; score?: number }>>({})
    const [studentProfile, setStudentProfile] = useState<StudentProfile>({
        name: "Estudiante UTP",
        email: "estudiante@utp.edu.co",
        studentCode: "",
        career: "Ingeniería Industrial",
        semester: "4"
    })
    const [selectedFilter, setSelectedFilter] = useState<DashboardFilter>("todos")
    const [searchQuery, setSearchQuery] = useState("")
    const [isCertModalOpen, setIsCertModalOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setProgressData(getAllUserProgress())
        setStudentProfile(getStudentProfile())
    }, [])

    // Real progress calculation for each of the 21 official courses
    const enrollments = useMemo(() => {
        return OFFICIAL_COURSES.map(course => {
            const courseProgressEntries = Object.entries(progressData).filter(
                ([id]) => id.startsWith(`${course.slug}-`)
            )
            const completedTopics = courseProgressEntries.filter(([_, p]) => p.completed).length
            const progress =
                course.totalTopics > 0
                    ? Math.min(100, Math.round((completedTopics / course.totalTopics) * 100))
                    : 0

            const scores = courseProgressEntries
                .filter(([_, p]) => typeof p.score === "number")
                .map(([_, p]) => p.score as number)
            const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null

            return {
                course,
                progress,
                completedTopics,
                averageScore
            }
        })
    }, [progressData])

    // Global dashboard metrics
    const metrics = useMemo(() => {
        const progressEntries = Object.values(progressData)
        const totalCompletedLessons = progressEntries.filter(p => p.completed).length
        const scores = progressEntries.filter(p => typeof p.score === "number").map(p => p.score as number)
        const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
        const startedCourses = enrollments.filter(e => e.completedTopics > 0).length

        return {
            totalCompletedLessons,
            averageScore,
            startedCourses
        }
    }, [progressData, enrollments])

    // Filtered enrollments for display
    const filteredEnrollments = useMemo(() => {
        return enrollments.filter(e => {
            // Program filter
            if (selectedFilter === "pregrado" && e.course.program !== "pregrado") return false
            if (selectedFilter === "posgrado" && e.course.program !== "posgrado") return false
            if (selectedFilter === "en-progreso" && e.completedTopics === 0) return false

            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim()
                const matchesCode = e.course.code.toLowerCase().includes(q)
                const matchesTitle = e.course.title.toLowerCase().includes(q)
                const matchesArea = e.course.area.toLowerCase().includes(q)
                return matchesCode || matchesTitle || matchesArea
            }

            return true
        })
    }, [enrollments, selectedFilter, searchQuery])

    const pregradoCount = enrollments.filter(e => e.course.program === "pregrado").length
    const posgradoCount = enrollments.filter(e => e.course.program === "posgrado").length
    const enProgresoCount = enrollments.filter(e => e.completedTopics > 0).length

    return (
        <div className="space-y-8 pb-12">
            {/* Header with profile actions and Certificate button */}
            <DashboardHeader onOpenCertificate={() => setIsCertModalOpen(true)} />

            {/* Academic Certificate and Report Generator Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white p-6 shadow-md border border-blue-800/50">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                <Award className="w-3.5 h-3.5" />
                                Certificación Oficial UTP
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200">
                                <Sparkles className="w-3 h-3" />
                                Malla Curricular 21 Asignaturas
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                            Certificado de Culminación y Sábana de Notas Oficial
                        </h2>
                        <p className="text-xs md:text-sm text-blue-100/80 leading-relaxed">
                            Genera e imprime tu reporte académico con membrete de la Facultad de Ingeniería Industrial,
                            código de verificación digital y promedio ponderado en escala 0.0 a 5.0 y 0 a 100.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsCertModalOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:-translate-y-0.5"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Generar Certificado y Reporte en PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Metrics Cards */}
            <StatsCards
                totalCourses={OFFICIAL_COURSES.length}
                averageScore={metrics.averageScore}
                completedModules={metrics.totalCompletedLessons}
            />

            {/* Courses Section with Filters and Search */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Asignaturas del Plan de Estudios
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Seguimiento porcentual de lecciones completadas y evaluaciones por asignatura
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setSelectedFilter("todos")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                selectedFilter === "todos"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            Todas ({OFFICIAL_COURSES.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedFilter("pregrado")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                selectedFilter === "pregrado"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            Pregrado ({pregradoCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedFilter("posgrado")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                selectedFilter === "posgrado"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            Posgrado MIOE ({posgradoCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedFilter("en-progreso")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                selectedFilter === "en-progreso"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            Iniciadas ({enProgresoCount})
                        </button>
                    </div>
                </div>

                {/* Course Grid with Real Progress */}
                <CourseGrid enrollments={filteredEnrollments} />
            </div>

            {/* Official Academic Certificate and Transcript Modal */}
            <AcademicCertificateModal
                isOpen={isCertModalOpen}
                onClose={() => setIsCertModalOpen(false)}
                courses={enrollments}
                studentProfile={studentProfile}
            />
        </div>
    )
}
