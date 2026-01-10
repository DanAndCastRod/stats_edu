import { db } from "@/lib/db"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

export async function CoursePreviewSection() {
    // Fetch only IsMock courses for the preview
    const courses = await db.course.findMany({
        where: { isMock: true },
        include: {
            _count: {
                select: { modules: true }
            }
        },
        take: 3
    })

    return (
        <section id="courses" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            Cursos Disponibles
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
                            Explora las asignaturas piloto (Datos de Prueba Activos)
                        </p>
                    </div>
                    <Link href="/courses" className="text-brand-blue hover:text-blue-700 font-medium hidden md:flex items-center gap-1">
                        Ver todos <ArrowRight size={16} />
                    </Link>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed">
                        <p className="text-slate-500">No hay cursos de prueba activos. Ejecuta el seed script.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-all hover:border-brand-blue/50 hover:shadow-lg">
                                <div className="absolute top-4 right-4 z-10">
                                    {course.isMock && (
                                        <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                                            MOCK DATA
                                        </span>
                                    )}
                                </div>

                                <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    {/* Placeholder generic cover */}
                                    <BookOpen size={48} className="text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="text-xs font-medium text-slate-500 mb-2">{course.code}</div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                                        {course.title.replace('[TEST]', '')}
                                    </h3>
                                    <p className="flex-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs text-slate-500">{course._count.modules} Módulos</span>
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            className="text-sm font-semibold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                        >
                                            Acceder <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
