"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Tooltip
} from "recharts"

interface DiscreteDistributionsProps {
    initialType?: "binomial" | "poisson"
}

// Factorial helper
function factorial(n: number): number {
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) result *= i
    return result
}

// Combinations helper
function combinations(n: number, k: number): number {
    return factorial(n) / (factorial(k) * factorial(n - k))
}

// Generate Binomial Data
function generateBinomial(n: number, p: number) {
    const data = []
    for (let k = 0; k <= n; k++) {
        const prob = combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
        data.push({ k, prob })
    }
    return { data, mean: n * p, variance: n * p * (1 - p) }
}

// Generate Poisson Data
function generatePoisson(lambda: number) {
    const data = []
    const limit = Math.max(20, Math.ceil(lambda * 2)) // Cutoff for visualization

    for (let k = 0; k <= limit; k++) {
        const prob = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k)
        data.push({ k, prob })
    }
    return { data, mean: lambda, variance: lambda }
}

export function DiscreteDistributions({ initialType = "binomial" }: DiscreteDistributionsProps) {
    const [type, setType] = useState<"binomial" | "poisson">(initialType)

    // Binomial State
    const [n, setN] = useState(10)
    const [p, setP] = useState(0.5)

    // Poisson State
    const [lambda, setLambda] = useState(5)

    const result = useMemo(() => {
        if (type === "binomial") {
            return generateBinomial(n, p)
        } else {
            return generatePoisson(lambda)
        }
    }, [type, n, p, lambda])

    return (
        <ChartContainer
            title="Distribuciones Discretas"
            description="Explora la distribución Binomial y Poisson"
        >
            <div className="space-y-6">
                {/* Type Selector */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setType("binomial")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === "binomial"
                            ? "bg-white dark:bg-slate-700 shadow text-brand-blue"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Binomial (n, p)
                    </button>
                    <button
                        onClick={() => setType("poisson")}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === "poisson"
                            ? "bg-white dark:bg-slate-700 shadow text-brand-blue"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Poisson (λ)
                    </button>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {type === "binomial" ? (
                        <>
                            <SliderControl
                                label="Ensayos (n)"
                                value={n}
                                min={1}
                                max={20}
                                step={1}
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
                            max={15}
                            step={0.5}
                            onChange={setLambda}
                        />
                    )}
                </div>

                {/* Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="k"
                                stroke="#94a3b8"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px" }}
                                formatter={(value: any) => [Number(value).toFixed(4), "Probabilidad"]}
                            />
                            <Bar
                                dataKey="prob"
                                fill={type === "binomial" ? "#3b82f6" : "#8b5cf6"}
                                radius={[4, 4, 0, 0]}
                                animationDuration={500}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Media (Esperanza)</div>
                        <div className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-200">
                            μ = {result.mean.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            {type === "binomial" ? "n × p" : "λ"}
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Varianza</div>
                        <div className="text-2xl font-bold font-mono text-slate-700 dark:text-slate-200">
                            σ² = {result.variance.toFixed(2)}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            {type === "binomial" ? "n × p × (1-p)" : "λ"}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Aplicación:</strong>
                    {type === "binomial" ? (
                        <p className="mt-1">
                            La <strong>Binomial</strong> modela el número de éxitos en <em>n</em> intentos independientes (e.g., número de caras en 10 lanzamientos, piezas defectuosas en un lote).
                        </p>
                    ) : (
                        <p className="mt-1">
                            La <strong>Poisson</strong> modela el número de eventos en un intervalo de tiempo o espacio fijo (e.g., llamadas a un call center por hora, baches por kilómetro).
                        </p>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
