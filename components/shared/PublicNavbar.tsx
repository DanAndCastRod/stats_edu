import Link from "next/link"
import { BarChart3, BookOpen, User, Sparkles } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 w-full z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="font-black text-xl text-white tracking-tight leading-none">stats</span>
                        <span className="font-black text-xl text-brand-orange tracking-tight leading-none">edu</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded ml-1 border border-slate-700/60 hidden sm:inline-block">
                            UTP
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-4 sm:gap-6">
                    <Link
                        href="/courses"
                        className="text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                        <BookOpen className="h-4 w-4 text-blue-400" />
                        <span>Cursos</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
                    >
                        <span>Mi Progreso</span>
                    </Link>
                    <Link
                        href="/api/auth/signin"
                        className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/courses"
                        className="inline-flex h-9 items-center justify-center rounded-xl bg-blue-600 px-4 text-xs sm:text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-md hover:shadow-blue-500/20 active:scale-95"
                    >
                        Comenzar
                    </Link>
                </nav>
            </div>
        </header>
    )
}
