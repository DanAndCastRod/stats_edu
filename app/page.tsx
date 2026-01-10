import { Navbar } from "@/components/shared/PublicNavbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { CoursePreviewSection } from "@/components/landing/CoursePreviewSection"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CoursePreviewSection />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
            Departamento de Ingeniería Industrial
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Universidad Tecnológica de Pereira<br />
            Investigación de Operaciones y Estadística
          </p>
          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} UTP Stats & Ops. Desarrollado con ❤️ para la academia.
          </div>
        </div>
      </footer>
    </div>
  );
}
