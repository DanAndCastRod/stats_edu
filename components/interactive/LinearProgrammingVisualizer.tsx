"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Maximize2,
    CheckCircle2,
    AlertCircle,
    Info,
    RotateCcw,
    Zap,
    Target,
    Layers,
    Table as TableIcon
} from "lucide-react"

interface Vertex {
    id: string
    name: string
    x1: number
    x2: number
    z: number
    s1: number // Holgura restricción 1 (Taller 1: 2x1 + x2 <= 100)
    s2: number // Holgura restricción 2 (Taller 2: x1 + x2 <= 80)
    s3: number // Holgura restricción 3 (Demanda x1 <= 40)
    isOptimal: boolean
    description: string
}

export function LinearProgrammingVisualizer() {
    // Problem parameters: Maximize Z = 30*x1 + 20*x2
    const c1 = 30
    const c2 = 20
    const optimalZ = 1800
    const optimalX1 = 20
    const optimalX2 = 60

    // Interactive Z value
    const [zValue, setZValue] = useState<number>(1200)
    const [selectedVertexId, setSelectedVertexId] = useState<string | null>("V3")
    const [showConstraints, setShowConstraints] = useState<{
        c1: boolean
        c2: boolean
        c3: boolean
    }>({ c1: true, c2: true, c3: true })

    // Vertices of the feasible polygon
    const vertices: Vertex[] = useMemo(() => [
        {
            id: "V0",
            name: "Vértice O (Origen)",
            x1: 0,
            x2: 0,
            z: 0,
            s1: 100,
            s2: 80,
            s3: 40,
            isOptimal: false,
            description: "Producción nula. Todas las capacidades de taller están ociosas."
        },
        {
            id: "V1",
            name: "Vértice A (Eje X1)",
            x1: 40,
            x2: 0,
            z: 30 * 40 + 20 * 0, // 1200
            s1: 100 - (2 * 40 + 0), // 20
            s2: 80 - (40 + 0), // 40
            s3: 40 - 40, // 0 (Activa)
            isOptimal: false,
            description: "Producción máxima del Producto 1 restringida por límite de mercado."
        },
        {
            id: "V2",
            name: "Vértice B (Intersección R1-R3)",
            x1: 40,
            x2: 20,
            z: 30 * 40 + 20 * 20, // 1600
            s1: 100 - (2 * 40 + 20), // 0 (Activa)
            s2: 80 - (40 + 20), // 20
            s3: 40 - 40, // 0 (Activa)
            isOptimal: false,
            description: "Taller de Maquinado saturado y límite de mercado de x1 alcanzado."
        },
        {
            id: "V3",
            name: "Vértice C (ÓPTIMO GLOBAL)",
            x1: 20,
            x2: 60,
            z: 30 * 20 + 20 * 60, // 1800
            s1: 100 - (2 * 20 + 60), // 0 (Activa)
            s2: 80 - (20 + 60), // 0 (Activa)
            s3: 40 - 20, // 20 de holgura
            isOptimal: true,
            description: "Solución óptima donde se saturan conjuntamente Maquinado y Ensamble."
        },
        {
            id: "V4",
            name: "Vértice D (Eje X2)",
            x1: 0,
            x2: 80,
            z: 30 * 0 + 20 * 80, // 1600
            s1: 100 - (2 * 0 + 80), // 20
            s2: 80 - (0 + 80), // 0 (Activa)
            s3: 40 - 0, // 40
            isOptimal: false,
            description: "Especialización exclusiva en Producto 2 agotando la capacidad de Ensamble."
        }
    ], [])

    // SVG Coordinate transformation helpers
    // Graph bounds: x1 from 0 to 90, x2 from 0 to 110
    const svgWidth = 560
    const svgHeight = 420
    const padLeft = 55
    const padBottom = 45
    const padTop = 25
    const padRight = 30
    const plotWidth = svgWidth - padLeft - padRight
    const plotHeight = svgHeight - padTop - padBottom

    const xMax = 90
    const yMax = 110

    const scaleX = (x: number) => padLeft + (x / xMax) * plotWidth
    const scaleY = (y: number) => padTop + plotHeight - (y / yMax) * plotHeight

    // Feasible Polygon SVG points string: V0 -> V1 -> V2 -> V3 -> V4
    const polygonPoints = useMemo(() => {
        return [
            `${scaleX(0)},${scaleY(0)}`,
            `${scaleX(40)},${scaleY(0)}`,
            `${scaleX(40)},${scaleY(20)}`,
            `${scaleX(20)},${scaleY(60)}`,
            `${scaleX(0)},${scaleY(80)}`
        ].join(" ")
    }, [])

    // Calculate isoprofit line endpoints for current zValue
    // Line equation: 30*x1 + 20*x2 = Z  =>  x2 = (Z - 30*x1)/20
    const isoprofitEndpoints = useMemo(() => {
        // Find segment within [0, xMax] and [0, yMax]
        const pts: { x: number; y: number }[] = []

        // Point where x1 = 0
        const yAtX0 = zValue / c2
        if (yAtX0 >= 0 && yAtX0 <= yMax) {
            pts.push({ x: 0, y: yAtX0 })
        } else if (yAtX0 > yMax) {
            // crosses y = yMax
            const xAtYMax = (zValue - c2 * yMax) / c1
            if (xAtYMax >= 0 && xAtYMax <= xMax) {
                pts.push({ x: xAtYMax, y: yMax })
            }
        }

        // Point where x2 = 0
        const xAtY0 = zValue / c1
        if (xAtY0 >= 0 && xAtY0 <= xMax) {
            pts.push({ x: xAtY0, y: 0 })
        } else if (xAtY0 > xMax) {
            // crosses x = xMax
            const yAtXMax = (zValue - c1 * xMax) / c2
            if (yAtXMax >= 0 && yAtXMax <= yMax) {
                pts.push({ x: xMax, y: yAtXMax })
            }
        }

        if (pts.length >= 2) {
            return {
                x1: scaleX(pts[0].x),
                y1: scaleY(pts[0].y),
                x2: scaleX(pts[1].x),
                y2: scaleY(pts[1].y),
                valid: true
            }
        }
        return { x1: 0, y1: 0, x2: 0, y2: 0, valid: false }
    }, [zValue])

    // Status evaluation based on current Z
    const status = useMemo(() => {
        if (Math.abs(zValue - optimalZ) < 5) {
            return {
                type: "optimal",
                title: "¡Solución Óptima Alcanzada! (Z* = $1,800)",
                badge: "ÓPTIMO",
                badgeClass: "bg-emerald-500 text-white",
                textColor: "text-emerald-700 dark:text-emerald-300",
                description: "La recta de isoganancia hace contacto tangencial en el último vértice factible C (20, 60). Cualquier incremento de Z dejaría la recta fuera de la región factible."
            }
        }
        if (zValue < optimalZ) {
            return {
                type: "feasible",
                title: "Nivel de Ganancia Factible (Subóptimo)",
                badge: "FACTIBLE",
                badgeClass: "bg-sky-500 text-white",
                textColor: "text-sky-700 dark:text-sky-300",
                description: `Existen múltiples combinaciones de producción en el segmento interior que generan Z = $${zValue}. Es posible aumentar Z desplazando la recta paralelamente hacia afuera.`
            }
        }
        return {
            type: "infeasible",
            title: "Nivel de Ganancia Infactible (Sobrecarga de Recursos)",
            badge: "INFACTIBLE",
            badgeClass: "bg-rose-500 text-white",
            textColor: "text-rose-700 dark:text-rose-300",
            description: `Z = $${zValue} no puede alcanzarse. Toda la recta de isoganancia queda fuera del polígono factible porque viola una o más capacidades de taller.`
        }
    }, [zValue])

    const selectedVertex = useMemo(() => {
        return vertices.find(v => v.id === selectedVertexId) || vertices[3]
    }, [selectedVertexId, vertices])

    return (
        <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-blue-100 dark:bg-blue-900/40 text-brand-blue">
                                Investigación de Operaciones I • UTP
                            </span>
                            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${status.badgeClass}`}>
                                {status.badge}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Maximize2 className="h-5 w-5 text-brand-blue" />
                            Visualizador 2D: Método Gráfico y Recta de Isoganancia
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                            Ajusta el valor de la función objetivo <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">Z</span> para deslizar la recta de isoganancia por el polígono factible y encontrar el vértice óptimo de producción.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setZValue(optimalZ)
                                setSelectedVertexId("V3")
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                            title="Ir directamente a la solución óptima"
                        >
                            <Target className="h-3.5 w-3.5" />
                            Saltar al Óptimo ($1,800)
                        </button>
                        <button
                            onClick={() => {
                                setZValue(1000)
                                setSelectedVertexId(null)
                            }}
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Reiniciar simulador"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
                {/* SVG Visualizer Area */}
                <div className="lg:col-span-7 p-6 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950/40">
                    <div className="w-full max-w-full overflow-x-auto">
                        <svg
                            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            className="w-full h-auto select-none font-sans"
                            style={{ minWidth: "480px" }}
                        >
                            <defs>
                                {/* Linear Gradient for Feasible Region */}
                                <linearGradient id="feasibleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0.20" />
                                </linearGradient>

                                {/* Pattern for Feasible Region */}
                                <pattern id="gridLines" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" />
                                </pattern>
                            </defs>

                            {/* Background Grid */}
                            <rect
                                x={padLeft}
                                y={padTop}
                                width={plotWidth}
                                height={plotHeight}
                                fill="url(#gridLines)"
                            />

                            {/* Grid Ticks & Labels */}
                            {[0, 20, 40, 60, 80].map(val => (
                                <g key={`grid-x-${val}`}>
                                    <line
                                        x1={scaleX(val)}
                                        y1={padTop}
                                        x2={scaleX(val)}
                                        y2={padTop + plotHeight}
                                        stroke="currentColor"
                                        strokeWidth="0.8"
                                        strokeDasharray="3 3"
                                        className="text-slate-200 dark:text-slate-800"
                                    />
                                    <text
                                        x={scaleX(val)}
                                        y={padTop + plotHeight + 18}
                                        textAnchor="middle"
                                        className="text-[11px] fill-slate-500 font-mono"
                                    >
                                        {val}
                                    </text>
                                </g>
                            ))}

                            {[0, 20, 40, 60, 80, 100].map(val => (
                                <g key={`grid-y-${val}`}>
                                    <line
                                        x1={padLeft}
                                        y1={scaleY(val)}
                                        x2={padLeft + plotWidth}
                                        y2={scaleY(val)}
                                        stroke="currentColor"
                                        strokeWidth="0.8"
                                        strokeDasharray="3 3"
                                        className="text-slate-200 dark:text-slate-800"
                                    />
                                    <text
                                        x={padLeft - 10}
                                        y={scaleY(val) + 4}
                                        textAnchor="end"
                                        className="text-[11px] fill-slate-500 font-mono"
                                    >
                                        {val}
                                    </text>
                                </g>
                            ))}

                            {/* Cartesian Axes */}
                            <line
                                x1={padLeft}
                                y1={padTop + plotHeight}
                                x2={padLeft + plotWidth + 15}
                                y2={padTop + plotHeight}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-slate-700 dark:text-slate-300"
                            />
                            <line
                                x1={padLeft}
                                y1={padTop + plotHeight}
                                x2={padLeft}
                                y2={padTop - 15}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-slate-700 dark:text-slate-300"
                            />

                            {/* Axis Arrows */}
                            <polygon
                                points={`${padLeft + plotWidth + 20},${padTop + plotHeight} ${padLeft + plotWidth + 12},${padTop + plotHeight - 4} ${padLeft + plotWidth + 12},${padTop + plotHeight + 4}`}
                                className="fill-slate-700 dark:fill-slate-300"
                            />
                            <polygon
                                points={`${padLeft},${padTop - 20} ${padLeft - 4},${padTop - 12} ${padLeft + 4},${padTop - 12}`}
                                className="fill-slate-700 dark:fill-slate-300"
                            />

                            {/* Axis Labels */}
                            <text
                                x={padLeft + plotWidth - 5}
                                y={padTop + plotHeight + 34}
                                textAnchor="end"
                                className="text-xs font-semibold fill-slate-800 dark:fill-slate-200"
                            >
                                x₁ (Prod. 1 - Unidades) →
                            </text>
                            <text
                                x={padLeft - 12}
                                y={padTop - 8}
                                textAnchor="start"
                                className="text-xs font-semibold fill-slate-800 dark:fill-slate-200"
                            >
                                ↑ x₂ (Prod. 2)
                            </text>

                            {/* Shaded Feasible Region Polygon */}
                            <polygon
                                points={polygonPoints}
                                fill="url(#feasibleGrad)"
                                stroke="#0284c7"
                                strokeWidth="2"
                                className="transition-all duration-300"
                            />

                            {/* Watermark Label for Feasible Region */}
                            <text
                                x={scaleX(14)}
                                y={scaleY(28)}
                                className="text-[12px] font-bold fill-sky-800/80 dark:fill-sky-300/80 pointer-events-none uppercase tracking-wide"
                            >
                                Región Factible
                            </text>
                            <text
                                x={scaleX(14)}
                                y={scaleY(28) + 14}
                                className="text-[10px] font-medium fill-sky-700/60 dark:fill-sky-400/60 pointer-events-none"
                            >
                                (Conjunto Convexo)
                            </text>

                            {/* Constraint 1: 2*x1 + x2 = 100 */}
                            {showConstraints.c1 && (
                                <g>
                                    <line
                                        x1={scaleX(0)}
                                        y1={scaleY(100)}
                                        x2={scaleX(50)}
                                        y2={scaleY(0)}
                                        stroke="#ef4444"
                                        strokeWidth="2.2"
                                    />
                                    <text
                                        x={scaleX(36)}
                                        y={scaleY(28) - 12}
                                        className="text-[10px] font-semibold fill-red-600 dark:fill-red-400"
                                        transform={`rotate(-40, ${scaleX(36)}, ${scaleY(28) - 12})`}
                                    >
                                        R1: 2x₁ + x₂ ≤ 100 (Maquinado)
                                    </text>
                                </g>
                            )}

                            {/* Constraint 2: x1 + x2 = 80 */}
                            {showConstraints.c2 && (
                                <g>
                                    <line
                                        x1={scaleX(0)}
                                        y1={scaleY(80)}
                                        x2={scaleX(80)}
                                        y2={scaleY(0)}
                                        stroke="#f59e0b"
                                        strokeWidth="2.2"
                                    />
                                    <text
                                        x={scaleX(15)}
                                        y={scaleY(65) - 8}
                                        className="text-[10px] font-semibold fill-amber-600 dark:fill-amber-400"
                                        transform={`rotate(-32, ${scaleX(15)}, ${scaleY(65) - 8})`}
                                    >
                                        R2: x₁ + x₂ ≤ 80 (Ensamble)
                                    </text>
                                </g>
                            )}

                            {/* Constraint 3: x1 = 40 */}
                            {showConstraints.c3 && (
                                <g>
                                    <line
                                        x1={scaleX(40)}
                                        y1={scaleY(0)}
                                        x2={scaleX(40)}
                                        y2={scaleY(105)}
                                        stroke="#8b5cf6"
                                        strokeWidth="2.2"
                                        strokeDasharray="4 2"
                                    />
                                    <text
                                        x={scaleX(40) + 6}
                                        y={scaleY(95)}
                                        className="text-[10px] font-semibold fill-purple-600 dark:fill-purple-400"
                                    >
                                        R3: x₁ ≤ 40 (Demanda)
                                    </text>
                                </g>
                            )}

                            {/* Dynamic Isoprofit Line: 30*x1 + 20*x2 = Z */}
                            {isoprofitEndpoints.valid && (
                                <g>
                                    <line
                                        x1={isoprofitEndpoints.x1}
                                        y1={isoprofitEndpoints.y1}
                                        x2={isoprofitEndpoints.x2}
                                        y2={isoprofitEndpoints.y2}
                                        stroke={
                                            status.type === "optimal"
                                                ? "#10b981"
                                                : status.type === "feasible"
                                                    ? "#2563eb"
                                                    : "#f43f5e"
                                        }
                                        strokeWidth={status.type === "optimal" ? "3.5" : "2.5"}
                                        strokeDasharray={status.type === "optimal" ? "none" : "5 3"}
                                    />
                                    {/* Isoprofit Label */}
                                    <g transform={`translate(${Math.min(isoprofitEndpoints.x1, isoprofitEndpoints.x2) + 20}, ${Math.max(isoprofitEndpoints.y1, isoprofitEndpoints.y2) - 15})`}>
                                        <rect
                                            x="-6"
                                            y="-14"
                                            width="116"
                                            height="20"
                                            rx="4"
                                            fill={status.type === "optimal" ? "#10b981" : "#1e293b"}
                                            className="shadow-md"
                                        />
                                        <text
                                            x="52"
                                            y="0"
                                            textAnchor="middle"
                                            className="text-[10px] font-bold fill-white font-mono"
                                        >
                                            Z = 30x₁ + 20x₂ = ${zValue}
                                        </text>
                                    </g>
                                </g>
                            )}

                            {/* Extreme Vertices (Points of the Feasible Polygon) */}
                            {vertices.map(vertex => {
                                const isSelected = selectedVertexId === vertex.id
                                const isOpt = vertex.isOptimal
                                const vx = scaleX(vertex.x1)
                                const vy = scaleY(vertex.x2)

                                return (
                                    <g
                                        key={vertex.id}
                                        className="cursor-pointer group"
                                        onClick={() => {
                                            setSelectedVertexId(vertex.id)
                                            setZValue(vertex.z)
                                        }}
                                    >
                                        {/* Outer pulse when optimal */}
                                        {isOpt && (
                                            <circle
                                                cx={vx}
                                                cy={vy}
                                                r="14"
                                                className="fill-emerald-400/30 animate-ping"
                                            />
                                        )}
                                        {/* Click target aura */}
                                        <circle
                                            cx={vx}
                                            cy={vy}
                                            r={isSelected ? "11" : "8"}
                                            className={
                                                isSelected
                                                    ? "fill-brand-blue/30 stroke-brand-blue stroke-2"
                                                    : "fill-transparent hover:fill-slate-300/40"
                                            }
                                        />
                                        {/* Center core */}
                                        <circle
                                            cx={vx}
                                            cy={vy}
                                            r={isOpt ? "6.5" : "5"}
                                            className={
                                                isOpt
                                                    ? "fill-emerald-500 stroke-white stroke-2"
                                                    : isSelected
                                                        ? "fill-brand-blue stroke-white stroke-2"
                                                        : "fill-slate-800 dark:fill-white stroke-slate-500 stroke-1"
                                            }
                                        />
                                        {/* Label */}
                                        <text
                                            x={vx + (vertex.x1 === 0 ? 12 : vertex.x1 === 40 ? -12 : 0)}
                                            y={vy + (vertex.x2 === 0 ? -12 : vertex.x2 === 80 ? 16 : -12)}
                                            textAnchor={vertex.x1 === 40 ? "end" : vertex.x1 === 0 ? "start" : "middle"}
                                            className={`text-[11px] font-bold ${
                                                isOpt
                                                    ? "fill-emerald-600 dark:fill-emerald-400"
                                                    : isSelected
                                                        ? "fill-brand-blue"
                                                        : "fill-slate-700 dark:fill-slate-300"
                                            }`}
                                        >
                                            {vertex.id}: ({vertex.x1}, {vertex.x2})
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>

                    {/* Constraint Toggles */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
                        <span className="text-slate-500 flex items-center gap-1 font-medium">
                            <Layers className="h-3.5 w-3.5" /> Restricciones activables:
                        </span>
                        <label className="flex items-center gap-1.5 cursor-pointer text-red-600 dark:text-red-400 font-medium">
                            <input
                                type="checkbox"
                                checked={showConstraints.c1}
                                onChange={e => setShowConstraints(prev => ({ ...prev, c1: e.target.checked }))}
                                className="rounded text-red-600 focus:ring-red-500"
                            />
                            R1: Maquinado (≤100)
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-amber-600 dark:text-amber-400 font-medium">
                            <input
                                type="checkbox"
                                checked={showConstraints.c2}
                                onChange={e => setShowConstraints(prev => ({ ...prev, c2: e.target.checked }))}
                                className="rounded text-amber-600 focus:ring-amber-500"
                            />
                            R2: Ensamble (≤80)
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-purple-600 dark:text-purple-400 font-medium">
                            <input
                                type="checkbox"
                                checked={showConstraints.c3}
                                onChange={e => setShowConstraints(prev => ({ ...prev, c3: e.target.checked }))}
                                className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            R3: Demanda x₁ (≤40)
                        </label>
                    </div>
                </div>

                {/* Right Interactive Controls & Analytics */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
                    {/* Z-Slider Controls */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Zap className="h-4 w-4 text-brand-blue" />
                                Valor de Ganancia (Z):
                            </label>
                            <span className="font-mono text-xl font-extrabold text-brand-blue px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900">
                                ${zValue}
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="2400"
                            step="25"
                            value={zValue}
                            onChange={e => {
                                const val = Number(e.target.value)
                                setZValue(val)
                                // If close to a vertex, highlight it
                                const closeV = vertices.find(v => Math.abs(v.z - val) <= 25)
                                setSelectedVertexId(closeV ? closeV.id : null)
                            }}
                            className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                        />

                        <div className="flex justify-between text-xs text-slate-500 font-mono">
                            <span>$0</span>
                            <span className="text-emerald-600 font-bold">$1,800 (Óptimo)</span>
                            <span>$2,400</span>
                        </div>

                        {/* Status Alert */}
                        <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                            status.type === "optimal"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/60 dark:text-emerald-300"
                                : status.type === "feasible"
                                    ? "bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950/30 dark:border-sky-800/60 dark:text-sky-300"
                                    : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800/60 dark:text-rose-300"
                        }`}>
                            <div className="flex items-center gap-2 font-bold text-sm mb-1">
                                {status.type === "optimal" ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                ) : status.type === "feasible" ? (
                                    <Info className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                                ) : (
                                    <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                                )}
                                {status.title}
                            </div>
                            <p>{status.description}</p>
                        </div>
                    </div>

                    {/* Vértice Inspector */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                <TableIcon className="h-3.5 w-3.5 text-slate-500" />
                                Vértices Factibles (Puntos Extremos)
                            </span>
                            <span className="text-[11px] text-slate-500">Haz clic para evaluar</span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                            {vertices.map(v => (
                                <button
                                    key={v.id}
                                    onClick={() => {
                                        setSelectedVertexId(v.id)
                                        setZValue(v.z)
                                    }}
                                    className={`py-2 px-1 text-center rounded-lg border text-xs font-mono font-bold transition-all ${
                                        selectedVertexId === v.id
                                            ? "border-brand-blue bg-brand-blue text-white shadow-md scale-105"
                                            : v.isOptimal
                                                ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500"
                                                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                                    }`}
                                >
                                    <div>{v.id}</div>
                                    <div className="text-[10px] opacity-80">${v.z}</div>
                                </button>
                            ))}
                        </div>

                        {/* Selected Vertex Detailed Analysis */}
                        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs space-y-2">
                            <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                                <span>{selectedVertex.name}</span>
                                <span className="font-mono text-brand-blue">
                                    ({selectedVertex.x1}, {selectedVertex.x2}) → Z = ${selectedVertex.z}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                                {selectedVertex.description}
                            </p>
                            {/* Slacks Table */}
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2 text-center text-[10px]">
                                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 block">Holgura R1 (s₁)</span>
                                    <span className={`font-mono font-bold ${selectedVertex.s1 === 0 ? "text-red-500" : "text-emerald-600"}`}>
                                        {selectedVertex.s1 === 0 ? "0 (Activa)" : `${selectedVertex.s1} h`}
                                    </span>
                                </div>
                                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 block">Holgura R2 (s₂)</span>
                                    <span className={`font-mono font-bold ${selectedVertex.s2 === 0 ? "text-red-500" : "text-emerald-600"}`}>
                                        {selectedVertex.s2 === 0 ? "0 (Activa)" : `${selectedVertex.s2} h`}
                                    </span>
                                </div>
                                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                    <span className="text-slate-500 block">Holgura R3 (s₃)</span>
                                    <span className={`font-mono font-bold ${selectedVertex.s3 === 0 ? "text-red-500" : "text-emerald-600"}`}>
                                        {selectedVertex.s3 === 0 ? "0 (Activa)" : `${selectedVertex.s3} u`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mathematical Summary Card */}
                    <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/50 text-[11px] text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-900 dark:text-slate-200 block mb-1">
                            Teorema Fundamental de la PL (Dantzig, 1947):
                        </strong>
                        La solución óptima siempre se encuentra en uno de los vértices extremos del poliedro convexo. En este caso, el vértice <span className="font-semibold text-emerald-600 dark:text-emerald-400">C (20, 60)</span> agota exactamente el 100% de la capacidad de maquinado y ensamble ($s_1 = 0, s_2 = 0$), maximizando el beneficio industrial.
                    </div>
                </div>
            </div>
        </div>
    )
}
