"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { ChevronRight, ChevronLeft, Check, AlertCircle } from "lucide-react"

interface HypothesisWizardProps {
    topic?: "mean" | "proportion"
}

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
    claimType: "equal" | "greater" | "less" | "different"
    testType: "one-tailed-left" | "one-tailed-right" | "two-tailed"
    alpha: 0.01 | 0.05 | 0.10
    dataType: "mean" | "proportion"
    sampleSize: number
    sampleStat: number
    nullValue: number
    std: number
}

export function HypothesisWizard({ topic = "mean" }: HypothesisWizardProps) {
    const [step, setStep] = useState<Step>(1)
    const [formData, setFormData] = useState<FormData>({
        claimType: "different",
        testType: "two-tailed",
        alpha: 0.05,
        dataType: topic,
        sampleSize: 30,
        sampleStat: 52,
        nullValue: 50,
        std: 10
    })

    const updateForm = (key: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }))

        // Auto-update test type based on claim
        if (key === "claimType") {
            if (value === "greater") setFormData(prev => ({ ...prev, claimType: value, testType: "one-tailed-right" }))
            else if (value === "less") setFormData(prev => ({ ...prev, claimType: value, testType: "one-tailed-left" }))
            else setFormData(prev => ({ ...prev, claimType: value, testType: "two-tailed" }))
        }
    }

    // Calculate Z statistic and p-value
    const calculateResults = () => {
        const { sampleSize, sampleStat, nullValue, std, testType, dataType } = formData

        let se: number
        if (dataType === "mean") {
            se = std / Math.sqrt(sampleSize)
        } else {
            se = Math.sqrt((nullValue * (1 - nullValue)) / sampleSize)
        }

        const z = (sampleStat - nullValue) / se

        // P-value calculation (using approximation)
        const normalCDF = (x: number) => {
            const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
            const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
            const sign = x < 0 ? -1 : 1
            x = Math.abs(x) / Math.sqrt(2)
            const t = 1.0 / (1.0 + p * x)
            const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
            return 0.5 * (1.0 + sign * y)
        }

        let pValue: number
        if (testType === "two-tailed") {
            pValue = 2 * (1 - normalCDF(Math.abs(z)))
        } else if (testType === "one-tailed-right") {
            pValue = 1 - normalCDF(z)
        } else {
            pValue = normalCDF(z)
        }

        return { z, se, pValue }
    }

    const { z, se, pValue } = calculateResults()
    const reject = pValue < formData.alpha

    const nextStep = () => setStep(s => Math.min(5, s + 1) as Step)
    const prevStep = () => setStep(s => Math.max(1, s - 1) as Step)

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Paso 1: ¿Qué quieres probar?</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { key: "different", label: "Es diferente de", symbol: "≠" },
                                { key: "greater", label: "Es mayor que", symbol: ">" },
                                { key: "less", label: "Es menor que", symbol: "<" },
                                { key: "equal", label: "Es igual a", symbol: "=" }
                            ].map(opt => (
                                <motion.button
                                    key={opt.key}
                                    onClick={() => updateForm("claimType", opt.key)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-4 rounded-xl border-2 text-left ${formData.claimType === opt.key
                                            ? "border-brand-blue bg-blue-50 dark:bg-blue-900/20"
                                            : "border-slate-200 dark:border-slate-700"
                                        }`}
                                >
                                    <span className="text-2xl font-mono">{opt.symbol}</span>
                                    <br />
                                    <span className="text-sm">{opt.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Paso 2: Define las Hipótesis</h3>
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono">
                            <div className="mb-2">
                                <strong>H₀:</strong> μ = {formData.nullValue}
                            </div>
                            <div>
                                <strong>H₁:</strong> μ {
                                    formData.claimType === "greater" ? ">" :
                                        formData.claimType === "less" ? "<" : "≠"
                                } {formData.nullValue}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Valor Hipotético (μ₀)</label>
                                <input
                                    type="number"
                                    value={formData.nullValue}
                                    onChange={e => updateForm("nullValue", parseFloat(e.target.value))}
                                    className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Nivel α</label>
                                <div className="flex gap-2 mt-1">
                                    {[0.10, 0.05, 0.01].map(a => (
                                        <button
                                            key={a}
                                            onClick={() => updateForm("alpha", a)}
                                            className={`flex-1 p-2 rounded-lg text-sm ${formData.alpha === a
                                                    ? "bg-brand-blue text-white"
                                                    : "bg-slate-200 dark:bg-slate-700"
                                                }`}
                                        >
                                            {(a * 100).toFixed(0)}%
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Paso 3: Ingresa tus Datos</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Tamaño muestra (n)</label>
                                <input
                                    type="number"
                                    value={formData.sampleSize}
                                    onChange={e => updateForm("sampleSize", parseInt(e.target.value))}
                                    className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Media muestral (x̄)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.sampleStat}
                                    onChange={e => updateForm("sampleStat", parseFloat(e.target.value))}
                                    className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Desv. Estándar (σ o s)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.std}
                                    onChange={e => updateForm("std", parseFloat(e.target.value))}
                                    className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-800"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Paso 4: Cálculo del Estadístico</h3>
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <div className="text-center mb-4">
                                <span className="text-sm text-slate-500">Error Estándar</span>
                                <div className="text-xl font-mono">
                                    SE = σ/√n = {formData.std}/√{formData.sampleSize} = {se.toFixed(4)}
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-sm text-slate-500">Estadístico Z</span>
                                <div className="text-3xl font-bold font-mono text-brand-blue">
                                    Z = (x̄ - μ₀)/SE = ({formData.sampleStat} - {formData.nullValue})/{se.toFixed(2)} = {z.toFixed(4)}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Paso 5: Decisión</h3>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`p-6 rounded-2xl text-center ${reject
                                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                    : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                                }`}
                        >
                            <div className="flex justify-center mb-4">
                                {reject ? <AlertCircle size={48} /> : <Check size={48} />}
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <div className="text-sm opacity-80">Z calculado</div>
                                    <div className="text-xl font-bold">{z.toFixed(3)}</div>
                                </div>
                                <div>
                                    <div className="text-sm opacity-80">P-valor</div>
                                    <div className="text-xl font-bold">{pValue.toFixed(4)}</div>
                                </div>
                                <div>
                                    <div className="text-sm opacity-80">α</div>
                                    <div className="text-xl font-bold">{formData.alpha}</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold">
                                {reject ? "RECHAZAR H₀" : "NO RECHAZAR H₀"}
                            </div>
                            <div className="text-sm opacity-80 mt-2">
                                {reject
                                    ? `p-valor (${pValue.toFixed(4)}) < α (${formData.alpha}) → Evidencia significativa`
                                    : `p-valor (${pValue.toFixed(4)}) ≥ α (${formData.alpha}) → Sin evidencia suficiente`}
                            </div>
                        </motion.div>
                    </div>
                )
        }
    }

    return (
        <ChartContainer
            title="Asistente de Prueba de Hipótesis"
            description="Sigue los pasos para realizar tu prueba"
        >
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex justify-between items-center">
                    {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} className="flex items-center">
                            <motion.div
                                animate={{
                                    scale: step === s ? 1.2 : 1,
                                    backgroundColor: step >= s ? "#3b82f6" : "#e2e8f0"
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "text-white" : "text-slate-400"
                                    }`}
                            >
                                {s}
                            </motion.div>
                            {s < 5 && (
                                <div className={`w-12 h-1 ${step > s ? "bg-brand-blue" : "bg-slate-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between">
                    <motion.button
                        onClick={prevStep}
                        disabled={step === 1}
                        whileHover={{ scale: step === 1 ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${step === 1 ? "opacity-50 cursor-not-allowed" : "bg-slate-200 dark:bg-slate-700"
                            }`}
                    >
                        <ChevronLeft size={16} /> Anterior
                    </motion.button>
                    <motion.button
                        onClick={step === 5 ? () => setStep(1) : nextStep}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-brand-blue text-white rounded-lg flex items-center gap-2"
                    >
                        {step === 5 ? "Reiniciar" : "Siguiente"} <ChevronRight size={16} />
                    </motion.button>
                </div>
            </div>
        </ChartContainer>
    )
}
