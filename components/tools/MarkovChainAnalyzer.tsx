"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    GitBranch,
    RefreshCw,
    CheckCircle2,
    AlertTriangle,
    Layers,
    Bookmark,
    ArrowRight,
    TrendingUp,
    Sparkles,
    Play,
    Download,
    Copy,
    Check
} from "lucide-react"
import { matrixPower, solveMarkovSteadyState } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, formatMarkdownTable, getExportTimestamp } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

export function MarkovChainAnalyzer() {
    const [size, setSize] = useState<2 | 3>(3)
    const [steps, setSteps] = useState<number>(5)

    // Initial 3x3 Stochastic Matrix
    const [matrix, setMatrix] = useState<number[][]>([
        [0.7, 0.2, 0.1],
        [0.3, 0.5, 0.2],
        [0.2, 0.4, 0.4]
    ])

    const stateNames = useMemo(() => {
        return size === 2 ? ["Estado 1 (S₁)", "Estado 2 (S₂)"] : ["Estado 1 (S₁)", "Estado 2 (S₂)", "Estado 3 (S₃)"]
    }, [size])

    // Current working matrix based on size
    const activeMatrix = useMemo(() => {
        if (size === 2) {
            return [
                [matrix[0][0], matrix[0][1]],
                [matrix[1][0], matrix[1][1]]
            ]
        }
        return matrix
    }, [matrix, size])

    // Row sums & validity check
    const rowSums = useMemo(() => {
        return activeMatrix.map((row) => row.reduce((a, b) => a + b, 0))
    }, [activeMatrix])

    const isStochasticValid = useMemo(() => {
        return rowSums.every((sum) => Math.abs(sum - 1.0) < 0.005)
    }, [rowSums])

    // Normalize matrix rows so each row sums to 1
    const normalizeRows = () => {
        const next = activeMatrix.map((row) => {
            const sum = row.reduce((a, b) => a + b, 0)
            if (sum === 0) return row.map(() => 1 / row.length)
            return row.map((val) => parseFloat((val / sum).toFixed(4)))
        })
        if (size === 2) {
            setMatrix([
                [next[0][0], next[0][1], 0],
                [next[1][0], next[1][1], 0],
                [0, 0, 1]
            ])
        } else {
            setMatrix(next)
        }
    }

    // Matrix to the n-th power P^n
    const powerMatrix = useMemo(() => {
        return matrixPower(activeMatrix, steps)
    }, [activeMatrix, steps])

    // Steady state vector pi
    const steadyState = useMemo(() => {
        if (!isStochasticValid) return new Array(size).fill(0)
        return solveMarkovSteadyState(activeMatrix)
    }, [activeMatrix, size, isStochasticValid])

    // Simulation Walk State
    const [simState, setSimState] = useState<number>(0)
    const [simHistory, setSimHistory] = useState<number[]>([0])

    const stepSimulation = () => {
        const row = activeMatrix[simState]
        const r = Math.random()
        let accum = 0
        let nextState = 0
        for (let j = 0; j < row.length; j++) {
            accum += row[j]
            if (r <= accum) {
                nextState = j
                break
            }
        }
        setSimState(nextState)
        setSimHistory((prev) => [...prev.slice(-15), nextState])
    }

    const resetSimulation = () => {
        setSimState(0)
        setSimHistory([0])
    }

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "clima") {
            setSize(2)
            setMatrix([
                [0.8, 0.2, 0],
                [0.4, 0.6, 0],
                [0, 0, 1]
            ])
        } else if (preset === "marcas") {
            setSize(3)
            setMatrix([
                [0.7, 0.2, 0.1],
                [0.2, 0.6, 0.2],
                [0.1, 0.4, 0.5]
            ])
        } else if (preset === "mantenimiento") {
            setSize(3)
            // 0: Operativa, 1: Degradada, 2: En Reparación
            setMatrix([
                [0.85, 0.12, 0.03],
                [0.1, 0.7, 0.2],
                [0.9, 0.05, 0.05]
            ])
        }
        resetSimulation()
    }

    const [copied, setCopied] = useState(false)

    const handleExportCsv = () => {
        const rows: (string | number)[][] = [
            ["# STATSEDU UTP - ANALISIS MATRICIAL DE CADENAS DE MARKOV"],
            ["# Facultad de Ingenieria Industrial - Universidad Tecnologica de Pereira"],
            ["# Fecha de Generacion", new Date().toLocaleString("es-CO")],
            [""],
            ["SECCION: CONFIGURACION DE LA CADENA"],
            ["Dimension del Espacio de Estados", `${size} Estados (${size}x${size})`],
            ["Pasos de Proyeccion Temporal (n)", steps],
            ["Validez de Conservacion Estocastica", isStochasticValid ? "Valida (Suma de probabilidades = 1.0)" : "Invalida (Requiere normalizacion)"],
            [""],
            ["SECCION: MATRIZ DE PROBABILIDADES DE TRANSICION DE UN PASO (P)"],
            ["Estado Inicial \\ Estado Siguiente", ...stateNames]
        ]

        activeMatrix.forEach((row, i) => {
            rows.push([stateNames[i], ...row.map((val) => val.toFixed(4))])
        })

        rows.push([""])
        rows.push([`SECCION: MATRIZ DE TRANSICION A ${steps} PASOS (P^${steps})`])
        rows.push(["Estado Inicial \\ Estado Futuro", ...stateNames])
        powerMatrix.forEach((row, i) => {
            rows.push([stateNames[i], ...row.map((val) => val.toFixed(4))])
        })

        rows.push([""])
        rows.push(["SECCION: DISTRIBUCION DE PROBABILIDAD DE ESTADO ESTACIONARIO (pi = pi * P)"])
        rows.push(["Indice", "Estado", "Probabilidad Estacionaria (pi_i)", "Porcentaje (%)", "Tiempo Medio de Retorno (pasos)"])
        steadyState.forEach((prob, idx) => {
            rows.push([
                idx + 1,
                stateNames[idx],
                prob.toFixed(6),
                (prob * 100).toFixed(4),
                prob > 0 ? (1 / prob).toFixed(2) : "Infinito"
            ])
        })

        const filename = `cadena_markov_${size}x${size}_n${steps}_${getExportTimestamp()}`
        downloadCsvFile(filename, rows)
    }

    const handleCopySummary = async () => {
        const pTable = formatMarkdownTable(
            ["Origen \\ Destino", ...stateNames.map((_, i) => `S_${i + 1}`)],
            activeMatrix.map((row, i) => [`$S_{${i + 1}}$`, ...row.map((v) => v.toFixed(3))])
        )

        const pnTable = formatMarkdownTable(
            ["Origen \\ Destino", ...stateNames.map((_, i) => `S_${i + 1}`)],
            powerMatrix.map((row, i) => [`$S_{${i + 1}}$`, ...row.map((v) => v.toFixed(4))])
        )

        const steadyRows = steadyState
            .map(
                (prob, i) =>
                    `| Estado $S_{${i + 1}}$ | ${stateNames[i]} | ${(prob * 100).toFixed(2)}% | ${prob > 0 ? `${(1 / prob).toFixed(2)} pasos` : "∞"} |`
            )
            .join("\n")

        const markdown = `### Reporte de Procesos Estocásticos: Cadenas de Markov (StatsEdu UTP)
**Dimensión:** Cadena homogénea finita de ${size} estados | **Proyección temporal:** $P^{${steps}}$  
**Conservación estocástica:** ${isStochasticValid ? "Válida (filas suman 1.0)" : "Ajuste numérico requerido"}  

#### Distribución de Régimen Estacionario ($\\pi = \\pi P$)
| Estado | Descripción | Probabilidad a Largo Plazo | Tiempo Medio de Retorno ($1/\\pi_i$) |
| :--- | :--- | :--- | :--- |
${steadyRows}

#### Matriz de Transición de Un Paso ($P$)
${pTable}

#### Matriz de Transición a ${steps} Pasos ($P^{${steps}}$)
${pnTable}

*Generado por la Suite de Computación e Investigación Operativa — Universidad Tecnológica de Pereira.*`

        const ok = await copyToClipboard(markdown)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 mb-2">
                            <GitBranch className="h-3.5 w-3.5" />
                            Procesos Estocásticos (II6A2) & MIOE
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Analizador Interactivo de Cadenas de Markov
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Exploración matricial de probabilidades de transición a n pasos (Pⁿ), cálculo analítico de distribución de estado estacionario y simulación estocástica paso a paso.
                        </p>
                    </div>

                    {/* Presets and Export Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("clima")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-600 hover:text-purple-600 transition-colors"
                        >
                            Clima 2x2
                        </button>
                        <button
                            onClick={() => applyPreset("marcas")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-600 hover:text-purple-600 transition-colors"
                        >
                            Mercado 3 Marcas
                        </button>
                        <button
                            onClick={() => applyPreset("mantenimiento")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-purple-600 hover:text-purple-600 transition-colors"
                        >
                            Mantenimiento Maquinaria
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />

                        {/* Export Buttons */}
                        <button
                            onClick={handleExportCsv}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Descargar la matriz P, P^n y el vector estacionario en formato CSV"
                        >
                            <Download className="h-3.5 w-3.5" /> Exportar Matriz a CSV
                        </button>
                        <button
                            onClick={handleCopySummary}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Copiar matrices y distribución estacionaria en formato Markdown"
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

                {/* Dimension switch */}
                <div className="flex items-center gap-3 mt-4">
                    <span className="text-xs font-bold text-slate-500">Dimensión de la Cadena:</span>
                    <button
                        onClick={() => {
                            setSize(2)
                            resetSimulation()
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                            size === 2
                                ? "bg-purple-900 text-white border-purple-900 shadow-sm"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        }`}
                    >
                        2 Estados (2×2)
                    </button>
                    <button
                        onClick={() => {
                            setSize(3)
                            resetSimulation()
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                            size === 3
                                ? "bg-purple-900 text-white border-purple-900 shadow-sm"
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        }`}
                    >
                        3 Estados (3×3)
                    </button>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Transition Matrix Input (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Matrix Input Grid */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Matriz Estocástica de Transición (P)
                            </h3>
                            <button
                                onClick={normalizeRows}
                                className="text-[11px] font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1"
                            >
                                <RefreshCw className="h-3 w-3" /> Auto-Normalizar Filas
                            </button>
                        </div>

                        {/* Interactive Matrix Cells */}
                        <div className="space-y-2">
                            {activeMatrix.map((row, i) => {
                                const rowSum = rowSums[i]
                                const isRowValid = Math.abs(rowSum - 1.0) < 0.005
                                return (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-12 text-xs font-mono font-bold text-slate-500">
                                            S_{i + 1}
                                        </span>
                                        <div className="grid grid-cols-3 gap-1.5 flex-1">
                                            {row.map((val, j) => (
                                                <input
                                                    key={j}
                                                    type="number"
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                    value={val}
                                                    onChange={(e) => {
                                                        const newVal = parseFloat(e.target.value) || 0
                                                        const next = matrix.map((r) => [...r])
                                                        next[i][j] = newVal
                                                        setMatrix(next)
                                                    }}
                                                    className="w-full text-center py-1.5 px-1 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-purple-600 outline-none"
                                                />
                                            ))}
                                            {size === 2 && <div className="hidden" />}
                                        </div>
                                        <span
                                            className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                                isRowValid
                                                    ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                                                    : "text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                                            }`}
                                        >
                                            Σ = {rowSum.toFixed(2)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {!isStochasticValid && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                Cada fila debe sumar exactamente 1.0 (propiedad de conservación de probabilidad).
                            </div>
                        )}
                    </div>

                    {/* Step Selector for P^n */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Proyección a n Pasos (Pⁿ)
                            </span>
                            <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
                                n = {steps} pasos
                            </span>
                        </div>
                        <div className="flex gap-2">
                            {[1, 2, 5, 10, 20, 50].map((st) => (
                                <button
                                    key={st}
                                    onClick={() => setSteps(st)}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border ${
                                        steps === st
                                            ? "bg-purple-900 text-white border-purple-900"
                                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                                    }`}
                                >
                                    n={st}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Steady State Vector Solution Card */}
                    <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/40">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                                Distribución Estacionaria (π = π · P)
                            </span>
                        </div>
                        <div className="space-y-2 mt-2">
                            {steadyState.map((prob, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-purple-950"
                                >
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                        π_{idx + 1} ({stateNames[idx]}):
                                    </span>
                                    <span className="text-sm font-mono font-black text-purple-800 dark:text-purple-300">
                                        {(prob * 100).toFixed(2)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Visualization Diagram & Multi-step Matrix (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Visual State Transition Diagram (SVG Canvas) */}
                    <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                                Diagrama Topológico de Estados y Transiciones
                            </span>
                            <span className="text-[11px] font-mono text-purple-400">
                                Grafo Dirigido
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <svg viewBox="0 0 540 220" className="w-full h-auto select-none">
                                {/* States Coords */}
                                {size === 2 ? (
                                    <>
                                        {/* State 1 */}
                                        <g>
                                            <circle
                                                cx="140"
                                                cy="110"
                                                r="34"
                                                fill={simState === 0 ? "#7E22CE" : "#1E293B"}
                                                stroke={simState === 0 ? "#C084FC" : "#64748B"}
                                                strokeWidth="2.5"
                                            />
                                            <text
                                                x="140"
                                                y="114"
                                                fill="white"
                                                fontWeight="bold"
                                                fontSize="14"
                                                textAnchor="middle"
                                            >
                                                S₁
                                            </text>
                                            {/* Self loop S1 -> S1 */}
                                            <path
                                                d="M 120 80 C 100 20, 180 20, 160 80"
                                                fill="none"
                                                stroke="#94A3B8"
                                                strokeWidth="1.5"
                                            />
                                            <text
                                                x="140"
                                                y="42"
                                                fill="#CBD5E1"
                                                fontSize="11"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                            >
                                                {activeMatrix[0][0]}
                                            </text>
                                        </g>

                                        {/* State 2 */}
                                        <g>
                                            <circle
                                                cx="400"
                                                cy="110"
                                                r="34"
                                                fill={simState === 1 ? "#7E22CE" : "#1E293B"}
                                                stroke={simState === 1 ? "#C084FC" : "#64748B"}
                                                strokeWidth="2.5"
                                            />
                                            <text
                                                x="400"
                                                y="114"
                                                fill="white"
                                                fontWeight="bold"
                                                fontSize="14"
                                                textAnchor="middle"
                                            >
                                                S₂
                                            </text>
                                            {/* Self loop S2 -> S2 */}
                                            <path
                                                d="M 380 80 C 360 20, 440 20, 420 80"
                                                fill="none"
                                                stroke="#94A3B8"
                                                strokeWidth="1.5"
                                            />
                                            <text
                                                x="400"
                                                y="42"
                                                fill="#CBD5E1"
                                                fontSize="11"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                            >
                                                {activeMatrix[1][1]}
                                            </text>
                                        </g>

                                        {/* Transition S1 -> S2 (Top arc) */}
                                        <path
                                            d="M 174 95 Q 270 65 366 95"
                                            fill="none"
                                            stroke="#A855F7"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x="270"
                                            y="75"
                                            fill="#E9D5FF"
                                            fontSize="11"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            {activeMatrix[0][1]} →
                                        </text>

                                        {/* Transition S2 -> S1 (Bottom arc) */}
                                        <path
                                            d="M 366 125 Q 270 155 174 125"
                                            fill="none"
                                            stroke="#38BDF8"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x="270"
                                            y="150"
                                            fill="#BAE6FD"
                                            fontSize="11"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            ← {activeMatrix[1][0]}
                                        </text>
                                    </>
                                ) : (
                                    <>
                                        {/* 3 States Triangle */}
                                        {/* S1: Top center */}
                                        <circle
                                            cx="270"
                                            cy="50"
                                            r="28"
                                            fill={simState === 0 ? "#7E22CE" : "#1E293B"}
                                            stroke={simState === 0 ? "#C084FC" : "#64748B"}
                                            strokeWidth="2.5"
                                        />
                                        <text
                                            x="270"
                                            y="55"
                                            fill="white"
                                            fontWeight="bold"
                                            fontSize="13"
                                            textAnchor="middle"
                                        >
                                            S₁
                                        </text>

                                        {/* S2: Bottom Left */}
                                        <circle
                                            cx="130"
                                            cy="165"
                                            r="28"
                                            fill={simState === 1 ? "#7E22CE" : "#1E293B"}
                                            stroke={simState === 1 ? "#C084FC" : "#64748B"}
                                            strokeWidth="2.5"
                                        />
                                        <text
                                            x="130"
                                            y="170"
                                            fill="white"
                                            fontWeight="bold"
                                            fontSize="13"
                                            textAnchor="middle"
                                        >
                                            S₂
                                        </text>

                                        {/* S3: Bottom Right */}
                                        <circle
                                            cx="410"
                                            cy="165"
                                            r="28"
                                            fill={simState === 2 ? "#7E22CE" : "#1E293B"}
                                            stroke={simState === 2 ? "#C084FC" : "#64748B"}
                                            strokeWidth="2.5"
                                        />
                                        <text
                                            x="410"
                                            y="170"
                                            fill="white"
                                            fontWeight="bold"
                                            fontSize="13"
                                            textAnchor="middle"
                                        >
                                            S₃
                                        </text>

                                        {/* Transition Lines */}
                                        {/* S1 -> S2 */}
                                        <path
                                            d="M 246 65 Q 180 90 148 140"
                                            fill="none"
                                            stroke="#A855F7"
                                            strokeWidth="1.5"
                                        />
                                        <text x="175" y="90" fill="#E9D5FF" fontSize="10" fontWeight="bold">
                                            {activeMatrix[0][1]}
                                        </text>

                                        {/* S1 -> S3 */}
                                        <path
                                            d="M 294 65 Q 360 90 392 140"
                                            fill="none"
                                            stroke="#38BDF8"
                                            strokeWidth="1.5"
                                        />
                                        <text x="350" y="90" fill="#BAE6FD" fontSize="10" fontWeight="bold">
                                            {activeMatrix[0][2]}
                                        </text>

                                        {/* S2 -> S3 */}
                                        <path
                                            d="M 160 165 L 380 165"
                                            fill="none"
                                            stroke="#34D399"
                                            strokeWidth="1.5"
                                        />
                                        <text
                                            x="270"
                                            y="180"
                                            fill="#A7F3D0"
                                            fontSize="10"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            {activeMatrix[1][2]}
                                        </text>
                                    </>
                                )}
                            </svg>
                        </div>

                        {/* Interactive Walk Controller */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Estado actual:</span>
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-purple-900 text-purple-200">
                                    S_{simState + 1}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={stepSimulation}
                                    className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded text-xs font-bold flex items-center gap-1 transition-colors"
                                >
                                    <Play className="h-3 w-3" /> Avanzar 1 Paso Monte Carlo
                                </button>
                                <button
                                    onClick={resetSimulation}
                                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition-colors"
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* P^n Multi-Step Matrix Table */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Matriz de Probabilidades de Transición a {steps} Pasos (P^{steps})
                            </span>
                            <span className="text-xs font-mono text-purple-700 dark:text-purple-400">
                                {steps >= 20 ? "Convergencia a Régimen Estacionario" : "Transitorio"}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-center border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                                        <th className="py-1 px-2 text-left">Estado Inicial</th>
                                        {stateNames.map((name, j) => (
                                            <th key={j} className="py-1 px-2">
                                                Hacia S_{j + 1}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                                    {powerMatrix.map((row, i) => (
                                        <tr key={i}>
                                            <td className="py-2 px-2 text-left font-sans font-bold text-slate-700 dark:text-slate-300">
                                                Desde S_{i + 1}
                                            </td>
                                            {row.map((val, j) => (
                                                <td key={j} className="py-2 px-2">
                                                    <span className="bg-purple-50 dark:bg-purple-950/60 px-2 py-1 rounded text-purple-900 dark:text-purple-300 font-bold">
                                                        {val.toFixed(4)}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkovChainAnalyzer
