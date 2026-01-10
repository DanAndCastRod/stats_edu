"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from "recharts"

interface DistributionSlidersProps {
    type?: "binomial" | "poisson"
}

// Factorial with memoization for binomial coefficient
function factorial(n: number): number {
    if (n <= 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) result *= i
    return result
}

// Binomial coefficient C(n, k)
function binomialCoeff(n: number, k: number): number {
    if (k > n) return 0
    if (k === 0 || k === n) return 1
    return factorial(n) / (factorial(k) * factorial(n - k))
}

// Binomial PMF: P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
function binomialPMF(k: number, n: number, p: number): number {
    return binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

// Poisson PMF: P(X = k) = (λ^k * e^(-λ)) / k!
function poissonPMF(k: number, lambda: number): number {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k)
}

export function DistributionSliders({ type = "binomial" }: DistributionSlidersProps) {
    const [n, setN] = useState(10)
    const [p, setP] = useState(0.5)
    const [lambda, setLambda] = useState(5)

    const { data, stats, maxK } = useMemo(() => {
        if (type === "binomial") {
            const maxK = n
            const data = []
            for (let k = 0; k <= maxK; k++) {
                data.push({ k, probability: binomialPMF(k, n, p) })
            }
            const mean = n * p
            const variance = n * p * (1 - p)
            const std = Math.sqrt(variance)
            return { data, stats: { mean, variance, std }, maxK }
        } else {
            // Poisson
            const maxK = Math.max(20, Math.ceil(lambda + 4 * Math.sqrt(lambda)))
            const data = []
            for (let k = 0; k <= maxK; k++) {
                const prob = poissonPMF(k, lambda)
                if (prob > 0.0001 || k <= lambda) {
                    data.push({ k, probability: prob })
                }
            }
            const mean = lambda
            const variance = lambda
            const std = Math.sqrt(lambda)
            return { data, stats: { mean, variance, std }, maxK }
        }
    }, [type, n, p, lambda])

    const title = type === "binomial"
        ? "Distribución Binomial Interactiva"
        : "Distribución Poisson Interactiva"

    const description = type === "binomial"
        ? `X ~ Binomial(n=${n}, p=${p.toFixed(2)})`
        : `X ~ Poisson(λ=${lambda})`

    return (
        <ChartContainer title={title} description={description}>
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {type === "binomial" ? (
                        <>
                            <SliderControl
                                label="Número de ensayos (n)"
                                value={n}
                                min={1}
                                max={30}
                                onChange={setN}
                            />
                            <SliderControl
                                label="Probabilidad de éxito (p)"
                                value={p}
                                min={0.01}
                                max={0.99}
                                step={0.01}
                                onChange={setP}
                            />
                        </>
                    ) : (
                        <SliderControl
                            label="Tasa promedio (λ)"
                            value={lambda}
                            min={0.5}
                            max={20}
                            step={0.5}
                            onChange={setLambda}
                        />
                    )}
                </div>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="k"
                                stroke="#94a3b8"
                                label={{ value: 'k', position: 'insideBottomRight', offset: -5 }}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                tickFormatter={(v) => v.toFixed(2)}
                            />
                            <Tooltip
                                formatter={(value) => [(value as number).toFixed(4), "P(X = k)"]}
                                labelFormatter={(label) => `k = ${label}`}
                            />
                            <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => {
                                    const isNearMean = Math.abs(entry.k - stats.mean) <= stats.std
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={isNearMean ? "#2563EB" : "#93c5fd"}
                                        />
                                    )
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <motion.div
                    key={`${n}-${p}-${lambda}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-4 text-center"
                >
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Media (μ)</div>
                        <div className="text-xl font-bold text-brand-blue">{stats.mean.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Varianza (σ²)</div>
                        <div className="text-xl font-mono">{stats.variance.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Desv. Est. (σ)</div>
                        <div className="text-xl font-mono">{stats.std.toFixed(2)}</div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    {type === "binomial" ? (
                        <>
                            <strong>💡 Observa:</strong> Las barras azul oscuro están dentro de ±1σ de la media.
                            Cuando p=0.5, la distribución es simétrica. Cuando p≠0.5, es asimétrica.
                        </>
                    ) : (
                        <>
                            <strong>💡 Observa:</strong> En Poisson, μ = σ² = λ. A mayor λ, la distribución
                            se parece más a una Normal (TLC en acción).
                        </>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
