"use client"

import React, { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts"

interface CLTSimulationProps {
    initialN?: number
    maxN?: number
    numSamples?: number
}

// Generate sample means from uniform distribution
function generateSampleMeans(n: number, numSamples: number): number[] {
    const means: number[] = []
    for (let i = 0; i < numSamples; i++) {
        let sum = 0
        for (let j = 0; j < n; j++) {
            sum += Math.random() // Uniform(0,1)
        }
        means.push(sum / n)
    }
    return means
}

// Create histogram data
function createHistogram(data: number[], bins: number = 30): { x: number; y: number }[] {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const binWidth = (max - min) / bins

    const histogram: number[] = new Array(bins).fill(0)

    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
        histogram[binIndex]++
    })

    // Normalize to density
    const total = data.length * binWidth

    return histogram.map((count, i) => ({
        x: min + (i + 0.5) * binWidth,
        y: count / total
    }))
}

// Normal PDF for overlay
function normalPDF(x: number, mean: number, std: number): number {
    const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return coefficient * Math.exp(exponent)
}

export function CLTSimulation({
    initialN = 1,
    maxN = 100,
    numSamples = 1000
}: CLTSimulationProps) {
    const [n, setN] = useState(initialN)
    const [isAnimating, setIsAnimating] = useState(false)

    // Generate sample means based on current n
    const { histogramData, normalCurve, stats } = useMemo(() => {
        const means = generateSampleMeans(n, numSamples)
        const hist = createHistogram(means, 40)

        // For Uniform(0,1): mean=0.5, variance=1/12
        // Sample mean: E[X̄]=0.5, Var(X̄)=1/(12n), SD=1/sqrt(12n)
        const theoreticalMean = 0.5
        const theoreticalSD = 1 / Math.sqrt(12 * n)

        // Generate normal curve points
        const normalPoints = []
        for (let x = 0; x <= 1; x += 0.01) {
            normalPoints.push({
                x,
                normal: normalPDF(x, theoreticalMean, theoreticalSD)
            })
        }

        // Calculate actual stats
        const actualMean = means.reduce((a, b) => a + b, 0) / means.length
        const actualSD = Math.sqrt(
            means.reduce((sum, x) => sum + Math.pow(x - actualMean, 2), 0) / (means.length - 1)
        )

        return {
            histogramData: hist,
            normalCurve: normalPoints,
            stats: { actualMean, actualSD, theoreticalMean, theoreticalSD }
        }
    }, [n, numSamples])

    // Animate n from 1 to maxN
    const handleAnimate = useCallback(() => {
        setIsAnimating(true)
        setN(1)

        let current = 1
        const interval = setInterval(() => {
            current += 1
            if (current > maxN) {
                clearInterval(interval)
                setIsAnimating(false)
                return
            }
            setN(current)
        }, 50)
    }, [maxN])

    return (
        <ChartContainer
            title="Teorema del Límite Central - Simulación"
            description={`Distribución de ${numSamples.toLocaleString()} medias muestrales de tamaño n`}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1">
                        <SliderControl
                            label="Tamaño de muestra (n)"
                            value={n}
                            min={1}
                            max={maxN}
                            onChange={setN}
                        />
                    </div>
                    <motion.button
                        onClick={handleAnimate}
                        disabled={isAnimating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-brand-blue text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnimating ? "Animando..." : "▶ Animar Convergencia"}
                    </motion.button>
                </div>

                {/* Chart */}
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={histogramData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[0, 1]}
                                tickFormatter={(v) => v.toFixed(2)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                formatter={(value) => [(value as number).toFixed(4), "Densidad"]}
                                labelFormatter={(label) => `x = ${Number(label).toFixed(3)}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#2563EB"
                                fillOpacity={1}
                                fill="url(#colorHist)"
                            />
                            <ReferenceLine
                                x={0.5}
                                stroke="#10b981"
                                strokeDasharray="5 5"
                                label={{ value: "μ = 0.5", fill: "#10b981", fontSize: 12 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={n}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                    >
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <div className="text-xs text-slate-500 uppercase tracking-wider">n</div>
                            <div className="text-2xl font-bold text-brand-blue">{n}</div>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Media Obs.</div>
                            <div className="text-lg font-mono">{stats.actualMean.toFixed(4)}</div>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <div className="text-xs text-slate-500 uppercase tracking-wider">SD Obs.</div>
                            <div className="text-lg font-mono">{stats.actualSD.toFixed(4)}</div>
                        </div>
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                            <div className="text-xs text-emerald-600 uppercase tracking-wider">SD Teórica</div>
                            <div className="text-lg font-mono text-emerald-600">{stats.theoreticalSD.toFixed(4)}</div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Insight */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-200">
                    <strong>💡 Observa:</strong> A medida que n aumenta, la distribución de las medias muestrales
                    se aproxima a una Normal, sin importar que la población original sea Uniforme.
                    La desviación estándar se reduce como <code className="bg-amber-200 dark:bg-amber-800 px-1 rounded">σ/√n</code>.
                </div>
            </div>
        </ChartContainer>
    )
}
