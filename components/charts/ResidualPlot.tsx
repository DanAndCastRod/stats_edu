"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, Legend
} from "recharts"

interface ResidualPlotProps {
    initialN?: number
}

// Generate regression data with optional heteroscedasticity
function generateRegressionData(
    n: number,
    slope: number,
    intercept: number,
    noise: number,
    heteroscedastic: boolean,
    hasPattern: boolean
): { x: number; y: number; predicted: number; residual: number }[] {
    const data: { x: number; y: number; predicted: number; residual: number }[] = []

    for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * 100
        const predicted = intercept + slope * x

        // Generate error
        const u1 = Math.random()
        const u2 = Math.random()
        let error = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * noise

        // Heteroscedasticity: variance increases with X
        if (heteroscedastic) {
            error = error * (1 + x / 50)
        }

        // Non-linear pattern (quadratic)
        let patternError = 0
        if (hasPattern) {
            patternError = 0.01 * Math.pow(x - 50, 2)
        }

        const y = predicted + error + patternError

        data.push({
            x,
            y,
            predicted,
            residual: y - predicted
        })
    }

    return data
}

// Calculate residual statistics
function analyzeResiduals(data: { residual: number }[]): {
    mean: number
    std: number
    isRandomPattern: boolean
    isHomoscedastic: boolean
} {
    const residuals = data.map(d => d.residual)
    const n = residuals.length
    const mean = residuals.reduce((a, b) => a + b, 0) / n
    const std = Math.sqrt(residuals.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (n - 1))

    // Simple checks (heuristics)
    const firstHalf = residuals.slice(0, Math.floor(n / 2))
    const secondHalf = residuals.slice(Math.floor(n / 2))

    const meanFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
    const meanSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length

    const stdFirst = Math.sqrt(firstHalf.reduce((sum, r) => sum + Math.pow(r - meanFirst, 2), 0) / firstHalf.length)
    const stdSecond = Math.sqrt(secondHalf.reduce((sum, r) => sum + Math.pow(r - meanSecond, 2), 0) / secondHalf.length)

    const isRandomPattern = Math.abs(meanFirst - meanSecond) < std * 0.5
    const isHomoscedastic = Math.abs(stdFirst - stdSecond) < std * 0.5

    return { mean, std, isRandomPattern, isHomoscedastic }
}

export function ResidualPlot({ initialN = 30 }: ResidualPlotProps) {
    const [n, setN] = useState(initialN)
    const [noise, setNoise] = useState(10)
    const [heteroscedastic, setHeteroscedastic] = useState(false)
    const [hasPattern, setHasPattern] = useState(false)
    const [data, setData] = useState<{ x: number; y: number; predicted: number; residual: number }[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(generateRegressionData(n, 0.5, 20, noise, heteroscedastic, hasPattern))
    }, [])

    const regenerate = () => {
        setData(generateRegressionData(n, 0.5, 20, noise, heteroscedastic, hasPattern))
    }

    useEffect(() => {
        if (isClient) regenerate()
    }, [heteroscedastic, hasPattern, isClient])

    const analysis = useMemo(() => {
        if (data.length === 0) return null
        return analyzeResiduals(data)
    }, [data])

    // Prepare residual plot data
    const residualData = useMemo(() => {
        return data.map(d => ({ x: d.predicted, residual: d.residual }))
    }, [data])

    if (!isClient || !analysis) {
        return (
            <ChartContainer title="Análisis de Residuos" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Análisis de Residuos de Regresión"
            description="Diagnóstico visual de los supuestos del modelo"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="Tamaño muestra"
                        value={n}
                        min={20}
                        max={100}
                        onChange={setN}
                    />
                    <SliderControl
                        label="Ruido (σ)"
                        value={noise}
                        min={5}
                        max={30}
                        onChange={setNoise}
                    />
                    <motion.button
                        onClick={() => setHeteroscedastic(!heteroscedastic)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${heteroscedastic
                                ? "bg-amber-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        {heteroscedastic ? "⚠️ Heterocedasticidad" : "✓ Homocedasticidad"}
                    </motion.button>
                    <motion.button
                        onClick={() => setHasPattern(!hasPattern)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${hasPattern
                                ? "bg-red-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        {hasPattern ? "⚠️ Patrón Cuadrático" : "✓ Sin Patrón"}
                    </motion.button>
                </div>

                <motion.button
                    onClick={regenerate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-brand-blue text-white rounded-lg font-medium"
                >
                    🔄 Regenerar
                </motion.button>

                {/* Residual Plot */}
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Valor Predicho"
                                stroke="#94a3b8"
                            />
                            <YAxis
                                type="number"
                                dataKey="residual"
                                name="Residuo"
                                stroke="#94a3b8"
                            />
                            <Legend />

                            {/* Zero line */}
                            <ReferenceLine y={0} stroke="#10b981" strokeWidth={2} />

                            {/* ±2 std bands */}
                            <ReferenceLine
                                y={2 * analysis.std}
                                stroke="#ef4444"
                                strokeDasharray="5 5"
                                label={{ value: "+2σ", fill: "#ef4444", fontSize: 10 }}
                            />
                            <ReferenceLine
                                y={-2 * analysis.std}
                                stroke="#ef4444"
                                strokeDasharray="5 5"
                                label={{ value: "-2σ", fill: "#ef4444", fontSize: 10 }}
                            />

                            {/* Residuals */}
                            <Scatter
                                data={residualData}
                                fill="#3b82f6"
                                name="Residuos"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* Diagnostic checks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-3 rounded-xl text-center border ${Math.abs(analysis.mean) < 1
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200"
                        }`}>
                        <div className="text-xs uppercase tracking-wider text-slate-500">Media Residuos</div>
                        <div className="text-lg font-mono">{analysis.mean.toFixed(2)}</div>
                        <div className="text-xs">{Math.abs(analysis.mean) < 1 ? "✓ ≈ 0" : "⚠️ ≠ 0"}</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-center">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Std Residuos</div>
                        <div className="text-lg font-mono">{analysis.std.toFixed(2)}</div>
                    </div>
                    <div className={`p-3 rounded-xl text-center border ${analysis.isRandomPattern
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200"
                        }`}>
                        <div className="text-xs uppercase tracking-wider text-slate-500">Linealidad</div>
                        <div className="text-sm font-bold">{analysis.isRandomPattern ? "✓ OK" : "⚠️ Patrón"}</div>
                    </div>
                    <div className={`p-3 rounded-xl text-center border ${analysis.isHomoscedastic
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200"
                            : "bg-red-50 dark:bg-red-900/20 border-red-200"
                        }`}>
                        <div className="text-xs uppercase tracking-wider text-slate-500">Homocedasticidad</div>
                        <div className="text-sm font-bold">{analysis.isHomoscedastic ? "✓ OK" : "⚠️ Cambia"}</div>
                    </div>
                </div>

                {/* What to look for */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 ¿Qué buscar?</strong><br />
                    • **Nube aleatoria** alrededor de 0 → ✓ Modelo adecuado<br />
                    • **Forma de U o arco** → Falta término cuadrático<br />
                    • **Embudo** → Heterocedasticidad (varianza no constante)
                </div>
            </div>
        </ChartContainer>
    )
}
