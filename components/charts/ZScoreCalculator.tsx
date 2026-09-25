"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts"

type ProbabilityMode = "left" | "right" | "twoTailed" | "center"

interface ZScoreCalculatorProps {
    initialMean?: number
    initialStd?: number
    initialX?: number
}

// Approximation of the error function erf(x)
function erf(x: number): number {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const sign = x < 0 ? -1 : 1
    const absX = Math.abs(x)

    const t = 1.0 / (1.0 + p * absX)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX)

    return sign * y
}

// Standard normal cumulative distribution function (CDF)
function standardNormalCDF(z: number): number {
    return 0.5 * (1 + erf(z / Math.sqrt(2)))
}

// Normal probability density function (PDF)
function normalPDF(x: number, mean: number, std: number): number {
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent)
}

export function ZScoreCalculator({
    initialMean = 100,
    initialStd = 15,
    initialX = 115
}: ZScoreCalculatorProps) {
    const [mean, setMean] = useState(initialMean)
    const [std, setStd] = useState(initialStd)
    const [xVal, setXVal] = useState(initialX)
    const [mode, setMode] = useState<ProbabilityMode>("left")

    // Z-Score calculation
    const zScore = useMemo(() => {
        if (std === 0) return 0
        return (xVal - mean) / std
    }, [xVal, mean, std])

    // Probability calculation
    const probability = useMemo(() => {
        const phiZ = standardNormalCDF(zScore)
        const absZ = Math.abs(zScore)
        const phiAbsZ = standardNormalCDF(absZ)

        switch (mode) {
            case "left":
                return phiZ
            case "right":
                return 1 - phiZ
            case "center":
                return (phiAbsZ - 0.5) * 2
            case "twoTailed":
                return 2 * (1 - phiAbsZ)
            default:
                return phiZ
        }
    }, [zScore, mode])

    // Generate curve points and shaded region
    const chartData = useMemo(() => {
        const points = []
        const minX = mean - 3.8 * std
        const maxX = mean + 3.8 * std
        const step = (maxX - minX) / 100
        const absZ = Math.abs(zScore)

        for (let x = minX; x <= maxX; x += step) {
            const density = normalPDF(x, mean, std)
            const currentZ = (x - mean) / std
            let isShaded = false

            if (mode === "left") {
                isShaded = currentZ <= zScore
            } else if (mode === "right") {
                isShaded = currentZ >= zScore
            } else if (mode === "center") {
                isShaded = Math.abs(currentZ) <= absZ
            } else if (mode === "twoTailed") {
                isShaded = Math.abs(currentZ) >= absZ
            }

            points.push({
                x: Number(x.toFixed(2)),
                density: Number(density.toFixed(5)),
                shadedDensity: isShaded ? Number(density.toFixed(5)) : 0
            })
        }
        return points
    }, [mean, std, zScore, mode])

    return (
        <ChartContainer
            title="Calculadora y Visualizador de Puntaje Z (Z-Score)"
            description="Estandariza cualquier valor a la distribución Normal Estándar N(0, 1) y calcula probabilidades exactas."
        >
            <div className="space-y-6">
                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label={`Media Poblacional (μ = ${mean})`}
                        value={mean}
                        min={0}
                        max={200}
                        step={1}
                        onChange={setMean}
                    />
                    <SliderControl
                        label={`Desv. Estándar (σ = ${std})`}
                        value={std}
                        min={1}
                        max={50}
                        step={1}
                        onChange={setStd}
                    />
                    <SliderControl
                        label={`Valor Observado (X = ${xVal})`}
                        value={xVal}
                        min={Math.round(mean - 3.5 * std)}
                        max={Math.round(mean + 3.5 * std)}
                        step={1}
                        onChange={setXVal}
                    />
                </div>

                {/* Probability Mode Selection */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                        Región de Probabilidad a Calcular
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button
                            onClick={() => setMode("left")}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                mode === "left"
                                    ? "bg-brand-blue text-white border-brand-blue shadow"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                        >
                            <div>P(X ≤ {xVal})</div>
                            <div className="text-[10px] opacity-80">Cola Izquierda</div>
                        </button>
                        <button
                            onClick={() => setMode("right")}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                mode === "right"
                                    ? "bg-brand-blue text-white border-brand-blue shadow"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                        >
                            <div>P(X ≥ {xVal})</div>
                            <div className="text-[10px] opacity-80">Cola Derecha</div>
                        </button>
                        <button
                            onClick={() => setMode("center")}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                mode === "center"
                                    ? "bg-brand-blue text-white border-brand-blue shadow"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                        >
                            <div>P(|Z| ≤ {Math.abs(zScore).toFixed(2)})</div>
                            <div className="text-[10px] opacity-80">Intervalo Central</div>
                        </button>
                        <button
                            onClick={() => setMode("twoTailed")}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                                mode === "twoTailed"
                                    ? "bg-brand-blue text-white border-brand-blue shadow"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                            }`}
                        >
                            <div>P(|Z| ≥ {Math.abs(zScore).toFixed(2)})</div>
                            <div className="text-[10px] opacity-80">Dos Colas (Extremos)</div>
                        </button>
                    </div>
                </div>

                {/* Normal Curve Chart */}
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="normalFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.15} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800" />
                            <XAxis
                                dataKey="x"
                                stroke="#94a3b8"
                                tickFormatter={(v) => String(Math.round(v))}
                            />
                            <YAxis stroke="#94a3b8" tickFormatter={(v) => v.toFixed(3)} />
                            <Tooltip
                                formatter={(value, name) => [
                                    Number(value).toFixed(5),
                                    name === "shadedDensity" ? "Área Sombreada" : "Densidad f(x)"
                                ]}
                                labelFormatter={(label) => `X = ${Number(label).toFixed(1)}`}
                            />
                            {/* Base outline curve */}
                            <Area
                                type="monotone"
                                dataKey="density"
                                stroke="#94a3b8"
                                strokeWidth={1.5}
                                fill="transparent"
                            />
                            {/* Shaded Area */}
                            <Area
                                type="monotone"
                                dataKey="shadedDensity"
                                stroke="#2563EB"
                                strokeWidth={2.5}
                                fill="url(#normalFill)"
                            />
                            {/* Mean Line */}
                            <ReferenceLine
                                x={mean}
                                stroke="#10b981"
                                strokeDasharray="3 3"
                                strokeWidth={2}
                                label={{ value: `μ = ${mean}`, fill: "#10b981", fontSize: 11, position: "top" }}
                            />
                            {/* Observed Value Line */}
                            <ReferenceLine
                                x={xVal}
                                stroke="#f97316"
                                strokeWidth={2.5}
                                label={{ value: `X = ${xVal}`, fill: "#f97316", fontSize: 12, position: "top" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Mathematical Computation Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Fórmula de Estandarización
                        </span>
                        <div className="text-sm font-mono text-slate-800 dark:text-slate-100">
                            Z = (X - μ) / σ
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-1">
                            Z = ({xVal} - {mean}) / {std}
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-1">
                            Puntaje Z Resultante
                        </span>
                        <div className="text-3xl font-black text-brand-blue">
                            Z = {zScore >= 0 ? `+${zScore.toFixed(3)}` : zScore.toFixed(3)}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {Math.abs(zScore).toFixed(2)} σ {zScore >= 0 ? "sobre" : "debajo de"} la media
                        </span>
                    </div>

                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                            Probabilidad (Área Bajo la Curva)
                        </span>
                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                            {(probability * 100).toFixed(2)}%
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                            p = {probability.toFixed(4)}
                        </span>
                    </div>
                </div>

                {/* Practical Interpretation */}
                <div className="p-4 bg-slate-100/70 dark:bg-slate-850 rounded-xl text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200/60 dark:border-slate-800">
                    <strong>Interpretación:</strong> Para una población con media $\mu = {mean}$ y dispersión $\sigma = {std}$, un valor observado $X = {xVal}$ equivale a un puntaje estandarizado de <strong>Z = {zScore.toFixed(2)}</strong>.{" "}
                    {mode === "left" && (
                        <span>
                            Aproximadamente el <strong>{(probability * 100).toFixed(2)}%</strong> de las observaciones son menores o iguales a {xVal} (Percentil {(probability * 100).toFixed(1)}).
                        </span>
                    )}
                    {mode === "right" && (
                        <span>
                            Solo el <strong>{(probability * 100).toFixed(2)}%</strong> de la población supera el valor {xVal}.
                        </span>
                    )}
                    {mode === "center" && (
                        <span>
                            El <strong>{(probability * 100).toFixed(2)}%</strong> central de los datos se encuentra a una distancia máxima de {Math.abs(zScore).toFixed(2)} desviaciones estándar de la media.
                        </span>
                    )}
                    {mode === "twoTailed" && (
                        <span>
                            La probabilidad de obtener un valor tan o más extremo que {xVal} en cualquier dirección es del <strong>{(probability * 100).toFixed(2)}%</strong> (p-valor bilateral).
                        </span>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
