import {
    Binary,
    Terminal,
    LineChart,
    CheckCircle2,
    BookOpen,
    Cpu,
    ArrowUpRight,
    Sigma,
    Sliders,
    Layers,
    Sparkles
} from "lucide-react"
import Link from "next/link"

const PEDAGOGICAL_PILLARS = [
    {
        icon: Sigma,
        badge: "Fundamentación Matemática",
        badgeColor: "bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-900 text-white",
        title: "Modelado Matemático Riguroso",
        description: "Cada concepto se estructura desde sus axiomas teóricos y notación formal en KaTeX: espacios muestrales, variables aleatorias, regiones de factibilidad poliedral y condiciones de optimalidad KKT.",
        competencies: [
            "Notación matemática estándar internacional",
            "Deducción analítica de propiedades y teoremas",
            "Formulación estricta de funciones objetivo y restricciones"
        ]
    },
    {
        icon: Terminal,
        badge: "Computación Científica",
        badgeColor: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        iconBg: "bg-emerald-800 text-white",
        title: "Python Científico en el Navegador",
        description: "Entorno interactivo con Pyodide WebAssembly. Los estudiantes ejecutan algoritmos de optimización y pruebas de hipótesis directamente con NumPy, SciPy y Pandas sin instalar software adicional.",
        competencies: [
            "Ejecución client-side en milisegundos sin latencia de red",
            "Resolución de modelos lineales con el solver HiGHS",
            "Simulación estocástica y cálculo de probabilidades exactas"
        ]
    },
    {
        icon: Sliders,
        badge: "Simulación & Sensibilidad",
        badgeColor: "bg-sky-50 text-sky-900 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
        iconBg: "bg-sky-800 text-white",
        title: "Visualización Paramétrica Dinámica",
        description: "Manipulación visual reactiva mediante gráficos científicos con Recharts y D3. Permite explorar cómo varían las regiones factibles, las densidades de probabilidad y las líneas de espera al alterar parámetros clave.",
        competencies: [
            "Comprensión intuitiva del análisis de sensibilidad",
            "Exploración de colas M/M/s y cadenas de Markov",
            "Gráficos de control estadístico de procesos (SPC)"
        ]
    },
    {
        icon: CheckCircle2,
        badge: "Didáctica Formativa",
        badgeColor: "bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
        iconBg: "bg-indigo-900 text-white",
        title: "Evaluación Formativa y Retroalimentación",
        description: "Cuestionarios al cierre de cada lección con explicaciones conceptuales y matemáticas detalladas para cada alternativa. Los estudiantes consolidan su criterio ingenieril aprendiendo del error reflexivo.",
        competencies: [
            "Retroalimentación inmediata paso a paso",
            "Medición de avance basada en competencias",
            "Persistencia local de progreso sin requerir servidor"
        ]
    }
]

export function FeaturesSection() {
    return (
        <section id="metodologia" className="py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        Modelo Pedagógico de Ingeniería
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Metodología de Aprendizaje Activo
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        Integramos la fundamentación teórica, la programación computacional y el análisis gráfico interactivo para desarrollar competencias analíticas de orden superior en los futuros ingenieros industriales.
                    </p>
                </div>

                {/* Grid of Pedagogical Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                    {PEDAGOGICAL_PILLARS.map((pillar, index) => {
                        const Icon = pillar.icon
                        return (
                            <div
                                key={index}
                                className="p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className={`h-12 w-12 rounded-xl ${pillar.iconBg} flex items-center justify-center shadow-xs`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${pillar.badgeColor}`}>
                                            {pillar.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                        {pillar.description}
                                    </p>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        Resultados de Aprendizaje:
                                    </div>
                                    {pillar.competencies.map((item, cIdx) => (
                                        <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-900 dark:bg-blue-400 shrink-0 mt-1.5" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Academic Callout Banner */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-1">
                            Compromiso Formativo UTP
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            Formación con rigor científico y aplicación industrial directa
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                            Diseñado de acuerdo con el currículo del Área de Investigación de Operaciones y Estadística de la Facultad de Ingeniería Industrial para el desarrollo de competencias de modelamiento y optimización.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
                    >
                        <span>Explorar Contenidos</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
