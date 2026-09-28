import { jStat } from "jstat"

// ==========================================
// 1. STATISTICAL DISTRIBUTIONS ENGINE
// ==========================================

export type DistributionType =
    | "normal"
    | "studentt"
    | "chisquare"
    | "centralF"
    | "exponential"
    | "binomial"
    | "poisson"

export interface DistributionParams {
    // Normal
    mu?: number
    sigma?: number
    // Student-t, Chi2
    df?: number
    // F-Fisher
    df1?: number
    df2?: number
    // Exponential, Poisson
    lambda?: number
    // Binomial
    n?: number
    p?: number
}

export interface DistributionMeta {
    id: DistributionType
    name: string
    isDiscrete: boolean
    category: "Continua" | "Discreta"
    formulaKaTeX: string
    meanKaTeX: string
    varKaTeX: string
    defaultParams: DistributionParams
    xRange: [number, number]
}

export const DISTRIBUTIONS_REGISTRY: Record<DistributionType, DistributionMeta> = {
    normal: {
        id: "normal",
        name: "Distribución Normal (Gaussiana)",
        isDiscrete: false,
        category: "Continua",
        formulaKaTeX: "f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right)",
        meanKaTeX: "E[X] = \\mu",
        varKaTeX: "\\text{Var}(X) = \\sigma^2",
        defaultParams: { mu: 0, sigma: 1 },
        xRange: [-4, 4]
    },
    studentt: {
        id: "studentt",
        name: "Distribución t de Student",
        isDiscrete: false,
        category: "Continua",
        formulaKaTeX: "f(t) = \\frac{\\Gamma((\\nu+1)/2)}{\\sqrt{\\nu\\pi}\\Gamma(\\nu/2)} \\left(1 + \\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}",
        meanKaTeX: "E[X] = 0 \\quad (\\nu > 1)",
        varKaTeX: "\\text{Var}(X) = \\frac{\\nu}{\\nu - 2} \\quad (\\nu > 2)",
        defaultParams: { df: 10 },
        xRange: [-4, 4]
    },
    chisquare: {
        id: "chisquare",
        name: "Distribución Chi-Cuadrado (\\chi^2)",
        isDiscrete: false,
        category: "Continua",
        formulaKaTeX: "f(x) = \\frac{1}{2^{k/2}\\Gamma(k/2)} x^{k/2-1} e^{-x/2} \\quad (x > 0)",
        meanKaTeX: "E[X] = k",
        varKaTeX: "\\text{Var}(X) = 2k",
        defaultParams: { df: 4 },
        xRange: [0, 16]
    },
    centralF: {
        id: "centralF",
        name: "Distribución F de Fisher-Snedecor",
        isDiscrete: false,
        category: "Continua",
        formulaKaTeX: "f(x) = \\frac{1}{B(d_1/2, d_2/2)} \\left(\\frac{d_1}{d_2}\\right)^{\\frac{d_1}{2}} x^{\\frac{d_1}{2}-1} \\left(1 + \\frac{d_1}{d_2}x\\right)^{-\\frac{d_1+d_2}{2}}",
        meanKaTeX: "E[X] = \\frac{d_2}{d_2 - 2} \\quad (d_2 > 2)",
        varKaTeX: "\\text{Var}(X) = \\frac{2d_2^2(d_1+d_2-2)}{d_1(d_2-2)^2(d_2-4)} \\quad (d_2 > 4)",
        defaultParams: { df1: 5, df2: 10 },
        xRange: [0, 5]
    },
    exponential: {
        id: "exponential",
        name: "Distribución Exponencial",
        isDiscrete: false,
        category: "Continua",
        formulaKaTeX: "f(x) = \\lambda e^{-\\lambda x} \\quad (x \\ge 0)",
        meanKaTeX: "E[X] = \\frac{1}{\\lambda}",
        varKaTeX: "\\text{Var}(X) = \\frac{1}{\\lambda^2}",
        defaultParams: { lambda: 1.0 },
        xRange: [0, 6]
    },
    binomial: {
        id: "binomial",
        name: "Distribución Binomial",
        isDiscrete: true,
        category: "Discreta",
        formulaKaTeX: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}",
        meanKaTeX: "E[X] = n p",
        varKaTeX: "\\text{Var}(X) = n p (1 - p)",
        defaultParams: { n: 10, p: 0.4 },
        xRange: [0, 10]
    },
    poisson: {
        id: "poisson",
        name: "Distribución de Poisson",
        isDiscrete: true,
        category: "Discreta",
        formulaKaTeX: "P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
        meanKaTeX: "E[X] = \\lambda",
        varKaTeX: "\\text{Var}(X) = \\lambda",
        defaultParams: { lambda: 4.0 },
        xRange: [0, 14]
    }
}

