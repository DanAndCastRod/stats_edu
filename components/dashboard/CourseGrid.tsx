"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, BookOpen, Clock, Award } from "lucide-react"

export interface CourseWithProgress {
    course: {
        id: string
        title: string
        code: string
        slug: string
        description: string | null
        isMock?: boolean
        program?: "pregrado" | "posgrado"
        area?: string
        cycle?: string
        credits?: number
        ects?: number
        totalTopics?: number
    }
    progress: number
    completedTopics?: number
    averageScore?: number | null
}

export function CourseGrid({ enrollments }: { enrollments: CourseWithProgress[] }) {
    if (enrollments.length === 0) {
        return (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No hay asignaturas en este filtro</h3>
                <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
                    Cambia la pestaña o explora todas las asignaturas disponibles.
                </p>
                <Link
                    href="/courses"
                    className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                    Explorar Catálogo Completo
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {enrollments.map(({ course, progress, completedTopics = 0, averageScore }) => {
                const totalTopics = course.totalTopics || 4
                const isComplete = progress >= 100

                return (
                    <article
                        key={course.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="p-6 flex flex-col flex-1">
                            {/* Header Badges */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
                                        {course.code}
                                    </span>
                                    {course.program && (
                                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                            {course.program === "pregrado" ? "Pregrado" : "MIOE"}
                                        </span>
                                    )}
                                </div>

                                {isComplete ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle2 className="w-3 h-3" />
                                        100%
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">
                                        {Math.round(progress)}%
                                    </span>
                                )}
                            </div>

                            {/* Title & Description */}
                            <h3 className="mb-2 text-base font-bold text-slate-900 line-clamp-1 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {course.title.replace("[TEST]", "")}
                            </h3>
                            <p className="mb-4 text-xs text-slate-500 line-clamp-2 dark:text-slate-400 leading-relaxed">
                                {course.description || "Sin descripción curricular disponible."}
                            </p>

                            {/* Micro-stats */}
                            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {completedTopics} / {totalTopics} lecciones
                                </span>
                                {averageScore !== null && averageScore !== undefined && averageScore > 0 ? (
                                    <span className="font-semibold text-blue-700 dark:text-blue-300">
                                        Nota: {((averageScore / 100) * 5.0).toFixed(1)} / 5.0
                                    </span>
                                ) : (
                                    <span>{course.credits ? `${course.credits} Créditos` : ""}</span>
                                )}
                            </div>

                            {/* Progress Bar & Action */}
                            <div className="mt-auto space-y-3">
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div
                                        className={`h-full transition-all duration-500 ease-in-out ${
                                            isComplete ? "bg-emerald-500" : "bg-blue-600"
                                        }`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                                >
                                    <span>{progress > 0 ? "Continuar Lección" : "Iniciar Asignatura"}</span>
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
