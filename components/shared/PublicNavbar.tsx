import Link from "next/link"
import { BarChart3, BookOpen, LayoutDashboard, Sparkles, Compass } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
    return (
        <header className="sticky top-0 w-full z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl transition-colors">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight leading-none">stats</span>
                        <span className="font-black text-xl text-brand-orange tracking-tight leading-none">edu</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-900 ml-1.5 hidden sm:inline-block">
                            UTP
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                    <Link
                        href="/courses"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                    >
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>Cursos</span>
                    </Link>
                    <Link
                        href="/#metodologia"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                    >
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span>Metodología</span>
                    </Link>
                    <Link
                        href="/#courses"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                    >
                        <Compass className="h-4 w-4 text-emerald-500" />
                        <span>Asignaturas</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                    >
                        <LayoutDashboard className="h-4 w-4 text-indigo-500" />
                        <span>Mi Progreso</span>
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />

                    <Link
                        href="/dashboard"
                        className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl px-3.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/courses"
                        className="inline-flex h-9 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 text-xs sm:text-sm font-bold shadow-sm shadow-blue-600/25 transition-all active:scale-95"
                    >
                        Comenzar
                    </Link>
                </div>
            </div>
        </header>
    )
}
