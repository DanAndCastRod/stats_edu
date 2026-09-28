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

// ==========================================
// 6. STATISTICAL PROCESS CONTROL (SPC) ENGINE
// ==========================================

export interface SPCSubgroup {
    subgroupId: number
    values: number[]
}

export interface SPCFactorsTable {
    A2: number
    D3: number
    D4: number
    d2: number
}

export const SHEWHART_FACTORS: Record<number, SPCFactorsTable> = {
    2: { A2: 1.880, D3: 0, D4: 3.267, d2: 1.128 },
    3: { A2: 1.023, D3: 0, D4: 2.574, d2: 1.693 },
    4: { A2: 0.729, D3: 0, D4: 2.282, d2: 2.059 },
    5: { A2: 0.577, D3: 0, D4: 2.114, d2: 2.326 },
    6: { A2: 0.483, D3: 0, D4: 2.004, d2: 2.534 },
    7: { A2: 0.419, D3: 0.076, D4: 1.924, d2: 2.704 },
    8: { A2: 0.373, D3: 0.136, D4: 1.864, d2: 2.847 },
    9: { A2: 0.337, D3: 0.184, D4: 1.816, d2: 2.970 },
    10: { A2: 0.308, D3: 0.223, D4: 1.777, d2: 3.078 }
}

export interface SPCXRResult {
    subgroupCount: number
    sampleSize: number
    xMeans: number[]
    rValues: number[]
    xDoubleBar: number
    rBar: number
    sigmaHat: number
    xBarChart: {
        ucl: number
        cl: number
        lcl: number
        outOfControl: number[]
    }
    rChart: {
        ucl: number
        cl: number
        lcl: number
        outOfControl: number[]
    }
    capability?: {
        lsl: number
        usl: number
        target?: number
        cp: number
        cpk: number
        cpl: number
        cpu: number
        cpm: number
        ppmDefect: number
        sigmaLevel: number
    }
}

export function calculateSPCXR(
    subgroups: SPCSubgroup[],
    specLimits?: { lsl: number; usl: number; target?: number }
): SPCXRResult {
    const k = subgroups.length
    if (k === 0) throw new Error("Se requiere al menos un subgrupo")
    const n = subgroups[0].values.length
    const factors = SHEWHART_FACTORS[n] || SHEWHART_FACTORS[5]

    const xMeans: number[] = []
    const rValues: number[] = []

    for (const sg of subgroups) {
        const vals = sg.values
        const mean = vals.reduce((a, b) => a + b, 0) / vals.length
        const r = Math.max(...vals) - Math.min(...vals)
        xMeans.push(mean)
        rValues.push(r)
    }

    const xDoubleBar = xMeans.reduce((a, b) => a + b, 0) / k
    const rBar = rValues.reduce((a, b) => a + b, 0) / k
    const sigmaHat = rBar / factors.d2

    // X-bar limits
    const xUCL = xDoubleBar + factors.A2 * rBar
    const xCL = xDoubleBar
    const xLCL = xDoubleBar - factors.A2 * rBar

    // R limits
    const rUCL = factors.D4 * rBar
    const rCL = rBar
    const rLCL = factors.D3 * rBar

    const xOutOfControl = xMeans
        .map((m, idx) => (m > xUCL || m < xLCL ? idx + 1 : -1))
        .filter((i) => i !== -1)

    const rOutOfControl = rValues
        .map((r, idx) => (r > rUCL || r < rLCL ? idx + 1 : -1))
        .filter((i) => i !== -1)

    let capability: SPCXRResult["capability"] = undefined

    if (specLimits && specLimits.usl > specLimits.lsl) {
        const { lsl, usl, target } = specLimits
        const cp = (usl - lsl) / (6 * sigmaHat)
        const cpu = (usl - xDoubleBar) / (3 * sigmaHat)
        const cpl = (xDoubleBar - lsl) / (3 * sigmaHat)
        const cpk = Math.min(cpu, cpl)

        const nom = typeof target === "number" ? target : (usl + lsl) / 2
        const tau = Math.sqrt(Math.pow(sigmaHat, 2) + Math.pow(xDoubleBar - nom, 2))
        const cpm = (usl - lsl) / (6 * tau)

        // PPM defects using normal CDF
        const pUpper = 1 - jStat.normal.cdf(usl, xDoubleBar, sigmaHat)
        const pLower = jStat.normal.cdf(lsl, xDoubleBar, sigmaHat)
        const ppmDefect = Math.round((pUpper + pLower) * 1_000_000)
        const sigmaLevel = Number((cpk * 3).toFixed(2))

        capability = {
            lsl,
            usl,
            target: nom,
            cp: Number(cp.toFixed(3)),
            cpk: Number(cpk.toFixed(3)),
            cpl: Number(cpl.toFixed(3)),
            cpu: Number(cpu.toFixed(3)),
            cpm: Number(cpm.toFixed(3)),
            ppmDefect,
            sigmaLevel
        }
    }

    return {
        subgroupCount: k,
        sampleSize: n,
        xMeans: xMeans.map((v) => Number(v.toFixed(3))),
        rValues: rValues.map((v) => Number(v.toFixed(3))),
        xDoubleBar: Number(xDoubleBar.toFixed(3)),
        rBar: Number(rBar.toFixed(3)),
        sigmaHat: Number(sigmaHat.toFixed(4)),
        xBarChart: {
            ucl: Number(xUCL.toFixed(3)),
            cl: Number(xCL.toFixed(3)),
            lcl: Number(xLCL.toFixed(3)),
            outOfControl: xOutOfControl
        },
        rChart: {
            ucl: Number(rUCL.toFixed(3)),
            cl: Number(rCL.toFixed(3)),
            lcl: Number(rLCL.toFixed(3)),
            outOfControl: rOutOfControl
        },
        capability
    }
}

