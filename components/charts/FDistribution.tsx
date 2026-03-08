"use client"

import React, { useState, useMemo } from "react"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, Tooltip
} from "recharts"

// Gamma function approximation (Lanczos approximation for small/medium inputs)
function gamma(z: number): number {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z))
    z -= 1
    let x = 0.99999999999980993
    const c = [
        676.5203681218851, -1259.1392167224028, 771.32342877765313,
        -176.61502916214059, 12.507343278686905, -0.13857109526572012,
        9.9843695780195716e-6, 1.5056327351493116e-7
    ]
    for (let i = 0; i < 8; i++) x += c[i] / (z + i + 1)
    const t = z + 8 - 0.5
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x
}

// F-Distribution PDF
function fPDF(x: number, d1: number, d2: number): number {
    if (x <= 0) return 0
    const num = Math.pow(d1 * x, d1) * Math.pow(d2, d2)
    const den = Math.pow(d1 * x + d2, d1 + d2)
    const beta = (gamma(d1 / 2) * gamma(d2 / 2)) / gamma((d1 + d2) / 2)
    return Math.sqrt(num / den) / (x * beta)
}

export function FDistribution() {
    const [df1, setDf1] = useState(3) // Numerator df (Between groups)
    const [df2, setDf2] = useState(20) // Denominator df (Within groups)
    const [alpha, setAlpha] = useState(0.05)

    const data = useMemo(() => {
        const points = []
        const maxX = 5 // Reasonable range for F-distribution
        for (let x = 0; x <= maxX; x += 0.05) {
            points.push({
                x,
                y: fPDF(x, df1, df2),
                isCritical: false // We verify this later approximately 
            })
        }
        return points
    }, [df1, df2])

    // Approximation of critical value (simple interpolation not feasible, 
    // so we'll just show the shape and explain p-value concept visually)
    // Or we can assume a hardcoded critical value range or look-up table for common alphas?
    // For visualization, finding where area ~ 1-alpha is acceptable.
    const criticalValue = useMemo(() => {
        // Integrate to find critical value
        let area = 0
        let cv = 0
        const dx = 0.01
        for (let x = 0; x < 20; x += dx) {
            area += fPDF(x, df1, df2) * dx
            if (area >= 1 - alpha) {
                cv = x
                break
            }
        }
        return cv
    }, [df1, df2, alpha])

    const chartData = data.map(d => ({
        ...d,
        fill: d.x >= criticalValue ? "#ef4444" : "#3b82f6",
        opacity: d.x >= criticalValue ? 0.5 : 0.2
    }))

    return (
        <ChartContainer
            title="Distribución F de Fisher-Snedecor"
            description="La base del ANOVA y comparación de varianzas"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label="Grados Libertad (d₁) - Numerador"
                        value={df1}
                        min={1}
                        max={20}
                        step={1}
                        onChange={setDf1}
                    />
                    <SliderControl
                        label="Grados Libertad (d₂) - Denominador"
                        value={df2}
                        min={1}
                        max={50}
                        step={1}
                        onChange={setDf2}
                    />
                    <SliderControl
                        label="Alfa (α)"
                        value={alpha}
                        min={0.01}
                        max={0.10}
                        step={0.01}
                        onChange={setAlpha}
                    />
                </div>

                {/* Chart */}
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset={criticalValue / 5} stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset={criticalValue / 5} stopColor="#ef4444" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="x" stroke="#94a3b8" type="number" domain={[0, 5]} allowDataOverflow={false} />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                formatter={(val: any) => Number(val).toFixed(4)}
                                labelFormatter={(val) => `F = ${Number(val).toFixed(2)}`}
                            />
                            <ReferenceLine x={criticalValue} stroke="#ef4444" strokeDasharray="3 3" label={{ value: `F crit = ${criticalValue.toFixed(2)}`, fill: "#ef4444", position: "top" }} />
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#splitColor)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Valor Crítico (F_crit)</div>
                        <div className="text-xl font-bold font-mono text-red-600">
                            {criticalValue.toFixed(3)}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                            Si F_calc {">"} F_crit → Rechazar H₀
                        </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <div className="text-xs uppercase tracking-wider text-slate-500">Forma</div>
                        <div className="text-sm font-medium mt-1">
                            {df1 <= 2 ? "Monótona decreciente" : "Asimétrica positiva"}
                        </div>
                        <div className="text-xs text-slate-400">
                            Siempre positiva (x {">"} 0)
                        </div>
                    </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Intuición ANOVA:</strong><br />
                    La distribución F modela el radio de dos varianzas ($s_1^2 / s_2^2$).
                    Si las varianzas son iguales (H₀ verdadera), el radio debería ser cercano a 1.
                    Valores F muy grandes son improbables (zona roja) y sugieren que las varianzas (y por ende las medias) son diferentes.
                </div>
            </div>
        </ChartContainer>
    )
}
