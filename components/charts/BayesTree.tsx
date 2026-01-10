"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface BayesTreeProps {
    scenario?: "medical" | "spam"
}

export function BayesTree({ scenario = "medical" }: BayesTreeProps) {
    // Medical: P(Disease), P(Positive | Disease), P(Positive | No Disease)
    const [pDisease, setPDisease] = useState(0.01)      // Prior: prevalence
    const [sensitivity, setSensitivity] = useState(0.95) // P(+|D) = True Positive Rate
    const [falsePositive, setFalsePositive] = useState(0.05) // P(+|~D) = False Positive Rate

    const { pDiseaseGivenPositive, tree } = useMemo(() => {
        const pNoDisease = 1 - pDisease

        // Joint probabilities
        const pPositiveAndDisease = sensitivity * pDisease
        const pPositiveAndNoDisease = falsePositive * pNoDisease
        const pNegativeAndDisease = (1 - sensitivity) * pDisease
        const pNegativeAndNoDisease = (1 - falsePositive) * pNoDisease

        // Marginal P(Positive)
        const pPositive = pPositiveAndDisease + pPositiveAndNoDisease

        // Bayes: P(Disease | Positive)
        const posterior = pPositive > 0 ? pPositiveAndDisease / pPositive : 0

        return {
            pDiseaseGivenPositive: posterior,
            tree: {
                disease: {
                    prob: pDisease,
                    positive: { prob: sensitivity, joint: pPositiveAndDisease },
                    negative: { prob: 1 - sensitivity, joint: pNegativeAndDisease }
                },
                noDisease: {
                    prob: pNoDisease,
                    positive: { prob: falsePositive, joint: pPositiveAndNoDisease },
                    negative: { prob: 1 - falsePositive, joint: pNegativeAndNoDisease }
                },
                pPositive
            }
        }
    }, [pDisease, sensitivity, falsePositive])

    const labels = {
        prior: "Prevalencia P(E)",
        sensitivity: "Sensibilidad P(+|E)",
        falsePositive: "Falso Positivo P(+|~E)",
        disease: "Enfermo",
        noDisease: "Sano",
        positive: "Positivo",
        negative: "Negativo"
    }

    return (
        <ChartContainer
            title="Teorema de Bayes Interactivo"
            description="Calcula P(Enfermedad | Test Positivo) ajustando las probabilidades"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SliderControl
                        label={labels.prior}
                        value={pDisease}
                        min={0.001}
                        max={0.5}
                        step={0.001}
                        onChange={setPDisease}
                    />
                    <SliderControl
                        label={labels.sensitivity}
                        value={sensitivity}
                        min={0.5}
                        max={0.999}
                        step={0.01}
                        onChange={setSensitivity}
                    />
                    <SliderControl
                        label={labels.falsePositive}
                        value={falsePositive}
                        min={0.001}
                        max={0.5}
                        step={0.01}
                        onChange={setFalsePositive}
                    />
                </div>

                {/* Visual Tree */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                    <div className="flex flex-col items-center gap-4">
                        {/* Root */}
                        <div className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-bold">
                            Población
                        </div>

                        {/* First level: Disease / No disease */}
                        <div className="flex gap-16 w-full justify-center">
                            {/* Disease Branch */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-sm text-slate-500">P(E) = {(pDisease * 100).toFixed(2)}%</div>
                                <motion.div
                                    className="px-4 py-2 bg-amber-100 dark:bg-amber-900/50 border-2 border-amber-400 rounded-lg font-semibold"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 0.3 }}
                                    key={pDisease}
                                >
                                    🤒 {labels.disease}
                                </motion.div>

                                {/* Test results for Disease */}
                                <div className="flex gap-4 mt-2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-slate-400">{(sensitivity * 100).toFixed(1)}%</div>
                                        <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 border border-red-300 rounded text-sm">
                                            ➕ {labels.positive}
                                        </div>
                                        <div className="text-xs font-mono mt-1 text-red-600">
                                            {(tree.disease.positive.joint * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-slate-400">{((1 - sensitivity) * 100).toFixed(1)}%</div>
                                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 border border-green-300 rounded text-sm">
                                            ➖ {labels.negative}
                                        </div>
                                        <div className="text-xs font-mono mt-1 text-green-600">
                                            {(tree.disease.negative.joint * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* No Disease Branch */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-sm text-slate-500">P(~E) = {((1 - pDisease) * 100).toFixed(2)}%</div>
                                <motion.div
                                    className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 border-2 border-emerald-400 rounded-lg font-semibold"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 0.3 }}
                                    key={1 - pDisease}
                                >
                                    😊 {labels.noDisease}
                                </motion.div>

                                {/* Test results for No Disease */}
                                <div className="flex gap-4 mt-2">
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-slate-400">{(falsePositive * 100).toFixed(1)}%</div>
                                        <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 border border-red-300 rounded text-sm">
                                            ➕ {labels.positive}
                                        </div>
                                        <div className="text-xs font-mono mt-1 text-red-600">
                                            {(tree.noDisease.positive.joint * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-slate-400">{((1 - falsePositive) * 100).toFixed(1)}%</div>
                                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 border border-green-300 rounded text-sm">
                                            ➖ {labels.negative}
                                        </div>
                                        <div className="text-xs font-mono mt-1 text-green-600">
                                            {(tree.noDisease.negative.joint * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result */}
                <motion.div
                    key={pDiseaseGivenPositive.toFixed(4)}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl text-white text-center"
                >
                    <div className="text-sm uppercase tracking-wider opacity-80 mb-2">
                        P(Enfermedad | Test Positivo)
                    </div>
                    <div className="text-5xl font-black mb-2">
                        {(pDiseaseGivenPositive * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm opacity-80">
                        De los que dan positivo, solo el {(pDiseaseGivenPositive * 100).toFixed(1)}% realmente tiene la enfermedad
                    </div>
                </motion.div>

                {/* Bayes Formula */}
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-mono text-center">
                    P(E|+) = P(+|E)·P(E) / P(+) = {(sensitivity).toFixed(2)} × {pDisease.toFixed(4)} / {tree.pPositive.toFixed(4)} = <strong>{pDiseaseGivenPositive.toFixed(4)}</strong>
                </div>

                {/* Insight */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-200">
                    <strong>💡 Paradoja de la Base Rate:</strong> Cuando la prevalencia es baja, ¡la mayoría de los positivos son falsos positivos!
                    Esto explica por qué no hacemos screening masivo para enfermedades raras.
                </div>
            </div>
        </ChartContainer>
    )
}
