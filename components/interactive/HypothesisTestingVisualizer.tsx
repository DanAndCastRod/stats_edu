"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Activity,
    CheckCircle2,
    XCircle,
    Info,
    RotateCcw,
    Sliders,
    ArrowRightLeft,
    TrendingUp,
    Scale,
    AlertTriangle,
    FlaskConical
} from "lucide-react"

type TestDirection = "two-tailed" | "right-tailed" | "left-tailed"

// Normal PDF function
function normalPDF(z: number): number {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z)
}

// Standard Normal CDF approximation (Abramowitz and Stegun)
function normalCDF(z: number): number {
    const b1 = 0.319381530
    const b2 = -0.356563782
    const b3 = 1.781477937
    const b4 = -1.821255978
    const b5 = 1.330274429
    const p = 0.2316419
    const c = 0.39894228

    if (z >= 0.0) {
        const t = 1.0 / (1.0 + p * z)
        return 1.0 - c * Math.exp(-0.5 * z * z) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)
    } else {
        const t = 1.0 / (1.0 - p * z)
        return c * Math.exp(-0.5 * z * z) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)
    }
}

// Critical Z value calculation via numerical inversion
function getCriticalZ(alpha: number, direction: TestDirection): number {
    const targetP = direction === "two-tailed" ? 1 - alpha / 2 : 1 - alpha
    let low = 0
    let high = 5
    for (let i = 0; i < 30; i++) {
        const mid = (low + high) / 2
        if (normalCDF(mid) < targetP) {
            low = mid
        } else {
            high = mid
        }
    }
    return parseFloat(low.toFixed(3))
}

