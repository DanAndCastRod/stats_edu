"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps {
    children: React.ReactNode
    title?: string
    description?: string
    className?: string
}

export function ChartContainer({
    children,
    title,
    description,
    className
}: ChartContainerProps) {
    return (
        <div className={cn(
            "my-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800",
            "bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950",
            "shadow-lg",
            className
        )}>
            {title && (
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-xl">📊</span> {title}
                    </h3>
                    {description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
