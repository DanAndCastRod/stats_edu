"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface SampleSizeCalculatorProps {
    mode?: "mean" | "proportion"
}

// Z values for common confidence levels
const Z_VALUES: Record<number, number> = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576
}

export function SampleSizeCalculator({ mode = "proportion" }: SampleSizeCalculatorProps) {
    const [confidence, setConfidence] = useState(0.95)
    const [marginOfError, setMarginOfError] = useState(0.05)
    const [pHat, setPHat] = useState(0.5)  // For proportions
    const [sigma, setSigma] = useState(10) // For means
    const [calculationMode, setCalculationMode] = useState<"mean" | "proportion">(mode)

    const { sampleSize, formula, breakdown } = useMemo(() => {
        const z = Z_VALUES[confidence] || 1.96

        if (calculationMode === "proportion") {
            // n = (z² × p × (1-p)) / E²
            const pq = pHat * (1 - pHat)
            const n = Math.ceil((z * z * pq) / (marginOfError * marginOfError))

            return {
                sampleSize: n,
                formula: `n = (z² × p × q) / E²`,
                breakdown: {
                    z: z.toFixed(3),
                    zSquared: (z * z).toFixed(3),
                    pq: pq.toFixed(4),
                    eSquared: (marginOfError * marginOfError).toFixed(6)
                }
            }
        } else {
            // n = (z × σ / E)²
            const n = Math.ceil(Math.pow(z * sigma / marginOfError, 2))

            return {
                sampleSize: n,
                formula: `n = (z × σ / E)²`,
                breakdown: {
                    z: z.toFixed(3),
                    sigma: sigma.toString(),
                    e: marginOfError.toFixed(2)
                }
            }
        }
    }, [confidence, marginOfError, pHat, sigma, calculationMode])

    const confidencePercent = Math.round(confidence * 100)

    return (
        <ChartContainer
            title="Calculadora de Tamaño de Muestra"
            description="¿Cuántas observaciones necesitas para tu estudio?"
        >
            <div className="space-y-6">
                {/* Mode selector */}
                <div className="flex gap-2 justify-center">
                    <motion.button
                        onClick={() => setCalculationMode("proportion")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${calculationMode === "proportion"
                                ? "bg-brand-blue text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        Para Proporciones
                    </motion.button>
                    <motion.button
                        onClick={() => setCalculationMode("mean")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${calculationMode === "mean"
                                ? "bg-brand-blue text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        Para Medias
                    </motion.button>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Nivel de Confianza
                        </label>
                        <div className="flex gap-2">
                            {[0.90, 0.95, 0.99].map(conf => (
                                <motion.button
                                    key={conf}
                                    onClick={() => setConfidence(conf)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 px-2 py-1 rounded text-sm font-bold transition-all ${confidence === conf
                                            ? "bg-brand-blue text-white"
                                            : "bg-slate-200 dark:bg-slate-700"
                                        }`}
                                >
                                    {Math.round(conf * 100)}%
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <SliderControl
                        label={calculationMode === "proportion" ? "Margen de Error (E)" : "Margen de Error (E)"}
                        value={marginOfError}
                        min={calculationMode === "proportion" ? 0.01 : 0.5}
                        max={calculationMode === "proportion" ? 0.15 : 5}
                        step={calculationMode === "proportion" ? 0.01 : 0.5}
                        onChange={setMarginOfError}
                    />

                    {calculationMode === "proportion" ? (
                        <SliderControl
                            label="p estimado (usar 0.5 si desconocido)"
                            value={pHat}
                            min={0.1}
                            max={0.9}
                            step={0.05}
                            onChange={setPHat}
                        />
                    ) : (
                        <SliderControl
                            label="σ estimado (desv. estándar)"
                            value={sigma}
                            min={1}
                            max={50}
                            onChange={setSigma}
                        />
                    )}
                </div>

                {/* Result */}
                <motion.div
                    key={`${sampleSize}-${calculationMode}`}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white text-center"
                >
                    <div className="text-sm uppercase tracking-wider opacity-80 mb-2">
                        Tamaño de Muestra Requerido
                    </div>
                    <div className="text-6xl font-black mb-2">
                        n = {sampleSize.toLocaleString()}
                    </div>
                    <div className="text-sm opacity-80">
                        Para {confidencePercent}% de confianza con margen ±{(marginOfError * (calculationMode === "proportion" ? 100 : 1)).toFixed(calculationMode === "proportion" ? 0 : 1)}{calculationMode === "proportion" ? "%" : ""}
                    </div>
                </motion.div>

                {/* Formula breakdown */}
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm text-center">
                    <div className="text-slate-500 mb-2">{formula}</div>
                    {calculationMode === "proportion" ? (
                        <div>
                            n = ({breakdown.zSquared} × {breakdown.pq}) / {breakdown.eSquared} = <strong>{sampleSize}</strong>
                        </div>
                    ) : (
                        <div>
                            n = ({breakdown.z} × {breakdown.sigma} / {breakdown.e})² = <strong>{sampleSize}</strong>
                        </div>
                    )}
                </div>

                {/* Cost analysis */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                        <div className="text-xs text-emerald-500 uppercase tracking-wider">Si E = {(marginOfError * 2 * (calculationMode === "proportion" ? 100 : 1)).toFixed(0)}{calculationMode === "proportion" ? "%" : ""}</div>
                        <div className="text-lg font-mono text-emerald-600">
                            n = {Math.ceil(sampleSize / 4).toLocaleString()}
                        </div>
                        <div className="text-xs text-emerald-400">4× menos muestras</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                        <div className="text-xs text-blue-500 uppercase tracking-wider">Actual</div>
                        <div className="text-lg font-mono font-bold text-blue-600">
                            n = {sampleSize.toLocaleString()}
                        </div>
                        <div className="text-xs text-blue-400">E = {(marginOfError * (calculationMode === "proportion" ? 100 : 1)).toFixed(calculationMode === "proportion" ? 0 : 1)}{calculationMode === "proportion" ? "%" : ""}</div>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                        <div className="text-xs text-amber-500 uppercase tracking-wider">Si E = {(marginOfError / 2 * (calculationMode === "proportion" ? 100 : 1)).toFixed(1)}{calculationMode === "proportion" ? "%" : ""}</div>
                        <div className="text-lg font-mono text-amber-600">
                            n = {Math.ceil(sampleSize * 4).toLocaleString()}
                        </div>
                        <div className="text-xs text-amber-400">4× más muestras</div>
                    </div>
                </div>

                {/* Insight */}
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl text-sm text-violet-800 dark:text-violet-200">
                    <strong>💡 Trade-offs clave:</strong><br />
                    • Reducir E a la mitad → 4× más muestras (¡costoso!)<br />
                    • Aumentar confianza 95%→99% → ~1.7× más muestras<br />
                    • Para proporciones: p=0.5 maximiza n (caso más conservador)
                </div>
            </div>
        </ChartContainer>
    )
}
