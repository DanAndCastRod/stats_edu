"use client"

import React, { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts"

type SourceDistribution = "uniform" | "exponential" | "bimodal" | "bernoulli"

interface CLTSimulationProps {
    initialN?: number
    maxN?: number
    numSamples?: number
}

interface DistInfo {
    name: string
    description: string
    theoreticalMean: number
    theoreticalVariance: number
    sample: () => number
    domain: [number, number]
}

const DISTRIBUTIONS: Record<SourceDistribution, DistInfo> = {
    uniform: {
        name: "Uniforme (0, 1)",
        description: "Plana y simétrica, sin tendencia central previa.",
        theoreticalMean: 0.5,
        theoreticalVariance: 1 / 12, // ~0.0833
        sample: () => Math.random(),
        domain: [0, 1]
    },
    exponential: {
        name: "Exponencial (λ=1)",
        description: "Fuertemente asimétrica y sesgada a la derecha.",
        theoreticalMean: 1.0,
        theoreticalVariance: 1.0,
        // Inverse transform sampling for Exp(1): -ln(1 - U)
        sample: () => -Math.log(1 - Math.min(Math.random(), 0.9999)),
        domain: [0, 2.5]
    },
    bimodal: {
        name: "Bimodal (Dos Picos)",
        description: "Mezcla de dos poblaciones diferenciadas (picos en 0.2 y 0.8).",
        theoreticalMean: 0.5,
        theoreticalVariance: 0.0925, // 0.5*(0.05^2 + (0.2-0.5)^2) + 0.5*(0.05^2 + (0.8-0.5)^2) = 0.0025 + 0.09 = 0.0925
        sample: () => {
            const peak = Math.random() < 0.5 ? 0.2 : 0.8
            // Box-Muller normal approximation for the peak
            const u1 = Math.max(Math.random(), 0.0001)
            const u2 = Math.random()
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
            return Math.max(0, Math.min(1, peak + z * 0.06))
        },
        domain: [0, 1]
    },
    bernoulli: {
        name: "Bernoulli (p=0.3)",
        description: "Discreta y binaria: solo toma valores 0 o 1.",
        theoreticalMean: 0.3,
        theoreticalVariance: 0.3 * 0.7, // 0.21
        sample: () => (Math.random() < 0.3 ? 1 : 0),
        domain: [0, 1]
    }
}

// Generate sample means
function generateSampleMeans(n: number, numSamples: number, sampler: () => number): number[] {
    const means: number[] = new Array(numSamples)
    for (let i = 0; i < numSamples; i++) {
        let sum = 0
        for (let j = 0; j < n; j++) {
            sum += sampler()
        }
        means[i] = sum / n
    }
    return means
}

// Create histogram data
function createHistogram(data: number[], bins: number = 35): { x: number; y: number }[] {
    const min = Math.min(...data)
    const max = Math.max(...data)
    const span = max - min
    const binWidth = span > 0 ? span / bins : 0.05

    const histogram: number[] = new Array(bins).fill(0)

    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
        if (binIndex >= 0) histogram[binIndex]++
    })

    // Normalize to density
    const total = data.length * binWidth || 1

    return histogram.map((count, i) => ({
        x: Number((min + (i + 0.5) * binWidth).toFixed(3)),
        y: Number((count / total).toFixed(4))
    }))
}