export function computePDF(type: DistributionType, x: number, params: DistributionParams): number {
    try {
        switch (type) {
            case "normal":
                return jStat.normal.pdf(x, params.mu ?? 0, params.sigma ?? 1)
            case "studentt":
                return jStat.studentt.pdf(x, params.df ?? 10)
            case "chisquare":
                if (x <= 0) return 0
                return jStat.chisquare.pdf(x, params.df ?? 4)
            case "centralF":
                if (x <= 0) return 0
                return jStat.centralF.pdf(x, params.df1 ?? 5, params.df2 ?? 10)
            case "exponential":
                if (x < 0) return 0
                return jStat.exponential.pdf(x, params.lambda ?? 1)
            case "binomial": {
                const k = Math.round(x)
                if (k < 0 || k > (params.n ?? 10)) return 0
                return jStat.binomial.pdf(k, params.n ?? 10, params.p ?? 0.5)
            }
            case "poisson": {
                const k = Math.round(x)
                if (k < 0) return 0
                return jStat.poisson.pdf(k, params.lambda ?? 4)
            }
            default:
                return 0
        }
    } catch {
        return 0
    }
}

export function computeCDF(type: DistributionType, x: number, params: DistributionParams): number {
    try {
        switch (type) {
            case "normal":
                return jStat.normal.cdf(x, params.mu ?? 0, params.sigma ?? 1)
            case "studentt":
                return jStat.studentt.cdf(x, params.df ?? 10)
            case "chisquare":
                if (x <= 0) return 0
                return jStat.chisquare.cdf(x, params.df ?? 4)
            case "centralF":
                if (x <= 0) return 0
                return jStat.centralF.cdf(x, params.df1 ?? 5, params.df2 ?? 10)
            case "exponential":
                if (x <= 0) return 0
                return jStat.exponential.cdf(x, params.lambda ?? 1)
            case "binomial": {
                const k = Math.floor(x)
                if (k < 0) return 0
                if (k >= (params.n ?? 10)) return 1
                return jStat.binomial.cdf(k, params.n ?? 10, params.p ?? 0.5)
            }
            case "poisson": {
                const k = Math.floor(x)
                if (k < 0) return 0
                return jStat.poisson.cdf(k, params.lambda ?? 4)
            }
            default:
                return 0
        }
    } catch {
        return 0
    }
}

export function computeQuantile(type: DistributionType, p: number, params: DistributionParams): number {
    if (p <= 0) return -Infinity
    if (p >= 1) return Infinity
    try {
        switch (type) {
            case "normal":
                return jStat.normal.inv(p, params.mu ?? 0, params.sigma ?? 1)
            case "studentt":
                return jStat.studentt.inv(p, params.df ?? 10)
            case "chisquare":
                return jStat.chisquare.inv(p, params.df ?? 4)
            case "centralF":
                return jStat.centralF.inv(p, params.df1 ?? 5, params.df2 ?? 10)
            case "exponential":
                return jStat.exponential.inv(p, params.lambda ?? 1)
            case "binomial": {
                const n = params.n ?? 10
                for (let k = 0; k <= n; k++) {
                    if (computeCDF("binomial", k, params) >= p) return k
                }
                return n
            }
            case "poisson": {
                for (let k = 0; k <= 50; k++) {
                    if (computeCDF("poisson", k, params) >= p) return k
                }
                return 50
            }
            default:
                return 0
        }
    } catch {
        return 0
    }
}

