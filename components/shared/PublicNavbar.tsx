"use client"

import { useState } from "react"
import Link from "next/link"
import {
    GraduationCap,
    BookOpen,
    LayoutDashboard,
    Compass,
    Sparkles,
    FlaskConical,
    HelpCircle,
    Menu,
    X,
    Building2,
    ArrowRight
} from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <header className="sticky top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
            {/* Top Institutional Header Strip */}
            <div className="bg-slate-900 text-slate-200 text-[11px] font-medium py-1.5 px-4 border-b border-slate-800 hidden md:block">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 font-semibold text-blue-300">
                            <Building2 className="h-3 w-3 text-blue-400" />
                            Universidad Tecnológica de Pereira
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">Facultad de Ingeniería Industrial</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">Área de Investigación de Operaciones y Estadística</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                            Laboratorio GEIO
                        </span>
                        <span className="text-slate-400">Pereira, Colombia</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar Bar */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Brand / Institutional Identity */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-blue-900 text-white p-2 rounded-xl shadow-sm border border-blue-800 group-hover:bg-blue-800 transition-colors flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-blue-200" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                                Stats<span className="text-blue-700 dark:text-blue-400">Edu</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-300 dark:border-blue-800">
                                UTP
                            </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-tight hidden sm:block">
                            Ingeniería Industrial • Cátedra Digital
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Link
                        href="/#asignaturas"
                        className="hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-1"
                    >
                        <BookOpen className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                        <span>Asignaturas</span>
                    </Link>
                    <Link
                        href="/#curriculo"
                        className="hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-1"
                    >
                        <Compass className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                        <span>Malla Curricular</span>
                    </Link>
                    <Link
                        href="/#metodologia"
                        className="hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-1"
                    >
                        <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span>Metodología</span>
                    </Link>
                    <Link
                        href="/#laboratorio-geio"
                        className="hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-1"
                    >
                        <FlaskConical className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                        <span>Laboratorio GEIO</span>
                    </Link>
                    <Link
                        href="/#guia-estudiante"
                        className="hover:text-blue-900 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-1"
                    >
                        <HelpCircle className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                        <span>Guía del Estudiante</span>
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />

                    <Link
                        href="/dashboard"
                        className="hidden sm:inline-flex h-9 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-900 hover:bg-slate-200/90 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
                        title="Ver mi progreso académico y evaluaciones"
                    >
                        <LayoutDashboard className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        <span>Mi Progreso</span>
                    </Link>

                    <Link
                        href="/courses"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white px-4 text-xs sm:text-sm font-bold shadow-sm shadow-blue-900/20 transition-all active:scale-95 border border-blue-800"
                    >
                        <span>Aulas Virtuales</span>
                        <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        aria-label="Abrir menú de navegación"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                        Portal Académico UTP
                    </div>
                    <Link
                        href="/#asignaturas"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                        <BookOpen className="h-4 w-4 text-blue-700" />
                        <span>Asignaturas de Pregrado</span>
                    </Link>
                    <Link
                        href="/#curriculo"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                        <Compass className="h-4 w-4 text-indigo-700" />
                        <span>Estructura Curricular</span>
                    </Link>
                    <Link
                        href="/#metodologia"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        <span>Metodología Pedagógica</span>
                    </Link>
                    <Link
                        href="/#laboratorio-geio"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                        <FlaskConical className="h-4 w-4 text-emerald-700" />
                        <span>Laboratorio GEIO</span>
                    </Link>
                    <Link
                        href="/#guia-estudiante"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                        <HelpCircle className="h-4 w-4 text-sky-700" />
                        <span>Guía del Estudiante</span>
                    </Link>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                        <Link
                            href="/dashboard"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
                        >
                            <LayoutDashboard className="h-4 w-4 text-blue-700" />
                            <span>Mi Progreso Académico</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
