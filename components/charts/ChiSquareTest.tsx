"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"

interface ChiSquareTestProps {
    initialData?: number[][]
}

// Chi-square CDF approximation
function chiSquareCDF(x: number, k: number): number {
    if (x <= 0) return 0

    // Using incomplete gamma function approximation
    // For simplicity, we'll use a rough approximation
    const a = k / 2
    const gammaa = Math.exp((a - 0.5) * Math.log(a) - a + 0.5 * Math.log(2 * Math.PI / a))

    // Simple approximation for chi-square CDF
    if (k === 1) return 2 * (0.5 - 0.5 * Math.exp(-x / 2)) // Rough for df=1
    if (k === 2) return 1 - Math.exp(-x / 2)

    // Normal approximation for larger df
    const z = Math.pow(x / k, 1 / 3) - (1 - 2 / (9 * k))
    const stdNormCDF = (z: number) => 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * z * (1 + 0.044715 * z * z)))
    return stdNormCDF(z / Math.sqrt(2 / (9 * k)))
}

export function ChiSquareTest({ initialData }: ChiSquareTestProps) {
    const [isClient, setIsClient] = useState(false)

    // 2x2 contingency table
    const [a, setA] = useState(50)  // Row1, Col1
    const [b, setB] = useState(30)  // Row1, Col2
    const [c, setC] = useState(20)  // Row2, Col1
    const [d, setD] = useState(40)  // Row2, Col2

    useEffect(() => {
        setIsClient(true)
    }, [])

    const {
        chiSquare,
        df,
        pValue,
        expected,
        contribution,
        rowTotals,
        colTotals,
        total,
        decision
    } = useMemo(() => {
        const observed = [[a, b], [c, d]]
        const rowTotals = [a + b, c + d]
        const colTotals = [a + c, b + d]
        const total = a + b + c + d

        // Expected values under independence
        const expected = rowTotals.map(rt => colTotals.map(ct => (rt * ct) / total))

        // Chi-square statistic
        let chi2 = 0
        const contribution: number[][] = []

        for (let i = 0; i < 2; i++) {
            contribution[i] = []
            for (let j = 0; j < 2; j++) {
                const o = observed[i][j]
                const e = expected[i][j]
                const cont = Math.pow(o - e, 2) / e
                contribution[i][j] = cont
                chi2 += cont
            }
        }

        const df = 1 // (rows-1) × (cols-1) = 1×1 = 1
        const pValue = 1 - chiSquareCDF(chi2, df)

        const alpha = 0.05
        const decision = pValue < alpha ? "Rechazar H₀" : "No Rechazar H₀"

        return {
            chiSquare: chi2,
            df,
            pValue,
            expected,
            contribution,
            rowTotals,
            colTotals,
            total,
            decision
        }
    }, [a, b, c, d])

    if (!isClient) {
        return (
            <ChartContainer title="Prueba Chi-Cuadrado de Independencia" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    return (
        <ChartContainer
            title="Prueba Chi-Cuadrado de Independencia"
            description="¿Están las dos variables categóricas relacionadas?"
        >
            <div className="space-y-6">
                {/* Input table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr>
                                <th className="p-2"></th>
                                <th className="p-2 bg-blue-100 dark:bg-blue-900/30 font-bold">Columna 1</th>
                                <th className="p-2 bg-blue-100 dark:bg-blue-900/30 font-bold">Columna 2</th>
                                <th className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 bg-emerald-100 dark:bg-emerald-900/30 font-bold">Fila 1</td>
                                <td className="p-1">
                                    <input
                                        type="number"
                                        value={a}
                                        onChange={(e) => setA(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 p-2 text-center border rounded font-mono bg-white dark:bg-slate-800"
                                    />
                                </td>
                                <td className="p-1">
                                    <input
                                        type="number"
                                        value={b}
                                        onChange={(e) => setB(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 p-2 text-center border rounded font-mono bg-white dark:bg-slate-800"
                                    />
                                </td>
                                <td className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">{rowTotals[0]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 bg-emerald-100 dark:bg-emerald-900/30 font-bold">Fila 2</td>
                                <td className="p-1">
                                    <input
                                        type="number"
                                        value={c}
                                        onChange={(e) => setC(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 p-2 text-center border rounded font-mono bg-white dark:bg-slate-800"
                                    />
                                </td>
                                <td className="p-1">
                                    <input
                                        type="number"
                                        value={d}
                                        onChange={(e) => setD(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 p-2 text-center border rounded font-mono bg-white dark:bg-slate-800"
                                    />
                                </td>
                                <td className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">{rowTotals[1]}</td>
                            </tr>
                            <tr>
                                <td className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">Total</td>
                                <td className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">{colTotals[0]}</td>
                                <td className="p-2 bg-slate-100 dark:bg-slate-800 font-bold">{colTotals[1]}</td>
                                <td className="p-2 bg-slate-200 dark:bg-slate-700 font-black">{total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Expected values */}
                <div className="text-sm">
                    <div className="font-bold mb-2">Valores Esperados (bajo independencia):</div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                            E₁₁ = {expected[0][0].toFixed(1)}
                        </div>
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                            E₁₂ = {expected[0][1].toFixed(1)}
                        </div>
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                            E₂₁ = {expected[1][0].toFixed(1)}
                        </div>
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                            E₂₂ = {expected[1][1].toFixed(1)}
                        </div>
                    </div>
                </div>

                {/* Result */}
                <motion.div
                    key={chiSquare.toFixed(3)}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-6 rounded-2xl text-white text-center ${pValue < 0.05
                            ? "bg-gradient-to-r from-red-500 to-orange-500"
                            : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        }`}
                >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">χ²</div>
                            <div className="text-3xl font-black">{chiSquare.toFixed(3)}</div>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">df</div>
                            <div className="text-3xl font-black">{df}</div>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider opacity-80">p-valor</div>
                            <div className="text-3xl font-black">{pValue < 0.001 ? "<0.001" : pValue.toFixed(4)}</div>
                        </div>
                    </div>
                    <div className="text-xl font-bold">
                        {decision} (α = 0.05)
                    </div>
                    <div className="text-sm opacity-80 mt-2">
                        {pValue < 0.05
                            ? "Las variables están ASOCIADAS (dependientes)"
                            : "No hay evidencia de asociación (independientes)"}
                    </div>
                </motion.div>

                {/* Formula */}
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm text-center">
                    χ² = Σ (O - E)² / E = {contribution[0][0].toFixed(2)} + {contribution[0][1].toFixed(2)} + {contribution[1][0].toFixed(2)} + {contribution[1][1].toFixed(2)} = <strong>{chiSquare.toFixed(3)}</strong>
                </div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Nota:</strong><br />
                    • H₀: Las variables son independientes<br />
                    • H₁: Las variables están asociadas<br />
                    • Valor crítico χ²(1, 0.05) = 3.841
                </div>
            </div>
        </ChartContainer>
    )
}
