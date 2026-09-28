"use client"

import { useState } from "react"
import {
    Terminal,
    Play,
    Sliders,
    Table2,
    CheckCircle2,
    Cpu,
    ArrowRight,
    Sparkles,
    Calculator,
    Activity
} from "lucide-react"
import katex from "katex"

function MathFormula({ formula, block = false }: { formula: string; block?: boolean }) {
    try {
        const html = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: block
        })
        return <span dangerouslySetInnerHTML={{ __html: html }} />
    } catch {
        return <span className="font-mono text-sm">{formula}</span>
    }
}

export function InteractiveLabDemo() {
    const [demoMode, setDemoMode] = useState<"inference" | "simplex">("inference")

    // Inferencia interactiva state
    const [confidence, setConfidence] = useState<number>(0.95)
    const [sampleSize, setSampleSize] = useState<number>(36)
    const [mean, setMean] = useState<number>(100)
    const [stdDev, setStdDev] = useState<number>(15)

    // Simplex state
    const [simplexStep, setSimplexStep] = useState<0 | 1 | 2>(0)

    // Calculos estadisticos
    const zScores: Record<number, number> = { 0.90: 1.645, 0.95: 1.960, 0.99: 2.576 }
    const z = zScores[confidence] || 1.96
    const standardError = stdDev / Math.sqrt(sampleSize)
    const marginOfError = z * standardError
    const lowerBound = mean - marginOfError
    const upperBound = mean + marginOfError

    return (
        <section id="laboratorio-interactivo" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 mb-3">
                        <Cpu className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        Laboratorio Científico en Vivo • Wasm
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Experimenta con Modelos Analíticos
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                        Visualiza los cálculos en tiempo real con rigor matemático KaTeX y contrasta los resultados con scripts de Python científicos ejecutados en el navegador.
                    </p>
                </div>

                {/* Lab Demonstrator Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    {/* Top Switcher Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/70 p-2 sm:px-6 sm:py-3 gap-2">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setDemoMode("inference")}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                    demoMode === "inference"
                                        ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-xs border border-slate-200 dark:border-slate-700"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                <Calculator className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                <span>Inferencia: Intervalo de Confianza (II5A3)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setDemoMode("simplex")}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                                    demoMode === "simplex"
                                        ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-xs border border-slate-200 dark:border-slate-700"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                <Table2 className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                                <span>Optimización: Método Simplex Primal (II7D3)</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono px-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Pyodide 0.26 WebAssembly</span>
                        </div>
                    </div>

                    {/* Content Area */}
                    {demoMode === "inference" ? (
                        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Controls Column */}
                            <div className="lg:col-span-5 space-y-5">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Sliders className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                        Parámetros de la Muestra
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Ajusta las variables muestrales para recalcular el intervalo de confianza de la media poblacional $\mu$.
                                    </p>
                                </div>

                                {/* Confidence Selector */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        Nivel de Confianza (1 - α):
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[0.90, 0.95, 0.99].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setConfidence(val)}
                                                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                                    confidence === val
                                                        ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                                                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                                }`}
                                            >
                                                {(val * 100).toFixed(0)}% (z* = {zScores[val]})
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sample Size Slider */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            Tamaño de Muestra (n):
                                        </span>
                                        <span className="font-mono font-bold text-blue-900 dark:text-blue-400">
                                            n = {sampleSize}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="200"
                                        step="1"
                                        value={sampleSize}
                                        onChange={(e) => setSampleSize(Number(e.target.value))}
                                        className="w-full accent-blue-900 cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                        <span>n = 10 (Muestra reducida)</span>
                                        <span>n = 200 (Gran muestra)</span>
                                    </div>
                                </div>

                                {/* Mean and StdDev inputs */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Media Muestral (x̄):
                                        </label>
                                        <input
                                            type="number"
                                            value={mean}
                                            onChange={(e) => setMean(Number(e.target.value) || 0)}
                                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Desv. Estándar (s):
                                        </label>
                                        <input
                                            type="number"
                                            value={stdDev}
                                            onChange={(e) => setStdDev(Math.max(1, Number(e.target.value) || 1))}
                                            className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Mathematical Formulation Block */}
                                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-slate-800 dark:text-slate-200">
                                    <div className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">
                                        Ecuación Analítica KaTeX
                                    </div>
                                    <div className="text-center py-2 text-sm sm:text-base">
                                        <MathFormula
                                            formula={`\\text{IC}_{${(confidence * 100).toFixed(0)}\\%}(\\mu) = \\bar{x} \\pm z_{\\alpha/2} \\cdot \\frac{s}{\\sqrt{n}}`}
                                            block
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Results & Python Output Column */}
                            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                                {/* Result metrics card */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                                        <div className="text-[11px] text-slate-500 font-semibold">Error Estándar (SE)</div>
                                        <div className="font-mono text-lg font-bold text-slate-900 dark:text-white mt-1">
                                            {standardError.toFixed(4)}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">SE = s / √n</div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                                        <div className="text-[11px] text-slate-500 font-semibold">Margen de Error (E)</div>
                                        <div className="font-mono text-lg font-bold text-slate-900 dark:text-white mt-1">
                                            ±{marginOfError.toFixed(3)}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">E = z* · SE</div>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
                                        <div className="text-[11px] text-blue-900 dark:text-blue-300 font-semibold">IC Estimado</div>
                                        <div className="font-mono text-sm sm:text-base font-bold text-blue-900 dark:text-blue-200 mt-1">
                                            [{lowerBound.toFixed(2)}, {upperBound.toFixed(2)}]
                                        </div>
                                        <div className="text-[10px] text-blue-700 dark:text-blue-400 mt-0.5">Confianza {(confidence * 100).toFixed(0)}%</div>
                                    </div>
                                </div>

                                {/* Engineering interpretation */}
                                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold">Interpretación de Ingeniería Industrial:</span> Con una certeza del {(confidence * 100).toFixed(0)}%, la verdadera media poblacional μ del proceso productivo se ubica en el intervalo [{lowerBound.toFixed(2)}, {upperBound.toFixed(2)}]. El ancho del intervalo es de {(marginOfError * 2).toFixed(2)} unidades.
                                    </div>
                                </div>

                                {/* Python Console Preview */}
                                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 overflow-hidden font-mono text-xs">
                                    <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="h-3.5 w-3.5 text-blue-400" />
                                            <span>estimacion_intervalo.py</span>
                                        </div>
                                        <span className="text-emerald-400 font-bold text-[10px]">SciPy Stats</span>
                                    </div>
                                    <div className="p-4 space-y-1 text-slate-300">
                                        <div><span className="text-purple-400">from</span> scipy <span className="text-purple-400">import</span> stats</div>
                                        <div>n, x_bar, s = <span className="text-amber-300">{sampleSize}</span>, <span className="text-amber-300">{mean}</span>, <span className="text-amber-300">{stdDev}</span></div>
                                        <div>se = s / (n ** <span className="text-amber-300">0.5</span>)</div>
                                        <div>ic = stats.norm.interval(<span className="text-amber-300">{confidence}</span>, loc=x_bar, scale=se)</div>
                                        <div className="text-slate-500 pt-1"># Salida calculada en el navegador:</div>
                                        <div className="text-emerald-400 font-bold">
                                            &gt;&gt;&gt; IC: [{lowerBound.toFixed(4)}, {upperBound.toFixed(4)}]
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Linear Programming Formulation */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-400">
                                        Problema Canónico de Programación Lineal (Maximización)
                                    </div>
                                    <div className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                        <MathFormula
                                            formula="\max Z = 3x_1 + 5x_2 \quad \text{s.a.} \quad x_1 \le 4, \quad 2x_2 \le 12, \quad 3x_1 + 2x_2 \le 18, \quad x_1, x_2 \ge 0"
                                            block
                                        />
                                    </div>
                                </div>

                                {/* Step Selector */}
                                <div className="flex items-center gap-1.5 self-end sm:self-center">
                                    {[0, 1, 2].map((step) => (
                                        <button
                                            key={step}
                                            type="button"
                                            onClick={() => setSimplexStep(step as 0 | 1 | 2)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                                simplexStep === step
                                                    ? "bg-indigo-900 text-white border-indigo-900 shadow-xs"
                                                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                            }`}
                                        >
                                            {step === 0 ? "Tabla Inicial" : step === 1 ? "Iteración 1" : "Tabla Óptima"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interactive Simplex Tableau */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs font-mono border-collapse border border-slate-200 dark:border-slate-700">
                                    <thead>
                                        <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">Base</th>
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">x₁ (3)</th>
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">x₂ (5)</th>
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">s₁ (0)</th>
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">s₂ (0)</th>
                                            <th className="p-3 border-r border-slate-200 dark:border-slate-700">s₃ (0)</th>
                                            <th className="p-3 font-bold text-blue-900 dark:text-blue-400">RHS (Sol)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                                        {simplexStep === 0 && (
                                            <>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₁</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">4</td>
                                                </tr>
                                                <tr className="bg-amber-50/50 dark:bg-amber-950/20">
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₂</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700 font-bold text-amber-700 dark:text-amber-400">2 [Pivote]</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">12</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₃</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">3</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">2</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 font-bold">18</td>
                                                </tr>
                                                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-blue-900 dark:text-blue-300">
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">Zj - Cj</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">-3</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400">-5 (Entra x₂)</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">Z = 0</td>
                                                </tr>
                                            </>
                                        )}

                                        {simplexStep === 1 && (
                                            <>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₁</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">4</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 text-blue-900 dark:text-blue-400">x₂</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1/2</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">6</td>
                                                </tr>
                                                <tr className="bg-amber-50/50 dark:bg-amber-950/20">
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₃</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700 font-bold text-amber-700 dark:text-amber-400">3 [Pivote]</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">-1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 font-bold">6</td>
                                                </tr>
                                                <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-blue-900 dark:text-blue-300">
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">Zj - Cj</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400">-3 (Entra x₁)</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">5/2</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold">Z = 30</td>
                                                </tr>
                                            </>
                                        )}

                                        {simplexStep === 2 && (
                                            <>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700">s₁</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1/3</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">-1/3</td>
                                                    <td className="p-3 font-bold">2</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 text-blue-900 dark:text-blue-400">x₂</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1/2</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 font-bold text-blue-900 dark:text-blue-400">x₂* = 6</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 text-blue-900 dark:text-blue-400">x₁</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">-1/3</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1/3</td>
                                                    <td className="p-3 font-bold text-blue-900 dark:text-blue-400">x₁* = 2</td>
                                                </tr>
                                                <tr className="bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-900 dark:text-emerald-300">
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">Zj - Cj</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">0</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">3/2</td>
                                                    <td className="p-3 border-r border-slate-200 dark:border-slate-700">1</td>
                                                    <td className="p-3 font-bold text-emerald-700 dark:text-emerald-300 text-sm">Z* = 36 (Óptimo)</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* SciPy Optimization Code Snippet */}
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 p-4 font-mono text-xs">
                                <div className="text-slate-400 mb-2"># Verificación con SciPy HiGHS Solver</div>
                                <div><span className="text-purple-400">from</span> scipy.optimize <span className="text-purple-400">import</span> linprog</div>
                                <div>c = [-<span className="text-amber-300">3</span>, -<span className="text-amber-300">5</span>]  <span className="text-slate-500"># Maximizar Z == Minimizar -Z</span></div>
                                <div>A = [[<span className="text-amber-300">1</span>, <span className="text-amber-300">0</span>], [<span className="text-amber-300">0</span>, <span className="text-amber-300">2</span>], [<span className="text-amber-300">3</span>, <span className="text-amber-300">2</span>]]</div>
                                <div>b = [<span className="text-amber-300">4</span>, <span className="text-amber-300">12</span>, <span className="text-amber-300">18</span>]</div>
                                <div>res = linprog(c, A_ub=A, b_ub=b, method=<span className="text-emerald-300">&apos;highs&apos;</span>)</div>
                                <div className="text-emerald-400 font-bold pt-1">
                                    &gt;&gt;&gt; x* = [2.0, 6.0] | Valor Óptimo Z* = 36.0
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
