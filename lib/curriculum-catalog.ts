export type ProgramType = "todos" | "pregrado" | "posgrado"

export type PregradoArea =
    | "todas"
    | "Investigación de Operaciones"
    | "Estadística"
    | "Administración"
    | "Finanzas"
    | "Producción"
    | "Ciencias Básicas"

export type PosgradoCycle =
    | "todos"
    | "S0 Nivelatorio"
    | "S1 Obligatorias"
    | "S2 Especializadas"

export interface OfficialCourse {
    id: string
    slug: string
    code: string
    title: string
    description: string
    program: "pregrado" | "posgrado"
    area: "Investigación de Operaciones" | "Estadística" | "Administración" | "Finanzas" | "Producción" | "Ciencias Básicas"
    cycle?: "S0 Nivelatorio" | "S1 Obligatorias" | "S2 Especializadas"
    semester: string
    credits: number
    ects: number
    totalModules: number
    totalTopics: number
    coordinator: string
    isMock?: boolean
}

export const OFFICIAL_COURSES: OfficialCourse[] = [
    // Pregrado en Ingeniería Industrial (11 Asignaturas)
    {
        id: "estadistica-i",
        slug: "estadistica-i",
        code: "II4D3",
        title: "Estadística I",
        description: "Fundamentos de Estadística Descriptiva, Axiomática de Probabilidad, Teorema de Bayes y Distribuciones Discretas y Continuas.",
        program: "pregrado",
        area: "Estadística",
        semester: "4º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 6,
        totalTopics: 25,
        coordinator: "Prof. César Augusto Zapata"
    },
    {
        id: "estadistica-ii",
        slug: "estadistica-ii",
        code: "II5A3",
        title: "Estadística II",
        description: "Inferencia estadística avanzada, distribuciones muestrales, intervalos de confianza, pruebas de hipótesis y ANOVA unifactorial.",
        program: "pregrado",
        area: "Estadística",
        semester: "5º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 6,
        totalTopics: 13,
        coordinator: "Dr. José A. Soto Mejía"
    },
    {
        id: "estadistica-iii",
        slug: "estadistica-iii",
        code: "II6A2",
        title: "Estadística III",
        description: "Modelos lineales múltiples en notación matricial, multicolinealidad, diseño de experimentos industriales (ANOVA, DBCA, 2^k) y SPC.",
        program: "pregrado",
        area: "Estadística",
        semester: "6º Semestre",
        credits: 2,
        ects: 6,
        totalModules: 3,
        totalTopics: 6,
        coordinator: "Prof. César Augusto Zapata"
    },
    {
        id: "investigacion-operaciones-i",
        slug: "investigacion-operaciones-i",
        code: "II7D3",
        title: "Investigación de Operaciones I",
        description: "Optimización determinística: programación lineal, algoritmo simplex primal y dual, teoría de dualidad, sensibilidad y transporte.",
        program: "pregrado",
        area: "Investigación de Operaciones",
        semester: "7º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 5,
        totalTopics: 10,
        coordinator: "Ing. Natalia Bohórquez Bedoya"
    },
    {
        id: "investigacion-operaciones-ii",
        slug: "investigacion-operaciones-ii",
        code: "II8B3",
        title: "Investigación de Operaciones II",
        description: "Programación entera, Branch and Bound, programación dinámica, teoría de juegos y modelos estocásticos aplicados a ingeniería.",
        program: "pregrado",
        area: "Investigación de Operaciones",
        semester: "8º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 5,
        totalTopics: 10,
        coordinator: "Dra. Eliana Mirledy Toro Ocampo"
    },
    {
        id: "procesos-estocasticos",
        slug: "procesos-estocasticos",
        code: "II713",
        title: "Procesos Estocásticos",
        description: "Cadenas de Markov discretas y continuas, procesos de Poisson, modelos de líneas de espera (colas) y confiabilidad de sistemas.",
        program: "pregrado",
        area: "Investigación de Operaciones",
        semester: "7º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 4,
        totalTopics: 8,
        coordinator: "Dra. Eliana Mirledy Toro Ocampo"
    },
    {
        id: "simulacion",
        slug: "simulacion",
        code: "II863",
        title: "Simulación de Sistemas",
        description: "Simulación de eventos discretos, generación pseudoaleatoria, transformada inversa, Monte Carlo y análisis estadístico de salida.",
        program: "pregrado",
        area: "Investigación de Operaciones",
        semester: "8º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 4,
        totalTopics: 8,
        coordinator: "Dr. José A. Soto Mejía"
    },
    {
        id: "administracion-industrial",
        slug: "administracion-industrial",
        code: "II143",
        title: "Administración Industrial",
        description: "Evolución del pensamiento administrativo, diseño y modelamiento de procesos BPMN, gestión estratégica de la productividad y BSC.",
        program: "pregrado",
        area: "Administración",
        semester: "3º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Ing. Wilson Arenas Valencia"
    },
    {
        id: "ingenieria-economica-finanzas",
        slug: "ingenieria-economica-finanzas",
        code: "II543",
        title: "Ingeniería Económica y Finanzas",
        description: "Valor del dinero en el tiempo, equivalencia financiera, evaluación económica de proyectos (VPN, TIR, B/C) y reposición de activos.",
        program: "pregrado",
        area: "Finanzas",
        semester: "5º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. Carlos Osorio Ramírez"
    },
    {
        id: "gestion-produccion-logistica",
        slug: "gestion-produccion-logistica",
        code: "II723",
        title: "Gestión de la Producción y Logística",
        description: "Pronósticos de demanda estocástica, planificación agregada, control óptimo de inventarios EOQ/ROP y redes de cadena de suministro.",
        program: "pregrado",
        area: "Producción",
        semester: "7º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Ing. Wilson Arenas Valencia"
    },
    {
        id: "metodos-cuantitativos-algebra",
        slug: "metodos-cuantitativos-algebra",
        code: "CB213",
        title: "Métodos Cuantitativos y Álgebra Matricial",
        description: "Álgebra matricial aplicada, factorización LU y Cholesky, autovalores, autovectores, gradientes y optimización convexa multivariada.",
        program: "pregrado",
        area: "Ciencias Básicas",
        semester: "2º Semestre",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Área de Ciencias Básicas / UTP"
    },

    // Posgrado: Maestría en Investigación Operativa y Estadística (MIOE) (10 Asignaturas)
    {
        id: "mioe-s0-nivelatorio-matlab-python",
        slug: "mioe-s0-nivelatorio-matlab-python",
        code: "IOD10",
        title: "Computación Científica y Álgebra Matricial: MATLAB y Python",
        description: "Nivelatorio de posgrado en vectorización, álgebra lineal numérica computacional y optimización numérica univariada.",
        program: "posgrado",
        cycle: "S0 Nivelatorio",
        area: "Investigación de Operaciones",
        semester: "Ciclo S0 Nivelatorio",
        credits: 2,
        ects: 4,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Prof. Oscar Gómez Carmona"
    },
    {
        id: "mioe-s0-nivelatorio-investigacion-operaciones",
        slug: "mioe-s0-nivelatorio-investigacion-operaciones",
        code: "IOA10",
        title: "Fundamentos de Investigación de Operaciones",
        description: "Nivelatorio de posgrado en modelación determinística rigurosa, dualidad estricta y algoritmos de optimización computacional.",
        program: "posgrado",
        cycle: "S0 Nivelatorio",
        area: "Investigación de Operaciones",
        semester: "Ciclo S0 Nivelatorio",
        credits: 2,
        ects: 4,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dra. Eliana Mirledy Toro Ocampo"
    },
    {
        id: "mioe-s1-programacion-lineal-avanzada",
        slug: "mioe-s1-programacion-lineal-avanzada",
        code: "IO113",
        title: "Programación Lineal Avanzada",
        description: "Teoría poliédrica, Minkowski-Weyl, Simplex Revisado, descomposición de Dantzig-Wolfe y generación de columnas.",
        program: "posgrado",
        cycle: "S1 Obligatorias",
        area: "Investigación de Operaciones",
        semester: "Semestre 1 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dra. Eliana Mirledy Toro Ocampo"
    },
    {
        id: "mioe-s1-analisis-multivariado",
        slug: "mioe-s1-analisis-multivariado",
        code: "IO123",
        title: "Análisis Multivariado",
        description: "Normal multivariante, estadístico T2 de Hotelling, MANOVA, reducción espectral PCA, análisis factorial y análisis discriminante de Fisher.",
        program: "posgrado",
        cycle: "S1 Obligatorias",
        area: "Estadística",
        semester: "Semestre 1 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Mg. Jairo Alfonso Clavijo Méndez"
    },
    {
        id: "mioe-s1-diseno-experimentos",
        slug: "mioe-s1-diseno-experimentos",
        code: "IO133",
        title: "Diseño de Experimentos y Superficie de Respuesta",
        description: "Factoriales 2^k, fraccionados 2^(k-p), resolución y alias, diseños centrales compuestos (CCD) y metodología de superficie de respuesta RSM.",
        program: "posgrado",
        cycle: "S1 Obligatorias",
        area: "Estadística",
        semester: "Semestre 1 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. José A. Soto Mejía"
    },
    {
        id: "mioe-s1-simulacion-dinamica-sistemas",
        slug: "mioe-s1-simulacion-dinamica-sistemas",
        code: "IO143",
        title: "Simulación de Dinámica de Sistemas",
        description: "Pensamiento sistémico, ciclos causales CLD, diagramas de Forrester (Stock & Flow), arquetipos organizacionales e integración numérica RK4.",
        program: "posgrado",
        cycle: "S1 Obligatorias",
        area: "Investigación de Operaciones",
        semester: "Semestre 1 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. José A. Soto Mejía"
    },
    {
        id: "mioe-s2-programacion-no-lineal",
        slug: "mioe-s2-programacion-no-lineal",
        code: "IO213",
        title: "Programación No Lineal",
        description: "Optimización continua multivariada: convexidad, descenso de gradiente Armijo, Cuasi-Newton BFGS, condiciones KKT y penalización/barreras.",
        program: "posgrado",
        cycle: "S2 Especializadas",
        area: "Investigación de Operaciones",
        semester: "Semestre 2 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. Antonio Hernando Escobar Zuluaga"
    },
    {
        id: "mioe-s2-metaheuristicas",
        slug: "mioe-s2-metaheuristicas",
        code: "IO223",
        title: "Metaheurísticas y Optimización Combinatoria",
        description: "Recocido Simulado, Búsqueda Tabú con listas de memoria, Algoritmos Genéticos (OX, PMX) y Optimización por Enjambre de Partículas (PSO).",
        program: "posgrado",
        cycle: "S2 Especializadas",
        area: "Investigación de Operaciones",
        semester: "Semestre 2 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. Mauricio Granada Echeverri"
    },
    {
        id: "mioe-s2-optimizacion-financiera",
        slug: "mioe-s2-optimizacion-financiera",
        code: "IO233",
        title: "Optimización Financiera y Gestión de Riesgo",
        description: "Teoría clásica de Markowitz, frontera eficiente matricial, modelo CAPM, métricas de riesgo coherentes (VaR, CVaR) y programación estocástica.",
        program: "posgrado",
        cycle: "S2 Especializadas",
        area: "Finanzas",
        semester: "Semestre 2 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. Carlos Osorio Ramírez"
    },
    {
        id: "mioe-s2-analisis-envolvente-datos-dea",
        slug: "mioe-s2-analisis-envolvente-datos-dea",
        code: "IO243",
        title: "Análisis Envolvente de Datos (DEA)",
        description: "Eficiencia técnica y de escala en DMUs: modelos CCR (CRS), BCC (VRS), holguras de Pareto-Koopmans, benchmarking y modelos de red multietapa.",
        program: "posgrado",
        cycle: "S2 Especializadas",
        area: "Investigación de Operaciones",
        semester: "Semestre 2 (MIOE)",
        credits: 3,
        ects: 6,
        totalModules: 2,
        totalTopics: 4,
        coordinator: "Dr. José A. Soto Mejía"
    }
]

export function getOfficialCourseBySlug(slug: string): OfficialCourse | undefined {
    return OFFICIAL_COURSES.find(c => c.slug === slug)
}
