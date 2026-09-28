import { getAllCourses } from "@/lib/courses"
import Link from "next/link"
import { ArrowRight, BookOpen, Layers, Clock, Sparkles, CheckCircle2 } from "lucide-react"

interface CourseMetadataDisplay {
    code: string
    semesterBadge: string
    tags: string[]
    accentGradient: string
    codeBadgeStyle: string
}

const COURSE_METADATA_MAP: Record<string, CourseMetadataDisplay> = {
    "estadistica-i": {
        code: "511-23",
        semesterBadge: "Semestre III",
        tags: ["Descriptiva", "Axiomas de Probabilidad", "Variables Aleatorias", "Distribuciones Continuas", "Teorema de Bayes"],
        accentGradient: "from-blue-600 via-sky-500 to-indigo-600",
        codeBadgeStyle: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800"
    },
    "estadistica-ii": {
        code: "511-24",
        semesterBadge: "Semestre IV",
        tags: ["Inferencia", "Pruebas de Hipótesis", "ANOVA & DOE", "Regresión Múltiple", "Control SPC"],
        accentGradient: "from-indigo-600 via-purple-500 to-pink-600",
        codeBadgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border-indigo-800"
    },
    "investigacion-operaciones-i": {
        code: "511-31",
        semesterBadge: "Semestre V",
        tags: ["Programación Lineal", "Método Simplex", "Dualidad & Sensibilidad", "Modelos de Transporte", "Redes PERT/CPM"],
        accentGradient: "from-amber-500 via-orange-500 to-rose-500",
        codeBadgeStyle: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800"
    },
    "investigacion-operaciones-ii": {
        code: "511-32",
        semesterBadge: "Semestre VI",
        tags: ["Cadenas de Markov", "Teoría de Colas M/M/s", "Modelos de Inventarios", "Teoría de Juegos", "Simulación Monte Carlo"],
        accentGradient: "from-emerald-600 via-teal-500 to-cyan-600",
        codeBadgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800"
    }
}

export async function CoursePreviewSection() {
    const allCourses = await getAllCourses()

    // Filter and map courses
    const courses = allCourses.map(c => {
        let lessonsCount = 0
        c.modules.forEach(m => {
            m.weeks.forEach(w => {
                lessonsCount += w.topics.length
            })
        })

        const meta = COURSE_METADATA_MAP[c.slug] || {
            code: c.code,
            semesterBadge: "Asignatura Oficial",
            tags: ["Ingeniería Industrial", "UTP"],
            accentGradient: "from-blue-600 to-indigo-600",
            codeBadgeStyle: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800"
        }

        return {
            id: c.id,
            title: c.title.replace('[TEST]', ''),
            code: meta.code || c.code,
            slug: c.slug,
            description: c.description,
            modulesCount: c.modules.length,
            lessonsCount,
            semesterBadge: meta.semesterBadge,
            tags: meta.tags,
            accentGradient: meta.accentGradient,
            codeBadgeStyle: meta.codeBadgeStyle
        }
    })

    return (
        <section id="courses" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 max-w-6xl mx-auto">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-xs font-bold text-blue-700 dark:text-blue-300 mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Plan de Estudios Oficial • UTP
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Asignaturas Universitarias
                        </h2>
                        <p className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Cuatro asignaturas troncales con rigor matemático, más de 58 lecciones interactivas, laboratorios de Python y simulaciones gráficas.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 font-bold text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group transition-colors self-start md:self-end"
                    >
                        <span>Ver catálogo completo</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Courses 2x2 Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1"
                        >
                            {/* Card Accent Top Banner */}
                            <div className={`h-2.5 w-full bg-gradient-to-r ${course.accentGradient}`} />

                            <div className="p-7 sm:p-8 flex flex-col flex-1">
                                {/* Badges Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className={`inline-flex items-center font-mono font-bold text-xs px-3 py-1 rounded-lg border ${course.codeBadgeStyle}`}>
                                        Código: {course.code}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                        <span>{course.semesterBadge}</span>
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {course.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-5 leading-relaxed flex-1">
                                    {course.description || "Curso interactivo con teoría aplicada, visualizaciones gráficas y laboratorios de código."}
                                </p>

                                {/* Thematic Tags */}
                                <div className="mb-6">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Ejes Temáticos Clave
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {course.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats Info */}
                                <div className="flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                                        <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span>{course.modulesCount} Módulos</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                                        <BookOpen className="h-4 w-4 text-amber-500" />
                                        <span>{course.lessonsCount} Lecciones</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Clock className="h-4 w-4 text-emerald-500" />
                                        <span>Ritmo propio</span>
                                    </div>
                                </div>

                                {/* Direct CTA Button */}
                                <Link
                                    href={`/courses/${course.slug}`}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-blue-600 dark:bg-slate-100 dark:hover:bg-blue-600 text-white dark:text-slate-900 dark:hover:text-white py-3.5 text-sm font-bold transition-all shadow-md group/btn"
                                >
                                    <span>Acceder a la Asignatura</span>
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
