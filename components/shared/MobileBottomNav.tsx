"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/lib/store/useUIStore"

export function MobileBottomNav() {
    const pathname = usePathname()
    const { toggleMobileSidebar } = useUIStore()

    // Check if we are in a course page to show "Curriculum" button
    const isCoursePage = pathname.includes("/courses/")

    const navItems = [
        {
            label: "Inicio",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard"
        },
        {
            label: "Contenido",
            icon: BookOpen,
            onClick: isCoursePage ? toggleMobileSidebar : undefined,
            href: !isCoursePage ? "/dashboard#courses" : undefined,
            active: isCoursePage
        },
        {
            label: "Perfil",
            icon: User,
            href: "/profile",
            active: pathname === "/profile"
        }
    ]

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl px-2 py-2 flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isButton = !!item.onClick

                    const content = (
                        <div className={cn(
                            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                            item.active ? "text-brand-blue" : "text-slate-400"
                        )}>
                            <Icon className={cn("h-5 w-5", item.active && "animate-in zoom-in duration-300")} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                            {item.active && (
                                <div className="h-1 w-1 rounded-full bg-brand-blue mt-0.5" />
                            )}
                        </div>
                    )

                    if (isButton) {
                        return (
                            <button key={item.label} onClick={item.onClick} className="relative group">
                                {content}
                            </button>
                        )
                    }

                    return (
                        <Link key={item.label} href={item.href!} className="relative group">
                            {content}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
