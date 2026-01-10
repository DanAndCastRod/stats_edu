"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface ConfidenceIntervalProps {
    initialMean?: number
    initialStd?: number
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

export function ConfidenceInterval({
    initialMean = 100,
    initialStd = 15,
    initialN = 30
}: ConfidenceIntervalProps) {
    const [mean, setMean] = useState(initialMean)
    const [std, setStd] = useState(initialStd)
    const [n, setN] = useState(initialN)
    const [confidence, setConfidence] = useState(0.95)

    const { curveData, interval, marginOfError, standardError } = useMemo(() => {
        const se = std / Math.sqrt(n)
        const z = Z_VALUES[confidence] || 1.96
        const moe = z * se

        const lower = mean - moe
        const upper = mean + moe

        // Generate curve data for sampling distribution
        const minX = mean - 4 * se
        const maxX = mean + 4 * se
        const step = (maxX - minX) / 200

        const data = []
        for (let x = minX; x <= maxX; x += step) {
            data.push({ x, y: normalPDF(x, mean, se) })
        }

        return {
            curveData: data,
            interval: { lower, upper },
            marginOfError: moe,
            standardError: se
        }
    }, [mean, std, n, confidence])

    const confidencePercent = Math.round(confidence * 100)

    return (
        <ChartContainer
            title="Intervalo de Confianza para la Media"
            description={`IC del ${confidencePercent}% para μ con σ conocida`}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="Media muestral (x̄)"
                        value={mean}
                        min={50}
                        max={150}
                        onChange={setMean}
                    />
                    <SliderControl
                        label="Desv. Est. (σ)"
                        value={std}
                        min={5}
                        max={30}
                        onChange={setStd}
                    />
                    <SliderControl
                        label="Tamaño muestra (n)"
                        value={n}
                        min={5}
                        max={200}
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

                {/* Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="ciGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(v) => v.toFixed(1)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Confidence interval shaded */}
                            <ReferenceArea
                                x1={interval.lower}
                                x2={interval.upper}
                                fill="#2563EB"
                                fillOpacity={0.3}
                            />

                            {/* Curve */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#2563EB"
                                strokeWidth={2}
                                fill="url(#ciGradient)"
                            />

                            {/* Mean line */}
                            <ReferenceLine
                                x={mean}
                                stroke="#10b981"
                                strokeWidth={2}
                                label={{ value: "x̄", fill: "#10b981", fontSize: 14, fontWeight: "bold" }}
                            />

                            {/* Interval bounds */}
                            <ReferenceLine x={interval.lower} stroke="#2563EB" strokeDasharray="5 5" />
                            <ReferenceLine x={interval.upper} stroke="#2563EB" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Result */}
                <motion.div
                    key={`${mean}-${n}-${confidence}`}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white text-center"
                >
                    <div className="text-sm uppercase tracking-wider opacity-80 mb-2">
                        Intervalo de Confianza del {confidencePercent}%
                    </div>
                    <div className="text-3xl font-black mb-2">
                        [{interval.lower.toFixed(2)}, {interval.upper.toFixed(2)}]
                    </div>
                    <div className="text-sm opacity-80">
                        x̄ ± {marginOfError.toFixed(2)} = {mean.toFixed(2)} ± {marginOfError.toFixed(2)}
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Error Estándar</div>
                        <div className="text-xl font-mono">{standardError.toFixed(3)}</div>
                        <div className="text-xs text-slate-400">σ/√n = {std}/{Math.sqrt(n).toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Margen de Error</div>
                        <div className="text-xl font-mono">{marginOfError.toFixed(3)}</div>
                        <div className="text-xs text-slate-400">z × SE = {Z_VALUES[confidence]} × {standardError.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Ancho del IC</div>
                        <div className="text-xl font-mono">{(2 * marginOfError).toFixed(3)}</div>
                        <div className="text-xs text-slate-400">2 × ME</div>
                    </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>💡 Trade-offs:</strong> Aumentar n reduce el ancho del IC (más precisión), pero cuesta más.
                    Aumentar la confianza (90%→99%) hace el IC más ancho (menos precisión).
                </div>
            </div>
        </ChartContainer>
    )
}
