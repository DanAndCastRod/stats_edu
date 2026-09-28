import {
    HelpCircle,
    BookOpen,
    Sliders,
    Terminal,
    CheckCircle2,
    ArrowRight
} from "lucide-react"
import Link from "next/link"

const STEPS = [
    {
        step: "01",
        title: "Selecciona tu Asignatura",
        desc: "Ingresa a Estadística I (II4D3), Estadística II (II5A3), IO I (II7D3) o IO II (II8B3) según tu avance en la malla curricular."
    },
    {
        step: "02",
        title: "Revisa la Fundamentación Teórica",
        desc: "Estudia las definiciones rigurosas y deducciones matemáticas formateadas con precisión tipográfica KaTeX."
    },
    {
        step: "03",
        title: "Manipula Parámetros en Tiempo Real",
        desc: "Utiliza los controles deslizantes para observar cómo cambian las distribuciones, tablas simplex y curvas operativas."
    },
    {
        step: "04",
        title: "Ejecuta Python en tu Navegador",
        desc: "Experimenta con scripts reales de NumPy y SciPy mediante Pyodide WebAssembly sin instalaciones complejas."
    },
    {
        step: "05",
        title: "Resuelve la Evaluación Formativa",
        desc: "Pon a prueba tu criterio analítico con quizzes que explican detalladamente la validez de cada alternativa."
    }
]

export function StudentGuideSection() {
    return (
        <section id="guia-estudiante" className="py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-3">
                        <HelpCircle className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        Guía de Uso Académico
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        ¿Cómo Estudiar en la Plataforma?
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        Un itinerario pedagógico diseñado para maximizar la apropiación de conceptos y el rigor analítico durante el semestre académico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
                    {STEPS.map((s, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                        >
                            <div>
                                <span className="font-mono text-2xl font-black text-blue-900 dark:text-blue-400">
                                    {s.step}
                                </span>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-3 mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white px-7 py-3 text-sm font-bold shadow-xs transition-all active:scale-95"
                    >
                        <span>Comenzar a Estudiar Ahora</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
