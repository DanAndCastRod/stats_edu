import { SEARCH_ITEMS, FEATURED_SEARCH_ITEMS } from '../lib/search-data.ts'

console.log("=== VERIFICACIÓN DEL BUSCADOR INTELIGENTE / COMMAND PALETTE ===")
console.log(`Total de elementos indexados: ${SEARCH_ITEMS.length}`)

// 1. Verificar Asignaturas Oficiales (21 asignaturas)
const courses = SEARCH_ITEMS.filter(i => i.category === 'Asignaturas')
console.log(`\n1. Asignaturas Oficiales indexadas: ${courses.length}/21`)
const requiredCodes = [
    'II143', 'II4D3', 'II5A3', 'II6A2', 'II723', 'II543', 'II7D3', 'II8B3',
    'CB213', 'IOA10', 'IOD10', 'IO123', 'IO133', 'IO113', 'IO143', 'IO243',
    'IO223', 'IO233', 'IO213', 'II713', 'II863'
]
const missingCodes = requiredCodes.filter(c => !courses.some(course => course.code === c))
if (missingCodes.length === 0) {
    console.log("   ✅ Las 21 asignaturas oficiales UTP están indexadas correctamente con sus códigos.")
} else {
    console.error("   ❌ Códigos faltantes:", missingCodes)
    process.exit(1)
}

// 2. Verificar Herramientas Computacionales (10 herramientas)
const tools = SEARCH_ITEMS.filter(i => i.category === 'Herramientas Computacionales')
console.log(`\n2. Herramientas Computacionales indexadas: ${tools.length}/10`)
const requiredToolHashes = [
    '/tools#simplex',
    '/tools#queueing',
    '/tools#markov',
    '/tools#economics',
    '/tools#dea',
    '/tools#distributions',
    '/tools#spc',
    '/tools#inventory',
    '/tools#forecasting',
    '/tools#cpm'
]
const missingToolHashes = requiredToolHashes.filter(h => !tools.some(t => t.href === h))
if (missingToolHashes.length === 0) {
    console.log("   ✅ Las 10 herramientas interactivas (/tools#...) están indexadas con sus enlaces y hashes.")
} else {
    console.error("   ❌ Enlaces de herramientas faltantes:", missingToolHashes)
    process.exit(1)
}

// 3. Verificar Accesos Rápidos de Navegación (4 accesos)
const navs = SEARCH_ITEMS.filter(i => i.category === 'Navegación')
console.log(`\n3. Accesos Rápidos de Navegación: ${navs.length}/4`)
const requiredNavHrefs = ['/', '/dashboard', '/courses', '/tools']
const missingNavHrefs = requiredNavHrefs.filter(h => !navs.some(n => n.href === h))
if (missingNavHrefs.length === 0) {
    console.log("   ✅ Accesos rápidos (Inicio, Dashboard, Cursos, Herramientas) presentes.")
} else {
    console.error("   ❌ Accesos rápidos faltantes:", missingNavHrefs)
    process.exit(1)
}

// 4. Verificar Lecciones & Contenidos
const topics = SEARCH_ITEMS.filter(i => i.category === 'Lecciones & Contenidos')
console.log(`\n4. Lecciones & Contenidos Temáticos indexados: ${topics.length}`)
if (topics.length > 50) {
    console.log("   ✅ Cobertura exhaustiva de lecciones MDX en todas las asignaturas.")
} else {
    console.error("   ❌ Cantidad insuficiente de lecciones indexadas.")
    process.exit(1)
}

// 5. Test de Búsqueda Normalizada y Scoring
function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
}

function search(query) {
    const cleanQuery = normalize(query)
    const tokens = cleanQuery.split(/\s+/).filter(Boolean)
    const rawMatches = SEARCH_ITEMS.map(item => {
        const normTitle = normalize(item.title)
        const normSub = normalize(item.subtitle)
        const normCode = normalize(item.code || "")
        const normProg = normalize(item.program || "")
        const normTags = item.tags.map(normalize).join(" ")
        let score = 0
        if (normCode && normCode === cleanQuery) score += 150
        else if (normCode && normCode.includes(cleanQuery)) score += 100
        if (normTitle.startsWith(cleanQuery)) score += 80
        else if (normTitle.includes(cleanQuery)) score += 50
        const allMatch = tokens.every(token => (
            normCode.includes(token) ||
            normTitle.includes(token) ||
            normSub.includes(token) ||
            normProg.includes(token) ||
            normTags.includes(token)
        ))
        if (!allMatch) return null
        score += 20
        return { item, score }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map(e => e.item)

    // Category grouping as in CommandPalette component
    const categoryPriority = {
        "Asignaturas": 1,
        "Herramientas Computacionales": 2,
        "Lecciones & Contenidos": 3,
        "Navegación": 4
    }

    // When searching for generic keywords (like "dashboard"), if there are navigation items, priority holds
    const grouped = [...rawMatches].sort((a, b) => {
        // If one is Asignatura and the query matches course code or starts with title, keep score
        const catA = categoryPriority[a.category] || 99
        const catB = categoryPriority[b.category] || 99
        return catA - catB
    })

    return grouped
}

console.log("\n5. Pruebas de Búsqueda Inteligente:")
const testQueries = [
    { q: "II4D3", expectedTitle: "Estadística I", expectedCategory: "Asignaturas" },
    { q: "II7D3", expectedTitle: "Investigación de Operaciones I", expectedCategory: "Asignaturas" },
    { q: "IO113", expectedTitle: "Programación Lineal Avanzada", expectedCategory: "Asignaturas" },
    { q: "simplex", expectedTitle: "Simplex", expectedCategory: "Herramientas Computacionales" },
    { q: "markov", expectedTitle: "Markov", expectedCategory: "Herramientas Computacionales" },
    { q: "dea", expectedTitle: "DEA", expectedCategory: "Herramientas Computacionales" },
    { q: "vpn", expectedTitle: "VPN", expectedCategory: "Herramientas Computacionales" },
    { q: "colas", expectedTitle: "Colas", expectedCategory: "Herramientas Computacionales" },
    { q: "dashboard", expectedTitle: "Mi Progreso", expectedCategory: "Navegación" }
]

for (const test of testQueries) {
    const results = search(test.q)
    if (results.length === 0) {
        console.error(`   ❌ No hubo resultados para «${test.q}»`)
        process.exit(1)
    }
    const matchingItem = results.find(
        r => (!test.expectedTitle || r.title.includes(test.expectedTitle)) &&
             (!test.expectedCategory || r.category === test.expectedCategory)
    )
    if (!matchingItem) {
        console.error(`   ❌ Para «${test.q}», no se encontró item con título '${test.expectedTitle}' y categoría '${test.expectedCategory}'`)
        console.log("   Resultados obtenidos:", results.slice(0, 3).map(r => `[${r.category}] ${r.title}`))
        process.exit(1)
    }
    console.log(`   ✅ Query «${test.q}» -> Encontrado: [${matchingItem.category}] ${matchingItem.title} (${matchingItem.href})`)
}

console.log("\n🎉 TODAS LAS VERIFICACIONES DEL COMMAND PALETTE PASARON CON ÉXITO.")
