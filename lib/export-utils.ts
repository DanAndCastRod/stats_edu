/**
 * Utilidades científicas para exportación de datos y copia al portapapeles
 * Diseñado para la suite /tools y componentes de StatsEdu UTP.
 * 100% compatible con ejecución del lado del cliente y Cloudflare Pages.
 */

/**
 * Limpia y escapa una celda para el formato CSV (RFC 4180).
 */
export function sanitizeCsvCell(cell: string | number | boolean | null | undefined): string {
    if (cell === null || cell === undefined) return ""
    const str = String(cell)
    // Si contiene comas, comillas dobles, saltos de línea o punto y coma, envolver en comillas
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r") || str.includes(";")) {
        return `"${str.replace(/"/g, '""')}"`
    }
    return str
}

/**
 * Descarga una matriz de datos en un archivo CSV formateado con soporte UTF-8 (BOM).
 * @param filename Nombre del archivo sugerido (ej: 'cola_mm_s_resultados.csv')
 * @param rows Matriz de filas con datos numéricos o alfanuméricos
 */
export function downloadCsvFile(
    filename: string,
    rows: (string | number | boolean | null | undefined)[][]
): void {
    if (typeof window === "undefined") return

    // Convertir matriz a texto CSV
    const csvContent = rows
        .map((row) => row.map(sanitizeCsvCell).join(","))
        .join("\r\n")

    // Prepend UTF-8 BOM (\uFEFF) para que Excel y LibreOffice abran caracteres especiales (λ, μ, π, θ, acentos) correctamente
    const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;"
    })

    const safeFilename = filename.endsWith(".csv") ? filename : `${filename}.csv`
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", safeFilename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

/**
 * Copia un texto formateado (como tablas en Markdown o resúmenes) al portapapeles del sistema.
 * Cuenta con fallback para contextos sin soporte de `navigator.clipboard`.
 * @param text Cadena a copiar
 * @returns Promesa que resuelve a true si la copia fue exitosa
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    if (typeof window === "undefined") return false

    // Método moderno vía Clipboard API
    if (navigator?.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(text)
            return true
        } catch {
            // Intentar método fallback si falla
        }
    }

    // Método fallback tradicional mediante textarea temporal
    try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        textArea.setAttribute("readonly", "")
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)
        return successful
    } catch {
        return false
    }
}

/**
 * Genera una tabla en formato Markdown a partir de encabezados y filas de datos.
 */
export function formatMarkdownTable(
    headers: string[],
    rows: (string | number | null | undefined)[][]
): string {
    const headerRow = `| ${headers.join(" | ")} |`
    const separatorRow = `| ${headers.map(() => ":---").join(" | ")} |`
    const bodyRows = rows.map(
        (row) => `| ${row.map((cell) => (cell === null || cell === undefined ? "" : String(cell))).join(" | ")} |`
    )

    return [headerRow, separatorRow, ...bodyRows].join("\n")
}

/**
 * Genera una marca de tiempo concisa para nombres de archivo exportados.
 */
export function getExportTimestamp(): string {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, "0")
    const dd = String(now.getDate()).padStart(2, "0")
    const hh = String(now.getHours()).padStart(2, "0")
    const min = String(now.getMinutes()).padStart(2, "0")
    return `${yyyy}${mm}${dd}_${hh}${min}`
}
