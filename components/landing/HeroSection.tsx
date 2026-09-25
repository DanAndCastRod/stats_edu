import Link from "next/link"
import { ArrowRight, Sparkles, Terminal, BarChart3, GraduationCap, CheckCircle } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-slate-950 pt-20 pb-28 md:pt-32 md:pb-40 text-white">
            {/* Background lighting & mesh */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute -top-36 -left-36 h-[500px] w-[500px] rounded-full bg-blue-600 blur-[130px]" />
                <div className="absolute top-1/3 -right-36 h-[450px] w-[450px] rounded-full bg-amber-500/80 blur-[130px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-indigo-600/40 blur-[140px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                {/* Academic Affiliation Pill */}
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-md border border-slate-800 mb-8 shadow-inner">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <span className="tracking-wide uppercase text-[11px] font-bold">
                        Facultad de Ingeniería Industrial • UTP
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15]">
                    Aprende Estadística e <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                        Investigación de Operaciones
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-300 mb-10 font-normal leading-relaxed">
                    Plataforma universitaria interactiva de última generación. Experimenta con simulaciones visuales en tiempo real, ejecuta scripts de Python sin instalar dependencias y domina el rigor matemático.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link
                        href="/courses"
                        className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl bg-blue-600 px-8 text-base font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                    >
                        <span>Explorar Cursos</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/courses/estadistica-i"
                        className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-8 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 backdrop-blur-sm active:scale-95"
                    >
                        <span>Iniciar Estadística I</span>
                    </Link>
                </div>

                {/* Feature Highlights Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto mb-16 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        <span>30+ Gráficos Interactivos</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Motor Python WebAssembly</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Quizzes con Persistencia en DB</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Formatos KaTeX y Mermaid</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 pt-10 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-white mb-1">100%</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Interactivo</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-1">30+</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Simulaciones</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-1">Pyodide</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Python en Vivo</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">UTP</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Ing. Industrial</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
