"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface ProportionCIProps {
    initialP?: number
    initialN?: number
}

// Normal PDF
function normalPDF(x: number, mean: number, std: number): number {
    const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return coefficient * Math.exp(exponent)
}

// Z values for common confidence levels
const Z_VALUES: Record<number, number> = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576
}

export function ProportionCI({
    initialP = 0.6,
    initialN = 100
}: ProportionCIProps) {
    const [pHat, setPHat] = useState(initialP)
    const [n, setN] = useState(initialN)
    const [confidence, setConfidence] = useState(0.95)

    const { curveData, interval, standardError, marginOfError, isValid } = useMemo(() => {
        // Standard error for proportion
        const se = Math.sqrt((pHat * (1 - pHat)) / n)
        const z = Z_VALUES[confidence] || 1.96
        const moe = z * se

        const lower = Math.max(0, pHat - moe)
        const upper = Math.min(1, pHat + moe)

        // Check normal approximation validity
        const valid = n * pHat >= 10 && n * (1 - pHat) >= 10

        // Generate sampling distribution curve
        const minX = Math.max(0, pHat - 4 * se)
        const maxX = Math.min(1, pHat + 4 * se)
        const step = (maxX - minX) / 100

        const data = []
        for (let x = minX; x <= maxX; x += step) {
            data.push({ x, y: normalPDF(x, pHat, se) })
        }

        return {
            curveData: data,
            interval: { lower, upper },
            standardError: se,
            marginOfError: moe,
            isValid: valid
        }
    }, [pHat, n, confidence])

    const confidencePercent = Math.round(confidence * 100)

    return (
        <ChartContainer
            title="Intervalo de Confianza para Proporciones"
            description={`IC del ${confidencePercent}% para p usando aproximación normal`}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <SliderControl
                        label="Proporción muestral (p̂)"
                        value={pHat}
                        min={0.05}
                        max={0.95}
                        step={0.01}
                        onChange={setPHat}
                    />
                    <SliderControl
                        label="Tamaño muestra (n)"
                        value={n}
                        min={20}
                        max={500}
                        step={10}
                        onChange={setN}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Nivel de Confianza
                        </label>
                        <div className="flex gap-2">
                            {[0.90, 0.95, 0.99].map(conf => (
                                <motion.button
                                    key={conf}
                                    onClick={() => setConfidence(conf)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 px-2 py-1 rounded text-sm font-bold transition-all ${confidence === conf
                                            ? "bg-brand-blue text-white"
                                            : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                >
                                    {Math.round(conf * 100)}%
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Validity warning */}
                {!isValid && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-800 dark:text-red-200">
                        ⚠️ <strong>Advertencia:</strong> np = {(n * pHat).toFixed(0)} o n(1-p) = {(n * (1 - pHat)).toFixed(0)} {"<"} 10.
                        La aproximación normal puede no ser válida.
                    </div>
                )}

                {/* Chart */}
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="propCIGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(v) => (v * 100).toFixed(0) + "%"}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Confidence interval shaded */}
                            <ReferenceArea
                                x1={interval.lower}
                                x2={interval.upper}
                                fill="#8b5cf6"
                                fillOpacity={0.3}
                            />

                            {/* Curve */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fill="url(#propCIGrad)"
                            />

                            {/* p-hat line */}
                            <ReferenceLine
                                x={pHat}
                                stroke="#10b981"
                                strokeWidth={2}
                                label={{ value: "p̂", fill: "#10b981", fontSize: 14, fontWeight: "bold" }}
                            />

                            {/* Interval bounds */}
                            <ReferenceLine x={interval.lower} stroke="#8b5cf6" strokeDasharray="5 5" />
                            <ReferenceLine x={interval.upper} stroke="#8b5cf6" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Result */}
                <motion.div
                    key={`${pHat}-${n}-${confidence}`}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl text-white text-center"
                >
                    <div className="text-sm uppercase tracking-wider opacity-80 mb-2">
                        Intervalo de Confianza del {confidencePercent}%
                    </div>
                    <div className="text-3xl font-black mb-2">
                        [{(interval.lower * 100).toFixed(1)}%, {(interval.upper * 100).toFixed(1)}%]
                    </div>
                    <div className="text-sm opacity-80">
                        p̂ ± ME = {(pHat * 100).toFixed(1)}% ± {(marginOfError * 100).toFixed(1)}%
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Error Estándar</div>
                        <div className="text-lg font-mono">{(standardError * 100).toFixed(2)}%</div>
                        <div className="text-xs text-slate-400">√(p̂q̂/n)</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">n × p̂</div>
                        <div className={`text-lg font-mono ${n * pHat >= 10 ? "text-emerald-600" : "text-red-600"}`}>
                            {(n * pHat).toFixed(0)}
                        </div>
                        <div className="text-xs text-slate-400">≥ 10 requerido</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">n × (1-p̂)</div>
                        <div className={`text-lg font-mono ${n * (1 - pHat) >= 10 ? "text-emerald-600" : "text-red-600"}`}>
                            {(n * (1 - pHat)).toFixed(0)}
                        </div>
                        <div className="text-xs text-slate-400">≥ 10 requerido</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Ancho IC</div>
                        <div className="text-lg font-mono">{((interval.upper - interval.lower) * 100).toFixed(1)}%</div>
                    </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Fórmula:</strong> p̂ ± z × √(p̂(1-p̂)/n)<br />
                    • El SE es máximo cuando p̂ = 0.5<br />
                    • Para n más grande necesitas ~4x muestras para reducir el ancho a la mitad
                </div>
            </div>
        </ChartContainer>
    )
}
