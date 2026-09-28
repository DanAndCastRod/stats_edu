import { Navbar } from "@/components/shared/PublicNavbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { CoursePreviewSection } from "@/components/landing/CoursePreviewSection"
import Link from "next/link"
import { BarChart3, GraduationCap, Github, ArrowRight, BookOpen, LayoutDashboard, Terminal, CheckCircle2 } from "lucide-react"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors">
            <Navbar />
            <main className="flex-1 overflow-x-hidden">
                <HeroSection />
                <FeaturesSection />
                <CoursePreviewSection />

                {/* Academic Callout / Pre-Footer CTA */}
                <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900/60 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl border border-blue-800/40">
                            {/* Ambient background glow */}
                            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
                            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

                            <div className="relative z-10 text-center max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-md border border-white/10 mb-6">
                                    <GraduationCap className="h-4 w-4 text-blue-300" />
                                    <span>Formación Universitaria de Excelencia</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                                    Impulsa tus decisiones con analítica e ingeniería
                                </h2>

                                <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                                    Aprende con simulaciones interactivas, código Python en tiempo real y evaluaciones formativas con retroalimentación inmediata.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/courses"
                                        className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-8 text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/30 active:scale-95 group"
                                    >
                                        <span>Explorar los 4 Cursos</span>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href="/courses/estadistica-i"
                                        className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-8 text-sm font-semibold text-white transition-all backdrop-blur-md active:scale-95"
                                    >
                                        <span>Iniciar con Estadística I (511-23)</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Platform Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-400 py-16 transition-colors">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
                                    <BarChart3 className="h-5 w-5" />
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="font-extrabold text-2xl text-white tracking-tight">stats</span>
                                    <span className="font-extrabold text-2xl text-amber-400 tracking-tight">edu</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/80 ml-1.5">
                                        UTP
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300 max-w-sm leading-relaxed mb-5">
                                Plataforma educativa interactiva de Estadística e Investigación de Operaciones de la Universidad Tecnológica de Pereira.
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <GraduationCap className="h-4 w-4 text-blue-400 shrink-0" />
                                <span>Facultad de Ingeniería Industrial • Pereira, Risaralda, Colombia</span>
                            </div>
                        </div>

                        {/* Cursos Oficiales Column */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                                Cursos Oficiales
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href="/courses/estadistica-i" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Estadística I</span>
                                        <span className="font-mono text-[10px] text-blue-400 font-bold">511-23</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/estadistica-ii" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Estadística II</span>
                                        <span className="font-mono text-[10px] text-indigo-400 font-bold">511-24</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/investigacion-operaciones-i" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Inv. Operaciones I</span>
                                        <span className="font-mono text-[10px] text-amber-400 font-bold">511-31</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/investigacion-operaciones-ii" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Inv. Operaciones II</span>
                                        <span className="font-mono text-[10px] text-emerald-400 font-bold">511-32</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Plataforma Column */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                                Plataforma
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link href="/courses" className="hover:text-white transition-colors flex items-center gap-2">
                                        <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                                        <span>Catálogo de Lecciones</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                                        <LayoutDashboard className="h-3.5 w-3.5 text-indigo-400" />
                                        <span>Panel del Estudiante</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/DanAndCastRod/stats_edu"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors inline-flex items-center gap-2"
                                    >
                                        <Github className="h-3.5 w-3.5 text-slate-300" />
                                        <span>Repositorio GitHub</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                        <div>
                            &copy; {new Date().getFullYear()} Universidad Tecnológica de Pereira. Excelencia Académica e Innovación Pedagógica.
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-slate-400 font-mono text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Next.js 15</span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Pyodide Wasm</span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">KaTeX</span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
