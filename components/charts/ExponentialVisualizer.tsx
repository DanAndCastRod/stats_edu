"use client"

import React, { useState, useMemo } from "react"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts"

type ProbType = "lessThan" | "greaterThan"

interface ExponentialVisualizerProps {
    initialLambda?: number
    initialX?: number
}

export function ExponentialVisualizer({
    initialLambda = 0.2,
    initialX = 3
}: ExponentialVisualizerProps) {
    const [lambda, setLambda] = useState(initialLambda)
    const [xVal, setXVal] = useState(initialX)
    const [probType, setProbType] = useState<ProbType>("lessThan")

    // Key statistics
    const mean = useMemo(() => (lambda > 0 ? 1 / lambda : 0), [lambda])
    const median = useMemo(() => (lambda > 0 ? Math.LN2 / lambda : 0), [lambda])
    const variance = useMemo(() => (lambda > 0 ? 1 / (lambda * lambda) : 0), [lambda])

    // Cumulative probabilities
    const probLessThan = useMemo(() => 1 - Math.exp(-lambda * xVal), [lambda, xVal])
    const probGreaterThan = useMemo(() => Math.exp(-lambda * xVal), [lambda, xVal])
    const currentProb = probType === "lessThan" ? probLessThan : probGreaterThan

    // Generate curve data points
    const chartData = useMemo(() => {
        const points = []
        // Range up to 4.5 * mean
        const maxT = Math.max(12, Math.round(mean * 4))
        const step = maxT / 80

        for (let t = 0; t <= maxT; t += step) {
            const density = lambda * Math.exp(-lambda * t)
            let isShaded = false
            if (probType === "lessThan") {
                isShaded = t <= xVal
            } else {
                isShaded = t >= xVal
            }

            points.push({
                t: Number(t.toFixed(2)),
                density: Number(density.toFixed(4)),
                shadedDensity: isShaded ? Number(density.toFixed(4)) : 0
            })
        }
        return points
    }, [lambda, xVal, mean, probType])

    return (
        <ChartContainer
            title="Distribución Exponencial: Modelado de Tiempos y Fiabilidad"
            description="Explora cómo la tasa de ocurrencia λ condiciona la densidad de probabilidad f(t) y el tiempo medio entre eventos (MTBF)."
        >
            <div className="space-y-6">
                {/* Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label={`Tasa de Eventos (λ = ${lambda.toFixed(2)} ev/u.t.)`}
                        value={Math.round(lambda * 100)}
                        min={5}
                        max={150}
                        step={5}
                        onChange={(val) => setLambda(val / 100)}
                    />
                    <SliderControl
                        label={`Tiempo de Evaluación (x = ${xVal.toFixed(1)} u.t.)`}
                        value={Math.round(xVal * 10)}
                        min={5}
                        max={Math.round(mean * 30)}
                        step={5}
                        onChange={(val) => setXVal(val / 10)}
                    />
                </div>

                {/* Probability Selector */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setProbType("lessThan")}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            probType === "lessThan"
                                ? "bg-brand-blue text-white border-brand-blue shadow"
                                : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                    >
                        P(X ≤ {xVal.toFixed(1)}) — Ocurre antes de x
                    </button>
                    <button
                        onClick={() => setProbType("greaterThan")}
                        className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            probType === "greaterThan"
                                ? "bg-brand-blue text-white border-brand-blue shadow"
                                : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                    >
                        P(X &gt; {xVal.toFixed(1)}) — Sobrevive / Espera mayor a x
                    </button>
                </div>

                {/* Chart */}
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="exponFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.85} />
                                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.15} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800" />
                            <XAxis
                                dataKey="t"
                                stroke="#94a3b8"
                                tickFormatter={(v) => Number(v).toFixed(1)}
                            />
                            <YAxis stroke="#94a3b8" tickFormatter={(v) => v.toFixed(2)} />
                            <Tooltip
                                formatter={(val, name) => [
                                    Number(val).toFixed(4),
                                    name === "shadedDensity" ? "Área de Probabilidad" : "Densidad f(t)"
                                ]}
                                labelFormatter={(label) => `t = ${Number(label).toFixed(2)}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="density"
                                stroke="#94a3b8"
                                strokeWidth={1.5}
                                fill="transparent"
                            />
                            <Area
                                type="monotone"
                                dataKey="shadedDensity"
                                stroke="#0284C7"
                                strokeWidth={2.5}
                                fill="url(#exponFill)"
                            />
                            {/* Mean Reference Line */}
                            <ReferenceLine
                                x={mean}
                                stroke="#10b981"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                                label={{ value: `Media = ${mean.toFixed(1)}`, fill: "#10b981", fontSize: 11, position: "top" }}
                            />
                            {/* Cutoff Reference Line */}
                            <ReferenceLine
                                x={xVal}
                                stroke="#f97316"
                                strokeWidth={2.5}
                                label={{ value: `x = ${xVal.toFixed(1)}`, fill: "#f97316", fontSize: 12, position: "top" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tasa (λ)</div>
                        <div className="text-xl font-black text-brand-blue">{lambda.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Media E[X] = 1/λ</div>
                        <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{mean.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mediana (t₀.₅)</div>
                        <div className="text-xl font-black text-purple-600 dark:text-purple-400">{median.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 rounded-xl">
                        <div className="text-[10px] text-sky-700 dark:text-sky-400 font-bold uppercase tracking-wider">Probabilidad</div>
                        <div className="text-xl font-black text-sky-600 dark:text-sky-300">{(currentProb * 100).toFixed(2)}%</div>
                    </div>
                </div>

                {/* Reliability Formula Note */}
                <div className="p-4 bg-slate-100/70 dark:bg-slate-850 rounded-xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200/60 dark:border-slate-800">
                    <strong>Fórmula Aplicada: </strong>
                    {probType === "lessThan" ? (
                        <span>
                            {`P(X ≤ ${xVal.toFixed(1)}) = 1 - e^(-${lambda.toFixed(2)} × ${xVal.toFixed(1)}) = ${(probLessThan * 100).toFixed(2)}%`} (Probabilidad de falla o arribo temprano).
                        </span>
                    ) : (
                        <span>
                            {`P(X > ${xVal.toFixed(1)}) = e^(-${lambda.toFixed(2)} × ${xVal.toFixed(1)}) = ${(probGreaterThan * 100).toFixed(2)}%`} (Función de Confiabilidad / Supervivencia R(t)).
                        </span>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
