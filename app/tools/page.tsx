"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    Wrench,
    Activity,
    Users,
    GitBranch,
    DollarSign,
    Factory,
    Table2,
    Compass,
    Sparkles,
    CheckCircle2,
    BookOpen,
    GraduationCap,
    ArrowRight,
    Search,
    SlidersHorizontal,
    Layers
} from "lucide-react"
import { Navbar } from "@/components/shared/PublicNavbar"
import {
    DistributionWorkbench,
    QueueingTheoryCalculator,
    MarkovChainAnalyzer,
    EngineeringEconomicsCalculator,
    DeaEfficiencyCalculator,
    SimplexSolverTool,
    SpcQualityControlWorkbench,
    InventoryOptimizationTool,
    ForecastingWorkbench,
    CpmPertNetworkOptimizer
} from "@/components/tools"
import { Boxes, Network as NetworkIcon } from "lucide-react"

type ToolCategory =
    | "all"
    | "stats"
    | "operations"
    | "finance_prod"
    | "graduate"

interface ToolCardMeta {
    id: string
    title: string
    shortDesc: string
    category: ToolCategory
    categoryLabel: string
    courseCode: string
    level: "Pregrado" | "Posgrado MIOE" | "Ambos"
    icon: React.ElementType
    tags: string[]
    component: React.ComponentType
}

