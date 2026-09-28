export const blockAStats = [
  {
    id: "ii4d3-m1",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 1,
    moduleTitle: "Análisis Exploratorio de Datos (EDA)",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Capacidad para sintetizar distribuciones empíricas de datos industriales mediante estadísticos de localización, dispersión y forma, identificando anomalías y asimetrías en procesos productivos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

El Análisis Exploratorio de Datos (EDA) formaliza las propiedades muestrales de un vector aleatorio unidimensional $\\mathbf{x} = (x_1, x_2, \\dots, x_n) \\in \\mathbb{R}^n$.

1. **Medidas de Tendencia Central:**
   - Media muestral:
     $$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i$$
   - Mediana ($Me$): Valor que satisface $\\mathbb{P}(X \\le Me) \\ge 0.5$ y $\\mathbb{P}(X \\ge Me) \\ge 0.5$.
   - Media recortada al $\\alpha\\%$ (Trimmed Mean): Minimiza la influencia de valores extremos en las colas.

2. **Medidas de Dispersión y Escala:**
   - Varianza muestral insesgada ($s^2$):
     $$s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2$$
   - Desviación estándar: $s = \\sqrt{s^2}$.
   - Rango intercuartílico ($IQR$):
     $$IQR = Q_3 - Q_1$$
   - Desviación absoluta respecto a la mediana ($MAD$):
     $$MAD = \\text{mediana}(|x_i - \\text{mediana}(\\mathbf{x})|)$$

3. **Momentos de Orden Superior y Medidas de Forma:**
   - Coeficiente de asimetría de Fisher-Pearson ($g_1$):
     $$g_1 = \\frac{m_3}{m_2^{3/2}} = \\frac{\\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^3}{\\left( \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2 \\right)^{3/2}}$$
   - Coeficiente de curtosis de exceso ($g_2$):
     $$g_2 = \\frac{m_4}{m_2^2} - 3 = \\frac{\\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^4}{\\left( \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2 \\right)^2} - 3$$
   *(Para una distribución Gaussiana pura, $g_1 = 0$ y $g_2 = 0$. Si $g_2 > 0$ es leptocúrtica; si $g_2 < 0$ es platicúrtica).*

4. **Regla de Tukey para Detección de Valores Atípicos (Outliers):**
   $$x \\text{ es outlier leve si } x \\in [Q_1 - 1.5 \\cdot IQR, Q_1) \\cup (Q_3, Q_3 + 1.5 \\cdot IQR]$$
   $$x \\text{ es outlier extremo si } x < Q_1 - 3 \\cdot IQR \\quad \\lor \\quad x > Q_3 + 3 \\cdot IQR$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **John W. Tukey (1977)** — *Exploratory Data Analysis*: Introducción axiomática del diagrama de caja y bigotes (Box-Plot) y resistencia a valores atípicos.
- **Walpole, Myers & Myers (2012)** — *Probabilidad y Estadística para Ingeniería y Ciencias*: Enfoque de síntesis numérica preliminar para control de calidad.
- **Rousseeuw & Croux (1993)** — Alternativas robustas al estimador de escala: $S_n$ y $Q_n$ con eficiencia del 58% y 82% bajo normalidad y punto de ruptura del 50%.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Auditoría dimensional de piezas torneadas en el Laboratorio GEIO. Detección de descalibraciones en centros de mecanizado CNC mediante monitoreo continuo del coeficiente de asimetría $g_1$ e identificación de outliers por desgaste de herramienta.`,
    toolMapping: "Herramienta: Visualizador Interactivo de Distribuciones y Código Python Wasm `<PyodideRunner />` (cálculo de $s, IQR, g_1, g_2$ con NumPy/SciPy)."
  },
  {
    id: "ii4d3-m2",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 2,
    moduleTitle: "Probabilidad y Variables Aleatorias Discretas",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Dominio de la teoría de conjuntos y probabilidad axiomática de Kolmogórov, probabilidad condicional, independencia estocástica y modelación de procesos de conteo discretos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de Kolmogórov (1933):**
   Dado un espacio muestral $\\Omega$ y una $\\sigma$-álgebra $\\mathcal{F}$ de subconjuntos de $\\Omega$:
   - Axioma 1: $\\mathbb{P}(A) \\ge 0, \\quad \\forall A \\in \\mathcal{F}$.
   - Axioma 2: $\\mathbb{P}(\\Omega) = 1$.
   - Axioma 3 ($\\sigma$-aditividad): Si $A_1, A_2, \\dots$ son eventos disjuntos dos a dos ($A_i \\cap A_j = \\emptyset, \\forall i \\ne j$):
     $$\\mathbb{P}\\left( \\bigcup_{i=1}^\\infty A_i \\right) = \\sum_{i=1}^\\infty \\mathbb{P}(A_i)$$

2. **Probabilidad Condicional y Teorema de Bayes:**
   - Probabilidad condicional: $\\mathbb{P}(A \\mid B) = \\frac{\\mathbb{P}(A \\cap B)}{\\mathbb{P}(B)}$, con $\\mathbb{P}(B) > 0$.
   - Teorema de la Probabilidad Total: Si $\{B_1, \\dots, B_k\}$ es una partición de $\\Omega$:
     $$\\mathbb{P}(A) = \\sum_{j=1}^k \\mathbb{P}(A \\mid B_j) \\mathbb{P}(B_j)$$
   - Teorema de Bayes:
     $$\\mathbb{P}(B_i \\mid A) = \\frac{\\mathbb{P}(A \\mid B_i) \\mathbb{P}(B_i)}{\\sum_{j=1}^k \\mathbb{P}(A \\mid B_j) \\mathbb{P}(B_j)}$$

3. **Distribuciones Discretas Paramétricas:**
   - **Binomial:** $X \\sim \\text{Bin}(n, p)$, $p(x) = \\binom{n}{x} p^x (1-p)^{n-x}$, $\\mathbb{E}[X] = np$, $\\text{Var}(X) = np(1-p)$.
   - **Poisson:** $X \\sim \\text{Poisson}(\\lambda)$, $p(x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}$, $\\mathbb{E}[X] = \\text{Var}(X) = \\lambda$.
   - **Hipergeométrica:** $X \\sim \\text{Hiper}(N, K, n)$, $p(x) = \\frac{\\binom{K}{x} \\binom{N-K}{n-x}}{\\binom{N}{n}}$, muestreo sin reemplazo en lotes finitos.
   - **Geométrica y Binomial Negativa:** Ensayos de Bernoulli hasta el $r$-ésimo éxito.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Kolmogórov (1933)** — *Grundbegriffe der Wahrscheinlichkeitsrechnung*: Base axiomática de la teoría moderna de probabilidad.
- **Sheldon Ross (2014)** — *A First Course in Probability*: Modelado riguroso de variables aleatorias discretas y aplicaciones de confiabilidad.
- **William Feller (1968)** — *An Introduction to Probability Theory and Its Applications*: Referencia histórica de procesos discretos y combinatoria.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Planes de muestreo de aceptación militar (MIL-STD-105E / ANSI/ASQ Z1.4). Modelado de la probabilidad de aceptar un lote defectuoso mediante distribución Hipergeométrica frente a su aproximación Binomial y Poisson en inspección de materias primas.`,
    toolMapping: "Herramienta: Calculadora de Probabilidad Discreta e Inferencia de Muestreo en `/tools`."
  },
  {
    id: "ii4d3-m3",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 3,
    moduleTitle: "Distribuciones de Probabilidad Continuas",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Capacidad para caracterizar fenómenos físicos, tiempos de vida y dimensiones continuas en manufactura usando densidades Normal, Exponencial, Gamma y Weibull.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Variables Aleatorias Continuas y Funciones Acumuladas:**
   - Función de densidad de probabilidad (PDF) $f(x) \\ge 0$, $\\int_{-\\infty}^\\infty f(x) dx = 1$.
   - Función de distribución acumulada (CDF): $F(x) = \\mathbb{P}(X \\le x) = \\int_{-\\infty}^x f(u) du$.
   - Esperanza y Varianza: $\\mathbb{E}[X] = \\int_{-\\infty}^\\infty x f(x) dx$, $\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$.

2. **Distribución Normal (Gaussiana):**
   - $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, con PDF:
     $$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)$$
   - Estandarización a la normal estándar $Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)$, $\\Phi(z) = \\int_{-\\infty}^z \\frac{1}{\\sqrt{2\\pi}} e^{-u^2/2} du$.
   - Teorema de Gauss-Markov y regla empírica $\\mu \\pm 1\\sigma (68.27\\%), \\mu \\pm 2\\sigma (95.45\\%), \\mu \\pm 3\\sigma (99.73\\%)$.

