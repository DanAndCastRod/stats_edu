"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, Cell
} from "recharts"

interface SkewedHistogramProps {
    initialSkew?: number
}

// Generate skewed data using exponential transformation
function generateSkewedData(skew: number, size: number = 1000): number[] {
    const data: number[] = []
    for (let i = 0; i < size; i++) {
        let value: number
        if (skew > 0) {
            // Right skew: exponential-like
            value = -Math.log(1 - Math.random()) * (10 + skew * 5)
        } else if (skew < 0) {
            // Left skew: reverse exponential
            value = 100 + Math.log(1 - Math.random()) * (10 - skew * 5)
        } else {
            // Symmetric: normal-ish
            const u1 = Math.random()
            const u2 = Math.random()
            value = 50 + 15 * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        }
        data.push(Math.max(0, Math.min(100, value)))
    }
    return data
}

// Calculate statistics
function calculateStats(data: number[]): { mean: number; median: number; mode: number } {
    const sorted = [...data].sort((a, b) => a - b)
    const n = sorted.length

    // Mean
    const mean = data.reduce((a, b) => a + b, 0) / n

    // Median
    const median = n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)]

    // Mode (using histogram bins)
    const bins: Record<number, number> = {}
    data.forEach(v => {
        const bin = Math.floor(v / 5) * 5
        bins[bin] = (bins[bin] || 0) + 1
    })
    const maxCount = Math.max(...Object.values(bins))
    const mode = Number(Object.keys(bins).find(k => bins[Number(k)] === maxCount)) + 2.5

    return { mean, median, mode }
}

// Create histogram
function createHistogram(data: number[], bins: number = 20): { x: number; count: number }[] {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const binWidth = (max - min) / bins

    const histogram: number[] = new Array(bins).fill(0)
    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
        histogram[binIndex]++
    })

    return histogram.map((count, i) => ({
        x: min + (i + 0.5) * binWidth,
        count
    }))
}

export function SkewedHistogram({ initialSkew = 1 }: SkewedHistogramProps) {
    const [skew, setSkew] = useState(initialSkew)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const { histogramData, stats, skewLabel } = useMemo(() => {
        // Only run logic on client to avoid hydration mismatch due to Math.random
        if (!isClient) return {
            histogramData: [],
            stats: { mean: 0, median: 0, mode: 0 },
            skewLabel: ""
        }

        const data = generateSkewedData(skew)
        const hist = createHistogram(data, 25)
        const s = calculateStats(data)

        let label: string
        if (skew > 0.5) label = "Sesgo Positivo (Cola Derecha)"
        else if (skew < -0.5) label = "Sesgo Negativo (Cola Izquierda)"
        else label = "Aproximadamente Simétrica"

        return { histogramData: hist, stats: s, skewLabel: label }
    }, [skew, isClient])

    // Color based on skew
    const getBarColor = (index: number, total: number) => {
        const ratio = index / total
        if (skew > 0.3) return ratio > 0.7 ? "#ef4444" : "#3b82f6"
        if (skew < -0.3) return ratio < 0.3 ? "#ef4444" : "#3b82f6"
        return "#3b82f6"
    }

    if (!isClient) return (
        <ChartContainer title="Media vs Mediana (Cargando...)" description="Preparando simulación...">
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl">
                <span className="text-slate-400 animate-pulse">Generando datos...</span>
            </div>
        </ChartContainer>
    )

    return (
        <ChartContainer
            title="Media vs Mediana en Distribuciones Sesgadas"
            description="Observa cómo el sesgo afecta la posición relativa de media y mediana"
        >
            <div className="space-y-6">
                {/* Control */}
                <SliderControl
                    label="Nivel de Sesgo"
                    value={skew}
                    min={-2}
                    max={2}
                    step={0.1}
                    onChange={setSkew}
                />

                {/* Skew indicator */}
                <div className="flex justify-center">
                    <motion.div
                        key={skewLabel}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`px-4 py-2 rounded-full font-bold text-sm ${skew > 0.5 ? "bg-amber-100 text-amber-800" :
                            skew < -0.5 ? "bg-violet-100 text-violet-800" :
                                "bg-emerald-100 text-emerald-800"
                            }`}
                    >
                        {skewLabel}
                    </motion.div>
                </div>

                {/* Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={histogramData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[0, 100]}
                                tickFormatter={(v) => v.toFixed(0)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" />

                            {/* Statistics lines */}
                            <ReferenceLine
                                x={stats.mean}
                                stroke="#ef4444"
                                strokeWidth={3}
                                label={{ value: `Media = ${stats.mean.toFixed(1)}`, fill: "#ef4444", fontSize: 11, position: "top" }}
                            />
                            <ReferenceLine
                                x={stats.median}
                                stroke="#10b981"
                                strokeWidth={3}
                                label={{ value: `Mediana = ${stats.median.toFixed(1)}`, fill: "#10b981", fontSize: 11, position: "top" }}
                            />

                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {histogramData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getBarColor(index, histogramData.length)}
                                        fillOpacity={0.7}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats comparison */}
                <motion.div
                    key={`${stats.mean.toFixed(2)}-${stats.median.toFixed(2)}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-3 gap-4 text-center"
                >
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-red-500">Media (x̄)</div>
                        <div className="text-2xl font-black text-red-600">{stats.mean.toFixed(1)}</div>
                        <div className="text-xs text-red-400">Sensible a outliers</div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-emerald-500">Mediana</div>
                        <div className="text-2xl font-black text-emerald-600">{stats.median.toFixed(1)}</div>
                        <div className="text-xs text-emerald-400">Robusta a outliers</div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Diferencia</div>
                        <div className="text-2xl font-black text-slate-700 dark:text-slate-300">
                            {Math.abs(stats.mean - stats.median).toFixed(1)}
                        </div>
                        <div className="text-xs text-slate-400">
                            Media {stats.mean > stats.median ? ">" : stats.mean < stats.median ? "<" : "≈"} Mediana
                        </div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Regla práctica:</strong><br />
                    • <strong>Sesgo positivo:</strong> Media {">"} Mediana (cola derecha jala la media)<br />
                    • <strong>Sesgo negativo:</strong> Media {"<"} Mediana (cola izquierda jala la media)<br />
                    • <strong>Simétrico:</strong> Media ≈ Mediana
                </div>
            </div>
        </ChartContainer>
    )
}
