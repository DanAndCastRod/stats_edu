import { Code2, LineChart, GraduationCap, Zap } from "lucide-react"

const features = [
    {
        icon: LineChart,
        title: "Visualización de Datos",
        description: "Olvídate de las tablas estáticas. Manipula gráficos dinámicos para entender distribuciones y tendencias instintivamente."
    },
    {
        icon: Code2,
        title: "Playgrounds de Código",
        description: "Escribe y ejecuta scripts de Python (NumPy, Pandas) directamente en el navegador sin instalar nada."
    },
    {
        icon: GraduationCap,
        title: "Ruta Académica Clara",
        description: "Contenido alineado 100% con el currículo de Ingeniería Industrial de la UTP, semana a semana."
    },
    {
        icon: Zap,
        title: "Feedback Inmediato",
        description: "Resuelve quises y ejercicios prácticos con retroalimentación instantánea y explicaciones detalladas."
    }
]

export function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Todo lo que necesitas para aprobar
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Hemos transformado los PDFs aburridos en una experiencia digital moderna.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-brand-blue mb-4">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
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
