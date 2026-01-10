"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface PValueExplainerProps {
    initialZScore?: number
    testType?: "two-tailed" | "left" | "right"
}

// Normal PDF
function normalPDF(x: number): number {
    const coefficient = 1 / Math.sqrt(2 * Math.PI)
    return coefficient * Math.exp(-0.5 * x * x)
}

// Normal CDF approximation
function normalCDF(z: number): number {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const sign = z < 0 ? -1 : 1
    z = Math.abs(z) / Math.sqrt(2)

    const t = 1.0 / (1.0 + p * z)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)

    return 0.5 * (1.0 + sign * y)
}

export function PValueExplainer({
    initialZScore = 1.96,
    testType = "two-tailed"
}: PValueExplainerProps) {
    const [zScore, setZScore] = useState(initialZScore)
    const [selectedTest, setSelectedTest] = useState<"two-tailed" | "left" | "right">(testType)
    const [alpha, setAlpha] = useState(0.05)

    const { curveData, pValue, decision, regions } = useMemo(() => {
        // Generate normal curve
        const data: { x: number; y: number }[] = []
        for (let x = -4; x <= 4; x += 0.05) {
            data.push({ x, y: normalPDF(x) })
        }

        // Calculate p-value based on test type
        let pVal: number
        let regs: { left?: number; right?: number } = {}

        if (selectedTest === "two-tailed") {
            pVal = 2 * (1 - normalCDF(Math.abs(zScore)))
            regs = { left: -Math.abs(zScore), right: Math.abs(zScore) }
        } else if (selectedTest === "left") {
            pVal = normalCDF(zScore)
            regs = { left: zScore }
        } else {
            pVal = 1 - normalCDF(zScore)
            regs = { right: zScore }
        }

        const dec = pVal < alpha ? "Rechazar H₀" : "No Rechazar H₀"

        return { curveData: data, pValue: pVal, decision: dec, regions: regs }
    }, [zScore, selectedTest, alpha])

    const alphaZ = {
        0.10: 1.645,
        0.05: 1.96,
        0.01: 2.576
    }

    return (
        <ChartContainer
            title="Visualizador de P-Valor"
            description="Entiende qué significa el p-valor gráficamente"
        >
            <div className="space-y-6">
                {/* Test type selector */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {[
                        { key: "left", label: "Cola Izquierda (H₁: μ < μ₀)" },
                        { key: "two-tailed", label: "Dos Colas (H₁: μ ≠ μ₀)" },
                        { key: "right", label: "Cola Derecha (H₁: μ > μ₀)" }
                    ].map(({ key, label }) => (
                        <motion.button
                            key={key}
                            onClick={() => setSelectedTest(key as "two-tailed" | "left" | "right")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedTest === key
                                    ? "bg-brand-blue text-white"
                                    : "bg-slate-200 dark:bg-slate-700"
                                }`}
                        >
                            {label}
                        </motion.button>
                    ))}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Estadístico Z calculado"
                        value={zScore}
                        min={-4}
                        max={4}
                        step={0.01}
                        onChange={setZScore}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Nivel α
                        </label>
                        <div className="flex gap-2">
                            {[0.10, 0.05, 0.01].map(a => (
                                <motion.button
                                    key={a}
                                    onClick={() => setAlpha(a)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 px-2 py-1 rounded text-sm font-bold transition-all ${alpha === a
                                            ? "bg-brand-blue text-white"
                                            : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                >
                                    {(a * 100).toFixed(0)}%
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="pvalGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[-4, 4]}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* P-value region(s) */}
                            {selectedTest === "two-tailed" && (
                                <>
                                    <ReferenceArea x1={-4} x2={regions.left} fill="#ef4444" fillOpacity={0.4} />
                                    <ReferenceArea x1={regions.right} x2={4} fill="#ef4444" fillOpacity={0.4} />
                                </>
                            )}
                            {selectedTest === "left" && (
                                <ReferenceArea x1={-4} x2={regions.left} fill="#ef4444" fillOpacity={0.4} />
                            )}
                            {selectedTest === "right" && (
                                <ReferenceArea x1={regions.right} x2={4} fill="#ef4444" fillOpacity={0.4} />
                            )}

                            {/* Curve */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#pvalGrad)"
                            />

                            {/* Z score line */}
                            <ReferenceLine
                                x={zScore}
                                stroke="#ef4444"
                                strokeWidth={3}
                                label={{ value: `Z=${zScore.toFixed(2)}`, fill: "#ef4444", fontSize: 12, fontWeight: "bold" }}
                            />

                            {/* Critical value(s) */}
                            {selectedTest === "two-tailed" && (
                                <>
                                    <ReferenceLine x={-alphaZ[alpha as keyof typeof alphaZ] || 1.96} stroke="#10b981" strokeDasharray="5 5" />
                                    <ReferenceLine x={alphaZ[alpha as keyof typeof alphaZ] || 1.96} stroke="#10b981" strokeDasharray="5 5" />
                                </>
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Result */}
                <motion.div
                    key={`${zScore.toFixed(2)}-${pValue.toFixed(4)}`}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-white text-center ${pValue < alpha
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        }`}
                >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">Z Calculado</div>
                            <div className="text-2xl font-black">{zScore.toFixed(3)}</div>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">P-Valor</div>
                            <div className="text-2xl font-black">{pValue < 0.0001 ? "<0.0001" : pValue.toFixed(4)}</div>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">α</div>
                            <div className="text-2xl font-black">{alpha}</div>
                        </div>
                    </div>
                    <div className="text-xl font-bold">
                        {decision}
                    </div>
                    <div className="text-sm opacity-80 mt-2">
                        {pValue < alpha
                            ? `p-valor (${pValue.toFixed(4)}) < α (${alpha}) → Evidencia significativa`
                            : `p-valor (${pValue.toFixed(4)}) ≥ α (${alpha}) → No hay evidencia suficiente`}
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 El p-valor es:</strong><br />
                    • El área sombreada en rojo bajo la curva<br />
                    • La probabilidad de obtener un resultado tan extremo (o más) si H₀ fuera verdadera<br />
                    • Cuanto más pequeño, más evidencia contra H₀
                </div>
            </div>
        </ChartContainer>
    )
}
