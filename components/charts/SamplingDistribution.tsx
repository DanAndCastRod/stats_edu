"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine
} from "recharts"

interface SamplingDistributionProps {
    populationMean?: number
    populationStd?: number
}

// Normal PDF
function normalPDF(x: number, mean: number, std: number): number {
    const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return coefficient * Math.exp(exponent)
}

// Generate random normal sample
function generateNormalSample(mean: number, std: number, size: number): number[] {
    const samples: number[] = []
    for (let i = 0; i < size; i++) {
        // Box-Muller transform
        const u1 = Math.random()
        const u2 = Math.random()
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        samples.push(mean + std * z)
    }
    return samples
}

export function SamplingDistribution({
    populationMean = 100,
    populationStd = 15
}: SamplingDistributionProps) {
    const [n, setN] = useState(30)
    const [numSamples, setNumSamples] = useState(500)
    const [sampleMeans, setSampleMeans] = useState<number[]>([])
    const [isClient, setIsClient] = useState(false)

    // Generate samples only on client
    useEffect(() => {
        setIsClient(true)
        const means: number[] = []
        for (let i = 0; i < numSamples; i++) {
            const sample = generateNormalSample(populationMean, populationStd, n)
            means.push(sample.reduce((a, b) => a + b, 0) / n)
        }
        setSampleMeans(means)
    }, [n, numSamples, populationMean, populationStd])

    const { histogramData, populationCurve, theoreticalSE, actualStats } = useMemo(() => {
        if (sampleMeans.length === 0) return { histogramData: [], populationCurve: [], theoreticalSE: 0, actualStats: { mean: 0, std: 0 } }

        // Theoretical standard error
        const se = populationStd / Math.sqrt(n)

        // Actual sample mean stats
        const actualMean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length
        const actualStd = Math.sqrt(sampleMeans.reduce((sum, x) => sum + Math.pow(x - actualMean, 2), 0) / (sampleMeans.length - 1))

        // Create histogram of sample means
        const min = populationMean - 4 * se
        const max = populationMean + 4 * se
        const binWidth = (max - min) / 40
        const bins: number[] = new Array(40).fill(0)

        sampleMeans.forEach(mean => {
            const binIndex = Math.min(Math.floor((mean - min) / binWidth), 39)
            if (binIndex >= 0 && binIndex < 40) bins[binIndex]++
        })

        // Normalize to density
        const total = sampleMeans.length * binWidth
        const hist = bins.map((count, i) => ({
            x: min + (i + 0.5) * binWidth,
            y: count / total,
            theoretical: normalPDF(min + (i + 0.5) * binWidth, populationMean, se)
        }))

        // Population curve (wider)
        const popMin = populationMean - 4 * populationStd
        const popMax = populationMean + 4 * populationStd
        const popCurve = []
        for (let x = popMin; x <= popMax; x += (popMax - popMin) / 100) {
            popCurve.push({ x, population: normalPDF(x, populationMean, populationStd) * 0.3 }) // Scaled for visibility
        }

        return {
            histogramData: hist,
            populationCurve: popCurve,
            theoreticalSE: se,
            actualStats: { mean: actualMean, std: actualStd }
        }
    }, [sampleMeans, n, populationMean, populationStd])

    if (!isClient) {
        return (
            <ChartContainer title="Distribución Muestral" description="Cargando...">
                <div className="h-80 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando simulación...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Distribución Muestral de la Media"
            description={`Comparando σ (población) vs σ/√n (muestral)`}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Tamaño de muestra (n)"
                        value={n}
                        min={5}
                        max={100}
                        onChange={setN}
                    />
                    <SliderControl
                        label="Número de muestras"
                        value={numSamples}
                        min={100}
                        max={2000}
                        step={100}
                        onChange={setNumSamples}
                    />
                </div>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={histogramData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="samplingGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[populationMean - 4 * theoreticalSE, populationMean + 4 * theoreticalSE]}
                                tickFormatter={(v) => v.toFixed(0)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Histogram of sample means */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#2563EB"
                                strokeWidth={2}
                                fill="url(#samplingGrad)"
                                name="Observado"
                            />

                            {/* Theoretical curve */}
                            <Area
                                type="monotone"
                                dataKey="theoretical"
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="none"
                                name="Teórico"
                            />

                            <ReferenceLine
                                x={populationMean}
                                stroke="#ef4444"
                                strokeWidth={2}
                                label={{ value: `μ = ${populationMean}`, fill: "#ef4444", fontSize: 11 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats comparison */}
                <motion.div
                    key={`${n}-${numSamples}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                >
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                        <div className="text-xs text-amber-600 uppercase tracking-wider">σ Población</div>
                        <div className="text-xl font-mono text-amber-700">{populationStd}</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <div className="text-xs text-blue-600 uppercase tracking-wider">SE Teórico (σ/√n)</div>
                        <div className="text-xl font-mono text-blue-700">{theoreticalSE.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                        <div className="text-xs text-emerald-600 uppercase tracking-wider">SE Observado</div>
                        <div className="text-xl font-mono text-emerald-700">{actualStats.std.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Reducción</div>
                        <div className="text-xl font-mono">{(populationStd / theoreticalSE).toFixed(1)}x</div>
                        <div className="text-xs text-slate-400">= √{n}</div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Clave:</strong> La distribución muestral es ~{(populationStd / theoreticalSE).toFixed(1)}x más concentrada
                    que la población original. Esto permite hacer inferencias precisas aunque la población sea muy variable.
                </div>
            </div>
        </ChartContainer>
    )
}
