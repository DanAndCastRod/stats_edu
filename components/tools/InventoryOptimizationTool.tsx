"use client"

import React, { useState, useMemo } from "react"
import {
    Boxes,
    Sliders,
    TrendingDown,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle2,
    Download,
    Copy,
    Check,
    RotateCcw,
    Layers,
    LineChart
} from "lucide-react"
import { calculateInventoryOptimization, InventoryParams, InventoryResult } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp, formatMarkdownTable } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

export function InventoryOptimizationTool() {
    const [annualDemand, setAnnualDemand] = useState<number>(12000) // D unidades/año
    const [orderCost, setOrderCost] = useState<number>(80)          // S $/pedido
    const [holdingCost, setHoldingCost] = useState<number>(4.5)      // H $/unidad/año
    const [unitCost, setUnitCost] = useState<number>(25)            // C $/unidad
    const [leadTimeDays, setLeadTimeDays] = useState<number>(6)     // L días
    const [dailyDemandStdDev, setDailyDemandStdDev] = useState<number>(8) // sigma_d
    const [serviceLevelPercent, setServiceLevelPercent] = useState<number>(95) // 90, 95, 99
    const [copied, setCopied] = useState<boolean>(false)

    const results: InventoryResult = useMemo(() => {
        return calculateInventoryOptimization({
            annualDemand,
            orderCost,
            holdingCost,
            unitCost,
            leadTimeDays,
            dailyDemandStdDev,
            serviceLevelPercent
        })
    }, [annualDemand, orderCost, holdingCost, unitCost, leadTimeDays, dailyDemandStdDev, serviceLevelPercent])

    const handleReset = () => {
        setAnnualDemand(12000)
        setOrderCost(80)
        setHoldingCost(4.5)
        setUnitCost(25)
        setLeadTimeDays(6)
        setDailyDemandStdDev(8)
        setServiceLevelPercent(95)
    }

    const handleExportCSV = () => {
        const rows: (string | number)[][] = [
            ["=== OPTIMIZACIÓN DE INVENTARIOS: EOQ, ROP Y STOCK DE SEGURIDAD ==="],
            ["Fecha de Exportación", new Date().toLocaleString("es-CO")],
            ["Universidad", "Universidad Tecnológica de Pereira - Ingeniería Industrial"],
            [],
            ["1. PARÁMETROS DE ENTRADA"],
            ["Demanda Anual (D)", annualDemand, "unidades/año"],
            ["Costo de Ordenar (S)", orderCost, "$/pedido"],
            ["Costo Anual de Mantener (H)", holdingCost, "$/unidad/año"],
            ["Costo Unitario de Compra (C)", unitCost, "$/unidad"],
            ["Tiempo de Reposición / Lead Time (L)", leadTimeDays, "días"],
            ["Desviación Diaria de Demanda (sigma_d)", dailyDemandStdDev, "unidades/día"],
            ["Nivel de Servicio Cíclico", `${serviceLevelPercent}%`, `Z = ${results.zFactor}`],
            [],
            ["2. RESULTADOS DEL MODELO EOQ & ROP"],
            ["Lote Económico de Pedido (EOQ - Q*)", results.eoq, "unidades"],
            ["Número de Pedidos al Año (N = D / Q*)", results.ordersPerYear, "pedidos/año"],
            ["Tiempo de Ciclo entre Pedidos (T)", results.cycleTimeDays, "días"],
            ["Costo Anual de Ordenar", results.annualOrderingCost, "$/año"],
            ["Costo Anual de Almacenamiento", results.annualHoldingCost, "$/año"],
            ["Costo Total de Inventario (CT = CO + CM)", results.totalInventoryCost, "$/año"],
            ["Costo Anual Total con Adquisición", results.totalAnnualCost ?? "N/A", "$/año"],
            ["Demanda Promedio en Tiempo de Entrega", results.leadTimeDemand, "unidades"],
            ["Stock de Seguridad (SS = Z * sigma_L)", results.safetyStock, "unidades"],
            ["Punto de Reorden (ROP = d*L + SS)", results.reorderPoint, "unidades"],
            [],
            ["3. CURVA DE SENSIBILIDAD DE COSTOS (EOQ vs Q)"],
            ["Tamaño de Lote (Q)", "Costo de Ordenar ($)", "Costo de Mantener ($)", "Costo Total Anual ($)"],
            ...results.costSensitivity.map((pt) => [pt.q, pt.ordering, pt.holding, pt.total])
        ]

        downloadCsvFile(`Optimizacion_Inventario_EOQ_${getExportTimestamp()}.csv`, rows)
    }

    const handleCopySummary = async () => {
        const headers = ["Métrica de Inventario", "Valor Óptimo", "Interpretación Logística"]
        const rows = [
            ["Lote Económico EOQ (Q*)", `${results.eoq.toLocaleString()} unidades`, "Tamaño de pedido que minimiza costos totales"],
            ["Frecuencia de Pedido (N)", `${results.ordersPerYear} pedidos/año`, "Número óptimo de reabastecimientos al año"],
            ["Tiempo de Ciclo (T)", `${results.cycleTimeDays} días`, "Intervalo medio entre recepciones de pedidos"],
            ["Demanda en Lead Time", `${results.leadTimeDemand} unidades`, "Consumo esperado durante el tiempo de reposición"],
            ["Stock de Seguridad (SS)", `${results.safetyStock} unidades`, `Protección contra variabilidad al ${serviceLevelPercent}% de servicio`],
            ["Punto de Reorden (ROP)", `${results.reorderPoint} unidades`, "Nivel de inventario en el que se debe emitir la orden"],
            ["Costo Total Inventario", `$${results.totalInventoryCost.toLocaleString()}/año`, "Balance perfecto: Costo Ordenar = Costo Mantener"]
        ]

        const text = `# Reporte de Gestión de Inventarios y Cadena de Suministro (EOQ / ROP)\n**Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial**\n\n` +
            formatMarkdownTable(headers, rows)

        const ok = await copyToClipboard(text)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // Chart Dimensions
    const svgWidth = 620
    const svgHeight = 220
    const padX = 50
    const padY = 25
    const graphW = svgWidth - padX * 2
    const graphH = svgHeight - padY * 2

    // Cost Curve Scaling
    const maxCost = Math.max(...results.costSensitivity.map((p) => p.total)) * 1.05 || 1000
    const minQ = results.costSensitivity[0]?.q || 100
    const maxQ = results.costSensitivity[results.costSensitivity.length - 1]?.q || 2000
    const rangeQ = maxQ - minQ || 1000

    const getCostX = (qVal: number) => padX + ((qVal - minQ) / rangeQ) * graphW
    const getCostY = (cVal: number) => padY + graphH - (cVal / maxCost) * graphH

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                            <Boxes className="w-5 h-5" />
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Optimizador de Inventarios & Cadena de Suministro (EOQ / ROP)
                        </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Cálculo de Lote Económico de Pedido, Punto de Reorden estocástico, Stock de Seguridad y curvas de costos.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                    </button>
                    <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "¡Copiado!" : "Copiar Resumen"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Lote EOQ ($Q^*$)</span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {results.eoq.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">unidades/pedido</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Punto Reorden (ROP)</span>
                    <div className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                        {results.reorderPoint.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">unidades en almacén</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Stock Seguridad (SS)</span>
                    <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                        {results.safetyStock.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">Nivel {serviceLevelPercent}% ($Z = {results.zFactor}$)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Pedidos / Año ($N$)</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {results.ordersPerYear}
                    </div>
                    <span className="text-[10px] text-slate-500">reabastecimientos</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tiempo de Ciclo ($T$)</span>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {results.cycleTimeDays}
                    </div>
                    <span className="text-[10px] text-slate-500">días entre órdenes</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Costo Total ($TC$)</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        ${results.totalInventoryCost.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">Ordenar + Mantener</span>
                </div>
            </div>

            {/* Parameters & Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inputs Column */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            <Sliders className="w-4 h-4 text-emerald-600" />
                            Parámetros Operacionales
                        </div>

                        <div>
                            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                <span>Demanda Anual ($D$):</span>
                                <span className="font-mono text-emerald-600 font-bold">{annualDemand.toLocaleString()} u/año</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="50000"
                                step="500"
                                value={annualDemand}
                                onChange={(e) => setAnnualDemand(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Costo Orden ($S$):
                                </label>
                                <div className="relative">
                                    <span className="absolute left-2.5 top-2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={orderCost}
                                        onChange={(e) => setOrderCost(Number(e.target.value) || 1)}
                                        className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Costo Mantener ($H$):
                                </label>
                                <div className="relative">
                                    <span className="absolute left-2.5 top-2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={holdingCost}
                                        onChange={(e) => setHoldingCost(Number(e.target.value) || 0.1)}
                                        className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Lead Time ($L$ días):
                                </label>
                                <input
                                    type="number"
                                    value={leadTimeDays}
                                    onChange={(e) => setLeadTimeDays(Number(e.target.value) || 1)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                    Desviación ($\sigma_d$):
                                </label>
                                <input
                                    type="number"
                                    value={dailyDemandStdDev}
                                    onChange={(e) => setDailyDemandStdDev(Number(e.target.value) || 0)}
                                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                Nivel de Servicio Cíclico:
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {[90, 95, 99].map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => setServiceLevelPercent(lvl)}
                                        className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${serviceLevelPercent === lvl
                                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {lvl}%
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Formula helper */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" />
                            Formulaciones Clásicas de Inventarios
                        </div>
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                            <div><MathFormula formula="EOQ = \sqrt{\frac{2DS}{H}}" /></div>
                            <div><MathFormula formula="ROP = d \cdot L + Z_\alpha \sigma_L" /></div>
                            <div><MathFormula formula="\sigma_L = \sqrt{L} \cdot \sigma_d, \quad SS = Z_\alpha \sigma_L" /></div>
                            <div><MathFormula formula="TC(Q) = \frac{D}{Q}S + \frac{Q}{2}H" /></div>
                        </div>
                    </div>
                </div>

                {/* SVG Visualizations */}
                <div className="lg:col-span-8 space-y-5">
                    {/* Cost Curve SVG */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <LineChart className="w-4 h-4 text-emerald-600" />
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    Curva de Costos Anuales en Función del Tamaño de Lote ($Q$)
                                </h4>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-mono">
                                <span className="flex items-center gap-1 text-blue-600 font-bold">
                                    <span className="w-2.5 h-0.5 bg-blue-500 inline-block"></span> Costo Ordenar
                                </span>
                                <span className="flex items-center gap-1 text-amber-600 font-bold">
                                    <span className="w-2.5 h-0.5 bg-amber-500 inline-block"></span> Costo Mantener
                                </span>
                                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                    <span className="w-2.5 h-0.5 bg-emerald-500 inline-block"></span> Costo Total
                                </span>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                                {/* Grid */}
                                <line x1={padX} y1={padY + graphH} x2={padX + graphW} y2={padY + graphH} stroke="#cbd5e1" strokeWidth="1" />
                                <line x1={padX} y1={padY} x2={padX} y2={padY + graphH} stroke="#cbd5e1" strokeWidth="1" />

                                {/* Ordering Cost Polyline */}
                                <polyline
                                    fill="none"
                                    stroke="#2563eb"
                                    strokeWidth="1.8"
                                    strokeDasharray="4 2"
                                    points={results.costSensitivity.map((p) => `${getCostX(p.q)},${getCostY(p.ordering)}`).join(" ")}
                                />

                                {/* Holding Cost Polyline */}
                                <polyline
                                    fill="none"
                                    stroke="#d97706"
                                    strokeWidth="1.8"
                                    strokeDasharray="4 2"
                                    points={results.costSensitivity.map((p) => `${getCostX(p.q)},${getCostY(p.holding)}`).join(" ")}
                                />

                                {/* Total Cost Polyline */}
                                <polyline
                                    fill="none"
                                    stroke="#059669"
                                    strokeWidth="2.5"
                                    points={results.costSensitivity.map((p) => `${getCostX(p.q)},${getCostY(p.total)}`).join(" ")}
                                />

                                {/* Optimal EOQ Marker */}
                                <line
                                    x1={getCostX(results.eoq)}
                                    y1={padY}
                                    x2={getCostX(results.eoq)}
                                    y2={padY + graphH}
                                    stroke="#059669"
                                    strokeWidth="1.5"
                                    strokeDasharray="3 3"
                                />
                                <circle
                                    cx={getCostX(results.eoq)}
                                    cy={getCostY(results.totalInventoryCost)}
                                    r="6"
                                    fill="#059669"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                />
                                <text
                                    x={getCostX(results.eoq)}
                                    y={padY + 12}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fontFamily="monospace"
                                    fill="#059669"
                                    fontWeight="bold"
                                >
                                    EOQ = {results.eoq} u
                                </text>

                                {/* Axis labels */}
                                <text x={padX + graphW} y={padY + graphH + 15} textAnchor="end" fontSize="9" fill="#94a3b8">
                                    Tamaño de Lote (Q)
                                </text>
                                <text x={padX - 8} y={padY} textAnchor="end" fontSize="9" fill="#94a3b8">
                                    Costo ($)
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Sawtooth Inventory Cycle Diagram */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <TrendingDown className="w-4 h-4 text-emerald-600" />
                                Dinámica del Ciclo de Inventarios (Gráfico Diente de Sierra con ROP & SS)
                            </h4>
                            <span className="text-[11px] font-mono text-slate-500">
                                ROP: {results.reorderPoint} u • SS: {results.safetyStock} u
                            </span>
                        </div>

                        <div className="w-full bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                            <svg viewBox="0 0 600 130" className="w-full h-auto">
                                {/* Levels lines */}
                                {/* Max inventory Q + SS */}
                                <line x1="40" y1="20" x2="560" y2="20" stroke="#94a3b8" strokeDasharray="2 2" />
                                <text x="35" y="23" textAnchor="end" fontSize="8" fontFamily="monospace" fill="#64748b">Q*+SS</text>

                                {/* ROP line */}
                                <line x1="40" y1="60" x2="560" y2="60" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
                                <text x="35" y="63" textAnchor="end" fontSize="8" fontFamily="monospace" fill="#2563eb" fontWeight="bold">ROP</text>

                                {/* Safety stock line */}
                                <line x1="40" y1="95" x2="560" y2="95" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" />
                                <text x="35" y="98" textAnchor="end" fontSize="8" fontFamily="monospace" fill="#d97706" fontWeight="bold">SS</text>

                                {/* Base axis */}
                                <line x1="40" y1="115" x2="560" y2="115" stroke="#334155" strokeWidth="1.5" />

                                {/* Sawtooth curve */}
                                <polyline
                                    fill="none"
                                    stroke="#059669"
                                    strokeWidth="2.5"
                                    points="
                                        40,20 180,95 180,20
                                        180,20 320,95 320,20
                                        320,20 460,95 460,20
                                        460,20 560,73
                                    "
                                />

                                {/* Lead Time interval markings */}
                                <rect x="135" y="95" width="45" height="20" fill="#2563eb" fillOpacity="0.1" />
                                <text x="157" y="109" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="bold">Lead Time</text>

                                <rect x="275" y="95" width="45" height="20" fill="#2563eb" fillOpacity="0.1" />
                                <text x="297" y="109" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="bold">Lead Time</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