// ==========================================
// 2. QUEUEING THEORY ENGINE
// ==========================================

export function factorial(n: number): number {
    let r = 1
    for (let i = 2; i <= n; i++) r *= i
    return r
}

export interface QueueingResults {
    model: "M/M/1" | "M/M/s" | "M/M/s/K"
    lambda: number
    mu: number
    s: number
    K?: number
    rho: number
    isStable: boolean
    P0: number
    Pn: number[]
    L: number
    Lq: number
    W: number
    Wq: number
    pWait?: number
    pLoss?: number
    lambdaEff: number
    serverCost: number
    waitingCost: number
    totalCost: number
}

export function solveQueueingModel(
    model: "M/M/1" | "M/M/s" | "M/M/s/K",
    lambda: number,
    mu: number,
    s: number,
    K: number,
    costPerServer: number,
    costPerWaiting: number
): QueueingResults {
    const maxN = 16
    const Pn: number[] = []

    if (model === "M/M/1") {
        const rho = lambda / mu
        const isStable = rho < 1
        const P0 = isStable ? 1 - rho : 0
        for (let n = 0; n < maxN; n++) {
            Pn.push(isStable ? P0 * Math.pow(rho, n) : 0)
        }
        const Lq = isStable ? (rho * rho) / (1 - rho) : Infinity
        const L = isStable ? rho / (1 - rho) : Infinity
        const Wq = isStable ? rho / (mu - lambda) : Infinity
        const W = isStable ? 1 / (mu - lambda) : Infinity
        const pWait = isStable ? rho : 1
        const serverCost = 1 * costPerServer
        const waitingCost = isStable ? Lq * costPerWaiting : Infinity
        const totalCost = serverCost + waitingCost

        return {
            model,
            lambda,
            mu,
            s: 1,
            rho,
            isStable,
            P0,
            Pn,
            L,
            Lq,
            W,
            Wq,
            pWait,
            lambdaEff: lambda,
            serverCost,
            waitingCost,
            totalCost
        }
    }

    if (model === "M/M/s") {
        const rho = lambda / (s * mu)
        const isStable = rho < 1
        const r = lambda / mu

        let sumP0 = 0
        for (let n = 0; n < s; n++) {
            sumP0 += Math.pow(r, n) / factorial(n)
        }
        const lastP0 = Math.pow(r, s) / (factorial(s) * (1 - rho))
        const P0 = isStable ? 1 / (sumP0 + lastP0) : 0

        for (let n = 0; n < maxN; n++) {
            if (!isStable) {
                Pn.push(0)
            } else if (n <= s) {
                Pn.push((Math.pow(r, n) / factorial(n)) * P0)
            } else {
                Pn.push((Math.pow(r, n) / (factorial(s) * Math.pow(s, n - s))) * P0)
            }
        }

        const ErlangC = isStable ? (P0 * Math.pow(r, s)) / (factorial(s) * (1 - rho)) : 1
        const Lq = isStable ? (ErlangC * rho) / (1 - rho) : Infinity
        const Wq = isStable ? Lq / lambda : Infinity
        const W = isStable ? Wq + 1 / mu : Infinity
        const L = isStable ? lambda * W : Infinity
        const serverCost = s * costPerServer
        const waitingCost = isStable ? Lq * costPerWaiting : Infinity
        const totalCost = serverCost + waitingCost

        return {
            model,
            lambda,
            mu,
            s,
            rho,
            isStable,
            P0,
            Pn,
            L,
            Lq,
            W,
            Wq,
            pWait: ErlangC,
            lambdaEff: lambda,
            serverCost,
            waitingCost,
            totalCost
        }
    }

    // M/M/s/K
    const effectiveK = Math.max(s, K)
    const r = lambda / mu
    const rho = lambda / (s * mu)
    const c: number[] = []

    for (let n = 0; n <= effectiveK; n++) {
        if (n <= s) {
            c[n] = Math.pow(r, n) / factorial(n)
        } else {
            c[n] = Math.pow(r, n) / (factorial(s) * Math.pow(s, n - s))
        }
    }

    const sumC = c.reduce((a, b) => a + b, 0)
    const P0 = 1 / sumC
    const fullPn = c.map((cn) => cn * P0)

    for (let n = 0; n < maxN; n++) {
        Pn.push(n <= effectiveK ? fullPn[n] : 0)
    }

    const pLoss = fullPn[effectiveK]
    const lambdaEff = lambda * (1 - pLoss)

    let L = 0
    for (let n = 0; n <= effectiveK; n++) {
        L += n * fullPn[n]
    }

    let Lq = 0
    for (let n = s; n <= effectiveK; n++) {
        Lq += (n - s) * fullPn[n]
    }

    const W = lambdaEff > 0 ? L / lambdaEff : 0
    const Wq = lambdaEff > 0 ? Lq / lambdaEff : 0
    const serverCost = s * costPerServer
    const waitingCost = Lq * costPerWaiting
    const totalCost = serverCost + waitingCost

    return {
        model,
        lambda,
        mu,
        s,
        K: effectiveK,
        rho,
        isStable: true, // Finite capacity queues are always stationary
        P0,
        Pn,
        L,
        Lq,
        W,
        Wq,
        pLoss,
        lambdaEff,
        serverCost,
        waitingCost,
        totalCost
    }
}

