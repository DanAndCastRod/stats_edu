import Link from "next/link"
import {
    GraduationCap,
    ArrowRight,
    Award,
    Sparkles,
    CheckCircle2,
    FlaskConical,
    FileText
} from "lucide-react"

export function GraduateProgramBanner() {
    return (
        <section id="posgrado" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-xl border border-blue-800/40">
                    {/* Background academic watermark */}
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
                        <GraduationCap className="h-96 w-96 text-white" />
                    </div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-md border border-white/15 mb-6">
                            <Award className="h-4 w-4 text-blue-300" />
                            <span>Formación Posgradual de Excelencia • UTP</span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                            Maestría en Investigación Operativa y Estadística
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
                            Programa de posgrado adscrito a la Facultad de Ingeniería Industrial enfocado en la investigación aplicada, el desarrollo de algoritmos de optimización combinatoria, análisis envolvente de datos (DEA), modelos de regresión multivariados y dinámica de sistemas.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-xs font-medium text-slate-200">
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                                <div className="font-bold text-white text-sm">DEA</div>
                                <div className="text-slate-300 text-[11px] mt-0.5">Análisis Envolvente de Datos</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                                <div className="font-bold text-white text-sm">Metaheurísticas</div>
                                <div className="text-slate-300 text-[11px] mt-0.5">Algoritmos Genéticos & PSO</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                                <div className="font-bold text-white text-sm">Prog. No Lineal</div>
                                <div className="text-slate-300 text-[11px] mt-0.5">Optimización Convexa & KKT</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                                <div className="font-bold text-white text-sm">Multivariado</div>
                                <div className="text-slate-300 text-[11px] mt-0.5">PCA, Cluster & MANOVA</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/#curriculo"
                                className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl bg-white text-blue-950 hover:bg-slate-100 px-6 text-sm font-bold shadow-md transition-all active:scale-95"
                            >
                                <span>Ver Asignaturas de Maestría</span>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>

                            <a
                                href="https://industrial.utp.edu.co"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 hover:bg-white/15 px-6 text-sm font-semibold text-white transition-all backdrop-blur-md"
                            >
                                <FlaskConical className="mr-2 h-4 w-4 text-blue-300" />
                                <span>Facultad de Ingeniería Industrial</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
