import Link from "next/link"
import {
    ArrowRight,
    Sparkles,
    Terminal,
    BarChart3,
    GraduationCap,
    CheckCircle2,
    Code2,
    Cpu,
    LayoutDashboard,
    Play
} from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 md:pt-28 md:pb-36 text-white border-b border-slate-900">
            {/* Engineering Grid Pattern Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                }}
            />

            {/* Background luminous ambient meshes */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35">
                <div className="absolute -top-36 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-600/50 blur-[140px]" />
                <div className="absolute top-1/3 -right-28 h-[460px] w-[460px] rounded-full bg-amber-500/40 blur-[140px]" />
                <div className="absolute bottom-0 -left-20 h-[380px] w-[600px] rounded-full bg-indigo-600/40 blur-[150px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                {/* Academic & Feature Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                    {/* Badge 1: Academic Institution */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-blue-400 backdrop-blur-md border border-slate-800 shadow-inner">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                        </span>
                        <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                        <span className="tracking-wide uppercase text-[11px] font-bold">
                            Facultad de Ingeniería Industrial • UTP
                        </span>
                    </div>

                    {/* Badge 2: Rich Content Volume */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-3.5 py-1.5 text-xs font-semibold text-amber-300 border border-amber-500/30 backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span className="tracking-wide text-[11px] font-bold">
                            +58 Lecciones con Python y KaTeX
                        </span>
                    </div>

                    {/* Badge 3: WebAssembly Engine */}
                    <div className="hidden lg:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="tracking-wide text-[11px] font-bold">
                            Motor Pyodide WebAssembly
                        </span>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8 leading-[1.12]">
                    Aprende Estadística e <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                        Investigación de Operaciones
                    </span>
                    <br />
                    <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-200 mt-2 block">
                        con Rigor Analítico y Código en Vivo
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-slate-300/95 mb-10 font-normal leading-relaxed">
                    La plataforma universitaria oficial para dominar la modelación estocástica, optimización determinística e inferencia estadística. Experimenta con simulaciones visuales en tiempo real, ejecuta scripts de Python sin instalar nada localmente y potencia tus competencias analíticas.
                </p>

                {/* Main Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <Link
                        href="/courses"
                        className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl bg-blue-600 px-8 text-base font-bold text-white transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 group border border-blue-400/30"
                    >
                        <span>Explorar Cursos Oficiales</span>
                        <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto inline-flex h-13 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 px-8 text-base font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-600 backdrop-blur-md active:scale-95 shadow-md flex items-center gap-2"
                    >
                        <LayoutDashboard className="h-4 w-4 text-indigo-400" />
                        <span>Panel del Estudiante</span>
                    </Link>
                </div>

                {/* Feature Highlights Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-16 text-xs text-slate-300">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Visualizadores dinámicos Recharts y D3</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Python Wasm (NumPy, SciPy, Pandas)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Evaluaciones con feedback instantáneo</span>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Fórmulas KaTeX y diagramas Mermaid</span>
                    </div>
                </div>

                {/* Interactive Code & Live Visual Preview Card */}
                <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-blue-950/50 backdrop-blur-xl overflow-hidden text-left mb-16">
                    {/* Card Topbar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                            <div className="h-4 w-[1px] bg-slate-800 mx-2" />
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                                <Terminal className="h-3.5 w-3.5 text-blue-400" />
                                <span>simulacion_monte_carlo.py</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                                Pyodide 0.26 Wasm
                            </span>
                        </div>
                    </div>

                    {/* Code Snippet & Simulated Output */}
                    <div className="p-5 font-mono text-xs sm:text-sm bg-slate-950/90 overflow-x-auto">
                        <div className="text-slate-400">
                            <span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np<br />
                            <span className="text-purple-400">from</span> scipy <span className="text-purple-400">import</span> stats<br />
                            <br />
                            <span className="text-slate-500"># 1. Simulación estocástica de variables aleatorias</span><br />
                            muestras = np.random.normal(loc=<span className="text-amber-300">100.0</span>, scale=<span className="text-amber-300">15.0</span>, size=<span className="text-amber-300">10000</span>)<br />
                            media_muestral = np.mean(muestras)<br />
                            <br />
                            <span className="text-slate-500"># 2. Inferencia y prueba de hipótesis z bilateral</span><br />
                            z_stat, p_val = stats.ttest_1samp(muestras, popmean=<span className="text-amber-300">100.0</span>)<br />
                            print(<span className="text-emerald-300">{`f"x̄ = {media_muestral:.2f} | Z = {z_stat:.4f} | p-valor = {p_val:.4f}"`}</span>)<br />
                        </div>

                        {/* Terminal Output */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-emerald-400 font-mono">
                                <Play className="h-3 w-3 fill-emerald-400 shrink-0" />
                                <span>Salida: x̄ = 100.04 | Z = 0.2667 | p-valor = 0.7897 (No se rechaza H₀)</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
                                Ejecutado en 16ms en tu navegador
                            </span>
                        </div>
                    </div>
                </div>

                {/* Academic Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-800/80 pt-10 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-1">4</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Cursos Oficiales</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">511-23 • 511-24 • 511-31 • 511-32</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-1">+58</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Lecciones Activas</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">22 módulos estructurados</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">100%</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Client-Side Wasm</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Sin instalar Python ni Docker</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-1">UTP</span>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Ing. Industrial</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Pereira, Colombia</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
