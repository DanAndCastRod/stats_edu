"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, BookOpen, CheckCircle2, Circle } from "lucide-react"

interface Topic {
    id: string
    title: string
    slug: string
    order: number
}

interface Week {
    id: string
    title: string
    number: number
    topics: Topic[]
}

interface Module {
    id: string
    title: string
    order: number
    weeks: Week[]
}

interface CourseSidebarProps {
    course: {
        title: string
        code: string
        slug: string
        modules: Module[]
    }
}

export function CourseSidebar({ course }: CourseSidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="w-80 h-full border-r bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl shrink-0">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/20">
                        {course.code.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue">Curso Activo</span>
                        <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight truncate w-48" title={course.title}>
                            {course.title}
                        </h2>
                    </div>
                </div>
                {/* Progress Mini-bar */}
                <div className="mt-4">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                        <span>Progreso General</span>
                        <span>0%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-blue w-[5%] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]" />
                    </div>
                </div>
            </div>

            <div className="h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar pb-10">
                <nav className="p-4 space-y-8">
                    {course.modules.map((module) => (
                        <div key={module.id} className="space-y-4">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-3">
                                {module.title}
                            </h3>
                            <div className="space-y-6">
                                {module.weeks.map((week) => (
                                    <div key={week.id} className="space-y-2">
                                        <div className="flex items-center gap-2 px-3 group">
                                            <div className="h-5 w-5 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                                                {week.number}
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                                Semana {week.number}
                                            </span>
                                        </div>

                                        <div className="space-y-1 relative pl-5 ml-5 border-l border-slate-200 dark:border-slate-800">
                                            {week.topics.map((topic) => {
                                                const href = `/courses/${course.slug}/${topic.slug}`
                                                const isActive = pathname === href

                                                return (
                                                    <Link
                                                        key={topic.id}
                                                        href={href}
                                                        className={cn(
                                                            "group flex items-center gap-3 py-2 px-3 text-sm rounded-lg transition-all duration-200 relative",
                                                            isActive
                                                                ? "bg-brand-blue/10 text-brand-blue font-semibold shadow-sm shadow-brand-blue/5"
                                                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900"
                                                        )}
                                                    >
                                                        {isActive && (
                                                            <div className="absolute left-[-21px] top-1/2 -translate-y-1/2 h-4 w-1 bg-brand-blue rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                                                        )}
                                                        <div className={cn(
                                                            "h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125",
                                                            isActive ? "bg-brand-blue" : "bg-slate-300 dark:bg-slate-700"
                                                        )} />
                                                        <span className="truncate">{topic.title}</span>
                                                        {isActive && <ChevronRight className="h-3 w-3 ml-auto opacity-50" />}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
