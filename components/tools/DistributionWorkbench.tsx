"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    Sliders,
    Layers,
    Info,
    RotateCcw,
    Bookmark,
    CheckCircle2,
    Calculator,
    TrendingUp,
    HelpCircle
} from "lucide-react"
import {
    DISTRIBUTIONS_REGISTRY,
    DistributionType,
    DistributionParams,
    computePDF,
    computeCDF,
    computeQuantile
} from "@/lib/tools-math"
import { MathFormula } from "./MathFormula"

export function DistributionWorkbench() {
    const [distType, setDistType] = useState<DistributionType>("normal")
    const meta = DISTRIBUTIONS_REGISTRY[distType]

    // Parameter states
    const [mu, setMu] = useState<number>(0)
    const [sigma, setSigma] = useState<number>(1)
    const [df, setDf] = useState<number>(10)
    const [df1, setDf1] = useState<number>(5)
    const [df2, setDf2] = useState<number>(10)
    const [lambda, setLambda] = useState<number>(2.0)
    const [nBin, setNBin] = useState<number>(12)
    const [pBin, setPBin] = useState<number>(0.35)

    // Calculation states
    const [evalX, setEvalX] = useState<number>(1.0)
    const [intervalA, setIntervalA] = useState<number>(-1.0)
    const [intervalB, setIntervalB] = useState<number>(1.5)
    const [alpha, setAlpha] = useState<number>(0.05)
    const [calcMode, setCalcMode] = useState<"interval" | "cumulative" | "point">("interval")

    const params: DistributionParams = useMemo(() => {
        return {
            mu,
            sigma,
            df,
            df1,
            df2,
            lambda,
            n: nBin,
            p: pBin
        }
    }, [mu, sigma, df, df1, df2, lambda, nBin, pBin])

    // Calculations
    const pdfAtX = useMemo(() => computePDF(distType, evalX, params), [distType, evalX, params])
    const cdfAtX = useMemo(() => computeCDF(distType, evalX, params), [distType, evalX, params])

    const intervalProb = useMemo(() => {
        const a = Math.min(intervalA, intervalB)
        const b = Math.max(intervalA, intervalB)
        if (meta.isDiscrete) {
            const low = Math.ceil(a)
            const high = Math.floor(b)
            if (low > high) return 0
            let sum = 0
            for (let k = low; k <= high; k++) {
                sum += computePDF(distType, k, params)
            }
            return Math.min(1, Math.max(0, sum))
        } else {
            const cdfB = computeCDF(distType, b, params)
            const cdfA = computeCDF(distType, a, params)
            return Math.min(1, Math.max(0, cdfB - cdfA))
        }
    }, [distType, intervalA, intervalB, params, meta.isDiscrete])

    const criticalValue = useMemo(() => {
        return computeQuantile(distType, 1 - alpha, params)
    }, [distType, alpha, params])

    // Generate Chart Data Points
    const chartPoints = useMemo(() => {
        let minX = meta.xRange[0]
        let maxX = meta.xRange[1]

        if (distType === "normal") {
            minX = mu - 3.8 * sigma
            maxX = mu + 3.8 * sigma
        } else if (distType === "studentt") {
            minX = -4.5
            maxX = 4.5
        } else if (distType === "chisquare") {
            minX = 0
            maxX = Math.max(12, df * 2.8)
        } else if (distType === "centralF") {
            minX = 0
            maxX = 5.5
        } else if (distType === "exponential") {
            minX = 0
            maxX = Math.max(4, 5 / (lambda || 1))
        } else if (distType === "binomial") {
            minX = 0
            maxX = nBin
        } else if (distType === "poisson") {
            minX = 0
            maxX = Math.max(12, Math.round(lambda + 3.8 * Math.sqrt(lambda)))
        }

        const pts: { x: number; y: number; inInterval: boolean }[] = []
        const a = Math.min(intervalA, intervalB)
        const b = Math.max(intervalA, intervalB)

        if (meta.isDiscrete) {
            for (let x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
                const y = computePDF(distType, x, params)
                const inInterval =
                    calcMode === "interval"
                        ? x >= a && x <= b
                        : calcMode === "cumulative"
                        ? x <= evalX
                        : x === Math.round(evalX)
                pts.push({ x, y, inInterval })
            }
        } else {
            const steps = 180
            const dx = (maxX - minX) / steps
            for (let i = 0; i <= steps; i++) {
                const x = minX + i * dx
                const y = computePDF(distType, x, params)
                const inInterval =
                    calcMode === "interval"
                        ? x >= a && x <= b
                        : calcMode === "cumulative"
                        ? x <= evalX
                        : Math.abs(x - evalX) <= dx * 0.75
                pts.push({ x, y, inInterval })
            }
        }
        return { pts, minX, maxX }
    }, [distType, meta, params, mu, sigma, df, lambda, nBin, intervalA, intervalB, evalX, calcMode])

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "control_calidad") {
            setDistType("normal")
            setMu(100)
            setSigma(5)
            setCalcMode("interval")
            setIntervalA(85)
            setIntervalB(115)
        } else if (preset === "student_test") {
            setDistType("studentt")
            setDf(15)
            setCalcMode("interval")
            setIntervalA(-2.131)
            setIntervalB(2.131)
            setAlpha(0.05)
        } else if (preset === "poisson_colas") {
            setDistType("poisson")
            setLambda(6.0)
            setCalcMode("cumulative")
            setEvalX(8)
        } else if (preset === "confiabilidad_exp") {
            setDistType("exponential")
            setLambda(0.5)
            setCalcMode("interval")
            setIntervalA(0)
            setIntervalB(3.0)
        } else if (preset === "binomial_control") {
            setDistType("binomial")
            setNBin(20)
            setPBin(0.1)
            setCalcMode("cumulative")
            setEvalX(2)
        }
    }

    // Chart SVG Geometry
    const svgWidth = 640
    const svgHeight = 280
    const padX = 45
    const padY = 30
    const plotW = svgWidth - 2 * padX
    const plotH = svgHeight - 2 * padY

    const maxY = useMemo(() => {
        let max = 0
        chartPoints.pts.forEach((p) => {
            if (p.y > max && Number.isFinite(p.y)) max = p.y
        })
        return max > 0 ? max * 1.15 : 1
    }, [chartPoints])

    const scaleX = (x: number) => {
        const range = chartPoints.maxX - chartPoints.minX
        if (range <= 0) return padX
        return padX + ((x - chartPoints.minX) / range) * plotW
    }

    const scaleY = (y: number) => {
        return svgHeight - padY - (y / maxY) * plotH
    }

    // Continuous SVG Path
    const { linePath, areaPath } = useMemo(() => {
        if (meta.isDiscrete || chartPoints.pts.length === 0) {
            return { linePath: "", areaPath: "" }
        }

        let lPath = `M ${scaleX(chartPoints.pts[0].x)} ${scaleY(chartPoints.pts[0].y)}`
        for (let i = 1; i < chartPoints.pts.length; i++) {
            lPath += ` L ${scaleX(chartPoints.pts[i].x)} ${scaleY(chartPoints.pts[i].y)}`
        }

        // Shaded area
        const activePts = chartPoints.pts.filter((p) => p.inInterval)
        let aPath = ""
        if (activePts.length > 1) {
            const first = activePts[0]
            const last = activePts[activePts.length - 1]
            aPath = `M ${scaleX(first.x)} ${scaleY(0)} L ${scaleX(first.x)} ${scaleY(first.y)}`
            for (let i = 1; i < activePts.length; i++) {
                aPath += ` L ${scaleX(activePts[i].x)} ${scaleY(activePts[i].y)}`
            }
            aPath += ` L ${scaleX(last.x)} ${scaleY(0)} Z`
        }

        return { linePath: lPath, areaPath: aPath }
    }, [chartPoints, meta.isDiscrete, maxY])

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-2">
                            <Activity className="h-3.5 w-3.5" />
                            Pregrado II4D3 / II5A3 & Posgrado MIOE
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Workbench de Distribuciones Estadísticas Paramétricas
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Análisis reactivo de funciones de densidad, funciones de distribución acumulada, probabilidades en intervalo y valores críticos.
                        </p>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("control_calidad")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                            Control 3σ
                        </button>
                        <button
                            onClick={() => applyPreset("student_test")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                            t-Student 95%
                        </button>
                        <button
                            onClick={() => applyPreset("poisson_colas")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        >
                            Llegadas Poisson
                        </button>
                    </div>
                </div>

                {/* Distribution Selector Tabs */}
                <div className="flex flex-wrap gap-2 mt-5">
                    {Object.values(DISTRIBUTIONS_REGISTRY).map((d) => (
                        <button
                            key={d.id}
                            onClick={() => {
                                setDistType(d.id)
                                if (d.id === "normal") {
                                    setIntervalA(-1.96)
                                    setIntervalB(1.96)
                                    setEvalX(0)
                                } else if (d.id === "studentt") {
                                    setIntervalA(-2.228)
                                    setIntervalB(2.228)
                                    setEvalX(0)
                                } else if (d.id === "chisquare") {
                                    setIntervalA(0)
                                    setIntervalB(9.488)
                                    setEvalX(4)
                                } else if (d.id === "centralF") {
                                    setIntervalA(0)
                                    setIntervalB(3.33)
                                    setEvalX(1)
                                } else if (d.id === "exponential") {
                                    setIntervalA(0)
                                    setIntervalB(2)
                                    setEvalX(1)
                                } else if (d.id === "binomial") {
                                    setIntervalA(2)
                                    setIntervalB(6)
                                    setEvalX(4)
                                } else if (d.id === "poisson") {
                                    setIntervalA(2)
                                    setIntervalB(7)
                                    setEvalX(4)
                                }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                                distType === d.id
                                    ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            {d.name.split(" ")[1] || d.name}
                            <span className="ml-1.5 text-[10px] opacity-75 font-normal">
                                ({d.category})
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Parameter Sliders & Mode Controls (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Parameters Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                <Sliders className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                Parámetros del Modelo
                            </h3>
                            <span className="text-[11px] font-mono text-slate-400">
                                {meta.category}
                            </span>
                        </div>

                        {/* Parameter Controls */}
                        <div className="space-y-4">
                            {distType === "normal" && (
                                <>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Media (μ): {mu}</span>
                                            <span className="text-slate-400">-10 a +10</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="-10"
                                            max="10"
                                            step="0.5"
                                            value={mu}
                                            onChange={(e) => setMu(parseFloat(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Desviación Estándar (σ): {sigma}</span>
                                            <span className="text-slate-400">0.2 a 8</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.2"
                                            max="8"
                                            step="0.1"
                                            value={sigma}
                                            onChange={(e) => setSigma(parseFloat(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                </>
                            )}

                            {(distType === "studentt" || distType === "chisquare") && (
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span>Grados de Libertad (ν o k): {df}</span>
                                        <span className="text-slate-400">1 a 60</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="60"
                                        step="1"
                                        value={df}
                                        onChange={(e) => setDf(parseInt(e.target.value))}
                                        className="w-full accent-blue-700 cursor-pointer"
                                    />
                                </div>
                            )}

                            {distType === "centralF" && (
                                <>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Grados de libertad numerador (d₁): {df1}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={df1}
                                            onChange={(e) => setDf1(parseInt(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Grados de libertad denominador (d₂): {df2}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="2"
                                            max="40"
                                            step="1"
                                            value={df2}
                                            onChange={(e) => setDf2(parseInt(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                </>
                            )}

                            {(distType === "exponential" || distType === "poisson") && (
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span>Tasa / Intensidad (λ): {lambda}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.2"
                                        max="15"
                                        step="0.2"
                                        value={lambda}
                                        onChange={(e) => setLambda(parseFloat(e.target.value))}
                                        className="w-full accent-blue-700 cursor-pointer"
                                    />
                                </div>
                            )}

                            {distType === "binomial" && (
                                <>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Número de Ensayos (n): {nBin}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={nBin}
                                            onChange={(e) => setNBin(parseInt(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold mb-1">
                                            <span>Probabilidad de Éxito (p): {pBin}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.05"
                                            max="0.95"
                                            step="0.05"
                                            value={pBin}
                                            onChange={(e) => setPBin(parseFloat(e.target.value))}
                                            className="w-full accent-blue-700 cursor-pointer"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mode & Region Selector */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
                            Modo de Cálculo de Probabilidad
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl text-xs font-semibold">
                            <button
                                onClick={() => setCalcMode("interval")}
                                className={`py-1.5 rounded-lg transition-all ${
                                    calcMode === "interval"
                                        ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                P(a ≤ X ≤ b)
                            </button>
                            <button
                                onClick={() => setCalcMode("cumulative")}
                                className={`py-1.5 rounded-lg transition-all ${
                                    calcMode === "cumulative"
                                        ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                P(X ≤ x)
                            </button>
                            <button
                                onClick={() => setCalcMode("point")}
                                className={`py-1.5 rounded-lg transition-all ${
                                    calcMode === "point"
                                        ? "bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-300 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                f(x) ó P(X=x)
                            </button>
                        </div>

                        {/* Interactive Range Inputs */}
                        <div className="mt-4 space-y-3">
                            {calcMode === "interval" && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500">
                                            Límite Inferior (a):
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={intervalA}
                                            onChange={(e) => setIntervalA(parseFloat(e.target.value) || 0)}
                                            className="w-full mt-1 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500">
                                            Límite Superior (b):
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={intervalB}
                                            onChange={(e) => setIntervalB(parseFloat(e.target.value) || 0)}
                                            className="w-full mt-1 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                        />
                                    </div>
                                </div>
                            )}

                            {(calcMode === "cumulative" || calcMode === "point") && (
                                <div>
                                    <label className="text-xs font-medium text-slate-500">
                                        Punto de evaluación (x):
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={evalX}
                                        onChange={(e) => setEvalX(parseFloat(e.target.value) || 0)}
                                        className="w-full mt-1 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                    />
                                </div>
                            )}

                            {/* Quantile / Alpha selector */}
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    <span>Nivel de Significación (α para quantil):</span>
                                    <span className="font-mono font-bold text-blue-700 dark:text-blue-400">
                                        {alpha}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {[0.1, 0.05, 0.025, 0.01].map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setAlpha(a)}
                                            className={`px-2 py-1 text-[11px] font-bold rounded border ${
                                                alpha === a
                                                    ? "bg-blue-900 text-white border-blue-900"
                                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                                            }`}
                                        >
                                            α = {a}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mathematical Formalism Card */}
                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
                        <div className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                            <Info className="h-3.5 w-3.5" /> Expresión Analítica KaTeX
                        </div>
                        <div className="overflow-x-auto py-1">
                            <MathFormula formula={meta.formulaKaTeX} block={true} className="text-xs" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-blue-200/50 dark:border-blue-900/30 text-[11px]">
                            <div>
                                <span className="text-slate-500 dark:text-slate-400">Esperanza: </span>
                                <MathFormula formula={meta.meanKaTeX} />
                            </div>
                            <div>
                                <span className="text-slate-500 dark:text-slate-400">Varianza: </span>
                                <MathFormula formula={meta.varKaTeX} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visualization & Results Output (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* SVG Graphic Canvas */}
                    <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800 relative">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                                    Gráfico de Densidad / Masa con Área Sombreada
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-emerald-400">
                                {calcMode === "interval"
                                    ? `Área = ${(intervalProb * 100).toFixed(2)}%`
                                    : `F(${evalX}) = ${(cdfAtX * 100).toFixed(2)}%`}
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <svg
                                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                                className="w-full h-auto select-none"
                            >
                                {/* Grid Lines */}
                                <line
                                    x1={padX}
                                    y1={svgHeight - padY}
                                    x2={svgWidth - padX}
                                    y2={svgHeight - padY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                />
                                <line
                                    x1={padX}
                                    y1={padY}
                                    x2={padX}
                                    y2={svgHeight - padY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                />

                                {/* Continuous Curves */}
                                {!meta.isDiscrete && (
                                    <>
                                        {/* Shaded Area */}
                                        {areaPath && (
                                            <path
                                                d={areaPath}
                                                fill="rgba(59, 130, 246, 0.45)"
                                                stroke="none"
                                            />
                                        )}
                                        {/* Density Line */}
                                        {linePath && (
                                            <path
                                                d={linePath}
                                                fill="none"
                                                stroke="#60A5FA"
                                                strokeWidth="2.5"
                                            />
                                        )}
                                    </>
                                )}

                                {/* Discrete Stems/Bars */}
                                {meta.isDiscrete &&
                                    chartPoints.pts.map((p, idx) => {
                                        const px = scaleX(p.x)
                                        const py = scaleY(p.y)
                                        const basePy = scaleY(0)
                                        return (
                                            <g key={idx}>
                                                <line
                                                    x1={px}
                                                    y1={basePy}
                                                    x2={px}
                                                    y2={py}
                                                    stroke={p.inInterval ? "#38BDF8" : "#475569"}
                                                    strokeWidth={p.inInterval ? "4" : "2"}
                                                />
                                                <circle
                                                    cx={px}
                                                    cy={py}
                                                    r={p.inInterval ? 5 : 3.5}
                                                    fill={p.inInterval ? "#38BDF8" : "#94A3B8"}
                                                />
                                                <text
                                                    x={px}
                                                    y={svgHeight - padY + 16}
                                                    fill="#94A3B8"
                                                    fontSize="10"
                                                    textAnchor="middle"
                                                >
                                                    {p.x}
                                                </text>
                                            </g>
                                        )
                                    })}

                                {/* Axis Labels & Ticks (Continuous) */}
                                {!meta.isDiscrete && (
                                    <>
                                        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                                            const xVal =
                                                chartPoints.minX +
                                                pct * (chartPoints.maxX - chartPoints.minX)
                                            const px = scaleX(xVal)
                                            return (
                                                <g key={idx}>
                                                    <line
                                                        x1={px}
                                                        y1={svgHeight - padY}
                                                        x2={px}
                                                        y2={svgHeight - padY + 4}
                                                        stroke="#64748B"
                                                    />
                                                    <text
                                                        x={px}
                                                        y={svgHeight - padY + 16}
                                                        fill="#94A3B8"
                                                        fontSize="10"
                                                        textAnchor="middle"
                                                    >
                                                        {xVal.toFixed(1)}
                                                    </text>
                                                </g>
                                            )
                                        })}
                                    </>
                                )}

                                {/* Critical Value Indicator */}
                                {Number.isFinite(criticalValue) &&
                                    criticalValue >= chartPoints.minX &&
                                    criticalValue <= chartPoints.maxX && (
                                        <g>
                                            <line
                                                x1={scaleX(criticalValue)}
                                                y1={padY}
                                                x2={scaleX(criticalValue)}
                                                y2={svgHeight - padY}
                                                stroke="#F43F5E"
                                                strokeWidth="1.5"
                                                strokeDasharray="4 3"
                                            />
                                            <text
                                                x={scaleX(criticalValue)}
                                                y={padY - 8}
                                                fill="#FDA4AF"
                                                fontSize="10"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                            >
                                                x_crit = {criticalValue.toFixed(2)}
                                            </text>
                                        </g>
                                    )}
                            </svg>
                        </div>
                    </div>

                    {/* Reactive Output Numerical Metrics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Metric 1 */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {calcMode === "interval"
                                    ? "Probabilidad en Intervalo"
                                    : calcMode === "cumulative"
                                    ? `CDF P(X ≤ ${evalX})`
                                    : `PDF / PMF en x = ${evalX}`}
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-400 mt-1 font-mono">
                                {calcMode === "interval"
                                    ? intervalProb.toFixed(5)
                                    : calcMode === "cumulative"
                                    ? cdfAtX.toFixed(5)
                                    : pdfAtX.toFixed(5)}
                            </div>
                            <span className="text-[11px] font-medium text-slate-500">
                                {calcMode === "interval"
                                    ? `P(${intervalA} ≤ X ≤ ${intervalB}) = ${(intervalProb * 100).toFixed(2)}%`
                                    : calcMode === "cumulative"
                                    ? `${(cdfAtX * 100).toFixed(2)}% de masa acumulada`
                                    : `f(${evalX}) = altura de la función`}
                            </span>
                        </div>

                        {/* Metric 2: Complementary tail */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Cola Superior P(X &gt; x)
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-indigo-700 dark:text-indigo-400 mt-1 font-mono">
                                {(1 - cdfAtX).toFixed(5)}
                            </div>
                            <span className="text-[11px] font-medium text-slate-500">
                                {((1 - cdfAtX) * 100).toFixed(2)}% región de rechazo
                            </span>
                        </div>

                        {/* Metric 3: Critical value */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Valor Crítico (1 - α = {(1 - alpha).toFixed(3)})
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">
                                {Number.isFinite(criticalValue) ? criticalValue.toFixed(4) : "N/A"}
                            </div>
                            <span className="text-[11px] font-medium text-slate-500">
                                Quantil superior para α = {alpha}
                            </span>
                        </div>
                    </div>

                    {/* Interpretation & Academic Guidance */}
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs">
                        <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            Aplicación en Ingeniería Industrial UTP
                        </div>
                        <p className="text-emerald-800 dark:text-emerald-400 leading-relaxed">
                            En control estadístico de procesos (CEP), el intervalo $[\mu - 3\sigma, \mu + 3\sigma]$ concentra el 99.73% de la producción bajo distribución normal. En pruebas de hipótesis y muestreo de aceptación (MIL-STD), los quantiles determinan las zonas críticas de rechazo de la hipótesis nula $H_0$.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DistributionWorkbench
