"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
    Search,
    X,
    BookOpen,
    FileText,
    Calculator,
    Compass,
    ArrowRight,
    CornerDownLeft,
    SearchX,
    Sparkles,
    GraduationCap
} from "lucide-react"
import { SEARCH_ITEMS, FEATURED_SEARCH_ITEMS, SearchItem, SearchCategory } from "@/lib/search-data"

export function openCommandPalette() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("statsedu:open-command-palette"))
    }
}

const CATEGORY_CONFIG: Record<
    SearchCategory,
    { label: string; icon: React.ElementType; badgeBg: string; badgeText: string; order: number }
> = {
    "Asignaturas": {
        label: "Asignaturas Oficiales UTP",
        icon: GraduationCap,
        badgeBg: "bg-blue-100 dark:bg-blue-950/80 border-blue-200 dark:border-blue-900",
        badgeText: "text-blue-900 dark:text-blue-300",
        order: 1
    },
    "Herramientas Computacionales": {
        label: "Herramientas & Simuladores",
        icon: Calculator,
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900",
        badgeText: "text-emerald-900 dark:text-emerald-300",
        order: 2
    },
    "Lecciones & Contenidos": {
        label: "Lecciones & Módulos Temáticos",
        icon: FileText,
        badgeBg: "bg-purple-100 dark:bg-purple-950/80 border-purple-200 dark:border-purple-900",
        badgeText: "text-purple-900 dark:text-purple-300",
        order: 3
    },
    "Navegación": {
        label: "Navegación Rápida",
        icon: Compass,
        badgeBg: "bg-amber-100 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900",
        badgeText: "text-amber-900 dark:text-amber-300",
        order: 4
    }
}

