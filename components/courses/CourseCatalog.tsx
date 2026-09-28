"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
    OFFICIAL_COURSES,
    type OfficialCourse,
    type ProgramType,
    type PregradoArea,
    type PosgradoCycle
} from "@/lib/curriculum-catalog"
import {
    Search,
    BookOpen,
    Clock,
    GraduationCap,
    Award,
    Layers,
    ArrowRight,
    X,
    Filter,
    CheckCircle2
} from "lucide-react"

const PREGRADO_AREAS: PregradoArea[] = [
    "todas",
    "Investigación de Operaciones",
    "Estadística",
    "Administración",
    "Finanzas",
    "Producción",
    "Ciencias Básicas"
]

const POSGRADO_CYCLES: PosgradoCycle[] = [
    "todos",
    "S0 Nivelatorio",
    "S1 Obligatorias",
    "S2 Especializadas"
]

export function CourseCatalog() {
    const [selectedProgram, setSelectedProgram] = useState<ProgramType>("todos")
    const [selectedArea, setSelectedArea] = useState<PregradoArea>("todas")
    const [selectedCycle, setSelectedCycle] = useState<PosgradoCycle>("todos")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredCourses = useMemo(() => {
        return OFFICIAL_COURSES.filter(course => {
            // 1. Program filter
            if (selectedProgram !== "todos" && course.program !== selectedProgram) {
                return false
            }

            // 2. Pregrado Area filter
            if (selectedProgram === "pregrado" && selectedArea !== "todas") {
                if (course.area !== selectedArea) return false
            }

            // 3. Posgrado Cycle filter
            if (selectedProgram === "posgrado" && selectedCycle !== "todos") {
                if (course.cycle !== selectedCycle) return false
            }

            // 4. Search query
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim()
                const matchesCode = course.code.toLowerCase().includes(query)
                const matchesTitle = course.title.toLowerCase().includes(query)
                const matchesDesc = course.description.toLowerCase().includes(query)
                const matchesSemester = course.semester.toLowerCase().includes(query)
                const matchesArea = course.area.toLowerCase().includes(query)
                const matchesCycle = course.cycle?.toLowerCase().includes(query) || false
                const matchesCoordinator = course.coordinator.toLowerCase().includes(query)

                return (
                    matchesCode ||
                    matchesTitle ||
                    matchesDesc ||
                    matchesSemester ||
                    matchesArea ||
                    matchesCycle ||
                    matchesCoordinator
                )
            }

            return true
        })
    }, [selectedProgram, selectedArea, selectedCycle, searchQuery])

    const totalPregrado = OFFICIAL_COURSES.filter(c => c.program === "pregrado").length
    const totalPosgrado = OFFICIAL_COURSES.filter(c => c.program === "posgrado").length

    const handleClearFilters = () => {
        setSelectedProgram("todos")
        setSelectedArea("todas")
        setSelectedCycle("todos")
        setSearchQuery("")
    }

    return (
        <div className="space-y-8">
            {/* Control Panel: Program Tabs & Search Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Program Selector Tabs */}
                    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedProgram("todos")
                                setSelectedArea("todas")
                                setSelectedCycle("todos")
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                selectedProgram === "todos"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <span>Todos los Cursos</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold">
                                {OFFICIAL_COURSES.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedProgram("pregrado")
                                setSelectedArea("todas")
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                selectedProgram === "pregrado"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <GraduationCap className="w-4 h-4" />
                            <span>Pregrado en Ingeniería Industrial</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold">
                                {totalPregrado}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedProgram("posgrado")
                                setSelectedCycle("todos")
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                selectedProgram === "posgrado"
                                    ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <Award className="w-4 h-4" />
                            <span>Posgrado: Maestría en IO y Estadística (MIOE)</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 font-bold">
                                {totalPosgrado}
                            </span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative min-w-[280px] lg:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Buscar por código, título o tema..."
                            className="w-full text-sm pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                                title="Limpiar búsqueda"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Sub-filters (Conditional based on active tab) */}
                {selectedProgram === "pregrado" && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-2">
                            <Filter className="w-3.5 h-3.5" />
                            Áreas de Formación:
                        </span>
                        {PREGRADO_AREAS.map(area => (
                            <button
                                key={area}
                                type="button"
                                onClick={() => setSelectedArea(area)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                    selectedArea === area
                                        ? "bg-blue-600 text-white font-semibold shadow-sm"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                            >
                                {area === "todas" ? "Todas las Áreas (11)" : area}
                            </button>
                        ))}
                    </div>
                )}

                {selectedProgram === "posgrado" && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-2">
                            <Filter className="w-3.5 h-3.5" />
                            Ciclos MIOE:
                        </span>
                        {POSGRADO_CYCLES.map(cycle => (
                            <button
                                key={cycle}
                                type="button"
                                onClick={() => setSelectedCycle(cycle)}
                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                    selectedCycle === cycle
                                        ? "bg-blue-600 text-white font-semibold shadow-sm"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                            >
                                {cycle === "todos" ? "Todos los Ciclos (10)" : cycle}
                            </button>
                        ))}
                    </div>
                )}

                {/* Filter Status & Count */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <p>
                        Mostrando <strong className="text-slate-900 dark:text-white font-semibold">{filteredCourses.length}</strong> de{" "}
                        <strong>{OFFICIAL_COURSES.length}</strong> asignaturas oficiales UTP
                    </p>
                    {(selectedProgram !== "todos" || selectedArea !== "todas" || selectedCycle !== "todos" || searchQuery) && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                        >
                            <X className="w-3.5 h-3.5" />
                            Restablecer todos los filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Course Cards Grid */}
            {filteredCourses.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center">
                    <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                        No se encontraron asignaturas
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                        No hay materias que coincidan con tus criterios de búsqueda o filtros seleccionados.
                    </p>
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                        Limpiar filtros de búsqueda
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <article
                            key={course.id}
                            className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200 group"
                        >
                            {/* Card Header with Academic Code and Badges */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-850">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                        {course.code}
                                    </span>
                                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                        {course.semester}
                                    </span>
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                                    {course.title}
                                </h2>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                        {course.program === "pregrado" ? "Pregrado" : "MIOE Posgrado"} • {course.cycle || course.area}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="space-y-4">
                                    {/* Academic Specifications Grid */}
                                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                                        <div>
                                            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Créditos UTP</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">
                                                {course.credits} Créditos ({course.ects} ECTS)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Estructura</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">
                                                {course.totalModules} unidades • {course.totalTopics} lecc.
                                            </span>
                                        </div>
                                    </div>

                                    {course.coordinator && (
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                            <span className="font-medium text-slate-600 dark:text-slate-300">Coordinación:</span> {course.coordinator}
                                        </p>
                                    )}

                                    {/* Action Button */}
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-xs font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm group-hover:shadow"
                                    >
                                        <span>Acceder a la Asignatura</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
