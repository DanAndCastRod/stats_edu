"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine
} from "recharts"

interface NormalQQProps {
    initialN?: number
}

// Generate data from different distributions
function generateNormal(n: number): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        const u1 = Math.random()
        const u2 = Math.random()
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        data.push(z)
    }
    return data.sort((a, b) => a - b)
}

function generateSkewed(n: number, direction: "right" | "left"): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        // Exponential for right skew, negative for left
        const exp = -Math.log(Math.random())
        data.push(direction === "right" ? exp : -exp)
    }
    return data.sort((a, b) => a - b)
}

function generateUniform(n: number): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        data.push((Math.random() - 0.5) * 6)
    }
    return data.sort((a, b) => a - b)
}

function generateBimodal(n: number): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        const u1 = Math.random()
        const u2 = Math.random()
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        // Mix of two normals
        data.push(Math.random() > 0.5 ? z - 2 : z + 2)
    }
    return data.sort((a, b) => a - b)
}

// Calculate theoretical quantiles
function theoreticalQuantiles(n: number): number[] {
    const quantiles: number[] = []
    for (let i = 1; i <= n; i++) {
        const p = (i - 0.5) / n
        // Inverse normal approximation
        const a = [
            -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
            1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00
        ]
        const b = [
            -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
            6.680131188771972e+01, -1.328068155288572e+01
        ]

        let q, r
        if (p < 0.5) {
            q = Math.sqrt(-2 * Math.log(p))
            r = q
        } else {
            q = Math.sqrt(-2 * Math.log(1 - p))
            r = -q
        }

        const t = p < 0.5 ? p : 1 - p
        const sign = p < 0.5 ? -1 : 1

        // Simple approximation
        const z = sign * (2.515517 + 0.802853 * q + 0.010328 * q * q) /
            (1 + 1.432788 * q + 0.189269 * q * q + 0.001308 * q * q * q)

        quantiles.push(z || 0)
    }
    return quantiles
}

// Shapiro-Wilk approximation (simplified)
function shapiroWilkApprox(data: number[]): { w: number; pValue: number; isNormal: boolean } {
    const n = data.length
    const sorted = [...data].sort((a, b) => a - b)
    const mean = sorted.reduce((a, b) => a + b, 0) / n

    // Simplified W statistic
    let numerator = 0
    for (let i = 0; i < Math.floor(n / 2); i++) {
        const ai = (0.6745 + 0.0308 * (i + 1)) // Simplified coefficients
        numerator += ai * (sorted[n - 1 - i] - sorted[i])
    }
    numerator = numerator * numerator

    const denominator = sorted.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0)

    const w = Math.min(1, numerator / denominator / n)

    // Very rough p-value approximation
    const z = Math.abs(w - 0.95) * 10
    const pValue = Math.max(0.001, Math.min(1, Math.exp(-z)))

    return { w, pValue, isNormal: w > 0.9 }
}

export function NormalQQ({ initialN = 50 }: NormalQQProps) {
    const [n, setN] = useState(initialN)
    const [distribution, setDistribution] = useState<"normal" | "skewed-right" | "skewed-left" | "uniform" | "bimodal">("normal")
    const [data, setData] = useState<number[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(generateNormal(n))
    }, [])

    const regenerate = () => {
        switch (distribution) {
            case "normal": setData(generateNormal(n)); break
            case "skewed-right": setData(generateSkewed(n, "right")); break
            case "skewed-left": setData(generateSkewed(n, "left")); break
            case "uniform": setData(generateUniform(n)); break
            case "bimodal": setData(generateBimodal(n)); break
        }
    }

    useEffect(() => {
        if (isClient) regenerate()
    }, [distribution, n, isClient])

    const { qqData, stats, histData } = useMemo(() => {
        if (data.length === 0) return { qqData: [], stats: null, histData: [] }

        const theoretical = theoreticalQuantiles(data.length)
        const sorted = [...data].sort((a, b) => a - b)

        const qq = theoretical.map((t, i) => ({
            theoretical: t,
            sample: sorted[i]
        }))

        const sw = shapiroWilkApprox(sorted)

        // Histogram
        const min = Math.min(...sorted)
        const max = Math.max(...sorted)
        const binWidth = (max - min) / 15
        const bins: { range: string; count: number }[] = []

        for (let i = 0; i < 15; i++) {
            const lo = min + i * binWidth
            const hi = lo + binWidth
            const count = sorted.filter(x => x >= lo && x < hi).length
            bins.push({ range: lo.toFixed(1), count })
        }

        return { qqData: qq, stats: sw, histData: bins }
    }, [data])

    if (!isClient) {
        return (
            <ChartContainer title="Test de Normalidad" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Test de Normalidad Q-Q"
            description="Visualiza si tus datos siguen una distribución normal"
        >
            <div className="space-y-6">
                {/* Distribution selector */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {[
                        { key: "normal", label: "Normal ✓" },
                        { key: "skewed-right", label: "Sesgo +" },
                        { key: "skewed-left", label: "Sesgo -" },
                        { key: "uniform", label: "Uniforme" },
                        { key: "bimodal", label: "Bimodal" }
                    ].map(({ key, label }) => (
                        <motion.button
                            key={key}
                            onClick={() => setDistribution(key as any)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${distribution === key
                                    ? "bg-brand-blue text-white"
                                    : "bg-slate-200 dark:bg-slate-700"
                                }`}
                        >
                            {label}
                        </motion.button>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center items-end">
                    <div className="w-48">
                        <SliderControl
                            label="Tamaño muestra (n)"
                            value={n}
                            min={20}
                            max={200}
                            onChange={setN}
                        />
                    </div>
                    <motion.button
                        onClick={regenerate}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium"
                    >
                        🔄 Regenerar
                    </motion.button>
                </div>

                {/* Histogram */}
                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={histData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#94a3b8" />
                            <Bar
                                dataKey="count"
                                fill={stats?.isNormal ? "#10b981" : "#ef4444"}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Result */}
                {stats && (
                    <motion.div
                        key={`${stats.w.toFixed(3)}`}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`p-4 rounded-xl text-center ${stats.isNormal
                                ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                            }`}
                    >
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className={`text-xs uppercase tracking-wider ${stats.isNormal ? "text-emerald-500" : "text-red-500"}`}>
                                    Estadístico W
                                </div>
                                <div className={`text-2xl font-bold ${stats.isNormal ? "text-emerald-600" : "text-red-600"}`}>
                                    {stats.w.toFixed(4)}
                                </div>
                            </div>
                            <div>
                                <div className={`text-xs uppercase tracking-wider ${stats.isNormal ? "text-emerald-500" : "text-red-500"}`}>
                                    Veredicto
                                </div>
                                <div className={`text-lg font-bold ${stats.isNormal ? "text-emerald-600" : "text-red-600"}`}>
                                    {stats.isNormal ? "✓ Normal" : "✗ No Normal"}
                                </div>
                            </div>
                            <div>
                                <div className={`text-xs uppercase tracking-wider ${stats.isNormal ? "text-emerald-500" : "text-red-500"}`}>
                                    Criterio
                                </div>
                                <div className="text-sm">
                                    W {">"} 0.9 → Normal
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Insight */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Selecciona diferentes distribuciones</strong> para ver cómo afectan el histograma y el estadístico W de Shapiro-Wilk.
                    Una distribución normal tendrá W cercano a 1.
                </div>
            </div>
        </ChartContainer>
    )
}
