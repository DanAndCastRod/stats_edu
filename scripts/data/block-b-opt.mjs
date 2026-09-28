export const blockBOpt = [
  {
    id: "ii7d3-m1",
    courseCode: "II7D3",
    courseTitle: "Investigación de Operaciones I",
    moduleNumber: 1,
    moduleTitle: "Modelación Matemática y Método Gráfico",
    coordination: "Ing. Natalia Bohórquez Bedoya",
    competencies: "Capacidad para abstraer sistemas productivos complejos en modelos matemáticos de optimización lineal y resolver problemas bidimensionales mediante geometría de conjuntos convexos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Estructura Canónica de un Programa Lineal (PL):**
   $$\\begin{aligned}
   \\max \\text{ o } \\min \\quad & z = \\mathbf{c}^T \\mathbf{x} = \\sum_{j=1}^n c_j x_j \\\\
   \\text{sujeto a} \\quad & \\mathbf{A} \\mathbf{x} \\le \\mathbf{b} \\quad (\\text{o } =, \\ge) \\\\
   & \\mathbf{x} \\ge \\mathbf{0}
   \\end{aligned}$$
   donde $\\mathbf{x} \\in \\mathbb{R}^n$ es el vector de variables de decisión, $\\mathbf{c} \\in \\mathbb{R}^n$ los coeficientes de costo/beneficio, $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ la matriz de tecnología y $\\mathbf{b} \\in \\mathbb{R}^m$ el vector de recursos disponibles.

2. **Geometría y Conjuntos Convexos en $\\mathbb{R}^2$:**
   - La región factible $\\mathcal{F} = \\{ \\mathbf{x} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{x} \\le \\mathbf{b}, \\mathbf{x} \\ge \\mathbf{0} \\}$ es la intersección finita de semiespacios cerrados, constituyendo un **poliedro convexo**.
   - **Conjunto Convexo:** $\\mathcal{S}$ es convexo si $\\forall \\mathbf{x}_1, \\mathbf{x}_2 \\in \\mathcal{S}$ y $\\forall \\lambda \\in [0, 1]$, $\\lambda \\mathbf{x}_1 + (1 - \\lambda) \\mathbf{x}_2 \\in \\mathcal{S}$.
   - **Punto Extremo (Vértice):** Un punto $\\mathbf{x} \\in \\mathcal{F}$ es extremo si no puede expresarse como combinación convexa estricta de dos puntos distintos de $\\mathcal{F}$.

3. **Teorema Fundamental de la Programación Lineal:**
   Si la región factible $\\mathcal{F}$ es acotada (politopo) y no vacía, la función objetivo lineal alcanza su valor óptimo en al menos uno de los puntos extremos (vértices) de $\\mathcal{F}$. Si el óptimo se alcanza en dos vértices adyacentes, cualquier combinación convexa entre ellos es también una solución óptima (infinitas soluciones óptimas).

4. **Clasificación de Soluciones en el Método Gráfico:**
   - **Solución Única:** La línea de nivel de $z$ intersecta la región factible en un único vértice en su límite de salida.
   - **Soluciones Múltiples:** La línea de nivel es paralela a una de las restricciones activas vinculantes.
   - **Problema No Acotado (Unbounded):** La región factible es abierta en la dirección de mejora y $z \\to \\infty$.
   - **Infactibilidad:** $\\mathcal{F} = \\emptyset$, no existe ningún punto común a todas las restricciones.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **George B. Dantzig (1963)** — *Linear Programming and Extensions*: Obra fundacional de la optimización lineal.
- **Hillier & Lieberman (2021)** — *Introduction to Operations Research*: Enfoque pedagógico clásico de formulación y geometría 2D.
- **Hamdy A. Taha (2017)** — *Operations Research: An Introduction*: Taxonomía de modelos de asignación de recursos y método gráfico.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Mezcla óptima de producción en una planta procesadora de derivados de café en Chinchiná y Pereira: asignación de horas de molienda y empaque para maximizar el margen de contribución sujeto a capacidad instalada y disponibilidad de grano pergamino seco.`,
    toolMapping: "Herramienta: Demostrador interactivo del Método Gráfico en la landing page y Solucionador Simplex en `/tools#simplex`."
  },
  {
    id: "ii7d3-m2",
    courseCode: "II7D3",
    courseTitle: "Investigación de Operaciones I",
    moduleNumber: 2,
    moduleTitle: "El Algoritmo Simplex Tabular y Dos Fases",
    coordination: "Ing. Natalia Bohórquez Bedoya",
    competencies: "Dominio algebraico del método Simplex tabular estándar, manejo de variables artificiales mediante los métodos de las Dos Fases y la Gran M, e identificación de degeneración y ciclado.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Forma Estándar y Solución Básica Factible (SBF):**
   $$\\mathbf{A} \\mathbf{x} = \\mathbf{b}, \\quad \\mathbf{x} \\ge \\mathbf{0}$$
   Particionando $\\mathbf{A} = [\\mathbf{B} \\mid \\mathbf{N}]$ con $\\mathbf{B} \\in \\mathbb{R}^{m \\times m}$ no singular:
   $$\\mathbf{x}_B = \\mathbf{B}^{-1} \\mathbf{b}, \\qquad \\mathbf{x}_N = \\mathbf{0}$$
   - Si $\\mathbf{x}_B \\ge \\mathbf{0}$, es una **Solución Básica Factible (SBF)**, correspondiente exactamente a un punto extremo del poliedro.
   - Costos reducidos (Row 0):
     $$z_j - c_j = \\mathbf{c}_B^T \\mathbf{B}^{-1} \\mathbf{A}_j - c_j$$
   - **Criterio de Optimalidad (Maximización):** Si todos los costos reducidos $z_j - c_j \\ge 0$, la base actual es óptima.

2. **Álgebra del Paso de Pivoteo Simplex:**
   - **Variable que entra (Regla de Dantzig):** $k = \\arg\\min_j \\{ c_j - z_j : c_j - z_j > 0 \\}$.
   - **Variable que sale (Prueba del Cociente Mínimo):**
     $$r = \\arg\\min_{i : y_{ik} > 0} \\left\\{ \\frac{\\bar{b}_i}{y_{ik}} \\right\\}, \\qquad \\mathbf{y}_k = \\mathbf{B}^{-1} \\mathbf{A}_k, \\quad \\bar{\\mathbf{b}} = \\mathbf{B}^{-1} \\mathbf{b}$$
     Esta regla previene salir de la región factible preservando $\\mathbf{x}_B \\ge \\mathbf{0}$.

3. **Manejo de Restricciones $\\ge$ e $=$ (Método de las Dos Fases):**
   - **Fase I:** Se añaden variables artificiales $\\mathbf{w} \\ge \\mathbf{0}$ para obtener una base inicial de identidad:
     $$\\min W = \\sum_{i=1}^m w_i \\quad \\text{s.a. } \\mathbf{A}\\mathbf{x} + \\mathbf{w} = \\mathbf{b}$$
     * Si $\\min W > 0$: El problema original es **infactible**.
     * Si $\\min W = 0$: Las variables artificiales salen de la base, logrando una SBF legítima.
   - **Fase II:** Se restablece la función objetivo original $z = \\mathbf{c}^T \\mathbf{x}$ y se continúa el Simplex estándar hasta la optimalidad.

4. **Degeneración y Ciclado:**
   Una SBF es degenerada si al menos una variable básica vale cero ($x_{Bi} = 0$). Puede provocar ciclado en la base. Solución teórica: Regla del Menor Índice de Bland (1977).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **George B. Dantzig (1947, 1951)** — *Maximization of a Linear Function of Variables Subject to Linear Inequalities*.
- **Robert G. Bland (1977)** — *New Finite Pivoting Rules for the Simplex Method*: Demostración formal de prevención de ciclado infinito.
- **Bertsimas & Tsitsiklis (1997)** — *Introduction to Linear Optimization*: Capítulos 2 y 3 sobre geometría y álgebra de bases.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Planificación agregada de la producción en fábricas de confección textil de Dosquebradas y Pereira: resolución de problemas de asignación de turnos, horas extra y subcontratación con más de 20 restricciones simultáneas.`,
    toolMapping: "Herramienta: Resolutor del Método Simplex Primal (`/tools#simplex`) con tablas dinámicas de iteración paso a paso y pivoteo en tiempo real."
  },
  {
    id: "ii7d3-m3",
    courseCode: "II7D3",
    courseTitle: "Investigación de Operaciones I",
    moduleNumber: 3,
    moduleTitle: "Teoría de la Dualidad y Análisis de Sensibilidad",
    coordination: "Ing. Natalia Bohórquez Bedoya",
    competencies: "Comprensión rigurosa de las relaciones Primal-Dual, precios sombra, holguras complementarias, y análisis de sensibilidad de coeficientes de costos y límites de recursos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Par de Problemas Primal y Dual Canónicos:**
   $$\\begin{aligned}
   \\text{(Primal)} \\quad & \\max \\; z = \\mathbf{c}^T \\mathbf{x} \\quad \\text{s.a. } \\mathbf{A}\\mathbf{x} \\le \\mathbf{b}, \\; \\mathbf{x} \\ge \\mathbf{0} \\\\
   \\text{(Dual)} \\quad & \\min \\; w = \\mathbf{b}^T \\mathbf{y} \\quad \\text{s.a. } \\mathbf{A}^T \\mathbf{y} \\ge \\mathbf{c}, \\; \\mathbf{y} \\ge \\mathbf{0}
   \\end{aligned}$$
   donde $\\mathbf{y} = (\\mathbf{c}_B^T \\mathbf{B}^{-1})^T$ es el vector de variables duales o **precios sombra**.

2. **Teoremas Fundamentales de Dualidad:**
   - **Dualidad Débil:** Si $\\mathbf{x}$ es factible en el Primal e $\\mathbf{y}$ es factible en el Dual:
     $$\\mathbf{c}^T \\mathbf{x} \\le \\mathbf{b}^T \\mathbf{y}$$
   - **Dualidad Fuerte (Von Neumann, 1947):** Si el Primal tiene una solución óptima finita $\\mathbf{x}^*$, entonces el Dual también tiene una solución óptima finita $\\mathbf{y}^*$ y sus valores objetivos coinciden exactamente:
     $$\\mathbf{c}^T \\mathbf{x}^* = \\mathbf{b}^T \\mathbf{y}^*$$
   - **Teorema de las Holguras Complementarias:** Sean $\\mathbf{s} = \\mathbf{b} - \\mathbf{A}\\mathbf{x}^* \\ge \\mathbf{0}$ las holguras primales y $\\mathbf{e} = \\mathbf{A}^T \\mathbf{y}^* - \\mathbf{c} \\ge \\mathbf{0}$ los excedentes duales. En la optimalidad:
     $$y_i^* \\cdot s_i = 0, \\quad \\forall i = 1, \\dots, m$$
     $$x_j^* \\cdot e_j = 0, \\quad \\forall j = 1, \\dots, n$$
     *(Interpretación económica: Si un recurso no se agota por completo ($s_i > 0$), su precio sombra marginal es estrictamente cero ($y_i^* = 0$)).*

3. **Análisis de Sensibilidad Post-Óptimo:**
   - **Cambios en los recursos ($b_k$):** La base actual permanece factible mientras:
     $$\\mathbf{x}_B = \\mathbf{B}^{-1} (\\mathbf{b} + \\Delta b_k \\mathbf{e}_k) \\ge \\mathbf{0}$$
     El valor óptimo cambia a razón de $\\frac{\\partial z^*}{\\partial b_k} = y_k^*$.
   - **Cambios en los coeficientes de la función objetivo ($c_j$):**
     * Para variables no básicas: La base permanece óptima si $\\bar{c}_j + \\Delta c_j \\le 0$.
     * Para variables básicas: La base permanece óptima si $\\mathbf{c}_B^T \\mathbf{B}^{-1} \\mathbf{A}_j - c_j \\ge 0, \\forall j \\in N$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **John von Neumann (1947)** — *On a Theory of Games and Its Applications to Operations Research*: Primera prueba matemática de dualidad lineal.
- **David Gale, Harold Kuhn & Albert Tucker (1951)** — *Linear Programming and the Theory of Games*.
- **Bazaraa, Jarvis & Sherali (2010)** — *Linear Programming and Network Flows*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Determinación del valor económico marginal de una hora extra de operario o de máquina en el taller metalmecánico de la UTP: el precio sombra dual indica exactamente el pago máximo admisible por dicha hora extra antes de incurrir en pérdidas.`,
    toolMapping: "Herramienta: Módulo Simplex con extracción dual y precios sombra en `/tools#simplex`."
  },
  {
    id: "ii7d3-m4",
    courseCode: "II7D3",
    courseTitle: "Investigación de Operaciones I",
    moduleNumber: 4,
    moduleTitle: "Modelos de Transporte y Asignación",
    coordination: "Ing. Natalia Bohórquez Bedoya",
    competencies: "Formulación de problemas de redes bipartitas con estructura unimodular total, obtención de soluciones iniciales y optimización con el método de los multiplicadores MODI y el algoritmo Húngaro.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Problema de Transporte Balanceado:**
   $$\\min \\quad z = \\sum_{i=1}^m \\sum_{j=1}^n c_{ij} x_{ij}$$
   $$\\text{s.a.} \\quad \\sum_{j=1}^n x_{ij} = a_i, \\quad \\forall i = 1, \\dots, m \\quad (\\text{Oferta})$$
   $$\\sum_{i=1}^m x_{ij} = b_j, \\quad \\forall j = 1, \\dots, n \\quad (\\text{Demanda})$$
   $$x_{ij} \\ge 0$$
   Condición de balance: $\\sum_{i=1}^m a_i = \\sum_{j=1}^n b_j$.
   - **Propiedad de Unimodularidad Total:** La matriz de coeficientes de restricciones tiene todos sus menores iguales a $0, 1$ o $-1$. Por ende, si los suministros $a_i$ y demandas $b_j$ son enteros, **todas las soluciones básicas son enteras de forma garantizada sin requerir programación entera**.

2. **Métodos de Solución Inicial:**
   - **Esquina Noroeste:** Rápido pero prescinde de los costos unitarios.
   - **Costo Mínimo:** Asignación voraz al costo más bajo disponible.
   - **Aproximación de Vogel (VAM):** Calcula penalizaciones por renglón y columna (diferencia entre los dos costos más bajos) y asigna prioritariamente al costo mínimo de la línea con mayor penalización. Produce SBFs casi óptimas.

3. **Algoritmo de los Multiplicadores (MODI / UV):**
   Para las $m + n - 1$ variables básicas:
   $$u_i + v_j = c_{ij}$$
   Fijando un multiplicador arbitrario (ej. $u_1 = 0$) se calculan los restantes $u_i$ y $v_j$.
   - Para las variables no básicas: Costo reducido $\\bar{c}_{ij} = c_{ij} - u_i - v_j$.
   - Si $\\bar{c}_{ij} \\ge 0, \\forall (i, j) \\notin B$, la solución es **óptima**. De lo contrario, la celda con el valor más negativo entra a la base, cerrando un circuito rectangular cerrado de redistribución (+ / -).

4. **Problema de Asignación y Algoritmo Húngaro (Kuhn, 1955):**
   Matriz cuadrada $n \\times n$ con variables binarias $x_{ij} \\in \\{0, 1\\}$. Basado en el Teorema de König-Egerváry: reducción de filas y columnas, y cobertura mínima de ceros con líneas rectas.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Harold W. Kuhn (1955)** — *The Hungarian Method for the Assignment Problem*: Hito de la optimización combinatoria polinomial.
- **Frank L. Hitchcock (1941)** — *The Distribution of a Product from Several Sources to Numerous Localities*.
- **Koopmans (1949)** — *Optimum Utilization of the Transportation System*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Optimización de la distribución física de sacos de azúcar y café desde 3 centrales de acopio en Risaralda hacia 5 centros de distribución mayorista en Bogotá, Medellín y Cali, reduciendo en un 18% los fletes logísticos totales.`,
    toolMapping: "Herramienta: Optimizador de Redes y Transporte en `/tools`."
  },
  {
    id: "ii7d3-m5",
    courseCode: "II7D3",
    courseTitle: "Investigación de Operaciones I",
    moduleNumber: 5,
    moduleTitle: "Optimización de Redes y Gestión de Proyectos (PERT/CPM)",
    coordination: "Ing. Natalia Bohórquez Bedoya",
    competencies: "Modelado de redes de proyectos (AOA/AON), cálculo de holguras totales y libres, identificación de la Ruta Crítica y análisis de probabilidad de culminación bajo duraciones estocásticas.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Topología de Redes de Proyectos (Actividad en Nodo - AON):**
   Grafo dirigido acíclico $G = (V, E)$, donde los nodos representan actividades y los arcos relaciones de precedencia tecnológica.

2. **Algoritmo de Doble Pase CPM:**
   - **Pase hacia Adelante (Tiempos Tempranos):**
     $$ES_j = \\max_{i \\in \\text{Pred}(j)} \\{ EF_i \\}, \\qquad EF_j = ES_j + D_j$$
     con $ES_1 = 0$. La duración del proyecto es $T_P = \\max_j EF_j$.
   - **Pase hacia Atrás (Tiempos Tardíos):**
     $$LF_i = \\min_{j \\in \\text{Suc}(i)} \\{ LS_j \\}, \\qquad LS_i = LF_i - D_i$$
     con $LF_{\\text{final}} = T_P$.

3. **Holguras y Ruta Crítica:**
   - **Holgura Total ($H_i$):** Margen de tiempo que la actividad $i$ puede retrasarse sin afectar la fecha final del proyecto:
     $$H_i = LS_i - ES_i = LF_i - EF_i$$
   - **Holgura Libre ($HL_i$):** Margen que puede retrasarse sin afectar el inicio temprano de ninguna actividad sucesora:
     $$HL_i = \\min_{j \\in \\text{Suc}(i)} \\{ ES_j \\} - EF_i$$
   - **Ruta Crítica:** Secuencia continua de actividades con holgura total nula ($H_i = 0$). Cualquier retraso en ellas aplaza la culminación del proyecto.

4. **Metodología PERT (Duraciones Probabilísticas):**
   Aproximación de la duración de cada actividad mediante una distribución Beta con 3 estimaciones de tiempo: optimista ($a$), más probable ($m$), pesimista ($b$):
   - Tiempo esperado de duración:
     $$\\mu_i = T_{e, i} = \\frac{a_i + 4m_i + b_i}{6}$$
   - Varianza de la actividad:
     $$\\sigma_i^2 = \\left( \\frac{b_i - a_i}{6} \\right)^2$$
   - Por el Teorema del Límite Central, la duración total de la ruta crítica $T_{\\text{CP}}$ se aproxima a una Normal:
     $$\\mu_P = \\sum_{i \\in \\text{Ruta Crítica}} T_{e, i}, \\qquad \\sigma_P^2 = \\sum_{i \\in \\text{Ruta Crítica}} \\sigma_i^2$$
   - Probabilidad de entregar el proyecto antes de una fecha límite $T_D$:
     $$Z = \\frac{T_D - \\mu_P}{\\sigma_P}, \\qquad \\mathbb{P}(T_{\\text{CP}} \\le T_D) = \\Phi(Z)$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Kelley & Walker (1959)** — *Critical Path Planning and Scheduling (CPM)* (DuPont & Remington Rand).
- **Malcolm, Roseboom, Clark & Fazar (1959)** — *Application of a Technique for Research and Development Program Evaluation (PERT)* (US Navy Polaris Project).
- **Moder, Phillips & Davis (1983)** — *Project Management with CPM, PERT and Precedence Diagramming*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Planificación y control de la parada de planta anual en ingenios azucareros para mantenimiento mayor de calderas y molinos: determinación de la ruta crítica de 45 días y cálculo de la probabilidad del 95% de reiniciar molienda a tiempo.`,
    toolMapping: "Herramienta: CPM / PERT Network Optimizer (`/tools#cpm`) con cálculo de pases hacia adelante/atrás, holguras, ruta crítica, varianza acumulada y análisis de riesgo Z."
  },
  {
    id: "ioa10-m1",
    courseCode: "IOA10",
    courseTitle: "Fundamentos de Investigación de Operaciones (Nivelatorio MIOE)",
    moduleNumber: 1,
    moduleTitle: "Modelado Matemático y Dualidad Rigurosa",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Formalización rigurosa de espacios de optimización, dualidad de Lagrange, caracterización del cono recesivo y cotas convexas en espacios vectoriales normados.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Formulación General en Espacios Euclidianos:**
   $$\\min_{\\mathbf{x} \\in \\mathcal{X}} f(\\mathbf{x}) \\quad \\text{s.a. } g_i(\\mathbf{x}) \\le 0 \\; (i=1..m), \\quad h_j(\\mathbf{x}) = 0 \\; (j=1..p)$$
   donde $\\mathcal{X} \\subseteq \\mathbb{R}^n$.

2. **Dualidad de Lagrange y Función Dual:**
   - Lagrangiano:
     $$L(\\mathbf{x}, \\boldsymbol{\\lambda}, \\boldsymbol{\\nu}) = f(\\mathbf{x}) + \\sum_{i=1}^m \\lambda_i g_i(\\mathbf{x}) + \\sum_{j=1}^p \\nu_j h_j(\\mathbf{x})$$
   - Función Dual de Lagrange:
     $$g(\\boldsymbol{\\lambda}, \\boldsymbol{\\nu}) = \\inf_{\\mathbf{x} \\in \\mathcal{X}} L(\\mathbf{x}, \\boldsymbol{\\lambda}, \\boldsymbol{\\nu})$$
     *Propiedad:* $g(\\boldsymbol{\\lambda}, \\boldsymbol{\\nu})$ es **siempre cóncava**, independientemente de si $f$ y $g_i$ son o no convexas.
   - Problema Dual de Lagrange: $\\max_{\\boldsymbol{\\lambda} \\ge \\mathbf{0}, \\boldsymbol{\\nu}} g(\\boldsymbol{\\lambda}, \\boldsymbol{\\nu})$.
   - Salto de Dualidad (Duality Gap): $\\Delta = f(\\mathbf{x}^*) - g(\\boldsymbol{\\lambda}^*, \\boldsymbol{\\nu}^*) \\ge 0$. Bajo la condición de cualificación de Slater y convexidad estricta, $\\Delta = 0$ (Dualidad Fuerte).

3. **Geometría de Conos y Teorema de Separación de Hiperplanos:**
   Si $\\mathcal{C} \\subset \\mathbb{R}^n$ es un conjunto convexo cerrado no vacío y $\\mathbf{y} \\notin \\mathcal{C}$, existe un vector normal $\\mathbf{a} \\in \\mathbb{R}^n, \\mathbf{a} \\ne \\mathbf{0}$ y un escalar $b \\in \\mathbb{R}$ tal que:
   $$\\mathbf{a}^T \\mathbf{x} \\le b < \\mathbf{a}^T \\mathbf{y}, \\quad \\forall \\mathbf{x} \\in \\mathcal{C}$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Stephen Boyd & Lieven Vandenberghe (2004)** — *Convex Optimization*: Texto maestro de referencia en Stanford para dualidad de Lagrange y optimización cónica.
- **Bertsekas (2009)** — *Convex Optimization Theory*.
- **Toro Ocampo & Soto Mejía (UTP)**: Guías de posgrado en modelación matemática avanzada.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Relajación Lagrangiana para descomponer problemas de ruteo de vehículos con ventanas de tiempo (VRPTW) y despacho hidrotérmico de energía en el Sistema Interconectado Nacional.`,
    toolMapping: "Herramienta: Módulo avanzado de descomposición y relajación en `/tools`."
  },
  {
    id: "ioa10-m2",
    courseCode: "IOA10",
    courseTitle: "Fundamentos de Investigación de Operaciones (Nivelatorio MIOE)",
    moduleNumber: 2,
    moduleTitle: "Algoritmos y Solvers Computacionales",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Modelado algebraico formal en lenguajes declarativos (AMPL, Pyomo, PuLP) y comprensión interna de los algoritmos de ramificación y corte (Branch and Cut) en motores CPLEX/Gurobi.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Algoritmo de Branch and Cut (MIP):**
   Para problemas lineales enteros mixtos:
   $$\\min \\mathbf{c}^T \\mathbf{x} + \\mathbf{d}^T \\mathbf{y} \\quad \\text{s.a. } \\mathbf{A}\\mathbf{x} + \\mathbf{G}\\mathbf{y} \\ge \\mathbf{b}, \\quad \\mathbf{x} \\ge \\mathbf{0}, \\; \\mathbf{y} \\in \\mathbb{Z}_+^p$$
   - **Ramificación:** Se selecciona una variable entera fraccionaria $y_j = f \\notin \\mathbb{Z}$ en la relajación continua y se bifurca en dos subproblemas:
     $$y_j \\le \\lfloor f \\rfloor \\quad \\lor \\quad y_j \\ge \\lceil f \\rceil$$
   - **Acotamiento:** Si el valor óptimo del nodo relajado supera la mejor cota superior conocida ($Z_{\\text{relajado}} \\ge Z_{\\text{best}}$), el nodo se poda por cota.
   - **Cortes Hiperplanares de Gomory:** Adición de desigualdades válidas que recortan la región continua sin eliminar ningún punto entero factible:
     $$\\sum_{j \\in N} (f_j) x_j \\ge f_0, \\quad f_j = a_j - \\lfloor a_j \\rfloor, \\; f_0 = \\bar{b} - \\lfloor \\bar{b} \\rfloor$$

2. **Medición del Gap de Optimalidad (MIP Gap):**
   $$\\text{MIP Gap} = \\frac{|Z_{\\text{incumbente}} - Z_{\\text{cota relajada}}|}{|Z_{\\text{incumbente}}| + \\epsilon} \\times 100\\%$$
   El solver detiene la búsqueda cuando $\\text{MIP Gap} \\le \\text{Tolerancia}$ (e.g. $0.01\\%$).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Laurence Wolsey (2020)** — *Integer Programming*: Texto canónico mundial sobre teoría de poliedros enteros, cortes de Gomory y Branch and Cut.
- **Ralph Gomory (1958)** — *Outline of an Algorithm for Integer Solutions to Linear Programs*.
- **Gurobi Optimization / CPLEX User Manuals**: Arquitectura de presolve y heurísticas primales internas.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Localización óptima de plantas y centros de distribución con costos fijos de apertura en el Eje Cafetero, resuelto a través de formulación MILP en Python-PuLP con garantía de GAP $< 0.05\\%$.`,
    toolMapping: "Herramienta: Laboratorio Pyodide Wasm con solvers lineales integrados y visualizador Branch and Bound."
  },
  {
    id: "io113-m1",
    courseCode: "IO113",
    courseTitle: "Programación Lineal Avanzada",
    moduleNumber: 1,
    moduleTitle: "Teoría Poliédrica y Simplex Revisado",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Análisis algebraico profundo de conos poliédricos, lema de Farkas, representación de Minkowski-Weyl y factorización Eta en el método Simplex Revisado a gran escala.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Teorema de Resolución de Minkowski-Weyl:**
   Todo poliedro $\\mathcal{P} = \\{ \\mathbf{x} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{x} \\le \\mathbf{b} \\}$ puede expresarse de manera única como la suma de Minkowski de la cápsula convexa de sus puntos extremos $\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_k\\}$ y el cono cónico generado por sus direcciones extremas $\\{\\mathbf{d}_1, \\dots, \\mathbf{d}_r\\}$:
   $$\\mathcal{P} = \\text{conv}(\\mathbf{v}_1, \\dots, \\mathbf{v}_k) + \\text{cone}(\\mathbf{d}_1, \\dots, \\mathbf{d}_r)$$
   $$\\mathbf{x} = \\sum_{i=1}^k \\lambda_i \\mathbf{v}_i + \\sum_{j=1}^r \\mu_j \\mathbf{d}_j, \\quad \\sum_{i=1}^k \\lambda_i = 1, \\; \\lambda_i \\ge 0, \\; \\mu_j \\ge 0$$

2. **Lema de Farkas (Teorema de Alternativas):**
   Exactamente uno de los dos sistemas siguientes tiene solución:
   - Sistema 1: $\\mathbf{A}\\mathbf{x} = \\mathbf{b}, \\; \\mathbf{x} \\ge \\mathbf{0}$.
   - Sistema 2: $\\mathbf{A}^T \\mathbf{y} \\ge \\mathbf{0}, \\; \\mathbf{b}^T \\mathbf{y} < 0$.

3. **Álgebra del Simplex Revisado con Factorización Productiva:**
   En lugar de recalcular la inversa $\\mathbf{B}^{-1}$ explícitamente en cada paso ($O(m^3)$), se mantiene como un producto ordenado de matrices elementales $\\mathbf{E}_k$ (Matrices Eta):
   $$\\mathbf{B}_k^{-1} = \\mathbf{E}_k \\mathbf{E}_{k-1} \\dots \\mathbf{E}_1 \\mathbf{B}_0^{-1}$$
   donde $\\mathbf{E}_k$ difiere de la matriz identidad únicamente en la columna que sale del pivoteo, permitiendo multiplicaciones vectoriales ultra-eficientes en matrices dispersas ($O(m)$ por actualización).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Dimitris Bertsimas & John N. Tsitsiklis (1997)** — *Introduction to Linear Optimization* (Athena Scientific): Capítulos 1, 2 y 7.
- **Alexander Schrijver (1986)** — *Theory of Linear and Integer Programming* (Wiley): La enciclopedia matemática de la teoría poliédrica.
- **György Farkas (1902)** — *Theorie der einfachen Ungleichungen*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Despacho óptimo horario de 120 generadores eléctricos en el mercado de energía mayorista colombiano, aprovechando la factorización Eta para resolver sistemas de 50.000 restricciones en segundos.`,
    toolMapping: "Herramienta: Motor matricial de optimización lineal avanzada en `/tools#simplex`."
  },
  {
    id: "io113-m2",
    courseCode: "IO113",
    courseTitle: "Programación Lineal Avanzada",
    moduleNumber: 2,
    moduleTitle: "Descomposición de Dantzig-Wolfe y Generación de Columnas",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Capacidad para formular y resolver problemas de optimización de gran escala con estructuras diagonales por bloques, aplicando el principio de descomposición y subproblemas de generación de columnas (Cutting Stock).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Estructura Diagonal por Bloques (Coupling Constraints):**
   $$\\begin{aligned}
   \\min \\quad & \\sum_{k=1}^K \\mathbf{c}_k^T \\mathbf{x}_k \\\\
   \\text{s.a.} \\quad & \\sum_{k=1}^K \\mathbf{D}_k \\mathbf{x}_k = \\mathbf{b}_0 \\quad (\\text{Restricciones de Acoplamiento}) \\\\
   & \\mathbf{A}_k \\mathbf{x}_k = \\mathbf{b}_k, \\quad \\mathbf{x}_k \\ge \\mathbf{0} \\quad (k=1..K)
   \\end{aligned}$$

2. **Problema Maestro Restringido (RMP) de Dantzig-Wolfe:**
   Aplicando el Teorema de Minkowski-Weyl a cada poliedro individual $\\mathcal{X}_k$:
   $$\\min_{\\lambda_{k, j}} \\quad \\sum_{k=1}^K \\sum_{j=1}^{P_k} (\\mathbf{c}_k^T \\mathbf{v}_{k, j}) \\lambda_{k, j}$$
   $$\\text{s.a.} \\quad \\sum_{k=1}^K \\sum_{j=1}^{P_k} (\\mathbf{D}_k \\mathbf{v}_{k, j}) \\lambda_{k, j} = \\mathbf{b}_0 \\quad (\\boldsymbol{\\pi})$$
   $$\\sum_{j=1}^{P_k} \\lambda_{k, j} = 1 \\quad (\\mu_k), \\qquad \\lambda_{k, j} \\ge 0$$

3. **Subproblema Esclavo y Generación Dinámica de Columnas:**
   En cada iteración del RMP, se extraen los precios sombra duales $(\\boldsymbol{\\pi}, \\mu_k)$. El subproblema busca el vértice que minimiza el costo reducido:
   $$\\min_{\\mathbf{x}_k \\in \\mathcal{X}_k} \\bar{c}_{k} = (\\mathbf{c}_k^T - \\boldsymbol{\\pi}^T \\mathbf{D}_k) \\mathbf{x}_k - \\mu_k$$
   - Si $\\min \\bar{c}_k < 0$, la solución $\\mathbf{x}_k^*$ se inserta como una **nueva columna** en el problema maestro y se repite el proceso.
   - Si $\\min \\bar{c}_k \\ge 0, \\forall k$, el algoritmo termina: la base actual del RMP es el **óptimo global exacto**.

4. **El Problema del Corte de Existencias (Cutting Stock de Gilmore & Gomory, 1961):**
   Minimizar bobinas maestras usadas: el subproblema de generación de columnas es exactamente un **Problema de la Mochila (Knapsack)** resoluble eficientemente con programación dinámica.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **George B. Dantzig & Philip Wolfe (1960)** — *Decomposition Principle for Linear Programs* (Operations Research).
- **P. C. Gilmore & R. E. Gomory (1961)** — *A Linear Programming Approach to the Cutting-Stock Problem*.
- **Desrosiers & Lübbecke (2005)** — *A Primer in Column Generation*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Optimización del guillotinado de bobinas de papel en plantas de Cartón de Colombia (Smurfit Kappa) y corte de perfiles de aluminio para ventanería en Pereira, reduciendo el desperdicio de chatarra del 14% al 1.8%.`,
    toolMapping: "Herramienta: Módulo avanzado de Generación de Columnas y Descomposición en `/tools`."
  },
  {
    id: "io213-m1",
    courseCode: "IO213",
    courseTitle: "Programación No Lineal",
    moduleNumber: 1,
    moduleTitle: "Optimización Sin Restricciones y Métodos Cuasi-Newton",
    coordination: "Dr. Antonio Hernando Escobar Zuluaga",
    competencies: "Caracterización analítica de convexidad local y global, cálculo de gradientes y matrices hessianas, métodos de descenso con búsqueda lineal de Armijo, y algoritmo BFGS.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Condiciones de Optimalidad Sin Restricciones:**
   Para $f: \\mathbb{R}^n \\to \\mathbb{R}$ dos veces diferenciable en $\\mathbf{x}^*$:
   - **Condición Necesaria de Primer Orden (FONC):** $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$ (Punto estacionario).
   - **Condición Necesaria de Segundo Orden (SONC):** $\\nabla^2 f(\\mathbf{x}^*) \\succeq 0$ (Hessiano semidefinido positivo).
   - **Condición Suficiente de Segundo Orden (SOSC):** $\\nabla f(\\mathbf{x}^*) = \\mathbf{0}$ y $\\nabla^2 f(\\mathbf{x}^*) \\succ 0$ (Hessiano estrictamente definido positivo $\\implies$ mínimo local estricto).

2. **Esquema General de Búsqueda Lineal:**
   $$\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k \\mathbf{d}_k$$
   donde $\\mathbf{d}_k$ es una dirección de descenso ($\\nabla f(\\mathbf{x}_k)^T \\mathbf{d}_k < 0$) y $\\alpha_k > 0$ es el tamaño de paso.
   - **Condición de Armijo (Suficiente Descenso):**
     $$f(\\mathbf{x}_k + \\alpha_k \\mathbf{d}_k) \\le f(\\mathbf{x}_k) + c_1 \\alpha_k \\nabla f(\\mathbf{x}_k)^T \\mathbf{d}_k, \\quad c_1 \\in (0, 1)$$

3. **Método de Newton Puro:**
   $$\\mathbf{d}_k = -[\\nabla^2 f(\\mathbf{x}_k)]^{-1} \\nabla f(\\mathbf{x}_k)$$
   Posee tasa de convergencia cuadrática local, pero es computacionalmente costoso ($O(n^3)$ para invertir el Hessiano) y diverge si $\\nabla^2 f$ no es definida positiva.

4. **Algoritmo Cuasi-Newton BFGS (Broyden-Fletcher-Goldfarb-Shanno):**
   Aproxima directamente la inversa del Hessiano $\\mathbf{H}_k \\approx [\\nabla^2 f(\\mathbf{x}_k)]^{-1}$ mediante actualizaciones de rango dos que preservan simetría y definición positiva:
   $$\\mathbf{s}_k = \\mathbf{x}_{k+1} - \\mathbf{x}_k, \\qquad \\mathbf{y}_k = \\nabla f(\\mathbf{x}_{k+1}) - \\nabla f(\\mathbf{x}_k)$$
   Ecuación secante: $\\mathbf{H}_{k+1} \\mathbf{y}_k = \\mathbf{s}_k$.
   Fórmula de actualización BFGS:
   $$\\mathbf{H}_{k+1} = (\\mathbf{I} - \\rho_k \\mathbf{s}_k \\mathbf{y}_k^T) \\mathbf{H}_k (\\mathbf{I} - \\rho_k \\mathbf{y}_k \\mathbf{s}_k^T) + \\rho_k \\mathbf{s}_k \\mathbf{s}_k^T, \\qquad \\rho_k = \\frac{1}{\\mathbf{y}_k^T \\mathbf{s}_k}$$
   Convergencia superlineal global con costo por iteración de solo $O(n^2)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Jorge Nocedal & Stephen J. Wright (2006)** — *Numerical Optimization* (Springer): El texto de referencia universal en optimización no lineal.
- **Mokhtar S. Bazaraa, Hanif D. Sherali & C. M. Shetty (2013)** — *Nonlinear Programming: Theory and Algorithms*.
- **Antonio Escobar Zuluaga (UTP)**: Publicaciones en transmisión de energía y flujo de carga óptimo no lineal.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Ajuste no lineal de parámetros cinéticos de fermentación en producción de levaduras cerveceras y bioinsecticidas, minimizando el error cuadrático mediante BFGS sin cálculo analítico del Hessiano.`,
    toolMapping: "Herramienta: Laboratorio Pyodide con `scipy.optimize.minimize(method='BFGS')` en lección interactiva."
  },
  {
    id: "io213-m2",
    courseCode: "IO213",
    courseTitle: "Programación No Lineal",
    moduleNumber: 2,
    moduleTitle: "Optimización con Restricciones y Condiciones KKT",
    coordination: "Dr. Antonio Hernando Escobar Zuluaga",
    competencies: "Formulación de problemas no lineales con restricciones, calificación de restricciones (LICQ, MFCQ, Slater), condiciones Karush-Kuhn-Tucker (KKT), y métodos de Penalización y Barrera Interior.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Problema No Lineal General:**
   $$\\min_{\\mathbf{x} \\in \\mathbb{R}^n} f(\\mathbf{x}) \\quad \\text{s.a. } g_i(\\mathbf{x}) \\le 0 \\; (i=1..m), \\quad h_j(\\mathbf{x}) = 0 \\; (j=1..p)$$

2. **Condiciones de Karush-Kuhn-Tucker (KKT):**
   Bajo una condición de calificación de restricciones (Constraint Qualification, e.g. **LICQ**: los gradientes de las restricciones activas $\\{\\nabla g_i(\\mathbf{x}^*), i \\in \\mathcal{A}(\\mathbf{x}^*)\\} \\cup \\{\\nabla h_j(\\mathbf{x}^*)\\}$ son linealmente independientes), si $\\mathbf{x}^*$ es un mínimo local, existen multiplicadores $\\boldsymbol{\\lambda}^* \\in \\mathbb{R}^m$ y $\\boldsymbol{\\mu}^* \\in \\mathbb{R}^p$ tales que:
   - **Estacionariedad:**
     $$\\nabla f(\\mathbf{x}^*) + \\sum_{i=1}^m \\lambda_i^* \\nabla g_i(\\mathbf{x}^*) + \\sum_{j=1}^p \\mu_j^* \\nabla h_j(\\mathbf{x}^*) = \\mathbf{0}$$
   - **Factibilidad Primal:**
     $$g_i(\\mathbf{x}^*) \\le 0, \\; \\forall i = 1..m; \\qquad h_j(\\mathbf{x}^*) = 0, \\; \\forall j = 1..p$$
   - **Factibilidad Dual:**
     $$\\lambda_i^* \\ge 0, \\; \\forall i = 1..m$$
   - **Holgura Complementaria:**
     $$\\lambda_i^* \\cdot g_i(\\mathbf{x}^*) = 0, \\; \\forall i = 1..m$$
   *(Si el problema es convexo —$f$ y $g_i$ convexas, $h_j$ afines— y se cumple la condición de Slater, las condiciones KKT son **necesarias y suficientes para el óptimo global**).*

3. **Métodos de Penalización Externa y Barrera Logarítmica:**
   - **Penalización Cuadrática Externa:**
     $$P(\\mathbf{x}; \\mu) = f(\\mathbf{x}) + \\frac{\\mu}{2} \\sum_{i=1}^m [\\max(0, g_i(\\mathbf{x}))]^2 + \\frac{\\mu}{2} \\sum_{j=1}^p [h_j(\\mathbf{x})]^2, \\quad \\mu \\to \\infty$$
   - **Barrera Interior Logarítmica (Puntos Interiores):**
     $$B(\\mathbf{x}; \\epsilon) = f(\\mathbf{x}) - \\epsilon \\sum_{i=1}^m \\ln(-g_i(\\mathbf{x})), \\quad \\epsilon \\to 0^+$$
     Mantiene los puntos estrictamente dentro del interior de la región factible, convergiendo a lo largo de la trayectoria central (*Central Path*).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **William Karush (1939)** — *Minima of Functions of Several Variables with Inequalities as Side Constraints*.
- **Harold W. Kuhn & Albert W. Tucker (1951)** — *Nonlinear Programming* (Berkeley Symposium).
- **Anthony V. Fiacco & Garth P. McCormick (1968)** — *Nonlinear Programming: Sequential Unconstrained Minimization Techniques*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Despacho económico óptimo de plantas hidroeléctricas y térmicas en el sistema de potencia de Pereira y Caldas: optimización de costos no lineales de generación sujetos a límites de transmisión en líneas de alta tensión y balances de potencia reactiva.`,
    toolMapping: "Herramienta: Módulo de Puntos Interiores y KKT en `/tools`."
  }
];
