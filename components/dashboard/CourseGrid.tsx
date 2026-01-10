import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Prisma } from "@prisma/client"

// Defined type based on the specific query we will use
type CourseWithProgress = {
    course: {
        id: string
        title: string
        code: string
        slug: string
        description: string | null
        isMock: boolean
    }
    progress: number
}

export function CourseGrid({ enrollments }: { enrollments: CourseWithProgress[] }) {
    if (enrollments.length === 0) {
        return (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No tienes cursos inscritos</h3>
                <p className="mb-4 text-sm text-slate-500">Explora el catálogo o pide a tu profesor que te inscriba.</p>
                <Link
                    href="/courses"
                    className="rounded-md bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                >
                    Explorar Cursos
                </Link>
            </div>
        )
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {enrollments.map(({ course, progress }) => (
                <div key={course.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-brand-blue/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                {course.code}
                            </span>
                            {course.isMock && (
                                <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                    TEST
                                </span>
                            )}
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-1 dark:text-white group-hover:text-brand-blue">
                            {course.title.replace('[TEST]', '')}
                        </h3>
                        <p className="mb-6 text-sm text-slate-500 line-clamp-2 dark:text-slate-400">
                            {course.description || "Sin descripción disponible."}
                        </p>

                        <div className="mt-auto space-y-3">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Progreso</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div
                                    className="h-full bg-brand-blue transition-all duration-500 ease-in-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <Link
                                href={`/courses/${course.slug}`}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-brand-blue dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                            >
                                Continuar
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
