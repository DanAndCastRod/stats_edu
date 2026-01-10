"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface RejectionRegionProps {
    testType?: "two-tailed" | "left-tailed" | "right-tailed"
}

// Standard Normal PDF
function normalPDF(z: number): number {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z)
}

// Approximate inverse normal (for critical values)
function zFromAlpha(alpha: number, twoTailed: boolean = true): number {
    // Using approximation for common values
    const p = twoTailed ? alpha / 2 : alpha
    // Rational approximation for inverse normal
    const a = [
        -3.969683028665376e+01,
        2.209460984245205e+02,
        -2.759285104469687e+02,
        1.383577518672690e+02,
        -3.066479806614716e+01,
        2.506628277459239e+00
    ]
    const b = [
        -5.447609879822406e+01,
        1.615858368580409e+02,
        -1.556989798598866e+02,
        6.680131188771972e+01,
        -1.328068155288572e+01
    ]
    const c = [
        -7.784894002430293e-03,
        -3.223964580411365e-01,
        -2.400758277161838e+00,
        -2.549732539343734e+00,
        4.374664141464968e+00,
        2.938163982698783e+00
    ]
    const d = [
        7.784695709041462e-03,
        3.224671290700398e-01,
        2.445134137142996e+00,
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

export function RejectionRegion({ testType = "two-tailed" }: RejectionRegionProps) {
    const [alpha, setAlpha] = useState(0.05)
    const [zStat, setZStat] = useState(1.5)

    const { curveData, criticalValues, decision, pValue } = useMemo(() => {
        // Generate curve data
        const data = []
        for (let z = -4; z <= 4; z += 0.05) {
            data.push({ z, y: normalPDF(z) })
        }

        // Calculate critical values and decision
        let zCritLow: number | null = null
        let zCritHigh: number | null = null
        let reject = false
        let pVal = 0

        if (testType === "two-tailed") {
            const zCrit = zFromAlpha(alpha, true)
            zCritLow = -Math.abs(zCrit)
            zCritHigh = Math.abs(zCrit)
            reject = Math.abs(zStat) > Math.abs(zCrit)
            // Two-tailed p-value (approximate using symmetry)
            pVal = 2 * (1 - normalCDF(Math.abs(zStat)))
        } else if (testType === "left-tailed") {
            zCritLow = -Math.abs(zFromAlpha(alpha, false))
            reject = zStat < zCritLow
            pVal = normalCDF(zStat)
        } else {
            zCritHigh = Math.abs(zFromAlpha(alpha, false))
            reject = zStat > zCritHigh
            pVal = 1 - normalCDF(zStat)
        }

        return {
            curveData: data,
            criticalValues: { low: zCritLow, high: zCritHigh },
            decision: reject,
            pValue: Math.max(0, Math.min(1, pVal))
        }
    }, [alpha, zStat, testType])

    // Simple normal CDF approximation
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

    const testTypeLabel = testType === "two-tailed" ? "Bilateral" : testType === "left-tailed" ? "Cola Izquierda" : "Cola Derecha"

    return (
        <ChartContainer
            title={`Región de Rechazo - Prueba ${testTypeLabel}`}
            description={`Nivel de significancia α = ${(alpha * 100).toFixed(1)}%`}
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Nivel de Significancia (α)"
                        value={alpha}
                        min={0.01}
                        max={0.20}
                        step={0.01}
                        onChange={setAlpha}
                    />
                    <SliderControl
                        label="Estadístico Z observado"
                        value={zStat}
                        min={-4}
                        max={4}
                        step={0.1}
                        onChange={setZStat}
                    />
                </div>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="normalFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="z"
                                type="number"
                                domain={[-4, 4]}
                                stroke="#94a3b8"
                                label={{ value: 'Z', position: 'insideBottomRight', offset: -5 }}
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Rejection regions (shaded in red) */}
                            {(testType === "two-tailed" || testType === "left-tailed") && criticalValues.low !== null && (
                                <ReferenceArea x1={-4} x2={criticalValues.low} fill="#ef4444" fillOpacity={0.4} />
                            )}
                            {(testType === "two-tailed" || testType === "right-tailed") && criticalValues.high !== null && (
                                <ReferenceArea x1={criticalValues.high} x2={4} fill="#ef4444" fillOpacity={0.4} />
                            )}

                            {/* Curve */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#64748b"
                                strokeWidth={2}
                                fill="url(#normalFill)"
                            />

                            {/* Critical value lines */}
                            {criticalValues.low !== null && (
                                <ReferenceLine
                                    x={criticalValues.low}
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    label={{ value: `z=${criticalValues.low.toFixed(2)}`, fill: "#ef4444", fontSize: 11 }}
                                />
                            )}
                            {criticalValues.high !== null && (
                                <ReferenceLine
                                    x={criticalValues.high}
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    label={{ value: `z=${criticalValues.high.toFixed(2)}`, fill: "#ef4444", fontSize: 11 }}
                                />
                            )}

                            {/* Observed z statistic */}
                            <ReferenceLine
                                x={zStat}
                                stroke={decision ? "#ef4444" : "#10b981"}
                                strokeWidth={3}
                                label={{
                                    value: `Z=${zStat.toFixed(2)}`,
                                    fill: decision ? "#ef4444" : "#10b981",
                                    fontSize: 12,
                                    fontWeight: "bold"
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Decision */}
                <motion.div
                    key={`${alpha}-${zStat}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl text-center ${decision
                            ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700"
                            : "bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-300 dark:border-emerald-700"
                        }`}
                >
                    <div className="text-sm uppercase tracking-wider text-slate-500 mb-2">Decisión</div>
                    <div className={`text-2xl font-black ${decision ? "text-red-600" : "text-emerald-600"}`}>
                        {decision ? "❌ RECHAZAR H₀" : "✅ NO RECHAZAR H₀"}
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        p-valor ≈ {pValue.toFixed(4)} {pValue < alpha ? "< " : "≥ "} α = {alpha}
                    </div>
                </motion.div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <span>Región de Rechazo</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-red-500"></div>
                        <span>Valores Críticos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-4 h-1 ${decision ? "bg-red-500" : "bg-emerald-500"}`}></div>
                        <span>Z Observado</span>
                    </div>
                </div>
            </div>
        </ChartContainer>
    )
}
