"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface CorrelationMatrixProps {
    initialN?: number
}

// Generate correlated data
function generateCorrelatedData(n: number, correlations: { name: string; r: number }[]): { [key: string]: number[] } {
    const data: { [key: string]: number[] } = {}

    // Generate base variable X
    const x: number[] = []
    for (let i = 0; i < n; i++) {
        const u1 = Math.random()
        const u2 = Math.random()
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        x.push(50 + 10 * z)
    }
    data["X"] = x

    // Generate correlated variables
    correlations.forEach(({ name, r }) => {
        const y: number[] = []
        for (let i = 0; i < n; i++) {
            const u1 = Math.random()
            const u2 = Math.random()
            const noise = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
            // Create correlated variable
            const val = r * x[i] + Math.sqrt(1 - r * r) * (50 + 10 * noise)
            y.push(val)
        }
        data[name] = y
    })

    return data
}

// Calculate correlation
function calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length
    const meanX = x.reduce((a, b) => a + b, 0) / n
    const meanY = y.reduce((a, b) => a + b, 0) / n

    let numerator = 0
    let denomX = 0
    let denomY = 0

    for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX
        const dy = y[i] - meanY
        numerator += dx * dy
        denomX += dx * dx
        denomY += dy * dy
    }

    return numerator / Math.sqrt(denomX * denomY)
}

// Get color for correlation value
function getCorrelationColor(r: number): string {
    if (r > 0.7) return "bg-emerald-500"
    if (r > 0.3) return "bg-emerald-300"
    if (r > -0.3) return "bg-slate-200"
    if (r > -0.7) return "bg-red-300"
    return "bg-red-500"
}

export function CorrelationMatrix({ initialN = 50 }: CorrelationMatrixProps) {
    const [n, setN] = useState(initialN)
    const [r1, setR1] = useState(0.8)   // X-Y correlation
    const [r2, setR2] = useState(-0.5)  // X-Z correlation
    const [r3, setR3] = useState(0.2)   // X-W correlation
    const [data, setData] = useState<{ [key: string]: number[] }>({})
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(generateCorrelatedData(n, [
            { name: "Y", r: r1 },
            { name: "Z", r: r2 },
            { name: "W", r: r3 }
        ]))
    }, [])

    const regenerate = () => {
        setData(generateCorrelatedData(n, [
            { name: "Y", r: r1 },
            { name: "Z", r: r2 },
            { name: "W", r: r3 }
        ]))
    }

    const { matrix, variables } = useMemo(() => {
        if (Object.keys(data).length === 0) return { matrix: [], variables: [] }

        const vars = Object.keys(data)
        const mat: number[][] = []

        for (let i = 0; i < vars.length; i++) {
            mat[i] = []
            for (let j = 0; j < vars.length; j++) {
                if (i === j) {
                    mat[i][j] = 1
                } else {
                    mat[i][j] = calculateCorrelation(data[vars[i]], data[vars[j]])
                }
            }
        }

        return { matrix: mat, variables: vars }
    }, [data])

    if (!isClient) {
        return (
            <ChartContainer title="Matriz de Correlación" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Matriz de Correlación Interactiva"
            description="Ajusta las correlaciones y observa el patrón"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="r(X,Y)"
                        value={r1}
                        min={-1}
                        max={1}
                        step={0.1}
                        onChange={setR1}
                    />
                    <SliderControl
                        label="r(X,Z)"
                        value={r2}
                        min={-1}
                        max={1}
                        step={0.1}
                        onChange={setR2}
                    />
                    <SliderControl
                        label="r(X,W)"
                        value={r3}
                        min={-1}
                        max={1}
                        step={0.1}
                        onChange={setR3}
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

                {/* Matrix */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-2"></th>
                                {variables.map(v => (
                                    <th key={v} className="p-2 text-center font-bold">{v}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {variables.map((rowVar, i) => (
                                <tr key={rowVar}>
                                    <td className="p-2 font-bold text-center">{rowVar}</td>
                                    {variables.map((colVar, j) => (
                                        <motion.td
                                            key={colVar}
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            className={`p-3 text-center font-mono text-sm ${getCorrelationColor(matrix[i]?.[j] || 0)} ${i === j ? "font-bold" : ""}`}
                                        >
                                            {(matrix[i]?.[j] || 0).toFixed(2)}
                                        </motion.td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 justify-center text-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                        <span>Fuerte +</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-emerald-300 rounded"></div>
                        <span>Moderado +</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-slate-200 rounded"></div>
                        <span>Débil</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-red-300 rounded"></div>
                        <span>Moderado -</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Fuerte -</span>
                    </div>
                </div>

                {/* Interpretation */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Interpretación:</strong><br />
                    • r = 1: Correlación perfecta positiva<br />
                    • r = 0: Sin correlación lineal<br />
                    • r = -1: Correlación perfecta negativa<br />
                    • La diagonal siempre es 1 (variable consigo misma)
                </div>
            </div>
        </ChartContainer>
    )
}