// ==========================================
// 3. MARKOV CHAINS ENGINE
// ==========================================

export function multiplyMatrices(A: number[][], B: number[][]): number[][] {
    const n = A.length
    const C: number[][] = Array.from({ length: n }, () => new Array(n).fill(0))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0
            for (let k = 0; k < n; k++) {
                sum += A[i][k] * B[k][j]
            }
            C[i][j] = sum
        }
    }
    return C
}

export function matrixPower(P: number[][], steps: number): number[][] {
    const n = P.length
    if (steps === 1) return P.map((row) => [...row])
    let result: number[][] = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    )
    let base = P.map((row) => [...row])
    let power = steps

    while (power > 0) {
        if (power % 2 === 1) {
            result = multiplyMatrices(result, base)
        }
        base = multiplyMatrices(base, base)
        power = Math.floor(power / 2)
    }
    return result
}

export function solveMarkovSteadyState(P: number[][]): number[] {
    const n = P.length
    const A: number[][] = []
    const b: number[] = []

    for (let i = 0; i < n - 1; i++) {
        A[i] = []
        for (let j = 0; j < n; j++) {
            A[i][j] = P[j][i] - (i === j ? 1 : 0)
        }
        b[i] = 0
    }
    A[n - 1] = new Array(n).fill(1)
    b[n - 1] = 1

    for (let i = 0; i < n; i++) {
        let maxRow = i
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k
        }
        const tempA = A[i]
        A[i] = A[maxRow]
        A[maxRow] = tempA
        const tempB = b[i]
        b[i] = b[maxRow]
        b[maxRow] = tempB

        if (Math.abs(A[i][i]) < 1e-12) continue

        for (let k = i + 1; k < n; k++) {
            const factor = A[k][i] / A[i][i]
            for (let j = i; j < n; j++) {
                A[k][j] -= factor * A[i][j]
            }
            b[k] -= factor * b[i]
        }
    }

    const pi = new Array(n).fill(0)
    for (let i = n - 1; i >= 0; i--) {
        let sum = b[i]
        for (let j = i + 1; j < n; j++) {
            sum -= A[i][j] * pi[j]
        }
        pi[i] = Math.abs(A[i][i]) > 1e-12 ? sum / A[i][i] : 0
    }
    return pi
}

// ==========================================
// 4. ENGINEERING ECONOMICS ENGINE
// ==========================================

