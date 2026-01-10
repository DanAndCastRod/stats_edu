import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold mb-4">404 - No Encontrado</h2>
            <p className="mb-4">No pudimos encontrar el recurso solicitado.</p>
            <Link href="/" className="text-blue-500 hover:underline">
                Volver al Inicio
            </Link>
        </div>
    )
}
