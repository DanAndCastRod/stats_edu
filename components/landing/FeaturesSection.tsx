import {
    Code2,
    LineChart,
    CheckCircle2,
    Zap,
    Cpu,
    Sparkles,
    ArrowUpRight,
    Terminal,
    Layers,
    Sliders
} from "lucide-react"
import Link from "next/link"

const features = [
    {
        icon: Terminal,
        badge: "WebAssembly • Pyodide",
        badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-900",
        gradient: "from-blue-600 to-indigo-600",
        glow: "group-hover:shadow-blue-500/20",
        title: "Python Interactivo en el Navegador",
        description: "Ejecuta scripts científicos reales con NumPy, SciPy y Pandas sin instalar nada localmente. La computación ocurre 100% en tu navegador gracias a WebAssembly y Pyodide.",
        highlights: [
            "Sin dependencias locales ni servidores externos",
            "Soporte de álgebra lineal y distribuciones continuas",
            "Ejecución en milisegundos con feedback inmediato"
        ]
    },
    {
        icon: Sliders,
        badge: "Recharts & D3.js",
        badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-900",
        gradient: "from-amber-500 to-orange-600",
        glow: "group-hover:shadow-amber-500/20",
        title: "Visualizadores Dinámicos en Tiempo Real",
        description: "Manipula parámetros mediante controles deslizantes reactivos. Observa al instante cómo cambian las campanas gaussianas, las regiones factibles del simplex y las líneas de espera.",
        highlights: [
            "Sliders interactivos para μ, σ, grados de libertad y λ",
            "Geometría de programación lineal y dualidad en 2D",
            "Gráficos de control estadístico SPC y dispersión"
        ]
    },
    {
        icon: CheckCircle2,
        badge: "Evaluación Formativa",
        badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
        gradient: "from-emerald-500 to-teal-600",
        glow: "group-hover:shadow-emerald-500/20",
        title: "Quizzes con Feedback Inmediato",
        description: "Aprende de cada intento con evaluaciones formativas integradas al final de cada lección. Explicaciones conceptuales paso a paso de cada alternativa y persistencia de avance.",
        highlights: [
            "Explicación didáctica de errores comunes",
            "Ejercicios teóricos y cálculos numéricos aplicados",
            "Métricas de progreso por competencia académica"
        ]
    },
    {
        icon: Zap,
        badge: "Cero Latencia • PWA",
        badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-900",
        gradient: "from-purple-600 to-pink-600",
        glow: "group-hover:shadow-purple-500/20",
        title: "Aprendizaje sin Barreras ni Dependencias",
        description: "Arquitectura estática de alto rendimiento optimizada para la vida universitaria. Accede desde cualquier laptop o smartphone sin lentitud, cortes ni configuraciones previas.",
        highlights: [
            "Formulas matemáticas de alta fidelidad con KaTeX",
            "Diagramas de flujo y grafos con Mermaid",
            "Compatible con exportación estática y modo offline"
        ]
    }
]

export function FeaturesSection() {
    return (
        <section id="metodologia" className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        Metodología Activa de Ingeniería
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                        Aprende experimentando, <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            no memorizando fórmulas
                        </span>
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        Transformamos la enseñanza tradicional en un laboratorio analítico inmersivo donde cada ecuación matemática se programa, se simula y se analiza con rigor de ingeniería industrial.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={`group relative bg-white dark:bg-slate-900/90 p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 ${feature.glow}`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-md shadow-slate-950/10 group-hover:scale-105 transition-transform`}>
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${feature.badgeColor}`}>
                                        {feature.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                {/* Highlights list */}
                                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                                    {feature.highlights.map((item, hIdx) => (
                                        <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Callout Banner */}
                <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-amber-900/10 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-amber-950/50 border border-blue-200/60 dark:border-blue-900/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
                            ¿Listo para poner a prueba tus modelos analíticos?
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            Accede libremente a todo el catálogo de lecciones interactivas sin registro previo obligatorio.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all active:scale-95"
                    >
                        <span>Explorar Catálogo</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
