"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface BoxPlotExplorerProps {
    initialData?: number[]
}

// Generate sample data with controllable outliers
function generateData(n: number, hasOutliers: boolean, skew: number): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        // Base normal distribution
        const u1 = Math.random()
        const u2 = Math.random()
        let z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)

        // Apply skew
        if (skew > 0) z = Math.abs(z) * (1 + skew * 0.5)
        if (skew < 0) z = -Math.abs(z) * (1 + Math.abs(skew) * 0.5)

        data.push(50 + 10 * z)
    }

    // Add outliers
    if (hasOutliers) {
        data[0] = 10    // Low outlier
        data[1] = 95    // High outlier
    }

    return data.sort((a, b) => a - b)
}

// Calculate box plot statistics
function calculateBoxPlotStats(data: number[]) {
    const sorted = [...data].sort((a, b) => a - b)
    const n = sorted.length

    const q1 = sorted[Math.floor(n * 0.25)]
    const median = sorted[Math.floor(n * 0.5)]
    const q3 = sorted[Math.floor(n * 0.75)]
    const iqr = q3 - q1

    const lowerFence = q1 - 1.5 * iqr
    const upperFence = q3 + 1.5 * iqr

    const outliers = sorted.filter(x => x < lowerFence || x > upperFence)
    const whiskerLow = sorted.find(x => x >= lowerFence) || sorted[0]
    const whiskerHigh = [...sorted].reverse().find(x => x <= upperFence) || sorted[n - 1]

    const mean = sorted.reduce((a, b) => a + b, 0) / n

    return {
        min: sorted[0],
        max: sorted[n - 1],
        q1,
        median,
        q3,
        iqr,
        mean,
        lowerFence,
        upperFence,
        whiskerLow,
        whiskerHigh,
        outliers
    }
}

export function BoxPlotExplorer({ initialData }: BoxPlotExplorerProps) {
    const [n, setN] = useState(50)
    const [hasOutliers, setHasOutliers] = useState(true)
    const [skew, setSkew] = useState(0)
    const [data, setData] = useState<number[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(initialData || generateData(n, hasOutliers, skew))
    }, [])

    useEffect(() => {
        if (isClient) {
            setData(generateData(n, hasOutliers, skew))
        }
    }, [n, hasOutliers, skew, isClient])

    const stats = useMemo(() => calculateBoxPlotStats(data), [data])

    // Scale for visualization
    const scale = (value: number) => ((value - 0) / 100) * 100

    if (!isClient) {
        return (
            <ChartContainer title="Diagrama de Caja Interactivo" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Diagrama de Caja Interactivo"
            description="Explora Q1, Q2 (mediana), Q3, IQR y outliers"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label="Tamaño de muestra (n)"
                        value={n}
                        min={20}
                        max={200}
                        onChange={setN}
                    />
                    <SliderControl
                        label="Sesgo"
                        value={skew}
                        min={-2}
                        max={2}
                        step={0.5}
                        onChange={setSkew}
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Outliers
                        </label>
                        <motion.button
                            onClick={() => setHasOutliers(!hasOutliers)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${hasOutliers
                                    ? "bg-red-100 text-red-700 border-2 border-red-300"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                        >
                            {hasOutliers ? "✓ Con Outliers" : "Sin Outliers"}
                        </motion.button>
                    </div>
                </div>

                {/* Box Plot Visualization */}
                <div className="relative h-40 bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                    {/* Scale */}
                    <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-slate-300">
                        {[0, 25, 50, 75, 100].map(tick => (
                            <div key={tick} className="absolute" style={{ left: `${tick}%` }}>
                                <div className="w-0.5 h-2 bg-slate-400 -translate-x-1/2" />
                                <div className="text-xs text-slate-500 -translate-x-1/2 mt-1">{tick}</div>
                            </div>
                        ))}
                    </div>

                    {/* Box and Whiskers */}
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-16">
                        {/* Whisker line */}
                        <motion.div
                            className="absolute h-0.5 bg-slate-400 top-1/2"
                            style={{ left: `${scale(stats.whiskerLow)}%`, width: `${scale(stats.whiskerHigh) - scale(stats.whiskerLow)}%` }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                        />

                        {/* Left whisker cap */}
                        <motion.div
                            className="absolute w-0.5 h-8 bg-slate-400 top-1/2 -translate-y-1/2"
                            style={{ left: `${scale(stats.whiskerLow)}%` }}
                        />

                        {/* Right whisker cap */}
                        <motion.div
                            className="absolute w-0.5 h-8 bg-slate-400 top-1/2 -translate-y-1/2"
                            style={{ left: `${scale(stats.whiskerHigh)}%` }}
                        />

                        {/* Box */}
                        <motion.div
                            className="absolute h-12 bg-blue-200 dark:bg-blue-800 border-2 border-blue-500 top-1/2 -translate-y-1/2 rounded"
                            style={{
                                left: `${scale(stats.q1)}%`,
                                width: `${scale(stats.q3) - scale(stats.q1)}%`
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        />

                        {/* Median line */}
                        <motion.div
                            className="absolute w-1 h-12 bg-emerald-500 top-1/2 -translate-y-1/2 z-10"
                            style={{ left: `${scale(stats.median)}%` }}
                        />

                        {/* Mean marker */}
                        <motion.div
                            className="absolute w-3 h-3 bg-red-500 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                            style={{ left: `${scale(stats.mean)}%` }}
                        />

                        {/* Outliers */}
                        {stats.outliers.map((outlier, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-amber-500 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2"
                                style={{ left: `${scale(outlier)}%` }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-300 border-2 border-blue-500 rounded"></div>
                        <span>Caja (Q1-Q3)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-emerald-500"></div>
                        <span>Mediana</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Media</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span>Outliers</span>
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    key={`${n}-${hasOutliers}-${skew}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm"
                >
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="text-xs text-slate-500">Q1</div>
                        <div className="font-mono font-bold">{stats.q1.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <div className="text-xs text-emerald-600">Mediana</div>
                        <div className="font-mono font-bold text-emerald-700">{stats.median.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <div className="text-xs text-slate-500">Q3</div>
                        <div className="font-mono font-bold">{stats.q3.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <div className="text-xs text-blue-600">IQR</div>
                        <div className="font-mono font-bold text-blue-700">{stats.iqr.toFixed(1)}</div>
                    </div>
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <div className="text-xs text-red-600">Media</div>
                        <div className="font-mono font-bold text-red-700">{stats.mean.toFixed(1)}</div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-200">
                    <strong>💡 Observa:</strong><br />
                    • Outliers: {stats.outliers.length} punto{stats.outliers.length !== 1 ? "s" : ""} fuera de [{stats.lowerFence.toFixed(1)}, {stats.upperFence.toFixed(1)}]<br />
                    • {skew > 0 ? "Sesgo positivo: Media > Mediana" : skew < 0 ? "Sesgo negativo: Media < Mediana" : "Simétrico: Media ≈ Mediana"}
                </div>
            </div>
        </ChartContainer>
    )
}
