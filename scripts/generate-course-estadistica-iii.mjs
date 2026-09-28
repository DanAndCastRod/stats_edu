import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'estadistica-iii');

const courseMetadata = {
  title: "Estadística III",
  slug: "estadistica-iii",
  code: "II6A2",
  description: "Modelos lineales múltiples en notación matricial, multicolinealidad, diseño de experimentos industriales (ANOVA, DBCA, factoriales 2^k) y control estadístico de la calidad.",
  credits: 2,
  ects: 6,
  semester: 6,
  isMock: false
};

const modules = [
  {
    slug: "01-regresion-multiple-correlacion",
    metadata: {
      title: "Regresión Múltiple y Correlación",
      order: 1
    },
    lessons: [
      {
        slug: "01-modelo-lineal-multiple-matricial",
        filename: "01-modelo-lineal-multiple-matricial.mdx",
        content: `---
title: "Modelo Lineal Múltiple en Notación Matricial"
order: 1
description: "Formulación matricial del modelo de regresión lineal múltiple, estimador de MCO, matriz de proyección y propiedades estadísticas."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la expresión matricial del estimador de Mínimos Cuadrados Ordinarios (MCO) para el vector de coeficientes beta?"
    options:
      - "beta_hat = (X^T X)^(-1) X^T Y"
      - "beta_hat = X^T (X X^T)^(-1) Y"
      - "beta_hat = (X X^T)^(-1) X Y"
      - "beta_hat = X^T Y (X^T X)^(-1)"
    answer: 0
    explanation: "El estimador de MCO minimiza la suma de cuadrados de errores e^T e = (Y - X beta)^T (Y - X beta). Derivando respecto a beta e igualando a cero obtenemos las ecuaciones normales (X^T X) beta = X^T Y, cuya solución única es beta_hat = (X^T X)^(-1) X^T Y, siempre que X tenga rango de columnas completo."
  - question: "La matriz sombrero (Hat Matrix) H = X(X^T X)^(-1) X^T posee la propiedad de ser idempotente. ¿Qué significa esto matemáticamente?"
    options:
      - "H * H = H"
      - "H^T = -H"
      - "det(H) = 0 siempre"
      - "H^(-1) = H"
    answer: 0
    explanation: "Una matriz es idempotente si multiplicada por sí misma resulta en la misma matriz: H^2 = H. Esto refleja que proyectar un vector ya proyectado en el subespacio columna de X no altera el resultado: H(H Y) = H Y = Y_hat."
---

# Introducción

> En la ingeniería industrial moderna, las variables de respuesta de un proceso (e.g. rendimiento de una caldera, resistencia de un polímero o tiempo de ciclo de una línea) casi nunca dependen de un único factor. El modelo lineal múltiple permite aislar y cuantificar el efecto simultáneo de múltiples variables predictoras.

La notación matricial simplifica de forma notable el cálculo y la deducción teórica del modelo de regresión con $k$ variables explicativas y $n$ observaciones muestrales.

<Callout type="info">
**Importancia en Ingeniería:** Permite estimar relaciones empíricas complejas a partir de datos experimentales u observacionales de planta, separando la señal del proceso del ruido aleatorio inherente.
</Callout>

## Objetivos de Aprendizaje
- Expresar un sistema de regresión lineal múltiple en notación compacta matricial.
- Deducir algebraicamente el estimador de coeficientes $\\hat{\\beta}$ por Mínimos Cuadrados Ordinarios (MCO).
- Comprender el rol de la matriz de proyección ortogonal (Hat matrix) $H$ y el cálculo del vector de residuos.
- Implementar la estimación matricial completa en Python con NumPy y SciPy.

---

# Fundamentos Teóricos

El modelo lineal general con $k$ predictores para la observación $i$-ésima se define como:

$$Y_i = \\beta_0 + \\beta_1 X_{i1} + \\beta_2 X_{i2} + \\dots + \\beta_k X_{ik} + \\epsilon_i, \\quad i = 1, 2, \\dots, n$$

En forma matricial compacta:

$$Y = X\\beta + \\epsilon$$

Donde:
- $Y \\in \\mathbb{R}^{n \\times 1}$ es el vector de respuestas observadas.
- $X \\in \\mathbb{R}^{n \\times (k+1)}$ es la matriz de diseño, cuya primera columna contiene unos para el intercepto $\\beta_0$.
- $\\beta \\in \\mathbb{R}^{(k+1) \\times 1}$ es el vector de coeficientes desconocidos.
- $\\epsilon \\in \\mathbb{R}^{n \\times 1}$ es el vector de perturbaciones estocásticas, con supuestos de Gauss-Markov:
  $$\\mathbb{E}[\\epsilon] = 0, \\quad \\text{Var}(\\epsilon) = \\sigma^2 I_n$$

### Deducción del Estimador MCO

El criterio de Mínimos Cuadrados busca minimizar la suma de cuadrados residuales $S(\\beta) = e^T e$:

$$S(\\beta) = (Y - X\\beta)^T (Y - X\\beta) = Y^T Y - 2\\beta^T X^T Y + \\beta^T X^T X \\beta$$

Calculando el gradiente con respecto al vector $\\beta$ e igualando a cero:

$$\\frac{\\partial S(\\beta)}{\\partial \\beta} = -2 X^T Y + 2 X^T X \\beta = 0$$

$$(X^T X)\\hat{\\beta} = X^T Y \\implies \\hat{\\beta} = (X^T X)^{-1} X^T Y$$

### Matriz Sombrero (Hat Matrix) y Residuos

Los valores ajustados $\\hat{Y}$ se obtienen como una combinación lineal de las observaciones $Y$:

$$\\hat{Y} = X\\hat{\\beta} = X(X^T X)^{-1} X^T Y = H Y$$

La matriz $H = X(X^T X)^{-1} X^T$ es simétrica ($H^T = H$) e idempotente ($H^2 = H$). Los residuos se expresan como:

$$e = Y - \\hat{Y} = (I - H)Y$$

La varianza del estimador $\\hat{\\beta}$ es:

$$\\text{Var}(\\hat{\\beta}) = \\sigma^2 (X^T X)^{-1}$$

El estimador insesgado de la varianza residual $\\sigma^2$ es el Cuadrado Medio del Error:

$$s^2 = MSE = \\frac{e^T e}{n - (k + 1)}$$

---

# Ejemplo Práctico: Resistencia de Concreto en Planta

Un ingeniero industrial supervisa la resistencia a la compresión ($Y$, en MPa) de probetas de concreto en función del contenido de cemento ($X_1$, kg/m³) y la relación agua/cemento ($X_2$). Se cuenta con $n=6$ probetas de prueba.

### Laboratorio en Python

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# 1. Definición de datos experimentales
# X1: Cemento (kg/m3), X2: Relacion agua/cemento, Y: Resistencia (MPa)
datos = pd.DataFrame({
    'Cemento': [300, 320, 350, 380, 400, 420],
    'Agua_Cemento': [0.55, 0.52, 0.48, 0.45, 0.42, 0.40],
    'Resistencia_MPa': [25.4, 28.1, 33.6, 38.2, 42.0, 45.8]
})

n = len(datos)
k = 2  # Dos predictores

# 2. Construcción de matriz de diseño X y vector Y
X = np.column_stack([np.ones(n), datos['Cemento'], datos['Agua_Cemento']])
Y = datos['Resistencia_MPa'].values

# 3. Estimación matricial de beta: (X^T X)^(-1) X^T Y
XtX = X.T @ X
XtY = X.T @ Y
beta_hat = np.linalg.inv(XtX) @ XtY

# 4. Matriz sombrero H, valores predichos y residuos
H = X @ np.linalg.inv(XtX) @ X.T
Y_hat = H @ Y
residuos = Y - Y_hat

# 5. Varianza residual y errores estándar de los coeficientes
SSE = residuos.T @ residuos
grados_libertad = n - (k + 1)
s2 = SSE / grados_libertad
var_beta = s2 * np.linalg.inv(XtX)
se_beta = np.sqrt(np.diag(var_beta))

# 6. Estadísticos t y p-valores
t_stats = beta_hat / se_beta
p_values = [2 * (1 - stats.t.cdf(np.abs(t), df=grados_libertad)) for t in t_stats]

resultados = pd.DataFrame({
    'Parametro': ['Intercepto (beta0)', 'Cemento (beta1)', 'Agua/Cemento (beta2)'],
    'Estimacion': beta_hat,
    'Error_Estandar': se_beta,
    'Estadistico_t': t_stats,
    'p_valor': p_values
})

print("Resultados de Estimación Matricial MCO:")
print(resultados.round(4))
print(f"\\nDesviacion estandar residual s: {np.sqrt(s2):.4f} MPa")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Regresión Lineal Múltiple Matricial"
  questions={[
    {
      id: "q_mco_1",
      text: "¿Cuál es la condición algebraica necesaria para que exista solución única de MCO en beta = (X^T X)^(-1) X^T Y?",
      options: [
        { id: "a", text: "La matriz X debe tener rango de columnas completo (rango = k + 1), evitando colinealidad perfecta", isCorrect: true, explanation: "Si existe dependencia lineal exacta entre columnas de X, det(X^T X) = 0 y la matriz no es invertible." },
        { id: "b", text: "El número de observaciones n debe ser menor que el número de predictores k", isCorrect: false, explanation: "Si n < k + 1 el sistema es subdeterminado y no tiene solución única." },
        { id: "c", text: "El vector de residuos debe ser idénticamente cero en toda la muestra", isCorrect: false, explanation: "Los residuos son cero sólo en un ajuste perfecto no estocástico." }
      ]
    },
    {
      id: "q_mco_2",
      text: "La traza de la matriz sombrero H (suma de su diagonal principal) es matemáticamente igual a:",
      options: [
        { id: "a", text: "El número de parámetros estimados en el modelo, p = k + 1", isCorrect: true, explanation: "tr(H) = tr(X(X^T X)^(-1) X^T) = tr((X^T X)^(-1) X^T X) = tr(I_{k+1}) = k + 1." },
        { id: "b", text: "El número total de observaciones muestrales n", isCorrect: false, explanation: "n es la dimensión de la matriz H, no su traza." },
        { id: "c", text: "El coeficiente de determinación R^2", isCorrect: false, explanation: "R^2 es una métrica escalar de bondad de ajuste, no la traza de H." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-multicolinealidad-diagnosticos",
        filename: "02-multicolinealidad-diagnosticos.mdx",
        content: `---
title: "Multicolinealidad y Diagnósticos del Modelo"
order: 2
description: "Detección de multicolinealidad con VIF, evaluación de supuestos mediante análisis de residuos y distancia de Cook."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué indica un Factor de Inflación de la Varianza (VIF) superior a 10 en un predictor de regresión?"
    options:
      - "Grave problema de multicolinealidad que infla artificialmente la varianza del coeficiente estimado"
      - "Que la variable es completamente independiente de todas las demás en el modelo"
      - "Que el modelo tiene un coeficiente de determinación R² superior al 99%"
      - "Que los residuos del modelo violan el supuesto de normalidad"
    answer: 0
    explanation: "Un VIF > 10 indica que más del 90% de la varianza del predictor está explicada linealmente por los otros predictores (R_j^2 > 0.90), ocasionando estimaciones inestables y errores estándar inflados."
  - question: "¿Qué supuesto de Gauss-Markov evalúa primordialmente el estadístico de Durbin-Watson?"
    options:
      - "Independencia (ausencia de autocorrelación de primer orden en los residuos)"
      - "Homocedasticidad de la varianza del error"
      - "Normalidad univariada de la variable dependiente"
      - "Linealidad de los parámetros estructurales"
    answer: 0
    explanation: "El test de Durbin-Watson contrasta la hipótesis nula de ausencia de autocorrelación serial de primer orden en los residuos; valores cercanos a 2 indican independencia."
---

# Introducción

> Un modelo de regresión puede tener un $R^2$ elevado del 95% y sin embargo ser inútil para la toma de decisiones si sus predictores están altamente correlacionados entre sí. En este escenario, los coeficientes oscilan erráticamente y los signos pueden contradecir las leyes de la física o la ingeniería.

La multicolinealidad ocurre cuando dos o más variables independientes comparten información redundante. El diagnóstico integral implica revisar multicolinealidad, normalidad de residuos, homocedasticidad y puntos influyentes.

<Callout type="warning">
**Alerta Industrial:** Si ajustas un modelo con temperatura en °C y temperatura en °F simultáneamente, la matriz $X^T X$ será singular. La colinealidad no perfecta pero alta (e.g. correlación $r = 0.98$ entre velocidad de husillo y temperatura de corte) destruye la precisión inferencial.
</Callout>

## Objetivos de Aprendizaje
- Calcular e interpretar el Factor de Inflación de la Varianza ($VIF$) para cada regresor.
- Validar los cuatro supuestos fundamentales de los residuos: Linealidad, Homocedasticidad, Normalidad e Independencia.
- Identificar observaciones atípicas e influyentes mediante la Distancia de Cook y los valores de apalancamiento (leverage).

---

# Fundamentos Teóricos

### Factor de Inflación de la Varianza (VIF)

Para cada predictor $X_j$, se ajusta una regresión auxiliar de $X_j$ contra los restantes $k-1$ predictores, obteniendo su coeficiente de determinación $R_j^2$:

$$VIF_j = \\frac{1}{1 - R_j^2} = \\frac{1}{\\text{Tolerancia}_j}$$

- $VIF_j = 1$: Independencia completa respecto a los demás predictores.
- $1 < VIF_j < 5$: Colinealidad moderada, generalmente aceptable.
- $VIF_j > 10$: Multicolinealidad severa. La varianza del estimador $\\hat{\\beta}_j$ está multiplicada por 10 o más.

### Coeficiente de Determinación Ajustado ($R^2_{\\text{adj}}$)

El $R^2$ ordinario siempre crece al añadir variables, incluso si son ruido aleatorio. El $R^2$ ajustado penaliza por cada variable agregada:

$$R^2 = 1 - \\frac{SSE}{SST}$$

$$R^2_{\\text{adj}} = 1 - \\left( \\frac{SSE / (n - k - 1)}{SST / (n - 1)} \\right) = 1 - (1 - R^2)\\frac{n - 1}{n - k - 1}$$

### Diagnóstico de Residuos

1. **Homocedasticidad:** Varianza de residuos constante $\\text{Var}(\\epsilon_i) = \\sigma^2$. Se evalúa con la prueba de Breusch-Pagan y el gráfico de residuos estandarizados vs. valores predichos $\\hat{Y}$.
2. **Normalidad:** Residuos distribuidos normalmente $\\epsilon \\sim \\mathcal{N}(0, \\sigma^2 I)$. Se evalúa con el test de Shapiro-Wilk y gráficos Q-Q normal.
3. **Independencia:** Ausencia de autocorrelación serial, evaluada con el estadístico de Durbin-Watson:
   $$DW = \\frac{\\sum_{t=2}^n (e_t - e_{t-1})^2}{\\sum_{t=1}^n e_t^2} \\approx 2(1 - r_1)$$
   Valores cercanos a 2 indican ausencia de autocorrelación.

### Distancia de Cook ($D_i$)

Mide la influencia global de la observación $i$ sobre todos los coeficientes del modelo si fuera omitida:

$$D_i = \\frac{\\sum_{j=1}^n (\\hat{Y}_j - \\hat{Y}_{j(i)})^2}{(k + 1) MSE} = \\frac{r_i^2}{k + 1} \\left( \\frac{h_{ii}}{1 - h_{ii}} \\right)$$

Donde $r_i$ es el residuo estudentizado y $h_{ii}$ es el leverage diagonal de la matriz sombrero $H$. Valores $D_i > 1$ o $D_i > 4/n$ señalan observaciones críticas influyentes.

---

# Laboratorio en Python: Diagnóstico de Proceso de Extrusión

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# Datos de proceso de extrusión de tubería plástica (n=12 lotes)
np.random.seed(42)
temp_horno = np.array([180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235])
presion_bar = 0.8 * temp_horno + np.random.normal(0, 1.5, size=12)  # Alta colinealidad con temp
velocidad_tornillo = np.array([45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72])
# Variable de respuesta: Rugosidad superficial (micrones)
rugosidad = 120 - 0.25*temp_horno - 0.15*presion_bar + 0.4*velocidad_tornillo + np.random.normal(0, 0.8, size=12)

df = pd.DataFrame({
    'Temp': temp_horno,
    'Presion': presion_bar,
    'Velocidad': velocidad_tornillo,
    'Rugosidad': rugosidad
})

# Matriz de predictores (con intercepto)
X = np.column_stack([np.ones(len(df)), df[['Temp', 'Presion', 'Velocidad']].values])
Y = df['Rugosidad'].values
n, p = X.shape

# Estimación MCO
beta = np.linalg.inv(X.T @ X) @ (X.T @ Y)
Y_hat = X @ beta
residuos = Y - Y_hat
SSE = np.sum(residuos**2)
SST = np.sum((Y - np.mean(Y))**2)
R2 = 1 - SSE / SST
R2_adj = 1 - (1 - R2) * (n - 1) / (n - p)

# Cálculo de VIF para cada variable independiente
predictores = ['Temp', 'Presion', 'Velocidad']
vifs = []
for i, col in enumerate(predictores):
    otras = [c for c in predictores if c != col]
    X_aux = np.column_stack([np.ones(n), df[otras].values])
    Y_aux = df[col].values
    beta_aux = np.linalg.inv(X_aux.T @ X_aux) @ (X_aux.T @ Y_aux)
    r2_aux = 1 - np.sum((Y_aux - X_aux @ beta_aux)**2) / np.sum((Y_aux - np.mean(Y_aux))**2)
    vif = 1 / (1 - r2_aux) if r2_aux < 0.9999 else 999
    vifs.append(vif)

# Matriz sombrero y Distancia de Cook
H = X @ np.linalg.inv(X.T @ X) @ X.T
leverage = np.diag(H)
MSE = SSE / (n - p)
s_residuos = residuos / np.sqrt(MSE * (1 - leverage))
cooks_d = (s_residuos**2 / p) * (leverage / (1 - leverage))

# Prueba de Shapiro-Wilk para normalidad de residuos
shapiro_stat, shapiro_p = stats.shapiro(residuos)

# Estadístico Durbin-Watson
dw_stat = np.sum(np.diff(residuos)**2) / SSE

print("=== DIAGNÓSTICO DEL MODELO DE REGRESIÓN ===")
print(f"R²: {R2:.4f} | R² Ajustado: {R2_adj:.4f}")
print("\\nFactores de Inflación de la Varianza (VIF):")
for col, v in zip(predictores, vifs):
    estado = "ALERTA (Colineal)" if v > 10 else "Aceptable"
    print(f"  {col}: VIF = {v:.2f} [{estado}]")

print(f"\\nPrueba de Normalidad de Residuos (Shapiro-Wilk): p-valor = {shapiro_p:.4f}")
print(f"Estadístico Durbin-Watson: {dw_stat:.4f} (Ideal cercano a 2)")
print(f"Observaciones con Cook's D > 4/n ({4/n:.3f}): {np.where(cooks_d > 4/n)[0]}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Multicolinealidad y Diagnósticos"
  questions={[
    {
      id: "q_diag_1",
      text: "Si el VIF entre dos variables de temperatura y presión es de 18.5, ¿cuál es la mejor recomendación para el ingeniero?",
      options: [
        { id: "a", text: "Eliminar una de las variables redundantes o combinarlas en un índice adimensional compuesto (e.g. mediante PCA o análisis físico)", isCorrect: true, explanation: "Eliminar una de las variables altamente correlacionadas o aplicar reducción de dimensionalidad estabiliza los coeficientes sin perder capacidad explicativa." },
        { id: "b", text: "Duplicar el tamaño de muestra sin modificar los predictores", isCorrect: false, explanation: "Aumentar la muestra no resuelve la colinealidad estructural entre las dos variables." },
        { id: "c", text: "Forzar el intercepto beta_0 a cero", isCorrect: false, explanation: "Eliminar el intercepto introduce sesgo grave y distorsiona el cálculo del R^2." }
      ]
    },
    {
      id: "q_diag_2",
      text: "¿Por qué el R² ajustado puede disminuir cuando se añade una nueva variable predictora al modelo?",
      options: [
        { id: "a", text: "Porque el incremento en varianza explicada no compensa la pérdida de un grado de libertad en el denominador del error", isCorrect: true, explanation: "R^2_adj penaliza la inclusión de variables que no aportan reducción estadísticamente significativa de la suma de cuadrados de error SSE." },
        { id: "b", text: "Porque la suma total de cuadrados SST se incrementa", isCorrect: false, explanation: "SST depende únicamente de Y y permanece fija ante cualquier cambio en los predictores." },
        { id: "c", text: "Porque el error estándar de los residuos se reduce automáticamente a cero", isCorrect: false, explanation: "Si el error estándar fuera cero, el ajuste sería perfecto y el R^2 sería 1." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-diseno-experimentos-anova",
    metadata: {
      title: "Diseño de Experimentos y ANOVA",
      order: 2
    },
    lessons: [
      {
        slug: "01-anova-un-factor-dbca",
        filename: "01-anova-un-factor-dbca.mdx",
        content: `---
title: "ANOVA de un Factor y Bloques Completos al Azar (DBCA)"
order: 1
description: "Partición de sumas de cuadrados, prueba F de Fisher-Snedecor, pruebas post-hoc de Tukey HSD y control de fuentes de variabilidad externa con DBCA."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la hipótesis nula fundamental en un análisis de varianza (ANOVA) de un factor con k tratamientos?"
    options:
      - "H0: mu_1 = mu_2 = ... = mu_k (todas las medias poblacionales de los tratamientos son iguales)"
      - "H0: Todas las varianzas muestrales son idénticas a cero"
      - "H0: Al menos un par de medias difiere significativamente"
      - "H0: La correlación entre tratamientos es igual a 1"
    answer: 0
    explanation: "La hipótesis nula postula que los k tratamientos no tienen efecto diferencial sobre la media de la variable de respuesta: H0: mu_1 = mu_2 = ... = mu_k."
  - question: "¿Cuál es el propósito primordial de utilizar un Diseño de Bloques Completos al Azar (DBCA) en lugar de un Diseño Completamente al Azar (DCA)?"
    options:
      - "Aislar y controlar una fuente conocida de variabilidad extraña o ruido (bloque) para reducir la varianza del error experimental"
      - "Aumentar artificialmente los grados de libertad del error"
      - "Evitar realizar pruebas de comparaciones múltiples de Tukey"
      - "Garantizar que todos los tratamientos tengan media cero"
    answer: 0
    explanation: "El bloqueo extrae la variabilidad atribuible a un factor perturbador conocido (e.g. operador, turno, lote de materia prima) del error experimental, aumentando la potencia de la prueba F para detectar diferencias reales entre tratamientos."
---

# Introducción

> ¿Es una nueva fórmula química superior a las tres existentes en el mercado? Para responder rigurosamente sin inflar la tasa de error Tipo I mediante múltiples pruebas $t$ de Student por parejas, la estadística industrial recurre al **Análisis de Varianza (ANOVA)**.

Desarrollado inicialmente por Ronald A. Fisher, el ANOVA descompone la variabilidad total observada en componentes atribuibles a tratamientos específicos y a perturbaciones aleatorias.

<Callout type="info">
**Principio de Fisher:** Cuando sospechamos que un factor externo incontrolable (como el lote del proveedor o el operador) afectará los resultados, agrupamos las unidades experimentales en **bloques homogéneos** (DBCA).
</Callout>

## Objetivos de Aprendizaje
- Descomponer la Suma Total de Cuadrados ($SST$) en Suma de Cuadrados de Tratamientos ($SSTr$) y Suma de Cuadrados del Error ($SSE$).
- Construir e interpretar la tabla ANOVA clásica y contrastar la prueba $F$.
- Ejecutar la prueba post-hoc de Tukey de Diferencia Honestamente Significativa (HSD).
- Formular el modelo lineal de Bloques Completos al Azar (DBCA) e implementarlo en Python.

---

# Fundamentos Teóricos

### Modelo Lineal de un Factor (Efectos Fijos)

$$Y_{ij} = \\mu + \\tau_i + \\epsilon_{ij}, \\quad i = 1, \\dots, k; \\quad j = 1, \\dots, n$$

Donde $\\mu$ es la media global, $\\tau_i$ es el efecto del tratamiento $i$ (con restricción $\\sum \\tau_i = 0$), y $\\epsilon_{ij} \\sim \\mathcal{N}(0, \\sigma^2)$ son errores aleatorios independientes.

### Partición Fundamental de la Variabilidad

$$SST = SSTr + SSE$$

$$\\sum_{i=1}^k \\sum_{j=1}^n (Y_{ij} - \\bar{Y}_{\\cdot\\cdot})^2 = n \\sum_{i=1}^k (\\bar{Y}_{i\\cdot} - \\bar{Y}_{\\cdot\\cdot})^2 + \\sum_{i=1}^k \\sum_{j=1}^n (Y_{ij} - \\bar{Y}_{i\\cdot})^2$$

Grados de libertad:
- Tratamientos: $df_{Tr} = k - 1$
- Error: $df_E = N - k = k(n - 1)$
- Total: $df_T = N - 1$

El estadístico de prueba es el cociente de cuadrados medios:

$$F_0 = \\frac{MSTr}{MSE} = \\frac{SSTr / (k - 1)}{SSE / (N - k)} \\sim \\mathcal{F}_{k-1, N-k}$$

Si $F_0 > F_{\\alpha, k-1, N-k}$ (o el $p$-valor $< \\alpha$), se rechaza $H_0$ y se concluye que al menos un tratamiento genera una media diferente.

### Diseño de Bloques Completos al Azar (DBCA)

Cuando existe un factor de bloqueo con $b$ niveles (e.g. 4 máquinas distintas):

$$Y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}$$

$$SST = SSTr + SSBloques + SSE$$

$$F_{Tr} = \\frac{MSTr}{MSE} = \\frac{SSTr / (k - 1)}{SSE / ((k - 1)(b - 1))}$$

---

# Laboratorio en Python: Resistencia a la Tensión por Aleación y Turno

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# Experimento DBCA: 3 tipos de aleación (Tratamientos) probadas en 4 turnos (Bloques)
data = {
    'Aleacion': ['A1', 'A1', 'A1', 'A1', 'A2', 'A2', 'A2', 'A2', 'A3', 'A3', 'A3', 'A3'],
    'Turno': ['T1', 'T2', 'T3', 'T4', 'T1', 'T2', 'T3', 'T4', 'T1', 'T2', 'T3', 'T4'],
    'Tension_MPa': [420, 425, 418, 430, 445, 452, 440, 458, 410, 415, 408, 422]
}
df = pd.DataFrame(data)

k = df['Aleacion'].nunique()  # 3 tratamientos
b = df['Turno'].nunique()     # 4 bloques
N = len(df)                  # 12 observaciones

media_global = df['Tension_MPa'].mean()
SST = np.sum((df['Tension_MPa'] - media_global)**2)

# Suma de cuadrados de Tratamientos (Aleación)
medias_trat = df.groupby('Aleacion')['Tension_MPa'].mean()
SSTr = b * np.sum((medias_trat - media_global)**2)

# Suma de cuadrados de Bloques (Turno)
medias_bloq = df.groupby('Turno')['Tension_MPa'].mean()
SSBloq = k * np.sum((medias_bloq - media_global)**2)

# Error residual
SSE = SST - SSTr - SSBloq

# Grados de libertad
df_Tr = k - 1
df_Bloq = b - 1
df_Error = (k - 1) * (b - 1)

MSTr = SSTr / df_Tr
MSBloq = SSBloq / df_Bloq
MSE = SSE / df_Error

F_trat = MSTr / MSE
p_trat = 1 - stats.f.cdf(F_trat, df_Tr, df_Error)

F_bloq = MSBloq / MSE
p_bloq = 1 - stats.f.cdf(F_bloq, df_Bloq, df_Error)

tabla_anova = pd.DataFrame({
    'Fuente de Variacion': ['Tratamientos (Aleacion)', 'Bloques (Turno)', 'Error Experimental', 'Total'],
    'Suma de Cuadrados (SS)': [SSTr, SSBloq, SSE, SST],
    'Grados de Libertad (df)': [df_Tr, df_Bloq, df_Error, N - 1],
    'Cuadrado Medio (MS)': [MSTr, MSBloq, MSE, np.nan],
    'Estadistico F': [F_trat, F_bloq, np.nan, np.nan],
    'p-valor': [p_trat, p_bloq, np.nan, np.nan]
})

print("TABLA ANOVA DE BLOQUES COMPLETOS AL AZAR (DBCA):")
print(tabla_anova.to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: ANOVA y Bloques Completos al Azar"
  questions={[
    {
      id: "q_anova_1",
      text: "Si se comparan 4 tipos de resina sintética con 5 réplicas por tratamiento en un DCA, ¿cuántos grados de libertad tiene el error experimental?",
      options: [
        { id: "a", text: "16 grados de libertad: k(n - 1) = 4 * (5 - 1) = 16", isCorrect: true, explanation: "Con k=4 y n=5, N=20. Los grados de libertad del error son N - k = 20 - 4 = 16." },
        { id: "b", text: "3 grados de libertad: k - 1 = 3", isCorrect: false, explanation: "3 son los grados de libertad de tratamientos, no del error." },
        { id: "c", text: "19 grados de libertad: N - 1 = 19", isCorrect: false, explanation: "19 es el número total de grados de libertad." }
      ]
    },
    {
      id: "q_anova_2",
      text: "¿Por qué no se debe utilizar múltiples pruebas t de Student independientes en lugar de un ANOVA para comparar 5 medias?",
      options: [
        { id: "a", text: "Porque se infla drásticamente la tasa de error global Tipo I (alfa global = 1 - (1 - alfa)^c)", isCorrect: true, explanation: "Para 5 grupos hay 10 comparaciones por parejas. Si alfa = 0.05, el riesgo acumulado de falso positivo asciende a 1 - (0.95)^10 = 40.1%." },
        { id: "b", text: "Porque la distribución t no puede calcularse en muestras con más de 20 datos", isCorrect: false, explanation: "La distribución t es perfectamente válida con cualquier tamaño muestral." },
        { id: "c", text: "Porque la prueba t exige que las medias sean estrictamente negativas", isCorrect: false, explanation: "No existe ninguna restricción de signo para aplicar pruebas t." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-disenos-factoriales",
        filename: "02-disenos-factoriales.mdx",
        content: `---
title: "Diseños Factoriales 2^k y Análisis de Interacción"
order: 2
description: "Estructura de diseños factoriales de dos niveles, cálculo de efectos principales, interacciones sinérgicas y antagónicas y optimización de procesos."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué representa el concepto de 'interacción' entre dos factores A y B en un diseño experimental?"
    options:
      - "Que el efecto del factor A sobre la variable de respuesta depende del nivel en el que se encuentre el factor B"
      - "Que ambos factores tienen exactamente el mismo coeficiente de correlación lineal"
      - "Que los factores son colineales y deben descartarse del análisis"
      - "Que el error experimental se reduce a cero de forma espontánea"
    answer: 0
    explanation: "Existe interacción estadística entre dos factores cuando el cambio en la respuesta media al pasar del nivel bajo al alto del factor A varía en magnitud o signo según el nivel del factor B."
  - question: "En un diseño factorial completo 2^3 con n = 2 réplicas por combinación, ¿cuántas corridas experimentales totales se requieren?"
    options:
      - "16 corridas (2^3 = 8 tratamientos x 2 réplicas = 16)"
      - "6 corridas (3 factores x 2 réplicas)"
      - "12 corridas (2^3 + 4)"
      - "24 corridas (8 x 3)"
    answer: 0
    explanation: "Un diseño 2^3 tiene 2 x 2 x 2 = 8 combinaciones de tratamiento. Con n = 2 réplicas independientes, el número total de unidades experimentales es 8 x 2 = 16."
---

# Introducción

> La mayoría de los fracasos en optimización industrial ocurren por la falacia del método clásico de "un factor a la vez" (OFAT: *One-Factor-At-A-Time*). Si la temperatura óptima de un reactor depende de la presión operativa, variar la temperatura manteniendo fija la presión jamás encontrará el óptimo global del sistema.

Los **diseños factoriales** investigan simultáneamente todas las combinaciones posibles de los niveles de dos o más factores, permitiendo cuantificar los efectos de interacción que impulsan la competitividad de las plantas de manufactura.

<Callout type="info">
**Notación de Yates:** En diseños $2^k$, los factores se codifican como $-1$ (nivel bajo) y $+1$ (nivel alto). El tratamiento donde todos los factores están en su nivel bajo se denota como $(1)$, mientras que las letras minúsculas $a, b, ab$ indican los factores que se encuentran en su nivel alto.
</Callout>

## Objetivos de Aprendizaje
- Comprender la ventaja competitiva y estadística de los experimentos factoriales frente a la estrategia OFAT.
- Calcular efectos principales y efectos de interacción doble y triple en diseños $2^k$.
- Formular la tabla ANOVA factorial y evaluar la significancia de los términos.
- Interpretar gráficos de interacción para detectar sinergias y antagonismos entre variables.

---

# Fundamentos Teóricos

### El Diseño Factorial $2^2$

Consideremos dos factores $A$ y $B$, cada uno en dos niveles ($-1$ y $+1$), con $n$ réplicas por tratamiento:

| Combinación | Factor A | Factor B | Notación Yates | Total de Respuesta |
| :---: | :---: | :---: | :---: | :---: |
| 1 | $-$ | $-$ | $(1)$ | $y_{(1)}$ |
| 2 | $+$ | $-$ | $a$ | $y_a$ |
| 3 | $-$ | $+$ | $b$ | $y_b$ |
| 4 | $+$ | $+$ | $ab$ | $y_{ab}$ |

### Cálculo de Efectos y Contrastes

El **efecto principal** del factor $A$ es la diferencia media en la respuesta cuando $A$ pasa de su nivel bajo a su nivel alto:

$$\\text{Efecto}(A) = \\frac{1}{2n} [ab + a - b - (1)]$$

El **efecto de interacción** $AB$ es la mitad de la diferencia entre el efecto de $A$ en el nivel alto de $B$ y el efecto de $A$ en el nivel bajo de $B$:

$$\\text{Efecto}(AB) = \\frac{1}{2n} [ab + (1) - a - b]$$

### Sumas de Cuadrados

Para cualquier factor o interacción con contraste $C$:

$$SS = \\frac{C^2}{n \\cdot 2^k}$$

$$SS_A = \\frac{[ab + a - b - (1)]^2}{4n}, \\quad SS_{AB} = \\frac{[ab + (1) - a - b]^2}{4n}$$

La Suma Total de Cuadrados se particiona en:

$$SST = SS_A + SS_B + SS_{AB} + SSE$$

---

# Laboratorio en Python: Rendimiento en Moldeo por Inyección

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# Experimento 2^2 con n=3 réplicas
# Factor A: Temperatura del molde (140°C vs 180°C)
# Factor B: Presión de inyección (80 bar vs 120 bar)
# Variable de respuesta: Resistencia al impacto (Joules)
datos_2k = pd.DataFrame({
    'Corrida': range(1, 13),
    'A': [-1,  1, -1,  1, -1,  1, -1,  1, -1,  1, -1,  1],
    'B': [-1, -1,  1,  1, -1, -1,  1,  1, -1, -1,  1,  1],
    'Respuesta': [
        18.2, 24.5, 20.1, 31.4,  # Réplica 1
        17.9, 23.8, 19.5, 30.8,  # Réplica 2
        18.5, 24.1, 20.6, 31.9   # Réplica 3
    ]
})

n = 3
k = 2
N = n * (2**k)

# Contrastes de efectos
datos_2k['AB'] = datos_2k['A'] * datos_2k['B']

contraste_A = np.sum(datos_2k['A'] * datos_2k['Respuesta'])
contraste_B = np.sum(datos_2k['B'] * datos_2k['Respuesta'])
contraste_AB = np.sum(datos_2k['AB'] * datos_2k['Respuesta'])

efecto_A = contraste_A / (n * 2**(k - 1))
efecto_B = contraste_B / (n * 2**(k - 1))
efecto_AB = contraste_AB / (n * 2**(k - 1))

# Sumas de cuadrados
SSA = (contraste_A**2) / N
SSB = (contraste_B**2) / N
SSAB = (contraste_AB**2) / N

media_total = datos_2k['Respuesta'].mean()
SST = np.sum((datos_2k['Respuesta'] - media_total)**2)
SSE = SST - SSA - SSB - SSAB

df_efectos = 1
df_error = N - 2**k

MSE = SSE / df_error

tabla_2k = pd.DataFrame({
    'Fuente': ['Factor A (Temperatura)', 'Factor B (Presión)', 'Interacción AB', 'Error', 'Total'],
    'Efecto': [efecto_A, efecto_B, efecto_AB, np.nan, np.nan],
    'SS': [SSA, SSB, SSAB, SSE, SST],
    'df': [df_efectos, df_efectos, df_efectos, df_error, N - 1],
    'MS': [SSA, SSB, SSAB, MSE, np.nan],
    'F_0': [SSA/MSE, SSB/MSE, SSAB/MSE, np.nan, np.nan],
    'p_valor': [
        1 - stats.f.cdf(SSA/MSE, 1, df_error),
        1 - stats.f.cdf(SSB/MSE, 1, df_error),
        1 - stats.f.cdf(SSAB/MSE, 1, df_error),
        np.nan, np.nan
    ]
})

print("ANÁLISIS EXPERIMENTAL FACTORIAL 2^2:")
print(tabla_2k.round(4).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Diseños Factoriales 2^k"
  questions={[
    {
      id: "q_fact_1",
      text: "Si en un gráfico de interacción las líneas correspondientes a los dos niveles del factor B son perfectamente paralelas, esto significa que:",
      options: [
        { id: "a", text: "No existe interacción entre los factores A y B (el efecto de A es idéntico en ambos niveles de B)", isCorrect: true, explanation: "Líneas paralelas reflejan independencia de efectos: el efecto de A no depende del nivel de B. Cruces o pendientes divergentes indican interacción significativa." },
        { id: "b", text: "La interacción entre A y B es estadísticamente máxima y significativa", isCorrect: false, explanation: "Al contrario, el paralelismo es la firma gráfica de interacción nula." },
        { id: "c", text: "El modelo no cumple el supuesto de normalidad", isCorrect: false, explanation: "El paralelismo de medias no tiene relación directa con la distribución de residuos." }
      ]
    },
    {
      id: "q_fact_2",
      text: "¿Por qué el principio de escasez de efectos (sparsity of effects) es fundamental en la industria?",
      options: [
        { id: "a", text: "Porque la mayor parte de la respuesta del sistema es explicada por efectos principales e interacciones de bajo orden (orden 2), permitiendo fraccionar experimentos", isCorrect: true, explanation: "El principio postula que las interacciones de orden 3 o superior suelen ser despreciables físicamente, justificando los diseños factoriales fraccionados 2^(k-p)." },
        { id: "b", text: "Porque obliga a que los experimentos nunca tengan réplicas", isCorrect: false, explanation: "Las réplicas siempre son deseables para estimar con precisión el error puro." },
        { id: "c", text: "Porque asegura que todos los factores tengan p-valores idénticos", isCorrect: false, explanation: "Los factores tendrán p-valores diferentes según su impacto en el proceso." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "03-control-estadistico-calidad",
    metadata: {
      title: "Control Estadístico de Calidad",
      order: 3
    },
    lessons: [
      {
        slug: "01-graficos-control-variables-atributos",
        filename: "01-graficos-control-variables-atributos.mdx",
        content: `---
title: "Gráficos de Control por Variables y Atributos"
order: 1
description: "Cartas de control de Shewhart para variables continuas (X-barra, R) y atributos (p, c, u), causas comunes vs especiales y reglas de Western Electric."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la distinción fundamental entre 'causas comunes' y 'causas especiales' de variación según Walter Shewhart?"
    options:
      - "Las causas comunes son inherentes y estables del proceso (ruido blanco); las causas especiales son perturbaciones externas identificables y eliminables"
      - "Las causas comunes siempre generan productos no conformes; las especiales mejoran la productividad"
      - "Las causas comunes se eliminan despidiendo al operador; las especiales modificando la máquina"
      - "Las causas comunes solo ocurren en variables continuas; las especiales en atributos"
    answer: 0
    explanation: "Las causas comunes forman parte estable del sistema técnico y ambiental (variación natural). Las causas especiales son eventos anómalos (herramienta rota, lote defectuoso) que deben detectarse y corregirse rápidamente."
  - question: "¿Qué tipo de gráfico de control por atributos se utiliza cuando el tamaño del subgrupo n varía y se cuenta la fracción o proporción de artículos no conformes?"
    options:
      - "Gráfico p con límites de control variables"
      - "Gráfico c de defectos totales"
      - "Gráfico X-barra de medias continuas"
      - "Gráfico R de rangos muestrales"
    answer: 0
    explanation: "El gráfico p monitorea la proporción p = d/n de unidades defectuosas. Si n varía entre lotes, los límites de control 3-sigma se recalculan para cada subgrupo."
---

# Introducción

> "En Dios confiamos; todos los demás deben traer datos". La frase icónica de W. Edwards Deming resume el espíritu del **Control Estadístico de Procesos (SPC)**. La intervención reactiva basada en corazonadas produce el fenómeno de "sobreajuste" (tampering), aumentando la variabilidad en lugar de reducirla.

Las cartas de control creadas por Walter Shewhart en los laboratorios Bell en 1924 distinguen objetivamente si una fluctuación es variación natural del proceso o señal de una perturbación imputable.

<Callout type="info">
**Límites 3-Sigma:** Los límites de control superior e inferior ($UCL$ y $LCL$) se ubican a $\\pm 3\\sigma$ de la línea central. Si el proceso está bajo control estadístico y se distribuye normalmente, el 99.73% de los puntos caerán dentro de los límites por puro azar.
</Callout>

## Objetivos de Aprendizaje
- Distinguir entre causas comunes y especiales de variabilidad industrial.
- Diseñar e interpretar cartas de control por variables: $\\bar{X}$ (media) y $R$ (rango).
- Construir cartas de control por atributos: gráfico $p$ (fracción defectuosa), $c$ (defectos por lote constante) y $u$ (defectos por unidad variable).
- Aplicar las reglas de decisión de Western Electric para detección temprana de patrones no aleatorios.

---

# Fundamentos Teóricos

### Gráficos por Variables: $\\bar{X}$ y $R$

Se toman $m$ subgrupos racionales, cada uno de tamaño $n$ (típicamente $n = 4$ o $5$). Para cada subgrupo $i$:

$$\\bar{X}_i = \\frac{1}{n} \\sum_{j=1}^n X_{ij}, \\quad R_i = \\max(X_i) - \\min(X_i)$$

Línea central y límites para el gráfico $R$:

$$CL_R = \\bar{R} = \\frac{1}{m} \\sum_{i=1}^m R_i$$

$$UCL_R = D_4 \\bar{R}, \\quad LCL_R = D_3 \\bar{R}$$

Línea central y límites para el gráfico $\\bar{X}$ (utilizando los factores tabulados $A_2$ de ASTM):

$$CL_X = \\bar{\\bar{X}} = \\frac{1}{m} \\sum_{i=1}^m \\bar{X}_i$$

$$UCL_X = \\bar{\\bar{X}} + A_2 \\bar{R}, \\quad LCL_X = \\bar{\\bar{X}} - A_2 \\bar{R}$$

### Gráficos por Atributos: Gráfico $p$

Si se inspeccionan $n_i$ piezas y se encuentran $d_i$ defectuosas, la fracción no conforme es $\\hat{p}_i = d_i / n_i$:

$$\\bar{p} = \\frac{\\sum d_i}{\\sum n_i}$$

$$UCL = \\bar{p} + 3 \\sqrt{\\frac{\\bar{p}(1 - \\bar{p})}{n_i}}, \\quad LCL = \\max\\left(0, \\bar{p} - 3 \\sqrt{\\frac{\\bar{p}(1 - \\bar{p})}{n_i}}\\right)$$

---

# Laboratorio en Python: Monitoreo de Diámetro de Pistón ($\bar{X}-R$)

\`\`\`python
import numpy as np
import pandas as pd

# Datos de 10 subgrupos racionales (n=5 pistones por subgrupo en mm)
np.random.seed(101)
datos_piston = np.array([
    [75.02, 75.01, 74.98, 75.04, 75.00],
    [74.99, 75.03, 75.02, 75.01, 74.97],
    [75.05, 75.00, 75.01, 75.02, 75.03],
    [74.97, 74.98, 75.00, 75.01, 74.99],
    [75.01, 75.04, 75.03, 75.02, 75.00],
    [75.03, 75.01, 74.99, 75.02, 75.05],
    [74.98, 75.00, 75.01, 75.02, 74.99],
    [75.06, 75.04, 75.05, 75.03, 75.07],  # Alerta: posible corrimiento
    [75.04, 75.05, 75.03, 75.06, 75.04],
    [75.02, 75.01, 75.00, 75.03, 75.02]
])

m, n = datos_piston.shape
medias_subgrupo = np.mean(datos_piston, axis=1)
rangos_subgrupo = np.ptp(datos_piston, axis=1)

# Factores ASTM para n = 5
A2 = 0.577
D3 = 0.000
D4 = 2.114

# Parámetros Carta R
R_barra = np.mean(rangos_subgrupo)
UCL_R = D4 * R_barra
LCL_R = D3 * R_barra

# Parámetros Carta X-barra
X_doble_barra = np.mean(medias_subgrupo)
UCL_X = X_doble_barra + A2 * R_barra
LCL_X = X_doble_barra - A2 * R_barra

df_control = pd.DataFrame({
    'Subgrupo': range(1, m + 1),
    'Media': medias_subgrupo,
    'Rango': rangos_subgrupo,
    'LCL_X': LCL_X,
    'CL_X': X_doble_barra,
    'UCL_X': UCL_X,
    'Fuera_X': (medias_subgrupo > UCL_X) | (medias_subgrupo < LCL_X)
})

print(f"LÍMITES CARTA R: LCL={LCL_R:.4f}, CL={R_barra:.4f}, UCL={UCL_R:.4f}")
print(f"LÍMITES CARTA X-BARRA: LCL={LCL_X:.4f}, CL={X_doble_barra:.4f}, UCL={UCL_X:.4f}")
print("\\nEvaluación de Subgrupos:")
print(df_control[['Subgrupo', 'Media', 'CL_X', 'UCL_X', 'Fuera_X']])
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Gráficos de Control Shewhart"
  questions={[
    {
      id: "q_spc_1",
      text: "¿Por qué en un análisis de cartas X-barra y R siempre se debe verificar primero la estabilidad de la carta R antes de interpretar la carta X-barra?",
      options: [
        { id: "a", text: "Porque los límites de la carta X-barra dependen directamente de R-barra; si la dispersión es inestable, los límites de la media carecen de sentido estadístico", isCorrect: true, explanation: "La estimación de sigma proviene de R-barra/d2. Si el proceso tiene causas especiales de variabilidad en amplitud (R fuera de control), el cálculo de límites para X-barra es inválido." },
        { id: "b", text: "Porque el rango siempre se calcula con fórmulas más sencillas que la media", isCorrect: false, explanation: "La simplicidad de cálculo no es la justificación estadística de la precedencia analítica." },
        { id: "c", text: "Porque la carta R solo se aplica cuando el tamaño de muestra n es superior a 100", isCorrect: false, explanation: "Para n > 10 se recomienda la carta S (desviación estándar), no R." }
      ]
    },
    {
      id: "q_spc_2",
      text: "La Regla 2 de Western Electric alerta de una anomalía en el proceso cuando ocurren:",
      options: [
        { id: "a", text: "9 (u 8) puntos consecutivos del mismo lado de la línea central", isCorrect: true, explanation: "La probabilidad de 9 puntos consecutivos en un mismo lado bajo puro azar es (0.5)^9 = 0.00195 (muy improbable), indicando un sesgo o desplazamiento sistemático de la media." },
        { id: "b", text: "1 punto dentro de 1 sigma de la media", isCorrect: false, explanation: "Esto es comportamiento completamente normal y esperado." },
        { id: "c", text: "Oscilaciones periódicas constantes", isCorrect: false, explanation: "El patrón de 8-9 puntos consecutivos en un lado detecta corrimiento del centrado." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-capacidad-proceso-cp-cpk",
        filename: "02-capacidad-proceso-cp-cpk.mdx",
        content: `---
title: "Análisis de Capacidad de Proceso: Índices Cp, Cpk y Cpm"
order: 2
description: "Evaluación de la aptitud técnica del proceso frente a especificaciones de ingeniería, cálculo de Cp, Cpk, Cpm y nivel Sigma."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué significa que un proceso tenga Cp = 1.33 pero Cpk = 0.80?"
    options:
      - "Que el proceso tiene la precisión potencial suficiente para cumplir especificaciones, pero está descentrado hacia uno de los límites de tolerancia"
      - "Que el proceso tiene dispersión excesiva y no puede cumplir tolerancias bajo ninguna circunstancia"
      - "Que los límites de especificación son más estrechos que 6 sigma"
      - "Que la distribución del proceso no es normal"
    answer: 0
    explanation: "Cp mide la capacidad potencial (ancho de tolerancia vs 6-sigma natural). Cpk evalúa el centrado real considerando la distancia de la media al límite más próximo. Si Cp > 1 pero Cpk < 1, el proceso es capaz pero está descentrado."
  - question: "¿Cuál es la tasa de partes defectuosas por millón (PPM) asociada tradicionalmente a un proceso Seis Sigma con desplazamiento de 1.5 sigma en el largo plazo?"
    options:
      - "3.4 PPM"
      - "2700 PPM"
      - "0.001 PPM"
      - "66807 PPM"
    answer: 0
    explanation: "Bajo la métrica de Motorola de 6 Sigma con un corrimiento típico de 1.5 sigma en la media a largo plazo, el área fuera de especificaciones es de 3.4 partes por millón (PPM)."
---

# Introducción

> Un proceso puede estar en perfecto "control estadístico" (estable y predecible en el tiempo) y al mismo tiempo estar fabricando 100% de productos chatarra si sus especificaciones técnicas de diseño son más estrechas que la dispersión natural del proceso.

El **Análisis de Capacidad de Proceso** vincula la voz del proceso (variabilidad natural $6\\sigma$) con la voz del cliente (especificaciones de ingeniería $USL$ y $LSL$).

<Callout type="info">
**Regla de Oro:** Un proceso industrial moderno de Clase Mundial o automotriz exige un $C_{pk} \\ge 1.67$, mientras que para procesos industriales convencionales el estándar mínimo de aceptación es $C_{pk} \\ge 1.33$.
</Callout>

## Objetivos de Aprendizaje
- Distinguir entre Límites de Control (voz del proceso) y Límites de Especificación (voz del cliente).
- Calcular e interpretar los índices de capacidad potencial ($C_p$) y capacidad real ($C_{pk}$).
- Evaluar el índice de Taguchi ($C_{pm}$) que penaliza desviaciones respecto al valor nominal objetivo ($T$).
- Convertir índices de capacidad a Partes por Millón defectuosas (PPM) y nivel Z-Sigma.

---

# Fundamentos Teóricos

Sean:
- $USL$: Límite de Especificación Superior (*Upper Specification Limit*).
- $LSL$: Límite de Especificación Inferior (*Lower Specification Limit*).
- $\\mu$: Media del proceso en estado de control.
- $\\sigma$: Desviación estándar del proceso a corto plazo (estimada mediante $\\bar{R}/d_2$ o $\\bar{S}/c_4$).

### Índice de Capacidad Potencial ($C_p$)

Evalúa el ancho relativo de las especificaciones respecto a la dispersión natural $6\\sigma$:

$$C_p = \\frac{USL - LSL}{6\\sigma}$$

- $C_p < 1.0$: Proceso no capaz (genera piezas defectuosas incluso si está perfectamente centrado).
- $1.0 \\le C_p < 1.33$: Proceso marginalmente capaz.
- $C_p \\ge 1.33$: Proceso satisfactorio y capaz.

### Índice de Capacidad Real ($C_{pk}$)

Penaliza el alejamiento de la media $\\mu$ respecto a las especificaciones:

$$C_{pu} = \\frac{USL - \\mu}{3\\sigma}, \\quad C_{pl} = \\frac{\\mu - LSL}{3\\sigma}$$

$$C_{pk} = \\min(C_{pu}, C_{pl}) = C_p (1 - k)$$

Donde $k = \\frac{|T - \\mu|}{(USL - LSL)/2}$ es el factor de descentrado respecto al valor objetivo $T$.

### Índice de Taguchi ($C_{pm}$)

Incorpora explícitamente la pérdida de calidad cuadrática cuando la media se aleja del valor objetivo nominal $T$:

$$\\tau^2 = \\mathbb{E}[(X - T)^2] = \\sigma^2 + (\\mu - T)^2$$

$$C_{pm} = \\frac{USL - LSL}{6\\tau} = \\frac{USL - LSL}{6\\sqrt{\\sigma^2 + (\\mu - T)^2}} = \\frac{C_p}{\\sqrt{1 + \\left(\\frac{\\mu - T}{\\sigma}\\right)^2}}$$

---

# Laboratorio en Python: Capacidad de Fabricación de Ejes

\`\`\`python
import numpy as np
from scipy import stats

# Parámetros de especificación para diámetro de eje (mm)
USL = 20.05
LSL = 19.95
Target = 20.00  # Nominal ideal

# Muestra de 100 ejes medidos en planta
np.random.seed(42)
mu_real = 20.015  # Desplazado ligeramente hacia USL
sigma_real = 0.012
datos = np.random.normal(mu_real, sigma_real, size=100)

mu_hat = np.mean(datos)
s_hat = np.std(datos, ddof=1)

# Cálculo de Índices
Cp = (USL - LSL) / (6 * s_hat)
Cpu = (USL - mu_hat) / (3 * s_hat)
Cpl = (mu_hat - LSL) / (3 * s_hat)
Cpk = min(Cpu, Cpl)

# Taguchi Cpm
tau = np.sqrt(s_hat**2 + (mu_hat - Target)**2)
Cpm = (USL - LSL) / (6 * tau)

# Fracción defectuosa esperada y PPM
p_defectos_sup = 1 - stats.norm.cdf(USL, loc=mu_hat, scale=s_hat)
p_defectos_inf = stats.norm.cdf(LSL, loc=mu_hat, scale=s_hat)
p_total = p_defectos_sup + p_defectos_inf
ppm = p_total * 1_000_000

# Nivel Z-Sigma
z_sigma = stats.norm.ppf(1 - p_total) if p_total > 0 else 6.0

print("=== REPORTE DE CAPACIDAD DE PROCESO ===")
print(f"Media Muestral: {mu_hat:.4f} mm | Desviacion: {s_hat:.4f} mm")
print(f"Tolerancia Total: {USL - LSL:.4f} mm | Dispersion 6-Sigma: {6 * s_hat:.4f} mm")
print(f"Cp  (Capacidad Potencial): {Cp:.3f}")
print(f"Cpk (Capacidad Real):      {Cpk:.3f}")
print(f"Cpm (Indice de Taguchi):   {Cpm:.3f}")
print(f"PPM Estimadas:             {ppm:.1f} partes por millon")
print(f"Nivel Sigma del Proceso:   {z_sigma:.2f} Sigma")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Capacidad de Proceso"
  questions={[
    {
      id: "q_cap_1",
      text: "Si un proceso presenta Cp = 1.60 y Cpk = 1.60 exactamente, ¿qué conclusión geométrica e inferencial es correcta?",
      options: [
        { id: "a", text: "La media del proceso coincide de forma exacta con el punto medio de los límites de especificación (T = (USL + LSL)/2)", isCorrect: true, explanation: "Cuando Cp = Cpk, el factor de descentrado k es cero, lo que implica que mu está exactamente en el centro de las tolerancias." },
        { id: "b", text: "El proceso tiene un 5% de unidades defectuosas garantizadas", isCorrect: false, explanation: "Con Cpk = 1.60 la tasa de defectos es inferior a 1 PPM." },
        { id: "c", text: "El límite superior USL es igual a 0", isCorrect: false, explanation: "USL no tiene por qué ser cero; define la cota técnica superior." }
      ]
    },
    {
      id: "q_cap_2",
      text: "¿Por qué el índice de Taguchi Cpm es más riguroso y preferido en ingeniería de precisión frente a Cpk?",
      options: [
        { id: "a", text: "Porque penaliza cualquier desviación respecto al valor nominal ideal T, reconociendo que alejarse del blanco genera costo social de pérdida de calidad", isCorrect: true, explanation: "Según la función de pérdida de Taguchi L(y) = k(y - T)^2, cualquier desviación del valor objetivo es indeseable aunque caiga dentro de los límites de tolerancia." },
        { id: "b", text: "Porque asume que la tolerancia es infinita", isCorrect: false, explanation: "Taguchi trabaja con tolerancias finitas definidas por el cliente." },
        { id: "c", text: "Porque no requiere calcular la desviación estándar", isCorrect: false, explanation: "Cpm requiere calcular tau = sqrt(sigma^2 + (mu - T)^2)." }
      ]
    }
  ]}
/>
`
      }
    ]
  }
];

function build() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(BASE_DIR, 'metadata.json'), JSON.stringify(courseMetadata, null, 2));

  for (const mod of modules) {
    const modDir = path.join(BASE_DIR, mod.slug);
    if (!fs.existsSync(modDir)) {
      fs.mkdirSync(modDir, { recursive: true });
    }
    fs.writeFileSync(path.join(modDir, 'metadata.json'), JSON.stringify(mod.metadata, null, 2));

    for (const lesson of mod.lessons) {
      fs.writeFileSync(path.join(modDir, lesson.filename), lesson.content);
    }
  }
  console.log("✅ Curso estadistica-iii generado con éxito!");
}

build();
