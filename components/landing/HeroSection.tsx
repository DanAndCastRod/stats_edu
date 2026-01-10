import Link from "next/link"
import { ArrowRight, BarChart2, BookOpen } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32 md:pt-32 md:pb-48">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-blue blur-3xl"></div>
                <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-brand-violet blur-3xl"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-3 py-1 text-sm font-medium text-brand-blue backdrop-blur-sm border border-slate-700 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Plataforma Oficial UTP
                </div>

                <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl mb-6">
                    Domina la <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-violet-500">Estadística</span> y <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Operaciones</span>.
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
                    Una experiencia de aprendizaje interactiva diseñada para estudiantes de Ingeniería Industrial.
                    Ejecuta código Python, visualiza datos en tiempo real y prepárate para el futuro.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/courses"
                        className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-blue px-8 text-sm font-medium text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Explorar Cursos
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                        href="/courses"
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-8 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        Ver Catálogo
                    </Link>
                </div>

                {/* Stats / Badges */}
                <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 border-t border-slate-800 pt-8">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">8+</span>
                        <span className="text-sm text-slate-500">Asignaturas</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">100%</span>
                        <span className="text-sm text-slate-500">Interactivo</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">Python</span>
                        <span className="text-sm text-slate-500">Integrado</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-white">24/7</span>
                        <span className="text-sm text-slate-500">Acceso</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