3. **Distribución Exponencial y Tiempo de Vida:**
   - $X \\sim \\text{Exp}(\\lambda)$, $f(x) = \\lambda e^{-\\lambda x}$ para $x \\ge 0$.
   - Propiedad de falta de memoria: $\\mathbb{P}(X > t + s \\mid X > s) = \\mathbb{P}(X > t) = e^{-\\lambda t}$.

4. **Distribución Weibull (Confiabilidad y Fatiga de Materiales):**
   - PDF biparamétrica:
     $$f(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1} \\exp\\left( -\\left( \\frac{t}{\\eta} \\right)^\\beta \\right), \\quad t \\ge 0$$
   - $\\beta$ (parámetro de forma): $\\beta < 1$ mortalidad infantil; $\\beta = 1$ tasa constante (exponencial); $\\beta > 1$ desgaste y envejecimiento físico.
   - $\\eta$ (parámetro de escala o vida característica): $F(\\eta) = 1 - e^{-1} \\approx 63.2\\%$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Walpole, Myers, Myers & Ye (2012)**: *Probability & Statistics for Engineers & Scientists*.
- **Abernethy (2006)** — *The New Weibull Handbook*: Estándar aeroespacial y automotriz para análisis de supervivencia y fatiga de componentes.
- **Montgomery & Runger (2018)**: *Applied Statistics and Probability for Engineers*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Determinación de tiempos de garantía y análisis de falla prematura de motores eléctricos industriales mediante ajuste de parámetros Weibull (estimación por máxima verosimilitud y papel probabilístico Weibull).`,
    toolMapping: "Herramienta: Simulador Monte Carlo (`/tools#montecarlo`) y generador de variables continuas vía transformada inversa."
  },
  {
    id: "ii4d3-m4",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 4,
    moduleTitle: "Inferencia Estadística y Estimación Paramétrica",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Capacidad para estimar parámetros poblacionales mediante métodos puntuales y por intervalos de confianza, evaluando propiedades de insesgadez, consistencia y eficiencia mínima.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Propiedades Axiomáticas de los Estimadores Puntuales:**
   Sea $\\hat{\\theta} = g(X_1, \\dots, X_n)$ un estimador de $\\theta$:
   - **Insesgadez:** $\\text{Sesgo}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta = 0$.
   - **Error Cuadrático Medio (MSE):**
     $$\\text{MSE}(\\hat{\\theta}) = \\mathbb{E}[(\\hat{\\theta} - \\theta)^2] = \\text{Var}(\\hat{\\theta}) + [\\text{Sesgo}(\\hat{\\theta})]^2$$
   - **Cota Inferior de Cramér-Rao (CRLB):**
     $$\\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I(\\theta)} = \\frac{1}{n \\mathbb{E}\\left[ \\left( \\frac{\\partial \\ln f(X; \\theta)}{\\partial \\theta} \\right)^2 \\right]}$$
     Si $\\text{Var}(\\hat{\\theta}) = 1/I(\\theta)$, $\\hat{\\theta}$ es el Estimador Insesgado de Varianza Mínima Uniforme (UMVUE).

2. **Métodos de Estimación:**
   - **Máxima Verosimilitud (MLE):**
     $$L(\\theta; \\mathbf{x}) = \\prod_{i=1}^n f(x_i; \\theta), \\qquad \\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\ln L(\\theta; \\mathbf{x})$$
   - **Método de los Momentos (MOM):** Igualación de momentos muestrales $\\frac{1}{n} \\sum x_i^k$ con momentos teóricos $\\mathbb{E}[X^k]$.

