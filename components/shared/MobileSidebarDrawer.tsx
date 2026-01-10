"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useUIStore } from "@/lib/store/useUIStore"
import { usePathname } from "next/navigation"

interface MobileSidebarDrawerProps {
    children: React.ReactNode
}

export function MobileSidebarDrawer({ children }: MobileSidebarDrawerProps) {
    const { isMobileSidebarOpen, closeMobileSidebar } = useUIStore()
    const pathname = usePathname()

    // Close on route change
    useEffect(() => {
        closeMobileSidebar()
    }, [pathname, closeMobileSidebar])

    // Prevent body scroll when open
    useEffect(() => {
        if (isMobileSidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileSidebarOpen])

    return (
        <AnimatePresence>
            {isMobileSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMobileSidebar}
                        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] md:hidden"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-950 z-[101] md:hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">Temario del Curso</span>
                            <button
                                onClick={closeMobileSidebar}
                                className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500"
                            >
                                <X className="h-4 w-4" />
                            </button>

                        </div>

                        {/* Sidebar Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden">
                            {/* Remove the hidden md:block inside children here by modifying the child or wrapping */}
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
