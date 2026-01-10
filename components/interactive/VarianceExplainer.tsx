"use client"

import { useState, useMemo, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Play, Pause, RotateCcw } from "lucide-react"

export function VarianceExplainer() {
    const [mu, setMu] = useState(50)
    const [sigma, setSigma] = useState(10) // Standard Deviation
    const [isAnimating, setIsAnimating] = useState(false)

    // Generate Normal Distribution Data Points
    const data = useMemo(() => {
        const points = []
        // Range: Mean +/- 4 Sigmas (sufficiently covers the curve)
        // Fixed range 0-100 for visual consistency
        for (let x = 0; x <= 100; x += 1) {
            // PDF Formula: (1 / (sigma * sqrt(2*PI))) * e^(-0.5 * ((x - mu)/sigma)^2)
            const exponent = -0.5 * Math.pow((x - mu) / sigma, 2)
            const prob = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent)
            points.push({ x, prob })
        }
        return points
    }, [mu, sigma])

    // Animation Effect (Breathing Sigma)
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isAnimating) {
            let direction = 1
            interval = setInterval(() => {
                setSigma(prev => {
                    if (prev >= 25) direction = -1
                    if (prev <= 5) direction = 1
                    return parseFloat((prev + (direction * 0.5)).toFixed(1))
                })
            }, 50)
        }
        return () => clearInterval(interval)
    }, [isAnimating])

    return (
        <div className="my-8 rounded-xl border bg-white dark:bg-slate-950 p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Simulador de Distribución Normal
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Mueve los deslizadores para entender cómo la **Dispersión (σ)** cambia la forma de la curva sin alterar su área total (Probabilidad = 100%).
                </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <label>Promedio (μ): {mu}</label>
                        </div>
                        <input
                            type="range" min="10" max="90" value={mu}
                            onChange={(e) => setMu(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <label>Desviación Estándar (σ): {sigma}</label>
                            <span className={sigma > 15 ? "text-red-500" : "text-emerald-500"}>
                                {sigma > 15 ? "Alta Variabilidad (Riesgo)" : "Alta Precisión"}
                            </span>
                        </div>
                        <input
                            type="range" min="2" max="30" step="0.5" value={sigma}
                            onChange={(e) => {
                                setSigma(Number(e.target.value))
                                setIsAnimating(false) // Stop animation on user interaction
                            }}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-2">
                    <button
                        onClick={() => setIsAnimating(!isAnimating)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAnimating
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                    >
                        {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isAnimating ? "Pausar Animación" : "Animar Dispersión"}
                    </button>
                    <button
                        onClick={() => { setMu(50); setSigma(10); setIsAnimating(false); }}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="x"
                            type="number"
                            domain={[0, 100]}
                            tick={{ fontSize: 12 }}
                            stroke="#94a3b8"
                            label={{ value: 'Valor de la Variable', position: 'insideBottom', offset: -5, fontSize: 12, fill: '#94a3b8' }}
                        />
                        <YAxis hide domain={[0, 'auto']} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-white/90 backdrop-blur border shadow-sm rounded-lg p-2 text-xs">
                                            <p className="font-bold">X: {payload[0].payload.x}</p>
                                            <p>Prob: {payload[0].payload.prob.toFixed(4)}</p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="prob"
                            stroke="#2563EB"
                            strokeWidth={2}
                            fill="#3b82f6"
                            fillOpacity={0.2}
                            animationDuration={0} // Disable internal recharts animation for smooth slider updates
                        />
                        <ReferenceLine x={mu} stroke="#EF4444" strokeDasharray="3 3" />
                        <ReferenceLine x={mu - sigma} stroke="#10B981" strokeDasharray="3 3" />
                        <ReferenceLine x={mu + sigma} stroke="#10B981" strokeDasharray="3 3" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center text-xs text-slate-400">
                Línea Roja: Promedio (μ) | Líneas Verdes: μ ± 1σ (68% de los datos)
            </div>
        </div>
    )
}