export function computeNPV(rate: number, initialInvestment: number, cashFlows: number[]): number {
    let npv = -initialInvestment
    for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + rate, t + 1)
    }
    return npv
}

export function computeIRR(initialInvestment: number, cashFlows: number[]): number | null {
    let low = -0.5
    let high = 3.0
    const npvLow = computeNPV(low, initialInvestment, cashFlows)
    const npvHigh = computeNPV(high, initialInvestment, cashFlows)

    if (npvLow * npvHigh > 0) {
        high = 10.0
        if (computeNPV(low, initialInvestment, cashFlows) * computeNPV(high, initialInvestment, cashFlows) > 0) {
            return null
        }
    }

    for (let iter = 0; iter < 100; iter++) {
        const mid = (low + high) / 2
        const val = computeNPV(mid, initialInvestment, cashFlows)
        if (Math.abs(val) < 1e-6) return mid
        if (val > 0) {
            low = mid
        } else {
            high = mid
        }
    }
    return (low + high) / 2
}

export function computePayback(
    initialInvestment: number,
    cashFlows: number[],
    rate: number
): { simplePayback: number | null; discountedPayback: number | null } {
    let accumSimple = 0
    let simplePayback: number | null = null
    for (let t = 0; t < cashFlows.length; t++) {
        const prev = accumSimple
        accumSimple += cashFlows[t]
        if (accumSimple >= initialInvestment && simplePayback === null) {
            const fraction = (initialInvestment - prev) / (cashFlows[t] || 1)
            simplePayback = t + Math.max(0, Math.min(1, fraction))
        }
    }

    let accumDisc = 0
    let discountedPayback: number | null = null
    for (let t = 0; t < cashFlows.length; t++) {
        const prev = accumDisc
        const discFlow = cashFlows[t] / Math.pow(1 + rate, t + 1)
        accumDisc += discFlow
        if (accumDisc >= initialInvestment && discountedPayback === null) {
            const fraction = (initialInvestment - prev) / (discFlow || 1)
            discountedPayback = t + Math.max(0, Math.min(1, fraction))
        }
    }

    return { simplePayback, discountedPayback }
}

export function computeBenefitCostRatio(
    initialInvestment: number,
    cashFlows: number[],
    rate: number
): number {
    let presentValueOfBenefits = 0
    let presentValueOfCosts = initialInvestment

    for (let t = 0; t < cashFlows.length; t++) {
        const flow = cashFlows[t]
        const disc = flow / Math.pow(1 + rate, t + 1)
        if (disc >= 0) {
            presentValueOfBenefits += disc
        } else {
            presentValueOfCosts += Math.abs(disc)
        }
    }

    return presentValueOfCosts > 0 ? presentValueOfBenefits / presentValueOfCosts : 0
}

// ==========================================
// 5. LINEAR PROGRAMMING & TWO-PHASE SIMPLEX
// ==========================================

export interface LPConstraint {
    coeffs: number[]
    op: "<=" | ">=" | "="
    rhs: number
}

export interface SimplexStepTableau {
    stepIndex: number
    description: string
    tableau: number[][]
    basis: number[]
    colHeaders: string[]
    rowHeaders: string[]
    pivotRow?: number
    pivotCol?: number
    enteringVar?: string
    leavingVar?: string
    isOptimal: boolean
}

export interface LPSolverResult {
    status: "optimal" | "infeasible" | "unbounded"
    objectiveValue: number
    solution: number[]
    shadowPrices: number[]
    reducedCosts: number[]
    steps: SimplexStepTableau[]
}

