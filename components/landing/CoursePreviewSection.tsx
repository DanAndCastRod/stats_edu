import { getAllCourses } from "@/lib/courses"
import Link from "next/link"
import { ArrowRight, BookOpen, Layers, Clock, Sparkles } from "lucide-react"

export async function CoursePreviewSection() {
    const allCourses = await getAllCourses()
    const courses = allCourses.map(c => ({
        id: c.id,
        title: c.title,
        code: c.code,
        slug: c.slug,
        description: c.description,
        isMock: false,
        _count: { modules: c.modules.length }
    }))

    return (
        <section id="courses" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs font-semibold text-brand-blue mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Plan de Asignaturas
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            Cursos y Módulos Interactivos
                        </h2>
                        <p className="mt-2 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            Currículo estructurado paso a paso con simulaciones dinámicas, laboratorios en Python y evaluación continua.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 font-semibold text-sm text-brand-blue hover:text-blue-700 dark:hover:text-blue-400 group transition-colors"
                    >
                        <span>Ver catálogo completo</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-blue/50 hover:-translate-y-1"
                        >
                            {/* Card Accent Top Banner */}
                            <div className="h-2 w-full bg-gradient-to-r from-brand-blue via-indigo-500 to-brand-orange" />

                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 text-xs font-bold text-brand-blue border border-blue-100 dark:border-blue-800/40">
                                        Código: {course.code}
                                    </span>
                                    {course.isMock ? (
                                        <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                                            Beta
                                        </span>
                                    ) : (
                                        <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                            Oficial
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-blue transition-colors">
                                    {course.title.replace('[TEST]', '')}
                                </h3>

                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-1">
                                    {course.description || "Curso interactivo con teoría aplicada, visualizaciones gráficas y laboratorios de código."}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Layers className="h-4 w-4 text-brand-blue" />
                                        <span>{course._count?.modules || 6} Módulos</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Clock className="h-4 w-4 text-emerald-500" />
                                        <span>Ritmo propio</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 text-sm font-bold transition-all hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white group/btn shadow-sm"
                                >
                                    <span>Explorar Temario</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
