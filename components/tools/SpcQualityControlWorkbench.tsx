"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    Sliders,
    Layers,
    CheckCircle2,
    AlertTriangle,
    ShieldAlert,
    BarChart3,
    Download,
    Copy,
    Check,
    RotateCcw,
    Gauge,
    TrendingUp
} from "lucide-react"
import { calculateSPCXR, SPCSubgroup, SPCXRResult } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp, formatMarkdownTable } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

const DEFAULT_SUBGROUPS: SPCSubgroup[] = [
    { subgroupId: 1, values: [50.02, 50.01, 49.98, 50.04, 50.00] },
    { subgroupId: 2, values: [49.99, 50.03, 50.02, 50.01, 49.97] },
    { subgroupId: 3, values: [50.05, 50.02, 50.01, 50.06, 50.04] },
    { subgroupId: 4, values: [49.98, 49.97, 50.00, 50.02, 49.99] },
    { subgroupId: 5, values: [50.01, 50.03, 50.00, 49.99, 50.02] },
    { subgroupId: 6, values: [50.04, 50.07, 50.05, 50.06, 50.03] },
    { subgroupId: 7, values: [49.96, 49.98, 50.01, 49.99, 50.00] },
    { subgroupId: 8, values: [50.02, 50.00, 50.03, 50.01, 50.02] },
    { subgroupId: 9, values: [50.03, 50.05, 50.04, 50.02, 50.06] },
    { subgroupId: 10, values: [49.99, 50.01, 49.98, 50.02, 50.00] }
]

