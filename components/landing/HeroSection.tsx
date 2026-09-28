"use client"

import { useState } from "react"
import Link from "next/link"
import {
    GraduationCap,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    BookOpen,
    Cpu,
    Building2,
    LayoutDashboard,
    Layers,
    Binary,
    Network,
    Sigma
} from "lucide-react"

export function HeroSection() {
    const [pathway, setPathway] = useState<"undergraduate" | "graduate">("undergraduate")

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-200 dark:border-slate-800 transition-colors">
            {/* Subtle Engineering Grid Backdrop */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `radial-gradient(#1E3A8A 1px, transparent 1px)`,
                    backgroundSize: "24px 24px"
                }}
            />

            <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                {/* Academic Institution Crest & Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/80 px-4 py-1.5 text-xs font-semibold text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs">
                        <Building2 className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        <span>Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <GraduationCap className="h-3.5 w-3.5 text-indigo-700 dark:text-indigo-400" />
                        <span>Área de Investigación de Operaciones y Estadística • Lab GEIO</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <Cpu className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Pyodide WebAssembly • Cómputo Científico</span>
                    </div>
                </div>

                {/* Main Academic Title */}
                <div className="text-center max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                        Cátedra Digital de Estadística e <br className="hidden sm:inline" />
                        <span className="text-blue-900 dark:text-blue-400">
                            Investigación de Operaciones
                        </span>
                    </h1>
                    <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
                        Ambiente formativo y computacional de la Facultad de Ingeniería Industrial para la modelación matemática rigurosa, simulación estocástica y optimización analítica aplicada a la toma de decisiones en ingeniería.
                    </p>
                </div>

                {/* Academic Pathway Selector (Pregrado vs Posgrado) */}
                <div className="max-w-2xl mx-auto mb-10 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex">
                    <button
                        type="button"
                        onClick={() => setPathway("undergraduate")}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            pathway === "undergraduate"
                                ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm border border-slate-200 dark:border-slate-700"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                        <Layers className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                        <span>Pregrado: Ingeniería Industrial</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setPathway("graduate")}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            pathway === "graduate"
                                ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm border border-slate-200 dark:border-slate-700"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                        <GraduationCap className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                        <span>Posgrado: Maestría en IO y Estadística</span>
                    </button>
                </div>

                {/* Pathway Info Callout */}
                <div className="max-w-4xl mx-auto mb-12 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                    {pathway === "undergraduate" ? (
                        <div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400">
                                        Ruta Curricular Troncal • Pregrado
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        Ciclo Básico y Profesional en Ingeniería Industrial
                                    </h3>
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                    4 Cursos Implementados al 100%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-mono font-bold text-blue-900 dark:text-blue-400 text-[11px]">II4D3</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">Estadística I</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">4° Semestre • 3 Créditos</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-mono font-bold text-indigo-900 dark:text-indigo-400 text-[11px]">II5A3</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">Estadística II</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">5° Semestre • 3 Créditos</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-mono font-bold text-sky-900 dark:text-sky-400 text-[11px]">II7D3</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">Inv. de Operaciones I</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">7° Semestre • 3 Créditos</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-mono font-bold text-emerald-900 dark:text-emerald-400 text-[11px]">II8B3</div>
                                    <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">Inv. de Operaciones II</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">8° Semestre • 3 Créditos</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                                        Programa de Posgrado Avanzado
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                        Maestría en Investigación Operativa y Estadística
                                    </h3>
                                </div>
                                <span className="inline-flex items-center text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                                    Formación Científica & Investigación
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">Diseño de Experimentos</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">Modelos lineales & ANOVA</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">Prog. Lineal Avanzada</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">Dualidad, Poliedros & Redes</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">Análisis Multivariado</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">PCA, Cluster & Manova</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                    <div className="font-bold text-slate-800 dark:text-slate-200">Metaheurísticas & DEA</div>
                                    <div className="text-slate-500 text-[11px] mt-0.5">Algoritmos genéticos & eficiencia</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <Link
                        href="/courses"
                        className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-blue-900 hover:bg-blue-800 px-8 text-sm sm:text-base font-bold text-white transition-all shadow-md shadow-blue-900/20 active:scale-95 group border border-blue-900"
                    >
                        <span>Explorar Asignaturas Oficiales</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/#curriculo"
                        className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-7 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs active:scale-95"
                    >
                        <span>Estructura Curricular</span>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 px-7 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white transition-all shadow-xs active:scale-95 flex items-center gap-2"
                    >
                        <LayoutDashboard className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                        <span>Mi Progreso</span>
                    </Link>
                </div>

                {/* Academic Metrics Grid (Light Mode First) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-400">4</span>
                        <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1">
                            Cursos Oficiales
                        </span>
                        <span className="font-mono text-[11px] text-slate-500 mt-0.5">II4D3 • II5A3 • II7D3 • II8B3</span>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 dark:text-indigo-400">58</span>
                        <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1">
                            Lecciones MDX
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">22 módulos curriculares</span>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">100%</span>
                        <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1">
                            Client-Side Wasm
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">NumPy & SciPy en navegador</span>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">UTP</span>
                        <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold mt-1">
                            Ingeniería Industrial
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">Pereira, Risaralda</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