export function CLTSimulation({
    initialN = 1,
    maxN = 60,
    numSamples = 1200
}: CLTSimulationProps) {
    const [distribution, setDistribution] = useState<SourceDistribution>("uniform")
    const [n, setN] = useState(initialN)
    const [isAnimating, setIsAnimating] = useState(false)

    const distInfo = DISTRIBUTIONS[distribution]

    // Generate sample means based on current n and distribution
    const { histogramData, stats } = useMemo(() => {
        const means = generateSampleMeans(n, numSamples, distInfo.sample)
        const hist = createHistogram(means, 35)

        const theoreticalMean = distInfo.theoreticalMean
        const theoreticalSD = Math.sqrt(distInfo.theoreticalVariance / n)

        const actualMean = means.reduce((a, b) => a + b, 0) / means.length
        const actualSD = Math.sqrt(
            means.reduce((sum, x) => sum + Math.pow(x - actualMean, 2), 0) / (means.length - 1)
        )

        return {
            histogramData: hist,
            stats: { actualMean, actualSD, theoreticalMean, theoreticalSD }
        }
    }, [n, numSamples, distInfo])

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
        }, 45)
    }, [maxN])

    return (
        <ChartContainer
            title="Teorema del Límite Central (TLC) Multidistribución"
            description={`Simulación de ${numSamples.toLocaleString()} medias muestrales con diferentes poblaciones de origen`}
        >
            <div className="space-y-6">
                {/* Distribution Selector */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                        Distribución de Origen (Población Base)
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(Object.keys(DISTRIBUTIONS) as SourceDistribution[]).map((distKey) => {
                            const item = DISTRIBUTIONS[distKey]
                            const isSelected = distribution === distKey
                            return (
                                <button
                                    key={distKey}
                                    onClick={() => setDistribution(distKey)}
                                    className={`px-3 py-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                                        isSelected
                                            ? "bg-brand-blue text-white border-brand-blue shadow-md shadow-blue-500/20"
                                            : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                                    }`}
                                >
                                    <div className="font-bold">{item.name}</div>
                                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                                        {item.description}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <SliderControl
                            label={`Tamaño de Muestra (n = ${n})`}
                            value={n}
                            min={1}
                            max={maxN}
                            onChange={setN}
                        />
                    </div>
                    <motion.button
                        onClick={handleAnimate}
                        disabled={isAnimating}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full md:w-auto px-6 py-2.5 bg-brand-blue text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                    >
                        {isAnimating ? "Animando n..." : "▶ Animar Convergencia"}
                    </motion.button>
                </div>

                {/* Chart */}
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={histogramData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="cltGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.85} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.08} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={['auto', 'auto']}
                                tickFormatter={(v) => Number(v).toFixed(2)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                formatter={(value) => [Number(value).toFixed(4), "Densidad de Promedios"]}
                                labelFormatter={(label) => `x̄ = ${Number(label).toFixed(3)}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#2563EB"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#cltGradient)"
                            />
                            <ReferenceLine
                                x={distInfo.theoreticalMean}
                                stroke="#10b981"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                                label={{
                                    value: `μ = ${distInfo.theoreticalMean.toFixed(2)}`,
                                    fill: "#10b981",
                                    fontSize: 12,
                                    position: "top"
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${distribution}-${n}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center"
                    >
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Muestra n</div>
                            <div className="text-xl font-black text-brand-blue">{n}</div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Media Muestral (x̄)</div>
                            <div className="text-base font-mono font-bold text-slate-800 dark:text-slate-100">{stats.actualMean.toFixed(4)}</div>
                            <div className="text-[10px] text-slate-400">Teórica: {stats.theoreticalMean.toFixed(2)}</div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Desv. Estándar Obs.</div>
                            <div className="text-base font-mono font-bold text-slate-800 dark:text-slate-100">{stats.actualSD.toFixed(4)}</div>
                            <div className="text-[10px] text-slate-400">s(x̄) empírico</div>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/40 rounded-xl">
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Error Estándar σ/√n</div>
                            <div className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">{stats.theoreticalSD.toFixed(4)}</div>
                            <div className="text-[10px] text-emerald-500/80">Teórico TLC</div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Insight */}
                <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl text-sm text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-brand-blue mb-1">
                        💡 Principio de Universalidad del TLC:
                    </p>
                    <p>
                        Incluso con una población altamente asimétrica ({distInfo.name}), a medida que <strong>n ≥ 30</strong>, la distribución de los promedios muestrales $\bar&#123;X&#125;$ adopta una forma acampanada simétrica ($N(\mu, \sigma/\sqrt&#123;n&#125;)$). Nota cómo la dispersión se contrae proporcionalmente a $1/\sqrt&#123;n&#125;$.
                    </p>
                </div>
            </div>
        </ChartContainer>
    )
}
