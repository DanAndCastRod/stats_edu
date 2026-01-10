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
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-1.5 text-xs font-semibold text-brand-blue backdrop-blur-md border border-slate-700 mb-8 tracking-wide uppercase">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Facultad de Ingeniería Industrial
                </div>

                <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tight text-white md:text-7xl mb-8 leading-tight">
                    Universidad Tecnológica <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">de Pereira</span>
                </h1>

                <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed">
                    Plataforma académica para el aprendizaje avanzado de <strong className="text-brand-blue font-semibold">Estadística</strong> e <strong className="text-brand-orange font-semibold">Investigación de Operaciones</strong>.
                    Simulaciones interactivas y análisis de datos en tiempo real.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/courses"
                        className="group inline-flex h-14 items-center justify-center rounded-lg bg-brand-blue px-8 text-base font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Acceder al Aula Virtual
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/courses"
                        className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-8 text-base font-medium text-slate-300 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                        Ver Plan de Estudios
                    </Link>
                </div>

                {/* Stats / Badges */}
                <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-slate-800/60 pt-12 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl font-bold text-white mb-1 group-hover:text-brand-blue transition-colors">8+</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Asignaturas</span>
                    </div>
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl font-bold text-white mb-1 group-hover:text-brand-violet transition-colors">100%</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Práctico</span>
                    </div>
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">Python</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Entorno Integrado</span>
                    </div>
                    <div className="flex flex-col items-center group">
                        <span className="text-4xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">UTP</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Certificado</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
