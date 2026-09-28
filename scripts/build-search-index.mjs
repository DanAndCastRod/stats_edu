import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const coursesDir = path.join(rootDir, 'content', 'courses')
const outputFile = path.join(rootDir, 'lib', 'search-data.ts')

// Base navigation shortcuts
const navigationItems = [
  {
    id: 'nav-home',
    title: 'Inicio',
    subtitle: 'Portal institucional de la Facultad de Ingeniería Industrial UTP',
    category: 'Navegación',
    href: '/',
    tags: ['inicio', 'home', 'portal', 'utp', 'principal', 'bienvenida', 'industrial']
  },
  {
    id: 'nav-courses',
    title: 'Aulas Virtuales',
    subtitle: 'Catálogo oficial de las 21 asignaturas de Pregrado y Posgrado MIOE',
    category: 'Navegación',
    href: '/courses',
    tags: ['aulas', 'cursos', 'asignaturas', 'catalogo', 'clases', 'pregrado', 'posgrado', 'mioe']
  },
  {
    id: 'nav-tools',
    title: 'Suite de Herramientas Computacionales',
    subtitle: 'Laboratorio de cálculo reactivo, solver simplex, colas, markov y finanzas',
    category: 'Navegación',
    href: '/tools',
    tags: ['herramientas', 'suite', 'calculadoras', 'laboratorio', 'geio', 'simuladores', 'workbench']
  },
  {
    id: 'nav-dashboard',
    title: 'Mi Progreso',
    subtitle: 'Panel individual de avance académico, lecciones completadas y evaluaciones',
    category: 'Navegación',
    href: '/dashboard',
    tags: ['progreso', 'dashboard', 'avance', 'notas', 'evaluaciones', 'quizzes', 'perfil', 'estudiante']
  }
]

