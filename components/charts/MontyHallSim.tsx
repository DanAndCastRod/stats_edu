"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { DoorClosed, DoorOpen, Gift, Ghost, RotateCcw } from "lucide-react" // Assuming you have Ghost, otherwise reuse other icon

interface DoorProps {
    id: number
    status: "closed" | "open"
    content: "goat" | "car"
    isSelected: boolean
    onClick: () => void
    disabled: boolean
}

function Door({ id, status, content, isSelected, onClick, disabled }: DoorProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div
                onClick={!disabled ? onClick : undefined}
                className={`relative w-24 h-40 md:w-32 md:h-52 rounded-t-full border-4 cursor-pointer overflow-hidden ${isSelected ? "border-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-slate-300 dark:border-slate-700"
                    } ${disabled ? "cursor-default" : "hover:brightness-95 active:scale-95 transition-all"}`}
                animate={{
                    borderColor: isSelected ? "#3b82f6" : "#cbd5e1",
                    scale: isSelected ? 1.05 : 1
                }}
            >
                {/* Closed Door */}
                <AnimatePresence>
                    {status === "closed" && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white text-4xl font-bold z-10 origin-left"
                            transition={{ duration: 0.5 }}
                        >
                            {id}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Behind */}
                <div className={`absolute inset-0 flex items-center justify-center ${content === "car" ? "bg-emerald-100" : "bg-slate-200"
                    }`}>
                    {content === "car" ? (
                        <Gift size={48} className="text-emerald-600" />
                    ) : (
                        <Ghost size={48} className="text-slate-500" />
                    )}
                </div>
            </motion.div>
            {isSelected && <div className="text-xs font-bold text-brand-blue">TU ELECCIÓN</div>}
        </div>
    )
}

export function MontyHallSim() {
    const [gameState, setGameState] = useState<"pick" | "reveal" | "switch" | "result">("pick")
    const [doors, setDoors] = useState<{ id: number; content: "goat" | "car"; status: "closed" | "open" }[]>([
        { id: 1, content: "goat", status: "closed" },
        { id: 2, content: "goat", status: "closed" },
        { id: 3, content: "goat", status: "closed" },
    ])
    const [selectedDoor, setSelectedDoor] = useState<number | null>(null)
    const [stats, setStats] = useState({ switchWins: 0, switchLosses: 0, stayWins: 0, stayLosses: 0 })
    const [lastAction, setLastAction] = useState<"switch" | "stay" | null>(null)

    const initGame = () => {
        const carIndex = Math.floor(Math.random() * 3)
        const newDoors = [1, 2, 3].map((id, index) => ({
            id,
            content: (index === carIndex ? "car" : "goat") as "goat" | "car",
            status: "closed" as "closed" | "open"
        }))
        setDoors(newDoors)
        setGameState("pick")
        setSelectedDoor(null)
        setLastAction(null)
    }

    // Start immediately
    React.useEffect(() => {
        initGame()
    }, [])

    const handleDoorClick = (id: number) => {
        if (gameState === "pick") {
            setSelectedDoor(id)
            setGameState("reveal")

            // Reveal a goat that is NOT selected
            setTimeout(() => {
                setDoors(prev => {
                    const availableToGoats = prev.filter(d => d.id !== id && d.content === "goat")
                    const toReveal = availableToGoats[Math.floor(Math.random() * availableToGoats.length)]
                    return prev.map(d => d.id === toReveal.id ? { ...d, status: "open" } : d)
                })
                setGameState("switch")
            }, 600)
        }
    }

    const handleDecision = (switchDoor: boolean) => {
        setLastAction(switchDoor ? "switch" : "stay")

        let finalDoorId = selectedDoor
        if (switchDoor) {
            // Find the other closed door
            finalDoorId = doors.find(d => d.id !== selectedDoor && d.status === "closed")!.id
            setSelectedDoor(finalDoorId)
        }

        // Reveal all
        setDoors(prev => prev.map(d => ({ ...d, status: "open" })))
        setGameState("result")

        // Update stats
        const won = doors.find(d => d.id === finalDoorId)!.content === "car"

        setStats(prev => {
            if (switchDoor) {
                return { ...prev, switchWins: prev.switchWins + (won ? 1 : 0), switchLosses: prev.switchLosses + (won ? 0 : 1) }
            } else {
                return { ...prev, stayWins: prev.stayWins + (won ? 1 : 0), stayLosses: prev.stayLosses + (won ? 0 : 1) }
            }
        })
    }

    const totalSwitch = stats.switchWins + stats.switchLosses
    const totalStay = stats.stayWins + stats.stayLosses

    const switchWinRate = totalSwitch > 0 ? (stats.switchWins / totalSwitch * 100) : 0
    const stayWinRate = totalStay > 0 ? (stats.stayWins / totalStay * 100) : 0

    return (
        <ChartContainer
            title="Paradoja de Monty Hall"
            description="¿Cambiar o Mantener? La intuición vs. Probabilidad"
        >
            <div className="space-y-8">
                {/* Instructions */}
                <div className="text-center h-8">
                    {gameState === "pick" && <p className="animate-pulse">Elige una puerta...</p>}
                    {gameState === "reveal" && <p>El anfitrión abre una puerta con una cabra...</p>}
                    {gameState === "switch" && <p className="font-bold text-lg">¿Quieres CAMBIAR de puerta?</p>}
                    {gameState === "result" && (
                        <p className={`font-bold text-lg ${doors.find(d => d.id === selectedDoor)?.content === "car" ? "text-emerald-500" : "text-red-500"
                            }`}>
                            {doors.find(d => d.id === selectedDoor)?.content === "car" ? "¡GANASTE!" : "Perdiste :("}
                        </p>
                    )}
                </div>

                {/* Doors */}
                <div className="flex justify-center gap-4 md:gap-8">
                    {doors.map(door => (
                        <Door
                            key={door.id}
                            {...door}
                            isSelected={selectedDoor === door.id}
                            disabled={gameState !== "pick"}
                            onClick={() => handleDoorClick(door.id)}
                        />
                    ))}
                </div>

                {/* Decision Controls */}
                {gameState === "switch" && (
                    <div className="flex justify-center gap-4">
                        <motion.button
                            onClick={() => handleDecision(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold"
                        >
                            🚫 MANTENER
                        </motion.button>
                        <motion.button
                            onClick={() => handleDecision(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
                        >
                            🔄 CAMBIAR PUERTA
                        </motion.button>
                    </div>
                )}

                {/* Play Again */}
                {gameState === "result" && (
                    <div className="flex justify-center">
                        <motion.button
                            onClick={initGame}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold text-lg shadow-lg"
                        >
                            <RotateCcw className="inline mr-2" /> Jugar de Nuevo
                        </motion.button>
                    </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900">
                        <div className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase mb-2">Si Cambias</div>
                        <div className="text-3xl font-bold">{switchWinRate.toFixed(1)}%</div>
                        <div className="text-xs text-slate-500">{stats.switchWins} victorias / {totalSwitch}</div>
                        <div className="text-xs text-slate-400 mt-1">Teoría: 66.6%</div>
                    </div>
                    <div className="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Si Mantienes</div>
                        <div className="text-3xl font-bold">{stayWinRate.toFixed(1)}%</div>
                        <div className="text-xs text-slate-500">{stats.stayWins} victorias / {totalStay}</div>
                        <div className="text-xs text-slate-400 mt-1">Teoría: 33.3%</div>
                    </div>
                </div>
            </div>
        </ChartContainer>
    )
}
