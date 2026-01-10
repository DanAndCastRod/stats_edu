import Link from "next/link"
import { BarChart, BookOpen, GraduationCap, LayoutDashboard } from "lucide-react"

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Estadística I", href: "/courses/estadistica-i", icon: BarChart },
    { label: "Inv. Operaciones", href: "/courses/inv-operaciones", icon: GraduationCap },
    { label: "Recursos", href: "/resources", icon: BookOpen },
]

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-2 sticky top-24">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                </Link>
            ))}
        </nav>
    )
}