3. **Intervalos de Confianza (Método del Pivote):**
   - Media $\\mu$ con varianza conocida $\\sigma^2$:
     $$\\bar{x} \\pm Z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}$$
   - Media $\\mu$ con varianza desconocida (Gosset, 1908):
     $$\\bar{x} \\pm t_{\\alpha/2, n-1} \\frac{s}{\\sqrt{n}}$$
   - Varianza poblacional $\\sigma^2$:
     $$\\left[ \\frac{(n-1)s^2}{\\chi^2_{\\alpha/2, n-1}}, \\frac{(n-1)s^2}{\\chi^2_{1-\\alpha/2, n-1}} \\right]$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Casella & Berger (2002)** — *Statistical Inference*: Tratamiento riguroso de la información de Fisher, suficiencia (Teorema de Neyman-Fisher) y completitud (Lehmann-Scheffé).
- **Cramér (1946)** — *Mathematical Methods of Statistics*: Cota de varianza asintótica para estimadores MLE.
- **Student (William Sealy Gosset, 1908)** — *The Probable Error of a Mean*: Derivación exacta de la distribución $t$.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Estimación de la resistencia media a la compresión de probetas de concreto elaboradas en proyectos de infraestructura del Eje Cafetero, estableciendo márgenes de error al 95% y 99% de confianza según la norma NTC/ASTM.`,
    toolMapping: "Herramienta: Demostrador interactivo de Intervalos de Confianza en la landing page y banco de cálculo en `/tools`."
  },
  {
    id: "ii4d3-m5",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 5,
    moduleTitle: "Pruebas de Hipótesis Paramétricas",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Diseño y ejecución de contrastes de hipótesis estadísticos, controlando las tasas de error Tipo I ($\\alpha$) y Tipo II ($\\beta$) y evaluando la potencia analítica de la prueba.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Estructura Formal del Contraste:**
   - Hipótesis Nula $H_0: \\theta \\in \\Theta_0$ frente a Hipótesis Alternativa $H_1: \\theta \\in \\Theta_1$.
   - **Error Tipo I ($\\alpha$):** $\\mathbb{P}(\\text{Rechazar } H_0 \\mid H_0 \\text{ es verdadera}) = \\alpha$ (Nivel de significancia).
   - **Error Tipo II ($\\beta$):** $\\mathbb{P}(\\text{No rechazar } H_0 \\mid H_1 \\text{ es verdadera}) = \\beta$.
   - **Potencia de la prueba:** $1 - \\beta = \\mathbb{P}(\\text{Rechazar } H_0 \\mid H_1 \\text{ es verdadera})$.

2. **Lema Fundamental de Neyman-Pearson (1933):**
   Para contrastar hipótesis simples $H_0: \\theta = \\theta_0$ vs $H_1: \\theta = \\theta_1$, el test más potente de tamaño $\\alpha$ rechaza $H_0$ si la razón de verosimilitudes satisface:
   $$\\Lambda(\\mathbf{x}) = \\frac{L(\\theta_0; \\mathbf{x})}{L(\\theta_1; \\mathbf{x})} \\le k$$

3. **Estadísticos de Contraste Clásicos:**
   - Prueba $Z$ para una media (varianza conocida):
     $$Z_0 = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}} \\sim \\mathcal{N}(0, 1)$$
   - Prueba $t$ de Student para una media (varianza desconocida):
     $$t_0 = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}} \\sim t_{n-1}$$
   - Prueba $t$ para dos muestras independientes con varianzas iguales agrupadas ($s_p^2$):
     $$t_0 = \\frac{(\\bar{x}_1 - \\bar{x}_2) - \\Delta_0}{s_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}, \\qquad s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}$$
   - Prueba $t$ de Welch (varianzas desiguales): Grados de libertad de Satterthwaite.
   - Prueba $F$ de Fisher-Snedecor para igualdad de dos varianzas:
     $$F_0 = \\frac{s_1^2}{s_2^2} \\sim F_{n_1-1, n_2-1}$$

4. **El Valor $p$ (p-value):**
   Mínimo nivel de significancia $\\alpha$ para el cual los datos observados conducen al rechazo de $H_0$. Si $p \\le \\alpha$, se rechaza $H_0$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Neyman & Pearson (1933)** — *On the Problem of the Most Efficient Tests of Statistical Hypotheses*: Fundamentación de la teoría de decisión estadística óptima.
- **Lehmann & Romano (2005)** — *Testing Statistical Hypotheses*: Texto avanzado canónico para contrastes UMP (Uniformly Most Powerful).
- **Montgomery & Runger (2018)**: Metodología paso a paso para ingeniería de planta.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Validación de una nueva formulación polimérica en empaques biodegradables. Contraste de hipótesis bilateral para verificar si la resistencia media a la rotura supera el umbral crítico de 35 MPa con nivel de significancia $\\alpha = 0.05$.`,
    toolMapping: "Herramienta: Laboratorio interactivo Pyodide con SciPy (`scipy.stats.ttest_ind`, `scipy.stats.f`) en lección oficial."
  },
  {
    id: "ii4d3-m6",
    courseCode: "II4D3",
    courseTitle: "Estadística I",
    moduleNumber: 6,
    moduleTitle: "Regresión Lineal Simple y Correlación",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Capacidad para modelar relaciones funcionales entre variables continuas de ingeniería mediante mínimos cuadrados ordinarios, evaluar bondad de ajuste ($R^2$) y validar supuestos de residuos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Modelo Poblacional de Regresión Lineal Simple:**
   $$Y_i = \\beta_0 + \\beta_1 X_i + \\epsilon_i, \\quad i = 1, \\dots, n$$
   **Supuestos de Gauss-Markov:**
   - Linealidad en parámetros: $\\mathbb{E}[\\epsilon_i] = 0$.
   - Homocedasticidad: $\\text{Var}(\\epsilon_i) = \\sigma^2, \\forall i$.
   - No autocorrelación: $\\text{Cov}(\\epsilon_i, \\epsilon_j) = 0, \\forall i \\ne j$.
   - Normalidad: $\\epsilon_i \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.

2. **Deducción de los Estimadores MCO (Mínimos Cuadrados Ordinarios):**
   Minimizando la suma de errores al cuadrado:
   $$S(\\beta_0, \\beta_1) = \\sum_{i=1}^n (Y_i - \\beta_0 - \\beta_1 X_i)^2$$
   Derivando e igualando a cero:
   $$\\hat{\\beta}_1 = \\frac{S_{xy}}{S_{xx}} = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sum (X_i - \\bar{X})^2}, \\qquad \\hat{\\beta}_0 = \\bar{Y} - \\hat{\\beta}_1 \\bar{X}$$
   Estimador de la varianza residual:
   $$s^2 = \\frac{SS_E}{n - 2} = \\frac{\\sum (Y_i - \\hat{Y}_i)^2}{n - 2}$$