export function SpcQualityControlWorkbench() {
    const [subgroups, setSubgroups] = useState<SPCSubgroup[]>(DEFAULT_SUBGROUPS)
    const [lsl, setLsl] = useState<number>(49.90)
    const [usl, setUsl] = useState<number>(50.15)
    const [target, setTarget] = useState<number>(50.00)
    const [copied, setCopied] = useState<boolean>(false)

    const results: SPCXRResult = useMemo(() => {
        return calculateSPCXR(subgroups, { lsl, usl, target })
    }, [subgroups, lsl, usl, target])

    const handleReset = () => {
        setSubgroups(DEFAULT_SUBGROUPS)
        setLsl(49.90)
        setUsl(50.15)
        setTarget(50.00)
    }

    const handleExportCSV = () => {
        const rows: (string | number)[][] = [
            ["=== CONTROL ESTADÍSTICO DE PROCESOS (SPC) - GRÁFICOS X-BAR Y R ==="],
            ["Fecha de Exportación", new Date().toLocaleString("es-CO")],
            ["Universidad", "Universidad Tecnológica de Pereira - Ingeniería Industrial"],
            [],
            ["1. PARÁMETROS DE ESPECIFICACIÓN Y CAPACIDAD"],
            ["Límite Inferior de Especificación (LSL)", lsl],
            ["Valor Nominal / Objetivo (Target)", target],
            ["Límite Superior de Especificación (USL)", usl],
            ["Número de Subgrupos (k)", results.subgroupCount],
            ["Tamaño de Muestra por Subgrupo (n)", results.sampleSize],
            [],
            ["2. LÍMITES DE CONTROL SHEWHART"],
            ["Media Global (X-doble-barra)", results.xDoubleBar],
            ["Rango Medio (R-barra)", results.rBar],
            ["Estimación de Sigma (sigma-hat = R-bar / d2)", results.sigmaHat],
            ["X-bar UCL", results.xBarChart.ucl],
            ["X-bar CL", results.xBarChart.cl],
            ["X-bar LCL", results.xBarChart.lcl],
            ["R UCL", results.rChart.ucl],
            ["R CL", results.rChart.cl],
            ["R LCL", results.rChart.lcl],
            [],
            ["3. ÍNDICES DE CAPACIDAD DE PROCESO"],
            ["Índice Cp", results.capability?.cp ?? "N/A"],
            ["Índice Cpk", results.capability?.cpk ?? "N/A"],
            ["Índice Cpl", results.capability?.cpl ?? "N/A"],
            ["Índice Cpu", results.capability?.cpu ?? "N/A"],
            ["Índice Cpm (Taguchi)", results.capability?.cpm ?? "N/A"],
            ["PPM Defectuosos Estimados", results.capability?.ppmDefect ?? "N/A"],
            ["Nivel Sigma Estimado", results.capability?.sigmaLevel ?? "N/A"],
            [],
            ["4. DETALLE DE SUBGRUPOS OBSERVADOS"],
            ["Subgrupo", "Media (X-bar)", "Rango (R)", "Estado X-bar", "Estado R", "Valores Muestrales"],
            ...subgroups.map((sg, idx) => [
                sg.subgroupId,
                results.xMeans[idx],
                results.rValues[idx],
                results.xBarChart.outOfControl.includes(sg.subgroupId) ? "FUERA DE CONTROL" : "Bajo Control",
                results.rChart.outOfControl.includes(sg.subgroupId) ? "FUERA DE CONTROL" : "Bajo Control",
                sg.values.join(" | ")
            ])
        ]

        downloadCsvFile(`SPC_Control_Calidad_${getExportTimestamp()}.csv`, rows)
    }

    const handleCopySummary = async () => {
        const headers = ["Indicador", "Valor Calculado", "Criterio de Calidad"]
        const rows = [
            ["Media Global X-barra", `${results.xDoubleBar}`, "Centramiento del proceso"],
            ["Rango Medio R-barra", `${results.rBar}`, "Variabilidad muestral"],
            ["Sigma Proceso (σ̂)", `${results.sigmaHat}`, "Dispersión natural a corto plazo"],
            ["Límites X-bar", `[LCL: ${results.xBarChart.lcl}, UCL: ${results.xBarChart.ucl}]`, "Límites a ±3σ"],
            ["Límites Rango R", `[LCL: ${results.rChart.lcl}, UCL: ${results.rChart.ucl}]`, "Límites Shewhart D3/D4"],
            ["Capacidad Cp", `${results.capability?.cp}`, results.capability && results.capability.cp >= 1.33 ? "Proceso Capaz (≥1.33)" : "Proceso No Adecuado (<1.33)"],
            ["Capacidad Real Cpk", `${results.capability?.cpk}`, results.capability && results.capability.cpk >= 1.33 ? "Centrado y Capaz" : "Riesgo de Defectos (<1.33)"],
            ["Fracción Defectuosa", `${results.capability?.ppmDefect} PPM`, "Partes por millón fuera de LSL-USL"],
            ["Nivel Sigma", `${results.capability?.sigmaLevel} σ`, "Nivel de madurez 6-Sigma"]
        ]

        const text = `# Reporte Ejecutivo: Control Estadístico de Calidad y Capacidad (SPC)\n**Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial**\n\n` +
            formatMarkdownTable(headers, rows) +
            `\n\n*Puntos fuera de control en X-bar:* ${results.xBarChart.outOfControl.length === 0 ? "Ninguno (Proceso en control estadístico)" : results.xBarChart.outOfControl.join(", ")}`

        const ok = await copyToClipboard(text)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // Chart Coordinates for X-bar SVG
    const svgWidth = 650
    const svgHeight = 220
    const padX = 45
    const padY = 25
    const graphW = svgWidth - padX * 2
    const graphH = svgHeight - padY * 2

    const allXVals = [...results.xMeans, results.xBarChart.ucl, results.xBarChart.lcl, lsl, usl]
    const minX = Math.min(...allXVals) - 0.02
    const maxX = Math.max(...allXVals) + 0.02
    const rangeX = maxX - minX || 0.1

    const getXCoord = (idx: number) => padX + (idx / (results.subgroupCount - 1 || 1)) * graphW
    const getYCoord = (val: number) => padY + graphH - ((val - minX) / rangeX) * graphH

    return (
        <div className="space-y-6">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                            <Activity className="w-5 h-5" />
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Workbench de Control Estadístico de Procesos (SPC)
                        </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Gráficos Shewhart X̄ - R, análisis de estabilidad y cálculo de índices de capacidad (Cp, Cpk, Cpm, PPM, Nivel Sigma).
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
                        title="Descargar datos y límites en formato CSV"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                    </button>
                    <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
                        title="Copiar tabla resumen para informes técnicos"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "¡Copiado!" : "Copiar Resumen"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                        title="Restablecer subgrupos por defecto"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Media X̄</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{results.xDoubleBar}</div>
                    <span className="text-[10px] text-slate-500">Línea Central</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Rango R̄</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{results.rBar}</div>
                    <span className="text-[10px] text-slate-500">Amplitud media</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Sigma σ̂</span>
                    <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">{results.sigmaHat}</div>
                    <span className="text-[10px] text-slate-500">R̄ / d₂</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Índice Cp</span>
                    <div className={`text-xl font-black mt-0.5 ${results.capability && results.capability.cp >= 1.33 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                        {results.capability?.cp ?? "N/A"}
                    </div>
                    <span className="text-[10px] text-slate-500">Potencial (≥ 1.33)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Índice Cpk</span>
                    <div className={`text-xl font-black mt-0.5 ${results.capability && results.capability.cpk >= 1.33 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {results.capability?.cpk ?? "N/A"}
                    </div>
                    <span className="text-[10px] text-slate-500">Real Centrado</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Nivel Sigma</span>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {results.capability?.sigmaLevel ?? "N/A"} σ
                    </div>
                    <span className="text-[10px] text-slate-500">{results.capability?.ppmDefect.toLocaleString()} PPM</span>
                </div>
            </div>

            {/* Main Interactive Controls & Graphics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Specifications and Subgroup Editor Form */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            <Sliders className="w-4 h-4 text-blue-600" />
                            Límites de Ingeniería
                        </div>

                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Límite Inferior de Especificación (LSL):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={lsl}
                                    onChange={(e) => setLsl(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Objetivo Nominal (Target):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={target}
                                    onChange={(e) => setTarget(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Límite Superior de Especificación (USL):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={usl}
                                    onChange={(e) => setUsl(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Diagnostic Alert */}
                        <div className="pt-2">
                            {results.xBarChart.outOfControl.length === 0 ? (
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Proceso Estable:</span> Todos los subgrupos operan dentro de los límites de control estadístico (±3σ).
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
                                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Causas Asignables:</span> Subgrupos {results.xBarChart.outOfControl.join(", ")} fuera de control en gráfico X̄.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mathematical Formulas Card */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-blue-600" />
                            Modelos Matemáticos Shewhart
                        </div>
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                            <div><MathFormula formula="UCL_{\bar{X}} = \bar{\bar{X}} + A_2 \bar{R}" /></div>
                            <div><MathFormula formula="LCL_{\bar{X}} = \bar{\bar{X}} - A_2 \bar{R}" /></div>
                            <div><MathFormula formula="C_p = \frac{USL - LSL}{6\hat{\sigma}}, \quad \hat{\sigma} = \frac{\bar{R}}{d_2}" /></div>
                            <div><MathFormula formula="C_{pk} = \min\left( \frac{USL - \bar{\bar{X}}}{3\hat{\sigma}}, \frac{\bar{\bar{X}} - LSL}{3\hat{\sigma}} \right)" /></div>
                        </div>
                    </div>
                </div>

                {/* SVG Shewhart Chart */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-600" />
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                Gráfico de Control X̄ (Media por Subgrupo)
                            </h4>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono">
                            <span className="flex items-center gap-1 text-rose-600 font-bold">
                                <span className="w-2.5 h-0.5 bg-rose-500 inline-block"></span> UCL: {results.xBarChart.ucl}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600 font-bold">
                                <span className="w-2.5 h-0.5 bg-blue-500 inline-block"></span> CL: {results.xBarChart.cl}
                            </span>
                            <span className="flex items-center gap-1 text-rose-600 font-bold">
                                <span className="w-2.5 h-0.5 bg-rose-500 inline-block"></span> LCL: {results.xBarChart.lcl}
                            </span>
                        </div>
                    </div>

                    {/* SVG Visualization */}
                    <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                            {/* Grid Lines */}
                            <line x1={padX} y1={padY} x2={padX + graphW} y2={padY} stroke="#cbd5e1" strokeDasharray="3 3" />
                            <line x1={padX} y1={padY + graphH} x2={padX + graphW} y2={padY + graphH} stroke="#cbd5e1" strokeDasharray="3 3" />

                            {/* Limits */}
                            {/* UCL */}
                            <line
                                x1={padX}
                                y1={getYCoord(results.xBarChart.ucl)}
                                x2={padX + graphW}
                                y2={getYCoord(results.xBarChart.ucl)}
                                stroke="#e11d48"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                            />
                            {/* CL */}
                            <line
                                x1={padX}
                                y1={getYCoord(results.xBarChart.cl)}
                                x2={padX + graphW}
                                y2={getYCoord(results.xBarChart.cl)}
                                stroke="#2563eb"
                                strokeWidth="2"
                            />
                            {/* LCL */}
                            <line
                                x1={padX}
                                y1={getYCoord(results.xBarChart.lcl)}
                                x2={padX + graphW}
                                y2={getYCoord(results.xBarChart.lcl)}
                                stroke="#e11d48"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                            />

                            {/* Data Path */}
                            <polyline
                                fill="none"
                                stroke="#0f172a"
                                className="dark:stroke-slate-200"
                                strokeWidth="2"
                                points={results.xMeans.map((m, idx) => `${getXCoord(idx)},${getYCoord(m)}`).join(" ")}
                            />

                            {/* Data Points */}
                            {results.xMeans.map((m, idx) => {
                                const cx = getXCoord(idx)
                                const cy = getYCoord(m)
                                const isOut = results.xBarChart.outOfControl.includes(idx + 1)

                                return (
                                    <g key={idx}>
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={isOut ? "6" : "4"}
                                            fill={isOut ? "#e11d48" : "#2563eb"}
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                        />
                                        <text
                                            x={cx}
                                            y={cy - 8}
                                            textAnchor="middle"
                                            fontSize="9"
                                            fontFamily="monospace"
                                            fill={isOut ? "#e11d48" : "#64748b"}
                                            fontWeight={isOut ? "bold" : "normal"}
                                        >
                                            {m}
                                        </text>
                                        <text
                                            x={cx}
                                            y={padY + graphH + 15}
                                            textAnchor="middle"
                                            fontSize="9"
                                            fontFamily="sans-serif"
                                            fill="#94a3b8"
                                        >
                                            S{idx + 1}
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>

                    {/* Subgroup Values Table */}
                    <div className="overflow-x-auto max-h-[160px] overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                        <table className="w-full text-left font-mono">
                            <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-[10px] text-slate-500 uppercase">
                                <tr>
                                    <th className="p-2">Subgrupo</th>
                                    <th className="p-2">Muestras (x₁ ... x₅)</th>
                                    <th className="p-2 text-right">Media X̄_i</th>
                                    <th className="p-2 text-right">Rango R_i</th>
                                    <th className="p-2 text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {subgroups.map((sg, idx) => {
                                    const isOut = results.xBarChart.outOfControl.includes(sg.subgroupId)
                                    return (
                                        <tr key={idx} className={isOut ? "bg-rose-50/70 dark:bg-rose-950/20" : ""}>
                                            <td className="p-2 font-bold">Subgrupo {sg.subgroupId}</td>
                                            <td className="p-2 text-slate-600 dark:text-slate-400">[{sg.values.join(", ")}]</td>
                                            <td className="p-2 text-right font-bold text-slate-900 dark:text-white">{results.xMeans[idx]}</td>
                                            <td className="p-2 text-right text-slate-700 dark:text-slate-300">{results.rValues[idx]}</td>
                                            <td className="p-2 text-center">
                                                {isOut ? (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200">
                                                        Fuera de Límite
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                                                        Normal
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
