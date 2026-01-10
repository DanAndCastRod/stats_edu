"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface TypeIIErrorProps {
    initialAlpha?: number
    initialEffectSize?: number
}

// Normal PDF
function normalPDF(x: number, mean: number, std: number): number {
    const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return coefficient * Math.exp(exponent)
}

// Inverse normal CDF approximation
function invNormalCDF(p: number): number {
    // Approximation for inverse normal CDF
    const a = [
        -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
        1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00
    ]
    const b = [
        -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
        6.680131188771972e+01, -1.328068155288572e+01
    ]
    const c = [
        -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
        -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00
    ]
    const d = [
        7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
        3.754408661907416e+00
    ]

    const pLow = 0.02425
    const pHigh = 1 - pLow

    let q, r
    if (p < pLow) {
        q = Math.sqrt(-2 * Math.log(p))
        return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
            ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    } else if (p <= pHigh) {
        q = p - 0.5
        r = q * q
        return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
            (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    } else {
        q = Math.sqrt(-2 * Math.log(1 - p))
        return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
            ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    }
}

// Normal CDF approximation
function normalCDF(z: number): number {
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const sign = z < 0 ? -1 : 1
    z = Math.abs(z) / Math.sqrt(2)

    const t = 1.0 / (1.0 + p * z)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)

    return 0.5 * (1.0 + sign * y)
}

export function TypeIIError({
    initialAlpha = 0.05,
    initialEffectSize = 0.5
}: TypeIIErrorProps) {
    const [alpha, setAlpha] = useState(initialAlpha)
    const [effectSize, setEffectSize] = useState(initialEffectSize)
    const [n, setN] = useState(30)

    const { curveH0, curveH1, criticalValue, beta, power, stats } = useMemo(() => {
        const std = 1 // Standard normal for simplicity
        const se = std / Math.sqrt(n)

        // Critical value for right-tailed test (H1: μ > 0)
        const zCrit = invNormalCDF(1 - alpha)
        const xCrit = zCrit * se

        // Effect size in original units
        const trueEffect = effectSize * std

        // Beta = P(fail to reject | H1 true) = P(Z < zCrit under H1)
        // Under H1, Z ~ N(d*sqrt(n), 1) where d is Cohen's d
        const zUnderH1 = (xCrit - trueEffect) / se
        const betaVal = normalCDF(zUnderH1)
        const powerVal = 1 - betaVal

        // Generate curves
        const minX = -4 * se
        const maxX = trueEffect + 4 * se
        const h0Curve: { x: number; h0: number; h1: number }[] = []
        const h1Curve: { x: number; h0: number; h1: number }[] = []

        for (let x = minX; x <= maxX; x += (maxX - minX) / 200) {
            h0Curve.push({ x, h0: normalPDF(x, 0, se), h1: 0 })
            h1Curve.push({ x, h0: 0, h1: normalPDF(x, trueEffect, se) })
        }

        // Combine curves
        const combined = h0Curve.map((point, i) => ({
            ...point,
            h1: h1Curve[i]?.h1 || 0
        }))

        return {
            curveH0: combined,
            curveH1: h1Curve,
            criticalValue: xCrit,
            beta: betaVal,
            power: powerVal,
            stats: { zCrit, effectSize, trueEffect, se }
        }
    }, [alpha, effectSize, n])

    return (
        <ChartContainer
            title="Error Tipo II (β) y Poder Estadístico"
            description="Visualiza el trade-off entre α, β y el tamaño de muestra"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label="Nivel α (Error Tipo I)"
                        value={alpha}
                        min={0.01}
                        max={0.20}
                        step={0.01}
                        onChange={setAlpha}
                    />
                    <SliderControl
                        label="Tamaño del Efecto (Cohen's d)"
                        value={effectSize}
                        min={0.1}
                        max={1.5}
                        step={0.1}
                        onChange={setEffectSize}
                    />
                    <SliderControl
                        label="Tamaño de Muestra (n)"
                        value={n}
                        min={10}
                        max={200}
                        onChange={setN}
                    />
                </div>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveH0} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="h0Grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="h1Grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(v) => v.toFixed(2)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Beta region (Type II error) */}
                            <ReferenceArea
                                x1={curveH0[0]?.x || -1}
                                x2={criticalValue}
                                fill="#ef4444"
                                fillOpacity={0.2}
                            />

                            {/* H0 curve */}
                            <Area
                                type="monotone"
                                dataKey="h0"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#h0Grad)"
                                name="H₀"
                            />

                            {/* H1 curve */}
                            <Area
                                type="monotone"
                                dataKey="h1"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#h1Grad)"
                                name="H₁"
                            />

                            {/* Critical value */}
                            <ReferenceLine
                                x={criticalValue}
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                label={{ value: `Crítico`, fill: "#ef4444", fontSize: 11 }}
                            />

                            {/* True effect */}
                            <ReferenceLine
                                x={stats.trueEffect}
                                stroke="#10b981"
                                strokeWidth={2}
                                label={{ value: `μ₁`, fill: "#10b981", fontSize: 11 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <motion.div
                        key={`alpha-${alpha}`}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                    >
                        <div className="text-xs text-blue-500 uppercase tracking-wider">Error α (Tipo I)</div>
                        <div className="text-2xl font-black text-blue-600">{(alpha * 100).toFixed(1)}%</div>
                        <div className="text-xs text-blue-400">Falso positivo</div>
                    </motion.div>

                    <motion.div
                        key={`beta-${beta.toFixed(3)}`}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    >
                        <div className="text-xs text-red-500 uppercase tracking-wider">Error β (Tipo II)</div>
                        <div className="text-2xl font-black text-red-600">{(beta * 100).toFixed(1)}%</div>
                        <div className="text-xs text-red-400">Falso negativo</div>
                    </motion.div>

                    <motion.div
                        key={`power-${power.toFixed(3)}`}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className={`p-4 rounded-xl border ${power >= 0.8
                            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                            : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                            }`}
                    >
                        <div className={`text-xs uppercase tracking-wider ${power >= 0.8 ? "text-emerald-500" : "text-amber-500"}`}>
                            Poder (1-β)
                        </div>
                        <div className={`text-2xl font-black ${power >= 0.8 ? "text-emerald-600" : "text-amber-600"}`}>
                            {(power * 100).toFixed(1)}%
                        </div>
                        <div className={`text-xs ${power >= 0.8 ? "text-emerald-400" : "text-amber-400"}`}>
                            {power >= 0.8 ? "✓ Adecuado" : "⚠️ Bajo"}
                        </div>
                    </motion.div>

                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">n Requerido (80%)</div>
                        <div className="text-2xl font-mono">
                            {Math.ceil(Math.pow(2.8 / effectSize, 2))}
                        </div>
                        <div className="text-xs text-slate-400">para d = {effectSize}</div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <span>H₀: μ = 0 (Nulo)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                        <span>H₁: μ = {stats.trueEffect.toFixed(2)} (Alternativo)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-300 rounded"></div>
                        <span>Región β (Error Tipo II)</span>
                    </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl text-sm text-purple-800 dark:text-purple-200">
                    <strong>💡 Trade-offs:</strong><br />
                    • ↓α → ↑β (ser más estricto aumenta falsos negativos)<br />
                    • ↑n → ↓β (más datos = más poder para detectar efectos)<br />
                    • ↑d → ↓β (efectos grandes son más fáciles de detectar)
                </div>
            </div>
        </ChartContainer>
    )
}
