"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { markTopicAsCompleted } from "@/app/actions/progress"

interface TopicNavInfo {
    title: string
    slug: string
}

interface TopicNavigatorProps {
    courseSlug: string
    currentTopicId: string
    prevTopic?: TopicNavInfo
    nextTopic?: TopicNavInfo
}

export function TopicNavigator({ courseSlug, currentTopicId, prevTopic, nextTopic }: TopicNavigatorProps) {
    const handleNextClick = () => {
        // Fire and forget - optimistic
        markTopicAsCompleted(currentTopicId, courseSlug)
    }

    return (
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between">
            {prevTopic ? (
                <Link
                    href={`/courses/${courseSlug}/${prevTopic.slug}`}
                    className="flex-1 group flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-blue dark:hover:border-brand-blue bg-white dark:bg-slate-900 transition-all hover:shadow-md"
                >
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-brand-blue transition-colors flex items-center gap-1">
                        <ChevronLeft className="h-3 w-3" /> Anterior
                    </span>
                    <span className="mt-1 font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {prevTopic.title}
                    </span>
                </Link>
            ) : (
                <div className="flex-1" />
            )}

            {nextTopic ? (
                <Link
                    href={`/courses/${courseSlug}/${nextTopic.slug}`}
                    onClick={handleNextClick}
                    className="flex-1 group flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-blue dark:hover:border-brand-blue bg-white dark:bg-slate-900 transition-all hover:shadow-md text-right items-end"
                >
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-brand-blue transition-colors flex items-center gap-1">
                        Siguiente <ChevronRight className="h-3 w-3" />
                    </span>
                    <span className="mt-1 font-semibold text-slate-900 dark:text-slate-100 truncate w-full">
                        {nextTopic.title}
                    </span>
                </Link>
            ) : (
                <div className="flex-1 flex justify-end">
                    {/* Final Topic: Mark as nice to have "Finish" button? */}
                    <button
                        onClick={handleNextClick}
                        className="px-6 py-3 bg-brand-blue text-white font-bold rounded-xl shadow-lg hover:bg-brand-blue/90 transition-all"
                    >
                        Completar Módulo
                    </button>
                </div>
            )}
        </div>
    )
}
