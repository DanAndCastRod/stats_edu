export const blockCStochastic = [
  {
    id: "ii8b3-m1",
    courseCode: "II8B3",
    courseTitle: "Investigación de Operaciones II",
    moduleNumber: 1,
    moduleTitle: "Procesos Estocásticos y Cadenas de Markov",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Capacidad para modelar la evolución dinámica de sistemas probabilísticos con memoria markoviana en tiempo discreto, calculando probabilidades de transición en n pasos y vectores de estado estable.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Definición de Cadena de Markov en Tiempo Discreto (DTMC):**
   Un proceso estocástico $\{X_n, n = 0, 1, 2, \\dots\}$ en un espacio de estados numerable $S$ cumple la **propiedad de Markov** si:
   $$\\mathbb{P}(X_{n+1} = j \\mid X_n = i, X_{n-1} = i_{n-1}, \\dots, X_0 = i_0) = \\mathbb{P}(X_{n+1} = j \\mid X_n = i) = P_{ij}$$
   - **Matriz de Transición Estocástica ($\mathbf{P}$):**
     $$\mathbf{P} = [P_{ij}]_{i,j \\in S}, \\qquad P_{ij} \\ge 0, \\quad \\sum_{j \\in S} P_{ij} = 1, \\; \\forall i \\in S$$

2. **Ecuaciones de Chapman-Kolmogorov:**
   $$P_{ij}^{(m+n)} = \\sum_{k \\in S} P_{ik}^{(m)} P_{kj}^{(n)} \\iff \mathbf{P}^{(n)} = \mathbf{P}^n$$

3. **Clasificación de Estados:**
   - **Accesibilidad y Comunicación:** $i \\to j$ si existe $n \\ge 0$ tal que $P_{ij}^{(n)} > 0$. Si $i \\to j$ y $j \\to i$, se dice que $i \\leftrightarrow j$ (comunican). La relación $\\leftrightarrow$ es de equivalencia y particiona $S$ en clases de comunicación.
   - **Irreducibilidad:** Una cadena es irreducible si todos sus estados se comunican entre sí (una sola clase).
   - **Recurrencia y Transitoriedad:** Sea $f_i = \\mathbb{P}(\\exists n \\ge 1 : X_n = i \\mid X_0 = i)$. Si $f_i = 1$, $i$ es recurrente; si $f_i < 1$, es transitorio.
   - **Periodicidad:** Período $d(i) = \\gcd\\{ n \\ge 1 : P_{ii}^{(n)} > 0 \\}$. Si $d(i) = 1$, el estado es aperiódico.

4. **Distribución Estacionaria y Ergodicidad:**
   Una cadena irreducible y aperiódica con estados recurrentes positivos (ergódica) posee una única distribución estacionaria $\\boldsymbol{\\pi} = (\\pi_1, \\dots, \\pi_N)$ tal que:
   $$\\boldsymbol{\\pi} \mathbf{P} = \\boldsymbol{\\pi}, \\qquad \\sum_{j \\in S} \\pi_j = 1, \\quad \\pi_j > 0$$
   - **Tiempo medio de primer retorno:** $\\mu_{ii} = \\frac{1}{\\pi_i}$.
   - Si existen estados absorbentes ($P_{kk} = 1$), la matriz se particiona en forma canónica $\mathbf{P} = \\begin{pmatrix} \mathbf{I} & \mathbf{0} \\\\ \mathbf{R} & \mathbf{Q} \\end{pmatrix}$, y la matriz fundamental es $\mathbf{N} = (\\mathbf{I} - \mathbf{Q})^{-1}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Andrey Markov (1906)** — *Extension of the Law of Large Numbers to Dependent Quantities*.
- **Sheldon M. Ross (2014)** — *Introduction to Probability Models*: Capítulos 4 y 5.
- **Taha & Hillier-Lieberman**: Enfoque aplicado a operaciones y mantenimiento.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado del estado de degradación de maquinaria pesada en plantas de beneficio de café (Operando Normal, Desgaste Menor, Requiere Calibración, Falla Crítica). Determinación de costos esperados a largo plazo de paradas no programadas.`,
    toolMapping: "Herramienta: Analizador de Cadenas de Markov (DTMC) en `/tools#markov` con cálculo de $\mathbf{P}^n$, vector estacionario $\\boldsymbol{\\pi}$, tiempos de recurrencia y gráfico SVG interactivo."
  },
  {
    id: "ii8b3-m2",
    courseCode: "II8B3",
    courseTitle: "Investigación de Operaciones II",
    moduleNumber: 2,
    moduleTitle: "Teoría de Líneas de Espera (Colas)",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Diseño analítico de sistemas de servicio bajo congestión estocástica, formulación de modelos de nacimiento y muerte, cálculo de métricas L, Lq, W, Wq y optimización económica de capacidad.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Notación Canónica de Kendall (1953):**
   $$A / S / c / K / N / D$$
   donde $A$ es la distribución de arribos, $S$ la de servicio, $c$ número de servidores paralelos, $K$ capacidad del sistema, $N$ tamaño de población fuente y $D$ disciplina de servicio (FCFS, LCFS, SIRO, Prioridad).

2. **Proceso de Nacimiento y Muerte en Estado Estable:**
   Tasas de arribo $\\lambda_n$ y de servicio $\\mu_n$. Ecuaciones de balance detallado:
   $$\\lambda_n P_n = \\mu_{n+1} P_{n+1} \\implies P_n = P_0 \\prod_{i=0}^{n-1} \\frac{\\lambda_i}{\\mu_{i+1}}$$

3. **Modelo $M/M/1$:**
   Factor de utilización $\\rho = \\frac{\\lambda}{\\mu} < 1$.
   $$P_0 = 1 - \\rho, \\qquad P_n = (1 - \\rho) \\rho^n$$
   - Número promedio de clientes en el sistema: $L = \\frac{\\rho}{1 - \\rho} = \\frac{\\lambda}{\\mu - \\lambda}$.
   - Número promedio en cola: $L_q = \\frac{\\lambda^2}{\\mu(\\mu - \\lambda)} = L - \\rho$.
   - **Ley de Little (John Little, 1961):**
     $$L = \\lambda W, \\qquad L_q = \\lambda W_q, \\qquad W = W_q + \\frac{1}{\\mu}$$
     donde $W$ es el tiempo medio de permanencia en el sistema y $W_q$ en la cola de espera.

4. **Modelo $M/M/s$ con Múltiples Servidores:**
   $$\\rho = \\frac{\\lambda}{s \\mu} < 1$$
   - Probabilidad de sistema vacío:
     $$P_0 = \\left[ \\sum_{n=0}^{s-1} \\frac{(\\lambda/\\mu)^n}{n!} + \\frac{(\\lambda/\\mu)^s}{s! (1 - \\rho)} \\right]^{-1}$$
   - Fórmula C de Erlang (Probabilidad de tener que esperar en cola):
     $$P_C = \\mathbb{P}(\\text{Espera}) = \\frac{(\\lambda/\\mu)^s}{s!(1 - \\rho)} P_0$$
   - Longitud media de cola: $L_q = \\frac{P_C \\cdot \\rho}{1 - \\rho}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Agner Krarup Erlang (1909)** — *The Theory of Probabilities and Telephone Conversations*: Origen de la teoría de colas.
- **John D. C. Little (1961)** — *A Proof for the Queuing Formula: L = lambda W* (Operations Research).
- **Gross, Shortle, Thompson & Harris (2008)** — *Fundamentals of Queueing Theory*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Dimensionamiento del número óptimo de muelles de descargue en el centro logístico Eje Cafetero: balance entre el costo horario de camiones ociosos en cola y el costo operativo de apertura de muelles de servicio.`,
    toolMapping: "Herramienta: Calculadora de Teoría de Colas (M/M/s) en `/tools#queueing` con curvas de sensibilidad de costo total y factor $\\rho$."
  },
  {
    id: "ii8b3-m3",
    courseCode: "II8B3",
    courseTitle: "Investigación de Operaciones II",
    moduleNumber: 3,
    moduleTitle: "Teoría y Modelos de Inventarios",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Formulación de políticas de reabastecimiento determinísticas y probabilísticas, derivación de lotes económicos óptimos y diseño de inventarios de seguridad bajo nivel de servicio.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo EOQ Clásico de Wilson (1913):**
   Demanda anual determinística $D$, costo por ordenar $S$, costo unitario de mantener inventario $H = h \\cdot C$.
   - Costo total anual:
     $$TC(Q) = \\frac{D}{Q} S + \\frac{Q}{2} H$$
   - Minimizando $\\frac{d TC}{dQ} = -\\frac{DS}{Q^2} + \\frac{H}{2} = 0$:
     $$Q^* = \\sqrt{\\frac{2 D S}{H}}$$
   - Número de pedidos anuales: $N = D/Q^*$; Tiempo de ciclo: $T = Q^*/D$.

2. **Modelo EOQ con Descuentos por Cantidad:**
   Estructura de precios escalonada por tramos $[q_k, q_{k+1})$. Se calcula $Q^*$ para cada tramo y se evalúa si es factible o si se debe forzar al punto de quiebre $q_k$.

3. **Punto de Reorden (ROP) bajo Demanda Estocástica:**
   Demanda diaria $d \\sim \\mathcal{N}(\\mu_d, \\sigma_d^2)$ y tiempo de entrega $L$:
   - Demanda durante el tiempo de entrega: $D_L \\sim \\mathcal{N}(\\mu_L = \\mu_d L, \\; \\sigma_L = \\sigma_d \\sqrt{L})$.
   - **Stock de Seguridad (Safety Stock - $SS$):**
     $$SS = Z_\\alpha \\cdot \\sigma_L = Z_\\alpha \\cdot \\sigma_d \\sqrt{L}$$
     donde $Z_\\alpha$ es el cuantil normal para el Nivel de Servicio al Ciclo ($CSL = 1 - \\alpha$).
   - Punto de Reorden:
     $$ROP = \\mu_d \\cdot L + SS$$

4. **Modelo del Vendedor de Periódicos (Newsvendor):**
   Un solo período perecedero. Costo de subestimación $C_u = p - c$, costo de sobrestimación $C_o = c - s$.
   - Razón crítica: $\\mathbb{P}(D \\le Q^*) = \\frac{C_u}{C_u + C_o} \\implies Q^* = F^{-1}\\left( \\frac{C_u}{C_u + C_o} \\right)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Ford W. Harris (1913)** / **R. H. Wilson (1934)**: Deducción original de la fórmula de la raíz cuadrada de inventarios.
- **Silver, Pyke & Peterson (1998)** — *Inventory Management and Production Planning and Scheduling*.
- **Zipkin (2000)** — *Foundations of Inventory Management*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Optimización de inventarios de repuestos críticos en el ingenio Risaralda: reducción de quiebres de stock al 1% mediante cálculo dinámico de ROP y stock de seguridad amortiguador.`,
    toolMapping: "Herramienta: Optimizador de Inventarios & Lote Económico en `/tools#inventory` con gráfico de diente de sierra y curva de costos anuales."
  },
  {
    id: "ii8b3-m4",
    courseCode: "II8B3",
    courseTitle: "Investigación de Operaciones II",
    moduleNumber: 4,
    moduleTitle: "Teoría de Juegos y Decisiones Estratégicas",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Modelado de interacciones estratégicas entre agentes racionales, resolución de juegos matriciales de suma cero mediante programación lineal y cálculo de equilibrios de Nash en estrategias puras y mixtas.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Juegos en Forma Normal (Estratégica):**
   Tupla $\\Gamma = (N, \\{S_i\\}_{i \\in N}, \\{u_i\\}_{i \\in N})$, donde $N = \\{1, \\dots, n\\}$ es el conjunto de jugadores, $S_i$ el espacio de estrategias puras de $i$ y $u_i: S \\to \\mathbb{R}$ su función de utilidad.

2. **Equilibrio de Nash (Nash, 1950):**
   Un perfil de estrategias $s^* = (s_1^*, \\dots, s_n^*) \\in S$ es un **Equilibrio de Nash** si ningún jugador tiene incentivos unilaterales para desviarse:
   $$u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*), \\quad \\forall s_i \\in S_i, \\; \\forall i \\in N$$

3. **Juegos Matriciales Bi-personales de Suma Cero:**
   Matriz de pagos $\mathbf{A} \\in \\mathbb{R}^{m \\times n}$. El Jugador 1 maximiza y el Jugador 2 minimiza:
   - Principio Minimax de Von Neumann (1928):
     $$\\max_{\\mathbf{p} \\in \\Delta_m} \\min_{\\mathbf{q} \\in \\Delta_n} \\mathbf{p}^T \mathbf{A} \\mathbf{q} = \\min_{\\mathbf{q} \\in \\Delta_n} \\max_{\\mathbf{p} \\in \\Delta_m} \\mathbf{p}^T \mathbf{A} \\mathbf{q} = V^*$$
     donde $V^*$ es el valor del juego y $\\Delta$ los símplices de probabilidad (estrategias mixtas $\\mathbf{p}, \\mathbf{q}$).

4. **Equivalencia de Juegos de Suma Cero con Programación Lineal:**
   Para el Jugador 1, el problema de maximizar el pago garantizado $v$:
   $$\\max \\quad v \\quad \\text{s.a.} \\quad \\sum_{i=1}^m a_{ij} p_i \\ge v \\; (j=1..n), \\quad \\sum_{i=1}^m p_i = 1, \\quad p_i \\ge 0$$
   El problema dual asociado entrega exactamente la estrategia óptima mixta $\\mathbf{q}^*$ del Jugador 2.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **John Forbes Nash Jr. (1950)** — *Equilibrium Points in n-Person Games* (PNAS) / (1951) *Non-Cooperative Games* (Annals of Mathematics).
- **John von Neumann & Oskar Morgenstern (1944)** — *Theory of Games and Economic Behavior*.
- **Gibbons (1992)** — *Game Theory for Applied Economists*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Estrategia de fijación de precios y promociones entre cadenas de distribución minorista en el Eje Cafetero (Dilema del Prisionero y modelo de duopolio de Bertrand-Nash).`,
    toolMapping: "Herramienta: Módulo de Teoría de Juegos y Resolución Simplex en `/tools`."
  },
  {
    id: "ii8b3-m5",
    courseCode: "II8B3",
    courseTitle: "Investigación de Operaciones II",
    moduleNumber: 5,
    moduleTitle: "Simulación de Eventos Discretos y Monte Carlo",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Diseño conceptual de experimentos de simulación estocástica, integración de números pseudoaleatorios, generación de trayectorias muestrales y estimación de intervalos de confianza para variables de desempeño.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Principio de Simulación Monte Carlo:**
   Estimación de una integral definida o valor esperado $\\theta = \\mathbb{E}[g(\\mathbf{X})] = \\int_{\\mathbb{R}^d} g(\\mathbf{x}) f(\\mathbf{x}) d\\mathbf{x}$.
   - Estimador muestral insesgado:
     $$\\hat{\\theta}_N = \\frac{1}{N} \\sum_{i=1}^N g(\\mathbf{X}_i), \\quad \\mathbf{X}_i \\overset{\\text{iid}}{\\sim} f(\\mathbf{x})$$
   - Por la Ley Fuerte de los Grandes Números: $\\hat{\\theta}_N \\xrightarrow{a.s.} \\theta$.
   - Por el Teorema del Límite Central, el error estándar disminuye a tasa $O(1/\\sqrt{N})$:
     $$\\text{Var}(\\hat{\\theta}_N) = \\frac{\\sigma^2}{N} \\implies \\hat{\\theta}_N \\pm Z_{\\alpha/2} \\frac{s}{\\sqrt{N}}$$
     *Propiedad clave:* La convergencia $O(N^{-1/2})$ es **independiente de la dimensión $d$**, superando la maldición de la dimensionalidad de las cuadraturas numéricas clásicas.

2. **Técnicas de Reducción de Varianza:**
   - **Variables Antitéticas:** Utilizar pares correlacionados negativamente $(U, 1-U)$ para cancelar varianza: $\\text{Var}\\left(\\frac{X^{(1)} + X^{(2)}}{2}\\right) = \\frac{\\sigma^2}{2} + \\frac{\\text{Cov}(X^{(1)}, X^{(2)})}{2} < \\frac{\\sigma^2}{2}$.
   - **Muestreo por Importancia (Importance Sampling):** Modificar la densidad de muestreo a $h(\\mathbf{x})$ para sobre-muestrear eventos raros con pesos de verosimilitud $w(\\mathbf{x}) = f(\\mathbf{x})/h(\\mathbf{x})$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Metropolis & Ulam (1949)** — *The Monte Carlo Method* (JASA): Publicación fundacional del Proyecto Manhattan.
- **Law & Kelton (2000)** / **Averill M. Law (2015)** — *Simulation Modeling and Analysis*: El manual clásico de referencia en simulación industrial.
- **Fishman (1996)** — *Monte Carlo: Concepts, Algorithms, and Applications*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Simulación de la viabilidad financiera y operativa de instalar una planta de cogeneración eléctrica a partir de biomasa de café en Caldas, evaluando el flujo de caja neto ante volatilidades del precio del kilovatio-hora.`,
    toolMapping: "Herramienta: Simulador de Métodos Monte Carlo en `/tools#montecarlo` con generación de distribuciones Normal, Uniforme y Triangular."
  },
  {
    id: "ii713-m1",
    courseCode: "II713",
    courseTitle: "Procesos Estocásticos",
    moduleNumber: 1,
    moduleTitle: "Cadenas de Markov Discretas (DTMC)",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Tratamiento matemático riguroso de la matriz de transición estocástica, descomposición espectral de Perron-Frobenius, cálculo de matrices fundamentales para estados absorbentes y tiempos medios de absorción.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Teorema de Perron-Frobenius para Matrices Estocásticas:**
   Toda matriz estocástica $\mathbf{P} \\in \\mathbb{R}^{n \\times n}$ satisface:
   - El radio espectral es $\\rho(\mathbf{P}) = 1$.
   - $\\lambda = 1$ es siempre un autovalor de $\mathbf{P}$, con autovector derecho $\mathbf{e} = (1, 1, \\dots, 1)^T$.
   - El autovector izquierdo normalizado asociado a $\\lambda = 1$ es el **vector de estado estable** $\\boldsymbol{\\pi}$: $\\boldsymbol{\\pi} \mathbf{P} = \\boldsymbol{\\pi}$, con $\\sum \\pi_i = 1$.

2. **Cadenas Absorbentes y Matriz Fundamental:**
   Partición con $r$ estados absorbentes y $t$ estados transitorios:
   $$\mathbf{P} = \\begin{pmatrix} \mathbf{I}_{r \\times r} & \\mathbf{0} \\\\ \mathbf{R}_{t \\times r} & \mathbf{Q}_{t \\times t} \\end{pmatrix}$$
   - **Matriz Fundamental $\mathbf{N}$:**
     $$\mathbf{N} = \\sum_{k=0}^\\infty \mathbf{Q}^k = (\\mathbf{I} - \mathbf{Q})^{-1}$$
     El elemento $n_{ij}$ representa el número esperado de visitas al estado transitorio $j$ partiendo del estado $i$.
   - **Tiempo esperado hasta la absorción:** $\\mathbf{t} = \\mathbf{N} \\mathbf{e}$.
   - **Probabilidades de absorción:** $\\mathbf{B} = \\mathbf{N} \mathbf{R}$, donde $b_{ij}$ es la probabilidad de que la cadena sea absorbida en el estado absorbente $j$ habiendo iniciado en el transitorio $i$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Kemeny & Snell (1976)** — *Finite Markov Chains*: El texto clásico definitivo para cadenas absorbentes y regulares.
- **E. Seneta (2006)** — *Non-negative Matrices and Markov Chains*.
- **Toro Ocampo (UTP)**: Módulos avanzados de investigación de operaciones estocástica.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado del riesgo de crédito comercial de distribuidores mayoristas de alimentos (Al Día, Mora 30 días, Mora 60 días, Cartera Castigada / Pérdida): cálculo del tiempo medio hasta la recuperación o castigo y cálculo de reservas monetarias técnicas.`,
    toolMapping: "Herramienta: Analizador DTMC en `/tools#markov` y laboratorio Pyodide Wasm."
  },
  {
    id: "ii713-m2",
    courseCode: "II713",
    courseTitle: "Procesos Estocásticos",
    moduleNumber: 2,
    moduleTitle: "Procesos de Poisson y Cadenas de Tiempo Continuo (CTMC)",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Derivación infinitesimal de procesos de Poisson, formulación de ecuaciones diferenciales de Kolmogorov y solución mediante matriz generadora infinitesimal Q.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Axiomas Infinitesimales de Poisson y Derivación:**
   $$\\mathbb{P}(N(h) = 1) = \\lambda h + o(h), \\qquad \\mathbb{P}(N(h) \\ge 2) = o(h)$$
   Sistema diferencial prospectivo: $\\frac{d P_n(t)}{dt} = -\\lambda P_n(t) + \\lambda P_{n-1}(t)$.
   Solución única con $P_0(0)=1$:
   $$P_n(t) = \\frac{(\\lambda t)^n e^{-\\lambda t}}{n!}, \\quad n \\in \\mathbb{N}_0$$

2. **Matriz Generadora Infinitesimal $\mathbf{Q}$ en CTMC:**
   $$q_{ij} = \\lim_{h \\to 0^+} \\frac{P_{ij}(h) - \\delta_{ij}}{h}, \\qquad q_{ii} = -\\sum_{j \\ne i} q_{ij}$$
   - Ecuaciones de Kolmogorov:
     * Retrospectiva (Backward): $\\mathbf{P}'(t) = \mathbf{Q} \\mathbf{P}(t)$.
     * Prospectiva (Forward): $\\mathbf{P}'(t) = \\mathbf{P}(t) \mathbf{Q}$.
   - Solución matricial: $\\mathbf{P}(t) = e^{\mathbf{Q}t} = \\sum_{k=0}^\\infty \\frac{(\mathbf{Q}t)^k}{k!}$.

3. **Distribución Límite Estacionaria:**
   $$\\boldsymbol{\\pi} \mathbf{Q} = \\mathbf{0}, \\qquad \\sum_{j \\in S} \\pi_j = 1$$
   Ecuaciones de balance de flujo global: $\\pi_j \\sum_{k \\ne j} q_{jk} = \\sum_{k \\ne j} \\pi_k q_{kj}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Sheldon M. Ross** — *Stochastic Processes* (Wiley): Referencia canónica mundial de CTMC y procesos de Poisson.
- **Taylor & Karlin** — *An Introduction to Stochastic Modeling*.
- **Norris (1998)** — *Markov Chains* (Cambridge University Press).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado de confiabilidad y disponibilidad de compresores industriales de aire en líneas de ensamblaje continuo, resolviendo la matriz $\mathbf{Q}$ para predecir tasas de falla y tiempos de reparación concurrentes.`,
    toolMapping: "Herramienta: Demostrador interactivo de procesos estocásticos en `/tools`."
  },
  {
    id: "ii713-m3",
    courseCode: "II713",
    courseTitle: "Procesos Estocásticos",
    moduleNumber: 3,
    moduleTitle: "Teoría de Colas y Líneas de Espera Avanzada",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Análisis de sistemas de espera no markovianos ($M/G/1$), fórmula de Pollaczek-Khinchine, y análisis de redes de colas abiertas de Jackson.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo $M/G/1$ y Fórmula de Pollaczek-Khinchine (P-K):**
   Arribos Poisson ($\lambda$) y tiempos de servicio generales con media $1/\mu$ y varianza $\sigma_S^2$. Coeficiente de variación al cuadrado $C_s^2 = \sigma_S^2 / (1/\mu)^2 = \sigma_S^2 \mu^2$:
   - Longitud media de la cola (Fórmula P-K de la media):
     $$L_q = \\frac{\\lambda^2 \\sigma_S^2 + \\rho^2}{2(1 - \\rho)} = \\frac{\\rho^2}{2(1 - \\rho)} (1 + C_s^2)$$
   - Tiempo medio en cola: $W_q = \\frac{L_q}{\\lambda} = \\frac{\\lambda (\\sigma_S^2 + 1/\\mu^2)}{2(1 - \\rho)}$.
   *(Implicación de ingeniería industrial: Si el servicio es perfectamente determinístico ($M/D/1, \\sigma_S^2 = 0$), $L_q$ se reduce a la mitad exacta de una cola $M/M/1$).*

2. **Redes de Colas Abiertas de Jackson (1957):**
   Red de $M$ estaciones de servicio independientes donde los clientes transitan según una matriz de enrutamiento $r_{ij}$:
   - Ecuaciones de tráfico de Jackson:
     $$\\lambda_j = \\gamma_j + \\sum_{i=1}^M \\lambda_i r_{ij}, \\quad j = 1, \\dots, M$$
   - **Teorema de Jackson:** En estado estable, la red se comporta como si cada nodo fuera una cola $M/M/c_j$ independiente alimentada por un proceso de Poisson con tasa $\\lambda_j$. La distribución conjunta es producto tensorial:
     $$P(n_1, n_2, \\dots, n_M) = \\prod_{j=1}^M P_j(n_j)$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Felix Pollaczek (1930)** & **Aleksandr Khinchine (1932)**: Deducción de la fórmula P-K para colas generales.
- **James R. Jackson (1957)** — *Networks of Waiting Lines* (Operations Research).
- **Leonard Kleinrock (1975)** — *Queueing Systems, Volume 1: Theory*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado de una celda de manufactura metalmecánica multietapa (Corte $\\to$ Torneado $\\to$ Fresado $\\to$ Inspección) mediante redes de Jackson para balancear capacidades de máquina y erradicar cuellos de botella.`,
    toolMapping: "Herramienta: Calculadora de Teoría de Colas en `/tools#queueing`."
  },
  {
    id: "ii713-m4",
    courseCode: "II713",
    courseTitle: "Procesos Estocásticos",
    moduleNumber: 4,
    moduleTitle: "Confiabilidad de Sistemas Industriales",
    coordination: "Dra. Eliana Mirledy Toro Ocampo",
    competencies: "Modelado matemático de funciones de supervivencia, tasas de falla instantánea (hazard rate), confiabilidad de arquitecturas complejas (serie, paralelo, k-de-n) y cálculo del MTBF.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Funciones Clave de Confiabilidad:**
   - Supervivencia: $R(t) = \\mathbb{P}(T > t) = 1 - F(t)$.
   - Densidad: $f(t) = -R'(t)$.
   - Tasa de fallo instantánea (Hazard Rate):
     $$\\lambda(t) = \\frac{f(t)}{R(t)} = -\\frac{d}{dt}[\\ln R(t)]$$
   - Identidad integral:
     $$R(t) = \\exp\\left( -\\int_0^t \\lambda(u) du \\right)$$
   - Tiempo Medio Hasta el Fallo (MTTF):
     $$\\text{MTTF} = \\int_0^\\infty R(t) dt$$

2. **Topologías de Sistemas:**
   - **Sistema Serie (n componentes independientes):**
     $$R_s(t) = \\prod_{i=1}^n R_i(t), \\qquad \\lambda_s(t) = \\sum_{i=1}^n \\lambda_i(t)$$
   - **Sistema Paralelo (Redundancia activa total):**
     $$R_p(t) = 1 - \\prod_{i=1}^n (1 - R_i(t))$$
   - **Sistema $k$-de-$n$ ($k$-out-of-$n:G$) con componentes i.i.d.:**
     $$R_{k/n}(t) = \\sum_{j=k}^n \\binom{n}{j} [R(t)]^j [1 - R(t)]^{n-j}$$
     *Caso 2-de-3 (Triple Modular Redundancy - TMR):* $R_{2/3}(t) = 3 R(t)^2 - 2 R(t)^3$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **William Q. Meeker & Luis A. Escobar (1998)** — *Statistical Methods for Reliability Data* (Wiley).
- **Richard E. Barlow & Frank Proschan (1975)** — *Statistical Theory of Reliability and Life Testing*.
- **Norma IEC 61508 / ISA-84**: Seguridad funcional de sistemas instrumentados en la industria de procesos.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Diseño de la arquitectura de instrumentación y válvulas de alivio para calderas pirotubulares en ingenios azucareros, garantizando nivel de integridad de seguridad SIL-3 mediante redundancia 2-de-3 (TMR).`,
    toolMapping: "Herramienta: Módulo de Confiabilidad y Confiabilidad $k$-de-$n$ en `/tools`."
  },
  {
    id: "ii863-m1",
    courseCode: "II863",
    courseTitle: "Simulación de Sistemas",
    moduleNumber: 1,
    moduleTitle: "Simulación de Eventos Discretos y Mecanismo de Reloj",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño algorítmico del motor de simulación de eventos discretos, gestión del reloj de avance al evento próximo y arquitectura de la Lista de Eventos Futuros (FEL).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Paradigmas de Avance del Tiempo en Simulación:**
   - **Avance por Intervalo Fijo (Time-Step):** $t_{k+1} = t_k + \\Delta t$. Ineficiente cuando no ocurren eventos en muchos intervalos.
   - **Avance al Evento Próximo (Next-Event Time Advance):**
     $$t_{\\text{reloj}} \\leftarrow \\min \\{ t_e : e \\in \\text{FEL} \\}$$
     El reloj salta instantáneamente al momento del próximo evento programado, maximizando la velocidad computacional.

2. **Estructura Formal de la Lista de Eventos Futuros (FEL):**
   La FEL es una cola de prioridad ordenada crecientemente por tiempo de ocurrencia $t_e$:
   $$\\text{FEL} = \\{ (t_1, E_1), (t_2, E_2), \\dots, (t_k, E_k) \\}, \\quad t_1 \\le t_2 \\le \\dots \\le t_k$$
   - Complejidad de inserción: $O(\\log k)$ mediante montículo binario (Binary Heap).

3. **Variables de Estado y Acumuladores Estadísticos de Área:**
   - Promedio ponderado en el tiempo de entidades en el sistema:
     $$\\bar{L} = \\frac{1}{T_{\\text{sim}}} \\int_0^{T_{\\text{sim}}} L(t) dt = \\frac{1}{T_{\\text{sim}}} \\sum_{k=1}^M L(t_{k-1}) (t_k - t_{k-1})$$
   - Utilización del servidor:
     $$\\bar{B} = \\frac{1}{T_{\\text{sim}}} \\int_0^{T_{\\text{sim}}} B(t) dt, \\quad B(t) \\in \\{0, 1\\}$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Averill M. Law (2015)** — *Simulation Modeling and Analysis*: Capítulos 1 y 2 sobre el mecanismo de reloj y la FEL.
- **Banks, Carson, Nelson & Nicol (2010)** — *Discrete-Event System Simulation*.
- **Soto Mejía (UTP)**: Notas de laboratorio de simulación en ProModel y Simio.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Simulación computacional de la sala de urgencias de un hospital de tercer nivel en Pereira: modelado de la llegada de pacientes con diferentes niveles de triage mediante avance de eventos discretos.`,
    toolMapping: "Herramienta: Motor de Simulación Discreta en `/tools` y visualizador de estado del sistema."
  },
  {
    id: "ii863-m2",
    courseCode: "II863",
    courseTitle: "Simulación de Sistemas",
    moduleNumber: 2,
    moduleTitle: "Generación y Pruebas de Números Pseudoaleatorios",
    coordination: "Dr. José Soto Mejía",
    competencies: "Implementación matemática de Generadores Congruenciales Lineales (LCG), evaluación de período máximo y validación estadística de uniformidad e independencia.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Generadores Congruenciales Lineales (Lehmer, 1951):**
   $$X_{n+1} = (a X_n + c) \\pmod m, \\qquad R_n = \\frac{X_n}{m} \\in [0, 1)$$
   donde $m > 0$ es el módulo, $a$ el multiplicador, $c$ el incremento y $X_0$ la semilla.
   - **Teorema de Hull-Dobell (1962) para Período Completo ($m$):**
     El LCG tiene período máximo igual a $m$ si y solo si:
     1. $c$ y $m$ son primos relativos ($\gcd(c, m) = 1$).
     2. Todo factor primo de $m$ divide a $a - 1$ ($p \\mid m \\implies p \\mid (a - 1)$).
     3. Si $4$ divide a $m$, entonces $4$ divide a $a - 1$ ($4 \\mid m \\implies 4 \\mid (a - 1)$).

2. **Batería de Pruebas Estadísticas para Pseudoaleatorios:**
   - **Prueba de Uniformidad ($\chi^2$ y K-S):** Verifica $R_i \\sim U(0, 1)$.
   - **Prueba de Rachas (Runs Test) Arriba y Abajo de la Media:** Verifica la independencia estocástica analizando secuencias de signos $+$ y $-$.
     $$\\mu_R = \\frac{2n - 1}{3}, \\qquad \\sigma_R^2 = \\frac{16n - 29}{90}, \\qquad Z_0 = \\frac{R - \\mu_R}{\\sigma_R} \\sim \\mathcal{N}(0, 1)$$
   - **Prueba de Autocorrelación:** Evalúa si existe dependencia serial rezagada $k$:
     $$\\hat{\\rho}_k = \\frac{1}{M + 1} \\sum_{k=0}^M R_{i + k m} R_{i + (k+1)m} - 0.25$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Donald E. Knuth (1997)** — *The Art of Computer Programming, Vol. 2: Seminumerical Algorithms*: La referencia matemática definitiva de generadores y pruebas.
- **Matsumoto & Nishimura (1998)** — *Mersenne Twister: A 623-Dimensionally Equidistributed Uniform Pseudo-Random Number Generator* (período $2^{19937}-1$).
- **L'Ecuyer (1999)** — *Good Parameter Sets for Combined Multiple Recursive Random Number Generators*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Validación de la semilla y algoritmos de generación estocástica utilizados en las terminales del Laboratorio GEIO para garantizar que los modelos de simulación no introduzcan patrones espurios o sesgos cíclicos.`,
    toolMapping: "Herramienta: Generador y Batería de Pruebas Pseudoaleatorias en `/tools`."
  },
  {
    id: "ii863-m3",
    courseCode: "II863",
    courseTitle: "Simulación de Sistemas",
    moduleNumber: 3,
    moduleTitle: "Generación de Variables Aleatorias y Monte Carlo",
    coordination: "Dr. José Soto Mejía",
    competencies: "Transformación de números $U(0,1)$ en distribuciones teóricas arbitrarias mediante el método de la Transformada Inversa, Aceptación-Rechazo y transformación de Box-Muller.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Método de la Transformada Inversa:**
   Sea $X$ una variable aleatoria continua con CDF estrictamente creciente $F(x)$. Si $U \\sim U(0, 1)$, entonces la variable aleatoria $X = F^{-1}(U)$ tiene exactamente la distribución $F(x)$.
   - **Demostración:**
     $$\\mathbb{P}(X \\le x) = \\mathbb{P}(F^{-1}(U) \\le x) = \\mathbb{P}(U \\le F(x)) = F(x)$$
   - Ejemplos analíticos:
     * Exponencial: $X = -\\frac{1}{\\lambda} \\ln(1 - U) \\equiv -\\frac{1}{\\lambda} \\ln(U)$.
     * Weibull: $X = \\eta [-\\ln(1 - U)]^{1/\\beta}$.
     * Triangular: Inversa por tramos.

2. **Método de Aceptación y Rechazo (Von Neumann, 1951):**
   Para muestrear de $f(x)$ cuando $F^{-1}$ no tiene forma cerrada, se utiliza una función de soporte $g(x)$ fácil de muestrear y una constante $c \\ge 1$ tal que $f(x) \\le c \\cdot g(x), \\forall x$:
   1. Generar $Y \\sim g(y)$ y $U \\sim U(0, 1)$.
   2. Si $U \\le \\frac{f(Y)}{c \\cdot g(Y)}$, aceptar $X = Y$.
   3. Si no, rechazar y volver al paso 1.
   - Eficiencia del algoritmo: La probabilidad de aceptación es $\\frac{1}{c}$.

3. **Transformación de Box-Muller (1958) para la Normal:**
   Genera dos normales estándar independientes $Z_1, Z_2 \\sim \\mathcal{N}(0, 1)$ a partir de $U_1, U_2 \\sim U(0, 1)$:
   $$Z_1 = \\sqrt{-2 \\ln U_1} \\cos(2\\pi U_2), \\qquad Z_2 = \\sqrt{-2 \\ln U_1} \\sin(2\\pi U_2)$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Luc Devroye (1986)** — *Non-Uniform Random Variate Generation* (Springer): Obra maestra de generación de distribuciones.
- **George Marsaglia (1964)** — *Generating a Variable from the Tail of the Normal Distribution*.
- **Box & Muller (1958)** — *A Note on the Generation of Random Normal Deviates*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Generación estocástica de tiempos de atención y reparación en modelos ProModel/Simio para evaluar políticas de mantenimiento predictivo en plantas embotelladoras.`,
    toolMapping: "Herramienta: Simulador Monte Carlo en `/tools#montecarlo`."
  },
  {
    id: "ii863-m4",
    courseCode: "II863",
    courseTitle: "Simulación de Sistemas",
    moduleNumber: 4,
    moduleTitle: "Análisis de Salida, Transitorio y Validación",
    coordination: "Dr. José Soto Mejía",
    competencies: "Detección del estado transitorio (Warm-up Period), método de medias de Welch, diseño de corridas independientes y cálculo de intervalos de confianza por replicación.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **El Problema del Sesgo Inicial (Transitorio):**
   Las simulaciones típicamente inician con el sistema vacío e inactivo ($L(0) = 0$), lo cual sesga a la baja la estimación del estado estable a largo plazo.
   - **Procedimiento de Welch (1983):**
     Promediar a través de $R$ réplicas independientes la serie de tiempo observada $Y_{ri}$:
     $$\\bar{Y}_i = \\frac{1}{R} \\sum_{r=1}^R Y_{ri}, \\quad i = 1, \\dots, m$$
     Calcular una media móvil suavizada de ancho $w$:
     $$\\bar{Y}_i(w) = \\frac{1}{2w + 1} \\sum_{s=-w}^w \\bar{Y}_{i+s}$$
     El período de precalentamiento (Warm-up $d$) se fija visualmente donde la curva se aplana horizontalmente. Todos los datos para $i \\le d$ se **descartan**.

2. **Método de Réplicas Independientes:**
   Se ejecutan $R$ corridas independientes, cada una con semillas aleatorias no correlacionadas y duración $T$. Sea $\\bar{X}_r$ la media muestral de la réplica $r$:
   $$\\bar{X} = \\frac{1}{R} \\sum_{r=1}^R \\bar{X}_r, \\qquad S^2 = \\frac{1}{R-1} \\sum_{r=1}^R (\\bar{X}_r - \\bar{X})^2$$
   Intervalo de confianza del $(1-\\alpha)\\%$:
   $$\\bar{X} \\pm t_{\\alpha/2, R-1} \\frac{S}{\\sqrt{R}}$$

3. **Determinación del Número Óptimo de Réplicas ($R^*$):**
   Para garantizar un semiancho de error máximo $\\epsilon$:
   $$R^* \\ge \\left( \\frac{t_{\\alpha/2, R-1} \\cdot S}{\\epsilon} \\right)^2$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Peter D. Welch (1983)** — *The Statistical Analysis of Simulation Results*.
- **Law & Kelton (2000)**: Capítulo 9 sobre análisis estadístico de datos de salida de simulación.
- **Kleijnen (1998)** — *Validation of Trace-Driven Simulation Models: A Novel Perspective*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Determinación del tiempo de calentamiento de 2 horas y cálculo de 30 réplicas independientes para validar un nuevo diseño de layout de producción en confecciones deportivas de Dosquebradas.`,
    toolMapping: "Herramienta: Módulo de Validación de Simulación y Réplicas en `/tools`."
  },
  {
    id: "io143-m1",
    courseCode: "IO143",
    courseTitle: "Simulación de Dinámica de Sistemas",
    moduleNumber: 1,
    moduleTitle: "Pensamiento Sistémico y Diagramas de Ciclo Causal",
    coordination: "Dr. José Soto Mejía",
    competencies: "Modelado cualitativo de la estructura de retroalimentación de sistemas complejos sociotécnicos mediante Diagramas de Ciclo Causal (CLD), análisis de polaridades y arquetipos sistémicos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de la Dinámica de Sistemas (Forrester, 1961):**
   La conducta en el tiempo de un sistema surge de su **estructura interna de retroalimentación**, caracterizada por bucles cerrados de causalidad, acumulaciones y retrasos temporales.

2. **Polaridad Causal y Reglas de Signos en CLDs:**
   - **Enlace Causal Positivo ($X \\xrightarrow{+} Y$):** $\\frac{\\partial Y}{\\partial X} > 0$. Un incremento en $X$ causa un incremento en $Y$ por encima de lo que habría sido (ceteris paribus).
   - **Enlace Causal Negativo ($X \\xrightarrow{-} Y$):** $\\frac{\\partial Y}{\\partial X} < 0$. Un incremento en $X$ causa una reducción en $Y$ respecto a su trayectoria base.
   - **Regla de Polaridad del Bucle:**
     Sea un bucle cerrado de retroalimentación con $k$ enlaces con signos $s_i \\in \\{+1, -1\\}$:
     $$\\text{Signo del Bucle} = \\prod_{i=1}^k s_i$$
     * Si el producto es $+1$: **Bucle de Refuerzo (R)** $\\implies$ Genera comportamiento autoamplificador exponencial (crecimiento o colapso acelerado).
     * Si el producto es $-1$: **Bucle de Balance (B)** $\\implies$ Genera búsqueda de metas, estabilidad o comportamiento oscilatorio.

3. **Arquetipos Sistémicos Clásicos (Peter Senge, 1990):**
   - **Límites del Crecimiento:** Bucle de refuerzo inicial restringido por un bucle de balance con capacidad portante.
   - **Desplazamiento de la Carga (Shifting the Burden):** Solución sintomática a corto plazo que atrofia la capacidad de solución fundamental.
   - **Tragedia del Terreno Común (Tragedy of the Commons):** Sobreexplotación de un recurso compartido no regulado.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Jay W. Forrester (1961)** — *Industrial Dynamics* (MIT Press): Obra fundacional.
- **John D. Sterman (2000)** — *Business Dynamics: Systems Thinking and Modeling for a Complex World* (McGraw-Hill): La biblia de la dinámica de sistemas moderna.
- **Peter Senge (1990)** — *The Fifth Discipline: The Art and Practice of the Learning Organization*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Mapeo sistémico de la cadena de suministro cafetera colombiana: análisis del ciclo de precios internacionales, incentivos de siembra, desfases biológicos de cosecha y colapso de inventarios de reserva.`,
    toolMapping: "Herramienta: Visualizador conceptual de Bucles Causales en `/tools`."
  },
  {
    id: "io143-m2",
    courseCode: "IO143",
    courseTitle: "Simulación de Dinámica de Sistemas",
    moduleNumber: 2,
    moduleTitle: "Modelado de Niveles, Flujos y Retrasos de Información",
    coordination: "Dr. José Soto Mejía",
    competencies: "Formulación de ecuaciones diferenciales de Stocks y Flujos, métodos de integración numérica (Euler, Runge-Kutta 4) y formalización analítica de retrasos de información y materiales.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Ecuación Fundamental de Stocks (Niveles) y Flujos:**
   Un nivel $S(t)$ acumula la diferencia neta entre sus tasas de flujo de entrada $I(t)$ y de salida $O(t)$:
   $$S(t) = S(t_0) + \\int_{t_0}^t [I(\\tau) - O(\\tau)] d\\tau \\iff \\frac{d S(t)}{dt} = I(t) - O(t)$$

2. **Integración Numérica:**
   - **Método de Euler:** $S(t + \\Delta t) = S(t) + \\Delta t \\cdot [I(t) - O(t)]$. Requiere $\\Delta t < \\frac{1}{2} \\tau_{\\min}$ para evitar inestabilidad numérica.
   - **Método de Runge-Kutta de 4to Orden (RK4):** Error local $O(\\Delta t^5)$ y global $O(\\Delta t^4)$.

3. **Formalización Matemática de Retrasos (Delays):**
   - **Retraso de Material de Primer Orden:**
     $$\\frac{d O(t)}{dt} = \\frac{I(t) - O(t)}{D} \\implies O(t) = \\frac{1}{D} \\int_0^t I(\\tau) e^{-(t-\\tau)/D} d\\tau$$
     donde $D$ es el retraso promedio.
   - **Retrasos de Orden Superior (Erlang):**
     Cascada de $n$ retrasos idénticos de primer orden de constante $D/n$:
     $$\\frac{d R_k(t)}{dt} = \\frac{n}{D} [R_{k-1}(t) - R_k(t)], \\quad k = 1, \\dots, n$$
     La distribución de tiempos de tránsito converge a una distribución Gamma/Erlang con media $D$ y varianza $\\sigma^2 = D^2/n$. Cuando $n \\to \\infty$, converge a un retraso de tubería puro (Pipeline Delay) $O(t) = I(t - D)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Sterman (2000)**: Capítulos 11 y 12 sobre modelado de stocks, flujos y cadenas de retrasos Erlang.
- **Forrester (1968)** — *Principles of Systems*.
- **Barlas (1996)** — *Formal aspects of model validity and validation in system dynamics*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Simulación del Efecto Látigo (Bullwhip Effect) en la distribución de bebidas en Risaralda: demostración cuantitativa de cómo los retrasos de producción e información de pedidos amplifican las oscilaciones de inventario aguas arriba.`,
    toolMapping: "Herramienta: Simulador dinámico de stocks y flujos en `/tools`."
  }
];
