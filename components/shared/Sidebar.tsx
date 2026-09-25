import Link from "next/link"
import { BarChart, BookOpen, GraduationCap, LayoutDashboard, LineChart, Network } from "lucide-react"

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Catálogo de Cursos", href: "/courses", icon: BookOpen },
    { label: "Estadística I", href: "/courses/estadistica-i", icon: BarChart },
    { label: "Estadística II", href: "/courses/estadistica-ii", icon: LineChart },
    { label: "Investigación de Operaciones I", href: "/courses/investigacion-operaciones-i", icon: Network },
]

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-2 sticky top-24">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand-blue dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-all font-medium text-sm"
                >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    )
}
