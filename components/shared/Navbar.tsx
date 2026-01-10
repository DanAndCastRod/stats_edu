import Link from "next/link"
import { User as AuthUser } from "next-auth"
import { LogOut, User as UserIcon, BookOpen, LayoutDashboard, Settings, Bell, Search } from "lucide-react"

export default function Navbar({ user }: { user?: AuthUser }) {
    return (
        <header className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl px-4 py-2 sticky top-0 z-50 w-full h-16">
            <div className="container mx-auto max-w-[1400px] h-full flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="group flex items-center gap-2">
                        <div className="bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue p-1.5 rounded-lg border border-brand-blue/20">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <div className="flex items-end gap-0.5">
                            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white leading-none">stats</span>
                            <div className="bg-brand-blue text-white px-1.5 py-0.5 rounded-sm flex items-center justify-center transform -skew-x-6">
                                <span className="font-bold text-lg tracking-tight leading-none transform skew-x-6">edu</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Items */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-brand-blue hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                    </nav>
                </div>

                {/* Right Utilities */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Search (Desktop) */}
                    <div className="hidden md:flex items-center relative group">
                        <Search className="absolute left-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar cursos o temas..."
                            className="pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border border-transparent focus:border-brand-blue/50 focus:bg-white dark:focus:bg-slate-950 rounded-xl text-sm outline-none transition-all w-64"
                        />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-900/50 text-slate-500 hover:text-brand-blue hover:bg-white dark:hover:bg-slate-950 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all">
                            <Bell className="h-5 w-5" />
                        </button>

                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1" />

                        <div className="flex items-center gap-3 pl-1">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{user?.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Estudiante</span>
                            </div>

                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-xl border-2 border-white dark:border-slate-800 shadow-md object-cover ring-2 ring-brand-blue/10"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border-2 border-brand-blue/20 shadow-sm">
                                    <UserIcon size={20} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
