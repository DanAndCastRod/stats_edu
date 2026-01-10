"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Legend
} from "recharts"

interface DataTransformerProps {
    initialSkew?: number
}

// Generate skewed data
function generateSkewedData(n: number, skew: number): number[] {
    const data: number[] = []
    for (let i = 0; i < n; i++) {
        // Exponential-based skew
        if (skew > 0) {
            const u = Math.random()
            data.push(Math.pow(-Math.log(u), 1 / (1 + skew * 2)) * 10 + 1)
        } else if (skew < 0) {
            const u = Math.random()
            const val = Math.pow(-Math.log(u), 1 / (1 + Math.abs(skew) * 2)) * 10 + 1
            data.push(20 - val) // Flip for left skew
        } else {
            // Normal
            const u1 = Math.random()
            const u2 = Math.random()
            const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
            data.push(10 + z * 2)
        }
    }
    return data.filter(x => x > 0) // Ensure positive for log
}

// Apply transformation
function transform(data: number[], type: "none" | "log" | "sqrt" | "inverse"): number[] {
    switch (type) {
        case "log":
            return data.map(x => Math.log(x))
        case "sqrt":
            return data.map(x => Math.sqrt(x))
        case "inverse":
            return data.map(x => 1 / x)
        default:
            return data
    }
}

// Create histogram bins
function createHistogram(data: number[], numBins: number = 15): { range: string; count: number; midpoint: number }[] {
    if (data.length === 0) return []

    const min = Math.min(...data)
    const max = Math.max(...data)
    const binWidth = (max - min) / numBins

    const bins: { range: string; count: number; midpoint: number }[] = []
    for (let i = 0; i < numBins; i++) {
        const lo = min + i * binWidth
        const hi = lo + binWidth
        const count = data.filter(x => x >= lo && x < hi).length
        bins.push({
            range: lo.toFixed(1),
            count,
            midpoint: (lo + hi) / 2
        })
    }

    return bins
}

// Calculate skewness
function calculateSkewness(data: number[]): number {
    const n = data.length
    if (n < 3) return 0

    const mean = data.reduce((a, b) => a + b, 0) / n
    const m2 = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n
    const m3 = data.reduce((sum, x) => sum + Math.pow(x - mean, 3), 0) / n
    const std = Math.sqrt(m2)

    if (std === 0) return 0
    return m3 / Math.pow(std, 3)
}

export function DataTransformer({ initialSkew = 1.5 }: DataTransformerProps) {
    const [skew, setSkew] = useState(initialSkew)
    const [transformation, setTransformation] = useState<"none" | "log" | "sqrt" | "inverse">("none")
    const [rawData, setRawData] = useState<number[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setRawData(generateSkewedData(200, skew))
    }, [])

    const regenerate = () => {
        setRawData(generateSkewedData(200, skew))
    }

    useEffect(() => {
        if (isClient) regenerate()
    }, [skew, isClient])

    const { originalHist, transformedHist, originalSkew, transformedSkew, transformedData } = useMemo(() => {
        if (rawData.length === 0) {
            return {
                originalHist: [],
                transformedHist: [],
                originalSkew: 0,
                transformedSkew: 0,
                transformedData: []
            }
        }

        const transformed = transform(rawData, transformation)

        return {
            originalHist: createHistogram(rawData),
            transformedHist: createHistogram(transformed),
            originalSkew: calculateSkewness(rawData),
            transformedSkew: calculateSkewness(transformed),
            transformedData: transformed
        }
    }, [rawData, transformation])

    if (!isClient) {
        return (
            <ChartContainer title="Transformador de Datos" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    const transformations = [
        { key: "none", label: "Sin transformar", formula: "Y = X" },
        { key: "log", label: "Logarítmica", formula: "Y = ln(X)" },
        { key: "sqrt", label: "Raíz cuadrada", formula: "Y = √X" },
        { key: "inverse", label: "Inversa", formula: "Y = 1/X" }
    ]

    return (
        <ChartContainer
            title="Transformador de Datos"
            description="Corrige la asimetría para normalizar distribuciones"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Sesgo de datos originales"
                        value={skew}
                        min={-2}
                        max={2}
                        step={0.1}
                        onChange={setSkew}
                    />
                    <motion.button
                        onClick={regenerate}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-brand-blue text-white rounded-lg font-medium self-end"
                    >
                        🔄 Regenerar
                    </motion.button>
                </div>

                {/* Transformation selector */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {transformations.map(t => (
                        <motion.button
                            key={t.key}
                            onClick={() => setTransformation(t.key as any)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${transformation === t.key
                                    ? "bg-brand-blue text-white"
                                    : "bg-slate-200 dark:bg-slate-700"
                                }`}
                        >
                            <div className="font-medium">{t.label}</div>
                            <div className="text-xs opacity-70 font-mono">{t.formula}</div>
                        </motion.button>
                    ))}
                </div>

                {/* Histograms - Side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-center font-medium mb-2">Datos Originales</h4>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={originalHist} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="range" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Bar dataKey="count" fill="#ef4444" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-center text-sm mt-2">
                            Sesgo: <span className={`font-bold ${Math.abs(originalSkew) > 0.5 ? "text-red-500" : "text-emerald-500"}`}>
                                {originalSkew.toFixed(3)}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-center font-medium mb-2">Datos Transformados</h4>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={transformedHist} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="range" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Bar dataKey="count" fill="#10b981" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-center text-sm mt-2">
                            Sesgo: <span className={`font-bold ${Math.abs(transformedSkew) > 0.5 ? "text-red-500" : "text-emerald-500"}`}>
                                {transformedSkew.toFixed(3)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Improvement indicator */}
                <motion.div
                    key={transformation}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-xl text-center ${Math.abs(transformedSkew) < Math.abs(originalSkew)
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200"
                            : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200"
                        }`}
                >
                    <div className="text-lg font-bold">
                        {Math.abs(transformedSkew) < Math.abs(originalSkew) ? "✓ Mejora" : "⚠️ No mejora"}
                    </div>
                    <div className="text-sm">
                        Reducción del sesgo: {((1 - Math.abs(transformedSkew) / Math.abs(originalSkew)) * 100).toFixed(1)}%
                    </div>
                </motion.div>

                {/* Guide */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Guía de Transformaciones:</strong>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div>• <strong>log(X)</strong>: Sesgo derecho fuerte</div>
                        <div>• <strong>√X</strong>: Sesgo derecho moderado</div>
                        <div>• <strong>1/X</strong>: Sesgo derecho muy fuerte</div>
                        <div>• <strong>X²</strong>: Sesgo izquierdo</div>
                    </div>
                </div>
            </div>
        </ChartContainer>
    )
}