const TOOLS_CATALOG: ToolCardMeta[] = [
    {
        id: "distributions",
        title: "Workbench de Distribuciones Estadísticas",
        shortDesc: "Distribuciones Continuas (Normal, t-Student, Chi², F, Exponencial) y Discretas (Binomial, Poisson) con cálculo de quantiles, densidades y áreas bajo la curva.",
        category: "stats",
        categoryLabel: "Estadística & Probabilidad",
        courseCode: "II4D3 / II5A3",
        level: "Pregrado",
        icon: Activity,
        tags: ["Normal", "t-Student", "Chi-cuadrado", "Poisson", "Quantiles"],
        component: DistributionWorkbench
    },
    {
        id: "queueing",
        title: "Calculadora de Teoría de Colas (M/M/s)",
        shortDesc: "Modelos Markovianos M/M/1, M/M/s y M/M/s/K con fórmulas de Little, probabilidades Pn, Erlang-C, probabilidad de bloqueo y optimización económica de servidores.",
        category: "operations",
        categoryLabel: "Investigación de Operaciones",
        courseCode: "II8B3",
        level: "Pregrado",
        icon: Users,
        tags: ["M/M/1", "M/M/s", "Capacidad Finita", "Costos", "Erlang-C"],
        component: QueueingTheoryCalculator
    },
    {
        id: "markov",
        title: "Analizador de Cadenas de Markov (DTMC)",
        shortDesc: "Matrices de transición estocásticas 2x2 y 3x3, cálculo de Pⁿ a n pasos, vector de estado estacionario π y simulación de trayectorias estocásticas Monte Carlo.",
        category: "operations",
        categoryLabel: "Investigación de Operaciones",
        courseCode: "II6A2 / MIOE",
        level: "Ambos",
        icon: GitBranch,
        tags: ["Matrices Pⁿ", "Estado Estacionario", "Ergodicidad", "Monte Carlo"],
        component: MarkovChainAnalyzer
    },
    {
        id: "economics",
        title: "Ingeniería Económica & Evaluación Financiera",
        shortDesc: "Evaluación de flujos de caja con Valor Presente Neto (VPN), Tasa Interna de Retorno (TIR), Relación Beneficio/Costo (B/C) y Payback con curva de sensibilidad.",
        category: "finance_prod",
        categoryLabel: "Finanzas & Producción",
        courseCode: "II713",
        level: "Pregrado",
        icon: DollarSign,
        tags: ["VPN / VAN", "TIR / IRR", "Relación B/C", "Payback Descontado"],
        component: EngineeringEconomicsCalculator
    },
    {
        id: "dea",
        title: "Eficiencia Técnica DEA (CCR Insumo-Orientado)",
        shortDesc: "Análisis Envolvente de Datos con múltiples DMUs para determinar la puntuación de eficiencia técnica relativa θ, benchmarking industrial y fronteras convexas.",
        category: "graduate",
        categoryLabel: "Modelos Avanzados de Posgrado",
        courseCode: "MIOE S2",
        level: "Posgrado MIOE",
        icon: Factory,
        tags: ["Frontera Envolvente", "Score θ", "Benchmarking", "Iso-cuanta"],
        component: DeaEfficiencyCalculator
    },
    {
        id: "simplex",
        title: "Resolutor del Método Simplex Primal",
        shortDesc: "Solución analítica de programación lineal paso a paso con tablas Simplex, prueba de la razón mínima, pivoteo interactivo y cálculo de precios sombra duales.",
        category: "operations",
        categoryLabel: "Investigación de Operaciones",
        courseCode: "II7D3 / MIOE S1",
        level: "Ambos",
        icon: Table2,
        tags: ["Simplex Primal", "Tablas Paso a Paso", "Precios Sombra", "Dualidad"],
        component: SimplexSolverTool
    },
    {
        id: "spc",
        title: "Control Estadístico de Calidad & Capacidad (SPC)",
        shortDesc: "Gráficos de control Shewhart X-barra y R, cálculo de límites a ±3σ, detección de causas asignables e índices de capacidad Cp, Cpk, Cpm, PPM y nivel Sigma.",
        category: "stats",
        categoryLabel: "Estadística & Probabilidad",
        courseCode: "II5A3 / II6A2",
        level: "Pregrado",
        icon: Activity,
        tags: ["X-Bar y R", "Shewhart", "Cp y Cpk", "Capacidad 6-Sigma", "PPM Defectos"],
        component: SpcQualityControlWorkbench
    },
    {
        id: "inventory",
        title: "Optimizador de Inventarios & Lote Económico (EOQ / ROP)",
        shortDesc: "Modelos de lote económico de pedido (EOQ), punto de reorden (ROP) bajo demanda estocástica, stock de seguridad con niveles de servicio Z y curva de costos totales.",
        category: "finance_prod",
        categoryLabel: "Finanzas & Producción",
        courseCode: "II723 / II8B3",
        level: "Pregrado",
        icon: Boxes,
        tags: ["EOQ Q*", "Punto de Reorden ROP", "Stock de Seguridad", "Diente de Sierra", "Curva de Costos"],
        component: InventoryOptimizationTool
    },
    {
        id: "forecasting",
        title: "Pronósticos de Demanda & Series de Tiempo",
        shortDesc: "Modelos cuantitativos de pronóstico: Suavizamiento Exponencial Simple (SES), Modelo Lineal de Holt para tendencia y Promedios Móviles con diagnóstico MAD/MAPE.",
        category: "finance_prod",
        categoryLabel: "Finanzas & Producción",
        courseCode: "II723 / IO123",
        level: "Ambos",
        icon: Sparkles,
        tags: ["Holt", "Suavizamiento Exponencial", "MAD / MAPE", "Tracking Signal", "Series Temporales"],
        component: ForecastingWorkbench
    },
    {
        id: "cpm",
        title: "Optimizador de Redes de Proyectos (CPM / PERT)",
        shortDesc: "Cálculo de ruta crítica, tiempos más tempranos (ES, EF) y tardíos (LS, LF), holguras totales, varianza del proyecto y probabilidad de culminación antes del plazo.",
        category: "operations",
        categoryLabel: "Investigación de Operaciones",
        courseCode: "II7D3 / II8B3 / MIOE",
        level: "Ambos",
        icon: NetworkIcon,
        tags: ["Ruta Crítica", "Holgura Total", "Pases Adelante/Atrás", "Varianza PERT", "Probabilidad Z"],
        component: CpmPertNetworkOptimizer
    }
]

