import Link from "next/link"
import Image from "next/image"
import { Mermaid } from "./Mermaid"
import { PythonEditor } from "@/components/widgets/PythonEditor"
import { Quiz } from "@/components/widgets/Quiz"
import { StatsChart } from "./StatsChart"
import { VarianceExplainer } from "@/components/interactive/VarianceExplainer"
import {
    CLTSimulation,
    DraggableScatter,
    DistributionSliders,
    EmpiricalRule,
    RejectionRegion,
    BayesTree,
    ConfidenceInterval,
    SkewedHistogram,
    SamplingDistribution,
    TypeIIError,
    BoxPlotExplorer,
    RegressionLine,
    ProportionCI,
    TDistribution,
    SampleSizeCalculator,
    ChiSquareTest,
    PValueExplainer,
    OutlierDetector,
    NormalQQ,
    CorrelationMatrix,
    ANOVAVisualizer,
    ResidualPlot,
    HypothesisWizard,
    ProbabilityTree,
    DataTransformer,
    DiscreteDistributions,
    FDistribution,
    MontyHallSim,
    VennInteractions,
    CountingPrinciples,
    CorrelationGame
} from "@/components/charts"
import { Info, AlertTriangle, CheckCircle, Lightbulb, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// Custom styles for standard HTML elements to match Tailwind/Shadcn
export const components = {
    h1: (props: any) => (
        <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl border-b pb-4 mb-8 text-slate-900 dark:text-slate-50" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="mt-12 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-slate-800 dark:text-slate-100" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-200" {...props} />
    ),
    h4: (props: any) => (
        <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-slate-700 dark:text-slate-300" {...props} />
    ),
    p: (props: any) => (
        <p className="leading-8 [&:not(:first-child)]:mt-6 text-slate-600 dark:text-slate-400" {...props} />
    ),
    ul: (props: any) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-slate-600 dark:text-slate-400" {...props} />
    ),
    ol: (props: any) => (
        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-slate-600 dark:text-slate-400" {...props} />
    ),
    li: (props: any) => (
        <li className="pl-1" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="mt-8 border-l-4 border-brand-blue pl-6 italic bg-slate-50 dark:bg-slate-900/50 py-4 pr-4 rounded-r-lg" {...props} />
    ),
    img: (props: any) => (
        <div className="my-8 overflow-hidden rounded-xl border shadow-lg lg:-mx-4">
            <Image
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="transition-transform hover:scale-[1.01]"
                {...props}
            />
        </div>
    ),
    hr: (props: any) => <hr className="my-10 border-slate-200 dark:border-slate-800" {...props} />,
    a: (props: any) => (
        <Link className="inline-flex items-center gap-1 font-medium text-brand-blue hover:text-brand-blue/80 underline underline-offset-4 transition-colors" {...props}>
            {props.children}
            {typeof props.children === 'string' && props.href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
        </Link>
    ),
    pre: (props: any) => {
        // Safe access to children props to check for language
        const child = props.children
        const className = child?.props?.className || ""
        const isPython = className.includes("language-python")

        if (isPython) {
            // Helper to extract raw text from React children (recursively)
            // This is needed because rehype-highlight splits text into spans
            const extractText = (node: any): string => {
                if (typeof node === "string") return node
                if (typeof node === "number") return String(node)
                if (Array.isArray(node)) return node.map(extractText).join("")
                if (node?.props?.children) return extractText(node.props.children)
                return ""
            }

            const rawCode = extractText(child.props.children)
            return <PythonEditor initialCode={rawCode} />
        }

        return (
            <div className="relative group my-8">
                <pre className="overflow-x-auto rounded-xl border bg-slate-950 px-5 py-6 font-mono text-sm leading-relaxed text-slate-300 shadow-2xl backdrop-blur-md" {...props} />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-slate-900 px-2 py-1 rounded border border-slate-800 shadow-sm">
                        Code
                    </span>
                </div>
            </div>
        )
    },
    code: (props: any) => (
        <code className="relative rounded bg-slate-100 dark:bg-slate-800 px-[0.4rem] py-[0.15rem] font-mono text-[0.9em] font-medium text-slate-900 dark:text-slate-200" {...props} />
    ),
    // Table components
    table: (props: any) => (
        <div className="my-8 w-full overflow-y-auto rounded-lg border shadow-sm">
            <table className="w-full text-sm" {...props} />
        </div>
    ),
    thead: (props: any) => (
        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" {...props} />
    ),
    tr: (props: any) => (
        <tr className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border-b last:border-0 border-slate-100 dark:border-slate-800/50" {...props} />
    ),
    th: (props: any) => (
        <th className="h-12 px-4 text-left align-middle font-semibold text-slate-900 dark:text-slate-100 [b]:font-bold" {...props} />
    ),
    td: (props: any) => (
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 leading-relaxed" {...props} />
    ),
    // Custom Components
    Mermaid,
    PythonEditor,
    Quiz,
    StatsChart,
    VarianceExplainer,
    // Interactive Chart Components
    CLTSimulation,
    DraggableScatter,
    DistributionSliders,
    EmpiricalRule,
    RejectionRegion,
    BayesTree,
    ConfidenceInterval,
    SkewedHistogram,
    SamplingDistribution,
    TypeIIError,
    BoxPlotExplorer,
    RegressionLine,
    ProportionCI,
    TDistribution,
    SampleSizeCalculator,
    ChiSquareTest,
    PValueExplainer,
    OutlierDetector,
    NormalQQ,
    CorrelationMatrix,
    ANOVAVisualizer,
    ResidualPlot,
    HypothesisWizard,
    ProbabilityTree,
    DataTransformer,
    DiscreteDistributions,
    FDistribution,
    MontyHallSim,
    VennInteractions,
    CountingPrinciples,
    CorrelationGame,
    Callout: ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "success" | "note" }) => {
        const icons = {
            info: Info,
            warning: AlertTriangle,
            success: CheckCircle,
            note: Lightbulb
        }
        const colors = {
            info: "border-l-sky-500 bg-sky-50/50 dark:bg-sky-500/10 text-sky-900 dark:text-sky-300",
            warning: "border-l-amber-500 bg-amber-50/50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-300",
            success: "border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-300",
            note: "border-l-brand-blue bg-slate-50/50 dark:bg-slate-500/10 text-slate-900 dark:text-slate-100"
        }
        const Icon = icons[type] || Info

        return (
            <div className={
                cn(
                    "my-8 flex items-start gap-4 rounded-xl border border-l-[6px] p-5 shadow-sm transition-all hover:shadow-md",
                    colors[type]
                )
            } >
                <Icon className="h-6 w-6 shrink-0 mt-0.5" />
                <div className="flex-1 text-[0.95em] leading-relaxed prose-p:my-0">
                    {children}
                </div>
            </div >
        )
    }
}
