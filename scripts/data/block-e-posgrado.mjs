export const blockEPosgrado = [
  {
    id: "cb213-m1",
    courseCode: "CB213",
    courseTitle: "Métodos Cuantitativos y Álgebra Matricial",
    moduleNumber: 1,
    moduleTitle: "Álgebra Lineal Matricial y Sistemas de Ecuaciones",
    coordination: "Área de Ciencias Básicas y Matemáticas",
    competencies: "Dominio de espacios vectoriales, subespacios fundamentales de una matriz (espacio nulo, rango), eliminación gaussiana y factorización LU.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Los Cuatro Subespacios Fundamentales (Strang, 1993):**
   Dada una matriz $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ con rango $\\text{rank}(\\mathbf{A}) = r$:
   - **Espacio Columna $\\mathcal{C}(\\mathbf{A}) \\subseteq \\mathbb{R}^m$:** Dimensión $r$.
   - **Espacio Fila $\\mathcal{C}(\\mathbf{A}^T) \\subseteq \\mathbb{R}^n$:** Dimensión $r$.
   - **Espacio Nulo o Kernel $\\mathcal{N}(\\mathbf{A}) \\subseteq \\mathbb{R}^n$:** Dimensión $n - r$ (Teorema de Rango-Nulidad).
   - **Espacio Nulo Izquierdo $\\mathcal{N}(\\mathbf{A}^T) \\subseteq \\mathbb{R}^m$:** Dimensión $m - r$.
   *Ortogonalidad Fundamental:* $\\mathcal{C}(\\mathbf{A}^T) \\perp \\mathcal{N}(\\mathbf{A})$ y $\\mathcal{C}(\\mathbf{A}) \\perp \\mathcal{N}(\\mathbf{A}^T)$.

2. **Factorización LU con Pivoteo Parcial:**
   $$\\mathbf{P} \\mathbf{A} = \\mathbf{L} \\mathbf{U}$$
   donde $\\mathbf{P}$ es una matriz de permutación, $\\mathbf{L}$ triangular inferior unitaria y $\\mathbf{U}$ triangular superior.
   - Solución del sistema $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ en dos pasos de sustitución directa y regresiva: $\\mathbf{L}\\mathbf{y} = \\mathbf{P}\\mathbf{b}$, luego $\\mathbf{U}\\mathbf{x} = \\mathbf{y}$ en tiempo $O(n^2)$ tras la factorización inicial $O(n^3)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Gilbert Strang (2016)** — *Introduction to Linear Algebra* (Wellesley-Cambridge Press): El marco de los 4 subespacios fundamentales.
- **Golub & Van Loan (2013)** — *Matrix Computations* (Johns Hopkins University Press): La biblia del álgebra lineal numérica.
- **Horn & Johnson (2012)** — *Matrix Analysis*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Resolución de sistemas de balance de materia y energía en plantas de destilación de alcohol carburante, asegurando estabilidad numérica frente al mal condicionamiento de matrices.`,
    toolMapping: "Herramienta: Módulo matricial y operaciones de álgebra lineal en `/tools`."
  },
  {
    id: "cb213-m2",
    courseCode: "CB213",
    courseTitle: "Métodos Cuantitativos y Álgebra Matricial",
    moduleNumber: 2,
    moduleTitle: "Autovalores, Formas Cuadráticas y Optimización",
    coordination: "Área de Ciencias Básicas y Matemáticas",
    competencies: "Cálculo analítico de autovalores y autovectores, diagonalización espectral de matrices simétricas, clasificación de formas cuadráticas y análisis del Hessiano.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Problema de Autovalores y Teorema Espectral:**
   $$\\mathbf{A} \\mathbf{v} = \\lambda \\mathbf{v}, \\quad \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0$$
   - **Teorema Espectral para Matrices Simétricas Reales:** Si $\\mathbf{A} = \\mathbf{A}^T \\in \\mathbb{R}^{n \\times n}$:
     * Todos sus autovalores $\\lambda_1, \\dots, \\lambda_n$ son números reales.
     * Existe una base ortonormal de autovectores $\\mathbf{Q} = [\\mathbf{q}_1 \\dots \\mathbf{q}_n]$ con $\\mathbf{Q}^T \\mathbf{Q} = \\mathbf{I}$.
     * Descomposición espectral: $\\mathbf{A} = \\mathbf{Q} \\boldsymbol{\\Lambda} \\mathbf{Q}^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$.

2. **Formas Cuadráticas y Clasificación:**
   $$q(\\mathbf{x}) = \\mathbf{x}^T \\mathbf{A} \\mathbf{x} = \\sum_{i=1}^n \\sum_{j=1}^n a_{ij} x_i x_j$$
   - **Definida Positiva ($\\mathbf{A} \\succ 0$):** $q(\\mathbf{x}) > 0, \\forall \\mathbf{x} \\ne \\mathbf{0} \\iff \\lambda_i > 0, \\forall i \\iff$ Todos los menores principales dominantes $\\Delta_k > 0$ (Criterio de Sylvester).
   - **Semidefinida Positiva ($\\mathbf{A} \\succeq 0$):** $\\lambda_i \\ge 0, \\forall i$.
   - **Indefinida:** Existen autovalores con signos opuestos $\\implies$ Punto de silla (Saddle Point).

3. **Descomposición en Valores Singulares (SVD):**
   Para cualquier matriz rectangular $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$:
   $$\\mathbf{A} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T = \\sum_{i=1}^r \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$$
   donde $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$ son los valores singulares. Teorema de Eckart-Young-Mirsky: mejor aproximación de rango bajo en norma de Frobenius.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Strang (2016)**: Capítulo 6 y 7 sobre Teorema Espectral y SVD.
- **Eckart & Young (1936)** — *The Approximation of One Matrix by Another of Lower Rank*.
- **Sylvester (1852)**: Criterio de menores principales para formas cuadráticas.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Compresión de imágenes térmicas para detección de fallas en transformadores de subestaciones eléctricas mediante truncamiento de valores singulares (SVD).`,
    toolMapping: "Herramienta: Laboratorio Pyodide Wasm con NumPy (`np.linalg.eig`, `np.linalg.svd`)."
  },
  {
    id: "iod10-m1",
    courseCode: "IOD10",
    courseTitle: "Computación Científica y Álgebra Matricial: MATLAB y Python",
    moduleNumber: 1,
    moduleTitle: "Álgebra Matricial y Computación Numérica Vectorizada",
    coordination: "Prof. Oscar Gómez Carmona",
    competencies: "Programación científica de alto rendimiento basada en vectorización, eliminación de bucles escalares y álgebra lineal numérica en MATLAB y Python/NumPy.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Vectorización y Localidad Espacial:**
   Reemplazo de bucles escalares $O(n)$ por instrucciones SIMD (Single Instruction, Multiple Data) y librerías BLAS (Basic Linear Algebra Subprograms) y LAPACK optimizadas en C/Fortran:
   - Nivel 1 BLAS: Operaciones vector-vector ($y = \\alpha x + y$) $\\implies O(n)$.
   - Nivel 2 BLAS: Operaciones matriz-vector ($y = \\alpha A x + \\beta y$) $\\implies O(n^2)$.
   - Nivel 3 BLAS: Operaciones matriz-matriz ($C = \\alpha A B + \\beta C$) $\\implies O(n^3)$ con paralelismo caché-bloque.

2. **Resolución de Sistemas Lineales y Condicionamiento:**
   $$\\mathbf{A} \\mathbf{x} = \\mathbf{b}$$
   - Número de condición en norma espectral:
     $$\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\cdot \\|\\mathbf{A}^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}$$
   - Cota de propagación del error relativo en los datos $\\frac{\\|\\delta \\mathbf{x}\\|}{\\|\\mathbf{x}\\|} \\le \\kappa(\\mathbf{A}) \\frac{\\|\\delta \\mathbf{b}\\|}{\\|\\mathbf{b}\\|}$.
   - Uso del operador backslash de MATLAB/SciPy (\`np.linalg.solve\`): Detección automática de estructura (simétrica definida positiva $\\implies$ Cholesky; triangular $\\implies$ sustitución; general $\\implies$ LU con pivoteo parcial).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Cleve Moler (2004)** — *Numerical Computing with MATLAB* (SIAM): Por el creador original de MATLAB.
- **Travis Oliphant (2006)** — *Guide to NumPy*: Creación del motor de ndarrays de Python.
- **Gómez Carmona (UTP)**: Cuadernos de cómputo matricial aplicado a la ingeniería.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Aceleración de 50x en el cálculo del flujo de potencia eléctrica de Risaralda transformando código iterativo en operaciones vectorizadas matriciales en Python-NumPy.`,
    toolMapping: "Herramienta: Entorno Python WebAssembly `<PyodideRunner />` en navegador."
  },
  {
    id: "iod10-m2",
    courseCode: "IOD10",
    courseTitle: "Computación Científica y Álgebra Matricial: MATLAB y Python",
    moduleNumber: 2,
    moduleTitle: "Estructuras de Datos, Visualización y Algoritmos",
    coordination: "Prof. Oscar Gómez Carmona",
    competencies: "Manipulación estructurada de DataFrames, visualización científica avanzada de funciones multivariadas (superficies 3D, curvas de nivel) e implementación de algoritmos numéricos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Manipulación de Datos y Álgebra Relacional en Memoria:**
   - Transformaciones split-apply-combine en DataFrames (Pandas): Filtrado booleano, agrupaciones y agregaciones estadísticas matriciales.
   - Manejo de series de tiempo con índices temporales y remuestreo de frecuencias.

2. **Generación de Mallas y Superficies Tridimensionales:**
   - Creación de producto cartesiano en el plano $xy$:
     $$\\mathbf{X}, \\mathbf{Y} = \\text{meshgrid}(\\mathbf{x}, \\mathbf{y})$$
   - Evaluación tensorial $Z_{ij} = f(X_{ij}, Y_{ij})$.
   - Proyección de curvas de nivel (Contour plots) ortogonales al vector gradiente $\\nabla f(x, y)$.

3. **Algoritmos Numéricos de Búsqueda de Raíces y Cuadraturas:**
   - Bisección y Newton-Raphson: $x_{k+1} = x_k - \\frac{f(x_k)}{f'(x_k)}$.
   - Cuadratura Gauss-Legendre: $\\int_{-1}^1 f(x) dx \\approx \\sum_{i=1}^n w_i f(x_i)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Wes McKinney (2017)** — *Python for Data Analysis* (O'Reilly): Por el creador de Pandas.
- **John D. Hunter (2007)** — *Matplotlib: A 2D Graphics Environment*.
- **Press, Teukolsky, Vetterling & Flannery (2007)** — *Numerical Recipes*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Visualización 3D y análisis de contorno de funciones de respuesta de rendimiento de extracción de aceite esencial de cardamomo en laboratorios de agroindustria de la UTP.`,
    toolMapping: "Herramienta: Gráficos dinámicos SVG interactivos y Pyodide Wasm."
  },
  {
    id: "io123-m1",
    courseCode: "IO123",
    courseTitle: "Análisis Multivariado",
    moduleNumber: 1,
    moduleTitle: "Distribución Normal Multivariada y Test T² de Hotelling",
    coordination: "Mg. Jairo Alfonso Clavijo Méndez",
    competencies: "Inferencia estadística para vectores aleatorios multidimensionales, cálculo de la distancia estadística de Mahalanobis, y aplicación del test T² de Hotelling y MANOVA.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Densidad Normal Multivariada $\\mathcal{N}_p(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$:**
   Vector $\\mathbf{X} = (X_1, \\dots, X_p)^T \\in \\mathbb{R}^p$ con vector de medias $\\boldsymbol{\\mu}$ y matriz de covarianzas simétrica definida positiva $\\boldsymbol{\\Sigma}$:
   $$f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left( -\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\right)$$
   - **Distancia de Mahalanobis:** $D^2 = (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\sim \\chi^2_p$. Define elipsoides de densidad constante en $\\mathbb{R}^p$.

2. **Estadístico $T^2$ de Hotelling (1931) para Una Muestra:**
   Contraste $H_0: \\boldsymbol{\\mu} = \\boldsymbol{\\mu}_0$ vs $H_1: \\boldsymbol{\\mu} \\ne \\boldsymbol{\\mu}_0$:
   $$T^2 = n (\\bar{\\mathbf{x}} - \\boldsymbol{\\mu}_0)^T \\mathbf{S}^{-1} (\\bar{\\mathbf{x}} - \\boldsymbol{\\mu}_0)$$
   donde $\\mathbf{S} = \\frac{1}{n-1} \\sum_{i=1}^n (\\mathbf{x}_i - \\bar{\\mathbf{x}})(\\mathbf{x}_i - \\bar{\\mathbf{x}})^T$.
   - Relación exacta con la distribución $F$:
     $$\\frac{n - p}{p (n - 1)} T^2 \\sim F_{p, n-p}$$
     Se rechaza $H_0$ si $T^2 > \\frac{p(n-1)}{n-p} F_{\\alpha, p, n-p}$.

3. **Análisis de Varianza Multivariado (MANOVA):**
   Evalúa diferencias en vectores de medias entre $k$ grupos experimentales.
   - Partición matricial: $\\mathbf{T} = \\mathbf{B} + \\mathbf{W}$ (Matriz Total = Matriz Entre Tratamientos + Matriz Dentro / Residual).
   - **Lambda de Wilks:**
     $$\\Lambda^* = \\frac{|\\mathbf{W}|}{|\\mathbf{B} + \\mathbf{W}|} = \\prod_{i=1}^s \\frac{1}{1 + \\lambda_i}$$
     donde $\\lambda_i$ son los autovalores de $\\mathbf{W}^{-1} \\mathbf{B}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Richard A. Johnson & Dean W. Wichern (2007)** — *Applied Multivariate Statistical Analysis* (Pearson): El texto de referencia supremo.
- **Harold Hotelling (1931)** — *The Generalization of Student's Ratio*.
- **T. W. Anderson (2003)** — *An Introduction to Multivariate Statistical Analysis*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Control de calidad multivariado simultáneo sobre 4 variables de tensión, elongación, espesor y brillo en películas de polipropileno biorientado (BOPP) en Dosquebradas mediante elipsoides de confianza $T^2$.`,
    toolMapping: "Herramienta: Módulo Multivariado en `/tools` y laboratorio Pyodide Wasm."
  },
  {
    id: "io123-m2",
    courseCode: "IO123",
    courseTitle: "Análisis Multivariado",
    moduleNumber: 2,
    moduleTitle: "Reducción de Dimensionalidad (PCA) y Clasificación",
    coordination: "Mg. Jairo Alfonso Clavijo Méndez",
    competencies: "Extracción y rotación de componentes principales no correlacionadas mediante descomposición espectral, y formulación de la regla de discriminación lineal de Fisher.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Análisis de Componentes Principales (PCA - Pearson, 1901; Hotelling, 1933):**
   Transformación ortogonal del vector $\\mathbf{X} \\in \\mathbb{R}^p$ en variables no correlacionadas $Y_1, \\dots, Y_p$:
   $$Y_j = \\mathbf{a}_j^T \\mathbf{X} = a_{j1} X_1 + \\dots + a_{jp} X_p, \\quad \\|\\mathbf{a}_j\\|_2 = 1$$
   - Maximización de varianza:
     $$\\max_{\\|\\mathbf{a}_1\\|=1} \\text{Var}(Y_1) = \\max \\mathbf{a}_1^T \\boldsymbol{\\Sigma} \\mathbf{a}_1 \\implies \\boldsymbol{\\Sigma} \\mathbf{a}_1 = \\lambda_1 \\mathbf{a}_1$$
     Los vectores de pesos $\\mathbf{a}_j$ son los autovectores normalizados de $\\boldsymbol{\\Sigma}$ y $\\text{Var}(Y_j) = \\lambda_j$, con $\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_p \\ge 0$.
   - **Proporción de Varianza Explicada:**
     $$PVE_k = \\frac{\\sum_{j=1}^k \\lambda_j}{\\sum_{j=1}^p \\lambda_j} = \\frac{\\sum_{j=1}^k \\lambda_j}{\\text{traza}(\\boldsymbol{\\Sigma})}$$
   - Regla de Kaiser (autovalores $> 1$ en matriz de correlación) y gráfico de sedimentación (Scree Plot).

2. **Análisis Discriminante Lineal de Fisher (LDA, 1936):**
   Busca el vector de proyección $\\mathbf{w}$ que maximiza la separación entre medias de clases normalizada por la dispersión intra-clase (Razón de Rayleigh):
   $$J(\\mathbf{w}) = \\frac{\\mathbf{w}^T \\mathbf{S}_B \\mathbf{w}}{\\mathbf{w}^T \\mathbf{S}_W \\mathbf{w}} \\implies \\mathbf{w} \\propto \\mathbf{S}_W^{-1} (\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_2)$$
   donde $\\mathbf{S}_B = (\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_2)(\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_2)^T$ y $\\mathbf{S}_W = \\mathbf{S}_1 + \\mathbf{S}_2$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Karl Pearson (1901)** — *On Lines and Planes of Closest Fit to Systems of Points in Space*.
- **Ronald A. Fisher (1936)** — *The Use of Multiple Measurements in Taxonomic Problems*.
- **Johnson & Wichern (2007)**: Capítulos 8 y 11 sobre PCA y Discriminante.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Reducción de 24 parámetros sensoriales y fisicoquímicos del café especial de origen a 3 componentes principales que explican el 86% de la varianza, clasificando lotes para exportación premium mediante LDA.`,
    toolMapping: "Herramienta: Módulo PCA y Clustering en `/tools`."
  },
  {
    id: "io133-m1",
    courseCode: "IO133",
    courseTitle: "Diseño de Experimentos y Superficie de Respuesta",
    moduleNumber: 1,
    moduleTitle: "Diseños Factoriales Completos y Fraccionados",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño de factoriales 2^k y fraccionados 2^{k-p}, construcción de relaciones definidoras, cálculo de estructuras de alias y evaluación de Resoluciones III, IV y V.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Diseños Factoriales $2^k$ Codificados:**
   Variables $x_i \\in \\{-1, +1\\}$. Matriz de diseño $\\mathbf{X} \\in \\mathbb{R}^{2^k \\times 2^k}$ ortogonal ($\\mathbf{X}^T \\mathbf{X} = 2^k \\mathbf{I}$).
   - Estimador insesgado de efectos principales e interacciones:
     $$\\hat{\\beta}_i = \\frac{1}{2^k} \\mathbf{x}_i^T \\mathbf{y}, \\qquad \\text{Efecto}_i = 2 \\hat{\\beta}_i$$
   - Varianza de cada estimador: $\\text{Var}(\\hat{\\beta}_i) = \\frac{\\sigma^2}{n \\cdot 2^k}$.

2. **Factoriales Fraccionados $2^{k-p}$:**
   Se corre una fracción $1/2^p$ seleccionando $k-p$ factores independientes y generando $p$ generadores de diseño.
   - **Relación Definidora:** $I = W_1 = W_2 = \\dots = W_{2^p - 1}$.
   - **Estructura de Alias (Confounding):** Para cualquier factor $L$:
     $$[L] = L \\cdot I + L \\cdot W_1 + \\dots + L \\cdot W_{2^p - 1}$$
   - **Resoluciones Canónicas (Montgomery):**
     * **Resolución III ($2^{k-p}_{\\text{III}}$):** Principales confundidos con interacciones de 2 factores ($A = BC$).
     * **Resolución IV ($2^{k-p}_{\\text{IV}}$):** Principales confundidos con orden 3 ($A = BCD$); interacciones de 2 factores confundidas entre sí ($AB = CD$).
     * **Resolución V ($2^{k-p}_{\\text{V}}$):** Principales confundidos con orden 4; interacciones de 2 factores confundidas solo con orden 3 o superior ($AB = CDE$).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Douglas C. Montgomery (2017)** — *Design and Analysis of Experiments* (Wiley): Capítulos 6 y 8.
- **Box, Hunter & Hunter (2005)** — *Statistics for Experimenters: Design, Innovation, and Discovery*.
- **George E. P. Box (1952)** — *Multi-Factor Designs of First Order*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Cribado (Screening) de 7 variables operativas en un reactor de pirólisis de residuos agrícolas en Risaralda usando un diseño fraccionado $2^{7-4}_{\\text{III}}$ de 8 corridas en lugar de 128 corridas completas.`,
    toolMapping: "Herramienta: Generador de Matrices Factoriales en `/tools`."
  },
  {
    id: "io133-m2",
    courseCode: "IO133",
    courseTitle: "Diseño de Experimentos y Superficie de Respuesta",
    moduleNumber: 2,
    moduleTitle: "Metodología de Superficie de Respuesta (RSM) y Deseabilidad",
    coordination: "Dr. José Soto Mejía",
    competencies: "Ajuste de modelos polinomiales de segundo orden, diseño central compuesto (CCD) rotable, análisis de puntos estacionarios canónicos y optimización multirespuesta de Derringer & Suich.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo de Segundo Orden y Análisis Canónico:**
   $$y = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\beta_{ij} x_i x_j + \\epsilon$$
   En forma matricial: $\\hat{y}(\\mathbf{x}) = \\beta_0 + \\mathbf{x}^T \\mathbf{b} + \\mathbf{x}^T \\mathbf{B} \\mathbf{x}$.
   - **Punto Estacionario:** $\\mathbf{x}_s = -\\frac{1}{2} \\mathbf{B}^{-1} \\mathbf{b}$.
   - Forma canónica: $\\hat{y} = y_s + \\sum_{i=1}^k \\lambda_i w_i^2$, donde $\\lambda_i$ son autovalores de $\\mathbf{B}$:
     * Si $\\lambda_i < 0, \\forall i \\implies$ Máximo local.
     * Si $\\lambda_i > 0, \\forall i \\implies$ Mínimo local.
     * Si tienen signos mixtos $\\implies$ Punto de silla (Saddle Point).

2. **Diseño Central Compuesto (CCD) Rotable:**
   Compuesto por $F = 2^k$ puntos cúbicos $(\\pm 1, \\dots, \\pm 1)$, $2k$ puntos estrella $(\\pm \\alpha, 0, \\dots, 0)$ y $n_c$ centros.
   - Condición de rotabilidad matemática (esfericidad de varianza):
     $$\\alpha = (F)^{1/4} = (2^k)^{1/4}$$

3. **Optimización Multirespuesta (Derringer & Suich, 1980):**
   Transforma cada respuesta en $d_i \\in [0, 1]$ y calcula la **Deseabilidad Global ($D$)**:
   $$D = \\left( \\prod_{i=1}^m d_i^{w_i} \\right)^{\\frac{1}{\\sum w_i}}$$
   Si cualquier $d_i = 0 \\implies D = 0$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **George E. P. Box & K. B. Wilson (1951)** — *On the Experimental Attainment of Optimum Conditions* (JRSS B): Nacimiento de la RSM.
- **George Derringer & Ronald Suich (1980)** — *Simultaneous Optimization of Several Response Variables* (Journal of Quality Technology).
- **Raymond H. Myers, Douglas C. Montgomery & Christine M. Anderson-Cook (2016)** — *Response Surface Methodology*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Optimización de 3 variables (Temperatura, Presión y Concentración de Enzima) en la hidrólisis de almidón de yuca mediante un CCD rotable con $\\alpha = 1.682$, maximizando rendimiento y minimizando azúcares residuales.`,
    toolMapping: "Herramienta: Módulo RSM y Optimizador de Deseabilidad en `/tools`."
  },
  {
    id: "io243-m1",
    courseCode: "IO243",
    courseTitle: "Análisis Envolvente de Datos (DEA)",
    moduleNumber: 1,
    moduleTitle: "Fundamentos de Eficiencia y Modelos CCR y BCC",
    coordination: "Dr. José Soto Mejía",
    competencies: "Evaluación de eficiencia técnica relativa de Unidades Tomadoras de Decisión (DMUs), formulación envolvente y de multiplicadores en modelos CCR (CRS) y BCC (VRS).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo CCR Insumo-Orientado (Charnes, Cooper & Rhodes, 1978):**
   Asume Rendimientos Constantes a Escala (CRS). Evalúa $n$ DMUs con $m$ insumos $\\mathbf{x}_j$ y $s$ productos $\\mathbf{y}_j$:
   - **Formulación de Multiplicadores (Dual):**
     $$\\begin{aligned}
     \\max \\quad & \\theta_0 = \\sum_{r=1}^s u_r y_{r0} \\\\
     \\text{s.a.} \\quad & \\sum_{i=1}^m v_i x_{i0} = 1 \\\\
     & \\sum_{r=1}^s u_r y_{rj} - \\sum_{i=1}^m v_i x_{ij} \\le 0, \\quad \\forall j = 1, \\dots, n \\\\
     & u_r, v_i \\ge \\epsilon > 0
     \\end{aligned}$$
   - **Formulación de Envolvente (Primal):**
     $$\\begin{aligned}
     \\min \\quad & \\theta - \\epsilon \\left( \\sum_{i=1}^m s_i^- + \\sum_{r=1}^s s_r^+ \\right) \\\\
     \\text{s.a.} \\quad & \\sum_{j=1}^n \\lambda_j x_{ij} + s_i^- = \\theta x_{i0}, \\quad \\forall i = 1, \\dots, m \\\\
     & \\sum_{j=1}^n \\lambda_j y_{rj} - s_r^+ = y_{r0}, \\quad \\forall r = 1, \\dots, s \\\\
     & \\lambda_j \\ge 0, \\quad s_i^-, s_r^+ \\ge 0
     \\end{aligned}$$
   - **Condición de Eficiencia de Pareto-Koopmans:** La $\\text{DMU}_0$ es 100% eficiente si $\\theta^* = 1$ y todas las holguras son nulas ($s_i^{-*} = 0, s_r^{+*} = 0$).

2. **Modelo BCC (Banker, Charnes & Cooper, 1984):**
   Incorpora Rendimientos Variables a Escala (VRS) añadiendo la restricción de convexidad:
   $$\\sum_{j=1}^n \\lambda_j = 1$$
   - En la forma de multiplicadores, introduce una variable libre $u_0$:
     * Si $u_0^* < 0 \\implies$ Rendimientos crecientes a escala (IRS).
     * Si $u_0^* = 0 \\implies$ Rendimientos constantes a escala (CRS).
     * Si $u_0^* > 0 \\implies$ Rendimientos decrecientes a escala (DRS).
   - Eficiencia de Escala: $SE = \\frac{\\theta_{\\text{CCR}}^*}{\\theta_{\\text{BCC}}^*}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Charnes, Cooper & Rhodes (1978)** — *Measuring the Efficiency of Decision Making Units* (EJOR).
- **Banker, Charnes & Cooper (1984)** — *Some Models for Estimating Technical and Scale Inefficiencies in Data Envelopment Analysis* (Management Science).
- **Cooper, Seiford & Tone (2007)** — *Data Envelopment Analysis: A Comprehensive Text with Models, Applications, References and DEA-Solver Software*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Evaluación de la eficiencia relativa de 14 hospitales y centros de salud de Risaralda: insumos (médicos, camas, presupuesto operativo) vs productos (consultas externas, cirugías, egresos hospitalarios), identificando DMUs de referencia de mejores prácticas.`,
    toolMapping: "Herramienta: Eficiencia Técnica DEA (CCR Insumo-Orientado) en `/tools#dea` con cálculo de $\\theta^*$, holguras y frontera de producción."
  },
  {
    id: "io243-m2",
    courseCode: "IO243",
    courseTitle: "Análisis Envolvente de Datos (DEA)",
    moduleNumber: 2,
    moduleTitle: "Slacks, Benchmarking y Modelos en Red",
    coordination: "Dr. José Soto Mejía",
    competencies: "Análisis en dos etapas de Slacks (holguras de insumo y exceso de producto), identificación del conjunto de referencia de benchmarking y modelos DEA de redes multietapa.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo Basado en Holguras (Slacks-Based Measure - SBM de Tone, 2001):**
   Supera las limitaciones del modelo radial CCR midiendo simultáneamente ineficiencias radiales y no radiales:
   $$\\rho^* = \\min_{\\boldsymbol{\\lambda}, \\mathbf{s}^-, \\mathbf{s}^+} \\frac{1 - \\frac{1}{m} \\sum_{i=1}^m \\frac{s_i^-}{x_{i0}}}{1 + \\frac{1}{s} \\sum_{r=1}^s \\frac{s_r^+}{y_{r0}}}$$
   sujeto a las restricciones de factibilidad de envolvente. $0 < \\rho^* \\le 1$. $\\text{DMU}_0$ es eficiente si y solo si $\\rho^* = 1$.

2. **Benchmarking y Objetivos de Proyección:**
   Para una DMU ineficiente, el punto de proyección en la frontera eficiente es:
   $$\\hat{x}_{i0} = \\theta^* x_{i0} - s_i^{-*}, \\qquad \\hat{y}_{r0} = y_{r0} + s_r^{+*}$$
   - **Conjunto de Pares de Referencia (Peer Group):** Las DMUs eficientes con $\\lambda_j^* > 0$.
     $$E_0 = \\{ j : \\lambda_j^* > 0 \\}$$
     Los coeficientes $\\lambda_j^*$ indican la ponderación de cada DMU referente para fijar metas de mejora.

3. **DEA en Redes Multietapa (Network DEA - Färe & Grosskopf, 2000):**
   Modela procesos internos donde las salidas de una primera etapa (e.g. Producción) se convierten en insumos intermedios ($z$) de una segunda etapa (e.g. Comercialización):
   $$\\theta_{\\text{Global}} = \\theta_{\\text{Etapa 1}} \\times \\theta_{\\text{Etapa 2}}$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Kaoru Tone (2001)** — *A Slacks-Based Measure of Efficiency in Data Envelopment Analysis* (EJOR).
- **Rolf Färe & Shawna Grosskopf (2000)** — *Network DEA* (Socio-Economic Planning Sciences).
- **Cook & Seiford (2009)** — *Data envelopment analysis (DEA) - Thirty years on*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Benchmarking de 20 agencias bancarias en Pereira descomponiendo la eficiencia en dos etapas: Etapa de Captación de depósitos $\\to$ Etapa de Colocación de créditos comerciales y rentabilidad.`,
    toolMapping: "Herramienta: Módulo DEA y Proyección de Slacks en `/tools#dea`."
  },
  {
    id: "io223-m1",
    courseCode: "IO223",
    courseTitle: "Metaheurísticas y Optimización Combinatoria",
    moduleNumber: 1,
    moduleTitle: "Metaheurísticas de Trayectoria (SA y Tabú)",
    coordination: "Dr. Mauricio Granada Echeverri",
    competencies: "Diseño de metaheurísticas de búsqueda local para problemas NP-hard, control de esquemas de enfriamiento en Recocido Simulado y gestión de listas de memoria en Búsqueda Tabú.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Recocido Simulado (Simulated Annealing - Kirkpatrick, Gelatt & Vecchi, 1983):**
   Inspirado en la termodinámica estadística del enfriamiento lento de metales.
   - **Criterio de Aceptación de Metrópolis (1953):**
     Dada una solución actual $x$ y un vecino $x' \\in \\mathcal{N}(x)$ con diferencia de costos $\\Delta E = f(x') - f(x)$:
     * Si $\\Delta E \\le 0$: Se acepta $x'$ incondicionalmente ($P = 1$).
     * Si $\\Delta E > 0$: Se acepta con probabilidad:
       $$P(\\text{Aceptar}) = \\exp\\left( -\\frac{\\Delta E}{T_k} \\right)$$
   - **Esquema de Enfriamiento:** Geométrico $T_{k+1} = \\alpha T_k$ con $\\alpha \\in [0.80, 0.99]$.
   - A alta temperatura, el algoritmo explora libremente el espacio escapando de óptimos locales; a baja temperatura, converge a búsqueda local voraz. Demostrado formalmente que converge al óptimo global con probabilidad 1 mediante cadenas de Markov homogéneas si el enfriamiento es logarítmico $T_k = c / \\ln(k + 1)$.

2. **Búsqueda Tabú (Tabu Search - Fred Glover, 1986, 1989):**
   Utiliza memoria explícita para evitar ciclos y guiar la búsqueda hacia regiones no exploradas:
   - **Memoria a Corto Plazo (Lista Tabú - $TL$):** Registra los últimos atributos de movimientos ejecutados durante una permanencia $\\tau$ (Tenure). Dichos movimientos están prohibidos.
   - **Criterio de Aspiración:** El estado tabú se anula si el movimiento propuesto produce una solución estrictamente mejor que la mejor incumbente global encontrada hasta el momento ($f(x') < f(x^*)$).
   - **Memoria a Mediano y Largo Plazo:** Intensificación (frecuencia de atributos buenos) y Diversificación (penalización de atributos sobreutilizados para saltar a valles inexplorados).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Kirkpatrick, Gelatt & Vecchi (1983)** — *Optimization by Simulated Annealing* (Science).
- **Fred Glover (1989, 1990)** — *Tabu Search—Part I & II* (ORSA Journal on Computing).
- **Gendreau & Potvin (2010)** — *Handbook of Metaheuristics*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Secuenciamiento óptimo de órdenes en líneas de pintura electrostática de autopartes (Flow Shop Scheduling) para minimizar el Makespan ($C_{\\max}$), resolviendo instancias de 50 pedidos y 10 máquinas en segundos.`,
    toolMapping: "Herramienta: Módulo de Metaheurísticas de Trayectoria y Scheduling en `/tools`."
  },
  {
    id: "io223-m2",
    courseCode: "IO223",
    courseTitle: "Metaheurísticas y Optimización Combinatoria",
    moduleNumber: 2,
    moduleTitle: "Metaheurísticas Poblacionales (GA y PSO)",
    coordination: "Dr. Mauricio Granada Echeverri",
    competencies: "Diseño de algoritmos bio-inspirados evolutivos y de inteligencia de enjambre, operadores genéticos para permutaciones (PMX, OX) y dinámica de partículas en enjambre (PSO).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Algoritmos Genéticos (GA - Holland, 1975; Goldberg, 1989):**
   Evolución de una población de $N$ cromosomas a través de generaciones:
   - **Selección:** Ruleta estocástica ($p_i = f_i / \\sum f_j$) o Torneo de tamaño $k$.
   - **Operadores de Cruce para Permutaciones (TSP / VRP):**
     * **PMX (Partially Mapped Crossover):** Transfiere un segmento del Padre 1 y resuelve colisiones mediante mapeo uno a uno de las posiciones duplicadas.
     * **OX (Order Crossover):** Preserva el orden relativo de visita de las ciudades.
   - **Mutación:** Swap (intercambio), Inversion (inversión de subsecuencia) o Scramble.
   - **Elitismo:** Preservación forzada de los mejores $e$ individuos sin alteración.
   - Teorema de los Esquemas de Holland (Building Block Hypothesis): Esquemas de bajo orden, corta longitud de definición y aptitud superior crecen exponencialmente en la población.

2. **Optimización por Enjambre de Partículas (PSO - Kennedy & Eberhart, 1995):**
   Simula el comportamiento social de bandadas de aves. Cada partícula $i$ tiene posición $\\mathbf{x}_i(t) \\in \\mathbb{R}^d$ y velocidad $\\mathbf{v}_i(t) \\in \\mathbb{R}^d$:
   $$\\mathbf{v}_i(t+1) = w \\mathbf{v}_i(t) + c_1 r_1 (\\mathbf{p}_i - \\mathbf{x}_i(t)) + c_2 r_2 (\\mathbf{g} - \\mathbf{x}_i(t))$$
   $$\\mathbf{x}_i(t+1) = \\mathbf{x}_i(t) + \\mathbf{v}_i(t+1)$$
   - $w$: Peso de inercia (balance entre exploración y explotación).
   - $c_1, c_2$: Coeficientes de aceleración cognitivo (hacia mejor personal $\\mathbf{p}_i$) y social (hacia mejor global del enjambre $\\mathbf{g}$).
   - $r_1, r_2 \\sim U(0, 1)$: Factores estocásticos.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **John H. Holland (1975)** — *Adaptation in Natural and Artificial Systems*.
- **David E. Goldberg (1989)** — *Genetic Algorithms in Search, Optimization, and Machine Learning*.
- **James Kennedy & Russell Eberhart (1995)** — *Particle Swarm Optimization* (IEEE ICNN).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Ruteo de vehículos con flota heterogénea y ventanas de tiempo (VRPTW) para la distribución de alimentos perecederos en 60 municipios del Eje Cafetero y Norte del Valle, resuelto mediante GA-PMX con reducción de combustible del 24%.`,
    toolMapping: "Herramienta: Módulo interactivo de Algoritmos Genéticos y PSO en `/tools`."
  },
  {
    id: "io233-m1",
    courseCode: "IO233",
    courseTitle: "Optimización Financiera y Gestión de Riesgo",
    moduleNumber: 1,
    moduleTitle: "Teoría Clásica de Portafolio y Modelo de Markowitz",
    coordination: "Dr. Carlos Osorio Ramírez",
    competencies: "Formulación cuadrática de la selección de portafolios media-varianza de Markowitz, deducción de la frontera eficiente, derivación del portafolio tangente y modelo CAPM.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo Media-Varianza de Harry Markowitz (1952):**
   Dado un universo de $n$ activos con vector de retornos esperados $\\boldsymbol{\\mu} \\in \\mathbb{R}^n$ y matriz de covarianzas simétrica definida positiva $\\boldsymbol{\\Sigma} \\in \\mathbb{R}^{n \\times n}$:
   - Vector de pesos de inversión $\\mathbf{w} = (w_1, \\dots, w_n)^T$.
   - Retorno esperado del portafolio: $\\mu_P = \\mathbf{w}^T \\boldsymbol{\\mu}$.
   - Varianza del portafolio: $\\sigma_P^2 = \\mathbf{w}^T \\boldsymbol{\\Sigma} \\mathbf{w}$.
   - **Problema de Programación Cuadrática:**
     $$\\begin{aligned}
     \\min_{\\mathbf{w}} \\quad & \\frac{1}{2} \\mathbf{w}^T \\boldsymbol{\\Sigma} \\mathbf{w} \\\\
     \\text{s.a.} \\quad & \\mathbf{w}^T \\boldsymbol{\\mu} \\ge R_{\\text{target}} \\\\
     & \\mathbf{w}^T \\mathbf{1} = 1 \\\\
     & \\mathbf{w} \\ge \\mathbf{0} \\quad (\\text{Sin ventas en corto})
     \\end{aligned}$$

2. **Frontera Eficiente y Teorema de Separación de Fondos (Tobin, 1958):**
   Con un activo libre de riesgo de tasa $R_f$:
   - La frontera se convierte en la Línea del Mercado de Capitales (CML - Capital Market Line):
     $$\\mathbb{E}[R_P] = R_f + \\left( \\frac{\\mu_T - R_f}{\\sigma_T} \\right) \\sigma_P$$
   - **Portafolio Tangente ($T$):** Maximiza el Ratio de Sharpe:
     $$\\max_{\\mathbf{w}} \\text{SR} = \\frac{\\mathbf{w}^T \\boldsymbol{\\mu} - R_f}{\\sqrt{\\mathbf{w}^T \\boldsymbol{\\Sigma} \\mathbf{w}}} \\quad \\text{s.a. } \\mathbf{w}^T \\mathbf{1} = 1, \\; \\mathbf{w} \\ge \\mathbf{0}$$

3. **Modelo de Valoración de Activos de Capital (CAPM - Sharpe, 1964):**
   $$\\mathbb{E}[R_i] = R_f + \\beta_i (\\mathbb{E}[R_M] - R_f), \\qquad \\beta_i = \\frac{\\text{Cov}(R_i, R_M)}{\\text{Var}(R_M)}$$
   $\\beta_i$ mide el riesgo sistemático no diversificable del activo $i$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Harry Markowitz (1952)** — *Portfolio Selection* (The Journal of Finance): Premio Nobel de Economía.
- **William F. Sharpe (1964)** — *Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk*.
- **Cornuejols, Peña & Tütüncü (2018)** — *Optimization Methods in Finance* (Cambridge University Press).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Construcción de carteras de inversión corporativas en el mercado accionario de la Bolsa de Valores de Colombia (BVC), optimizando la asignación de excedentes de tesorería empresarial.`,
    toolMapping: "Herramienta: Módulo de Frontera Eficiente y Markowitz en `/tools`."
  },
  {
    id: "io233-m2",
    courseCode: "IO233",
    courseTitle: "Optimización Financiera y Gestión de Riesgo",
    moduleNumber: 2,
    moduleTitle: "Medidas de Riesgo Coherente (CVaR) y Optimización Estocástica",
    coordination: "Dr. Carlos Osorio Ramírez",
    competencies: "Axiomática de medidas de riesgo coherentes de Artzner, formulación lineal del Conditional Value at Risk (CVaR) de Rockafellar & Uryasev, y modelos de optimización estocástica con recursos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de Medidas Coherentes de Riesgo (Artzner, Delbaen, Eber & Heath, 1999):**
   Una medida de riesgo $\\rho: \\mathcal{L} \\to \\mathbb{R}$ es **coherente** si satisface 4 axiomas fundamentales:
   - **Monotonicidad:** Si $X \\le Y$ c.s. $\\implies \\rho(X) \\ge \\rho(Y)$.
   - **Subaditividad:** $\\rho(X + Y) \\le \\rho(X) + \\rho(Y)$ (El riesgo conjunto nunca supera la suma de riesgos individuales $\\implies$ premia la diversificación).
   - **Homogeneidad Positiva:** $\\rho(c X) = c \\rho(X), \\forall c > 0$.
   - **Invarianza por Traslación:** $\\rho(X + m) = \\rho(X) - m, \\forall m \\in \\mathbb{R}$.

2. **Inconsistencia del Value at Risk (VaR):**
   $$VaR_\\alpha(X) = -\\inf\\{ x : F_X(x) > 1 - \\alpha \\}$$
   El VaR **no es una medida coherente de riesgo** porque viola el axioma de subaditividad para distribuciones no elípticas, desincentivando la diversificación y siendo ciego a la severidad de las pérdidas en la cola.

3. **Conditional Value at Risk (CVaR / Expected Shortfall):**
   Es la pérdida esperada condicional a que se supere el $VaR_\\alpha$:
   $$CVaR_\\alpha(X) = \\mathbb{E}[-X \\mid -X \\ge VaR_\\alpha(X)]$$
   $CVaR_\\alpha$ es una medida **estrictamente coherente**.
   - **Teorema de Equivalencia de Rockafellar & Uryasev (2000):**
     Minimizar el CVaR de una cartera con función de pérdida $f(\\mathbf{w}, \\mathbf{r}) = -\\mathbf{w}^T \\mathbf{r}$ se formula de forma convexa exacta mediante la función auxiliar:
     $$F_\\alpha(\\mathbf{w}, \\gamma) = \\gamma + \\frac{1}{1 - \\alpha} \\int [f(\\mathbf{w}, \\mathbf{r}) - \\gamma]^+ p(\\mathbf{r}) d\\mathbf{r}$$
     Bajo $S$ escenarios discretos $\\mathbf{r}_s$ equiprobables, se reduce a un **Programa Lineal puro** mediante variables auxiliares de holgura $u_s \\ge 0$:
     $$\\begin{aligned}
     \\min_{\\mathbf{w}, \\gamma, \\mathbf{u}} \\quad & \\gamma + \\frac{1}{S (1 - \\alpha)} \\sum_{s=1}^S u_s \\\\
     \\text{s.a.} \\quad & u_s \\ge -\\mathbf{w}^T \\mathbf{r}_s - \\gamma, \\quad \\forall s = 1, \\dots, S \\\\
     & u_s \\ge 0, \\quad \\forall s = 1, \\dots, S \\\\
     & \\mathbf{w}^T \\boldsymbol{\\mu} \\ge R_{\\text{target}}, \\quad \\mathbf{w}^T \\mathbf{1} = 1, \\; \\mathbf{w} \\ge \\mathbf{0}
     \\end{aligned}$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Philippe Artzner, Freddy Delbaen, Jean-Marc Eber & David Heath (1999)** — *Coherent Measures of Risk* (Mathematical Finance).
- **R. Tyrrell Rockafellar & Stanislav Uryasev (2000)** — *Optimization of Conditional Value-at-Risk* (Journal of Risk).
- **Alexander Shapiro, Darinka Dentcheva & Andrzej Ruszczyński (2009)** — *Lectures on Stochastic Programming: Modeling and Theory* (SIAM).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Gestión de riesgo en contratación de energía eléctrica para grandes consumidores industriales del Eje Cafetero: optimización de la compra en contratos bilaterales vs bolsa de energía minimizando el CVaR al 99% bajo escenarios de sequía y fenómeno de El Niño.`,
    toolMapping: "Herramienta: Módulo de CVaR y Optimización de Riesgo en `/tools`."
  }
];
