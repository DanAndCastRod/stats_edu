"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Compass,
    GraduationCap,
    CheckCircle2,
    Clock,
    ArrowRight,
    BookOpen,
    Layers,
    Award,
    Network
} from "lucide-react"

interface UndergraduateCourse {
    code: string
    title: string
    semester: string
    credits: number
    ects: number
    type: "Obligatoria Troncal" | "Electiva / Profundización"
    slug?: string
    available: boolean
    topics: string[]
    prerequisites: string
}

const UNDERGRADUATE_COURSES: UndergraduateCourse[] = [
    {
        code: "II4D3",
        title: "Estadística I",
        semester: "4° Semestre",
        credits: 3,
        ects: 6,
        type: "Obligatoria Troncal",
        slug: "estadistica-i",
        available: true,
        topics: ["Estadística Descriptiva", "Axiomas de Probabilidad", "Variables Aleatorias Discretas y Continuas", "Distribuciones de Probabilidad Especiales", "Teorema de Bayes"],
        prerequisites: "Matemáticas II (Álgebra Lineal & Cálculo)"
    },
    {
        code: "II5A3",
        title: "Estadística II",
        semester: "5° Semestre",
        credits: 3,
        ects: 6,
        type: "Obligatoria Troncal",
        slug: "estadistica-ii",
        available: true,
        topics: ["Distribuciones Muestrales", "Estimación Puntual y por Intervalos", "Pruebas de Hipótesis Paramétricas", "Análisis de Varianza (ANOVA)", "Regresión Lineal Simple y Múltiple", "Control Estadístico de Procesos (SPC)"],
        prerequisites: "Estadística I (II4D3)"
    },
    {
        code: "II6A2",
        title: "Estadística III",
        semester: "6° Semestre",
        credits: 2,
        ects: 4,
        type: "Obligatoria Troncal",
        available: false,
        topics: ["Diseño Factorial de Experimentos 2^k", "Superficies de Respuesta", "Pruebas No Paramétricas Avanzadas", "Confiabilidad de Sistemas"],
        prerequisites: "Estadística II (II5A3)"
    },
    {
        code: "II7D3",
        title: "Investigación de Operaciones I",
        semester: "7° Semestre",
        credits: 3,
        ects: 6,
        type: "Obligatoria Troncal",
        slug: "investigacion-operaciones-i",
        available: true,
        topics: ["Modelamiento Matemático Determinístico", "Método Gráfico y Simplex Primal", "Teoría de la Dualidad y Análisis de Sensibilidad", "Modelos de Transporte y Asignación", "Optimización de Redes y PERT/CPM"],
        prerequisites: "Álgebra Lineal & Matemáticas IV"
    },
    {
        code: "II8B3",
        title: "Investigación de Operaciones II",
        semester: "8° Semestre",
        credits: 3,
        ects: 6,
        type: "Obligatoria Troncal",
        slug: "investigacion-operaciones-ii",
        available: true,
        topics: ["Programación Dinámica Determinística y Estocástica", "Cadenas de Markov de Tiempo Discreto y Continuo", "Teoría de Líneas de Espera (Colas M/M/s)", "Modelos Probabilísticos de Inventarios (EOQ, Newsvendor)", "Teoría de Juegos"],
        prerequisites: "Investigación de Operaciones I (II7D3) & Estadística II (II5A3)"
    },
    {
        code: "II713",
        title: "Procesos Estocásticos",
        semester: "7° / 8° Semestre",
        credits: 3,
        ects: 6,
        type: "Electiva / Profundización",
        available: false,
        topics: ["Procesos de Poisson Homogéneos y No Homogéneos", "Procesos de Renovación", "Movimiento Browniano", "Cadenas de Márkov en Tiempo Continuo"],
        prerequisites: "Estadística II (II5A3)"
    },
    {
        code: "II863",
        title: "Simulación de Sistemas",
        semester: "8° Semestre",
        credits: 3,
        ects: 6,
        type: "Obligatoria Troncal",
        available: false,
        topics: ["Generación de Números y Variables Pseudoaleatorias", "Pruebas de Bondad de Ajuste", "Simulación por Eventos Discretos (DES)", "Validación y Análisis de Salidas"],
        prerequisites: "Estadística II (II5A3) & IO I (II7D3)"
    }
]

interface GraduateCourse {
    area: string
    title: string
    semester: string
    credits: number
    description: string
    tools: string[]
}