export function HypothesisTestingVisualizer() {
    // Interactive states
    const [direction, setDirection] = useState<TestDirection>("two-tailed")
    const [alpha, setAlpha] = useState<number>(0.05)
    const [zObserved, setZObserved] = useState<number>(2.15)
    const [showPValueArea, setShowPValueArea] = useState<boolean>(true)

    // Mathematical computations
    const zCrit = useMemo(() => getCriticalZ(alpha, direction), [alpha, direction])

    // Compute exact p-value based on direction and observed Z
    const pValue = useMemo(() => {
        if (direction === "two-tailed") {
            return 2 * (1 - normalCDF(Math.abs(zObserved)))
        } else if (direction === "right-tailed") {
            return 1 - normalCDF(zObserved)
        } else {
            return normalCDF(zObserved)
        }
    }, [zObserved, direction])

    // Decision rule
    const isRejected = useMemo(() => {
        if (direction === "two-tailed") {
            return Math.abs(zObserved) >= zCrit
        } else if (direction === "right-tailed") {
            return zObserved >= zCrit
        } else {
            return zObserved <= -zCrit
        }
    }, [zObserved, zCrit, direction])

    // Presets for rapid industrial engineering demonstrations
    const presets = [
        {
            title: "Control Calidad Probetas (UTP)",
            desc: "Bilateral: ¿La resistencia media de las probetas difiere de 500 MPa?",
            dir: "two-tailed" as TestDirection,
            a: 0.05,
            z: 2.15
        },
        {
            title: "Nuevo Aditivo Lubricante",
            desc: "Cola Derecha: ¿El nuevo aditivo incrementa la vida útil de los rodamientos?",
            dir: "right-tailed" as TestDirection,
            a: 0.01,
            z: 2.65
        },
        {
            title: "Reducción Tiempo de Ciclo",
            desc: "Cola Izquierda: ¿El rediseño celular redujo el tiempo de ensamble a menos de 45 min?",
            dir: "left-tailed" as TestDirection,
            a: 0.05,
            z: -1.45
        }
    ]

    // SVG Drawing constants
    const svgWidth = 620
    const svgHeight = 340
    const padX = 45
    const padTop = 30
    const padBottom = 50
    const plotW = svgWidth - padX * 2
    const plotH = svgHeight - padTop - padBottom

    const zMin = -3.8
    const zMax = 3.8
    const yMax = 0.42

    const scaleX = (z: number) => padX + ((z - zMin) / (zMax - zMin)) * plotW
    const scaleY = (y: number) => padTop + plotH - (y / yMax) * plotH

    // Sample normal curve points
    const curvePoints = useMemo(() => {
        const pts: { z: number; x: number; y: number }[] = []
        const steps = 150
        for (let i = 0; i <= steps; i++) {
            const z = zMin + (i / steps) * (zMax - zMin)
            const y = normalPDF(z)
            pts.push({ z, x: scaleX(z), y: scaleY(y) })
        }
        return pts
    }, [])

    const curvePathString = useMemo(() => {
        return curvePoints.map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(" ")
    }, [curvePoints])

    // Generate Polygon for Rejection Region(s)
    const rejectionPolygons = useMemo(() => {
        const polys: string[] = []

        // Left tail if two-tailed or left-tailed
        if (direction === "two-tailed" || direction === "left-tailed") {
            const leftCrit = -zCrit
            const leftPts = curvePoints.filter(p => p.z <= leftCrit)
            if (leftPts.length > 0) {
                const startX = scaleX(zMin)
                const endX = scaleX(leftCrit)
                const groundY = scaleY(0)
                const pathStr = [
                    `M ${startX} ${groundY}`,
                    ...leftPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${endX} ${scaleY(normalPDF(leftCrit))}`,
                    `L ${endX} ${groundY}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
        }

        // Right tail if two-tailed or right-tailed
        if (direction === "two-tailed" || direction === "right-tailed") {
            const rightCrit = zCrit
            const rightPts = curvePoints.filter(p => p.z >= rightCrit)
            if (rightPts.length > 0) {
                const startX = scaleX(rightCrit)
                const endX = scaleX(zMax)
                const groundY = scaleY(0)
                const pathStr = [
                    `M ${startX} ${groundY}`,
                    `L ${startX} ${scaleY(normalPDF(rightCrit))}`,
                    ...rightPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${endX} ${groundY}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
        }

        return polys
    }, [direction, zCrit, curvePoints])

    // Generate Polygon for P-Value shading (from observed Z outward)
    const pValuePolygons = useMemo(() => {
        if (!showPValueArea) return []
        const polys: string[] = []

        if (direction === "two-tailed") {
            const absZ = Math.abs(zObserved)
            // Left tail for -absZ
            const leftPts = curvePoints.filter(p => p.z <= -absZ)
            if (leftPts.length > 0) {
                const pathStr = [
                    `M ${scaleX(zMin)} ${scaleY(0)}`,
                    ...leftPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${scaleX(-absZ)} ${scaleY(normalPDF(-absZ))}`,
                    `L ${scaleX(-absZ)} ${scaleY(0)}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
            // Right tail for +absZ
            const rightPts = curvePoints.filter(p => p.z >= absZ)
            if (rightPts.length > 0) {
                const pathStr = [
                    `M ${scaleX(absZ)} ${scaleY(0)}`,
                    `L ${scaleX(absZ)} ${scaleY(normalPDF(absZ))}`,
                    ...rightPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${scaleX(zMax)} ${scaleY(0)}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
        } else if (direction === "right-tailed") {
            const rightPts = curvePoints.filter(p => p.z >= zObserved)
            if (rightPts.length > 0) {
                const pathStr = [
                    `M ${scaleX(zObserved)} ${scaleY(0)}`,
                    `L ${scaleX(zObserved)} ${scaleY(normalPDF(zObserved))}`,
                    ...rightPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${scaleX(zMax)} ${scaleY(0)}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
        } else {
            // Left-tailed
            const leftPts = curvePoints.filter(p => p.z <= zObserved)
            if (leftPts.length > 0) {
                const pathStr = [
                    `M ${scaleX(zMin)} ${scaleY(0)}`,
                    ...leftPts.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                    `L ${scaleX(zObserved)} ${scaleY(normalPDF(zObserved))}`,
                    `L ${scaleX(zObserved)} ${scaleY(0)}`,
                    "Z"
                ].join(" ")
                polys.push(pathStr)
            }
        }

        return polys
    }, [direction, zObserved, showPValueArea, curvePoints])

    return (
        <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                                Inferencia Estadística • UTP
                            </span>
                            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                                isRejected
                                    ? "bg-rose-500 text-white"
                                    : "bg-emerald-600 text-white"
                            }`}>
                                {isRejected ? "RECHAZAR H₀" : "NO RECHAZAR H₀"}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            Visualizador de Contraste de Hipótesis: Distribución Z y Valor-p
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                            {"Simula en tiempo real la región crítica de rechazo ($R_c$), evalúa la posición del estadístico muestral $Z_{obs}$ y compara el valor-$p$ frente al nivel de significancia $\\alpha$."}
                        </p>
                    </div>

                    {/* Preset buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setDirection("two-tailed")
                                setAlpha(0.05)
                                setZObserved(2.15)
                            }}
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Restablecer valores iniciales"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Scenario Presets Bar */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                        <FlaskConical className="h-3.5 w-3.5 text-indigo-500" /> Casos UTP:
                    </span>
                    {presets.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(p.dir)
                                setAlpha(p.a)
                                setZObserved(p.z)
                            }}
                            className="text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all font-medium"
                        >
                            {p.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
                {/* Visual Graphic Representation */}
                <div className="lg:col-span-7 p-6 flex flex-col items-center justify-center bg-slate-50/40 dark:bg-slate-950/40">
                    <div className="w-full max-w-full overflow-x-auto">
                        <svg
                            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            className="w-full h-auto select-none font-sans"
                            style={{ minWidth: "500px" }}
                        >
                            <defs>
                                {/* Pattern for P-value shading */}
                                <pattern id="pValueHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="0" x2="0" y2="8" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8" />
                                </pattern>
                            </defs>

                            {/* Base Axes */}
                            <line
                                x1={padX}
                                y1={scaleY(0)}
                                x2={padX + plotW}
                                y2={scaleY(0)}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-slate-400 dark:text-slate-600"
                            />

                            {/* Vertical Center Axis (Z = 0) */}
                            <line
                                x1={scaleX(0)}
                                y1={padTop}
                                x2={scaleX(0)}
                                y2={scaleY(0)}
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                                className="text-slate-300 dark:text-slate-700"
                            />

                            {/* Axis Ticks */}
                            {[-3, -2, -1, 0, 1, 2, 3].map(val => (
                                <g key={`tick-${val}`}>
                                    <line
                                        x1={scaleX(val)}
                                        y1={scaleY(0)}
                                        x2={scaleX(val)}
                                        y2={scaleY(0) + 6}
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        className="text-slate-500"
                                    />
                                    <text
                                        x={scaleX(val)}
                                        y={scaleY(0) + 20}
                                        textAnchor="middle"
                                        className="text-[11px] font-mono fill-slate-500"
                                    >
                                        {val > 0 ? `+${val}` : val}
                                    </text>
                                </g>
                            ))}

                            {/* Shaded Acceptance / Non-Rejection Region Area */}
                            <path
                                d={[
                                    `M ${scaleX(zMin)} ${scaleY(0)}`,
                                    ...curvePoints.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
                                    `L ${scaleX(zMax)} ${scaleY(0)}`,
                                    "Z"
                                ].join(" ")}
                                fill="#0ea5e9"
                                fillOpacity="0.12"
                            />

                            {/* Shaded Rejection Regions (Red/Rose) */}
                            {rejectionPolygons.map((polyPath, idx) => (
                                <path
                                    key={`rej-${idx}`}
                                    d={polyPath}
                                    fill="#f43f5e"
                                    fillOpacity="0.45"
                                    stroke="#e11d48"
                                    strokeWidth="1.5"
                                />
                            ))}

                            {/* P-Value Overlay Shading (Hatched Gold) */}
                            {pValuePolygons.map((polyPath, idx) => (
                                <path
                                    key={`pval-${idx}`}
                                    d={polyPath}
                                    fill="url(#pValueHatch)"
                                    stroke="#d97706"
                                    strokeWidth="1.2"
                                />
                            ))}

                            {/* Standard Normal Curve Outline */}
                            <path
                                d={curvePathString}
                                fill="none"
                                stroke="#334155"
                                strokeWidth="2.4"
                                className="dark:stroke-slate-200"
                            />

                            {/* Critical Value Boundary Lines */}
                            {(direction === "two-tailed" || direction === "left-tailed") && (
                                <g>
                                    <line
                                        x1={scaleX(-zCrit)}
                                        y1={padTop + 15}
                                        x2={scaleX(-zCrit)}
                                        y2={scaleY(0)}
                                        stroke="#e11d48"
                                        strokeWidth="2"
                                        strokeDasharray="4 2"
                                    />
                                    <text
                                        x={scaleX(-zCrit)}
                                        y={padTop + 8}
                                        textAnchor="middle"
                                        className="text-[10px] font-bold font-mono fill-rose-600 dark:fill-rose-400"
                                    >
                                        -z_crit = -{zCrit}
                                    </text>
                                </g>
                            )}

                            {(direction === "two-tailed" || direction === "right-tailed") && (
                                <g>
                                    <line
                                        x1={scaleX(zCrit)}
                                        y1={padTop + 15}
                                        x2={scaleX(zCrit)}
                                        y2={scaleY(0)}
                                        stroke="#e11d48"
                                        strokeWidth="2"
                                        strokeDasharray="4 2"
                                    />
                                    <text
                                        x={scaleX(zCrit)}
                                        y={padTop + 8}
                                        textAnchor="middle"
                                        className="text-[10px] font-bold font-mono fill-rose-600 dark:fill-rose-400"
                                    >
                                        +z_crit = +{zCrit}
                                    </text>
                                </g>
                            )}

                            {/* Observed Statistic Line (Prominent Marker) */}
                            <g>
                                <line
                                    x1={scaleX(zObserved)}
                                    y1={scaleY(0)}
                                    x2={scaleX(zObserved)}
                                    y2={scaleY(normalPDF(zObserved)) - 32}
                                    stroke={isRejected ? "#e11d48" : "#10b981"}
                                    strokeWidth="3"
                                />
                                {/* Flag / Tag */}
                                <g transform={`translate(${scaleX(zObserved)}, ${scaleY(normalPDF(zObserved)) - 34})`}>
                                    <rect
                                        x="-46"
                                        y="-20"
                                        width="92"
                                        height="22"
                                        rx="5"
                                        fill={isRejected ? "#e11d48" : "#059669"}
                                        className="shadow-lg"
                                    />
                                    <text
                                        x="0"
                                        y="-5"
                                        textAnchor="middle"
                                        className="text-[11px] font-bold font-mono fill-white"
                                    >
                                        Z_obs = {zObserved > 0 ? `+${zObserved.toFixed(2)}` : zObserved.toFixed(2)}
                                    </text>
                                </g>
                                <circle
                                    cx={scaleX(zObserved)}
                                    cy={scaleY(normalPDF(zObserved))}
                                    r="5.5"
                                    fill={isRejected ? "#e11d48" : "#059669"}
                                    stroke="white"
                                    strokeWidth="2"
                                />
                            </g>

                            {/* Legend in SVG */}
                            <g transform={`translate(${padX}, ${padTop + plotH + 34})`}>
                                <rect x="0" y="-8" width="12" height="12" fill="#0ea5e9" fillOpacity="0.25" stroke="#0ea5e9" />
                                <text x="18" y="2" className="text-[10px] font-medium fill-slate-600 dark:fill-slate-400">
                                    Región de Aceptación (1 - α)
                                </text>

                                <rect x="180" y="-8" width="12" height="12" fill="#f43f5e" fillOpacity="0.5" stroke="#e11d48" />
                                <text x="198" y="2" className="text-[10px] font-medium fill-rose-600 dark:fill-rose-400">
                                    Región de Rechazo (α)
                                </text>

                                <rect x="340" y="-8" width="12" height="12" fill="url(#pValueHatch)" stroke="#d97706" />
                                <text x="358" y="2" className="text-[10px] font-medium fill-amber-700 dark:fill-amber-400">
                                    Área Valor-p ({pValue < 0.0001 ? "< 0.0001" : pValue.toFixed(4)})
                                </text>
                            </g>
                        </svg>
                    </div>

                    {/* P-value Toggle */}
                    <div className="mt-3 flex items-center justify-center gap-4 text-xs">
                        <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                            <input
                                type="checkbox"
                                checked={showPValueArea}
                                onChange={e => setShowPValueArea(e.target.checked)}
                                className="rounded text-amber-500 focus:ring-amber-400"
                            />
                            Mostrar sombreado del Valor-p (Rayas doradas)
                        </label>
                    </div>
                </div>

                {/* Right Interactive Controls Panel */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
                    {/* Direction and Alpha Controls */}
                    <div className="space-y-4">
                        {/* Test Direction Selector */}
                        <div>
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                                <ArrowRightLeft className="h-3.5 w-3.5 text-indigo-500" />
                                Tipo de Prueba de Hipótesis (H₁)
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                                <button
                                    onClick={() => setDirection("two-tailed")}
                                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                                        direction === "two-tailed"
                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold"
                                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    Bilateral (≠)
                                </button>
                                <button
                                    onClick={() => setDirection("right-tailed")}
                                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                                        direction === "right-tailed"
                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold"
                                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    Cola Derecha (&gt;)
                                </button>
                                <button
                                    onClick={() => setDirection("left-tailed")}
                                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all ${
                                        direction === "left-tailed"
                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold"
                                            : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    Cola Izq. (&lt;)
                                </button>
                            </div>
                        </div>

                        {/* Alpha Level Selector & Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <Scale className="h-3.5 w-3.5 text-indigo-500" />
                                    Nivel de Significancia (α):
                                </label>
                                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                    {(alpha * 100).toFixed(1)}% (α = {alpha})
                                </span>
                            </div>

                            {/* Quick Buttons */}
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                {[0.01, 0.05, 0.10].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setAlpha(val)}
                                        className={`py-1.5 text-xs font-mono font-semibold rounded-md border transition-all ${
                                            alpha === val
                                                ? "border-indigo-600 bg-indigo-600 text-white"
                                                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                                        }`}
                                    >
                                        α = {val} ({val * 100}%)
                                    </button>
                                ))}
                            </div>

                            <input
                                type="range"
                                min="0.005"
                                max="0.15"
                                step="0.005"
                                value={alpha}
                                onChange={e => setAlpha(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                        </div>

                        {/* Observed Z Slider */}
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                                    Estadístico de Prueba (Z_obs):
                                </label>
                                <span className={`font-mono text-base font-extrabold px-2.5 py-0.5 rounded-md border ${
                                    isRejected
                                        ? "bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/60 dark:border-rose-900"
                                        : "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-900"
                                }`}>
                                    {zObserved > 0 ? `+${zObserved.toFixed(2)}` : zObserved.toFixed(2)}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="-3.5"
                                max="3.5"
                                step="0.05"
                                value={zObserved}
                                onChange={e => setZObserved(parseFloat(e.target.value))}
                                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                                <span>-3.50</span>
                                <span>0.00 (μ₀)</span>
                                <span>+3.50</span>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Decision Matrix Card */}
                    <div className={`p-4 rounded-xl border transition-all ${
                        isRejected
                            ? "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/60"
                            : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60"
                    }`}>
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                            {isRejected ? (
                                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                            ) : (
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            <span className={isRejected ? "text-rose-800 dark:text-rose-200" : "text-emerald-800 dark:text-emerald-200"}>
                                {isRejected
                                    ? "Decisión: Se RECHAZA la Hipótesis Nula (H₀)"
                                    : "Decisión: NO se Rechaza la Hipótesis Nula (H₀)"
                                }
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                            <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
                                <span className="text-slate-500 block text-[10px]">Criterio Z Crítico:</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    |Z_obs| {Math.abs(zObserved) >= zCrit ? "≥" : "<"} Z_crit ({zCrit})
                                </span>
                            </div>
                            <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
                                <span className="text-slate-500 block text-[10px]">Criterio Valor-p:</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    p = {pValue < 0.0001 ? "< 0.0001" : pValue.toFixed(4)} {pValue <= alpha ? "≤" : ">"} α ({alpha})
                                </span>
                            </div>
                        </div>

                        <p className={`text-xs leading-relaxed ${
                            isRejected ? "text-rose-700 dark:text-rose-300" : "text-emerald-700 dark:text-emerald-300"
                        }`}>
                            {isRejected ? (
                                <>
                                    <strong>Conclusión:</strong> Existe evidencia estadística suficiente con un nivel de significancia del <strong>{(alpha * 100).toFixed(0)}%</strong> para rechazar $H_0$. El valor observado es tan extremo que es sumamente improbable que se deba a fluctuaciones aleatorias de muestreo.
                                </>
                            ) : (
                                <>
                                    <strong>Conclusión:</strong> No existe evidencia estadística suficiente para rechazar $H_0$ al nivel $\alpha = {alpha}$. La discrepancia observada entre el estimador y el valor hipotético es compatible con la variación natural del proceso.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Educational Note */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                            Fórmula del Estadístico Z (Muestra Normal o n ≥ 30):
                        </span>
                        <div className="font-mono text-center my-1 text-slate-800 dark:text-slate-200">
                            {"Z_obs = (X̄ - μ₀) / (σ / √n)"}
                        </div>
                        <p className="mt-1">
                            Mide cuántos errores estándar se aleja la media muestral X̄ del valor nulo μ₀. Si cae en la zona sombreada roja, la hipótesis nula se descarta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
