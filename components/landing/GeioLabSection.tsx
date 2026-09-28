import {
    FlaskConical,
    Building2,
    Users,
    Network,
    Cpu,
    CheckCircle2,
    ArrowUpRight
} from "lucide-react"

export function GeioLabSection() {
    return (
        <section id="laboratorio-geio" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left text column */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                            <FlaskConical className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                            Laboratorio GEIO • UTP
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Laboratorio de Gestión de la Producción e Investigación de Operaciones
                        </h2>

                        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                            Espacio académico y de investigación adscrito a la Facultad de Ingeniería Industrial de la Universidad Tecnológica de Pereira. El Laboratorio GEIO articula la teoría analítica con el desarrollo computacional y la solución de problemas productivos de la región cafetera y del país.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                    <Cpu className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                                    Optimización de Procesos
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                                    Modelamiento determinístico y estocástico para la programación de producción y diseño de redes de abastecimiento.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                    <Network className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                    Simulación y Colas
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                                    Análisis de congestión, líneas de espera y eventos discretos aplicados a sistemas de manufactura y servicios.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Ubicación:</span>
                            <span>Edificio 5, Laboratorios de Ingeniería Industrial — Campus La Julita, Pereira.</span>
                        </div>
                    </div>

                    {/* Right Info Box */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Ficha Técnica del Área
                                </div>
                                <span className="font-mono text-xs font-bold text-blue-900 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950 px-2 py-0.5 rounded">
                                    GEIO - UTP
                                </span>
                            </div>

                            <ul className="space-y-4 text-xs">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Soporte a la Docencia de Pregrado</div>
                                        <div className="text-slate-500">Prácticas de laboratorio en Estadística I, II, IO I e IO II.</div>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Proyectos de Grado y Posgrado</div>
                                        <div className="text-slate-500">Dirección de tesis en la Maestría de IO y Estadística.</div>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Software y Computación Científica</div>
                                        <div className="text-slate-500">Herramientas libres basadas en Python (NumPy, SciPy, PuLP, SimPy) y R.</div>
                                    </div>
                                </li>
                            </ul>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <a
                                    href="https://industrial.utp.edu.co"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-blue-900 text-white dark:text-slate-900 dark:hover:text-white py-3 text-xs font-bold transition-all"
                                >
                                    <span>Sitio de la Facultad de Ingeniería Industrial</span>
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
