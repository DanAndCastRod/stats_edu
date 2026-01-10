"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine
} from "recharts"

interface OutlierDetectorProps {
    initialN?: number
}

// Generate data with potential outliers
function generateData(n: number, numOutliers: number): { id: number; value: number; isOutlier: boolean }[] {
    const data: { id: number; value: number; isOutlier: boolean }[] = []

    // Generate normal data
    for (let i = 0; i < n - numOutliers; i++) {
        const u1 = Math.random()
        const u2 = Math.random()
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        data.push({ id: i, value: 50 + 10 * z, isOutlier: false })
    }

    // Add outliers
    for (let i = 0; i < numOutliers; i++) {
        const outlierValue = Math.random() > 0.5 ? 90 + Math.random() * 20 : 10 - Math.random() * 20
        data.push({ id: n - numOutliers + i, value: outlierValue, isOutlier: true })
    }

    return data.sort((a, b) => a.value - b.value)
}

// IQR method for outlier detection
function detectOutliersIQR(values: number[]): { q1: number; q3: number; iqr: number; lowerBound: number; upperBound: number; outliers: number[] } {
    const sorted = [...values].sort((a, b) => a - b)
    const n = sorted.length

    const q1 = sorted[Math.floor(n * 0.25)]
    const q3 = sorted[Math.floor(n * 0.75)]
    const iqr = q3 - q1

    const lowerBound = q1 - 1.5 * iqr
    const upperBound = q3 + 1.5 * iqr

    const outliers = sorted.filter(v => v < lowerBound || v > upperBound)

    return { q1, q3, iqr, lowerBound, upperBound, outliers }
}

// Z-score method
function detectOutliersZScore(values: number[], threshold: number): { mean: number; std: number; outliers: number[] } {
    const n = values.length
    const mean = values.reduce((a, b) => a + b, 0) / n
    const std = Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1))

    const outliers = values.filter(v => Math.abs((v - mean) / std) > threshold)

    return { mean, std, outliers }
}