export function solvePrimalSimplex(
    obj: number[],
    constraints: LPConstraint[],
    sense: "max" | "min" = "max"
): LPSolverResult {
    const m = constraints.length
    const n = obj.length
    const steps: SimplexStepTableau[] = []

    const standardized = constraints.map((c) => {
        let rhs = c.rhs
        let coeffs = [...c.coeffs]
        let op = c.op
        if (rhs < -1e-12) {
            rhs = -rhs
            coeffs = coeffs.map((v) => -v)
            if (op === "<=") op = ">="
            else if (op === ">=") op = "<="
        }
        return { coeffs, op, rhs }
    })

    let numSlack = 0
    let numSurplus = 0
    let numArtificial = 0
    standardized.forEach((c) => {
        if (c.op === "<=") numSlack++
        else if (c.op === ">=") {
            numSurplus++
            numArtificial++
        } else if (c.op === "=") numArtificial++
    })

    const totalVars = n + numSlack + numSurplus + numArtificial
    const colHeaders: string[] = []
    for (let j = 1; j <= n; j++) colHeaders.push(`x_${j}`)
    for (let j = 1; j <= numSlack; j++) colHeaders.push(`s_${j}`)
    for (let j = 1; j <= numSurplus; j++) colHeaders.push(`e_${j}`)
    for (let j = 1; j <= numArtificial; j++) colHeaders.push(`a_${j}`)
    colHeaders.push("RHS")

    const A: number[][] = Array.from({ length: m }, () => new Array(totalVars).fill(0))
    const b: number[] = new Array(m).fill(0)
    const basis: number[] = new Array(m).fill(-1)
    const artificialCols: number[] = []

    let curSlack = n
    let curSurplus = n + numSlack
    let curArt = n + numSlack + numSurplus

    for (let i = 0; i < m; i++) {
        const c = standardized[i]
        b[i] = c.rhs
        for (let j = 0; j < n; j++) A[i][j] = c.coeffs[j]
        if (c.op === "<=") {
            A[i][curSlack] = 1
            basis[i] = curSlack
            curSlack++
        } else if (c.op === ">=") {
            A[i][curSurplus] = -1
            curSurplus++
            A[i][curArt] = 1
            artificialCols.push(curArt)
            basis[i] = curArt
            curArt++
        } else {
            A[i][curArt] = 1
            artificialCols.push(curArt)
            basis[i] = curArt
            curArt++
        }
    }

    function pivot(tab: number[][], rowIdx: number, colIdx: number) {
        const pVal = tab[rowIdx][colIdx]
        const width = tab[0].length
        for (let j = 0; j < width; j++) tab[rowIdx][j] /= pVal
        for (let r = 0; r < tab.length; r++) {
            if (r !== rowIdx) {
                const factor = tab[r][colIdx]
                if (Math.abs(factor) > 1e-12) {
                    for (let j = 0; j < width; j++) {
                        tab[r][j] -= factor * tab[rowIdx][j]
                    }
                }
            }
        }
    }

    // Phase 1 (if artificials exist)
    if (numArtificial > 0) {
        const tab1 = Array.from({ length: m + 1 }, () => new Array(totalVars + 1).fill(0))
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < totalVars; j++) tab1[i + 1][j] = A[i][j]
            tab1[i + 1][totalVars] = b[i]
        }
        for (const aCol of artificialCols) tab1[0][aCol] = 1
        for (let i = 0; i < m; i++) {
            const artCol = basis[i]
            if (artificialCols.includes(artCol)) {
                for (let j = 0; j <= totalVars; j++) {
                    tab1[0][j] -= tab1[i + 1][j]
                }
            }
        }

        let p1Iter = 0
        while (p1Iter < 100) {
            p1Iter++
            let enterCol = -1
            let minVal = -1e-9
            for (let j = 0; j < totalVars; j++) {
                if (tab1[0][j] < minVal) {
                    minVal = tab1[0][j]
                    enterCol = j
                }
            }
            if (enterCol === -1) break

            let leaveRow = -1
            let minRatio = Infinity
            for (let i = 1; i <= m; i++) {
                const val = tab1[i][enterCol]
                if (val > 1e-9) {
                    const ratio = tab1[i][totalVars] / val
                    if (ratio < minRatio - 1e-12) {
                        minRatio = ratio
                        leaveRow = i
                    }
                }
            }
            if (leaveRow === -1) {
                return {
                    status: "infeasible",
                    objectiveValue: 0,
                    solution: new Array(n).fill(0),
                    shadowPrices: new Array(m).fill(0),
                    reducedCosts: new Array(n).fill(0),
                    steps
                }
            }
            basis[leaveRow - 1] = enterCol
            pivot(tab1, leaveRow, enterCol)
        }

        if (Math.abs(tab1[0][totalVars]) > 1e-4) {
            return {
                status: "infeasible",
                objectiveValue: 0,
                solution: new Array(n).fill(0),
                shadowPrices: new Array(m).fill(0),
                reducedCosts: new Array(n).fill(0),
                steps
            }
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < totalVars; j++) A[i][j] = tab1[i + 1][j]
            b[i] = tab1[i + 1][totalVars]
        }
    }

    // Phase 2 Tableau
    const tab2 = Array.from({ length: m + 1 }, () => new Array(totalVars + 1).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < totalVars; j++) tab2[i + 1][j] = A[i][j]
        tab2[i + 1][totalVars] = b[i]
    }

    // Row 0 canonical form
    for (let j = 0; j < n; j++) {
        tab2[0][j] = sense === "min" ? obj[j] : -obj[j]
    }

    for (let i = 0; i < m; i++) {
        const bCol = basis[i]
        const factor = tab2[0][bCol]
        if (Math.abs(factor) > 1e-12) {
            for (let j = 0; j <= totalVars; j++) {
                tab2[0][j] -= factor * tab2[i + 1][j]
            }
        }
    }

    // Step 0: Record initial tableau
    const getRowHeaders = (currBasis: number[]) => ["Z", ...currBasis.map((c) => colHeaders[c])]

    let iter = 0
    while (iter < 50) {
        let enterCol = -1
        let minVal = -1e-9
        for (let j = 0; j < totalVars - numArtificial; j++) {
            if (tab2[0][j] < minVal) {
                minVal = tab2[0][j]
                enterCol = j
            }
        }

        const isOptimal = enterCol === -1

        if (isOptimal) {
            steps.push({
                stepIndex: iter,
                description: `Iteración ${iter}: Condición de optimalidad satisfecha. No existen coeficientes negativos en el renglón de costos Z.`,
                tableau: tab2.map((r) => [...r]),
                basis: [...basis],
                colHeaders,
                rowHeaders: getRowHeaders(basis),
                isOptimal: true
            })
            break
        }

        // Ratio test
        let leaveRow = -1
        let minRatio = Infinity
        for (let i = 1; i <= m; i++) {
            const val = tab2[i][enterCol]
            if (val > 1e-9) {
                const ratio = tab2[i][totalVars] / val
                if (ratio < minRatio - 1e-12) {
                    minRatio = ratio
                    leaveRow = i
                }
            }
        }

        if (leaveRow === -1) {
            steps.push({
                stepIndex: iter,
                description: `Iteración ${iter}: Problema no acotado. La variable ${colHeaders[enterCol]} puede incrementarse indefinidamente.`,
                tableau: tab2.map((r) => [...r]),
                basis: [...basis],
                colHeaders,
                rowHeaders: getRowHeaders(basis),
                isOptimal: false
            })
            return {
                status: "unbounded",
                objectiveValue: Infinity,
                solution: new Array(n).fill(0),
                shadowPrices: new Array(m).fill(0),
                reducedCosts: new Array(n).fill(0),
                steps
            }
        }

        const enteringName = colHeaders[enterCol]
        const leavingName = colHeaders[basis[leaveRow - 1]]

        steps.push({
            stepIndex: iter,
            description: `Iteración ${iter}: Variable entrante: ${enteringName} (coeficiente ${tab2[0][enterCol].toFixed(3)}). Variable saliente: ${leavingName} (razón mínima $\\theta = ${minRatio.toFixed(3)}$). Pivote: ${tab2[leaveRow][enterCol].toFixed(3)}.`,
            tableau: tab2.map((r) => [...r]),
            basis: [...basis],
            colHeaders,
            rowHeaders: getRowHeaders(basis),
            pivotRow: leaveRow,
            pivotCol: enterCol,
            enteringVar: enteringName,
            leavingVar: leavingName,
            isOptimal: false
        })

        basis[leaveRow - 1] = enterCol
        pivot(tab2, leaveRow, enterCol)
        iter++
    }

    const solution = new Array(n).fill(0)
    for (let i = 0; i < m; i++) {
        const col = basis[i]
        if (col < n) {
            solution[col] = Math.max(0, tab2[i + 1][totalVars])
        }
    }

    const objectiveValue = sense === "min" ? -tab2[0][totalVars] : tab2[0][totalVars]

    // Shadow prices: slack variable coefficients in row 0
    const shadowPrices: number[] = []
    for (let s = 0; s < numSlack; s++) {
        shadowPrices.push(Math.abs(tab2[0][n + s]))
    }

    // Reduced costs for non-basic decision variables
    const reducedCosts: number[] = []
    for (let j = 0; j < n; j++) {
        reducedCosts.push(Math.abs(tab2[0][j]))
    }

    return {
        status: "optimal",
        objectiveValue,
        solution,
        shadowPrices,
        reducedCosts,
        steps
    }
}

