"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"

interface CountingPrinciplesProps {
    //
}

export function CountingPrinciples() {
    const [mode, setMode] = useState<"permutacion" | "combinacion">("permutacion")
    const [n, setN] = useState(5) // Total items
    const [k, setK] = useState(3) // Selected items

    // Generate items
    const items = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i)) // A, B, C, D...

    // Calculate count
    const factorial = (num: number): number => {
        if (num <= 1) return 1
        return num * factorial(num - 1)
    }

    const permutation = factorial(n) / factorial(n - k)
    const combination = factorial(n) / (factorial(k) * factorial(n - k))
    const result = mode === "permutacion" ? permutation : combination

    return (
        <ChartContainer
            title="Permutaciones vs Combinaciones"
            description="Visualiza la diferencia: ¿Importa el orden?"
        >
            <div className="space-y-6">
                {/* Mode Switch */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button
                        onClick={() => setMode("permutacion")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "permutacion"
                                ? "bg-white dark:bg-slate-700 shadow text-brand-blue"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Permutación (Orden Importa)
                    </button>
                    <button
                        onClick={() => setMode("combinacion")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === "combinacion"
                                ? "bg-white dark:bg-slate-700 shadow text-brand-blue"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        Combinación (Orden NO Importa)
                    </button>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <SliderControl
                        label="Total Elementos (n)"
                        value={n}
                        min={3}
                        max={8}
                        step={1}
                        onChange={(val) => {
                            setN(val)
                            if (k > val) setK(val)
                        }}
                    />
                    <SliderControl
                        label="Seleccionar (k)"
                        value={k}
                        min={1}
                        max={n}
                        step={1}
                        onChange={setK}
                    />
                </div>

                {/* Visualizer */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl min-h-[160px] flex flex-col items-center justify-center">

                    {/* Source Items */}
                    <div className="flex gap-2 mb-8">
                        {items.map(item => (
                            <motion.div
                                key={item}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 border-2 border-slate-300 dark:border-slate-600"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>

                    {/* Slots */}
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2">
                            {Array.from({ length: k }).map((_, i) => (
                                <div key={i} className="w-12 h-12 border-2 border-dashed border-brand-blue rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
                                    <span className="text-xs text-brand-blue/50">Slot {i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-2xl font-bold text-slate-400">→</div>
                        <motion.div
                            key={result}
                            initial={{ scale: 1.5, color: "#3b82f6" }}
                            animate={{ scale: 1, color: "#1e293b" }}
                            className="text-4xl font-bold font-mono dark:text-white"
                        >
                            {result}
                        </motion.div>
                        <div className="text-sm text-slate-500 ml-2">formas</div>
                    </div>

                </div>

                {/* Formula */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                    <div className="text-center font-mono text-lg text-amber-900 dark:text-amber-100 mb-2">
                        {mode === "permutacion"
                            ? `P(${n}, ${k}) = ${n}! / (${n}-${k})!`
                            : `C(${n}, ${k}) = ${n}! / (${k}!(${n}-${k})!)`}
                    </div>
                    <div className="text-center text-xs text-amber-700 dark:text-amber-300">
                        {mode === "permutacion"
                            ? "ABC es diferente de CBA (Ej: Claves, Puestos)"
                            : "ABC es igual a CBA (Ej: Grupos, Loterías)"}
                    </div>
                </div>
            </div>
        </ChartContainer>
    )
}