// 6 Interactive tools in /tools
const computationalTools = [
  {
    id: 'tool-simplex',
    title: 'Resolutor del Método Simplex Primal',
    subtitle: 'Programación lineal con tablas simplex paso a paso, pivoteo interactivo y dualidad',
    code: 'II7D3 / IO113',
    program: 'Transversal',
    category: 'Herramientas Computacionales',
    href: '/tools#simplex',
    tags: ['simplex', 'programacion lineal', 'optimizacion', 'precios sombra', 'dualidad', 'pivoteo', 'maximizacion', 'minimizacion', 'tabla simplex', 'tableau']
  },
  {
    id: 'tool-queueing',
    title: 'Calculadora de Teoría de Colas (M/M/s)',
    subtitle: 'Modelos markovianos M/M/1, M/M/s, capacidad finita, fórmulas de Little y Erlang-C',
    code: 'II8B3 / II713',
    program: 'Pregrado',
    category: 'Herramientas Computacionales',
    href: '/tools#queueing',
    tags: ['colas', 'teoria de colas', 'm/m/1', 'm/m/s', 'erlang-c', 'lineas de espera', 'little', 'servidores', 'trafico', 'espera', 'poisson']
  },
  {
    id: 'tool-markov',
    title: 'Analizador de Cadenas de Markov (DTMC)',
    subtitle: 'Matrices de transición estocástica 2x2/3x3, potencias Pⁿ, distribución estacionaria π y Monte Carlo',
    code: 'II713 / IO113',
    program: 'Transversal',
    category: 'Herramientas Computacionales',
    href: '/tools#markov',
    tags: ['markov', 'cadenas de markov', 'transicion estocastica', 'matriz p', 'estado estacionario', 'ergodicidad', 'monte carlo', 'dtmc', 'estocastico']
  },
  {
    id: 'tool-economics',
    title: 'Ingeniería Económica: Finanzas VPN / TIR',
    subtitle: 'Evaluación de proyectos de inversión con Valor Presente Neto, TIR, Payback y relación B/C',
    code: 'II543',
    program: 'Pregrado',
    category: 'Herramientas Computacionales',
    href: '/tools#economics',
    tags: ['finanzas', 'vpn', 'tir', 'van', 'irr', 'payback', 'beneficio costo', 'flujo de caja', 'tasa de descuento', 'evaluacion financiera', 'rentabilidad']
  },
  {
    id: 'tool-dea',
    title: 'Eficiencia Técnica DEA (CCR Insumo-Orientado)',
    subtitle: 'Análisis Envolvente de Datos, frontera de eficiencia no paramétrica y benchmarking de DMUs',
    code: 'IO243',
    program: 'Posgrado MIOE',
    category: 'Herramientas Computacionales',
    href: '/tools#dea',
    tags: ['dea', 'analisis envolvente', 'eficiencia tecnica', 'ccr', 'bcc', 'dmu', 'benchmarking', 'frontera eficiente', 'productividad', 'insumo orientado']
  },
  {
    id: 'tool-distributions',
    title: 'Workbench de Distribuciones Estadísticas',
    subtitle: 'Visualizador reactivo de distribuciones Continuas (Normal, Student, Chi², F) y Discretas (Poisson, Binomial)',
    code: 'II4D3 / II5A3',
    program: 'Pregrado',
    category: 'Herramientas Computacionales',
    href: '/tools#distributions',
    tags: ['distribuciones', 'workbench', 'normal', 'gaussiana', 'student', 'chi-cuadrado', 'poisson', 'binomial', 'exponencial', 'quantiles', 'densidad', 'probabilidad']
  },
  {
    id: 'tool-spc',
    title: 'Control Estadístico de Calidad & Capacidad (SPC)',
    subtitle: 'Gráficos Shewhart X-barra y R, límites de control ±3σ e índices Cp, Cpk, Cpm y nivel Sigma',
    code: 'II5A3 / II6A2',
    program: 'Pregrado',
    category: 'Herramientas Computacionales',
    href: '/tools#spc',
    tags: ['spc', 'calidad', 'shewhart', 'x-bar', 'graficos de control', 'cp', 'cpk', 'capacidad', 'sigma', 'ppm', 'tolerancias']
  },
  {
    id: 'tool-inventory',
    title: 'Optimizador de Inventarios & Lote Económico (EOQ / ROP)',
    subtitle: 'Lote económico de pedido (EOQ), punto de reorden (ROP) bajo demanda estocástica y stock de seguridad',
    code: 'II723 / II8B3',
    program: 'Pregrado',
    category: 'Herramientas Computacionales',
    href: '/tools#inventory',
    tags: ['inventarios', 'eoq', 'lote economico', 'rop', 'punto de reorden', 'stock de seguridad', 'cadena de suministro', 'almacen', 'costo mantener']
  },
  {
    id: 'tool-forecasting',
    title: 'Pronósticos de Demanda & Series de Tiempo',
    subtitle: 'Suavizamiento Exponencial Simple (SES), Modelo de Holt (Tendencia lineal) y Promedios Móviles con MAD/MAPE',
    code: 'II723 / IO123',
    program: 'Transversal',
    category: 'Herramientas Computacionales',
    href: '/tools#forecasting',
    tags: ['pronosticos', 'demanda', 'series de tiempo', 'holt', 'suavizamiento exponencial', 'mad', 'mape', 'rmse', 'tracking signal', 'prediccion']
  },
  {
    id: 'tool-cpm',
    title: 'Optimizador de Redes de Proyectos (CPM / PERT)',
    subtitle: 'Cálculo de ruta crítica, holguras totales (ES, EF, LS, LF), varianza del proyecto y probabilidad Z',
    code: 'II7D3 / II8B3 / MIOE',
    program: 'Transversal',
    category: 'Herramientas Computacionales',
    href: '/tools#cpm',
    tags: ['cpm', 'pert', 'ruta critica', 'proyectos', 'redes', 'holgura', 'grafo', 'gestion de proyectos', 'tiempo esperado', 'varianza pert']
  }
]

// Scan courses
const courseFolders = fs.readdirSync(coursesDir).sort()
const courseItems = []
const topicItems = []

