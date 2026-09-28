"use client"

import React from "react"
import katex from "katex"

interface MathFormulaProps {
    formula: string
    block?: boolean
    className?: string
}

export function MathFormula({ formula, block = false, className = "" }: MathFormulaProps) {
    try {
        const html = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: block
        })
        return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
    } catch {
        return <span className={`font-mono text-xs ${className}`}>{formula}</span>
    }
}

export default MathFormula
