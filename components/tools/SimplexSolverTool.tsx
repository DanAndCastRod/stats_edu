"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    Table2,
    Play,
    SkipForward,
    RotateCcw,
    CheckCircle2,
    AlertCircle,
    Sliders,
    Bookmark,
    ArrowRight,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    TrendingUp
} from "lucide-react"
import { solvePrimalSimplex, LPConstraint, LPSolverResult } from "@/lib/tools-math"
import { MathFormula } from "./MathFormula"

export function SimplexSolverTool() {
    const [sense, setSense] = useState<"max" | "min">("max")

    // Objective function coefficients Z = c1 x1 + c2 x2
    const [c1, setC1] = useState<number>(3.0)
    const [c2, setC2] = useState<number>(5.0)

    // Constraints: up to 3 or 4 constraints
    const [constraints, setConstraints] = useState<LPConstraint[]>([
        { coeffs: [1, 0], op: "<=", rhs: 4 },
        { coeffs: [0, 2], op: "<=", rhs: 12 },
        { coeffs: [3, 2], op: "<=", rhs: 18 }
    ])

    // Current step in Simplex navigation
    const [currentStepIdx, setCurrentStepIdx] = useState<number>(0)

    // Solve LP
    const result: LPSolverResult = useMemo(() => {
        return solvePrimalSimplex([c1, c2], constraints, sense)
    }, [c1, c2, constraints, sense])

    const totalSteps = result.steps.length
    const activeStep = result.steps[Math.min(currentStepIdx, totalSteps - 1)] || result.steps[0]

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "mezcla_fabrica") {
            setSense("max")
            setC1(3)
            setC2(5)
            setConstraints([
                { coeffs: [1, 0], op: "<=", rhs: 4 },
                { coeffs: [0, 2], op: "<=", rhs: 12 },
                { coeffs: [3, 2], op: "<=", rhs: 18 }
            ])
            setCurrentStepIdx(0)
        } else if (preset === "dieta_min") {
            setSense("min")
            setC1(2)
            setC2(3)
            setConstraints([
                { coeffs: [1, 1], op: ">=", rhs: 6 },
                { coeffs: [2, 1], op: ">=", rhs: 8 }
            ])
            setCurrentStepIdx(0)
        } else if (preset === "utp_tres_recursos") {
            setSense("max")
            setC1(40)
            setC2(30)
            setConstraints([
                { coeffs: [2, 1], op: "<=", rhs: 100 },
                { coeffs: [1, 1], op: "<=", rhs: 80 },
                { coeffs: [1, 2], op: "<=", rhs: 120 }
            ])
            setCurrentStepIdx(0)
        }
    }

    const updateConstraint = (
        index: number,
        field: "c1" | "c2" | "op" | "rhs",
        val: any
    ) => {
        const next = [...constraints]
        if (field === "c1") next[index].coeffs[0] = parseFloat(val) || 0
        if (field === "c2") next[index].coeffs[1] = parseFloat(val) || 0
        if (field === "op") next[index].op = val
        if (field === "rhs") next[index].rhs = parseFloat(val) || 0
        setConstraints(next)
        setCurrentStepIdx(0)
    }

    const addConstraint = () => {
        if (constraints.length >= 4) return
        setConstraints([...constraints, { coeffs: [1, 1], op: "<=", rhs: 10 }])
        setCurrentStepIdx(0)
    }

    const removeConstraint = (index: number) => {
        if (constraints.length <= 1) return
        setConstraints(constraints.filter((_, i) => i !== index))
        setCurrentStepIdx(0)
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-2">
                            <Table2 className="h-3.5 w-3.5" />
                            Investigación de Operaciones I (II7D3) & MIOE S1
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Resolutor Interactivo del Método Simplex Primal
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Ejecución pedagógica paso a paso con cálculo de variables básicas, prueba de la razón mínima, selección de pivote y reporte de precios sombra duales.
                        </p>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("mezcla_fabrica")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                            Mezcla Producción Max
                        </button>
                        <button
                            onClick={() => applyPreset("utp_tres_recursos")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                            3 Recursos Limitados
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Model Builder (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Objective Function Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Función Objetivo
                            </h3>
                            <div className="flex bg-slate-200/80 dark:bg-slate-900 rounded-lg p-0.5 text-xs font-bold">
                                <button
                                    onClick={() => {
                                        setSense("max")
                                        setCurrentStepIdx(0)
                                    }}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        sense === "max"
                                            ? "bg-blue-900 text-white shadow-sm"
                                            : "text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    Maximizar
                                </button>
                                <button
                                    onClick={() => {
                                        setSense("min")
                                        setCurrentStepIdx(0)
                                    }}
                                    className={`px-3 py-1 rounded-md transition-all ${
                                        sense === "min"
                                            ? "bg-blue-900 text-white shadow-sm"
                                            : "text-slate-600 dark:text-slate-400"
                                    }`}
                                >
                                    Minimizar
                                </button>
                            </div>
                        </div>

                        {/* Coeffs Z */}
                        <div className="flex items-center gap-2 text-sm font-bold font-mono">
                            <span className="text-slate-500">Z =</span>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    step="0.5"
                                    value={c1}
                                    onChange={(e) => {
                                        setC1(parseFloat(e.target.value) || 0)
                                        setCurrentStepIdx(0)
                                    }}
                                    className="w-16 px-2 py-1 text-center font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <span>x₁ +</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    step="0.5"
                                    value={c2}
                                    onChange={(e) => {
                                        setC2(parseFloat(e.target.value) || 0)
                                        setCurrentStepIdx(0)
                                    }}
                                    className="w-16 px-2 py-1 text-center font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                />
                                <span>x₂</span>
                            </div>
                        </div>
                    </div>

                    {/* Constraints Builder Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Restricciones Estructurales
                            </h3>
                            {constraints.length < 4 && (
                                <button
                                    onClick={addConstraint}
                                    className="text-xs text-blue-700 dark:text-blue-400 font-bold hover:underline"
                                >
                                    + Añadir Restricción
                                </button>
                            )}
                        </div>

                        <div className="space-y-2">
                            {constraints.map((c, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold"
                                >
                                    <span className="w-5 text-slate-400">R{i + 1}:</span>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={c.coeffs[0]}
                                        onChange={(e) => updateConstraint(i, "c1", e.target.value)}
                                        className="w-12 px-1 py-0.5 text-center rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                                    />
                                    <span>x₁ +</span>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={c.coeffs[1]}
                                        onChange={(e) => updateConstraint(i, "c2", e.target.value)}
                                        className="w-12 px-1 py-0.5 text-center rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                                    />
                                    <span>x₂</span>
                                    <select
                                        value={c.op}
                                        onChange={(e) => updateConstraint(i, "op", e.target.value)}
                                        className="px-1 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                                    >
                                        <option value="<=">≤</option>
                                        <option value=">=">≥</option>
                                        <option value="=">=</option>
                                    </select>
                                    <input
                                        type="number"
                                        step="1"
                                        value={c.rhs}
                                        onChange={(e) => updateConstraint(i, "rhs", e.target.value)}
                                        className="w-14 px-1 py-0.5 text-center rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-blue-700 dark:text-blue-400"
                                    />
                                    {constraints.length > 1 && (
                                        <button
                                            onClick={() => removeConstraint(i)}
                                            className="text-slate-400 hover:text-rose-500 px-1 ml-auto font-sans"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="text-[11px] text-slate-500 font-mono">
                            Condición de no negatividad: x₁, x₂ ≥ 0
                        </div>
                    </div>

                    {/* Optimal Solution & Shadow Prices Card */}
                    <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                Solución Óptima Global
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-900 text-white">
                                {result.status === "optimal" ? "Factible & Óptimo" : result.status}
                            </span>
                        </div>

                        {result.status === "optimal" && (
                            <>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900">
                                        <span className="text-[10px] text-slate-500 block">Z* Óptimo</span>
                                        <span className="text-lg font-mono font-black text-blue-900 dark:text-blue-300">
                                            {result.objectiveValue.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900">
                                        <span className="text-[10px] text-slate-500 block">x₁*</span>
                                        <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                                            {result.solution[0]?.toFixed(2) ?? "0.00"}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900">
                                        <span className="text-[10px] text-slate-500 block">x₂*</span>
                                        <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                                            {result.solution[1]?.toFixed(2) ?? "0.00"}
                                        </span>
                                    </div>
                                </div>

                                {/* Shadow Prices (Dual Values) */}
                                <div>
                                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                                        Precios Sombra (Valores Duales y₁..yₘ):
                                    </span>
                                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                                        {result.shadowPrices.map((sp, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800"
                                            >
                                                y_{idx + 1} = ${sp.toFixed(2)}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-slate-500 block mt-1">
                                        Indica el incremento en Z ante un aumento unitario en el recurso bᵢ.
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Column: Step-by-Step Simplex Tableau Navigation (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                    {/* Navigation Controls Bar */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Iteración:
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-blue-900 text-white">
                                {activeStep ? activeStep.stepIndex : 0} de {totalSteps - 1}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentStepIdx === 0}
                                onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
                                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-40 flex items-center gap-1"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                            </button>
                            <button
                                disabled={currentStepIdx >= totalSteps - 1}
                                onClick={() =>
                                    setCurrentStepIdx((p) => Math.min(totalSteps - 1, p + 1))
                                }
                                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-900 text-white disabled:opacity-40 flex items-center gap-1"
                            >
                                Siguiente <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => setCurrentStepIdx(totalSteps - 1)}
                                className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                            >
                                Ir al Óptimo
                            </button>
                            <button
                                onClick={() => setCurrentStepIdx(0)}
                                className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                                title="Reiniciar al inicio"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Step Description Card */}
                    {activeStep && (
                        <div
                            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                                activeStep.isOptimal
                                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300"
                                    : "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-950 dark:text-blue-200"
                            }`}
                        >
                            <strong>Estado del algoritmo: </strong>
                            {activeStep.description}
                        </div>
                    )}

                    {/* Interactive Simplex Tableau Display */}
                    {activeStep && (
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <table className="w-full text-xs text-center border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                                        <th className="py-2 px-3 text-left">Base</th>
                                        {activeStep.colHeaders.map((col, j) => {
                                            const isPivotCol = j === activeStep.pivotCol
                                            return (
                                                <th
                                                    key={j}
                                                    className={`py-2 px-2.5 ${
                                                        isPivotCol
                                                            ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                                                            : ""
                                                    }`}
                                                >
                                                    {col}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                                    {activeStep.tableau.map((row, i) => {
                                        const isPivotRow = i === activeStep.pivotRow
                                        const rowLabel = activeStep.rowHeaders[i] || `Fila ${i}`
                                        return (
                                            <tr
                                                key={i}
                                                className={
                                                    isPivotRow
                                                        ? "bg-amber-50/80 dark:bg-amber-950/30"
                                                        : i === 0
                                                        ? "bg-slate-50/60 dark:bg-slate-950/40 font-bold"
                                                        : ""
                                                }
                                            >
                                                <td className="py-2 px-3 text-left font-sans font-bold text-slate-700 dark:text-slate-300">
                                                    {rowLabel}
                                                </td>
                                                {row.map((val, j) => {
                                                    const isPivotCell =
                                                        i === activeStep.pivotRow &&
                                                        j === activeStep.pivotCol
                                                    return (
                                                        <td
                                                            key={j}
                                                            className={`py-2 px-2 ${
                                                                isPivotCell
                                                                    ? "bg-amber-400 text-slate-950 font-black rounded"
                                                                    : j === activeStep.pivotCol
                                                                    ? "bg-amber-50/60 dark:bg-amber-950/20"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {val.toFixed(2)}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Elementary Operations Explanation */}
                    {activeStep && activeStep.pivotRow && activeStep.pivotCol !== undefined && (
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block">
                                Operaciones elementales de renglón de Gauss-Jordan para esta iteración:
                            </span>
                            <div className="font-mono text-[11px] text-blue-800 dark:text-blue-300">
                                1. R_{activeStep.pivotRow} ← R_{activeStep.pivotRow} / (Pivote ={" "}
                                {activeStep.tableau[activeStep.pivotRow][activeStep.pivotCol].toFixed(2)})
                            </div>
                            <div className="font-mono text-[11px] text-slate-500">
                                2. R_k ← R_k - (coeficiente_k) · R_{activeStep.pivotRow} (para todo renglón k ≠ {activeStep.pivotRow})
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SimplexSolverTool
