"use client"

import React, { useState, useMemo } from "react"
import {
    Network,
    Sliders,
    Clock,
    AlertCircle,
    CheckCircle2,
    Download,
    Copy,
    Check,
    RotateCcw,
    Layers,
    Milestone,
    Flame
} from "lucide-react"
import { solveCPMPERT, CPMActivityInput, CPMResult } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp, formatMarkdownTable } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

const DEFAULT_ACTIVITIES: CPMActivityInput[] = [
    { id: "A", name: "Estudio de Mercado y Factibilidad", predecessors: [], optimistic: 2, mostLikely: 4, pessimistic: 6 },
    { id: "B", name: "Diseño Conceptual del Producto", predecessors: ["A"], optimistic: 3, mostLikely: 5, pessimistic: 7 },
    { id: "C", name: "Ingeniería de Detalle y Planos", predecessors: ["B"], optimistic: 4, mostLikely: 6, pessimistic: 8 },
    { id: "D", name: "Adquisición de Maquinaria y Moldes", predecessors: ["B"], optimistic: 6, mostLikely: 9, pessimistic: 18 },
    { id: "E", name: "Instalación de Línea de Producción", predecessors: ["C", "D"], optimistic: 3, mostLikely: 5, pessimistic: 7 },
    { id: "F", name: "Capacitación de Operarios", predecessors: ["C"], optimistic: 2, mostLikely: 3, pessimistic: 4 },
    { id: "G", name: "Lote Piloto y Control de Calidad", predecessors: ["E", "F"], optimistic: 2, mostLikely: 4, pessimistic: 6 }
]

export function CpmPertNetworkOptimizer() {
    const [activities, setActivities] = useState<CPMActivityInput[]>(DEFAULT_ACTIVITIES)
    const [targetDeadline, setTargetDeadline] = useState<number>(28)
    const [copied, setCopied] = useState<boolean>(false)

    const results: CPMResult = useMemo(() => {
        return solveCPMPERT(activities, targetDeadline)
    }, [activities, targetDeadline])

    const handleReset = () => {
        setActivities(DEFAULT_ACTIVITIES)
        setTargetDeadline(28)
    }

    const handleExportCSV = () => {
        const rows: (string | number)[][] = [
            ["=== GESTIÓN DE PROYECTOS: ANÁLISIS DE RED CPM / PERT ==="],
            ["Fecha de Exportación", new Date().toLocaleString("es-CO")],
            ["Universidad", "Universidad Tecnológica de Pereira - Ingeniería Industrial"],
            [],
            ["1. RESUMEN GLOBAL DEL PROYECTO"],
            ["Duración Esperada del Proyecto (Te)", results.projectDuration, "semanas"],
            ["Varianza de la Ruta Crítica (sigma^2)", results.projectVariance],
            ["Desviación Estándar del Proyecto (sigma)", results.projectStdDev, "semanas"],
            ["Ruta Crítica Identificada", results.criticalPath.join(" -> ")],
            ["Plazo Meta Evaluado", targetDeadline, "semanas"],
            ["Probabilidad de Cumplimiento", `${results.completionProbability?.probabilityPercent}%`, `Z = ${results.completionProbability?.zScore}`],
            [],
            ["2. DETALLE DE ACTIVIDADES (TABLA CPM / PERT)"],
            ["ID", "Nombre Actividad", "Predecesoras", "Tiempo (a)", "Tiempo (m)", "Tiempo (b)", "Te Esperado", "ES", "EF", "LS", "LF", "Holgura", "¿Crítica?"],
            ...results.activities.map((a) => {
                const orig = activities.find((inp) => inp.id === a.id)
                return [
                    a.id,
                    a.name,
                    a.predecessors.length > 0 ? a.predecessors.join(",") : "-",
                    orig?.optimistic ?? "-",
                    orig?.mostLikely ?? "-",
                    orig?.pessimistic ?? "-",
                    a.duration,
                    a.es,
                    a.ef,
                    a.ls,
                    a.lf,
                    a.slack,
                    a.isCritical ? "CRÍTICA" : "No Crítica"
                ]
            })
        ]

        downloadCsvFile(`Red_CPM_PERT_${getExportTimestamp()}.csv`, rows)
    }

    const handleCopySummary = async () => {
        const headers = ["Actividad", "Predecesoras", "Duración (Te)", "ES", "EF", "LS", "LF", "Holgura", "Estado"]
        const rows = results.activities.map((a) => [
            `[${a.id}] ${a.name}`,
            a.predecessors.length > 0 ? a.predecessors.join(", ") : "Inicio",
            `${a.duration} sem`,
            `${a.es}`,
            `${a.ef}`,
            `${a.ls}`,
            `${a.lf}`,
            `${a.slack}`,
            a.isCritical ? "★ CRÍTICA" : "Normal"
        ])

        const text = `# Reporte Ejecutivo: Red de Proyecto CPM / PERT\n**Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial**\n\n` +
            `* **Duración Esperada:** ${results.projectDuration} semanas\n` +
            `* **Ruta Crítica:** ${results.criticalPath.join(" → ")}\n` +
            `* **Desviación Estándar:** ${results.projectStdDev} semanas\n` +
            `* **Probabilidad de culminar antes de ${targetDeadline} semanas:** ${results.completionProbability?.probabilityPercent}%\n\n` +
            formatMarkdownTable(headers, rows)

        const ok = await copyToClipboard(text)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                            <Network className="w-5 h-5" />
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Optimizador de Redes de Proyectos (CPM / PERT)
                        </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Cálculo de ruta crítica, holguras totales ($ES, EF, LS, LF$), varianza probabilística y probabilidad de culminación antes del plazo.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                    </button>
                    <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "¡Copiado!" : "Copiar Resumen"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Duración del Proyecto</span>
                    <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                        {results.projectDuration} sem
                    </div>
                    <span className="text-[10px] text-slate-500">Tiempo mínimo de entrega</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ruta Crítica ($CP$)</span>
                    <div className="text-sm font-black text-rose-600 dark:text-rose-400 mt-1 font-mono tracking-tight">
                        {results.criticalPath.join(" → ")}
                    </div>
                    <span className="text-[10px] text-slate-500">Actividades con holgura = 0</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Desviación ($\sigma_P$)</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {results.projectStdDev} sem
                    </div>
                    <span className="text-[10px] text-slate-500">Varianza: {results.projectVariance}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Probabilidad Éxito</span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {results.completionProbability?.probabilityPercent}%
                    </div>
                    <span className="text-[10px] text-slate-500">Para meta de {targetDeadline} semanas</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Puntaje $Z$ Normal</span>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {results.completionProbability?.zScore}
                    </div>
                    <span className="text-[10px] text-slate-500">$Z = (T - T_e) / \sigma$</span>
                </div>
            </div>

            {/* Layout: Target Simulation & Network Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Control Panel */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            <Sliders className="w-4 h-4 text-rose-600" />
                            Simulación de Plazo Meta
                        </div>

                        <div>
                            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                <span>Plazo Límite Solicitado (T meta):</span>
                                <span className="font-mono text-rose-600 font-bold">{targetDeadline} semanas</span>
                            </div>
                            <input
                                type="range"
                                min={Math.floor(results.projectDuration - 6)}
                                max={Math.ceil(results.projectDuration + 10)}
                                step="0.5"
                                value={targetDeadline}
                                onChange={(e) => setTargetDeadline(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                            />
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <Milestone className="w-3.5 h-3.5 text-rose-500" />
                                Veredicto de Cumplimiento:
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                {targetDeadline >= results.projectDuration ? (
                                    <span>
                                        Con un plazo de <b>{targetDeadline} semanas</b>, el proyecto tiene un <b>{results.completionProbability?.probabilityPercent}%</b> de probabilidad de terminar a tiempo sin penalizaciones contractuales.
                                    </span>
                                ) : (
                                    <span className="text-rose-600 dark:text-rose-400 font-medium">
                                        El plazo meta ({targetDeadline} semanas) es menor a la duración esperada ({results.projectDuration} sem). Alto riesgo de incumplimiento contractual.
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Formula reference */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-rose-600" />
                            Ecuaciones de Redes CPM / PERT
                        </div>
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                            <div><MathFormula formula="t_e = \frac{a + 4m + b}{6}, \quad \sigma^2 = \left(\frac{b-a}{6}\right)^2" /></div>
                            <div><MathFormula formula="EF = ES + t_e, \quad LS = LF - t_e" /></div>
                            <div><MathFormula formula="H_i = LS_i - ES_i \quad (H = 0 \implies \text{Crítica})" /></div>
                            <div><MathFormula formula="Z = \frac{T_{meta} - T_P}{\sigma_P}, \quad \sigma_P = \sqrt{\sum_{CP} \sigma_i^2}" /></div>
                        </div>
                    </div>
                </div>

                {/* Activities Table & Network Diagram */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-rose-600" />
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                Tabla de Pases Adelante / Atrás y Holguras
                            </h4>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">
                            {results.criticalPath.length} actividades críticas
                        </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                        <table className="w-full text-left font-mono">
                            <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-[10px] text-slate-500 uppercase">
                                <tr>
                                    <th className="p-2">Actividad</th>
                                    <th className="p-2">Pred.</th>
                                    <th className="p-2 text-right">Duración ($T_e$)</th>
                                    <th className="p-2 text-right">ES</th>
                                    <th className="p-2 text-right">EF</th>
                                    <th className="p-2 text-right">LS</th>
                                    <th className="p-2 text-right">LF</th>
                                    <th className="p-2 text-right">Holgura</th>
                                    <th className="p-2 text-center">Ruta Crítica</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {results.activities.map((a) => (
                                    <tr key={a.id} className={a.isCritical ? "bg-rose-50/70 dark:bg-rose-950/20 font-bold" : ""}>
                                        <td className="p-2">
                                            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 mr-1.5 text-[10px]">
                                                {a.id}
                                            </span>
                                            <span className="text-slate-800 dark:text-slate-200 font-sans font-normal text-xs">
                                                {a.name}
                                            </span>
                                        </td>
                                        <td className="p-2 text-slate-500">
                                            {a.predecessors.length > 0 ? a.predecessors.join(", ") : "-"}
                                        </td>
                                        <td className="p-2 text-right font-bold text-slate-900 dark:text-white">
                                            {a.duration} sem
                                        </td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{a.es}</td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{a.ef}</td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{a.ls}</td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{a.lf}</td>
                                        <td className="p-2 text-right">
                                            <span className={a.slack === 0 ? "text-rose-600 font-bold" : "text-slate-600 dark:text-slate-400"}>
                                                {a.slack}
                                            </span>
                                        </td>
                                        <td className="p-2 text-center">
                                            {a.isCritical ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200">
                                                    ★ CRÍTICA
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-[10px]">Normal</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
