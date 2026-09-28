/**
 * Buscador Global Inteligente de StatsEdu UTP
 * Archivo autogenerado con indexación completa de asignaturas, herramientas y lecciones.
 * Total de elementos indexados: 171
 * - Asignaturas oficiales: 21
 * - Herramientas interactivas: 10
 * - Accesos de navegación: 4
 * - Lecciones y contenidos MDX: 136
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

export const SEARCH_ITEMS: SearchItem[] = [
    {
        "id": "nav-home",
        "title": "Inicio",
        "subtitle": "Portal institucional de la Facultad de Ingeniería Industrial UTP",
        "category": "Navegación",
        "href": "/",
        "tags": [
            "inicio",
            "home",
            "portal",
            "utp",
            "principal",
            "bienvenida",
            "industrial"
        ]
    },
    {
        "id": "nav-courses",
        "title": "Aulas Virtuales",
        "subtitle": "Catálogo oficial de las 21 asignaturas de Pregrado y Posgrado MIOE",
        "category": "Navegación",
        "href": "/courses",
        "tags": [
            "aulas",
            "cursos",
            "asignaturas",
            "catalogo",
            "clases",
            "pregrado",
            "posgrado",
            "mioe"
        ]
    },
    {
        "id": "nav-tools",
        "title": "Suite de Herramientas Computacionales",
        "subtitle": "Laboratorio de cálculo reactivo, solver simplex, colas, markov y finanzas",
        "category": "Navegación",
        "href": "/tools",
        "tags": [
            "herramientas",
            "suite",
            "calculadoras",
            "laboratorio",
            "geio",
            "simuladores",
            "workbench"
        ]
    },
    {
        "id": "nav-dashboard",
        "title": "Mi Progreso",
        "subtitle": "Panel individual de avance académico, lecciones completadas y evaluaciones",
        "category": "Navegación",
        "href": "/dashboard",
        "tags": [
            "progreso",
            "dashboard",
            "avance",
            "notas",
            "evaluaciones",
            "quizzes",
            "perfil",
            "estudiante"
        ]
    },
    {
        "id": "tool-simplex",
        "title": "Resolutor del Método Simplex Primal",
        "subtitle": "Programación lineal con tablas simplex paso a paso, pivoteo interactivo y dualidad",
        "code": "II7D3 / IO113",
        "program": "Transversal",
        "category": "Herramientas Computacionales",
        "href": "/tools#simplex",
        "tags": [
            "simplex",
            "programacion lineal",
            "optimizacion",
            "precios sombra",
            "dualidad",
            "pivoteo",
            "maximizacion",
            "minimizacion",
            "tabla simplex",
            "tableau"
        ]
    },
    {
        "id": "tool-queueing",
        "title": "Calculadora de Teoría de Colas (M/M/s)",
        "subtitle": "Modelos markovianos M/M/1, M/M/s, capacidad finita, fórmulas de Little y Erlang-C",
        "code": "II8B3 / II713",
        "program": "Pregrado",
        "category": "Herramientas Computacionales",
        "href": "/tools#queueing",
        "tags": [
            "colas",
            "teoria de colas",
            "m/m/1",
            "m/m/s",
            "erlang-c",
            "lineas de espera",
            "little",
            "servidores",
            "trafico",
            "espera",
            "poisson"
        ]
    },
    {
        "id": "tool-markov",
        "title": "Analizador de Cadenas de Markov (DTMC)",
        "subtitle": "Matrices de transición estocástica 2x2/3x3, potencias Pⁿ, distribución estacionaria π y Monte Carlo",
        "code": "II713 / IO113",
        "program": "Transversal",
        "category": "Herramientas Computacionales",
        "href": "/tools#markov",
        "tags": [
            "markov",
            "cadenas de markov",
            "transicion estocastica",
            "matriz p",
            "estado estacionario",
            "ergodicidad",
            "monte carlo",
            "dtmc",
            "estocastico"
        ]
    },
    {
        "id": "tool-economics",
        "title": "Ingeniería Económica: Finanzas VPN / TIR",
        "subtitle": "Evaluación de proyectos de inversión con Valor Presente Neto, TIR, Payback y relación B/C",
        "code": "II543",
        "program": "Pregrado",
        "category": "Herramientas Computacionales",
        "href": "/tools#economics",
        "tags": [
            "finanzas",
            "vpn",
            "tir",
            "van",
            "irr",
            "payback",
            "beneficio costo",
            "flujo de caja",
            "tasa de descuento",
            "evaluacion financiera",
            "rentabilidad"
        ]
    },
    {
        "id": "tool-dea",
        "title": "Eficiencia Técnica DEA (CCR Insumo-Orientado)",
        "subtitle": "Análisis Envolvente de Datos, frontera de eficiencia no paramétrica y benchmarking de DMUs",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Herramientas Computacionales",
        "href": "/tools#dea",
        "tags": [
            "dea",
            "analisis envolvente",
            "eficiencia tecnica",
            "ccr",
            "bcc",
            "dmu",
            "benchmarking",
            "frontera eficiente",
            "productividad",
            "insumo orientado"
        ]
    },
    {
        "id": "tool-distributions",
        "title": "Workbench de Distribuciones Estadísticas",
        "subtitle": "Visualizador reactivo de distribuciones Continuas (Normal, Student, Chi², F) y Discretas (Poisson, Binomial)",
        "code": "II4D3 / II5A3",
        "program": "Pregrado",
        "category": "Herramientas Computacionales",
        "href": "/tools#distributions",
        "tags": [
            "distribuciones",
            "workbench",
            "normal",
            "gaussiana",
            "student",
            "chi-cuadrado",
            "poisson",
            "binomial",
            "exponencial",
            "quantiles",
            "densidad",
            "probabilidad"
        ]
    },
    {
        "id": "tool-spc",
        "title": "Control Estadístico de Calidad & Capacidad (SPC)",
        "subtitle": "Gráficos Shewhart X-barra y R, límites de control ±3σ e índices Cp, Cpk, Cpm y nivel Sigma",
        "code": "II5A3 / II6A2",
        "program": "Pregrado",
        "category": "Herramientas Computacionales",
        "href": "/tools#spc",
        "tags": [
            "spc",
            "calidad",
            "shewhart",
            "x-bar",
            "graficos de control",
            "cp",
            "cpk",
            "capacidad",
            "sigma",
            "ppm",
            "tolerancias"
        ]
    },
    {
        "id": "tool-inventory",
        "title": "Optimizador de Inventarios & Lote Económico (EOQ / ROP)",
        "subtitle": "Lote económico de pedido (EOQ), punto de reorden (ROP) bajo demanda estocástica y stock de seguridad",
        "code": "II723 / II8B3",
        "program": "Pregrado",
        "category": "Herramientas Computacionales",
        "href": "/tools#inventory",
        "tags": [
            "inventarios",
            "eoq",
            "lote economico",
            "rop",
            "punto de reorden",
            "stock de seguridad",
            "cadena de suministro",
            "almacen",
            "costo mantener"
        ]
    },
    {
        "id": "tool-forecasting",
        "title": "Pronósticos de Demanda & Series de Tiempo",
        "subtitle": "Suavizamiento Exponencial Simple (SES), Modelo de Holt (Tendencia lineal) y Promedios Móviles con MAD/MAPE",
        "code": "II723 / IO123",
        "program": "Transversal",
        "category": "Herramientas Computacionales",
        "href": "/tools#forecasting",
        "tags": [
            "pronosticos",
            "demanda",
            "series de tiempo",
            "holt",
            "suavizamiento exponencial",
            "mad",
            "mape",
            "rmse",
            "tracking signal",
            "prediccion"
        ]
    },
    {
        "id": "tool-cpm",
        "title": "Optimizador de Redes de Proyectos (CPM / PERT)",
        "subtitle": "Cálculo de ruta crítica, holguras totales (ES, EF, LS, LF), varianza del proyecto y probabilidad Z",
        "code": "II7D3 / II8B3 / MIOE",
        "program": "Transversal",
        "category": "Herramientas Computacionales",
        "href": "/tools#cpm",
        "tags": [
            "cpm",
            "pert",
            "ruta critica",
            "proyectos",
            "redes",
            "holgura",
            "grafo",
            "gestion de proyectos",
            "tiempo esperado",
            "varianza pert"
        ]
    },
    {
        "id": "course-administracion-industrial",
        "title": "Administración Industrial",
        "subtitle": "Código II143 • Pregrado en Ingeniería Industrial",
        "code": "II143",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/administracion-industrial",
        "tags": [
            "ii143",
            "administración industrial",
            "administracion industrial",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-estadistica-i",
        "title": "Estadística I",
        "subtitle": "Código II4D3 • Pregrado en Ingeniería Industrial",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/estadistica-i",
        "tags": [
            "ii4d3",
            "estadística i",
            "estadistica i",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-estadistica-ii",
        "title": "Estadística II",
        "subtitle": "Código II5A3 • Pregrado en Ingeniería Industrial",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/estadistica-ii",
        "tags": [
            "ii5a3",
            "estadística ii",
            "estadistica ii",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-estadistica-iii",
        "title": "Estadística III",
        "subtitle": "Código II6A2 • Pregrado en Ingeniería Industrial",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/estadistica-iii",
        "tags": [
            "ii6a2",
            "estadística iii",
            "estadistica iii",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-gestion-produccion-logistica",
        "title": "Gestión de la Producción y Logística",
        "subtitle": "Código II723 • Pregrado en Ingeniería Industrial",
        "code": "II723",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/gestion-produccion-logistica",
        "tags": [
            "ii723",
            "gestión de la producción y logística",
            "gestion produccion logistica",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-ingenieria-economica-finanzas",
        "title": "Ingeniería Económica y Finanzas",
        "subtitle": "Código II543 • Pregrado en Ingeniería Industrial",
        "code": "II543",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/ingenieria-economica-finanzas",
        "tags": [
            "ii543",
            "ingeniería económica y finanzas",
            "ingenieria economica finanzas",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-investigacion-operaciones-i",
        "title": "Investigación de Operaciones I",
        "subtitle": "Código II7D3 • Pregrado en Ingeniería Industrial",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/investigacion-operaciones-i",
        "tags": [
            "ii7d3",
            "investigación de operaciones i",
            "investigacion operaciones i",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-investigacion-operaciones-ii",
        "title": "Investigación de Operaciones II",
        "subtitle": "Código II8B3 • Pregrado en Ingeniería Industrial",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/investigacion-operaciones-ii",
        "tags": [
            "ii8b3",
            "investigación de operaciones ii",
            "investigacion operaciones ii",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-metodos-cuantitativos-algebra",
        "title": "Métodos Cuantitativos y Álgebra Matricial",
        "subtitle": "Código CB213 • Pregrado en Ingeniería Industrial",
        "code": "CB213",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/metodos-cuantitativos-algebra",
        "tags": [
            "cb213",
            "métodos cuantitativos y álgebra matricial",
            "metodos cuantitativos algebra",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s0-nivelatorio-investigacion-operaciones",
        "title": "Fundamentos de Investigación de Operaciones",
        "subtitle": "Código IOA10 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IOA10",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s0-nivelatorio-investigacion-operaciones",
        "tags": [
            "ioa10",
            "fundamentos de investigación de operaciones",
            "mioe s0 nivelatorio investigacion operaciones",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s0-nivelatorio-matlab-python",
        "title": "Computación Científica y Álgebra Matricial: MATLAB y Python",
        "subtitle": "Código IOD10 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IOD10",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s0-nivelatorio-matlab-python",
        "tags": [
            "iod10",
            "computación científica y álgebra matricial: matlab y python",
            "mioe s0 nivelatorio matlab python",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s1-analisis-multivariado",
        "title": "Análisis Multivariado",
        "subtitle": "Código IO123 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO123",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s1-analisis-multivariado",
        "tags": [
            "io123",
            "análisis multivariado",
            "mioe s1 analisis multivariado",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s1-diseno-experimentos",
        "title": "Diseño de Experimentos y Superficie de Respuesta",
        "subtitle": "Código IO133 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO133",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s1-diseno-experimentos",
        "tags": [
            "io133",
            "diseño de experimentos y superficie de respuesta",
            "mioe s1 diseno experimentos",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s1-programacion-lineal-avanzada",
        "title": "Programación Lineal Avanzada",
        "subtitle": "Código IO113 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO113",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s1-programacion-lineal-avanzada",
        "tags": [
            "io113",
            "programación lineal avanzada",
            "mioe s1 programacion lineal avanzada",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s1-simulacion-dinamica-sistemas",
        "title": "Simulación de Dinámica de Sistemas",
        "subtitle": "Código IO143 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO143",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s1-simulacion-dinamica-sistemas",
        "tags": [
            "io143",
            "simulación de dinámica de sistemas",
            "mioe s1 simulacion dinamica sistemas",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s2-analisis-envolvente-datos-dea",
        "title": "Análisis Envolvente de Datos (DEA)",
        "subtitle": "Código IO243 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s2-analisis-envolvente-datos-dea",
        "tags": [
            "io243",
            "análisis envolvente de datos (dea)",
            "mioe s2 analisis envolvente datos dea",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s2-metaheuristicas",
        "title": "Metaheurísticas y Optimización Combinatoria",
        "subtitle": "Código IO223 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO223",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s2-metaheuristicas",
        "tags": [
            "io223",
            "metaheurísticas y optimización combinatoria",
            "mioe s2 metaheuristicas",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s2-optimizacion-financiera",
        "title": "Optimización Financiera y Gestión de Riesgo",
        "subtitle": "Código IO233 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO233",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s2-optimizacion-financiera",
        "tags": [
            "io233",
            "optimización financiera y gestión de riesgo",
            "mioe s2 optimizacion financiera",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-mioe-s2-programacion-no-lineal",
        "title": "Programación No Lineal",
        "subtitle": "Código IO213 • Posgrado MIOE en Ingeniería Industrial",
        "code": "IO213",
        "program": "Posgrado MIOE",
        "category": "Asignaturas",
        "href": "/courses/mioe-s2-programacion-no-lineal",
        "tags": [
            "io213",
            "programación no lineal",
            "mioe s2 programacion no lineal",
            "posgrado mioe",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-procesos-estocasticos",
        "title": "Procesos Estocásticos",
        "subtitle": "Código II713 • Pregrado en Ingeniería Industrial",
        "code": "II713",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/procesos-estocasticos",
        "tags": [
            "ii713",
            "procesos estocásticos",
            "procesos estocasticos",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "course-simulacion",
        "title": "Simulación de Sistemas",
        "subtitle": "Código II863 • Pregrado en Ingeniería Industrial",
        "code": "II863",
        "program": "Pregrado",
        "category": "Asignaturas",
        "href": "/courses/simulacion",
        "tags": [
            "ii863",
            "simulación de sistemas",
            "simulacion",
            "pregrado",
            "asignatura",
            "curso",
            "utp"
        ]
    },
    {
        "id": "topic-administracion-industrial-01-evolucion-taylor-a-lean",
        "title": "Evolución de la Administración Industrial: De Taylor a Lean Manufacturing",
        "subtitle": "II143 (Administración Industrial) • Teoría Organizacional y Modelado de Procesos",
        "code": "II143",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/administracion-industrial/01-evolucion-taylor-a-lean",
        "tags": [
            "ii143",
            "evolución de la administración industrial: de taylor a lean manufacturing",
            "teoría organizacional y modelado de procesos",
            "administración industrial",
            "01 evolucion taylor a lean"
        ]
    },
    {
        "id": "topic-administracion-industrial-02-modelamiento-procesos-bpmn",
        "title": "Mapeo y Modelamiento de Procesos con Notación BPMN",
        "subtitle": "II143 (Administración Industrial) • Teoría Organizacional y Modelado de Procesos",
        "code": "II143",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/administracion-industrial/02-modelamiento-procesos-bpmn",
        "tags": [
            "ii143",
            "mapeo y modelamiento de procesos con notación bpmn",
            "teoría organizacional y modelado de procesos",
            "administración industrial",
            "02 modelamiento procesos bpmn"
        ]
    },
    {
        "id": "topic-administracion-industrial-01-kpi-cuadro-mando-integral",
        "title": "Indicadores Clave de Rendimiento (KPI) y Cuadro de Mando",
        "subtitle": "II143 (Administración Industrial) • Gestión Estratégica y Productividad",
        "code": "II143",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/administracion-industrial/01-kpi-cuadro-mando-integral",
        "tags": [
            "ii143",
            "indicadores clave de rendimiento (kpi) y cuadro de mando",
            "gestión estratégica y productividad",
            "administración industrial",
            "01 kpi cuadro mando integral"
        ]
    },
    {
        "id": "topic-administracion-industrial-02-medicion-mejoramiento-productividad",
        "title": "Modelos de Medición y Optimización de la Productividad Total",
        "subtitle": "II143 (Administración Industrial) • Gestión Estratégica y Productividad",
        "code": "II143",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/administracion-industrial/02-medicion-mejoramiento-productividad",
        "tags": [
            "ii143",
            "modelos de medición y optimización de la productividad total",
            "gestión estratégica y productividad",
            "administración industrial",
            "02 medicion mejoramiento productividad"
        ]
    },
    {
        "id": "topic-estadistica-i-01-tipos-de-variables",
        "title": "Tipos de Variables y Escalas de Medición",
        "subtitle": "II4D3 (Estadística I) • Unidad 1: Análisis Exploratorio de Datos (EDA)",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-tipos-de-variables",
        "tags": [
            "ii4d3",
            "tipos de variables y escalas de medición",
            "unidad 1: análisis exploratorio de datos (eda)",
            "estadística i",
            "01 tipos de variables"
        ]
    },
    {
        "id": "topic-estadistica-i-02-introduccion-pandas",
        "title": "Lab: Introducción a Pandas para Datos",
        "subtitle": "II4D3 (Estadística I) • Unidad 1: Análisis Exploratorio de Datos (EDA)",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-introduccion-pandas",
        "tags": [
            "ii4d3",
            "lab: introducción a pandas para datos",
            "unidad 1: análisis exploratorio de datos (eda)",
            "estadística i",
            "02 introduccion pandas"
        ]
    },
    {
        "id": "topic-estadistica-i-03-medidas-tendencia-central",
        "title": "Centralidad: Más allá del Promedio",
        "subtitle": "II4D3 (Estadística I) • Unidad 1: Análisis Exploratorio de Datos (EDA)",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-medidas-tendencia-central",
        "tags": [
            "ii4d3",
            "centralidad: más allá del promedio",
            "unidad 1: análisis exploratorio de datos (eda)",
            "estadística i",
            "03 medidas tendencia central"
        ]
    },
    {
        "id": "topic-estadistica-i-04-medidas-dispersion",
        "title": "Dispersión: La medida del Riesgo",
        "subtitle": "II4D3 (Estadística I) • Unidad 1: Análisis Exploratorio de Datos (EDA)",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-medidas-dispersion",
        "tags": [
            "ii4d3",
            "dispersión: la medida del riesgo",
            "unidad 1: análisis exploratorio de datos (eda)",
            "estadística i",
            "04 medidas dispersion"
        ]
    },
    {
        "id": "topic-estadistica-i-05-visualizacion-basica",
        "title": "Lab: Histogramas y Boxplots",
        "subtitle": "II4D3 (Estadística I) • Unidad 1: Análisis Exploratorio de Datos (EDA)",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/05-visualizacion-basica",
        "tags": [
            "ii4d3",
            "lab: histogramas y boxplots",
            "unidad 1: análisis exploratorio de datos (eda)",
            "estadística i",
            "05 visualizacion basica"
        ]
    },
    {
        "id": "topic-estadistica-i-01-tecnicas-conteo",
        "title": "Técnicas de Conteo: El Arte de Enumerar",
        "subtitle": "II4D3 (Estadística I) • Unidad 2: Probabilidad y Variables Aleatorias",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-tecnicas-conteo",
        "tags": [
            "ii4d3",
            "técnicas de conteo: el arte de enumerar",
            "unidad 2: probabilidad y variables aleatorias",
            "estadística i",
            "01 tecnicas conteo"
        ]
    },
    {
        "id": "topic-estadistica-i-02-teorema-bayes",
        "title": "Teorema de Bayes: La Máquina de la Verdad",
        "subtitle": "II4D3 (Estadística I) • Unidad 2: Probabilidad y Variables Aleatorias",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-teorema-bayes",
        "tags": [
            "ii4d3",
            "teorema de bayes: la máquina de la verdad",
            "unidad 2: probabilidad y variables aleatorias",
            "estadística i",
            "02 teorema bayes"
        ]
    },
    {
        "id": "topic-estadistica-i-03-va-discreta",
        "title": "Variables Aleatorias: El Puente Numérico",
        "subtitle": "II4D3 (Estadística I) • Unidad 2: Probabilidad y Variables Aleatorias",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-va-discreta",
        "tags": [
            "ii4d3",
            "variables aleatorias: el puente numérico",
            "unidad 2: probabilidad y variables aleatorias",
            "estadística i",
            "03 va discreta"
        ]
    },
    {
        "id": "topic-estadistica-i-04-dist-binomial-poisson",
        "title": "Distribuciones Clásicas: Binomial y Poisson",
        "subtitle": "II4D3 (Estadística I) • Unidad 2: Probabilidad y Variables Aleatorias",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-dist-binomial-poisson",
        "tags": [
            "ii4d3",
            "distribuciones clásicas: binomial y poisson",
            "unidad 2: probabilidad y variables aleatorias",
            "estadística i",
            "04 dist binomial poisson"
        ]
    },
    {
        "id": "topic-estadistica-i-01-distribucion-normal",
        "title": "La Distribución Normal: La Reina de las Estadísticas",
        "subtitle": "II4D3 (Estadística I) • Distribuciones de Probabilidad Continuas",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-distribucion-normal",
        "tags": [
            "ii4d3",
            "la distribución normal: la reina de las estadísticas",
            "distribuciones de probabilidad continuas",
            "estadística i",
            "01 distribucion normal"
        ]
    },
    {
        "id": "topic-estadistica-i-02-distribucion-exponencial",
        "title": "Distribución Exponencial: Modelando el Tiempo",
        "subtitle": "II4D3 (Estadística I) • Distribuciones de Probabilidad Continuas",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-distribucion-exponencial",
        "tags": [
            "ii4d3",
            "distribución exponencial: modelando el tiempo",
            "distribuciones de probabilidad continuas",
            "estadística i",
            "02 distribucion exponencial"
        ]
    },
    {
        "id": "topic-estadistica-i-03-otras-distribuciones",
        "title": "Otras Distribuciones Continuas: Uniforme y Gamma",
        "subtitle": "II4D3 (Estadística I) • Distribuciones de Probabilidad Continuas",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-otras-distribuciones",
        "tags": [
            "ii4d3",
            "otras distribuciones continuas: uniforme y gamma",
            "distribuciones de probabilidad continuas",
            "estadística i",
            "03 otras distribuciones"
        ]
    },
    {
        "id": "topic-estadistica-i-04-teorema-limite-central",
        "title": "Teorema del Límite Central: El Milagro de la Estadística",
        "subtitle": "II4D3 (Estadística I) • Distribuciones de Probabilidad Continuas",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-teorema-limite-central",
        "tags": [
            "ii4d3",
            "teorema del límite central: el milagro de la estadística",
            "distribuciones de probabilidad continuas",
            "estadística i",
            "04 teorema limite central"
        ]
    },
    {
        "id": "topic-estadistica-i-01-estimacion-puntual",
        "title": "Estimación Puntual: Del Muestreo a la Inferencia",
        "subtitle": "II4D3 (Estadística I) • Inferencia Estadística: Estimación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-estimacion-puntual",
        "tags": [
            "ii4d3",
            "estimación puntual: del muestreo a la inferencia",
            "inferencia estadística: estimación",
            "estadística i",
            "01 estimacion puntual"
        ]
    },
    {
        "id": "topic-estadistica-i-02-intervalos-confianza-media",
        "title": "Intervalos de Confianza para la Media",
        "subtitle": "II4D3 (Estadística I) • Inferencia Estadística: Estimación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-intervalos-confianza-media",
        "tags": [
            "ii4d3",
            "intervalos de confianza para la media",
            "inferencia estadística: estimación",
            "estadística i",
            "02 intervalos confianza media"
        ]
    },
    {
        "id": "topic-estadistica-i-03-intervalos-confianza-proporcion",
        "title": "Intervalos de Confianza para Proporciones",
        "subtitle": "II4D3 (Estadística I) • Inferencia Estadística: Estimación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-intervalos-confianza-proporcion",
        "tags": [
            "ii4d3",
            "intervalos de confianza para proporciones",
            "inferencia estadística: estimación",
            "estadística i",
            "03 intervalos confianza proporcion"
        ]
    },
    {
        "id": "topic-estadistica-i-04-tamano-muestra",
        "title": "Determinación del Tamaño de Muestra",
        "subtitle": "II4D3 (Estadística I) • Inferencia Estadística: Estimación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-tamano-muestra",
        "tags": [
            "ii4d3",
            "determinación del tamaño de muestra",
            "inferencia estadística: estimación",
            "estadística i",
            "04 tamano muestra"
        ]
    },
    {
        "id": "topic-estadistica-i-01-fundamentos-hipotesis",
        "title": "Fundamentos de Pruebas de Hipótesis",
        "subtitle": "II4D3 (Estadística I) • Pruebas de Hipótesis",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-fundamentos-hipotesis",
        "tags": [
            "ii4d3",
            "fundamentos de pruebas de hipótesis",
            "pruebas de hipótesis",
            "estadística i",
            "01 fundamentos hipotesis"
        ]
    },
    {
        "id": "topic-estadistica-i-02-prueba-z-media",
        "title": "Prueba Z para la Media (σ Conocido)",
        "subtitle": "II4D3 (Estadística I) • Pruebas de Hipótesis",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-prueba-z-media",
        "tags": [
            "ii4d3",
            "prueba z para la media (σ conocido)",
            "pruebas de hipótesis",
            "estadística i",
            "02 prueba z media"
        ]
    },
    {
        "id": "topic-estadistica-i-03-prueba-t-media",
        "title": "Prueba t para la Media (σ Desconocido)",
        "subtitle": "II4D3 (Estadística I) • Pruebas de Hipótesis",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-prueba-t-media",
        "tags": [
            "ii4d3",
            "prueba t para la media (σ desconocido)",
            "pruebas de hipótesis",
            "estadística i",
            "03 prueba t media"
        ]
    },
    {
        "id": "topic-estadistica-i-04-prueba-proporciones",
        "title": "Prueba de Hipótesis para Proporciones",
        "subtitle": "II4D3 (Estadística I) • Pruebas de Hipótesis",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-prueba-proporciones",
        "tags": [
            "ii4d3",
            "prueba de hipótesis para proporciones",
            "pruebas de hipótesis",
            "estadística i",
            "04 prueba proporciones"
        ]
    },
    {
        "id": "topic-estadistica-i-01-correlacion",
        "title": "Correlación: Midiendo la Relación entre Variables",
        "subtitle": "II4D3 (Estadística I) • Regresión y Correlación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/01-correlacion",
        "tags": [
            "ii4d3",
            "correlación: midiendo la relación entre variables",
            "regresión y correlación",
            "estadística i",
            "01 correlacion"
        ]
    },
    {
        "id": "topic-estadistica-i-02-regresion-lineal-simple",
        "title": "Regresión Lineal Simple: Prediciendo el Futuro",
        "subtitle": "II4D3 (Estadística I) • Regresión y Correlación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/02-regresion-lineal-simple",
        "tags": [
            "ii4d3",
            "regresión lineal simple: prediciendo el futuro",
            "regresión y correlación",
            "estadística i",
            "02 regresion lineal simple"
        ]
    },
    {
        "id": "topic-estadistica-i-03-evaluacion-modelo",
        "title": "Evaluación del Modelo de Regresión",
        "subtitle": "II4D3 (Estadística I) • Regresión y Correlación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/03-evaluacion-modelo",
        "tags": [
            "ii4d3",
            "evaluación del modelo de regresión",
            "regresión y correlación",
            "estadística i",
            "03 evaluacion modelo"
        ]
    },
    {
        "id": "topic-estadistica-i-04-prediccion-aplicaciones",
        "title": "Predicción e Intervalos de Confianza",
        "subtitle": "II4D3 (Estadística I) • Regresión y Correlación",
        "code": "II4D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-i/04-prediccion-aplicaciones",
        "tags": [
            "ii4d3",
            "predicción e intervalos de confianza",
            "regresión y correlación",
            "estadística i",
            "04 prediccion aplicaciones"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-muestreo-aleatorio-estratificado",
        "title": "Técnicas de Muestreo Probabilístico y Afijación Óptima",
        "subtitle": "II5A3 (Estadística II) • Unidad 1: Métodos de Muestreo y Distribuciones Muestrales",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-muestreo-aleatorio-estratificado",
        "tags": [
            "ii5a3",
            "técnicas de muestreo probabilístico y afijación óptima",
            "unidad 1: métodos de muestreo y distribuciones muestrales",
            "estadística ii",
            "01 muestreo aleatorio estratificado"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-distribuciones-muestrales-chi-t-f",
        "title": "Distribuciones Muestrales Derivadas: Chi-Cuadrado, t y F",
        "subtitle": "II5A3 (Estadística II) • Unidad 1: Métodos de Muestreo y Distribuciones Muestrales",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-distribuciones-muestrales-chi-t-f",
        "tags": [
            "ii5a3",
            "distribuciones muestrales derivadas: chi-cuadrado, t y f",
            "unidad 1: métodos de muestreo y distribuciones muestrales",
            "estadística ii",
            "02 distribuciones muestrales chi t f"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-anova-un-factor",
        "title": "Análisis de Varianza (ANOVA) de un Factor",
        "subtitle": "II5A3 (Estadística II) • Unidad 2: Análisis de Varianza (ANOVA)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-anova-un-factor",
        "tags": [
            "ii5a3",
            "análisis de varianza (anova) de un factor",
            "unidad 2: análisis de varianza (anova)",
            "estadística ii",
            "01 anova un factor"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-pruebas-post-hoc-tukey",
        "title": "Comparaciones Múltiples: Pruebas Post-Hoc de Tukey, Bonferroni y Dunnett",
        "subtitle": "II5A3 (Estadística II) • Unidad 2: Análisis de Varianza (ANOVA)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-pruebas-post-hoc-tukey",
        "tags": [
            "ii5a3",
            "comparaciones múltiples: pruebas post-hoc de tukey, bonferroni y dunnett",
            "unidad 2: análisis de varianza (anova)",
            "estadística ii",
            "02 pruebas post hoc tukey"
        ]
    },
    {
        "id": "topic-estadistica-ii-03-anova-dos-factores",
        "title": "ANOVA Bifactorial: Efectos Principales y de Interacción",
        "subtitle": "II5A3 (Estadística II) • Unidad 2: Análisis de Varianza (ANOVA)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/03-anova-dos-factores",
        "tags": [
            "ii5a3",
            "anova bifactorial: efectos principales y de interacción",
            "unidad 2: análisis de varianza (anova)",
            "estadística ii",
            "03 anova dos factores"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-principios-diseno-experimentos",
        "title": "Fundamentos de DOE y Bloqueo al Azar (RCBD)",
        "subtitle": "II5A3 (Estadística II) • Unidad 3: Principios de Diseño de Experimentos (DOE)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-principios-diseno-experimentos",
        "tags": [
            "ii5a3",
            "fundamentos de doe y bloqueo al azar (rcbd)",
            "unidad 3: principios de diseño de experimentos (doe)",
            "estadística ii",
            "01 principios diseno experimentos"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-disenos-factoriales-2k",
        "title": "Diseños Factoriales 2^k y Análisis de Efectos",
        "subtitle": "II5A3 (Estadística II) • Unidad 3: Principios de Diseño de Experimentos (DOE)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-disenos-factoriales-2k",
        "tags": [
            "ii5a3",
            "diseños factoriales 2^k y análisis de efectos",
            "unidad 3: principios de diseño de experimentos (doe)",
            "estadística ii",
            "02 disenos factoriales 2k"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-bondad-ajuste-chi-cuadrado",
        "title": "Pruebas de Bondad de Ajuste e Independencia Chi-Cuadrado",
        "subtitle": "II5A3 (Estadística II) • Unidad 4: Pruebas No Paramétricas y Bondad de Ajuste",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-bondad-ajuste-chi-cuadrado",
        "tags": [
            "ii5a3",
            "pruebas de bondad de ajuste e independencia chi-cuadrado",
            "unidad 4: pruebas no paramétricas y bondad de ajuste",
            "estadística ii",
            "01 bondad ajuste chi cuadrado"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-mann-whitney-kruskal-wallis",
        "title": "Pruebas No Paramétricas: Mann-Whitney y Kruskal-Wallis",
        "subtitle": "II5A3 (Estadística II) • Unidad 4: Pruebas No Paramétricas y Bondad de Ajuste",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-mann-whitney-kruskal-wallis",
        "tags": [
            "ii5a3",
            "pruebas no paramétricas: mann-whitney y kruskal-wallis",
            "unidad 4: pruebas no paramétricas y bondad de ajuste",
            "estadística ii",
            "02 mann whitney kruskal wallis"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-modelo-regresion-multiple",
        "title": "El Modelo de Regresión Lineal Múltiple",
        "subtitle": "II5A3 (Estadística II) • Unidad 5: Regresión Lineal Múltiple y Diagnóstico",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-modelo-regresion-multiple",
        "tags": [
            "ii5a3",
            "el modelo de regresión lineal múltiple",
            "unidad 5: regresión lineal múltiple y diagnóstico",
            "estadística ii",
            "01 modelo regresion multiple"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-evaluacion-diagnostico-supuestos",
        "title": "Diagnóstico de Supuestos y Multicolinealidad en Regresión",
        "subtitle": "II5A3 (Estadística II) • Unidad 5: Regresión Lineal Múltiple y Diagnóstico",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-evaluacion-diagnostico-supuestos",
        "tags": [
            "ii5a3",
            "diagnóstico de supuestos y multicolinealidad en regresión",
            "unidad 5: regresión lineal múltiple y diagnóstico",
            "estadística ii",
            "02 evaluacion diagnostico supuestos"
        ]
    },
    {
        "id": "topic-estadistica-ii-01-graficos-control-variables",
        "title": "Control Estadístico de Procesos (SPC) y Cartas X-Barra y R",
        "subtitle": "II5A3 (Estadística II) • Unidad 6: Control Estadístico de la Calidad (SPC)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/01-graficos-control-variables",
        "tags": [
            "ii5a3",
            "control estadístico de procesos (spc) y cartas x-barra y r",
            "unidad 6: control estadístico de la calidad (spc)",
            "estadística ii",
            "01 graficos control variables"
        ]
    },
    {
        "id": "topic-estadistica-ii-02-capacidad-del-proceso",
        "title": "Análisis de Capacidad del Proceso: Cp, Cpk y Six Sigma",
        "subtitle": "II5A3 (Estadística II) • Unidad 6: Control Estadístico de la Calidad (SPC)",
        "code": "II5A3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-ii/02-capacidad-del-proceso",
        "tags": [
            "ii5a3",
            "análisis de capacidad del proceso: cp, cpk y six sigma",
            "unidad 6: control estadístico de la calidad (spc)",
            "estadística ii",
            "02 capacidad del proceso"
        ]
    },
    {
        "id": "topic-estadistica-iii-01-modelo-lineal-multiple-matricial",
        "title": "Modelo Lineal Múltiple en Notación Matricial",
        "subtitle": "II6A2 (Estadística III) • Regresión Múltiple y Correlación",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/01-modelo-lineal-multiple-matricial",
        "tags": [
            "ii6a2",
            "modelo lineal múltiple en notación matricial",
            "regresión múltiple y correlación",
            "estadística iii",
            "01 modelo lineal multiple matricial"
        ]
    },
    {
        "id": "topic-estadistica-iii-02-multicolinealidad-diagnosticos",
        "title": "Multicolinealidad y Diagnósticos del Modelo",
        "subtitle": "II6A2 (Estadística III) • Regresión Múltiple y Correlación",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/02-multicolinealidad-diagnosticos",
        "tags": [
            "ii6a2",
            "multicolinealidad y diagnósticos del modelo",
            "regresión múltiple y correlación",
            "estadística iii",
            "02 multicolinealidad diagnosticos"
        ]
    },
    {
        "id": "topic-estadistica-iii-01-anova-un-factor-dbca",
        "title": "ANOVA de un Factor y Bloques Completos al Azar (DBCA)",
        "subtitle": "II6A2 (Estadística III) • Diseño de Experimentos y ANOVA",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/01-anova-un-factor-dbca",
        "tags": [
            "ii6a2",
            "anova de un factor y bloques completos al azar (dbca)",
            "diseño de experimentos y anova",
            "estadística iii",
            "01 anova un factor dbca"
        ]
    },
    {
        "id": "topic-estadistica-iii-02-disenos-factoriales",
        "title": "Diseños Factoriales 2^k y Análisis de Interacción",
        "subtitle": "II6A2 (Estadística III) • Diseño de Experimentos y ANOVA",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/02-disenos-factoriales",
        "tags": [
            "ii6a2",
            "diseños factoriales 2^k y análisis de interacción",
            "diseño de experimentos y anova",
            "estadística iii",
            "02 disenos factoriales"
        ]
    },
    {
        "id": "topic-estadistica-iii-01-graficos-control-variables-atributos",
        "title": "Gráficos de Control por Variables y Atributos",
        "subtitle": "II6A2 (Estadística III) • Control Estadístico de Calidad",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/01-graficos-control-variables-atributos",
        "tags": [
            "ii6a2",
            "gráficos de control por variables y atributos",
            "control estadístico de calidad",
            "estadística iii",
            "01 graficos control variables atributos"
        ]
    },
    {
        "id": "topic-estadistica-iii-02-capacidad-proceso-cp-cpk",
        "title": "Análisis de Capacidad de Proceso: Índices Cp, Cpk y Cpm",
        "subtitle": "II6A2 (Estadística III) • Control Estadístico de Calidad",
        "code": "II6A2",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/estadistica-iii/02-capacidad-proceso-cp-cpk",
        "tags": [
            "ii6a2",
            "análisis de capacidad de proceso: índices cp, cpk y cpm",
            "control estadístico de calidad",
            "estadística iii",
            "02 capacidad proceso cp cpk"
        ]
    },
    {
        "id": "topic-gestion-produccion-logistica-01-series-tiempo-suavizamiento",
        "title": "Series de Tiempo y Suavizamiento Exponencial Simple",
        "subtitle": "II723 (Gestión de la Producción y Logística) • Pronósticos Cuantitativos de Demanda",
        "code": "II723",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/gestion-produccion-logistica/01-series-tiempo-suavizamiento",
        "tags": [
            "ii723",
            "series de tiempo y suavizamiento exponencial simple",
            "pronósticos cuantitativos de demanda",
            "gestión de la producción y logística",
            "01 series tiempo suavizamiento"
        ]
    },
    {
        "id": "topic-gestion-produccion-logistica-02-modelo-holt-winters-metricas-error",
        "title": "Modelo Holt-Winters y Métricas de Error (MAD, MSE, MAPE)",
        "subtitle": "II723 (Gestión de la Producción y Logística) • Pronósticos Cuantitativos de Demanda",
        "code": "II723",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/gestion-produccion-logistica/02-modelo-holt-winters-metricas-error",
        "tags": [
            "ii723",
            "modelo holt-winters y métricas de error (mad, mse, mape)",
            "pronósticos cuantitativos de demanda",
            "gestión de la producción y logística",
            "02 modelo holt winters metricas error"
        ]
    },
    {
        "id": "topic-gestion-produccion-logistica-01-modelo-lote-economico-eoq",
        "title": "Modelo de Lote Económico de Pedido (EOQ) y Extensiones",
        "subtitle": "II723 (Gestión de la Producción y Logística) • Gestión de Inventarios y Cadena de Suministro",
        "code": "II723",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/gestion-produccion-logistica/01-modelo-lote-economico-eoq",
        "tags": [
            "ii723",
            "modelo de lote económico de pedido (eoq) y extensiones",
            "gestión de inventarios y cadena de suministro",
            "gestión de la producción y logística",
            "01 modelo lote economico eoq"
        ]
    },
    {
        "id": "topic-gestion-produccion-logistica-02-punto-reorden-stock-seguridad",
        "title": "Punto de Reorden (ROP), Demanda Estocástica y Stock de Seguridad",
        "subtitle": "II723 (Gestión de la Producción y Logística) • Gestión de Inventarios y Cadena de Suministro",
        "code": "II723",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/gestion-produccion-logistica/02-punto-reorden-stock-seguridad",
        "tags": [
            "ii723",
            "punto de reorden (rop), demanda estocástica y stock de seguridad",
            "gestión de inventarios y cadena de suministro",
            "gestión de la producción y logística",
            "02 punto reorden stock seguridad"
        ]
    },
    {
        "id": "topic-ingenieria-economica-finanzas-01-valor-dinero-tasas-interes",
        "title": "Valor del Dinero en el Tiempo: Interés Compuesto y Tasas Efectivas",
        "subtitle": "II543 (Ingeniería Económica y Finanzas) • Matemáticas Financieras y Valor del Dinero",
        "code": "II543",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/ingenieria-economica-finanzas/01-valor-dinero-tasas-interes",
        "tags": [
            "ii543",
            "valor del dinero en el tiempo: interés compuesto y tasas efectivas",
            "matemáticas financieras y valor del dinero",
            "ingeniería económica y finanzas",
            "01 valor dinero tasas interes"
        ]
    },
    {
        "id": "topic-ingenieria-economica-finanzas-02-anualidades-gradientes",
        "title": "Series Uniformes, Anualidades y Gradientes",
        "subtitle": "II543 (Ingeniería Económica y Finanzas) • Matemáticas Financieras y Valor del Dinero",
        "code": "II543",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/ingenieria-economica-finanzas/02-anualidades-gradientes",
        "tags": [
            "ii543",
            "series uniformes, anualidades y gradientes",
            "matemáticas financieras y valor del dinero",
            "ingeniería económica y finanzas",
            "02 anualidades gradientes"
        ]
    },
    {
        "id": "topic-ingenieria-economica-finanzas-01-vpn-tir-decision-financiera",
        "title": "Valor Presente Neto (VPN) y Tasa Interna de Retorno (TIR)",
        "subtitle": "II543 (Ingeniería Económica y Finanzas) • Evaluación de Proyectos de Inversión",
        "code": "II543",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/ingenieria-economica-finanzas/01-vpn-tir-decision-financiera",
        "tags": [
            "ii543",
            "valor presente neto (vpn) y tasa interna de retorno (tir)",
            "evaluación de proyectos de inversión",
            "ingeniería económica y finanzas",
            "01 vpn tir decision financiera"
        ]
    },
    {
        "id": "topic-ingenieria-economica-finanzas-02-relacion-bc-caue-analisis-reemplazo",
        "title": "Relación Beneficio/Costo (B/C) y Costo Anual Uniforme Equivalente (CAUE)",
        "subtitle": "II543 (Ingeniería Económica y Finanzas) • Evaluación de Proyectos de Inversión",
        "code": "II543",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/ingenieria-economica-finanzas/02-relacion-bc-caue-analisis-reemplazo",
        "tags": [
            "ii543",
            "relación beneficio/costo (b/c) y costo anual uniforme equivalente (caue)",
            "evaluación de proyectos de inversión",
            "ingeniería económica y finanzas",
            "02 relacion bc caue analisis reemplazo"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-01-introduccion-modelacion-lineal",
        "title": "Introducción a la Programación Lineal y Formulación de Modelos",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 1: Modelación Matemática y Método Gráfico",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/01-introduccion-modelacion-lineal",
        "tags": [
            "ii7d3",
            "introducción a la programación lineal y formulación de modelos",
            "unidad 1: modelación matemática y método gráfico",
            "investigación de operaciones i",
            "01 introduccion modelacion lineal"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-02-metodo-grafico",
        "title": "El Método Gráfico: Región Factible y Solución Óptima",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 1: Modelación Matemática y Método Gráfico",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/02-metodo-grafico",
        "tags": [
            "ii7d3",
            "el método gráfico: región factible y solución óptima",
            "unidad 1: modelación matemática y método gráfico",
            "investigación de operaciones i",
            "02 metodo grafico"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-01-forma-estandar-variables-holgura",
        "title": "Forma Estándar y Soluciones Básicas Factibles (SBF)",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 2: El Algoritmo Simplex Tabular",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/01-forma-estandar-variables-holgura",
        "tags": [
            "ii7d3",
            "forma estándar y soluciones básicas factibles (sbf)",
            "unidad 2: el algoritmo simplex tabular",
            "investigación de operaciones i",
            "01 forma estandar variables holgura"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-02-algoritmo-simplex-tabular",
        "title": "El Algoritmo Simplex Tabular y Reglas de Pivoteo",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 2: El Algoritmo Simplex Tabular",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/02-algoritmo-simplex-tabular",
        "tags": [
            "ii7d3",
            "el algoritmo simplex tabular y reglas de pivoteo",
            "unidad 2: el algoritmo simplex tabular",
            "investigación de operaciones i",
            "02 algoritmo simplex tabular"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-01-teoria-de-la-dualidad",
        "title": "Teoría de la Dualidad y Relaciones Primal-Dual",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 3: Teoría de la Dualidad y Análisis de Sensibilidad",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/01-teoria-de-la-dualidad",
        "tags": [
            "ii7d3",
            "teoría de la dualidad y relaciones primal-dual",
            "unidad 3: teoría de la dualidad y análisis de sensibilidad",
            "investigación de operaciones i",
            "01 teoria de la dualidad"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-02-analisis-sensibilidad-precios-sombra",
        "title": "Análisis de Sensibilidad y Precios Sombra",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 3: Teoría de la Dualidad y Análisis de Sensibilidad",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/02-analisis-sensibilidad-precios-sombra",
        "tags": [
            "ii7d3",
            "análisis de sensibilidad y precios sombra",
            "unidad 3: teoría de la dualidad y análisis de sensibilidad",
            "investigación de operaciones i",
            "02 analisis sensibilidad precios sombra"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-01-problema-del-transporte",
        "title": "El Problema del Transporte: Modelación y Algoritmo de Vogel",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 4: Modelos de Transporte y Asignación",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/01-problema-del-transporte",
        "tags": [
            "ii7d3",
            "el problema del transporte: modelación y algoritmo de vogel",
            "unidad 4: modelos de transporte y asignación",
            "investigación de operaciones i",
            "01 problema del transporte"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-02-problema-de-asignacion",
        "title": "El Problema de Asignación y el Algoritmo Húngaro",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 4: Modelos de Transporte y Asignación",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/02-problema-de-asignacion",
        "tags": [
            "ii7d3",
            "el problema de asignación y el algoritmo húngaro",
            "unidad 4: modelos de transporte y asignación",
            "investigación de operaciones i",
            "02 problema de asignacion"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-01-ruta-mas-corta-arbol-expansion",
        "title": "Modelos de Redes: Ruta Más Corta (Dijkstra) y Árbol de Expansión Mínima",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 5: Optimización de Redes y Gestión de Proyectos (PERT/CPM)",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/01-ruta-mas-corta-arbol-expansion",
        "tags": [
            "ii7d3",
            "modelos de redes: ruta más corta (dijkstra) y árbol de expansión mínima",
            "unidad 5: optimización de redes y gestión de proyectos (pert/cpm)",
            "investigación de operaciones i",
            "01 ruta mas corta arbol expansion"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-i-02-gestion-proyectos-pert-cpm",
        "title": "Gestión de Proyectos con Redes: Técnicas CPM y PERT",
        "subtitle": "II7D3 (Investigación de Operaciones I) • Unidad 5: Optimización de Redes y Gestión de Proyectos (PERT/CPM)",
        "code": "II7D3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-i/02-gestion-proyectos-pert-cpm",
        "tags": [
            "ii7d3",
            "gestión de proyectos con redes: técnicas cpm y pert",
            "unidad 5: optimización de redes y gestión de proyectos (pert/cpm)",
            "investigación de operaciones i",
            "02 gestion proyectos pert cpm"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-01-procesos-estocasticos-transicion",
        "title": "Procesos Estocásticos y Matrices de Transición de Markov",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 1: Procesos Estocásticos y Cadenas de Markov",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/01-procesos-estocasticos-transicion",
        "tags": [
            "ii8b3",
            "procesos estocásticos y matrices de transición de markov",
            "unidad 1: procesos estocásticos y cadenas de markov",
            "investigación de operaciones ii",
            "01 procesos estocasticos transicion"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-02-estado-estacionario-absorcion",
        "title": "Estado Estacionario y Cadenas de Markov Absorbentes",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 1: Procesos Estocásticos y Cadenas de Markov",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/02-estado-estacionario-absorcion",
        "tags": [
            "ii8b3",
            "estado estacionario y cadenas de markov absorbentes",
            "unidad 1: procesos estocásticos y cadenas de markov",
            "investigación de operaciones ii",
            "02 estado estacionario absorcion"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-01-estructura-colas-mm1",
        "title": "Teoría de Líneas de Espera: Estructura General y Modelo M/M/1",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 2: Teoría de Líneas de Espera (Colas)",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/01-estructura-colas-mm1",
        "tags": [
            "ii8b3",
            "teoría de líneas de espera: estructura general y modelo m/m/1",
            "unidad 2: teoría de líneas de espera (colas)",
            "investigación de operaciones ii",
            "01 estructura colas mm1"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-02-colas-multicanal-mmc-costos",
        "title": "Colas Multicanal (M/M/c) y Optimización Económica de Capacidad",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 2: Teoría de Líneas de Espera (Colas)",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/02-colas-multicanal-mmc-costos",
        "tags": [
            "ii8b3",
            "colas multicanal (m/m/c) y optimización económica de capacidad",
            "unidad 2: teoría de líneas de espera (colas)",
            "investigación de operaciones ii",
            "02 colas multicanal mmc costos"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-01-modelo-eoq-descuentos",
        "title": "Modelo de Lote Económico (EOQ) y Descuentos por Cantidad",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 3: Teoría y Modelos de Inventarios",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/01-modelo-eoq-descuentos",
        "tags": [
            "ii8b3",
            "modelo de lote económico (eoq) y descuentos por cantidad",
            "unidad 3: teoría y modelos de inventarios",
            "investigación de operaciones ii",
            "01 modelo eoq descuentos"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-02-inventario-probabilistico-seguridad",
        "title": "Inventarios Probabilísticos, Stock de Seguridad y Modelo del Vendedor de Periódicos",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 3: Teoría y Modelos de Inventarios",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/02-inventario-probabilistico-seguridad",
        "tags": [
            "ii8b3",
            "inventarios probabilísticos, stock de seguridad y modelo del vendedor de periódicos",
            "unidad 3: teoría y modelos de inventarios",
            "investigación de operaciones ii",
            "02 inventario probabilistico seguridad"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-01-juegos-suma-cero-punto-silla",
        "title": "Teoría de Juegos: Juegos de Suma Cero y Puntos de Silla",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 4: Teoría de Juegos y Decisiones Estratégicas",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/01-juegos-suma-cero-punto-silla",
        "tags": [
            "ii8b3",
            "teoría de juegos: juegos de suma cero y puntos de silla",
            "unidad 4: teoría de juegos y decisiones estratégicas",
            "investigación de operaciones ii",
            "01 juegos suma cero punto silla"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-02-estrategias-mixtas-dominancia",
        "title": "Estrategias Mixtas, Principio de Dominancia y Programación Lineal",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 4: Teoría de Juegos y Decisiones Estratégicas",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/02-estrategias-mixtas-dominancia",
        "tags": [
            "ii8b3",
            "estrategias mixtas, principio de dominancia y programación lineal",
            "unidad 4: teoría de juegos y decisiones estratégicas",
            "investigación de operaciones ii",
            "02 estrategias mixtas dominancia"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-01-metodo-montecarlo-transformada",
        "title": "Método de Monte Carlo y Generación de Variables Aleatorias",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 5: Simulación de Eventos Discretos y Monte Carlo",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/01-metodo-montecarlo-transformada",
        "tags": [
            "ii8b3",
            "método de monte carlo y generación de variables aleatorias",
            "unidad 5: simulación de eventos discretos y monte carlo",
            "investigación de operaciones ii",
            "01 metodo montecarlo transformada"
        ]
    },
    {
        "id": "topic-investigacion-operaciones-ii-02-simulacion-procesos-python",
        "title": "Simulación de Eventos Discretos (DES) y Análisis Estadístico de Resultados",
        "subtitle": "II8B3 (Investigación de Operaciones II) • Unidad 5: Simulación de Eventos Discretos y Monte Carlo",
        "code": "II8B3",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/investigacion-operaciones-ii/02-simulacion-procesos-python",
        "tags": [
            "ii8b3",
            "simulación de eventos discretos (des) y análisis estadístico de resultados",
            "unidad 5: simulación de eventos discretos y monte carlo",
            "investigación de operaciones ii",
            "02 simulacion procesos python"
        ]
    },
    {
        "id": "topic-metodos-cuantitativos-algebra-01-operaciones-matriciales-determinantes",
        "title": "Operaciones Matriciales, Determinantes e Inversas",
        "subtitle": "CB213 (Métodos Cuantitativos y Álgebra Matricial) • Álgebra Lineal Matricial",
        "code": "CB213",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/metodos-cuantitativos-algebra/01-operaciones-matriciales-determinantes",
        "tags": [
            "cb213",
            "operaciones matriciales, determinantes e inversas",
            "álgebra lineal matricial",
            "métodos cuantitativos y álgebra matricial",
            "01 operaciones matriciales determinantes"
        ]
    },
    {
        "id": "topic-metodos-cuantitativos-algebra-02-sistemas-lineales-factorizacion-lu",
        "title": "Sistemas de Ecuaciones Lineales Ax = b y Factorización LU",
        "subtitle": "CB213 (Métodos Cuantitativos y Álgebra Matricial) • Álgebra Lineal Matricial",
        "code": "CB213",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/metodos-cuantitativos-algebra/02-sistemas-lineales-factorizacion-lu",
        "tags": [
            "cb213",
            "sistemas de ecuaciones lineales ax = b y factorización lu",
            "álgebra lineal matricial",
            "métodos cuantitativos y álgebra matricial",
            "02 sistemas lineales factorizacion lu"
        ]
    },
    {
        "id": "topic-metodos-cuantitativos-algebra-01-autovalores-autovectores-diagonalizacion",
        "title": "Autovalores, Autovectores y Diagonalización de Matrices",
        "subtitle": "CB213 (Métodos Cuantitativos y Álgebra Matricial) • Autovalores y Optimización Cuantitativa",
        "code": "CB213",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/metodos-cuantitativos-algebra/01-autovalores-autovectores-diagonalizacion",
        "tags": [
            "cb213",
            "autovalores, autovectores y diagonalización de matrices",
            "autovalores y optimización cuantitativa",
            "métodos cuantitativos y álgebra matricial",
            "01 autovalores autovectores diagonalizacion"
        ]
    },
    {
        "id": "topic-metodos-cuantitativos-algebra-02-gradiente-hessiano-optimizacion-convexa",
        "title": "Gradiente, Matriz Hessiana y Condiciones de Optimalidad",
        "subtitle": "CB213 (Métodos Cuantitativos y Álgebra Matricial) • Autovalores y Optimización Cuantitativa",
        "code": "CB213",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/metodos-cuantitativos-algebra/02-gradiente-hessiano-optimizacion-convexa",
        "tags": [
            "cb213",
            "gradiente, matriz hessiana y condiciones de optimalidad",
            "autovalores y optimización cuantitativa",
            "métodos cuantitativos y álgebra matricial",
            "02 gradiente hessiano optimizacion convexa"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-investigacion-operaciones-01-modelado-matematico-formal",
        "title": "Modelado Matemático Formal y Espacios de Decisión",
        "subtitle": "IOA10 (Fundamentos de Investigación de Operaciones) • Módulo 1: Modelado Matemático y Dualidad",
        "code": "IOA10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-investigacion-operaciones/01-modelado-matematico-formal",
        "tags": [
            "ioa10",
            "modelado matemático formal y espacios de decisión",
            "módulo 1: modelado matemático y dualidad",
            "fundamentos de investigación de operaciones",
            "01 modelado matematico formal"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-investigacion-operaciones-02-teoria-dualidad-interpretacion-economica",
        "title": "Teoría de la Dualidad e Interpretación Económica",
        "subtitle": "IOA10 (Fundamentos de Investigación de Operaciones) • Módulo 1: Modelado Matemático y Dualidad",
        "code": "IOA10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-investigacion-operaciones/02-teoria-dualidad-interpretacion-economica",
        "tags": [
            "ioa10",
            "teoría de la dualidad e interpretación económica",
            "módulo 1: modelado matemático y dualidad",
            "fundamentos de investigación de operaciones",
            "02 teoria dualidad interpretacion economica"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-investigacion-operaciones-01-algoritmo-simplex-matricial",
        "title": "Álgebra Matricial del Algoritmo Simplex",
        "subtitle": "IOA10 (Fundamentos de Investigación de Operaciones) • Módulo 2: Algoritmos y Solvers Computacionales",
        "code": "IOA10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-investigacion-operaciones/01-algoritmo-simplex-matricial",
        "tags": [
            "ioa10",
            "álgebra matricial del algoritmo simplex",
            "módulo 2: algoritmos y solvers computacionales",
            "fundamentos de investigación de operaciones",
            "01 algoritmo simplex matricial"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-investigacion-operaciones-02-solvers-optimizacion-python",
        "title": "Implementación y Resolución con Solvers Modernos en Python",
        "subtitle": "IOA10 (Fundamentos de Investigación de Operaciones) • Módulo 2: Algoritmos y Solvers Computacionales",
        "code": "IOA10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-investigacion-operaciones/02-solvers-optimizacion-python",
        "tags": [
            "ioa10",
            "implementación y resolución con solvers modernos en python",
            "módulo 2: algoritmos y solvers computacionales",
            "fundamentos de investigación de operaciones",
            "02 solvers optimizacion python"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-matlab-python-01-vectorizacion-algebra-lineal-numerica",
        "title": "Vectorización y Fundamentos de Álgebra Lineal Numérica",
        "subtitle": "IOD10 (Computación Científica y Álgebra Matricial: MATLAB y Python) • Módulo 1: Álgebra Matricial y Computación Numérica",
        "code": "IOD10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-matlab-python/01-vectorizacion-algebra-lineal-numerica",
        "tags": [
            "iod10",
            "vectorización y fundamentos de álgebra lineal numérica",
            "módulo 1: álgebra matricial y computación numérica",
            "computación científica y álgebra matricial: matlab y python",
            "01 vectorizacion algebra lineal numerica"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-matlab-python-02-resolucion-sistemas-ecuaciones-lineales",
        "title": "Resolución de Grandes Sistemas de Ecuaciones Lineales y Factorización",
        "subtitle": "IOD10 (Computación Científica y Álgebra Matricial: MATLAB y Python) • Módulo 1: Álgebra Matricial y Computación Numérica",
        "code": "IOD10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-matlab-python/02-resolucion-sistemas-ecuaciones-lineales",
        "tags": [
            "iod10",
            "resolución de grandes sistemas de ecuaciones lineales y factorización",
            "módulo 1: álgebra matricial y computación numérica",
            "computación científica y álgebra matricial: matlab y python",
            "02 resolucion sistemas ecuaciones lineales"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-matlab-python-01-estructuras-matriciales-visualizacion",
        "title": "Estructuras de Datos Matriciales y Visualización Científica",
        "subtitle": "IOD10 (Computación Científica y Álgebra Matricial: MATLAB y Python) • Módulo 2: Estructuras Matriciales, Visualización y Algoritmos",
        "code": "IOD10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-matlab-python/01-estructuras-matriciales-visualizacion",
        "tags": [
            "iod10",
            "estructuras de datos matriciales y visualización científica",
            "módulo 2: estructuras matriciales, visualización y algoritmos",
            "computación científica y álgebra matricial: matlab y python",
            "01 estructuras matriciales visualizacion"
        ]
    },
    {
        "id": "topic-mioe-s0-nivelatorio-matlab-python-02-algoritmos-optimizacion-univariada",
        "title": "Algoritmos Numéricos de Optimización Univariada",
        "subtitle": "IOD10 (Computación Científica y Álgebra Matricial: MATLAB y Python) • Módulo 2: Estructuras Matriciales, Visualización y Algoritmos",
        "code": "IOD10",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s0-nivelatorio-matlab-python/02-algoritmos-optimizacion-univariada",
        "tags": [
            "iod10",
            "algoritmos numéricos de optimización univariada",
            "módulo 2: estructuras matriciales, visualización y algoritmos",
            "computación científica y álgebra matricial: matlab y python",
            "02 algoritmos optimizacion univariada"
        ]
    },
    {
        "id": "topic-mioe-s1-analisis-multivariado-01-vector-medias-matriz-covarianza-wishart",
        "title": "Vector de Medias, Matriz de Covarianzas y Distribución de Wishart",
        "subtitle": "IO123 (Análisis Multivariado) • Módulo 1: Normal Multivariada y Test de Hotelling",
        "code": "IO123",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-analisis-multivariado/01-vector-medias-matriz-covarianza-wishart",
        "tags": [
            "io123",
            "vector de medias, matriz de covarianzas y distribución de wishart",
            "módulo 1: normal multivariada y test de hotelling",
            "análisis multivariado",
            "01 vector medias matriz covarianza wishart"
        ]
    },
    {
        "id": "topic-mioe-s1-analisis-multivariado-02-inferencia-vectorial-test-t2-hotelling",
        "title": "Inferencia Vectorial y Test T² de Hotelling",
        "subtitle": "IO123 (Análisis Multivariado) • Módulo 1: Normal Multivariada y Test de Hotelling",
        "code": "IO123",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-analisis-multivariado/02-inferencia-vectorial-test-t2-hotelling",
        "tags": [
            "io123",
            "inferencia vectorial y test t² de hotelling",
            "módulo 1: normal multivariada y test de hotelling",
            "análisis multivariado",
            "02 inferencia vectorial test t2 hotelling"
        ]
    },
    {
        "id": "topic-mioe-s1-analisis-multivariado-01-analisis-componentes-principales-pca-factorial",
        "title": "Análisis de Componentes Principales (PCA) y Factorial Exploratorio",
        "subtitle": "IO123 (Análisis Multivariado) • Módulo 2: Reducción de Dimensionalidad y Clasificación",
        "code": "IO123",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-analisis-multivariado/01-analisis-componentes-principales-pca-factorial",
        "tags": [
            "io123",
            "análisis de componentes principales (pca) y factorial exploratorio",
            "módulo 2: reducción de dimensionalidad y clasificación",
            "análisis multivariado",
            "01 analisis componentes principales pca factorial"
        ]
    },
    {
        "id": "topic-mioe-s1-analisis-multivariado-02-analisis-discriminante-lineal-lda",
        "title": "Análisis Discriminante Lineal (LDA) y Clasificación Multivariante",
        "subtitle": "IO123 (Análisis Multivariado) • Módulo 2: Reducción de Dimensionalidad y Clasificación",
        "code": "IO123",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-analisis-multivariado/02-analisis-discriminante-lineal-lda",
        "tags": [
            "io123",
            "análisis discriminante lineal (lda) y clasificación multivariante",
            "módulo 2: reducción de dimensionalidad y clasificación",
            "análisis multivariado",
            "02 analisis discriminante lineal lda"
        ]
    },
    {
        "id": "topic-mioe-s1-diseno-experimentos-01-disenos-factoriales-2k-interacciones",
        "title": "Diseños Factoriales 2^k, Efectos Principales e Interacciones",
        "subtitle": "IO133 (Diseño de Experimentos y Superficie de Respuesta) • Módulo 1: Factoriales Completos y Fraccionados",
        "code": "IO133",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-diseno-experimentos/01-disenos-factoriales-2k-interacciones",
        "tags": [
            "io133",
            "diseños factoriales 2^k, efectos principales e interacciones",
            "módulo 1: factoriales completos y fraccionados",
            "diseño de experimentos y superficie de respuesta",
            "01 disenos factoriales 2k interacciones"
        ]
    },
    {
        "id": "topic-mioe-s1-diseno-experimentos-02-factoriales-fraccionados-estructuras-alias",
        "title": "Factoriales Fraccionados 2^(k-p), Generadores y Resolución",
        "subtitle": "IO133 (Diseño de Experimentos y Superficie de Respuesta) • Módulo 1: Factoriales Completos y Fraccionados",
        "code": "IO133",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-diseno-experimentos/02-factoriales-fraccionados-estructuras-alias",
        "tags": [
            "io133",
            "factoriales fraccionados 2^(k-p), generadores y resolución",
            "módulo 1: factoriales completos y fraccionados",
            "diseño de experimentos y superficie de respuesta",
            "02 factoriales fraccionados estructuras alias"
        ]
    },
    {
        "id": "topic-mioe-s1-diseno-experimentos-01-disenos-ccd-box-behnken-segundo-orden",
        "title": "Diseños Central Compuesto (CCD) y Box-Behnken",
        "subtitle": "IO133 (Diseño de Experimentos y Superficie de Respuesta) • Módulo 2: Metodología de Superficie de Respuesta (RSM)",
        "code": "IO133",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-diseno-experimentos/01-disenos-ccd-box-behnken-segundo-orden",
        "tags": [
            "io133",
            "diseños central compuesto (ccd) y box-behnken",
            "módulo 2: metodología de superficie de respuesta (rsm)",
            "diseño de experimentos y superficie de respuesta",
            "01 disenos ccd box behnken segundo orden"
        ]
    },
    {
        "id": "topic-mioe-s1-diseno-experimentos-02-optimizacion-multirespuesta-deseabilidad",
        "title": "Optimización Multirespuesta por Función de Deseabilidad de Derringer",
        "subtitle": "IO133 (Diseño de Experimentos y Superficie de Respuesta) • Módulo 2: Metodología de Superficie de Respuesta (RSM)",
        "code": "IO133",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-diseno-experimentos/02-optimizacion-multirespuesta-deseabilidad",
        "tags": [
            "io133",
            "optimización multirespuesta por función de deseabilidad de derringer",
            "módulo 2: metodología de superficie de respuesta (rsm)",
            "diseño de experimentos y superficie de respuesta",
            "02 optimizacion multirespuesta deseabilidad"
        ]
    },
    {
        "id": "topic-mioe-s1-programacion-lineal-avanzada-01-poliedros-convexos-direcciones-extremas",
        "title": "Poliedros Convexos, Vértices y Direcciones Extremas",
        "subtitle": "IO113 (Programación Lineal Avanzada) • Módulo 1: Teoría Poliédrica y Simplex Revisado",
        "code": "IO113",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-programacion-lineal-avanzada/01-poliedros-convexos-direcciones-extremas",
        "tags": [
            "io113",
            "poliedros convexos, vértices y direcciones extremas",
            "módulo 1: teoría poliédrica y simplex revisado",
            "programación lineal avanzada",
            "01 poliedros convexos direcciones extremas"
        ]
    },
    {
        "id": "topic-mioe-s1-programacion-lineal-avanzada-02-algebra-simplex-revisado-factorizacion-eta",
        "title": "Álgebra del Simplex Revisado y Factorización Eta",
        "subtitle": "IO113 (Programación Lineal Avanzada) • Módulo 1: Teoría Poliédrica y Simplex Revisado",
        "code": "IO113",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-programacion-lineal-avanzada/02-algebra-simplex-revisado-factorizacion-eta",
        "tags": [
            "io113",
            "álgebra del simplex revisado y factorización eta",
            "módulo 1: teoría poliédrica y simplex revisado",
            "programación lineal avanzada",
            "02 algebra simplex revisado factorizacion eta"
        ]
    },
    {
        "id": "topic-mioe-s1-programacion-lineal-avanzada-01-principio-descomposicion-dantzig-wolfe",
        "title": "Principio de Descomposición de Dantzig-Wolfe",
        "subtitle": "IO113 (Programación Lineal Avanzada) • Módulo 2: Descomposición y Generación de Columnas",
        "code": "IO113",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-programacion-lineal-avanzada/01-principio-descomposicion-dantzig-wolfe",
        "tags": [
            "io113",
            "principio de descomposición de dantzig-wolfe",
            "módulo 2: descomposición y generación de columnas",
            "programación lineal avanzada",
            "01 principio descomposicion dantzig wolfe"
        ]
    },
    {
        "id": "topic-mioe-s1-programacion-lineal-avanzada-02-generacion-columnas-cutting-stock",
        "title": "Algoritmo de Generación de Columnas y el Cutting Stock Problem",
        "subtitle": "IO113 (Programación Lineal Avanzada) • Módulo 2: Descomposición y Generación de Columnas",
        "code": "IO113",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-programacion-lineal-avanzada/02-generacion-columnas-cutting-stock",
        "tags": [
            "io113",
            "algoritmo de generación de columnas y el cutting stock problem",
            "módulo 2: descomposición y generación de columnas",
            "programación lineal avanzada",
            "02 generacion columnas cutting stock"
        ]
    },
    {
        "id": "topic-mioe-s1-simulacion-dinamica-sistemas-01-diagramas-ciclo-causal-cld",
        "title": "Diagramas de Ciclo Causal (CLD) y Bucles de Retroalimentación",
        "subtitle": "IO143 (Simulación de Dinámica de Sistemas) • Módulo 1: Pensamiento Sistémico y Ciclos Causales",
        "code": "IO143",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-simulacion-dinamica-sistemas/01-diagramas-ciclo-causal-cld",
        "tags": [
            "io143",
            "diagramas de ciclo causal (cld) y bucles de retroalimentación",
            "módulo 1: pensamiento sistémico y ciclos causales",
            "simulación de dinámica de sistemas",
            "01 diagramas ciclo causal cld"
        ]
    },
    {
        "id": "topic-mioe-s1-simulacion-dinamica-sistemas-02-arquetipos-sistemicos-complejidad",
        "title": "Arquetipos Sistémicos y Complejidad Dinámica",
        "subtitle": "IO143 (Simulación de Dinámica de Sistemas) • Módulo 1: Pensamiento Sistémico y Ciclos Causales",
        "code": "IO143",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-simulacion-dinamica-sistemas/02-arquetipos-sistemicos-complejidad",
        "tags": [
            "io143",
            "arquetipos sistémicos y complejidad dinámica",
            "módulo 1: pensamiento sistémico y ciclos causales",
            "simulación de dinámica de sistemas",
            "02 arquetipos sistemicos complejidad"
        ]
    },
    {
        "id": "topic-mioe-s1-simulacion-dinamica-sistemas-01-diagramas-stock-flow-ecuaciones",
        "title": "Diagramas de Stock y Flow y Formulación Matemática",
        "subtitle": "IO143 (Simulación de Dinámica de Sistemas) • Módulo 2: Diagramas de Niveles, Flujos y Ecuaciones",
        "code": "IO143",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-simulacion-dinamica-sistemas/01-diagramas-stock-flow-ecuaciones",
        "tags": [
            "io143",
            "diagramas de stock y flow y formulación matemática",
            "módulo 2: diagramas de niveles, flujos y ecuaciones",
            "simulación de dinámica de sistemas",
            "01 diagramas stock flow ecuaciones"
        ]
    },
    {
        "id": "topic-mioe-s1-simulacion-dinamica-sistemas-02-simulacion-retrasos-material-informacion",
        "title": "Retrasos de Material e Información y Efecto Látigo (Bullwhip)",
        "subtitle": "IO143 (Simulación de Dinámica de Sistemas) • Módulo 2: Diagramas de Niveles, Flujos y Ecuaciones",
        "code": "IO143",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s1-simulacion-dinamica-sistemas/02-simulacion-retrasos-material-informacion",
        "tags": [
            "io143",
            "retrasos de material e información y efecto látigo (bullwhip)",
            "módulo 2: diagramas de niveles, flujos y ecuaciones",
            "simulación de dinámica de sistemas",
            "02 simulacion retrasos material informacion"
        ]
    },
    {
        "id": "topic-mioe-s2-analisis-envolvente-datos-dea-01-medicion-eficiencia-dmus-modelo-ccr",
        "title": "Medición de Eficiencia Técnica Relativa y Modelo CCR (CRS)",
        "subtitle": "IO243 (Análisis Envolvente de Datos (DEA)) • Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-analisis-envolvente-datos-dea/01-medicion-eficiencia-dmus-modelo-ccr",
        "tags": [
            "io243",
            "medición de eficiencia técnica relativa y modelo ccr (crs)",
            "módulo 1: fundamentos de eficiencia y modelos ccr y bcc",
            "análisis envolvente de datos (dea)",
            "01 medicion eficiencia dmus modelo ccr"
        ]
    },
    {
        "id": "topic-mioe-s2-analisis-envolvente-datos-dea-02-modelo-bcc-rendimientos-variables-escala",
        "title": "Modelo BCC y Rendimientos Variables a Escala (VRS)",
        "subtitle": "IO243 (Análisis Envolvente de Datos (DEA)) • Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-analisis-envolvente-datos-dea/02-modelo-bcc-rendimientos-variables-escala",
        "tags": [
            "io243",
            "modelo bcc y rendimientos variables a escala (vrs)",
            "módulo 1: fundamentos de eficiencia y modelos ccr y bcc",
            "análisis envolvente de datos (dea)",
            "02 modelo bcc rendimientos variables escala"
        ]
    },
    {
        "id": "topic-mioe-s2-analisis-envolvente-datos-dea-01-analisis-holguras-slacks-benchmarking",
        "title": "Análisis de Holguras (Slacks) y Determinación de Pares de Benchmarking",
        "subtitle": "IO243 (Análisis Envolvente de Datos (DEA)) • Módulo 2: Slacks, Benchmarking y Modelos en Red",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-analisis-envolvente-datos-dea/01-analisis-holguras-slacks-benchmarking",
        "tags": [
            "io243",
            "análisis de holguras (slacks) y determinación de pares de benchmarking",
            "módulo 2: slacks, benchmarking y modelos en red",
            "análisis envolvente de datos (dea)",
            "01 analisis holguras slacks benchmarking"
        ]
    },
    {
        "id": "topic-mioe-s2-analisis-envolvente-datos-dea-02-modelos-dea-redes-multietapa",
        "title": "Modelos DEA en Redes Multietapa (Network DEA)",
        "subtitle": "IO243 (Análisis Envolvente de Datos (DEA)) • Módulo 2: Slacks, Benchmarking y Modelos en Red",
        "code": "IO243",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-analisis-envolvente-datos-dea/02-modelos-dea-redes-multietapa",
        "tags": [
            "io243",
            "modelos dea en redes multietapa (network dea)",
            "módulo 2: slacks, benchmarking y modelos en red",
            "análisis envolvente de datos (dea)",
            "02 modelos dea redes multietapa"
        ]
    },
    {
        "id": "topic-mioe-s2-metaheuristicas-01-busqueda-local-recocido-simulado",
        "title": "Búsqueda Local y Recocido Simulado (Simulated Annealing)",
        "subtitle": "IO223 (Metaheurísticas y Optimización Combinatoria) • Módulo 1: Metaheurísticas de Trayectoria",
        "code": "IO223",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-metaheuristicas/01-busqueda-local-recocido-simulado",
        "tags": [
            "io223",
            "búsqueda local y recocido simulado (simulated annealing)",
            "módulo 1: metaheurísticas de trayectoria",
            "metaheurísticas y optimización combinatoria",
            "01 busqueda local recocido simulado"
        ]
    },
    {
        "id": "topic-mioe-s2-metaheuristicas-02-busqueda-tabu-listas-memoria",
        "title": "Búsqueda Tabú y Gestión de Memoria Adaptativa",
        "subtitle": "IO223 (Metaheurísticas y Optimización Combinatoria) • Módulo 1: Metaheurísticas de Trayectoria",
        "code": "IO223",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-metaheuristicas/02-busqueda-tabu-listas-memoria",
        "tags": [
            "io223",
            "búsqueda tabú y gestión de memoria adaptativa",
            "módulo 1: metaheurísticas de trayectoria",
            "metaheurísticas y optimización combinatoria",
            "02 busqueda tabu listas memoria"
        ]
    },
    {
        "id": "topic-mioe-s2-metaheuristicas-01-algoritmos-geneticos-operadores-permutacion",
        "title": "Algoritmos Genéticos y Operadores de Cruce OX y PMX",
        "subtitle": "IO223 (Metaheurísticas y Optimización Combinatoria) • Módulo 2: Metaheurísticas Poblacionales",
        "code": "IO223",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-metaheuristicas/01-algoritmos-geneticos-operadores-permutacion",
        "tags": [
            "io223",
            "algoritmos genéticos y operadores de cruce ox y pmx",
            "módulo 2: metaheurísticas poblacionales",
            "metaheurísticas y optimización combinatoria",
            "01 algoritmos geneticos operadores permutacion"
        ]
    },
    {
        "id": "topic-mioe-s2-metaheuristicas-02-enjambre-particulas-pso-vrp-scheduling",
        "title": "Optimización por Enjambre de Partículas (PSO) en Scheduling y VRP",
        "subtitle": "IO223 (Metaheurísticas y Optimización Combinatoria) • Módulo 2: Metaheurísticas Poblacionales",
        "code": "IO223",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-metaheuristicas/02-enjambre-particulas-pso-vrp-scheduling",
        "tags": [
            "io223",
            "optimización por enjambre de partículas (pso) en scheduling y vrp",
            "módulo 2: metaheurísticas poblacionales",
            "metaheurísticas y optimización combinatoria",
            "02 enjambre particulas pso vrp scheduling"
        ]
    },
    {
        "id": "topic-mioe-s2-optimizacion-financiera-01-frontera-eficiente-media-varianza",
        "title": "Frontera Eficiente Media-Varianza y Portafolio de Mínima Varianza",
        "subtitle": "IO233 (Optimización Financiera y Gestión de Riesgo) • Módulo 1: Teoría Clásica de Portafolio y Markowitz",
        "code": "IO233",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-optimizacion-financiera/01-frontera-eficiente-media-varianza",
        "tags": [
            "io233",
            "frontera eficiente media-varianza y portafolio de mínima varianza",
            "módulo 1: teoría clásica de portafolio y markowitz",
            "optimización financiera y gestión de riesgo",
            "01 frontera eficiente media varianza"
        ]
    },
    {
        "id": "topic-mioe-s2-optimizacion-financiera-02-modelo-capm-portafolio-tangente",
        "title": "Modelo CAPM, Portafolio Tangente y Capital Market Line",
        "subtitle": "IO233 (Optimización Financiera y Gestión de Riesgo) • Módulo 1: Teoría Clásica de Portafolio y Markowitz",
        "code": "IO233",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-optimizacion-financiera/02-modelo-capm-portafolio-tangente",
        "tags": [
            "io233",
            "modelo capm, portafolio tangente y capital market line",
            "módulo 1: teoría clásica de portafolio y markowitz",
            "optimización financiera y gestión de riesgo",
            "02 modelo capm portafolio tangente"
        ]
    },
    {
        "id": "topic-mioe-s2-optimizacion-financiera-01-medidas-riesgo-var-expected-shortfall-cvar",
        "title": "Valor en Riesgo (VaR) y Conditional Value at Risk (CVaR)",
        "subtitle": "IO233 (Optimización Financiera y Gestión de Riesgo) • Módulo 2: Medidas de Riesgo Coherente y CVaR",
        "code": "IO233",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-optimizacion-financiera/01-medidas-riesgo-var-expected-shortfall-cvar",
        "tags": [
            "io233",
            "valor en riesgo (var) y conditional value at risk (cvar)",
            "módulo 2: medidas de riesgo coherente y cvar",
            "optimización financiera y gestión de riesgo",
            "01 medidas riesgo var expected shortfall cvar"
        ]
    },
    {
        "id": "topic-mioe-s2-optimizacion-financiera-02-optimizacion-estocastica-carteras-restricciones",
        "title": "Optimización Estocástica de Carteras con Restricciones de Apalancamiento",
        "subtitle": "IO233 (Optimización Financiera y Gestión de Riesgo) • Módulo 2: Medidas de Riesgo Coherente y CVaR",
        "code": "IO233",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-optimizacion-financiera/02-optimizacion-estocastica-carteras-restricciones",
        "tags": [
            "io233",
            "optimización estocástica de carteras con restricciones de apalancamiento",
            "módulo 2: medidas de riesgo coherente y cvar",
            "optimización financiera y gestión de riesgo",
            "02 optimizacion estocastica carteras restricciones"
        ]
    },
    {
        "id": "topic-mioe-s2-programacion-no-lineal-01-funciones-convexas-gradiente-armijo",
        "title": "Funciones Convexas y Gradiente Descendente con Búsqueda de Armijo",
        "subtitle": "IO213 (Programación No Lineal) • Módulo 1: Optimización Sin Restricciones",
        "code": "IO213",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-programacion-no-lineal/01-funciones-convexas-gradiente-armijo",
        "tags": [
            "io213",
            "funciones convexas y gradiente descendente con búsqueda de armijo",
            "módulo 1: optimización sin restricciones",
            "programación no lineal",
            "01 funciones convexas gradiente armijo"
        ]
    },
    {
        "id": "topic-mioe-s2-programacion-no-lineal-02-metodos-cuasi-newton-bfgs",
        "title": "Métodos Cuasi-Newton y Actualización BFGS",
        "subtitle": "IO213 (Programación No Lineal) • Módulo 1: Optimización Sin Restricciones",
        "code": "IO213",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-programacion-no-lineal/02-metodos-cuasi-newton-bfgs",
        "tags": [
            "io213",
            "métodos cuasi-newton y actualización bfgs",
            "módulo 1: optimización sin restricciones",
            "programación no lineal",
            "02 metodos cuasi newton bfgs"
        ]
    },
    {
        "id": "topic-mioe-s2-programacion-no-lineal-01-condiciones-optimalidad-kkt",
        "title": "Condiciones de Optimalidad Karush-Kuhn-Tucker (KKT)",
        "subtitle": "IO213 (Programación No Lineal) • Módulo 2: Optimización con Restricciones y KKT",
        "code": "IO213",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-programacion-no-lineal/01-condiciones-optimalidad-kkt",
        "tags": [
            "io213",
            "condiciones de optimalidad karush-kuhn-tucker (kkt)",
            "módulo 2: optimización con restricciones y kkt",
            "programación no lineal",
            "01 condiciones optimalidad kkt"
        ]
    },
    {
        "id": "topic-mioe-s2-programacion-no-lineal-02-metodos-penalizacion-barrera",
        "title": "Métodos de Penalización Exterior y Barrera Logarítmica Interior",
        "subtitle": "IO213 (Programación No Lineal) • Módulo 2: Optimización con Restricciones y KKT",
        "code": "IO213",
        "program": "Posgrado MIOE",
        "category": "Lecciones & Contenidos",
        "href": "/courses/mioe-s2-programacion-no-lineal/02-metodos-penalizacion-barrera",
        "tags": [
            "io213",
            "métodos de penalización exterior y barrera logarítmica interior",
            "módulo 2: optimización con restricciones y kkt",
            "programación no lineal",
            "02 metodos penalizacion barrera"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-01-matrices-transicion-estados",
        "title": "Matrices de Transición y Clasificación de Estados",
        "subtitle": "II713 (Procesos Estocásticos) • Cadenas de Markov Discretas",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/01-matrices-transicion-estados",
        "tags": [
            "ii713",
            "matrices de transición y clasificación de estados",
            "cadenas de markov discretas",
            "procesos estocásticos",
            "01 matrices transicion estados"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-02-distribucion-estado-estable",
        "title": "Distribución Estacionaria y Probabilidades de Estado Estable",
        "subtitle": "II713 (Procesos Estocásticos) • Cadenas de Markov Discretas",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/02-distribucion-estado-estable",
        "tags": [
            "ii713",
            "distribución estacionaria y probabilidades de estado estable",
            "cadenas de markov discretas",
            "procesos estocásticos",
            "02 distribucion estado estable"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-01-proceso-poisson-homogeneo",
        "title": "Proceso de Poisson Homogéneo e Inter-arribos Exponenciales",
        "subtitle": "II713 (Procesos Estocásticos) • Procesos de Poisson y Tiempo Continuo",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/01-proceso-poisson-homogeneo",
        "tags": [
            "ii713",
            "proceso de poisson homogéneo e inter-arribos exponenciales",
            "procesos de poisson y tiempo continuo",
            "procesos estocásticos",
            "01 proceso poisson homogeneo"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-02-cadenas-markov-tiempo-continuo",
        "title": "Cadenas de Markov en Tiempo Continuo y Ecuaciones de Kolmogorov",
        "subtitle": "II713 (Procesos Estocásticos) • Procesos de Poisson y Tiempo Continuo",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/02-cadenas-markov-tiempo-continuo",
        "tags": [
            "ii713",
            "cadenas de markov en tiempo continuo y ecuaciones de kolmogorov",
            "procesos de poisson y tiempo continuo",
            "procesos estocásticos",
            "02 cadenas markov tiempo continuo"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-01-sistemas-colas-mm1-mms",
        "title": "Modelos de Colas M/M/1 y M/M/s con Ley de Little",
        "subtitle": "II713 (Procesos Estocásticos) • Teoría de Colas y Líneas de Espera",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/01-sistemas-colas-mm1-mms",
        "tags": [
            "ii713",
            "modelos de colas m/m/1 y m/m/s con ley de little",
            "teoría de colas y líneas de espera",
            "procesos estocásticos",
            "01 sistemas colas mm1 mms"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-02-analisis-economico-colas",
        "title": "Optimización y Análisis Económico del Servicio y Espera",
        "subtitle": "II713 (Procesos Estocásticos) • Teoría de Colas y Líneas de Espera",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/02-analisis-economico-colas",
        "tags": [
            "ii713",
            "optimización y análisis económico del servicio y espera",
            "teoría de colas y líneas de espera",
            "procesos estocásticos",
            "02 analisis economico colas"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-01-sistemas-serie-paralelo-k-de-n",
        "title": "Confiabilidad en Configuraciones Serie, Paralelo y k-de-n",
        "subtitle": "II713 (Procesos Estocásticos) • Confiabilidad de Sistemas Industriales",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/01-sistemas-serie-paralelo-k-de-n",
        "tags": [
            "ii713",
            "confiabilidad en configuraciones serie, paralelo y k-de-n",
            "confiabilidad de sistemas industriales",
            "procesos estocásticos",
            "01 sistemas serie paralelo k de n"
        ]
    },
    {
        "id": "topic-procesos-estocasticos-02-tasas-fallas-mtbf",
        "title": "Tasa de Fallas, Distribución de Weibull y MTBF",
        "subtitle": "II713 (Procesos Estocásticos) • Confiabilidad de Sistemas Industriales",
        "code": "II713",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/procesos-estocasticos/02-tasas-fallas-mtbf",
        "tags": [
            "ii713",
            "tasa de fallas, distribución de weibull y mtbf",
            "confiabilidad de sistemas industriales",
            "procesos estocásticos",
            "02 tasas fallas mtbf"
        ]
    },
    {
        "id": "topic-simulacion-01-mecanismo-reloj-fel",
        "title": "Mecanismo del Reloj de Simulación y Lista de Eventos Futuros (FEL)",
        "subtitle": "II863 (Simulación de Sistemas) • Simulación de Eventos Discretos",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/01-mecanismo-reloj-fel",
        "tags": [
            "ii863",
            "mecanismo del reloj de simulación y lista de eventos futuros (fel)",
            "simulación de eventos discretos",
            "simulación de sistemas",
            "01 mecanismo reloj fel"
        ]
    },
    {
        "id": "topic-simulacion-02-arquitectura-simulacion",
        "title": "Arquitectura y Estructura de Entidades en Simulación",
        "subtitle": "II863 (Simulación de Sistemas) • Simulación de Eventos Discretos",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/02-arquitectura-simulacion",
        "tags": [
            "ii863",
            "arquitectura y estructura de entidades en simulación",
            "simulación de eventos discretos",
            "simulación de sistemas",
            "02 arquitectura simulacion"
        ]
    },
    {
        "id": "topic-simulacion-01-generadores-congruenciales-lineales",
        "title": "Generadores Congruenciales Lineales (GCL)",
        "subtitle": "II863 (Simulación de Sistemas) • Generación de Pseudoaleatorios",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/01-generadores-congruenciales-lineales",
        "tags": [
            "ii863",
            "generadores congruenciales lineales (gcl)",
            "generación de pseudoaleatorios",
            "simulación de sistemas",
            "01 generadores congruenciales lineales"
        ]
    },
    {
        "id": "topic-simulacion-02-pruebas-uniformidad-independencia",
        "title": "Pruebas Estadísticas de Uniformidad e Independencia",
        "subtitle": "II863 (Simulación de Sistemas) • Generación de Pseudoaleatorios",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/02-pruebas-uniformidad-independencia",
        "tags": [
            "ii863",
            "pruebas estadísticas de uniformidad e independencia",
            "generación de pseudoaleatorios",
            "simulación de sistemas",
            "02 pruebas uniformidad independencia"
        ]
    },
    {
        "id": "topic-simulacion-01-transformada-inversa-rechazo",
        "title": "Método de la Transformada Inversa y Aceptación-Rechazo",
        "subtitle": "II863 (Simulación de Sistemas) • Variables Aleatorias y Monte Carlo",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/01-transformada-inversa-rechazo",
        "tags": [
            "ii863",
            "método de la transformada inversa y aceptación-rechazo",
            "variables aleatorias y monte carlo",
            "simulación de sistemas",
            "01 transformada inversa rechazo"
        ]
    },
    {
        "id": "topic-simulacion-02-simulacion-monte-carlo-riesgo",
        "title": "Simulación Monte Carlo Aplicada al Análisis de Riesgos",
        "subtitle": "II863 (Simulación de Sistemas) • Variables Aleatorias y Monte Carlo",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/02-simulacion-monte-carlo-riesgo",
        "tags": [
            "ii863",
            "simulación monte carlo aplicada al análisis de riesgos",
            "variables aleatorias y monte carlo",
            "simulación de sistemas",
            "02 simulacion monte carlo riesgo"
        ]
    },
    {
        "id": "topic-simulacion-01-pruebas-bondad-ajuste-ks-chi2",
        "title": "Pruebas de Bondad de Ajuste: Kolmogorov-Smirnov y Chi-Cuadrado",
        "subtitle": "II863 (Simulación de Sistemas) • Análisis de Salida y Validación",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/01-pruebas-bondad-ajuste-ks-chi2",
        "tags": [
            "ii863",
            "pruebas de bondad de ajuste: kolmogorov-smirnov y chi-cuadrado",
            "análisis de salida y validación",
            "simulación de sistemas",
            "01 pruebas bondad ajuste ks chi2"
        ]
    },
    {
        "id": "topic-simulacion-02-transitorio-permanente-replicas",
        "title": "Periodo Transitorio, Régimen Permanente y Método de Réplicas",
        "subtitle": "II863 (Simulación de Sistemas) • Análisis de Salida y Validación",
        "code": "II863",
        "program": "Pregrado",
        "category": "Lecciones & Contenidos",
        "href": "/courses/simulacion/02-transitorio-permanente-replicas",
        "tags": [
            "ii863",
            "periodo transitorio, régimen permanente y método de réplicas",
            "análisis de salida y validación",
            "simulación de sistemas",
            "02 transitorio permanente replicas"
        ]
    }
];

export const FEATURED_SEARCH_ITEMS: SearchItem[] = SEARCH_ITEMS.filter(
    (item) => item.category === "Navegación" || item.category === "Herramientas Computacionales" || (item.category === "Asignaturas" && ["II4D3", "II5A3", "II7D3", "II8B3", "IO113"].includes(item.code || ""))
);
