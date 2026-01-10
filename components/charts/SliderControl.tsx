"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface SliderControlProps {
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (value: number) => void
    unit?: string
    showValue?: boolean
    className?: string
}

export function SliderControl({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    unit = "",
    showValue = true,
    className
}: SliderControlProps) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
                {showValue && (
                    <span className="text-sm font-mono font-bold text-brand-blue">
                        {value}{unit}
                    </span>
                )}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={cn(
                    "w-full h-2 rounded-full appearance-none cursor-pointer",
                    "bg-slate-200 dark:bg-slate-700",
                    "[&::-webkit-slider-thumb]:appearance-none",
                    "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
                    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-blue",
                    "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer",
                    "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                )}
            />
            <div className="flex justify-between text-xs text-slate-400">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    )
}
