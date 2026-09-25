import { Navbar } from "@/components/shared/PublicNavbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { CoursePreviewSection } from "@/components/landing/CoursePreviewSection"
import Link from "next/link"
import { BarChart3, GraduationCap, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CoursePreviewSection />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-400 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-xl text-white">stats_edu</span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
                Plataforma interactiva de educación en Estadística e Investigación de Operaciones de la Universidad Tecnológica de Pereira.
              </p>
              <div className="text-xs text-slate-500">
                Facultad de Ingeniería Industrial • Pereira, Risaralda, Colombia
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Cursos Oficiales
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/courses/estadistica-i" className="hover:text-white transition-colors">
                    Estadística I
                  </Link>
                </li>
                <li>
                  <Link href="/courses/estadistica-ii" className="hover:text-white transition-colors">
                    Estadística II
                  </Link>
                </li>
                <li>
                  <Link href="/courses/investigacion-operaciones-i" className="hover:text-white transition-colors">
                    Investigación de Operaciones I
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
                Plataforma
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Panel del Estudiante
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Catálogo de Lecciones
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/DanAndCastRod/stats_edu"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <Github className="h-4 w-4" />
                    <span>Repositorio GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} Universidad Tecnológica de Pereira. Desarrollado para la excelencia académica.
            </div>
            <div className="flex items-center gap-4">
              <span>Next.js 15</span>
              <span>•</span>
              <span>Pyodide</span>
              <span>•</span>
              <span>Prisma ORM</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