export function OutlierDetector({ initialN = 30 }: OutlierDetectorProps) {
    const [n, setN] = useState(initialN)
    const [numOutliers, setNumOutliers] = useState(3)
    const [method, setMethod] = useState<"iqr" | "zscore">("iqr")
    const [zThreshold, setZThreshold] = useState(2.5)
    const [data, setData] = useState<{ id: number; value: number; isOutlier: boolean }[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(generateData(n, numOutliers))
    }, [])

    const regenerate = () => {
        setData(generateData(n, numOutliers))
    }

    const { detection, chartData, iqrResult, zscoreResult } = useMemo(() => {
        if (data.length === 0) return { detection: null, chartData: [], iqrResult: null, zscoreResult: null }

        const values = data.map(d => d.value)

        const iqrResult = detectOutliersIQR(values)
        const zscoreResult = detectOutliersZScore(values, zThreshold)

        // Prepare chart data
        const chart = data.map((d, i) => ({
            x: i,
            y: d.value,
            detected: method === "iqr"
                ? (d.value < iqrResult.lowerBound || d.value > iqrResult.upperBound)
                : Math.abs((d.value - zscoreResult.mean) / zscoreResult.std) > zThreshold,
            actual: d.isOutlier
        }))

        const det = method === "iqr"
            ? { type: "iqr" as const, ...iqrResult }
            : { type: "zscore" as const, ...zscoreResult }

        return { detection: det, chartData: chart, iqrResult, zscoreResult }
    }, [data, method, zThreshold])

    if (!isClient) {
        return (
            <ChartContainer title="Detector de Outliers" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    const detectedCount = chartData.filter(d => d.detected).length
    const actualCount = chartData.filter(d => d.actual).length
    const correctlyDetected = chartData.filter(d => d.detected && d.actual).length

    return (
        <ChartContainer
            title="Detector de Outliers"
            description="Compara métodos IQR y Z-score para identificar valores atípicos"
        >
            <div className="space-y-6">
                {/* Method selector */}
                <div className="flex gap-2 justify-center">
                    <motion.button
                        onClick={() => setMethod("iqr")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${method === "iqr"
                            ? "bg-brand-blue text-white"
                            : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        Método IQR
                    </motion.button>
                    <motion.button
                        onClick={() => setMethod("zscore")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${method === "zscore"
                            ? "bg-brand-blue text-white"
                            : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        Método Z-Score
                    </motion.button>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="Tamaño muestra (n)"
                        value={n}
                        min={20}
                        max={100}
                        onChange={(v) => { setN(v); regenerate(); }}
                    />
                    <SliderControl
                        label="Outliers reales"
                        value={numOutliers}
                        min={0}
                        max={10}
                        onChange={(v) => { setNumOutliers(v); regenerate(); }}
                    />
                    {method === "zscore" && (
                        <SliderControl
                            label="Umbral Z"
                            value={zThreshold}
                            min={1.5}
                            max={4}
                            step={0.1}
                            onChange={setZThreshold}
                        />
                    )}
                    <motion.button
                        onClick={regenerate}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium self-end"
                    >
                        🔄 Regenerar
                    </motion.button>
                </div>

                {/* Chart */}
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis type="number" dataKey="x" name="Índice" stroke="#94a3b8" />
                            <YAxis type="number" dataKey="y" name="Valor" stroke="#94a3b8" />

                            {/* Bounds */}
                            {iqrResult && method === "iqr" && (
                                <>
                                    <ReferenceLine y={iqrResult.lowerBound} stroke="#ef4444" strokeDasharray="5 5" label={{ value: "Límite inferior", fill: "#ef4444", fontSize: 10 }} />
                                    <ReferenceLine y={iqrResult.upperBound} stroke="#ef4444" strokeDasharray="5 5" label={{ value: "Límite superior", fill: "#ef4444", fontSize: 10 }} />
                                </>
                            )}

                            {/* Normal points */}
                            <Scatter
                                data={chartData.filter(d => !d.detected)}
                                fill="#3b82f6"
                                shape="circle"
                            />

                            {/* Detected outliers */}
                            <Scatter
                                data={chartData.filter(d => d.detected)}
                                fill="#ef4444"
                                shape="diamond"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <div className="text-xs text-blue-500 uppercase tracking-wider">Detectados</div>
                        <div className="text-2xl font-bold text-blue-600">{detectedCount}</div>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                        <div className="text-xs text-amber-500 uppercase tracking-wider">Reales</div>
                        <div className="text-2xl font-bold text-amber-600">{actualCount}</div>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                        <div className="text-xs text-emerald-500 uppercase tracking-wider">Correctos</div>
                        <div className="text-2xl font-bold text-emerald-600">{correctlyDetected}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${correctlyDetected === actualCount && detectedCount === actualCount
                        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                        }`}>
                        <div className="text-xs uppercase tracking-wider">Precisión</div>
                        <div className="text-2xl font-bold">
                            {detectedCount > 0 ? ((correctlyDetected / detectedCount) * 100).toFixed(0) : 0}%
                        </div>
                    </div>
                </div>

                {/* Method info */}
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm">
                    {method === "iqr" && iqrResult ? (
                        <div>
                            Q1 = {iqrResult.q1.toFixed(1)} | Q3 = {iqrResult.q3.toFixed(1)} | IQR = {iqrResult.iqr.toFixed(1)}<br />
                            Límites: [{iqrResult.lowerBound.toFixed(1)}, {iqrResult.upperBound.toFixed(1)}]
                        </div>
                    ) : zscoreResult ? (
                        <div>
                            μ = {zscoreResult.mean.toFixed(1)} | σ = {zscoreResult.std.toFixed(1)}<br />
                            Outlier si |z| {">"} {zThreshold}
                        </div>
                    ) : null}
                </div>
            </div>
        </ChartContainer>
    )
}
