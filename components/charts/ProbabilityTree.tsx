"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface ProbabilityTreeProps {
    mode?: "simple" | "bayes"
}

interface TreeNode {
    label: string
    probability: number
    children?: TreeNode[]
    outcome?: string
    color?: string
}

export function ProbabilityTree({ mode = "simple" }: ProbabilityTreeProps) {
    const [pA, setPA] = useState(0.3)           // P(Event A) e.g., Disease
    const [pBGivenA, setPBGivenA] = useState(0.95)   // P(Positive | Disease)
    const [pBGivenNotA, setPBGivenNotA] = useState(0.08) // P(Positive | No Disease)

    const tree = useMemo<TreeNode>(() => {
        const pNotA = 1 - pA
        const pNotBGivenA = 1 - pBGivenA
        const pNotBGivenNotA = 1 - pBGivenNotA

        return {
            label: "Inicio",
            probability: 1,
            children: [
                {
                    label: "Enfermo",
                    probability: pA,
                    color: "#ef4444",
                    children: [
                        {
                            label: "+",
                            probability: pBGivenA,
                            outcome: `P(E∩+) = ${(pA * pBGivenA).toFixed(4)}`,
                            color: "#10b981"
                        },
                        {
                            label: "−",
                            probability: pNotBGivenA,
                            outcome: `P(E∩−) = ${(pA * pNotBGivenA).toFixed(4)}`,
                            color: "#6b7280"
                        }
                    ]
                },
                {
                    label: "Sano",
                    probability: pNotA,
                    color: "#3b82f6",
                    children: [
                        {
                            label: "+",
                            probability: pBGivenNotA,
                            outcome: `P(S∩+) = ${(pNotA * pBGivenNotA).toFixed(4)}`,
                            color: "#f59e0b"
                        },
                        {
                            label: "−",
                            probability: pNotBGivenNotA,
                            outcome: `P(S∩−) = ${(pNotA * pNotBGivenNotA).toFixed(4)}`,
                            color: "#10b981"
                        }
                    ]
                }
            ]
        }
    }, [pA, pBGivenA, pBGivenNotA])

    const calculations = useMemo(() => {
        const pNotA = 1 - pA

        // Joint probabilities
        const pPositiveAndSick = pA * pBGivenA
        const pPositiveAndHealthy = pNotA * pBGivenNotA

        // Total probability of positive
        const pPositive = pPositiveAndSick + pPositiveAndHealthy

        // Bayes: P(Sick | Positive)
        const pSickGivenPositive = pPositiveAndSick / pPositive

        // P(Healthy | Negative)
        const pNegativeAndHealthy = pNotA * (1 - pBGivenNotA)
        const pNegativeAndSick = pA * (1 - pBGivenA)
        const pNegative = pNegativeAndHealthy + pNegativeAndSick
        const pHealthyGivenNegative = pNegativeAndHealthy / pNegative

        return {
            pPositive,
            pSickGivenPositive,
            pHealthyGivenNegative,
            sensitivity: pBGivenA,
            specificity: 1 - pBGivenNotA
        }
    }, [pA, pBGivenA, pBGivenNotA])

    const renderTree = (node: TreeNode, depth: number = 0, marginTop: number = 0) => {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: depth * 0.1 }}
                className="relative"
                style={{ marginTop: `${marginTop}px` }}
            >
                {depth > 0 && (
                    <div
                        className="absolute left-0 top-1/2 w-8 border-t-2 border-dashed"
                        style={{ borderColor: node.color || "#94a3b8" }}
                    />
                )}
                <div className="flex items-center gap-2 ml-8">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-2 rounded-lg font-bold text-white shadow-lg"
                        style={{ backgroundColor: node.color || "#3b82f6" }}
                    >
                        {node.label}
                        <span className="text-xs block opacity-80">
                            {(node.probability * 100).toFixed(1)}%
                        </span>
                    </motion.div>
                    {node.outcome && (
                        <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {node.outcome}
                        </div>
                    )}
                </div>
                {node.children && (
                    <div className="ml-12 mt-2 space-y-2 border-l-2 border-dashed border-slate-300 pl-4">
                        {node.children.map((child, i) => (
                            <div key={i}>
                                {renderTree(child, depth + 1, i > 0 ? 8 : 0)}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        )
    }

    return (
        <ChartContainer
            title="Árbol de Probabilidad Interactivo"
            description="Visualiza probabilidades condicionales y el Teorema de Bayes"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label="P(Enfermo) - Prevalencia"
                        value={pA}
                        min={0.01}
                        max={0.5}
                        step={0.01}
                        onChange={setPA}
                    />
                    <SliderControl
                        label="P(+|Enfermo) - Sensibilidad"
                        value={pBGivenA}
                        min={0.5}
                        max={0.99}
                        step={0.01}
                        onChange={setPBGivenA}
                    />
                    <SliderControl
                        label="P(+|Sano) - Falso Positivo"
                        value={pBGivenNotA}
                        min={0.01}
                        max={0.3}
                        step={0.01}
                        onChange={setPBGivenNotA}
                    />
                </div>

                {/* Tree Visualization */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-x-auto">
                    {renderTree(tree)}
                </div>

                {/* Results - Bayes */}
                <motion.div
                    key={calculations.pSickGivenPositive.toFixed(4)}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
                        <div className="text-xs text-amber-600 uppercase tracking-wider">P(+ Total)</div>
                        <div className="text-2xl font-bold text-amber-700">{(calculations.pPositive * 100).toFixed(2)}%</div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
                        <div className="text-xs text-red-600 uppercase tracking-wider">P(Enfermo|+)</div>
                        <div className="text-2xl font-bold text-red-700">{(calculations.pSickGivenPositive * 100).toFixed(1)}%</div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                        <div className="text-xs text-emerald-600 uppercase tracking-wider">P(Sano|−)</div>
                        <div className="text-2xl font-bold text-emerald-700">{(calculations.pHealthyGivenNegative * 100).toFixed(1)}%</div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
                        <div className="text-xs text-blue-600 uppercase tracking-wider">Especificidad</div>
                        <div className="text-2xl font-bold text-blue-700">{(calculations.specificity * 100).toFixed(1)}%</div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 La Paradoja del Test:</strong><br />
                    Aunque el test tenga alta sensibilidad ({(pBGivenA * 100).toFixed(0)}%),
                    si la enfermedad es rara (prevalencia {(pA * 100).toFixed(1)}%),
                    un resultado positivo solo significa {(calculations.pSickGivenPositive * 100).toFixed(1)}% de probabilidad de estar enfermo.
                </div>
            </div>
        </ChartContainer>
    )
}