3. **Descomposición de la Variabilidad y Coeficiente de Determinación ($R^2$):**
   $$SS_T = SS_R + SS_E \\iff \\sum (Y_i - \\bar{Y})^2 = \\sum (\\hat{Y}_i - \\bar{Y})^2 + \\sum (Y_i - \\hat{Y}_i)^2$$
   $$R^2 = \\frac{SS_R}{SS_T} = 1 - \\frac{SS_E}{SS_T} = r_{xy}^2$$
   donde $r_{xy} = \\frac{S_{xy}}{\\sqrt{S_{xx} S_{yy}}}$ es el coeficiente de correlación lineal de Pearson.

4. **Inferencia sobre los Parámetros:**
   - Error estándar de $\\hat{\\beta}_1$: $SE(\\hat{\\beta}_1) = \\frac{s}{\\sqrt{S_{xx}}}$.
   - Estadístico $t$: $t_0 = \\frac{\\hat{\\beta}_1 - \\beta_{1,0}}{SE(\\hat{\\beta}_1)} \\sim t_{n-2}$.
   - Análisis de Varianza de la Regresión: $F_0 = \\frac{MS_R}{MS_E} = \\frac{SS_R / 1}{SS_E / (n-2)} = t_0^2$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Montgomery, Peck & Vining (2012)** — *Introduction to Linear Regression Analysis*: El estándar dorado en econometría e ingeniería para regresión y diagnóstico residual.