export default function ToolsSuitePage() {
    const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [activeToolId, setActiveToolId] = useState<string>("distributions")

    // Synchronize active tool with URL hash (e.g. /tools#simplex)
    React.useEffect(() => {
        const syncHash = () => {
            if (typeof window !== "undefined" && window.location.hash) {
                const hash = window.location.hash.replace("#", "")
                if (TOOLS_CATALOG.some((t) => t.id === hash)) {
                    setActiveToolId(hash)
                    const el = document.getElementById("workspace")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                }
            }
        }
        syncHash()
        window.addEventListener("hashchange", syncHash)
        return () => window.removeEventListener("hashchange", syncHash)
    }, [])

    // Filter tools
    const filteredTools = TOOLS_CATALOG.filter((tool) => {
        const matchesCategory =
            selectedCategory === "all" || tool.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    const ActiveToolComponent =
        TOOLS_CATALOG.find((t) => t.id === activeToolId)?.component || DistributionWorkbench

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
            <Navbar />

            {/* Institutional Hero Banner */}
            <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-3 border border-blue-200 dark:border-blue-900">
                                <GraduationCap className="h-3.5 w-3.5" />
                                Facultad de Ingeniería Industrial — UTP
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                                Pool de Herramientas Computacionales e Interactivas
                            </h1>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
                                Suite oficial de cálculo reactivo y experimentación en tiempo real para las asignaturas del <strong>Área de Investigación de Operaciones y Estadística</strong> (Pregrado en Ingeniería Industrial y Posgrado en MIOE).
                            </p>
                        </div>

                        {/* Fast Stats */}
                        <div className="flex md:flex-col gap-3 shrink-0">
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                                <span className="text-xl font-black text-blue-900 dark:text-blue-400 font-mono">6</span>
                                <span className="text-[11px] font-semibold text-slate-500 block">Calculadoras Full-Featured</span>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                                <span className="text-xl font-black text-emerald-600 font-mono">100%</span>
                                <span className="text-[11px] font-semibold text-slate-500 block">Ejecución en Navegador</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                            {[
                                { id: "all", label: "Todas" },
                                { id: "stats", label: "Estadística & Probabilidad" },
                                { id: "operations", label: "Investigación de Operaciones" },
                                { id: "finance_prod", label: "Finanzas & Producción" },
                                { id: "graduate", label: "Posgrado MIOE" }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as ToolCategory)}
                                    className={`px-3 py-1.5 rounded-xl transition-all border ${
                                        selectedCategory === cat.id
                                            ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[240px]">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por tema, sigla o modelo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-blue-700 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Interactive Workspace Area */}
            <main className="container mx-auto max-w-6xl px-4 py-8 flex-1 space-y-8">
                {/* Active Tool Embedded View */}
                <section id="workspace" className="scroll-mt-20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                Panel de Simulación Activo
                            </h2>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                            Laboratorio Virtual UTP • Modo Interactivo
                        </span>
                    </div>

                    {/* The Active Tool Component */}
                    <ActiveToolComponent />
                </section>

                {/* Catalog Cards Grid */}
                <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="mb-4">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                            Catálogo de Herramientas Computacionales
                        </h3>
                        <p className="text-xs text-slate-500">
                            Haz clic en cualquier tarjeta para cargarla en el panel de simulación superior.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTools.map((tool) => {
                            const Icon = tool.icon
                            const isActive = activeToolId === tool.id

                            return (
                                <div
                                    key={tool.id}
                                    onClick={() => {
                                        setActiveToolId(tool.id)
                                        const el = document.getElementById("workspace")
                                        if (el) el.scrollIntoView({ behavior: "smooth" })
                                    }}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                                        isActive
                                            ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-600 shadow-md ring-2 ring-blue-600/20"
                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <div
                                                className={`p-2 rounded-xl ${
                                                    isActive
                                                        ? "bg-blue-900 text-white"
                                                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                    {tool.courseCode}
                                                </span>
                                                <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-400">
                                                    {tool.level}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                                            {tool.title}
                                        </h4>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                            {tool.shortDesc}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {tool.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-400">
                                            <span>
                                                {isActive ? "✓ En Ejecución" : "Cargar Simulador"}
                                            </span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>

            {/* Institutional Footer Strip */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500">
                <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            StatsEdu UTP
                        </span>{" "}
                        — Laboratorio Computacional del Área de Investigación de Operaciones y Estadística.
                    </div>
                    <div>
                        Universidad Tecnológica de Pereira • Pereira, Colombia
                    </div>
                </div>
            </footer>
        </div>
    )
}
