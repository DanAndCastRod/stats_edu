"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, Legend
} from "recharts"

interface TDistributionProps {
    initialDF?: number
}

// Normal PDF
function normalPDF(x: number): number {
    const coefficient = 1 / Math.sqrt(2 * Math.PI)
    return coefficient * Math.exp(-0.5 * x * x)
}

// Gamma function approximation (Lanczos)
function gamma(z: number): number {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
    }
    z -= 1
    const g = 7
    const c = [
        0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
    ]
    let x = c[0]
    for (let i = 1; i < g + 2; i++) {
        x += c[i] / (z + i)
    }
    const t = z + g + 0.5
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
}

// Student's t PDF
function tPDF(x: number, df: number): number {
    const coeff = gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * gamma(df / 2))
    return coeff * Math.pow(1 + (x * x) / df, -(df + 1) / 2)
}

export function TDistribution({ initialDF = 5 }: TDistributionProps) {
    const [df, setDF] = useState(initialDF)
    const [showNormal, setShowNormal] = useState(true)

    const { curveData, criticalValues } = useMemo(() => {
        const data: { x: number; t: number; z: number }[] = []

        for (let x = -4; x <= 4; x += 0.05) {
            data.push({
                x,
                t: tPDF(x, df),
                z: normalPDF(x)
            })
        }

        // Approximate critical values (using normal approximation for simplicity)
        // These are rough estimates for visualization
        const t95 = 1.96 + 2 / df // Rough approximation
        const t99 = 2.576 + 4 / df

        return {
            curveData: data,
            criticalValues: { t95, t99 }
        }
    }, [df])

    // Kurtosis indicator
    const kurtosisRatio = useMemo(() => {
        if (df <= 4) return Infinity
        return 3 * (df - 2) / (df - 4) // Excess kurtosis formula for t
    }, [df])

    return (
        <ChartContainer
            title="Distribución t vs Normal Estándar"
            description="Observa cómo la t converge a Z cuando df → ∞"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Grados de Libertad (df = n - 1)"
                        value={df}
                        min={1}
                        max={50}
                        onChange={setDF}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Mostrar Normal
                        </label>
                        <motion.button
                            onClick={() => setShowNormal(!showNormal)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${showNormal
                                    ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                        >
                            {showNormal ? "✓ Normal Z Visible" : "Normal Z Oculta"}
                        </motion.button>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="zGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[-4, 4]}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" />
                            <Legend />

                            {/* Normal curve (reference) */}
                            {showNormal && (
                                <Area
                                    type="monotone"
                                    dataKey="z"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fill="url(#zGrad)"
                                    name="Normal Z"
                                />
                            )}

                            {/* t distribution */}
                            <Area
                                type="monotone"
                                dataKey="t"
                                stroke="#2563EB"
                                strokeWidth={2}
                                fill="url(#tGrad)"
                                name={`t(df=${df})`}
                            />

                            {/* Reference lines at 0 */}
                            <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="3 3" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats comparison */}
                <motion.div
                    key={df}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                >
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <div className="text-xs text-blue-500 uppercase tracking-wider">df</div>
                        <div className="text-2xl font-mono font-bold text-blue-600">{df}</div>
                        <div className="text-xs text-blue-400">Grados de libertad</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">t₀.₀₂₅ (95%)</div>
                        <div className="text-lg font-mono">{criticalValues.t95.toFixed(3)}</div>
                        <div className="text-xs text-slate-400">vs Z = 1.96</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">t₀.₀₀₅ (99%)</div>
                        <div className="text-lg font-mono">{criticalValues.t99.toFixed(3)}</div>
                        <div className="text-xs text-slate-400">vs Z = 2.576</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${df >= 30
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                        }`}>
                        <div className={`text-xs uppercase tracking-wider ${df >= 30 ? "text-emerald-500" : "text-amber-500"}`}>
                            Convergencia
                        </div>
                        <div className={`text-lg font-bold ${df >= 30 ? "text-emerald-600" : "text-amber-600"}`}>
                            {df >= 30 ? "t ≈ Z" : "t ≠ Z"}
                        </div>
                        <div className={`text-xs ${df >= 30 ? "text-emerald-400" : "text-amber-400"}`}>
                            {df >= 30 ? "✓ Usar Z ok" : "⚠️ Usar t"}
                        </div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Observa:</strong><br />
                    • La t tiene **colas más pesadas** que la Z (más probabilidad en extremos)<br />
                    • Con df pequeño, los valores críticos son mayores → ICs más anchos<br />
                    • Regla: si df ≥ 30, la t es prácticamente igual a la Z
                </div>
            </div>
        </ChartContainer>
    )
}
