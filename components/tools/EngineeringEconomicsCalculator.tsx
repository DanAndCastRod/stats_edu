"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Percent,
    Calendar,
    CheckCircle2,
    XCircle,
    Sliders,
    Bookmark,
    AlertCircle,
    Info,
    Download,
    Copy,
    Check
} from "lucide-react"
import {
    computeNPV,
    computeIRR,
    computePayback,
    computeBenefitCostRatio
} from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

export function EngineeringEconomicsCalculator() {
    // Project Parameters
    const [initialInvestment, setInitialInvestment] = useState<number>(100000)
    const [discountRatePct, setDiscountRatePct] = useState<number>(12.0) // TIO (%)
    const [horizonYears, setHorizonYears] = useState<number>(5)

    // Annual Net Cash Flows
    const [cashFlows, setCashFlows] = useState<number[]>([
        32000, 38000, 42000, 39000, 35000
    ])

    const rate = discountRatePct / 100

    // Adjust cash flows array if horizon changes
    const activeFlows = useMemo(() => {
        const flows = [...cashFlows]
        if (flows.length < horizonYears) {
            const lastVal = flows[flows.length - 1] || 30000
            while (flows.length < horizonYears) {
                flows.push(lastVal)
            }
        }
        return flows.slice(0, horizonYears)
    }, [cashFlows, horizonYears])

    // Financial Metrics
    const npv = useMemo(() => {
        return computeNPV(rate, initialInvestment, activeFlows)
    }, [rate, initialInvestment, activeFlows])

    const irr = useMemo(() => {
        return computeIRR(initialInvestment, activeFlows)
    }, [initialInvestment, activeFlows])

    const bcRatio = useMemo(() => {
        return computeBenefitCostRatio(initialInvestment, activeFlows, rate)
    }, [initialInvestment, activeFlows, rate])

    const { simplePayback, discountedPayback } = useMemo(() => {
        return computePayback(initialInvestment, activeFlows, rate)
    }, [initialInvestment, activeFlows, rate])

    // Viability Assessment
    const isViable = npv > 0 && (irr !== null ? irr * 100 >= discountRatePct : true)

    // VPN Profile points for the chart: r from 0% to 50%
    const chartData = useMemo(() => {
        const points: { rPct: number; npvVal: number }[] = []
        for (let r = 0; r <= 50; r += 1) {
            const npvVal = computeNPV(r / 100, initialInvestment, activeFlows)
            points.push({ rPct: r, npvVal })
        }
        return points
    }, [initialInvestment, activeFlows])

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "automatizacion") {
            setInitialInvestment(150000)
            setDiscountRatePct(14.0)
            setHorizonYears(5)
            setCashFlows([45000, 52000, 58000, 60000, 55000])
        } else if (preset === "energia_solar") {
            setInitialInvestment(80000)
            setDiscountRatePct(10.0)
            setHorizonYears(6)
            setCashFlows([18000, 20000, 22000, 24000, 25000, 25000])
        } else if (preset === "proyecto_riesgoso") {
            setInitialInvestment(120000)
            setDiscountRatePct(18.0)
            setHorizonYears(4)
            setCashFlows([30000, 35000, 38000, 32000])
        }
    }

    const [copied, setCopied] = useState(false)

    const handleExportCsv = () => {
        const rows: (string | number)[][] = [
            ["# STATSEDU UTP - EVALUACION FINANCIERA E INGENIERIA ECONOMICA"],
            ["# Facultad de Ingenieria Industrial - Universidad Tecnologica de Pereira"],
            ["# Fecha de Generacion", new Date().toLocaleString("es-CO")],
            [""],
            ["SECCION: PARAMETROS DEL PROYECTO"],
            ["Inversion Inicial (I_0)", initialInvestment, "USD"],
            ["Tasa de Oportunidad (TIO / WACC)", discountRatePct, "%"],
            ["Horizonte de Evaluacion", horizonYears, "anos"],
            ["Dictamen Financiero", isViable ? "PROYECTO INDUSTRIAL VIABLE Y RECOMENDADO" : "PROYECTO FINANCIERAMENTE NO VIABLE"],
            [""],
            ["SECCION: INDICADORES FINANCIEROS Y METRICAS DE DECISION"],
            ["Indicador", "Simbolo", "Valor Calculado", "Criterio de Aceptacion", "Resultado"],
            ["Valor Presente Neto", "VPN", npv.toFixed(2), "VPN >= 0", npv >= 0 ? "Aceptable" : "Rechazado"],
            [
                "Tasa Interna de Retorno",
                "TIR",
                irr !== null ? `${(irr * 100).toFixed(2)}%` : "N/D",
                `TIR >= TIO (${discountRatePct}%)`,
                irr !== null && irr * 100 >= discountRatePct ? "Aceptable" : "Rechazado"
            ],
            ["Relacion Beneficio / Costo", "B/C", bcRatio.toFixed(4), "B/C >= 1.0", bcRatio >= 1.0 ? "Aceptable" : "Rechazado"],
            [
                "Periodo de Recuperacion Simple (Payback)",
                "PR",
                simplePayback !== null ? `${simplePayback.toFixed(2)} anos` : `> ${horizonYears} anos`,
                `PR <= ${horizonYears} anos`,
                simplePayback !== null ? "Recupera capital" : "No recupera"
            ],
            [
                "Periodo de Recuperacion Descontado",
                "PRI",
                discountedPayback !== null ? `${discountedPayback.toFixed(2)} anos` : `> ${horizonYears} anos`,
                `PRI <= ${horizonYears} anos`,
                discountedPayback !== null ? "Recupera capital a valor presente" : "No recupera"
            ],
            [""],
            ["SECCION: TABLA DE FLUJO DE CAJA ANUAL Y VALORES PRESENTES DESCONTADOS"],
            ["Periodo (t)", "Flujo Neto de Caja (FNC_t)", "Factor Descuento (1/(1+i)^t)", "Flujo Descontado a VP", "Flujo Acumulado Descontado"]
        ]

        // Period 0
        rows.push([0, -initialInvestment, "1.0000", (-initialInvestment).toFixed(2), (-initialInvestment).toFixed(2)])

        // Periods 1 to horizon
        let accum = -initialInvestment
        activeFlows.forEach((flow, idx) => {
            const t = idx + 1
            const discountFactor = 1 / Math.pow(1 + rate, t)
            const discVal = flow * discountFactor
            accum += discVal
            rows.push([
                t,
                flow.toFixed(2),
                discountFactor.toFixed(4),
                discVal.toFixed(2),
                accum.toFixed(2)
            ])
        })

        const filename = `ingenieria_economica_flujos_${getExportTimestamp()}`
        downloadCsvFile(filename, rows)
    }

    const handleCopySummary = async () => {
        const flowRows = activeFlows
            .map((f, i) => {
                const t = i + 1
                const vp = f / Math.pow(1 + rate, t)
                return `| Año ${t} | $${f.toLocaleString("en-US")} | $${vp.toFixed(0)} |`
            })
            .join("\n")

        const markdown = `### Reporte de Ingeniería Económica y Evaluación Financiera (StatsEdu UTP)
**Inversión Inicial ($I_0$):** $${initialInvestment.toLocaleString("en-US")} | **Tasa de Oportunidad (TIO):** ${discountRatePct}% | **Horizonte:** ${horizonYears} años  
**Dictamen:** ${isViable ? "★ PROYECTO INDUSTRIAL VIABLE Y RECOMENDADO" : "✕ PROYECTO NO VIABLE"}  

| Indicador Financiero | Valor | Criterio de Aceptación | Diagnóstico |
| :--- | :--- | :--- | :--- |
| **Valor Presente Neto (VPN)** | **$${npv.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}** | $VPN \\ge 0$ | ${npv >= 0 ? "Genera riqueza neta" : "Destruye valor"} |
| **Tasa Interna de Retorno (TIR)** | **${irr !== null ? `${(irr * 100).toFixed(2)}%` : "N/D"}** | $TIR \\ge ${discountRatePct}\\%$ | ${irr !== null && irr * 100 >= discountRatePct ? "Rentabilidad superior a TIO" : "Rentabilidad insuficiente"} |
| **Relación Beneficio / Costo (B/C)** | **${bcRatio.toFixed(3)}** | $B/C \\ge 1.0$ | ${bcRatio >= 1.0 ? "Aceptable" : "Inviable"} |
| **Payback Descontado (PRI)** | **${discountedPayback !== null ? `${discountedPayback.toFixed(1)} años` : `> ${horizonYears} años`}** | $\\le ${horizonYears}$ años | ${discountedPayback !== null ? "Recupera en horizonte" : "No recupera"} |
| **Payback Simple** | ${simplePayback !== null ? `${simplePayback.toFixed(1)} años` : "N/A"} | Nominal | ${simplePayback !== null ? `${simplePayback.toFixed(1)}a` : "N/A"} |

#### Flujos Netos de Caja Anuales
| Periodo | Flujo Neto (FNC) | Valor Presente (VP) |
| :--- | :--- | :--- |
| Año 0 (Inversión) | -$${initialInvestment.toLocaleString("en-US")} | -$${initialInvestment.toLocaleString("en-US")} |
${flowRows}

*Generado por la Suite de Computación e Investigación Operativa — Universidad Tecnológica de Pereira.*`

        const ok = await copyToClipboard(markdown)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // Chart SVG Geometry
    const svgWidth = 560
    const svgHeight = 240
    const padX = 55
    const padY = 25
    const plotW = svgWidth - 2 * padX
    const plotH = svgHeight - 2 * padY

    const minNPV = Math.min(...chartData.map((d) => d.npvVal), 0)
    const maxNPV = Math.max(...chartData.map((d) => d.npvVal), 0)
    const rangeNPV = maxNPV - minNPV || 1

    const scaleX = (rPct: number) => padX + (rPct / 50) * plotW
    const scaleY = (val: number) => svgHeight - padY - ((val - minNPV) / rangeNPV) * plotH
    const yZero = scaleY(0)

    const profilePath = useMemo(() => {
        if (chartData.length === 0) return ""
        let p = `M ${scaleX(chartData[0].rPct)} ${scaleY(chartData[0].npvVal)}`
        for (let i = 1; i < chartData.length; i++) {
            p += ` L ${scaleX(chartData[i].rPct)} ${scaleY(chartData[i].npvVal)}`
        }
        return p
    }, [chartData, minNPV, maxNPV])

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                            <DollarSign className="h-3.5 w-3.5" />
                            Ingeniería Económica & Evaluación Financiera (II713)
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Calculadora de Ingeniería Económica y Viabilidad Financiera
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Evaluación financiera de proyectos industriales con VPN, TIR, relación Beneficio/Costo (B/C), Payback simple y descontado, y perfil de sensibilidad de tasa.
                        </p>
                    </div>

                    {/* Presets and Export Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("automatizacion")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                            Automatización Planta
                        </button>
                        <button
                            onClick={() => applyPreset("energia_solar")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                            Eficiencia Solar 6 Años
                        </button>
                        <button
                            onClick={() => applyPreset("proyecto_riesgoso")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors"
                        >
                            Proyecto Alto Riesgo
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />

                        {/* Export Buttons */}
                        <button
                            onClick={handleExportCsv}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Descargar tabla completa de flujos de caja y VP en formato CSV"
                        >
                            <Download className="h-3.5 w-3.5" /> Exportar Flujo de Caja a CSV
                        </button>
                        <button
                            onClick={handleCopySummary}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Copiar tabla de resultados e indicadores en formato Markdown"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Copiado!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5 text-slate-500" /> Copiar Resumen
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Investment, TIO & Cash Flow Inputs (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Parameters Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                            <Sliders className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                            Parámetros del Proyecto
                        </h3>

                        <div className="space-y-4">
                            {/* Initial Investment */}
                            <div>
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    Inversión Inicial (I₀):
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type="number"
                                        min="1000"
                                        step="5000"
                                        value={initialInvestment}
                                        onChange={(e) =>
                                            setInitialInvestment(parseFloat(e.target.value) || 0)
                                        }
                                        className="w-full pl-7 pr-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                    />
                                    <span className="absolute left-2.5 top-1.5 text-xs text-slate-400">$</span>
                                </div>
                            </div>

                            {/* TIO / Discount Rate */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Tasa de Oportunidad (TIO / WACC): {discountRatePct}%</span>
                                    <span className="text-slate-400">1% a 30%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="0.5"
                                    value={discountRatePct}
                                    onChange={(e) => setDiscountRatePct(parseFloat(e.target.value))}
                                    className="w-full accent-emerald-700 cursor-pointer"
                                />
                            </div>

                            {/* Horizon */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Horizonte de Evaluación: {horizonYears} años</span>
                                    <span className="text-slate-400">1 a 8</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="8"
                                    step="1"
                                    value={horizonYears}
                                    onChange={(e) => setHorizonYears(parseInt(e.target.value))}
                                    className="w-full accent-emerald-700 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Annual Net Cash Flows Table */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Flujos Netos de Caja Anuales (FNC_t)
                            </h3>
                            <span className="text-[11px] text-slate-400">Año 1 a {horizonYears}</span>
                        </div>

                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {activeFlows.map((flow, t) => {
                                const discVal = flow / Math.pow(1 + rate, t + 1)
                                return (
                                    <div
                                        key={t}
                                        className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800"
                                    >
                                        <span className="w-14 text-xs font-mono font-bold text-slate-500">
                                            Año {t + 1}:
                                        </span>
                                        <div className="relative flex-1">
                                            <input
                                                type="number"
                                                step="1000"
                                                value={flow}
                                                onChange={(e) => {
                                                    const val = parseFloat(e.target.value) || 0
                                                    const next = [...activeFlows]
                                                    next[t] = val
                                                    setCashFlows(next)
                                                }}
                                                className="w-full pl-6 pr-2 py-1 text-xs font-mono font-bold rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                                            />
                                            <span className="absolute left-2 top-1 text-xs text-slate-400">$</span>
                                        </div>
                                        <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                                            VP: ${discVal.toFixed(0)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Financial Results, Decision Verdict & VPN Profile Curve (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Financial Metrics Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {/* VPN */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Valor Presente Neto (VPN)
                            </span>
                            <div
                                className={`text-xl font-black font-mono mt-1 ${
                                    npv >= 0
                                        ? "text-emerald-700 dark:text-emerald-400"
                                        : "text-rose-600 dark:text-rose-400"
                                }`}
                            >
                                ${npv.toFixed(0)}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                {npv >= 0 ? "Genera riqueza neta" : "Destruye valor"}
                            </span>
                        </div>

                        {/* TIR */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Tasa Interna Retorno (TIR)
                            </span>
                            <div className="text-xl font-black font-mono text-blue-900 dark:text-blue-400 mt-1">
                                {irr !== null ? `${(irr * 100).toFixed(2)}%` : "N/D"}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                TIO = {discountRatePct}%
                            </span>
                        </div>

                        {/* B/C Ratio */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Relación B/C
                            </span>
                            <div className="text-xl font-black font-mono text-indigo-900 dark:text-indigo-400 mt-1">
                                {bcRatio.toFixed(3)}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                {bcRatio >= 1.0 ? "B/C ≥ 1.0 (Aceptable)" : "B/C < 1.0"}
                            </span>
                        </div>

                        {/* Payback */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Payback Descontado (PRI)
                            </span>
                            <div className="text-xl font-black font-mono text-purple-900 dark:text-purple-400 mt-1">
                                {discountedPayback !== null ? `${discountedPayback.toFixed(1)} años` : "> N años"}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                Simple: {simplePayback !== null ? `${simplePayback.toFixed(1)}a` : "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Verdict Card */}
                    <div
                        className={`p-4 rounded-xl border flex items-start gap-3 ${
                            isViable
                                ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50"
                                : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50"
                        }`}
                    >
                        {isViable ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                            <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                            <div
                                className={`text-sm font-black uppercase tracking-tight ${
                                    isViable
                                        ? "text-emerald-900 dark:text-emerald-300"
                                        : "text-rose-900 dark:text-rose-300"
                                }`}
                            >
                                {isViable
                                    ? "Dictamen: PROYECTO INDUSTRIAL VIABLE Y RECOMENDADO"
                                    : "Dictamen: PROYECTO FINANCIERAMENTE NO VIABLE"}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                {isViable
                                    ? `El proyecto presenta un VPN positivo de $${npv.toFixed(
                                          0
                                      )} y una TIR (${(
                                          (irr ?? 0) * 100
                                      ).toFixed(
                                          2
                                      )}%) que supera la Tasa de Oportunidad exigida (${discountRatePct}%). La inversión inicial de $${initialInvestment.toLocaleString()} se recupera en ${
                                          discountedPayback?.toFixed(1) ?? "N/A"
                                      } años en términos de poder adquisitivo presente.`
                                    : `El proyecto destruye valor económico a la tasa de descuento fijada (TIO = ${discountRatePct}%). Se sugiere renegociar costos de inversión o mejorar los flujos operacionales antes de comprometer capital.`}
                            </p>
                        </div>
                    </div>

                    {/* VPN Profile Curve (SVG) */}
                    <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                                Perfil del Valor Presente Neto VPN(i)
                            </span>
                            <span className="text-[11px] font-mono text-emerald-400">
                                Cruce VPN=0 en TIR = {irr !== null ? `${(irr * 100).toFixed(1)}%` : "N/D"}
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
                                {/* Horizontal zero line */}
                                <line
                                    x1={padX}
                                    y1={yZero}
                                    x2={svgWidth - padX}
                                    y2={yZero}
                                    stroke="#475569"
                                    strokeWidth="1.5"
                                    strokeDasharray="3 3"
                                />
                                <text
                                    x={padX - 8}
                                    y={yZero + 4}
                                    fill="#94A3B8"
                                    fontSize="10"
                                    textAnchor="end"
                                >
                                    $0
                                </text>

                                {/* Y-axis line */}
                                <line
                                    x1={padX}
                                    y1={padY}
                                    x2={padX}
                                    y2={svgHeight - padY}
                                    stroke="#334155"
                                    strokeWidth="1.5"
                                />

                                {/* Profile Curve */}
                                {profilePath && (
                                    <path
                                        d={profilePath}
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="2.5"
                                    />
                                )}

                                {/* Current TIO Indicator */}
                                {discountRatePct <= 50 && (
                                    <g>
                                        <line
                                            x1={scaleX(discountRatePct)}
                                            y1={padY}
                                            x2={scaleX(discountRatePct)}
                                            y2={svgHeight - padY}
                                            stroke="#38BDF8"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 3"
                                        />
                                        <circle
                                            cx={scaleX(discountRatePct)}
                                            cy={scaleY(npv)}
                                            r="4.5"
                                            fill="#38BDF8"
                                        />
                                        <text
                                            x={scaleX(discountRatePct)}
                                            y={padY - 4}
                                            fill="#BAE6FD"
                                            fontSize="10"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            TIO = {discountRatePct}%
                                        </text>
                                    </g>
                                )}

                                {/* IRR Indicator */}
                                {irr !== null && irr * 100 <= 50 && (
                                    <g>
                                        <circle
                                            cx={scaleX(irr * 100)}
                                            cy={yZero}
                                            r="5"
                                            fill="#F43F5E"
                                        />
                                        <text
                                            x={scaleX(irr * 100)}
                                            y={yZero + 16}
                                            fill="#FDA4AF"
                                            fontSize="10"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            TIR = {(irr * 100).toFixed(1)}%
                                        </text>
                                    </g>
                                )}

                                {/* X-axis ticks */}
                                {[0, 10, 20, 30, 40, 50].map((t) => (
                                    <text
                                        key={t}
                                        x={scaleX(t)}
                                        y={svgHeight - padY + 16}
                                        fill="#94A3B8"
                                        fontSize="10"
                                        textAnchor="middle"
                                    >
                                        {t}%
                                    </text>
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EngineeringEconomicsCalculator
