import { Navbar } from "@/components/shared/PublicNavbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { InteractiveLabDemo } from "@/components/landing/InteractiveLabDemo"
import { CurriculumSection } from "@/components/landing/CurriculumSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { CoursePreviewSection } from "@/components/landing/CoursePreviewSection"
import { GraduateProgramBanner } from "@/components/landing/GraduateProgramBanner"
import { GeioLabSection } from "@/components/landing/GeioLabSection"
import { StudentGuideSection } from "@/components/landing/StudentGuideSection"
import Link from "next/link"
import {
    GraduationCap,
    BookOpen,
    Building2,
    FlaskConical,
    Github,
    ExternalLink,
    MapPin,
    Mail,
    Phone,
    ShieldCheck,
    FileText,
    LayoutDashboard
} from "lucide-react"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors">
            <Navbar />
            <main className="flex-1 overflow-x-hidden">
                <HeroSection />
                <InteractiveLabDemo />
                <CurriculumSection />
                <FeaturesSection />
                <CoursePreviewSection />
                <GraduateProgramBanner />
                <GeioLabSection />
                <StudentGuideSection />
            </main>

            {/* Academic Institutional Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300 dark:bg-slate-950 dark:text-slate-400 py-16 transition-colors">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Col 1: Institutional Identity */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="bg-blue-800 text-white p-2 rounded-xl shadow-xs">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="font-extrabold text-lg text-white tracking-tight block">
                                        StatsEdu UTP
                                    </span>
                                    <span className="text-[11px] text-blue-300 font-semibold block">
                                        Cátedra Digital Universitaria
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed">
                                Plataforma formativa del <span className="text-slate-200 font-semibold">Área de Investigación de Operaciones y Estadística</span> de la <span className="text-slate-200 font-semibold">Facultad de Ingeniería Industrial</span> en la Universidad Tecnológica de Pereira.
                            </p>

                            <div className="space-y-2 text-xs text-slate-400">
                                <div className="flex items-start gap-2">
                                    <Building2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                    <span>Campus La Julita, Edificio 5 — Fac. de Ingeniería Industrial</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>Pereira, Risaralda, Colombia</span>
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Pregrado Cursos Oficiales */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 pb-1 border-b border-slate-800">
                                Asignaturas de Pregrado
                            </h4>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <Link href="/courses/estadistica-i" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Estadística I</span>
                                        <span className="font-mono text-[10px] text-blue-400 font-bold bg-blue-950 px-1.5 py-0.5 rounded border border-blue-900">
                                            II4D3
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/estadistica-ii" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Estadística II</span>
                                        <span className="font-mono text-[10px] text-indigo-400 font-bold bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-900">
                                            II5A3
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/investigacion-operaciones-i" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Investigación de Operaciones I</span>
                                        <span className="font-mono text-[10px] text-sky-400 font-bold bg-sky-950 px-1.5 py-0.5 rounded border border-sky-900">
                                            II7D3
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses/investigacion-operaciones-ii" className="hover:text-white transition-colors flex items-center justify-between group">
                                        <span>Investigación de Operaciones II</span>
                                        <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-900">
                                            II8B3
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Posgrado & Laboratorio */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 pb-1 border-b border-slate-800">
                                Posgrado & Laboratorio
                            </h4>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <Link href="/#posgrado" className="hover:text-white transition-colors flex items-center gap-1.5">
                                        <FlaskConical className="h-3.5 w-3.5 text-indigo-400" />
                                        <span>Maestría en IO y Estadística</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#laboratorio-geio" className="hover:text-white transition-colors flex items-center gap-1.5">
                                        <Building2 className="h-3.5 w-3.5 text-emerald-400" />
                                        <span>Laboratorio GEIO</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#curriculo" className="hover:text-white transition-colors flex items-center gap-1.5">
                                        <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                                        <span>Malla Curricular UTP</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                                        <LayoutDashboard className="h-3.5 w-3.5 text-blue-400" />
                                        <span>Seguimiento del Estudiante</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 4: Enlaces Institucionales */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 pb-1 border-b border-slate-800">
                                Enlaces Institucionales
                            </h4>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <a
                                        href="https://www.utp.edu.co"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors flex items-center justify-between"
                                    >
                                        <span>Portal Oficial UTP</span>
                                        <ExternalLink className="h-3 w-3 text-slate-500" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://industrial.utp.edu.co"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors flex items-center justify-between"
                                    >
                                        <span>Fac. de Ingeniería Industrial</span>
                                        <ExternalLink className="h-3 w-3 text-slate-500" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://biblioteca.utp.edu.co"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors flex items-center justify-between"
                                    >
                                        <span>Biblioteca Jorge Roa Martínez</span>
                                        <ExternalLink className="h-3 w-3 text-slate-500" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/DanAndCastRod/stats_edu"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-white transition-colors flex items-center gap-1.5"
                                    >
                                        <Github className="h-3.5 w-3.5 text-slate-400" />
                                        <span>Repositorio en GitHub</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer bottom bar */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                        <div>
                            &copy; {new Date().getFullYear()} Universidad Tecnológica de Pereira. Facultad de Ingeniería Industrial. Área de Investigación de Operaciones y Estadística.
                        </div>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Next.js 15 Static Export</span>
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