for (const slug of courseFolders) {
  const metaPath = path.join(coursesDir, slug, 'metadata.json')
  if (!fs.existsSync(metaPath)) continue
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
  if (meta.isMock) continue

  const isMioe = slug.startsWith('mioe-')
  const program = isMioe ? 'Posgrado MIOE' : 'Pregrado'

  courseItems.push({
    id: `course-${slug}`,
    title: meta.title,
    subtitle: `Código ${meta.code} • ${program} en Ingeniería Industrial`,
    code: meta.code,
    program,
    category: 'Asignaturas',
    href: `/courses/${slug}`,
    tags: [
      meta.code.toLowerCase(),
      meta.title.toLowerCase(),
      slug.replace(/-/g, ' '),
      program.toLowerCase(),
      'asignatura',
      'curso',
      'utp'
    ]
  })

  // Scan modules and topics
  const coursePath = path.join(coursesDir, slug)
  const subdirs = fs.readdirSync(coursePath).filter(f => fs.statSync(path.join(coursePath, f)).isDirectory())

  for (const mod of subdirs) {
    const modPath = path.join(coursePath, mod)
    let modTitle = mod
    const modMetaPath = path.join(modPath, 'metadata.json')
    if (fs.existsSync(modMetaPath)) {
      try {
        const m = JSON.parse(fs.readFileSync(modMetaPath, 'utf-8'))
        if (m.title) modTitle = m.title
      } catch (e) {}
    }

    const mdxFiles = fs.readdirSync(modPath).filter(f => f.endsWith('.mdx'))
    for (const f of mdxFiles) {
      const topicSlug = f.replace('.mdx', '')
      const fullPath = path.join(modPath, f)
      const raw = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(raw)
      const title = data.title || topicSlug

      topicItems.push({
        id: `topic-${slug}-${topicSlug}`,
        title: title,
        subtitle: `${meta.code} (${meta.title}) • ${modTitle}`,
        code: meta.code,
        program,
        category: 'Lecciones & Contenidos',
        href: `/courses/${slug}/${topicSlug}`,
        tags: [
          meta.code.toLowerCase(),
          title.toLowerCase(),
          modTitle.toLowerCase(),
          meta.title.toLowerCase(),
          topicSlug.replace(/-/g, ' '),
          ...(Array.isArray(data.tags) ? data.tags.map(t => String(t).toLowerCase()) : [])
        ]
      })
    }
  }
}

const allSearchItems = [
  ...navigationItems,
  ...computationalTools,
  ...courseItems,
  ...topicItems
]

const fileContent = `/**
 * Buscador Global Inteligente de StatsEdu UTP
 * Archivo autogenerado con indexación completa de asignaturas, herramientas y lecciones.
 * Total de elementos indexados: ${allSearchItems.length}
 * - Asignaturas oficiales: ${courseItems.length}
 * - Herramientas interactivas: ${computationalTools.length}
 * - Accesos de navegación: ${navigationItems.length}
 * - Lecciones y contenidos MDX: ${topicItems.length}
 */

export type SearchCategory =
    | "Asignaturas"
    | "Lecciones & Contenidos"
    | "Herramientas Computacionales"
    | "Navegación"

export interface SearchItem {
    id: string
    title: string
    subtitle: string
    code?: string
    program?: "Pregrado" | "Posgrado MIOE" | "Transversal"
    category: SearchCategory
    href: string
    tags: string[]
}

export const SEARCH_ITEMS: SearchItem[] = ${JSON.stringify(allSearchItems, null, 4)};

export const FEATURED_SEARCH_ITEMS: SearchItem[] = SEARCH_ITEMS.filter(
    (item) => item.category === "Navegación" || item.category === "Herramientas Computacionales" || (item.category === "Asignaturas" && ["II4D3", "II5A3", "II7D3", "II8B3", "IO113"].includes(item.code || ""))
);
`

fs.writeFileSync(outputFile, fileContent, 'utf-8')
console.log(`Generated ${outputFile} with ${allSearchItems.length} search items.`)
