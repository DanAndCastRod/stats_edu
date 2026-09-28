"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    Factory,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Sliders,
    Bookmark,
    Target,
    Layers,
    Plus,
    Trash2,
    RefreshCw,
    Download,
    Copy,
    Check
} from "lucide-react"
import { solveDEACCR, DMUData, DEAResult } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

const INITIAL_DMUS: DMUData[] = [
    { id: "1", name: "Planta Pereira (GEIO)", inputs: [2.0, 5.0], outputs: [1.0] },
    { id: "2", name: "Planta Dosquebradas", inputs: [4.0, 2.0], outputs: [1.0] },
    { id: "3", name: "Planta Manizales", inputs: [3.0, 3.0], outputs: [1.0] },
    { id: "4", name: "Planta Armenia", inputs: [6.0, 4.0], outputs: [1.0] },
    { id: "5", name: "Planta Cartago", inputs: [7.0, 8.0], outputs: [1.0] },
    { id: "6", name: "Planta Santa Rosa", inputs: [5.0, 3.5], outputs: [1.0] }
]

export function DeaEfficiencyCalculator() {
    const [dmus, setDmus] = useState<DMUData[]>(INITIAL_DMUS)
    const [selectedDmuId, setSelectedDmuId] = useState<string>("4")

    // Input & Output Labels
    const [input1Name] = useState<string>("Horas-Hombre (x₁)")
    const [input2Name] = useState<string>("Capital / MWh (x₂)")
    const [output1Name] = useState<string>("Producción Normalizada (y₁)")

    // Run DEA Solver
    const results: DEAResult[] = useMemo(() => {
        return solveDEACCR(dmus)
    }, [dmus])

    const selectedResult = useMemo(() => {
        return results.find((r) => r.id === selectedDmuId) || results[0]
    }, [results, selectedDmuId])

    // Update a DMU cell
    const updateDmuValue = (
        dmuId: string,
        field: "input1" | "input2" | "output1",
        value: number
    ) => {
        setDmus((prev) =>
            prev.map((d) => {
                if (d.id !== dmuId) return d
                const inp = [...d.inputs]
                const out = [...d.outputs]
                if (field === "input1") inp[0] = Math.max(0.1, value)
                if (field === "input2") inp[1] = Math.max(0.1, value)
                if (field === "output1") out[0] = Math.max(0.1, value)
                return { ...d, inputs: inp, outputs: out }
            })
        )
    }

    // Add new DMU
    const addDmu = () => {
        const nextId = (dmus.length + 1).toString()
        const newDmu: DMUData = {
            id: nextId,
            name: `Nueva Unidad ${nextId}`,
            inputs: [4.0, 4.0],
            outputs: [1.0]
        }
        setDmus([...dmus, newDmu])
    }

    // Remove DMU
    const removeDmu = (id: string) => {
        if (dmus.length <= 3) return
        setDmus(dmus.filter((d) => d.id !== id))
    }

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "manufactura") {
            setDmus(INITIAL_DMUS)
        } else if (preset === "sucursales") {
            setDmus([
                { id: "1", name: "Sucursal Centro", inputs: [3.0, 6.0], outputs: [1.0] },
                { id: "2", name: "Sucursal Circunvalar", inputs: [2.5, 3.5], outputs: [1.0] },
                { id: "3", name: "Sucursal Cuba", inputs: [5.0, 2.0], outputs: [1.0] },
                { id: "4", name: "Sucursal Terminal", inputs: [6.0, 5.0], outputs: [1.0] },
                { id: "5", name: "Sucursal Cerritos", inputs: [8.0, 4.0], outputs: [1.0] }
            ])
        }
    }

    const [copied, setCopied] = useState(false)

    const handleExportCsv = () => {
        const efficientCount = results.filter((r) => r.isEfficient).length
        const avgTheta = results.reduce((acc, r) => acc + r.theta, 0) / results.length

        const rows: (string | number)[][] = [
            ["# STATSEDU UTP - ANALISIS ENVOLVENTE DE DATOS (DEA CCR)"],
            ["# Facultad de Ingenieria Industrial - Universidad Tecnologica de Pereira"],
            ["# Fecha de Generacion", new Date().toLocaleString("es-CO")],
            [""],
            ["SECCION: CONFIGURACION DEL MODELO DEA"],
            ["Modelo", "DEA CCR Envolvente Orientado a Insumos (CRS)"],
            ["Total de Unidades de Decision (DMUs)", results.length],
            ["Unidades en Frontera Eficiente", efficientCount],
            ["Unidades Ineficientes", results.length - efficientCount],
            ["Score Promedio de Eficiencia Tecnica", `${(avgTheta * 100).toFixed(2)}%`],
            ["Variable Insumo 1", input1Name],
            ["Variable Insumo 2", input2Name],
            ["Variable Producto / Output", output1Name],
            [""],
            ["SECCION: RESULTADOS DETALLADOS DE EFICIENCIA POR DMU"],
            [
                "ID",
                "Nombre DMU",
                `${input1Name} (Real)`,
                `${input2Name} (Real)`,
                `${output1Name} (Real)`,
                "Score Eficiencia (theta)",
                "Eficiencia (%)",
                "Condicion",
                `Meta ${input1Name} (Proyectada)`,
                `Meta ${input2Name} (Proyectada)`,
                "Reduccion Requerida (%)",
                "Pares de Referencia (Peers y Lambdas)"
            ]
        ]

        results.forEach((r) => {
            const peerStr =
                r.benchmarks.map((b) => `${b.name} (λ=${b.weight.toFixed(3)})`).join("; ") ||
                "Unidad de Referencia Propia"

            rows.push([
                r.id,
                r.name,
                r.inputs[0],
                r.inputs[1],
                r.outputs[0],
                r.theta.toFixed(4),
                (r.theta * 100).toFixed(2),
                r.isEfficient ? "Eficiente (Frontera Best Practice)" : "Ineficiente",
                (r.projectedInputs[0] ?? r.inputs[0]).toFixed(2),
                (r.projectedInputs[1] ?? r.inputs[1]).toFixed(2),
                ((1 - r.theta) * 100).toFixed(2),
                peerStr
            ])
        })

        const filename = `dea_eficiencia_ccr_${getExportTimestamp()}`
        downloadCsvFile(filename, rows)
    }

    const handleCopySummary = async () => {
        const efficientCount = results.filter((r) => r.isEfficient).length
        const avgTheta = results.reduce((acc, r) => acc + r.theta, 0) / results.length

        const dmuRows = results
            .map((r) => {
                const goals = r.isEfficient
                    ? "En frontera"
                    : `x₁: ${r.projectedInputs[0]?.toFixed(2)}, x₂: ${r.projectedInputs[1]?.toFixed(2)}`
                return `| ${r.name} | ${r.inputs[0]} | ${r.inputs[1]} | ${r.outputs[0]} | ${(r.theta * 100).toFixed(1)}% | ${r.isEfficient ? "★ Eficiente" : "Ineficiente"} | ${goals} |`
            })
            .join("\n")

        const markdown = `### Reporte de Eficiencia Técnica — Modelo DEA CCR (StatsEdu UTP)
**Modelo:** DEA-CCR Envolvente orientado a entradas (CRS) | **Total Unidades:** ${results.length} DMUs  
**Eficiencia Promedio:** ${(avgTheta * 100).toFixed(1)}% | **Unidades en Frontera Eficiente:** ${efficientCount} de ${results.length}  

| Unidad (DMU) | ${input1Name} | ${input2Name} | ${output1Name} | Score $\\theta$ | Condición | Metas Proyectadas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${dmuRows}

*Generado por la Suite de Computación e Investigación Operativa — Universidad Tecnológica de Pereira.*`

        const ok = await copyToClipboard(markdown)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // Chart Geometry: Normalized Inputs Plot (x1/y vs x2/y)
    const svgWidth = 560
    const svgHeight = 280
    const padX = 50
    const padY = 30
    const plotW = svgWidth - 2 * padX
    const plotH = svgHeight - 2 * padY

    // Extract normalized coordinates (x1/y, x2/y)
    const normalizedPoints = useMemo(() => {
        return results.map((r) => {
            const y = r.outputs[0] || 1
            const nx = r.inputs[0] / y
            const ny = r.inputs[1] / y
            return {
                id: r.id,
                name: r.name,
                nx,
                ny,
                isEfficient: r.isEfficient,
                theta: r.theta,
                projectedNx: (r.projectedInputs[0] || r.inputs[0]) / y,
                projectedNy: (r.projectedInputs[1] || r.inputs[1]) / y
            }
        })
    }, [results])

    const maxCoord = useMemo(() => {
        let max = 0
        normalizedPoints.forEach((p) => {
            if (p.nx > max) max = p.nx
            if (p.ny > max) max = p.ny
        })
        return Math.max(10, Math.ceil(max * 1.15))
    }, [normalizedPoints])

    const scaleX = (x: number) => padX + (x / maxCoord) * plotW
    const scaleY = (y: number) => svgHeight - padY - (y / maxCoord) * plotH

    // Efficient Frontier line connecting efficient points ordered by nx
    const efficientHullPoints = useMemo(() => {
        const effPts = normalizedPoints.filter((p) => p.isEfficient)
        effPts.sort((a, b) => a.nx - b.nx)
        return effPts
    }, [normalizedPoints])

    const frontierPath = useMemo(() => {
        if (efficientHullPoints.length === 0) return ""
        // Asymptotic vertical ray at lowest nx
        const first = efficientHullPoints[0]
        let p = `M ${scaleX(first.nx)} ${scaleY(maxCoord)} L ${scaleX(first.nx)} ${scaleY(first.ny)}`
        for (let i = 1; i < efficientHullPoints.length; i++) {
            p += ` L ${scaleX(efficientHullPoints[i].nx)} ${scaleY(efficientHullPoints[i].ny)}`
        }
        // Asymptotic horizontal ray at highest nx
        const last = efficientHullPoints[efficientHullPoints.length - 1]
        p += ` L ${scaleX(maxCoord)} ${scaleY(last.ny)}`
        return p
    }, [efficientHullPoints, maxCoord])

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300 mb-2">
                            <Factory className="h-3.5 w-3.5" />
                            Posgrado MIOE S2 & Investigación de Operaciones
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Calculadora de Eficiencia Técnica — Análisis Envolvente de Datos (DEA CCR)
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Evaluación no paramétrica de fronteras de producción, determinación del score de eficiencia relativa (θ) bajo retornos constantes a escala (CRS) y benchmarking industrial.
                        </p>
                    </div>

                    {/* Presets and Export Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("manufactura")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-600 hover:text-sky-600 transition-colors"
                        >
                            6 Plantas de Manufactura
                        </button>
                        <button
                            onClick={() => applyPreset("sucursales")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-600 hover:text-sky-600 transition-colors"
                        >
                            5 Sucursales Logísticas
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />

                        {/* Export Buttons */}
                        <button
                            onClick={handleExportCsv}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Descargar reporte completo de eficiencia técnica DEA en formato CSV"
                        >
                            <Download className="h-3.5 w-3.5" /> Exportar Eficiencia DEA a CSV
                        </button>
                        <button
                            onClick={handleCopySummary}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Copiar tabla de resultados y metas proyectadas en formato Markdown"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Copiado!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5 text-slate-500" /> Copiar Resumen
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: DMUs Input Table (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-sky-700 dark:text-sky-400" />
                            Matriz de Unidades de Decisión (DMUs)
                        </h3>
                        <button
                            onClick={addDmu}
                            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sky-900 text-white hover:bg-sky-800 flex items-center gap-1 transition-colors"
                        >
                            <Plus className="h-3.5 w-3.5" /> Agregar DMU
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                                    <th className="py-2 px-3">Unidad (DMU)</th>
                                    <th className="py-2 px-2">{input1Name}</th>
                                    <th className="py-2 px-2">{input2Name}</th>
                                    <th className="py-2 px-2">{output1Name}</th>
                                    <th className="py-2 px-2 text-right">Score θ</th>
                                    <th className="py-2 px-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {dmus.map((d) => {
                                    const res = results.find((r) => r.id === d.id)
                                    const isSelected = selectedDmuId === d.id
                                    const thetaPct = res ? (res.theta * 100).toFixed(1) : "100"
                                    const isEff = res ? res.isEfficient : true

                                    return (
                                        <tr
                                            key={d.id}
                                            onClick={() => setSelectedDmuId(d.id)}
                                            className={`cursor-pointer transition-colors ${
                                                isSelected
                                                    ? "bg-sky-100/70 dark:bg-sky-950/40"
                                                    : "hover:bg-slate-100 dark:hover:bg-slate-900"
                                            }`}
                                        >
                                            <td className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">
                                                {d.name}
                                            </td>
                                            <td className="py-1 px-2">
                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    min="0.1"
                                                    value={d.inputs[0]}
                                                    onChange={(e) =>
                                                        updateDmuValue(
                                                            d.id,
                                                            "input1",
                                                            parseFloat(e.target.value) || 0.1
                                                        )
                                                    }
                                                    className="w-16 px-1.5 py-0.5 text-xs font-mono font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                                />
                                            </td>
                                            <td className="py-1 px-2">
                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    min="0.1"
                                                    value={d.inputs[1]}
                                                    onChange={(e) =>
                                                        updateDmuValue(
                                                            d.id,
                                                            "input2",
                                                            parseFloat(e.target.value) || 0.1
                                                        )
                                                    }
                                                    className="w-16 px-1.5 py-0.5 text-xs font-mono font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                                />
                                            </td>
                                            <td className="py-1 px-2">
                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    min="0.1"
                                                    value={d.outputs[0]}
                                                    onChange={(e) =>
                                                        updateDmuValue(
                                                            d.id,
                                                            "output1",
                                                            parseFloat(e.target.value) || 0.1
                                                        )
                                                    }
                                                    className="w-14 px-1.5 py-0.5 text-xs font-mono font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                                />
                                            </td>
                                            <td className="py-2 px-2 text-right font-mono font-bold">
                                                <span
                                                    className={`px-1.5 py-0.5 rounded text-[11px] ${
                                                        isEff
                                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                                    }`}
                                                >
                                                    {thetaPct}%
                                                </span>
                                            </td>
                                            <td className="py-2 px-2 text-right">
                                                {dmus.length > 3 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeDmu(d.id)
                                                        }}
                                                        className="text-slate-400 hover:text-rose-500 p-1"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Efficient Frontier Chart & Benchmarking (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                    {/* SVG Frontier Plot */}
                    <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                                Frontera Envolvente Eficiente de Producción (Iso-cuanta)
                            </span>
                            <span className="text-[11px] font-mono text-sky-400">
                                Orientación a Insumos
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
                                {/* Axes */}
                                <line
                                    x1={padX}
                                    y1={svgHeight - padY}
                                    x2={svgWidth - padX}
                                    y2={svgHeight - padY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                />
                                <line
                                    x1={padX}
                                    y1={padY}
                                    x2={padX}
                                    y2={svgHeight - padY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                />

                                {/* Frontier Path */}
                                {frontierPath && (
                                    <path
                                        d={frontierPath}
                                        fill="none"
                                        stroke="#38BDF8"
                                        strokeWidth="2.5"
                                    />
                                )}

                                {/* DMU Points */}
                                {normalizedPoints.map((p) => {
                                    const px = scaleX(p.nx)
                                    const py = scaleY(p.ny)
                                    const isSel = p.id === selectedDmuId
                                    const projX = scaleX(p.projectedNx)
                                    const projY = scaleY(p.projectedNy)

                                    return (
                                        <g key={p.id}>
                                            {/* Projection vector towards frontier for inefficient DMUs */}
                                            {!p.isEfficient && (
                                                <line
                                                    x1={px}
                                                    y1={py}
                                                    x2={projX}
                                                    y2={projY}
                                                    stroke="#F43F5E"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="3 2"
                                                />
                                            )}

                                            <circle
                                                cx={px}
                                                cy={py}
                                                r={isSel ? 7 : 5}
                                                fill={
                                                    p.isEfficient
                                                        ? "#10B981"
                                                        : isSel
                                                        ? "#F43F5E"
                                                        : "#F59E0B"
                                                }
                                                stroke="white"
                                                strokeWidth="1.5"
                                                className="cursor-pointer"
                                                onClick={() => setSelectedDmuId(p.id)}
                                            />
                                            <text
                                                x={px + 7}
                                                y={py - 6}
                                                fill="#E2E8F0"
                                                fontSize="10"
                                                fontWeight={isSel ? "bold" : "normal"}
                                            >
                                                {p.name.split(" ")[1] || p.name} (
                                                {(p.theta * 100).toFixed(0)}%)
                                            </text>
                                        </g>
                                    )
                                })}

                                {/* Axis Labels */}
                                <text
                                    x={svgWidth - padX}
                                    y={svgHeight - 10}
                                    fill="#94A3B8"
                                    fontSize="10"
                                    textAnchor="end"
                                >
                                    Insumo 1 / Output →
                                </text>
                                <text
                                    x={padX + 5}
                                    y={padY + 12}
                                    fill="#94A3B8"
                                    fontSize="10"
                                    textAnchor="start"
                                >
                                    ↑ Insumo 2 / Output
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Selected DMU Benchmarking & Targets Card */}
                    {selectedResult && (
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Diagnóstico de Eficiencia
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        {selectedResult.name}
                                    </h4>
                                </div>
                                <span
                                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                                        selectedResult.isEfficient
                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    }`}
                                >
                                    θ = {(selectedResult.theta * 100).toFixed(2)}%
                                </span>
                            </div>

                            {selectedResult.isEfficient ? (
                                <div className="text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                                    ★ Esta unidad se encuentra exactamente sobre la <strong>Frontera Eficiente Envolvente</strong> (Best Practice). Utiliza la mínima cantidad de insumos para su nivel de producción.
                                </div>
                            ) : (
                                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                                    <p>
                                        Para alcanzar la eficiencia técnica al 100%, esta unidad debe reducir sus insumos proporcionalmente al <strong>{((1 - selectedResult.theta) * 100).toFixed(1)}%</strong>:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                        <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                            <span className="text-[10px] text-slate-400 block font-sans">
                                                Meta {input1Name}:
                                            </span>
                                            {selectedResult.inputs[0]} →{" "}
                                            <strong className="text-emerald-600">
                                                {selectedResult.projectedInputs[0]?.toFixed(2)}
                                            </strong>
                                        </div>
                                        <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                                            <span className="text-[10px] text-slate-400 block font-sans">
                                                Meta {input2Name}:
                                            </span>
                                            {selectedResult.inputs[1]} →{" "}
                                            <strong className="text-emerald-600">
                                                {selectedResult.projectedInputs[1]?.toFixed(2)}
                                            </strong>
                                        </div>
                                    </div>
                                    {selectedResult.benchmarks.length > 0 && (
                                        <div className="pt-1">
                                            <span className="text-[11px] font-semibold text-slate-500">
                                                Conjunto de Referencia (Peer Benchmarks):
                                            </span>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {selectedResult.benchmarks.map((b, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300"
                                                    >
                                                        {b.name} (λ = {b.weight.toFixed(3)})
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeaEfficiencyCalculator
