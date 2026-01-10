"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, Cell, ReferenceLine
} from "recharts"

interface ANOVAVisualizerProps {
    initialGroups?: number
}

// Generate group data
function generateGroupData(numGroups: number, groupMeans: number[], withinVariance: number): { group: string; value: number }[] {
    const data: { group: string; value: number }[] = []
    const n = 10 // samples per group

    for (let g = 0; g < numGroups; g++) {
        const groupName = String.fromCharCode(65 + g) // A, B, C, ...
        for (let i = 0; i < n; i++) {
            const u1 = Math.random()
            const u2 = Math.random()
            const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
            data.push({
                group: groupName,
                value: groupMeans[g] + Math.sqrt(withinVariance) * z
            })
        }
    }

    return data
}

// Calculate ANOVA statistics
function calculateANOVA(data: { group: string; value: number }[]): {
    grandMean: number
    groupStats: { group: string; mean: number; n: number }[]
    ssBetween: number
    ssWithin: number
    ssTotal: number
    dfBetween: number
    dfWithin: number
    msBetween: number
    msWithin: number
    fStatistic: number
} {
    const groups = [...new Set(data.map(d => d.group))]
    const allValues = data.map(d => d.value)
    const grandMean = allValues.reduce((a, b) => a + b, 0) / allValues.length

    const groupStats = groups.map(g => {
        const values = data.filter(d => d.group === g).map(d => d.value)
        return {
            group: g,
            mean: values.reduce((a, b) => a + b, 0) / values.length,
            n: values.length
        }
    })

    // SS Between: variation between group means
    let ssBetween = 0
    groupStats.forEach(gs => {
        ssBetween += gs.n * Math.pow(gs.mean - grandMean, 2)
    })

    // SS Within: variation within groups
    let ssWithin = 0
    data.forEach(d => {
        const groupMean = groupStats.find(gs => gs.group === d.group)!.mean
        ssWithin += Math.pow(d.value - groupMean, 2)
    })

    // SS Total
    const ssTotal = ssBetween + ssWithin

    // Degrees of freedom
    const k = groups.length
    const N = data.length
    const dfBetween = k - 1
    const dfWithin = N - k

    // Mean squares
    const msBetween = ssBetween / dfBetween
    const msWithin = ssWithin / dfWithin

    // F statistic
    const fStatistic = msBetween / msWithin

    return {
        grandMean,
        groupStats,
        ssBetween,
        ssWithin,
        ssTotal,
        dfBetween,
        dfWithin,
        msBetween,
        msWithin,
        fStatistic
    }
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function ANOVAVisualizer({ initialGroups = 3 }: ANOVAVisualizerProps) {
    const [numGroups] = useState(initialGroups)
    const [meanA, setMeanA] = useState(50)
    const [meanB, setMeanB] = useState(55)
    const [meanC, setMeanC] = useState(60)
    const [withinVar, setWithinVar] = useState(25)
    const [data, setData] = useState<{ group: string; value: number }[]>([])
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        setData(generateGroupData(numGroups, [meanA, meanB, meanC], withinVar))
    }, [])

    const regenerate = () => {
        setData(generateGroupData(numGroups, [meanA, meanB, meanC], withinVar))
    }

    const anova = useMemo(() => {
        if (data.length === 0) return null
        return calculateANOVA(data)
    }, [data])

    // Prepare box plot data
    const boxData = useMemo(() => {
        if (!anova) return []
        return anova.groupStats.map((gs, i) => ({
            group: gs.group,
            mean: gs.mean,
            fill: COLORS[i % COLORS.length]
        }))
    }, [anova])

    if (!isClient || !anova) {
        return (
            <ChartContainer title="Visualizador ANOVA" description="Cargando...">
                <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400 animate-pulse">Cargando...</div>
                </div>
            </ChartContainer>
        )
    }

    const isSignificant = anova.fStatistic > 3.35 // Approx F critical for α=0.05, df=(2,27)

    return (
        <ChartContainer
            title="Visualizador ANOVA de Un Factor"
            description="Varianza Entre Grupos vs Dentro de Grupos"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SliderControl
                        label="Media Grupo A"
                        value={meanA}
                        min={40}
                        max={70}
                        onChange={setMeanA}
                    />
                    <SliderControl
                        label="Media Grupo B"
                        value={meanB}
                        min={40}
                        max={70}
                        onChange={setMeanB}
                    />
                    <SliderControl
                        label="Media Grupo C"
                        value={meanC}
                        min={40}
                        max={70}
                        onChange={setMeanC}
                    />
                    <SliderControl
                        label="Varianza Dentro"
                        value={withinVar}
                        min={5}
                        max={100}
                        onChange={setWithinVar}
                    />
                </div>

                <motion.button
                    onClick={regenerate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-brand-blue text-white rounded-lg font-medium"
                >
                    🔄 Regenerar Datos
                </motion.button>

                {/* Chart */}
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={boxData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="group" stroke="#94a3b8" />
                            <YAxis domain={[30, 80]} stroke="#94a3b8" />
                            <ReferenceLine
                                y={anova.grandMean}
                                stroke="#ef4444"
                                strokeDasharray="5 5"
                                label={{ value: `Gran Media: ${anova.grandMean.toFixed(1)}`, fill: "#ef4444", fontSize: 12 }}
                            />
                            <Bar dataKey="mean" radius={[8, 8, 0, 0]}>
                                {boxData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* ANOVA Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800">
                                <th className="p-2 text-left">Fuente</th>
                                <th className="p-2 text-center">SS</th>
                                <th className="p-2 text-center">df</th>
                                <th className="p-2 text-center">MS</th>
                                <th className="p-2 text-center">F</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 font-medium">Entre Grupos</td>
                                <td className="p-2 text-center font-mono">{anova.ssBetween.toFixed(1)}</td>
                                <td className="p-2 text-center font-mono">{anova.dfBetween}</td>
                                <td className="p-2 text-center font-mono">{anova.msBetween.toFixed(1)}</td>
                                <td className="p-2 text-center font-mono font-bold text-blue-600">{anova.fStatistic.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-900">
                                <td className="p-2 font-medium">Dentro Grupos</td>
                                <td className="p-2 text-center font-mono">{anova.ssWithin.toFixed(1)}</td>
                                <td className="p-2 text-center font-mono">{anova.dfWithin}</td>
                                <td className="p-2 text-center font-mono">{anova.msWithin.toFixed(1)}</td>
                                <td className="p-2 text-center">-</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-bold">Total</td>
                                <td className="p-2 text-center font-mono font-bold">{anova.ssTotal.toFixed(1)}</td>
                                <td className="p-2 text-center font-mono">{anova.dfBetween + anova.dfWithin}</td>
                                <td className="p-2 text-center">-</td>
                                <td className="p-2 text-center">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Result */}
                <motion.div
                    key={anova.fStatistic.toFixed(2)}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-xl text-center ${isSignificant
                            ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                            : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                        }`}
                >
                    <div className={`text-lg font-bold ${isSignificant ? "text-red-600" : "text-emerald-600"}`}>
                        F = {anova.fStatistic.toFixed(2)} {isSignificant ? "> F crítico ≈ 3.35" : "≤ F crítico ≈ 3.35"}
                    </div>
                    <div className={`text-sm ${isSignificant ? "text-red-500" : "text-emerald-500"}`}>
                        {isSignificant
                            ? "✗ Rechazar H₀: Al menos un grupo es diferente"
                            : "✓ No rechazar H₀: No hay diferencia significativa"}
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Experimenta:</strong><br />
                    • Separa las medias → ↑ SS Entre → ↑ F<br />
                    • Aumenta varianza dentro → ↑ SS Dentro → ↓ F<br />
                    • F = (Varianza Entre) / (Varianza Dentro)
                </div>
            </div>
        </ChartContainer>
    )
}