// ==========================================
// 7. INVENTORY OPTIMIZATION ENGINE (EOQ / ROP)
// ==========================================

export interface InventoryParams {
    annualDemand: number       // D (unidades/año)
    orderCost: number          // S ($/pedido)
    holdingCost: number        // H ($/unidad/año)
    unitCost?: number          // C ($/unidad)
    leadTimeDays: number       // L (días)
    workingDaysPerYear?: number // default 300 o 365
    dailyDemandStdDev?: number  // sigma_d
    serviceLevelPercent?: number // 90, 95, 99
}

export interface InventoryResult {
    eoq: number                // Q*
    ordersPerYear: number      // N
    cycleTimeDays: number      // T (días)
    annualOrderingCost: number // (D/Q)*S
    annualHoldingCost: number  // (Q/2)*H
    totalInventoryCost: number // Ordering + Holding
    totalAnnualCost?: number   // Total + D*C
    dailyDemand: number        // d
    leadTimeDemand: number     // d * L
    safetyStock: number        // SS = Z * sigma_L
    reorderPoint: number       // ROP = d*L + SS
    zFactor: number
    costSensitivity: { q: number; ordering: number; holding: number; total: number }[]
}

export function calculateInventoryOptimization(params: InventoryParams): InventoryResult {
    const {
        annualDemand: D,
        orderCost: S,
        holdingCost: H,
        unitCost: C = 0,
        leadTimeDays: L,
        workingDaysPerYear = 300,
        dailyDemandStdDev: sigmaD = 0,
        serviceLevelPercent = 95
    } = params

    if (D <= 0 || S <= 0 || H <= 0) {
        throw new Error("Demanda, costo de orden y costo de mantener deben ser mayores a cero.")
    }

    const eoq = Math.round(Math.sqrt((2 * D * S) / H))
    const ordersPerYear = Number((D / eoq).toFixed(2))
    const cycleTimeDays = Number(((eoq / D) * workingDaysPerYear).toFixed(1))
    const annualOrderingCost = (D / eoq) * S
    const annualHoldingCost = (eoq / 2) * H
    const totalInventoryCost = annualOrderingCost + annualHoldingCost
    const totalAnnualCost = totalInventoryCost + (C > 0 ? D * C : 0)

    const dailyDemand = D / workingDaysPerYear
    const leadTimeDemand = dailyDemand * L

    // Service level Z
    const zMap: Record<number, number> = {
        90: 1.282,
        95: 1.645,
        97.5: 1.96,
        98: 2.054,
        99: 2.326,
        99.9: 3.09
    }
    const zFactor = zMap[serviceLevelPercent] || 1.645
    const sigmaL = Math.sqrt(L) * sigmaD
    const safetyStock = Math.round(zFactor * sigmaL)
    const reorderPoint = Math.round(leadTimeDemand + safetyStock)

    // Cost Sensitivity Curve
    const costSensitivity: InventoryResult["costSensitivity"] = []
    const qMin = Math.max(10, Math.round(eoq * 0.3))
    const qMax = Math.round(eoq * 2.2)
    const step = Math.max(5, Math.round((qMax - qMin) / 15))

    for (let q = qMin; q <= qMax; q += step) {
        const ord = (D / q) * S
        const hld = (q / 2) * H
        costSensitivity.push({
            q,
            ordering: Number(ord.toFixed(1)),
            holding: Number(hld.toFixed(1)),
            total: Number((ord + hld).toFixed(1))
        })
    }

    return {
        eoq,
        ordersPerYear,
        cycleTimeDays,
        annualOrderingCost: Number(annualOrderingCost.toFixed(2)),
        annualHoldingCost: Number(annualHoldingCost.toFixed(2)),
        totalInventoryCost: Number(totalInventoryCost.toFixed(2)),
        totalAnnualCost: C > 0 ? Number(totalAnnualCost.toFixed(2)) : undefined,
        dailyDemand: Number(dailyDemand.toFixed(2)),
        leadTimeDemand: Number(leadTimeDemand.toFixed(1)),
        safetyStock,
        reorderPoint,
        zFactor,
        costSensitivity
    }
}

