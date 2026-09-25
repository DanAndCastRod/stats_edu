import { Code2, LineChart, GraduationCap, Zap, Database, Cpu, Compass, Award } from "lucide-react"

const features = [
    {
        icon: LineChart,
        gradient: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50 dark:bg-blue-950/40",
        title: "Visualización Interactiva",
        description: "Manipula parámetros en tiempo real con sliders dinámicos: campanas de Gauss, distribuciones continuas, pruebas de hipótesis y árboles de probabilidad."
    },
    {
        icon: Code2,
        gradient: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50 dark:bg-amber-950/40",
        title: "Laboratorios Python WebAssembly",
        description: "Ejecuta scripts con NumPy, SciPy y Pandas en tu navegador sin instalar nada localmente, potenciado por Pyodide."
    },
    {
        icon: GraduationCap,
        gradient: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
        title: "Currículo Académico Riguroso",
        description: "Alineado con el plan de estudios del Departamento de Ingeniería Industrial de la UTP, estructurado semana a semana con objetivos de aprendizaje."
    },
    {
        icon: Zap,
        gradient: "from-purple-500 to-pink-600",
        bgLight: "bg-purple-50 dark:bg-purple-950/40",
        title: "Evaluación con Persistencia",
        description: "Quizzes interactivos paso a paso con retroalimentación instantánea, explicaciones de error y almacenamiento de progreso en la base de datos."
    }
]

export function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-100/70 dark:bg-blue-950/80 px-3 py-1 rounded-full">
                        Metodología Activa
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Aprende experimentando, no memorizando
                    </h2>
                    <p className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-400">
                        Dejamos atrás las diapositivas estáticas para ofrecer una experiencia analítica inmersiva basada en datos reales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5"
                        >
                            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform`}>
                                <feature.icon size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
