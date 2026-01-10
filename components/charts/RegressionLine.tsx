"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Tooltip, ReferenceLine
} from "recharts"

interface RegressionLineProps {
    initialPoints?: number
}

interface Point {
    id: number
    x: number
    y: number
}

// Generate points with noise
function generatePoints(n: number, slope: number, intercept: number, noise: number): Point[] {
    const points: Point[] = []
    for (let i = 0; i < n; i++) {
        const x = (i / (n - 1)) * 100
        const error = (Math.random() - 0.5) * noise * 2
        const y = intercept + slope * x + error
        points.push({ id: i, x, y: Math.max(0, Math.min(100, y)) })
    }
    return points
}

// Calculate regression
function calculateRegression(points: Point[]): { slope: number; intercept: number; r2: number; predictions: { x: number; y: number }[] } {
    const n = points.length
    if (n < 2) return { slope: 0, intercept: 0, r2: 0, predictions: [] }

    const sumX = points.reduce((a, p) => a + p.x, 0)
    const sumY = points.reduce((a, p) => a + p.y, 0)
    const sumXY = points.reduce((a, p) => a + p.x * p.y, 0)
    const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0)
    const sumY2 = points.reduce((a, p) => a + p.y * p.y, 0)

    const meanX = sumX / n
    const meanY = sumY / n

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = meanY - slope * meanX

    // R-squared
    const ssTotal = sumY2 - (sumY * sumY) / n
    const ssResidual = points.reduce((a, p) => {
        const predicted = intercept + slope * p.x
        return a + Math.pow(p.y - predicted, 2)
    }, 0)
    const r2 = ssTotal > 0 ? 1 - ssResidual / ssTotal : 0

    // Prediction line points
    const predictions = [
        { x: 0, y: intercept },
        { x: 100, y: intercept + slope * 100 }
    ]

    return { slope, intercept, r2, predictions }
}

export function RegressionLine({ initialPoints = 20 }: RegressionLineProps) {
    const [trueSlope, setTrueSlope] = useState(0.5)
    const [trueIntercept, setTrueIntercept] = useState(20)
    const [noise, setNoise] = useState(15)
    const [n, setN] = useState(initialPoints)
    const [points, setPoints] = useState<Point[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setPoints(generatePoints(n, trueSlope, trueIntercept, noise))
    }, [])

    const regenerate = useCallback(() => {
        setPoints(generatePoints(n, trueSlope, trueIntercept, noise))
    }, [n, trueSlope, trueIntercept, noise])

    const { slope, intercept, r2, predictions } = useMemo(() =>
        calculateRegression(points), [points])

    if (!isClient) {
        return (
            <ChartContainer title="Regresión Lineal Interactiva" description="Cargando...">
                <div className="h-72 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Regresión Lineal Interactiva"
            description="Ajusta los parámetros y observa cómo cambia el modelo"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="Pendiente real (β₁)"
                        value={trueSlope}
                        min={-1}
                        max={1}
                        step={0.1}
                        onChange={setTrueSlope}
                    />
                    <SliderControl
                        label="Intercepto real (β₀)"
                        value={trueIntercept}
                        min={0}
                        max={50}
                        onChange={setTrueIntercept}
                    />
                    <SliderControl
                        label="Ruido (σ)"
                        value={noise}
                        min={0}
                        max={40}
                        onChange={setNoise}
                    />
                    <SliderControl
                        label="Puntos (n)"
                        value={n}
                        min={5}
                        max={50}
                        onChange={setN}
                    />
                </div>

                {/* Regenerate button */}
                <motion.button
                    onClick={regenerate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-brand-blue text-white font-medium rounded-lg text-sm"
                >
                    🔄 Regenerar Datos
                </motion.button>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                domain={[0, 100]}
                                name="X"
                                stroke="#94a3b8"
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                domain={[0, 100]}
                                name="Y"
                                stroke="#94a3b8"
                            />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={(value) => (value as number).toFixed(1)}
                            />

                            {/* Regression line */}
                            {predictions.length === 2 && (
                                <ReferenceLine
                                    segment={[
                                        { x: predictions[0].x, y: predictions[0].y },
                                        { x: predictions[1].x, y: predictions[1].y }
                                    ]}
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                />
                            )}

                            {/* True line */}
                            <ReferenceLine
                                segment={[
                                    { x: 0, y: trueIntercept },
                                    { x: 100, y: trueIntercept + trueSlope * 100 }
                                ]}
                                stroke="#10b981"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                            />

                            {/* Data points */}
                            <Scatter
                                data={points}
                                fill="#2563EB"
                                shape="circle"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-red-500"></div>
                        <span>Línea Estimada</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-0.5 bg-emerald-500" style={{ borderTop: '2px dashed' }}></div>
                        <span>Línea Real</span>
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    key={`${slope.toFixed(3)}-${intercept.toFixed(3)}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                >
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="text-xs text-red-500 uppercase tracking-wider">β̂₁ Estimado</div>
                        <div className="text-xl font-mono font-bold text-red-600">{slope.toFixed(3)}</div>
                        <div className="text-xs text-red-400">Real: {trueSlope.toFixed(1)}</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="text-xs text-red-500 uppercase tracking-wider">β̂₀ Estimado</div>
                        <div className="text-xl font-mono font-bold text-red-600">{intercept.toFixed(1)}</div>
                        <div className="text-xs text-red-400">Real: {trueIntercept.toFixed(1)}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${r2 >= 0.7
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                        }`}>
                        <div className={`text-xs uppercase tracking-wider ${r2 >= 0.7 ? "text-emerald-500" : "text-amber-500"}`}>R²</div>
                        <div className={`text-xl font-mono font-bold ${r2 >= 0.7 ? "text-emerald-600" : "text-amber-600"}`}>
                            {(r2 * 100).toFixed(1)}%
                        </div>
                        <div className={`text-xs ${r2 >= 0.7 ? "text-emerald-400" : "text-amber-400"}`}>
                            {r2 >= 0.7 ? "✓ Buen ajuste" : "⚠️ Ajuste débil"}
                        </div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Ecuación</div>
                        <div className="text-sm font-mono">
                            ŷ = {intercept.toFixed(1)} + {slope.toFixed(2)}x
                        </div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Experimenta:</strong><br />
                    • ↑ Ruido → ↓ R² (más variabilidad no explicada)<br />
                    • ↑ n → Estimadores más cercanos a los reales<br />
                    • R² indica qué % de la variación de Y es explicada por X
                </div>
            </div>
        </ChartContainer>
    )
}