// ==========================================
// 8. TIME SERIES FORECASTING ENGINE
// ==========================================

export type ForecastingMethod = "sma" | "ses" | "holt"

export interface ForecastingPoint {
    period: number
    actual: number
    forecast?: number
    error?: number
    absError?: number
    sqError?: number
    pctError?: number
}

export interface ForecastingResult {
    method: ForecastingMethod
    methodLabel: string
    params: { alpha?: number; beta?: number; window?: number }
    series: ForecastingPoint[]
    nextForecast: number
    metrics: {
        mad: number
        mse: number
        rmse: number
        mape: number
        trackingSignal: number
    }
}

export function calculateForecasting(
    actuals: number[],
    method: ForecastingMethod,
    options: { alpha?: number; beta?: number; window?: number } = {}
): ForecastingResult {
    const n = actuals.length
    if (n < 4) throw new Error("Se requieren al menos 4 períodos históricos.")

    const alpha = options.alpha ?? 0.3
    const beta = options.beta ?? 0.2
    const window = options.window ?? 3

    const series: ForecastingPoint[] = []
    let nextForecast = 0

    if (method === "sma") {
        for (let t = 0; t < n; t++) {
            if (t < window) {
                series.push({ period: t + 1, actual: actuals[t] })
            } else {
                const slice = actuals.slice(t - window, t)
                const f = slice.reduce((a, b) => a + b, 0) / window
                const err = actuals[t] - f
                series.push({
                    period: t + 1,
                    actual: actuals[t],
                    forecast: Number(f.toFixed(2)),
                    error: Number(err.toFixed(2)),
                    absError: Number(Math.abs(err).toFixed(2)),
                    sqError: Number(Math.pow(err, 2).toFixed(2)),
                    pctError: Number((Math.abs(err / actuals[t]) * 100).toFixed(2))
                })
            }
        }
        const lastSlice = actuals.slice(n - window, n)
        nextForecast = Number((lastSlice.reduce((a, b) => a + b, 0) / window).toFixed(2))
    } else if (method === "ses") {
        let prevF = actuals[0]
        series.push({ period: 1, actual: actuals[0], forecast: prevF })

        for (let t = 1; t < n; t++) {
            const f = alpha * actuals[t - 1] + (1 - alpha) * prevF
            const err = actuals[t] - f
            series.push({
                period: t + 1,
                actual: actuals[t],
                forecast: Number(f.toFixed(2)),
                error: Number(err.toFixed(2)),
                absError: Number(Math.abs(err).toFixed(2)),
                sqError: Number(Math.pow(err, 2).toFixed(2)),
                pctError: Number((Math.abs(err / actuals[t]) * 100).toFixed(2))
            })
            prevF = f
        }
        nextForecast = Number((alpha * actuals[n - 1] + (1 - alpha) * prevF).toFixed(2))
    } else if (method === "holt") {
        let level = actuals[0]
        let trend = actuals[1] - actuals[0]
        series.push({ period: 1, actual: actuals[0], forecast: actuals[0] })

        for (let t = 1; t < n; t++) {
            const f = level + trend
            const err = actuals[t] - f
            const prevLevel = level
            level = alpha * actuals[t] + (1 - alpha) * (prevLevel + trend)
            trend = beta * (level - prevLevel) + (1 - beta) * trend

            series.push({
                period: t + 1,
                actual: actuals[t],
                forecast: Number(f.toFixed(2)),
                error: Number(err.toFixed(2)),
                absError: Number(Math.abs(err).toFixed(2)),
                sqError: Number(Math.pow(err, 2).toFixed(2)),
                pctError: Number((Math.abs(err / actuals[t]) * 100).toFixed(2))
            })
        }
        nextForecast = Number((level + trend).toFixed(2))
    }

    const evaluable = series.filter((p) => typeof p.error === "number")
    const mCount = evaluable.length
    const sumAbsErr = evaluable.reduce((acc, p) => acc + (p.absError || 0), 0)
    const sumSqErr = evaluable.reduce((acc, p) => acc + (p.sqError || 0), 0)
    const sumPctErr = evaluable.reduce((acc, p) => acc + (p.pctError || 0), 0)
    const sumErr = evaluable.reduce((acc, p) => acc + (p.error || 0), 0)

    const mad = mCount > 0 ? sumAbsErr / mCount : 0
    const mse = mCount > 0 ? sumSqErr / mCount : 0
    const rmse = Math.sqrt(mse)
    const mape = mCount > 0 ? sumPctErr / mCount : 0
    const trackingSignal = mad > 0 ? sumErr / mad : 0

    const labels: Record<ForecastingMethod, string> = {
        sma: `Promedio Móvil Simple (k = ${window})`,
        ses: `Suavizamiento Exponencial Simple (α = ${alpha})`,
        holt: `Modelo Lineal de Holt (α = ${alpha}, β = ${beta})`
    }

    return {
        method,
        methodLabel: labels[method],
        params: { alpha, beta, window },
        series,
        nextForecast,
        metrics: {
            mad: Number(mad.toFixed(2)),
            mse: Number(mse.toFixed(2)),
            rmse: Number(rmse.toFixed(2)),
            mape: Number(mape.toFixed(2)),
            trackingSignal: Number(trackingSignal.toFixed(2))
        }
    }
}