const GRADUATE_COURSES: GraduateCourse[] = [
    {
        area: "Estadística Aplicada",
        title: "Diseño de Experimentos",
        semester: "Semestre I",
        credits: 3,
        description: "Modelos lineales generalizados, bloques completos al azar, diseños factoriales fraccionados y metodología de superficie de respuesta (RSM).",
        tools: ["R Studio", "Python Statsmodels", "SciPy"]
    },
    {
        area: "Optimización Matemática",
        title: "Programación Lineal Avanzada",
        semester: "Semestre I",
        credits: 3,
        description: "Geometría de poliedros convexos, métodos de descomposición de Benders y Dantzig-Wolfe, métodos de punto interior y optimización de gran escala.",
        tools: ["PuLP", "Gurobi / HiGHS", "JuMP Julia"]
    },
    {
        area: "Ciencia de Datos",
        title: "Análisis Multivariado",
        semester: "Semestre I",
        credits: 3,
        description: "Componentes principales (PCA), análisis factorial exploratorio y confirmatorio, análisis discriminante lineal y agrupamiento (Clustering jerárquico y k-means).",
        tools: ["Scikit-learn", "Pandas", "R Multivar"]
    },
    {
        area: "Modelado Computacional",
        title: "Simulación Dinámica de Sistemas",
        semester: "Semestre I",
        credits: 3,
        description: "Dinámica de sistemas de Forrester, bucles de retroalimentación, diagramas de influencias y modelado de sistemas socioeconómicos complejos.",
        tools: ["Vensim", "Stella", "Python SimPy"]
    },
    {
        area: "Algoritmos Avanzados",
        title: "Metaheurísticas",
        semester: "Semestre II",
        credits: 3,
        description: "Algoritmos genéticos, enfriamiento simulado (Simulated Annealing), búsqueda tabú, optimización por enjambre de partículas (PSO) y colonias de hormigas.",
        tools: ["DEAP Python", "PySwarms", "C++"]
    },
    {
        area: "Optimización Continua",
        title: "Programación No Lineal",
        semester: "Semestre II",
        credits: 3,
        description: "Condiciones de optimalidad Karush-Kuhn-Tucker (KKT), métodos de gradiente descendente, cuasi-Newton (BFGS), programación cuadrática y métodos de barrera.",
        tools: ["SciPy Optimize", "CasADi", "Ipopt"]
    },
    {
        area: "Evaluación de Eficiencia",
        title: "Análisis Envolvente de Datos (DEA)",
        semester: "Semestre II",
        credits: 3,
        description: "Fronteras de eficiencia no paramétricas, modelos CCR (rendimientos constantes) y BCC (rendimientos variables), holguras y benchmarking de unidades de toma de decisión (DMU).",
        tools: ["pyDEA", "R Benchmarking", "Frontier"]
    },
    {
        area: "Ingeniería Financiera",
        title: "Optimización Financiera",
        semester: "Semestre II",
        credits: 3,
        description: "Teoría moderna de portafolios de Markowitz, frontera eficiente, modelo Black-Litterman, Value at Risk (VaR) y optimización con restricciones de riesgo.",
        tools: ["PyPortfolioOpt", "QuantLib", "NumPy"]
    }
]

export function CurriculumSection() {
    const [selectedProgram, setSelectedProgram] = useState<"undergraduate" | "graduate">("undergraduate")

    return (
        <section id="curriculo" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-3">
                        <Compass className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        Planes Curriculares UTP • Área de IO y Estadística
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Estructura Curricular y Programas Académicos
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        Malla formativa oficial de la Facultad de Ingeniería Industrial de la Universidad Tecnológica de Pereira, articulando la formación de pregrado y posgrado en analítica y optimización.
                    </p>
                </div>

                {/* Program Switcher Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex max-w-lg w-full">
                        <button
                            type="button"
                            onClick={() => setSelectedProgram("undergraduate")}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                selectedProgram === "undergraduate"
                                    ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm border border-slate-200 dark:border-slate-700"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <Layers className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                            <span>Pregrado en Ingeniería Industrial</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedProgram("graduate")}
                            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                selectedProgram === "graduate"
                                    ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm border border-slate-200 dark:border-slate-700"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <GraduationCap className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                            <span>Maestría en IO y Estadística</span>
                        </button>
                    </div>
                </div>

                {/* Tab 1: Pregrado */}
                {selectedProgram === "undergraduate" && (
                    <div className="space-y-6">
                        <div className="bg-blue-50/60 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200/80 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                            <div className="text-slate-700 dark:text-slate-300">
                                <span className="font-bold text-blue-900 dark:text-blue-300">Resolución Académica Pregrado:</span> Malla de asignaturas troncales y electivas adscritas al Área de Investigación de Operaciones y Estadística.
                            </div>
                            <span className="font-mono font-bold text-blue-900 dark:text-blue-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800 shrink-0">
                                4 Cursos Habilitados Digitalmente
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {UNDERGRADUATE_COURSES.map((course) => (
                                <div
                                    key={course.code}
                                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                Código: {course.code}
                                            </span>
                                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                {course.semester} • {course.credits} Créditos ({course.ects} ECTS)
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {course.title}
                                        </h3>

                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">Prerrequisitos:</span> {course.prerequisites}
                                        </div>

                                        <div className="space-y-1.5 mb-5">
                                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Unidades Temáticas Oficiales:
                                            </div>
                                            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                                                {course.topics.map((t, idx) => (
                                                    <li key={idx} className="flex items-start gap-1.5">
                                                        <span className="text-blue-700 dark:text-blue-400 shrink-0 font-bold">•</span>
                                                        <span>{t}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        {course.available && course.slug ? (
                                            <Link
                                                href={`/courses/${course.slug}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-400 hover:text-blue-700 group"
                                            >
                                                <span>Ingresar al Aula Virtual</span>
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        ) : (
                                            <span className="text-[11px] font-semibold text-slate-400 italic">
                                                En proceso de integración digital
                                            </span>
                                        )}

                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                            course.available
                                                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                                        }`}>
                                            {course.available ? "Disponible" : "Plan Oficial"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 2: Posgrado (Maestría) */}
                {selectedProgram === "graduate" && (
                    <div className="space-y-6">
                        <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                            <div className="text-slate-700 dark:text-slate-300">
                                <span className="font-bold text-indigo-900 dark:text-indigo-300">Programa Posgradual:</span> Maestría en Investigación Operativa y Estadística — Formación en modelación analítica, frontera de eficiencia y algoritmos de optimización avanzada.
                            </div>
                            <span className="font-mono font-bold text-indigo-900 dark:text-indigo-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800 shrink-0">
                                Nivel de Maestría Científica
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {GRADUATE_COURSES.map((course, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between text-[11px] mb-2.5">
                                            <span className="font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                                                {course.area}
                                            </span>
                                            <span className="text-slate-400 font-medium">
                                                {course.semester}
                                            </span>
                                        </div>

                                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                                            {course.title}
                                        </h4>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                            Herramientas & Lenguajes:
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {course.tools.map((tool, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
