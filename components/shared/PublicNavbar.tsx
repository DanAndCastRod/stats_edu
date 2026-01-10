import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Navbar() {
    return (
        <header className="absolute top-0 w-full z-20 border-b border-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-brand-blue text-white p-1 rounded-lg">
                        <ArrowRight className="h-5 w-5 rotate-[-45deg]" />
                        {/* Note: Ideally use BarChart2, but reusing existing import. Or better, just text for now to match Navbar? 
                           Actually, I will use BarChart2 if available or similar. 
                           Wait, PublicNavbar doesn't import BarChart2. 
                           I'll stick to text-based or simple shape for now to avoid import errors unless I check imports.
                           Imports: Link, ArrowRight.
                           I'll import BarChart2.
                        */}
                    </div>
                    <div className="flex items-end gap-0.5">
                        <span className="font-black text-xl text-white tracking-tighter leading-none">stats</span>
                        <div className="bg-brand-blue text-white px-1 py-0.5 rounded-sm flex items-center justify-center transform -skew-x-6">
                            <span className="font-bold text-sm tracking-tight leading-none transform skew-x-6">edu</span>
                        </div>
                    </div>
                </div>
                <nav className="flex items-center gap-6">
                    <Link href="/courses" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Cursos
                    </Link>
                    <Link href="/api/auth/signin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Ingresar
                    </Link>
                    <Link
                        href="/courses"
                        className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
                    >
                        Empezar
                    </Link>
                </nav>
            </div>
        </header>
    )
}