// ==========================================
// 9. CPM / PERT PROJECT NETWORK ENGINE
// ==========================================

export interface CPMActivityInput {
    id: string
    name: string
    predecessors: string[] // IDs
    optimistic?: number    // a
    mostLikely?: number    // m
    pessimistic?: number   // b
    duration?: number      // deterministic
}

export interface CPMActivityCalculated {
    id: string
    name: string
    predecessors: string[]
    duration: number       // te
    variance: number       // sigma^2
    es: number             // Early Start
    ef: number             // Early Finish
    ls: number             // Late Start
    lf: number             // Late Finish
    slack: number          // Holgura Total = LS - ES
    isCritical: boolean
}

export interface CPMResult {
    activities: CPMActivityCalculated[]
    criticalPath: string[]
    projectDuration: number
    projectVariance: number
    projectStdDev: number
    completionProbability?: {
        targetTime: number
        zScore: number
        probabilityPercent: number
    }
}

export function solveCPMPERT(
    inputs: CPMActivityInput[],
    targetCompletionTime?: number
): CPMResult {
    if (inputs.length === 0) throw new Error("Se requiere al menos una actividad")

    // 1. Calculate duration and variance
    const calculated: Record<string, CPMActivityCalculated> = {}

    for (const inp of inputs) {
        let te = inp.duration ?? 0
        let v = 0
        if (
            typeof inp.optimistic === "number" &&
            typeof inp.mostLikely === "number" &&
            typeof inp.pessimistic === "number"
        ) {
            te = (inp.optimistic + 4 * inp.mostLikely + inp.pessimistic) / 6
            v = Math.pow((inp.pessimistic - inp.optimistic) / 6, 2)
        }
        calculated[inp.id] = {
            id: inp.id,
            name: inp.name,
            predecessors: inp.predecessors || [],
            duration: Number(te.toFixed(2)),
            variance: Number(v.toFixed(3)),
            es: 0,
            ef: 0,
            ls: 0,
            lf: 0,
            slack: 0,
            isCritical: false
        }
    }

    // 2. Forward Pass (ES & EF)
    let changed = true
    let iterations = 0
    while (changed && iterations < inputs.length * 2) {
        changed = false
        iterations++
        for (const id in calculated) {
            const act = calculated[id]
            let maxPredEF = 0
            for (const pId of act.predecessors) {
                if (calculated[pId] && calculated[pId].ef > maxPredEF) {
                    maxPredEF = calculated[pId].ef
                }
            }
            if (act.es !== maxPredEF) {
                act.es = maxPredEF
                act.ef = Number((act.es + act.duration).toFixed(2))
                changed = true
            }
        }
    }

    const projectDuration = Math.max(...Object.values(calculated).map((a) => a.ef))

    // 3. Backward Pass (LF & LS)
    // Find successors for each activity
    const successors: Record<string, string[]> = {}
    for (const id in calculated) successors[id] = []
    for (const id in calculated) {
        for (const pId of calculated[id].predecessors) {
            if (successors[pId]) successors[pId].push(id)
        }
    }

    // Initialize terminal nodes LF with projectDuration
    for (const id in calculated) {
        calculated[id].lf = projectDuration
        calculated[id].ls = Number((calculated[id].lf - calculated[id].duration).toFixed(2))
    }

    // Reverse topological or iterative backward pass
    changed = true
    iterations = 0
    while (changed && iterations < inputs.length * 2) {
        changed = false
        iterations++
        for (const id in calculated) {
            const act = calculated[id]
            const succs = successors[id]
            if (succs.length > 0) {
                const minSuccLS = Math.min(...succs.map((sId) => calculated[sId].ls))
                if (act.lf !== minSuccLS) {
                    act.lf = minSuccLS
                    act.ls = Number((act.lf - act.duration).toFixed(2))
                    changed = true
                }
            }
        }
    }

    // 4. Slack and Critical Path
    const criticalPath: string[] = []
    let projectVariance = 0

    for (const id in calculated) {
        const act = calculated[id]
        act.slack = Number(Math.max(0, act.ls - act.es).toFixed(2))
        act.isCritical = act.slack <= 0.05
        if (act.isCritical) {
            criticalPath.push(act.id)
            projectVariance += act.variance
        }
    }

    const projectStdDev = Math.sqrt(projectVariance)

    let completionProbability: CPMResult["completionProbability"] = undefined
    if (typeof targetCompletionTime === "number" && projectStdDev > 0) {
        const z = (targetCompletionTime - projectDuration) / projectStdDev
        const prob = jStat.normal.cdf(z, 0, 1)
        completionProbability = {
            targetTime: targetCompletionTime,
            zScore: Number(z.toFixed(2)),
            probabilityPercent: Number((prob * 100).toFixed(1))
        }
    }

    return {
        activities: Object.values(calculated),
        criticalPath,
        projectDuration: Number(projectDuration.toFixed(2)),
        projectVariance: Number(projectVariance.toFixed(3)),
        projectStdDev: Number(projectStdDev.toFixed(2)),
        completionProbability
    }
}
