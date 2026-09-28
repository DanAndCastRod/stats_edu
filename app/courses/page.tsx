import { Navbar } from "@/components/shared/PublicNavbar"
import { CourseCatalog } from "@/components/courses/CourseCatalog"
import { GraduationCap, BookOpen, Cpu, ShieldCheck } from "lucide-react"

export default function CoursesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section Institucional */}
                <section className="bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white py-16 px-4 border-b border-blue-800/40">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                                <GraduationCap className="w-3.5 h-3.5" />
                                Facultad de Ingeniería Industrial • UTP
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                21 Asignaturas Oficiales
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                            Catálogo Curricular de Asignaturas
                        </h1>
                        <p className="text-base md:text-lg text-blue-100/90 max-w-3xl leading-relaxed">
                            Malla académica oficial del Área de Investigación de Operaciones y Estadística.
                            Formación integral para el Pregrado en Ingeniería Industrial y la Maestría en
                            Investigación Operativa y Estadística (MIOE) con entornos de modelación matemática,
                            computación científica en Python Wasm y laboratorios formativos.
                        </p>
                    </div>
                </section>

                {/* Interactive Catalog Section */}
                <section className="py-10 px-4">
                    <div className="container mx-auto max-w-7xl">
                        <CourseCatalog />
                    </div>
                </section>

                {/* Academic Methodology Pillars */}
                <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Enfoque Metodológico de Ingeniería UTP
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Rigor conceptual, validación algorítmica y aplicación práctica para la toma de decisiones cuantitativas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-xl flex items-center justify-center mb-4">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">
                                    1. Modelación y Rigor KaTeX
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Deducciones analíticas formales, notación matemática estricta y sustentación teórica conforme a los planes de estudio UTP.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center justify-center mb-4">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">
                                    2. Laboratorio Python en el Navegador
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Entorno Pyodide Wasm con NumPy, SciPy y Pandas para experimentación numérica instantánea sin instalar servidores.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 rounded-xl flex items-center justify-center mb-4">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">
                                    3. Evaluación Formativa y Certificación
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Quizzes con retroalimentación inmediata, seguimiento de avance acumulado y reporte oficial con código de verificación.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
                <div className="container mx-auto px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="font-medium">Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial</p>
                    <p>Área Académica de Investigación de Operaciones y Estadística • Laboratorio GEIO</p>
                </div>
            </footer>
        </div>
    )
}