// ==========================================
// 6. DATA ENVELOPMENT ANALYSIS (DEA) ENGINE
// ==========================================

export interface DMUData {
    id: string
    name: string
    inputs: number[]
    outputs: number[]
}

export interface DEAResult {
    id: string
    name: string
    inputs: number[]
    outputs: number[]
    theta: number
    isEfficient: boolean
    lambdas: number[]
    benchmarks: { name: string; weight: number }[]
    projectedInputs: number[]
}

export function solveDEACCR(dmus: DMUData[]): DEAResult[] {
    const numDMUs = dmus.length
    const numInputs = dmus[0].inputs.length
    const numOutputs = dmus[0].outputs.length

    return dmus.map((targetDMU, k) => {
        // Linear Program for DMU k:
        // Variables: [theta, lambda_0, lambda_1, ... lambda_{n-1}]
        // Min theta
        const obj = [1, ...new Array(numDMUs).fill(0)]
        const constraints: LPConstraint[] = []

        // Inputs constraints: - x_{ik} * theta + sum_j x_{ij} * lambda_j <= 0
        for (let i = 0; i < numInputs; i++) {
            const coeffs = [-targetDMU.inputs[i]]
            for (let j = 0; j < numDMUs; j++) coeffs.push(dmus[j].inputs[i])
            constraints.push({ coeffs, op: "<=", rhs: 0 })
        }

        // Outputs constraints: 0 * theta + sum_j y_{rj} * lambda_j >= y_{rk}
        for (let r = 0; r < numOutputs; r++) {
            const coeffs = [0]
            for (let j = 0; j < numDMUs; j++) coeffs.push(dmus[j].outputs[r])
            constraints.push({ coeffs, op: ">=", rhs: targetDMU.outputs[r] })
        }

        const res = solvePrimalSimplex(obj, constraints, "min")
        const thetaRaw = res.status === "optimal" ? res.solution[0] : 1
        const theta = Math.min(1.0, Math.max(0, thetaRaw))
        const lambdas = res.status === "optimal" ? res.solution.slice(1) : []

        const benchmarks: { name: string; weight: number }[] = []
        lambdas.forEach((w, idx) => {
            if (w > 1e-4 && idx !== k) {
                benchmarks.push({ name: dmus[idx].name, weight: w })
            }
        })

        const projectedInputs = targetDMU.inputs.map((inp) => inp * theta)

        return {
            id: targetDMU.id,
            name: targetDMU.name,
            inputs: targetDMU.inputs,
            outputs: targetDMU.outputs,
            theta,
            isEfficient: Math.abs(theta - 1.0) < 1e-4,
            lambdas,
            benchmarks,
            projectedInputs
        }
    })
}
