import { db } from "@/lib/db"
import Link from "next/link"
import { Navbar } from "@/components/shared/PublicNavbar"
import { BookOpen, Clock, Users, ArrowRight } from "lucide-react"

export default async function CoursesPage() {
    const courses = await db.course.findMany({
        include: {
            modules: {
                include: {
                    weeks: {
                        include: {
                            topics: true
                        }
                    }
                }
            }
        },
        orderBy: { title: 'asc' }
    })

    // Calculate stats for each course
    const coursesWithStats = courses.map(course => {
        const totalTopics = course.modules.reduce((acc, mod) =>
            acc + mod.weeks.reduce((weekAcc, week) => weekAcc + week.topics.length, 0), 0
        )
        const totalModules = course.modules.length
        return { ...course, totalTopics, totalModules }
    })

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Catálogo de Cursos
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl">
                            Explora nuestros cursos interactivos del área de Investigación de
                            Operaciones y Estadística. Aprende con Python, visualizaciones
                            dinámicas y ejercicios prácticos.
                        </p>
                    </div>
                </section>

                {/* Course Grid */}
                <section className="py-12 bg-slate-50 dark:bg-slate-900">
                    <div className="container mx-auto px-4">
                        {coursesWithStats.length === 0 ? (
                            <div className="text-center py-20">
                                <BookOpen className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                                <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-400">
                                    No hay cursos disponibles aún
                                </h2>
                                <p className="text-slate-500 mt-2">
                                    Pronto agregaremos contenido. ¡Vuelve pronto!
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {coursesWithStats.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/courses/${course.slug}`}
                                        className="group"
                                    >
                                        <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:-translate-y-1">
                                            {/* Card Header */}
                                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6">
                                                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full mb-3">
                                                    {course.code}
                                                </span>
                                                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {course.title}
                                                </h2>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-6">
                                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                {/* Stats */}
                                                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4" />
                                                        <span>{course.totalModules} unidades</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{course.totalTopics} lecciones</span>
                                                    </div>
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                                                    <span>Comenzar curso</span>
                                                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-12 bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            ¿Cómo funcionan nuestros cursos?
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📖</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Lee la teoría</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Contenido explicado con ejemplos reales y fórmulas claras.
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🐍</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Practica con Python</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Laboratorios ejecutables directamente en tu navegador.
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Evalúa tu aprendizaje</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Quizzes al final de cada lección con feedback inmediato.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8">
                <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                    Universidad Tecnológica de Pereira - Ingeniería Industrial
                </div>
            </footer>
        </div>
    )
}