- **Draper & Smith (1998)** — *Applied Regression Analysis*.
- **Gauss (1821) & Markov (1900)**: Teorema de Gauss-Markov sobre la optimalidad BLUE (Best Linear Unbiased Estimator).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado del consumo horario de vapor industrial (kg/h) en función de la temperatura exterior (°C) en calderas de plantas azucareras y papeleras del Valle del Cauca y Risaralda, optimizando la factura energética.`,
    toolMapping: "Herramienta: Ajustador de Regresión OLS y Gráficos de Residuos en `/tools`."
  },
  {
    id: "ii5a3-m1",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 1,
    moduleTitle: "Métodos de Muestreo y Distribuciones Muestrales",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño probabilístico de esquemas de muestreo estratificado y por conglomerados, aplicando el Teorema del Límite Central y las distribuciones Ji-cuadrado, t y F.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Teorema del Límite Central (Lindeberg-Lévy):**
   Sean $X_1, X_2, \\dots, X_n$ variables aleatorias i.i.d. con $\\mathbb{E}[X_i] = \\mu$ y $\\text{Var}(X_i) = \\sigma^2 < \\infty$. Cuando $n \\to \\infty$:
   $$Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1)$$

2. **Distribución de Formas Cuadráticas y Muestreo Gaussiano:**
   Si $X_i \\overset{\\text{iid}}{\\sim} \\mathcal{N}(\\mu, \\sigma^2)$:
   - $\\bar{X} \\sim \\mathcal{N}(\\mu, \\sigma^2/n)$.
   - Teorema de Fisher: $\\bar{X}$ y $S^2$ son estocásticamente independientes.
   - $\\frac{(n-1)S^2}{\\sigma^2} = \\sum_{i=1}^n \\left( \\frac{X_i - \\bar{X}}{\\sigma} \\right)^2 \\sim \\chi^2_{n-1}$.
   - $T = \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} \\sim t_{n-1}$.
   - $F = \\frac{S_1^2 / \\sigma_1^2}{S_2^2 / \\sigma_2^2} \\sim F_{n_1-1, n_2-1}$.

3. **Muestreo Probabilístico en Poblaciones Finitas ($N$):**
   - Factor de corrección por población finita ($FPC$): $\\sqrt{\\frac{N - n}{N - 1}}$.
   - **Muestreo Estratificado:** Varianza mínima de Neyman:
     $$n_h = n \\frac{N_h \\sigma_h}{\\sum_{k=1}^L N_k \\sigma_k}$$
   - **Muestreo por Conglomerados (Cluster Sampling):** Estimador insesgado de razón y diseño bietápico.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **William G. Cochran (1977)** — *Sampling Techniques*: Referencia mundial para teoría y diseño de encuestas por muestreo y optimización de estratos.
- **Kish (1965)** — *Survey Sampling*: Concepto de efecto de diseño (deff) en muestreo complejo.
- **José A. Soto Mejía (UTP)**: Notas de cátedra de muestreo probabilístico para auditoría industrial.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Diseño de auditorías de inventario físico en bodegas con miles de SKUs mediante muestreo estratificado por regla ABC (Cost-Volume), reduciendo los costos de conteo en un 70% sin perder representatividad estadística.`,
    toolMapping: "Herramienta: Laboratorio interactivo Pyodide de distribuciones muestrales $\\chi^2, t, F$ con SciPy."
  },
  {
    id: "ii5a3-m2",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 2,
    moduleTitle: "Análisis de Varianza (ANOVA)",
    coordination: "Dr. José Soto Mejía",
    competencies: "Capacidad para descomponer la varianza total de un experimento en fuentes atribuibles a tratamientos y error aleatorio, validando contrastes post-hoc de Tukey y Scheffé.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **ANOVA Unifactorial (Completamente al Azar - CRD):**
   $$y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\quad j = 1, \\dots, n_i$$
   con restricción $\\sum_{i=1}^k n_i \\tau_i = 0$ y $\\epsilon_{ij} \\overset{\\text{iid}}{\\sim} \\mathcal{N}(0, \\sigma^2)$.

2. **Identidad de Sumas de Cuadrados:**
   $$SS_T = SS_{\\text{Trat}} + SS_E$$
   $$\\sum_{i=1}^k \\sum_{j=1}^{n_i} (y_{ij} - \\bar{y}_{\\cdot\\cdot})^2 = \\sum_{i=1}^k n_i (\\bar{y}_{i\\cdot} - \\bar{y}_{\\cdot\\cdot})^2 + \\sum_{i=1}^k \\sum_{j=1}^{n_i} (y_{ij} - \\bar{y}_{i\\cdot})^2$$
   - Grados de libertad: $N - 1 = (k - 1) + (N - k)$, donde $N = \\sum n_i$.
   - Cuadrados Medios: $MS_{\\text{Trat}} = \\frac{SS_{\\text{Trat}}}{k - 1}$, $MS_E = \\frac{SS_E}{N - k}$.
   - Estadístico de prueba:
     $$F_0 = \\frac{MS_{\\text{Trat}}}{MS_E} \\sim F_{k-1, N-k}$$
     Bajo $H_0: \\tau_1 = \\dots = \\tau_k = 0$, $\\mathbb{E}[MS_{\\text{Trat}}] = \\mathbb{E}[MS_E] = \\sigma^2$.

3. **Pruebas de Comparaciones Múltiples Post-Hoc:**
   - **Tukey HSD (Honestly Significant Difference):** Control del Error Rate por Familia (FWER):
     $$HSD = q_{\\alpha, k, N-k} \\sqrt{\\frac{MS_E}{n}}$$
     donde $q$ es la distribución del rango estudentizado.
   - **Scheffé:** Válida para cualquier contraste lineal arbitrario $\\sum c_i \\mu_i$ con $\\sum c_i = 0$.
   - **Bonferroni:** Ajuste conservador $\\alpha / \\binom{k}{2}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Ronald A. Fisher (1925)** — *Statistical Methods for Research Workers*: Invención del ANOVA y la distribución $F$.
- **Douglas C. Montgomery (2017)** — *Design and Analysis of Experiments*: Referencia canónica internacional para ANOVA industrial.
- **Hochberg & Tamhane (1987)** — *Multiple Comparison Procedures*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Comparación del rendimiento térmico de 4 tipos de catalizadores en biorrefinerías de bagazo de caña panelera, verificando mediante Tukey qué catalizadores presentan diferencias estadísticamente significativas.`,
    toolMapping: "Herramienta: Módulo ANOVA en `/tools` y visualizador de partición de varianzas."
  },
  {
    id: "ii5a3-m3",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 3,
    moduleTitle: "Principios de Diseño de Experimentos (DOE)",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño riguroso de experimentos controlados empleando los tres principios fundamentales: aleatorización, replicación y bloqueo, controlando el sesgo sistemático.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Los Tres Principios Cardinales del DOE:**
   - **Aleatorización:** Garantiza que los errores experimentales $\\epsilon_{ij}$ se comporten como variables aleatorias independientes e idénticamente distribuidas, previniendo sesgos por factores no controlados que varíen con el tiempo.
   - **Replicación:** Permite estimar la varianza intrínseca del error experimental $\\sigma^2$ y aumenta la precisión y potencia de los contrastes ($SE = s/\\sqrt{n}$).
   - **Bloqueo (Blocking):** Técnica para aislar y remover la variabilidad debida a factores perturbadores conocidos pero no de interés directo (ej. lotes de materia prima, turnos de operarios, máquinas).

2. **Diseño en Bloques Completos al Azar (RCBD):**
   $$y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}, \\quad i = 1, \\dots, a; \\quad j = 1, \\dots, b$$
   - Partición de varianza: $SS_T = SS_{\\text{Trat}} + SS_{\\text{Bloques}} + SS_E$.
   - Grados de libertad: $ab - 1 = (a - 1) + (b - 1) + (a - 1)(b - 1)$.
   - $F_{\\text{Trat}} = \\frac{MS_{\\text{Trat}}}{MS_E}$, $F_{\\text{Bloque}} = \\frac{MS_{\\text{Bloques}}}{MS_E}$.

3. **Diseños en Cuadrados Latinos ($p \\times p$):**
   Permite controlar dos fuentes de variación perturbadoras simultáneamente (Filas y Columnas) con solo $p^2$ observaciones en lugar de $p^3$:
   $$y_{ijk} = \\mu + \\alpha_i + \\tau_j + \\beta_k + \\epsilon_{ijk}$$
   $$SS_T = SS_{\\text{Filas}} + SS_{\\text{Trat}} + SS_{\\text{Columnas}} + SS_E$$
   Grados de libertad del error: $(p - 1)(p - 2)$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Fisher (1935)** — *The Design of Experiments*: Texto fundacional del bloqueo y asignación aleatoria.
- **Box, Hunter & Hunter (2005)** — *Statistics for Experimenters*: Enfoque de ingeniería práctica y aprendizaje iterativo.
- **Montgomery (2017)**: Capítulos 3 y 4 sobre RCBD y Cuadrados Latinos.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Diseño en bloques para evaluar 3 velocidades de corte en tornos paralelos, usando como factor de bloqueo los 5 lotes de acero recibidos del proveedor metalmecánico, aislando la variabilidad del material del efecto de la máquina.`,
    toolMapping: "Herramienta: Generador de Matrices Experimentales DOE y ANOVA en `/tools`."
  },
  {
    id: "ii5a3-m4",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 4,
    moduleTitle: "Pruebas No Paramétricas y Bondad de Ajuste",
    coordination: "Dr. José Soto Mejía",
    competencies: "Aplicación de pruebas libres de distribución para datos ordinales o muestras con supuestos de normalidad violados, y contrastes de bondad de ajuste Ji-cuadrado y Kolmogorov-Smirnov.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Contrastes No Paramétricos Clásicos:**
   - **Prueba de los Signos:** Basada en la distribución $\\text{Binomial}(n, 0.5)$ sobre el signo de las diferencias $x_i - \\tilde{\\mu}_0$.
   - **Prueba de Rangos con Signo de Wilcoxon (Muestras Pareadas):** Asigna rangos $|R_i|$ a las diferencias absolutas $|D_i| = |X_i - Y_i|$ y suma los rangos positivos $W^+$.
   - **Prueba U de Mann-Whitney (Suma de Rangos de Wilcoxon):** Alternativa no paramétrica a la prueba $t$ de dos muestras independientes:
     $$U_1 = R_1 - \\frac{n_1(n_1 + 1)}{2}, \\qquad U_2 = R_2 - \\frac{n_2(n_2 + 1)}{2}$$
     con $U_1 + U_2 = n_1 n_2$.
   - **Prueba de Kruskal-Wallis:** Alternativa no paramétrica al ANOVA unifactorial:
     $$H = \\frac{12}{N(N + 1)} \\sum_{i=1}^k \\frac{R_i^2}{n_i} - 3(N + 1) \\sim \\chi^2_{k-1}$$

2. **Pruebas de Bondad de Ajuste:**
   - **Ji-cuadrado de Pearson:**
     $$\\chi_0^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i} \\sim \\chi^2_{k - 1 - p}$$
     donde $O_i$ son frecuencias observadas, $E_i = n p_i$ esperadas, y $p$ parámetros estimados por MLE.
   - **Kolmogorov-Smirnov (K-S):** Máxima discrepancia absoluta entre la CDF empírica $F_n(x)$ y la teórica $F_0(x)$:
     $$D_n = \\sup_x |F_n(x) - F_0(x)|$$
   - **Anderson-Darling ($A^2$):** Pondera las colas con peso $\\frac{1}{F_0(x)(1 - F_0(x))}$, más sensible para distribuciones de confiabilidad.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Siegel & Castellan (1988)** — *Nonparametric Statistics for the Behavioral Sciences*.
