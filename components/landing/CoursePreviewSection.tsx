import { getAllCourses } from "@/lib/courses"
import Link from "next/link"
import {
    ArrowRight,
    BookOpen,
    Layers,
    Clock,
    CheckCircle2,
    GraduationCap,
    Sparkles,
    Building2,
    FlaskConical
} from "lucide-react"

interface CourseAcademicMetadata {
    officialCode: string
    semester: string
    credits: number
    ects: number
    coordinator: string
    thematicUnits: string[]
    borderAccent: string
    codeBadgeStyle: string
}

const ACADEMIC_METADATA_MAP: Record<string, CourseAcademicMetadata> = {
    "estadistica-i": {
        officialCode: "II4D3",
        semester: "4° Semestre",
        credits: 3,
        ects: 6,
        coordinator: "Área de Inv. de Operaciones y Estadística",
        thematicUnits: [
            "Estadística Descriptiva y Análisis Exploratorio de Datos",
            "Axiomática de Probabilidad y Probabilidad Condicional",
            "Variables Aleatorias Discretas y Continuas",
            "Distribuciones Notables (Binomial, Poisson, Normal, Exponencial)"
        ],
        borderAccent: "border-t-blue-800",
        codeBadgeStyle: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
    },
    "estadistica-ii": {
        officialCode: "II5A3",
        semester: "5° Semestre",
        credits: 3,
        ects: 6,
        coordinator: "Área de Inv. de Operaciones y Estadística",
        thematicUnits: [
            "Distribuciones Muestrales y Teorema del Límite Central",
            "Estimación Puntual y por Intervalos de Confianza",
            "Pruebas de Hipótesis Paramétricas y No Paramétricas",
            "Análisis de Varianza (ANOVA) y Control Estadístico (SPC)"
        ],
        borderAccent: "border-t-indigo-800",
        codeBadgeStyle: "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800"
    },
    "investigacion-operaciones-i": {
        officialCode: "II7D3",
        semester: "7° Semestre",
        credits: 3,
        ects: 6,
        coordinator: "Área de Inv. de Operaciones y Estadística",
        thematicUnits: [
            "Formulación de Modelos Matemáticos y Método Gráfico",
            "Algoritmo Simplex Primal y Método de las Dos Fases",
            "Teoría de la Dualidad y Análisis de Sensibilidad Económica",
            "Modelos de Transporte, Asignación y Optimización de Redes"
        ],
        borderAccent: "border-t-sky-800",
        codeBadgeStyle: "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800"
    },
    "investigacion-operaciones-ii": {
        officialCode: "II8B3",
        semester: "8° Semestre",
        credits: 3,
        ects: 6,
        coordinator: "Área de Inv. de Operaciones y Estadística",
        thematicUnits: [
            "Programación Dinámica Determinística y Probabilística",
            "Cadenas de Markov y Procesos Estocásticos Discretos",
            "Teoría de Líneas de Espera (Colas M/M/1 y M/M/s)",
            "Modelos Probabilísticos de Inventarios y Teoría de Juegos"
        ],
        borderAccent: "border-t-emerald-800",
        codeBadgeStyle: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
    }
}

export async function CoursePreviewSection() {
    const allCourses = await getAllCourses()

    const courses = allCourses.map((c) => {
        let lessonsCount = 0
        c.modules.forEach((m) => {
            m.weeks.forEach((w) => {
                lessonsCount += w.topics.length
            })
        })

        const meta = ACADEMIC_METADATA_MAP[c.slug] || {
            officialCode: c.code || "II000",
            semester: "Semestre Oficial",
            credits: 3,
            ects: 6,
            coordinator: "Facultad de Ingeniería Industrial",
            thematicUnits: ["Unidades temáticas según syllabus oficial UTP"],
            borderAccent: "border-t-blue-800",
            codeBadgeStyle: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
        }

        return {
            id: c.id,
            title: c.title.replace("[TEST]", "").trim(),
            slug: c.slug,
            description: c.description,
            modulesCount: c.modules.length,
            lessonsCount,
            officialCode: meta.officialCode,
            semester: meta.semester,
            credits: meta.credits,
            ects: meta.ects,
            coordinator: meta.coordinator,
            thematicUnits: meta.thematicUnits,
            borderAccent: meta.borderAccent,
            codeBadgeStyle: meta.codeBadgeStyle
        }
    })

    return (
        <section id="asignaturas" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-3">
                            <BookOpen className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                            Catálogo Curricular de Pregrado • UTP
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Asignaturas Oficiales de Pregrado
                        </h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl leading-relaxed">
                            Cátedras universitarias estructuradas con módulos teóricos rigurosos, cuadernos interactivos de Python Wasm y evaluaciones diagnósticas inmediatas.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 font-bold text-sm text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group self-start md:self-end"
                    >
                        <span>Ver todas las lecciones ({courses.reduce((acc, c) => acc + c.lessonsCount, 0)})</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* 2x2 Grid of Course Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className={`p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all border-t-4 ${course.borderAccent} flex flex-col justify-between`}
                        >
                            <div>
                                {/* Top Badges */}
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-lg border ${course.codeBadgeStyle}`}>
                                        Código UTP: {course.officialCode}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                            {course.semester}
                                        </span>
                                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                            {course.credits} Créditos ({course.ects} ECTS)
                                        </span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {course.title}
                                </h3>

                                {/* Coordinator and Area */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{course.coordinator} • Lab GEIO</span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-5 leading-relaxed">
                                    {course.description}
                                </p>

                                {/* Thematic Units */}
                                <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                        Ejes Temáticos Principales:
                                    </div>
                                    <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                                        {course.thematicUnits.map((unit, uIdx) => (
                                            <li key={uIdx} className="flex items-start gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-900 dark:bg-blue-400 shrink-0 mt-1.5" />
                                                <span className="leading-snug">{unit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Modules & Lessons counts */}
                                <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400 pb-5 mb-5 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                                        <Layers className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                                        <span>{course.modulesCount} Módulos</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                                        <BookOpen className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                                        <span>{course.lessonsCount} Lecciones Interactivas</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>Pyodide Wasm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Entrance Button */}
                            <Link
                                href={`/courses/${course.slug}`}
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white py-3.5 text-sm font-bold shadow-xs transition-all active:scale-95 group"
                            >
                                <span>Ingresar a {course.title} ({course.officialCode})</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
