"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts"

interface Point {
    id: number
    x: number
    y: number
}

interface DraggableScatterProps {
    initialPoints?: number
    showRegression?: boolean
}

// Calculate Pearson correlation coefficient
function calculateCorrelation(points: Point[]): number {
    const n = points.length
    if (n < 2) return 0

    const sumX = points.reduce((sum, p) => sum + p.x, 0)
    const sumY = points.reduce((sum, p) => sum + p.y, 0)
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0)
    const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0)
    const sumY2 = points.reduce((sum, p) => sum + p.y * p.y, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    if (denominator === 0) return 0
    return numerator / denominator
}

// Calculate regression line
function calculateRegression(points: Point[]): { slope: number; intercept: number } {
    const n = points.length
    if (n < 2) return { slope: 0, intercept: 0 }

    const sumX = points.reduce((sum, p) => sum + p.x, 0)
    const sumY = points.reduce((sum, p) => sum + p.y, 0)
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0)
    const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0)

    const meanX = sumX / n
    const meanY = sumY / n

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = meanY - slope * meanX

    return { slope: isNaN(slope) ? 0 : slope, intercept: isNaN(intercept) ? 0 : intercept }
}

// Generate initial random points with some correlation
function generatePoints(count: number, targetCorrelation: number = 0.6): Point[] {
    const points: Point[] = []
    for (let i = 0; i < count; i++) {
        const x = Math.random() * 100
        // Add correlation by using x as base for y plus noise
        const noise = (Math.random() - 0.5) * 100 * (1 - Math.abs(targetCorrelation))
        const y = targetCorrelation > 0
            ? x * 0.8 + 10 + noise
            : 100 - x * 0.8 + noise
        points.push({ id: i, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
    }
    return points
}

// Get correlation interpretation
function getCorrelationLabel(r: number): { text: string; color: string } {
    const absR = Math.abs(r)
    if (absR >= 0.8) return { text: r > 0 ? "Muy fuerte positiva" : "Muy fuerte negativa", color: r > 0 ? "text-emerald-600" : "text-rose-600" }
    if (absR >= 0.6) return { text: r > 0 ? "Fuerte positiva" : "Fuerte negativa", color: r > 0 ? "text-emerald-500" : "text-rose-500" }
    if (absR >= 0.4) return { text: r > 0 ? "Moderada positiva" : "Moderada negativa", color: r > 0 ? "text-amber-500" : "text-amber-500" }
    if (absR >= 0.2) return { text: r > 0 ? "Débil positiva" : "Débil negativa", color: "text-slate-500" }
    return { text: "Sin correlación lineal", color: "text-slate-400" }
}

export function DraggableScatter({
    initialPoints = 15,
    showRegression = true
}: DraggableScatterProps) {
    const [points, setPoints] = useState<Point[]>([])
    const [isClient, setIsClient] = useState(false)
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null)
    const chartRef = useRef<HTMLDivElement>(null)

    // Generate points only on client to avoid hydration mismatch
    useEffect(() => {
        setPoints(generatePoints(initialPoints, 0.7))
        setIsClient(true)
    }, [initialPoints])

    const { correlation, regression, correlationLabel } = useMemo(() => {
        const r = calculateCorrelation(points)
        const reg = calculateRegression(points)
        return {
            correlation: r,
            regression: reg,
            correlationLabel: getCorrelationLabel(r)
        }
    }, [points])

    // Handle point drag
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (selectedPoint === null || !chartRef.current) return

        const rect = chartRef.current.getBoundingClientRect()
        // Account for chart margins (roughly 40px left, 20px right, 20px top, 30px bottom)
        const chartWidth = rect.width - 60
        const chartHeight = rect.height - 50

        const x = ((e.clientX - rect.left - 40) / chartWidth) * 100
        const y = ((rect.bottom - 30 - e.clientY) / chartHeight) * 100

        setPoints(prev => prev.map(p =>
            p.id === selectedPoint
                ? { ...p, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
                : p
        ))
    }, [selectedPoint])

    const handleMouseUp = useCallback(() => {
        setSelectedPoint(null)
    }, [])

    const resetPoints = useCallback(() => {
        setPoints(generatePoints(initialPoints, 0.7))
    }, [initialPoints])

    const randomizePoints = useCallback(() => {
        const targetR = (Math.random() - 0.5) * 2 // Random between -1 and 1
        setPoints(generatePoints(initialPoints, targetR))
    }, [initialPoints])

    // Generate regression line data for chart
    const regressionLine = useMemo(() => {
        if (!showRegression) return []
        return [
            { x: 0, y: regression.intercept },
            { x: 100, y: regression.slope * 100 + regression.intercept }
        ].filter(p => p.y >= 0 && p.y <= 100)
    }, [regression, showRegression])

    return (
        <ChartContainer
            title="Correlación Interactiva"
            description="Arrastra los puntos para ver cómo cambia el coeficiente de correlación (r)"
        >
            {!isClient ? (
                <div className="h-80 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando gráfico interactivo...</div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Controls */}
                    <div className="flex flex-wrap gap-2">
                        <motion.button
                            onClick={resetPoints}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg text-sm"
                        >
                            🔄 Resetear
                        </motion.button>
                        <motion.button
                            onClick={randomizePoints}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-brand-blue text-white font-medium rounded-lg text-sm"
                        >
                            🎲 Aleatorizar
                        </motion.button>
                    </div>

                    {/* Correlation Display */}
                    <motion.div
                        key={correlation.toFixed(2)}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl"
                    >
                        <div className="text-center">
                            <div className="text-xs uppercase tracking-wider text-slate-500">Coeficiente r</div>
                            <div className={`text-4xl font-black ${correlationLabel.color}`}>
                                {correlation.toFixed(3)}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs uppercase tracking-wider text-slate-500">Interpretación</div>
                            <div className={`text-lg font-bold ${correlationLabel.color}`}>
                                {correlationLabel.text}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs uppercase tracking-wider text-slate-500">R²</div>
                            <div className="text-lg font-mono">
                                {(correlation * correlation * 100).toFixed(1)}%
                            </div>
                        </div>
                    </motion.div>

                    {/* Chart */}
                    <div
                        ref={chartRef}
                        className="h-80 cursor-crosshair select-none"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
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
                                {showRegression && regressionLine.length === 2 && (
                                    <Scatter
                                        data={regressionLine}
                                        line={{ stroke: '#ef4444', strokeWidth: 2 }}
                                        shape={() => <></>}
                                        legendType="none"
                                    />
                                )}

                                {/* Data points */}
                                <Scatter
                                    data={points}
                                    fill="#2563EB"
                                    shape={(props: any) => (
                                        <motion.circle
                                            cx={props.cx}
                                            cy={props.cy}
                                            r={selectedPoint === props.payload.id ? 12 : 8}
                                            fill={selectedPoint === props.payload.id ? "#10b981" : "#2563EB"}
                                            stroke="white"
                                            strokeWidth={2}
                                            style={{ cursor: 'grab' }}
                                            whileHover={{ scale: 1.3 }}
                                            onMouseDown={() => setSelectedPoint(props.payload.id)}
                                        />
                                    )}
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Instructions */}
                    <div className="text-sm text-slate-500 dark:text-slate-400 text-center italic">
                        💡 Haz clic y arrastra cualquier punto azul para modificar la correlación en tiempo real
                    </div>
                </div>
            )}
        </ChartContainer>
    )
}