- **Conover (1999)** — *Practical Nonparametric Statistics*: Texto de referencia para aplicaciones industriales.
- **Stephens (1974)** — *EDF Statistics for Goodness of Fit and Some Comparisons*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Verificación del ajuste de la distribución de tiempos de servicio en las cajas de pago de almacenes de cadena de Pereira mediante prueba K-S y Anderson-Darling, alimentando modelos de colas y simulación.`,
    toolMapping: "Herramienta: Módulo de Bondad de Ajuste K-S y $\\chi^2$ en `/tools`."
  },
  {
    id: "ii5a3-m5",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 5,
    moduleTitle: "Regresión Lineal Múltiple y Diagnóstico",
    coordination: "Dr. José Soto Mejía",
    competencies: "Construcción matricial de modelos de regresión con múltiples predictores, diagnóstico de multicolinealidad vía VIF, detección de observaciones influyentes y selección óptima de variables.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Formulación Matricial General:**
   $$\\mathbf{y} = \\mathbf{X} \\boldsymbol{\\beta} + \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(\\mathbf{0}, \\sigma^2 \\mathbf{I}_n)$$
   - Solución MCO: $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$.
   - Matriz de Proyección (Hat Matrix): $\\mathbf{H} = \\mathbf{X} (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T$, donde $\\hat{\\mathbf{y}} = \\mathbf{H} \\mathbf{y}$ y $\\mathbf{e} = (\\mathbf{I} - \\mathbf{H}) \\mathbf{y}$.
   - Matriz de covarianzas: $\\text{Cov}(\\hat{\\boldsymbol{\\beta}}) = \\sigma^2 (\\mathbf{X}^T \\mathbf{X})^{-1}$.

2. **Diagnóstico de Multicolinealidad:**
   - Factor de Inflación de la Varianza (VIF):
     $$VIF_j = \\frac{1}{1 - R_j^2}$$
     donde $R_j^2$ es el coeficiente de determinación al regresar $X_j$ sobre las restantes $k-1$ variables. Si $VIF_j > 10$, existe multicolinealidad severa.
   - Número de Condición del sistema: $\\kappa = \\sqrt{\\frac{\\lambda_{\\max}}{\\lambda_{\\min}}}$ de $\\mathbf{X}^T \\mathbf{X}$.

3. **Diagnóstico de Observaciones Influyentes:**
   - Apalancamiento (Leverage): $h_{ii} = [\\mathbf{H}]_{ii}$, con valor medio $\\bar{h} = p/n$. Punto con alto leverage si $h_{ii} > 2p/n$.
   - Distancia de Cook ($D_i$): Desplazamiento global del vector de coeficientes si se elimina la observación $i$:
     $$D_i = \\frac{(\\hat{\\boldsymbol{\\beta}}_{(i)} - \\hat{\\boldsymbol{\\beta}})^T (\\mathbf{X}^T \\mathbf{X}) (\\hat{\\boldsymbol{\\beta}}_{(i)} - \\hat{\\boldsymbol{\\beta}})}{p \\cdot MS_E} = \\frac{r_i^2}{p} \\left( \\frac{h_{ii}}{1 - h_{ii}} \\right)$$
     donde $r_i$ es el residuo estudentizado. Si $D_i > 1$, la observación es altamente influyente.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Belsley, Kuh & Welsch (1980)** — *Regression Diagnostics: Identifying Influential Data and Sources of Collinearity*.
- **Cook & Weisberg (1982)** — *Residuals and Influence in Regression*.
- **Montgomery, Peck & Vining (2012)**: Capítulos 3 y 9 sobre diagnóstico matricial.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Predicción del consumo de energía eléctrica de la planta de producción en función de toneladas procesadas, horas máquina activas y temperatura ambiental, eliminando predictores colineales mediante VIF.`,
    toolMapping: "Herramienta: Laboratorio Pyodide Wasm con NumPy para cálculo de $(\\mathbf{X}^T \\mathbf{X})^{-1}$, $\\mathbf{H}$ y distancias de Cook."
  },
  {
    id: "ii5a3-m6",
    courseCode: "II5A3",
    courseTitle: "Estadística II",
    moduleNumber: 6,
    moduleTitle: "Control Estadístico de la Calidad (SPC)",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño e interpretación de gráficos Shewhart para variables ($\\bar{X}-R, \\bar{X}-S$), evaluación de causas asignables, y cálculo de índices de capacidad del proceso ($C_p, C_{pk}, C_{pm}$).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Fundamentos de Gráficos de Control de Shewhart:**
   El principio de Walter Shewhart (1924) descompone la variabilidad del proceso en causas comunes (aleatorias) y causas asignables (especiales).
   - Límites generales $\\pm 3\\sigma$:
     $$UCL = \\mathbb{E}[W] + 3 \\sigma_W, \\qquad CL = \\mathbb{E}[W], \\qquad LCL = \\mathbb{E}[W] - 3 \\sigma_W$$

2. **Gráficos $\\bar{X} - R$ para Subgrupos Racionales (tamaño $n$):**
   - Para el gráfico de rangos $R$:
     $$UCL_R = D_4 \\bar{R}, \\qquad CL_R = \\bar{R}, \\qquad LCL_R = D_3 \\bar{R}$$
   - Estimación de la desviación poblacional: $\\hat{\\sigma} = \\frac{\\bar{R}}{d_2}$.
   - Para el gráfico de medias $\\bar{X}$:
     $$UCL_{\\bar{X}} = \\bar{\\bar{X}} + A_2 \\bar{R}, \\qquad CL_{\\bar{X}} = \\bar{\\bar{X}}, \\qquad LCL_{\\bar{X}} = \\bar{\\bar{X}} - A_2 \\bar{R}$$
     donde $A_2 = \\frac{3}{d_2 \\sqrt{n}}$.

3. **Índices de Capacidad del Proceso:**
   Con especificaciones técnicas $LSL$ (límite inferior) y $USL$ (límite superior):
   - Capacidad Potencial ($C_p$):
     $$C_p = \\frac{USL - LSL}{6\\sigma}$$
   - Capacidad Real / Centrado ($C_{pk}$):
     $$C_{pk} = \\min\\left( \\frac{USL - \\mu}{3\\sigma}, \\frac{\\mu - LSL}{3\\sigma} \\right) = C_p (1 - k), \\quad k = \\frac{|m - \\mu|}{(USL - LSL)/2}$$
   - Índice de Taguchi ($C_{pm}$): Incorpora la desviación respecto al valor objetivo (Target $T$):
     $$C_{pm} = \\frac{USL - LSL}{6 \\sqrt{\\sigma^2 + (\\mu - T)^2}}$$
   - Nivel Sigma: $Z = 3 \\cdot C_{pk}$. Nivel 6-Sigma $\\implies C_{pk} \\ge 1.5$ (3.4 PPM con corrimiento de $1.5\\sigma$).`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Walter A. Shewhart (1931)** — *Economic Control of Quality of Manufactured Product*.
- **Douglas C. Montgomery (2019)** — *Introduction to Statistical Quality Control*: Texto canónico internacional de SPC.
- **Genichi Taguchi (1986)** — *Introduction to Quality Engineering*: Definición de la función de pérdida cuadrática de Taguchi $L(y) = k(y - T)^2$.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Control de calidad en línea de llenado de envases de café liofilizado en Risaralda. Monitoreo del peso neto mediante gráficos $\\bar{X}-R$ y garantía de cumplimiento de $C_{pk} \\ge 1.33$ exigido por normatividad INVIMA.`,
    toolMapping: "Herramienta: SPC Quality Control Workbench (`/tools#spc`) con gráficos interactivos Shewhart SVG, cálculo de $C_p, C_{pk}, C_{pm}$ y exportación CSV."
  },
  {
    id: "ii6a2-m1",
    courseCode: "II6A2",
    courseTitle: "Estadística III",
    moduleNumber: 1,
    moduleTitle: "Regresión Múltiple Matricial y Selección de Variables",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Modelado econométrico avanzado, algoritmos de selección automática Stepwise, regularización Ridge y Lasso, y contrastes de autocorrelación de Durbin-Watson.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Estimación por MCO Matricial y Pruebas Generales:**
   - Hipótesis Lineal General: $H_0: \\mathbf{L} \\boldsymbol{\\beta} = \\mathbf{c}$ vs $H_1: \\mathbf{L} \\boldsymbol{\\beta} \\ne \\mathbf{c}$, con $\\mathbf{L}$ de rango $q \\le p$:
     $$F_0 = \\frac{(\\mathbf{L} \\hat{\\boldsymbol{\\beta}} - \\mathbf{c})^T [\\mathbf{L} (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{L}^T]^{-1} (\\mathbf{L} \\hat{\\boldsymbol{\\beta}} - \\mathbf{c}) / q}{MS_E} \\sim F_{q, n-p}$$

2. **Criterios de Información y Selección de Modelos:**
   - Criterio de Información de Akaike (AIC):
     $$AIC = n \\ln\\left( \\frac{SS_E}{n} \\right) + 2p$$
   - Criterio de Información Bayesiano de Schwarz (BIC):
     $$BIC = n \\ln\\left( \\frac{SS_E}{n} \\right) + p \\ln(n)$$
   - Estadístico $C_p$ de Mallows:
     $$C_p = \\frac{SS_E(p)}{\\sigma^2} - n + 2p$$
     Un modelo sin sesgo satisface $\\mathbb{E}[C_p] \\approx p$.

3. **Regresión Regularizada:**
   - **Ridge (Tikhonov / $\\ell_2$):** Resuelve la singularidad de $\\mathbf{X}^T \\mathbf{X}$ añadiendo sesgo:
     $$\\hat{\\boldsymbol{\\beta}}_{\\text{Ridge}} = (\\mathbf{X}^T \\mathbf{X} + \\lambda \\mathbf{I})^{-1} \\mathbf{X}^T \\mathbf{y}$$
   - **Lasso (Tibshirani, 1996 / $\\ell_1$):** Induce dispersión (sparsity) fijando coeficientes exactamente en cero:
     $$\\min_{\\boldsymbol{\\beta}} \\| \\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta} \\|_2^2 + \\lambda \\| \\boldsymbol{\\beta} \\|_1$$

4. **Autocorrelación de Residuos:**
   - Estadístico de Durbin-Watson ($d$):
     $$d = \\frac{\\sum_{t=2}^n (e_t - e_{t-1})^2}{\\sum_{t=1}^n e_t^2} \\approx 2(1 - \\hat{\\rho})$$
     $d \\approx 2$ ausencia de autocorrelación; $d \\to 0$ autocorrelación positiva; $d \\to 4$ autocorrelación negativa.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Robert Tibshirani (1996)** — *Regression Shrinkage and Selection via the Lasso*.
- **Hoerl & Kennard (1970)** — *Ridge Regression: Biased Estimation for Nonorthogonal Problems*.
- **Wooldridge (2019)** — *Introductory Econometrics: A Modern Approach*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Modelado econométrico del volumen de despacho de carga en terminales logísticos de Pereira usando Lasso para seleccionar las 5 variables más relevantes entre 35 macroindicadores económicos.`,
    toolMapping: "Herramienta: Laboratorio Pyodide Wasm con scikit-learn (`Ridge`, `Lasso`, `LinearRegression`)."
  },
  {
    id: "ii6a2-m2",
    courseCode: "II6A2",
    courseTitle: "Estadística III",
    moduleNumber: 2,
    moduleTitle: "Diseño de Experimentos y ANOVA Multifactorial",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Diseño y análisis de experimentos factoriales multifactoriales con interacciones de orden superior, modelos jerárquicos y de parcelas divididas (Split-Plot).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Diseño Factorial de Tres Factores ($a \\times b \\times c$):**
   $$y_{ijkl} = \\mu + \\tau_i + \\beta_j + \\gamma_k + (\\tau\\beta)_{ij} + (\\tau\\gamma)_{ik} + (\\beta\\gamma)_{jk} + (\\tau\\beta\\gamma)_{ijk} + \\epsilon_{ijkl}$$
   con $i=1..a, j=1..b, k=1..c, l=1..n$.
   - Descomposición de varianza:
     $$SS_T = SS_A + SS_B + SS_C + SS_{AB} + SS_{AC} + SS_{BC} + SS_{ABC} + SS_E$$
   - Cuadrados Medios: Cada efecto se divide por sus respectivos grados de libertad: $(a-1), (b-1), (c-1), (a-1)(b-1), \\dots$

2. **Diseños Split-Plot (Parcelas Divididas):**
   Aparecen cuando ciertos factores son difíciles de cambiar (Hard-to-Change, HTC) mientras otros son fáciles de cambiar (Easy-to-Change, ETC).
   - Posee dos errores experimentales independientes:
     * Error de parcela completa: $\\text{Whole-Plot Error } \\eta_{ij} \\sim \\mathcal{N}(0, \\sigma_{\\text{WP}}^2)$.
     * Error de subparcela: $\\text{Sub-Plot Error } \\epsilon_{ijk} \\sim \\mathcal{N}(0, \\sigma_{\\text{SP}}^2)$.
   - Los factores de parcela completa se contrastan contra $MS_{\\text{Error(WP)}}$, mientras los de subparcela se contrastan contra $MS_{\\text{Error(SP)}}$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Montgomery (2017)**: Capítulos 5 y 14 sobre experimentos de parcelas divididas y modelos mixtos.
- **Kuehl (2001)** — *Design of Experiments: Statistical Principles of Research Design and Analysis*.
- **Milliken & Johnson (2009)** — *Analysis of Messy Data: Designed Experiments*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Optimización de horneado en panificación industrial: la temperatura del horno es un factor difícil de cambiar (Parcela principal), mientras que el tiempo de amasado y dosificación de levadura se varían dentro de cada horneada (Subparcelas).`,
    toolMapping: "Herramienta: Matriz interactiva de ANOVA factorial en `/tools`."
  },
  {
    id: "ii6a2-m3",
    courseCode: "II6A2",
    courseTitle: "Estadística III",
    moduleNumber: 3,
    moduleTitle: "Control Estadístico de Calidad Avanzado",
    coordination: "Prof. César Augusto Zapata",
    competencies: "Diseño de gráficos de control de memoria EWMA y CUSUM para detección ultra-rápida de pequeños corrimientos de la media ($0.5\\sigma - 1.5\\sigma$) y gráficos multivariados $T^2$ de Hotelling.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Gráfico CUSUM (Sumas Acumuladas Tabular):**
   Diseñado por Page (1954). Acumula desviaciones respecto al valor meta $\\mu_0$:
   $$C_i^+ = \\max(0, x_i - (\\mu_0 + K) + C_{i-1}^+)$$$$C_i^- = \\max(0, (\\mu_0 - K) - x_i + C_{i-1}^-)$$
   con $C_0^+ = C_0^- = 0$.
   - Parámetro de referencia $K = \\frac{\\delta \\sigma}{2}$ para detectar un corrimiento de magnitud $\\delta$.
   - Límite de decisión $H = h \\sigma$ (típicamente $h = 4$ o $5$). Si $C_i^+ > H$ o $C_i^- > H$, el proceso está fuera de control.

2. **Gráfico EWMA (Media Móvil Ponderada Exponencialmente):**
   Diseñado por Roberts (1959). Asigna pesos geométricamente decrecientes:
   $$z_i = \\lambda x_i + (1 - \\lambda) z_{i-1}, \\quad 0 < \\lambda \\le 1, \\quad z_0 = \\mu_0$$
   - Varianza exacta en el paso $i$: $\\sigma_{z_i}^2 = \\sigma^2 \\left( \\frac{\\lambda}{2 - \\lambda} \\right) [1 - (1 - \\lambda)^{2i}]$.
   - Límites de control asintóticos ($i \\to \\infty$):
     $$UCL/LCL = \\mu_0 \\pm L \\sigma \\sqrt{\\frac{\\lambda}{2 - \\lambda}}$$
     (Típicamente $\\lambda = 0.1$ o $0.2$ y $L = 2.7$ a $3$).

3. **Gráfico Multivariado $T^2$ de Hotelling para Observaciones Individuales:**
   Vector de $p$ características de calidad correlacionadas $\\mathbf{x} \\in \\mathbb{R}^p$:
   $$T^2 = (\\mathbf{x} - \\bar{\\mathbf{x}})^T \\mathbf{S}^{-1} (\\mathbf{x} - \\bar{\\mathbf{x}}) \\sim \\frac{p(n+1)(n-1)}{n(n-p)} F_{p, n-p}$$`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **E. S. Page (1954)** — *Continuous Inspection Schemes* (Biometrika): Creación del CUSUM.
- **S. W. Roberts (1959)** — *Control Chart Tests Based on Geometric Moving Averages*.
- **Harold Hotelling (1947)** — *Multivariate Quality Control*: Fundamento del control multivariado.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Monitoreo de pureza química en refinación de bioetanol, donde corrimientos de $0.5\\sigma$ no son detectados a tiempo por gráficos de Shewhart convencionales pero son alertados en menos de 3 períodos por CUSUM y EWMA.`,
    toolMapping: "Herramienta: Módulo avanzado SPC Workbench (`/tools#spc`) y detector de corrimientos."
  }
];