function normalize(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
}

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isMac, setIsMac] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const router = useRouter()

    // Detect operating system for keyboard hints
    useEffect(() => {
        if (typeof window !== "undefined") {
            const isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent)
            setIsMac(isAppleDevice)
        }
    }, [])

    // Global keyboard listener (Cmd+K / Ctrl+K and Escape)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            } else if (e.key === "Escape" && isOpen) {
                e.preventDefault()
                setIsOpen(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    // Listen for custom trigger event
    useEffect(() => {
        const handleCustomTrigger = () => {
            setIsOpen(true)
        }

        window.addEventListener("statsedu:open-command-palette", handleCustomTrigger)
        return () => window.removeEventListener("statsedu:open-command-palette", handleCustomTrigger)
    }, [])

    // Focus input and lock body scroll on open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            setQuery("")
            setSelectedIndex(0)
            const timeout = setTimeout(() => {
                inputRef.current?.focus()
            }, 50)
            return () => clearTimeout(timeout)
        } else {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    // Filter and score results
    const filteredItems = useMemo(() => {
        const cleanQuery = normalize(query)
        if (!cleanQuery) {
            return FEATURED_SEARCH_ITEMS
        }

        const queryTokens = cleanQuery.split(/\s+/).filter(Boolean)

        const matches = SEARCH_ITEMS.map((item) => {
            const normTitle = normalize(item.title)
            const normSub = normalize(item.subtitle)
            const normCode = normalize(item.code || "")
            const normProg = normalize(item.program || "")
            const normTags = item.tags.map(normalize).join(" ")

            let score = 0

            // Exact match on course code gets high priority
            if (normCode && normCode === cleanQuery) {
                score += 150
            } else if (normCode && normCode.includes(cleanQuery)) {
                score += 100
            }

            // Title prefix match
            if (normTitle.startsWith(cleanQuery)) {
                score += 80
            } else if (normTitle.includes(cleanQuery)) {
                score += 50
            }

            // Token matching across all fields
            const allMatch = queryTokens.every((token) => {
                return (
                    normCode.includes(token) ||
                    normTitle.includes(token) ||
                    normSub.includes(token) ||
                    normProg.includes(token) ||
                    normTags.includes(token)
                )
            })

            if (!allMatch) {
                return { item, score: 0 }
            }

            score += 20

            // Bonus for Category prioritization
            if (item.category === "Asignaturas") score += 15
            if (item.category === "Herramientas Computacionales") score += 10
            if (item.category === "Navegación") score += 5

            return { item, score }
        })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .map((entry) => entry.item)

        return matches
    }, [query])

    // Group items by category in a predefined order
    const groupedItems = useMemo(() => {
        const groups: { category: SearchCategory; items: SearchItem[] }[] = []
        const categoriesOrder: SearchCategory[] = [
            "Asignaturas",
            "Herramientas Computacionales",
            "Lecciones & Contenidos",
            "Navegación"
        ]

        categoriesOrder.forEach((cat) => {
            const catItems = filteredItems.filter((i) => i.category === cat)
            if (catItems.length > 0) {
                groups.push({ category: cat, items: catItems })
            }
        })

        return groups
    }, [filteredItems])

    // Flat list of items to match selectedIndex
    const flatItems = useMemo(() => {
        const flat: SearchItem[] = []
        groupedItems.forEach((group) => {
            group.items.forEach((item) => flat.push(item))
        })
        return flat
    }, [groupedItems])

    // Reset selectedIndex if flatItems shrinks
    useEffect(() => {
        if (selectedIndex >= flatItems.length) {
            setSelectedIndex(0)
        }
    }, [flatItems, selectedIndex])

    // Keep active item scrolled into view
    useEffect(() => {
        if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth"
            })
        }
    }, [selectedIndex])

    const handleSelect = useCallback(
        (item: SearchItem) => {
            setIsOpen(false)
            router.push(item.href)
        },
        [router]
    )

    // Keydown handler for input
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            if (flatItems.length > 0) {
                setSelectedIndex((prev) => (prev + 1) % flatItems.length)
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            if (flatItems.length > 0) {
                setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length)
            }
        } else if (e.key === "Enter") {
            e.preventDefault()
            if (flatItems[selectedIndex]) {
                handleSelect(flatItems[selectedIndex])
            }
        }
    }

    if (!isOpen) return null

    // Track running index across groups
    let globalItemCounter = 0

    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-150"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsOpen(false)
                }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Buscador Inteligente Command Palette"
        >
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all">
                {/* Search Bar Header */}
                <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <Search className="h-5 w-5 text-blue-900 dark:text-blue-400 shrink-0 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setSelectedIndex(0)
                        }}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Buscar por código (ej. II4D3, IO113), tema, herramienta o lección..."
                        className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("")
                                setSelectedIndex(0)
                                inputRef.current?.focus()
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-1 cursor-pointer"
                            title="Limpiar búsqueda"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Cerrar modal (Esc)"
                    >
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 rounded">
                            ESC
                        </kbd>
                        <X className="h-5 w-5 sm:hidden" />
                    </button>
                </div>

                {/* Subheader / Info Indicator */}
                <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                        {query ? (
                            <span>
                                {flatItems.length} resultado{flatItems.length === 1 ? "" : "s"} para{" "}
                                <strong className="text-slate-800 dark:text-slate-200 font-semibold">
                                    &ldquo;{query}&rdquo;
                                </strong>
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-blue-900 dark:text-blue-300 font-semibold">
                                <Sparkles className="h-3 w-3 text-amber-500" /> Accesos Frecuentes & Herramientas Destacadas
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 hidden sm:inline">
                        StatsEdu • UTP
                    </span>
                </div>

                {/* Results List */}
                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100/60 dark:divide-slate-800/40"
                >
                    {flatItems.length === 0 ? (
                        <div className="py-12 px-6 text-center">
                            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center text-amber-600 mb-3">
                                <SearchX className="h-6 w-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                No se encontraron resultados para &ldquo;{query}&rdquo;
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                                Intenta buscar por código oficial (<span className="font-mono text-blue-900 dark:text-blue-300">II4D3</span>, <span className="font-mono text-blue-900 dark:text-blue-300">II7D3</span>, <span className="font-mono text-blue-900 dark:text-blue-300">IO113</span>), concepto temático (<span className="text-slate-700 dark:text-slate-300 italic">Simplex, Bayes, Markov, DEA</span>) o simulador.
                            </p>
                        </div>
                    ) : (
                        groupedItems.map((group) => {
                            const config = CATEGORY_CONFIG[group.category]
                            const CategoryIcon = config.icon

                            return (
                                <div key={group.category} className="py-2 first:pt-1 last:pb-1">
                                    {/* Category Section Header */}
                                    <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <CategoryIcon className="h-3.5 w-3.5 text-blue-800 dark:text-blue-400" />
                                            <span>{config.label}</span>
                                        </div>
                                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                            {group.items.length}
                                        </span>
                                    </div>

                                    {/* Items in this Category */}
                                    <div className="space-y-1 mt-1">
                                        {group.items.map((item) => {
                                            const itemIndex = globalItemCounter++
                                            const isSelected = itemIndex === selectedIndex

                                            return (
                                                <button
                                                    key={item.id}
                                                    ref={(el) => {
                                                        itemRefs.current[itemIndex] = el
                                                    }}
                                                    type="button"
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                                                        isSelected
                                                            ? "bg-blue-50 dark:bg-blue-950/70 border border-blue-300/80 dark:border-blue-800/80 shadow-xs"
                                                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                                                    }`}
                                                >
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            {item.code && (
                                                                <span
                                                                    className={`font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded border shrink-0 ${
                                                                        isSelected
                                                                            ? "bg-blue-900 text-white border-blue-900"
                                                                            : "bg-slate-100 dark:bg-slate-800 text-blue-900 dark:text-blue-300 border-slate-200 dark:border-slate-700"
                                                                    }`}
                                                                >
                                                                    {item.code}
                                                                </span>
                                                            )}
                                                            <span
                                                                className={`text-xs sm:text-sm font-bold truncate ${
                                                                    isSelected
                                                                        ? "text-blue-950 dark:text-white"
                                                                        : "text-slate-800 dark:text-slate-200"
                                                                }`}
                                                            >
                                                                {item.title}
                                                            </span>
                                                            {item.program && (
                                                                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 hidden md:inline">
                                                                    • {item.program}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p
                                                            className={`text-[11px] truncate leading-normal ${
                                                                isSelected
                                                                    ? "text-slate-700 dark:text-slate-300"
                                                                    : "text-slate-500 dark:text-slate-400"
                                                            }`}
                                                        >
                                                            {item.subtitle}
                                                        </p>
                                                    </div>

                                                    <div className="shrink-0 flex items-center gap-2">
                                                        {isSelected ? (
                                                            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-900 dark:text-blue-400 animate-in fade-in">
                                                                <span className="hidden sm:inline text-[10px] font-mono">Ir</span>
                                                                <CornerDownLeft className="h-3.5 w-3.5" />
                                                            </div>
                                                        ) : (
                                                            <ArrowRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Footer Controls & Keyboard Helper */}
                <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded shadow-2xs">
                                ↑
                            </kbd>
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded shadow-2xs">
                                ↓
                            </kbd>
                            <span className="text-[10px]">para navegar</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded shadow-2xs">
                                ↵ Enter
                            </kbd>
                            <span className="text-[10px]">para abrir</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded shadow-2xs">
                                Esc
                            </kbd>
                            <span className="text-[10px]">para cerrar</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[10px] font-semibold text-blue-900 dark:text-blue-400">
                        <span>{isMac ? "⌘K" : "Ctrl+K"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
