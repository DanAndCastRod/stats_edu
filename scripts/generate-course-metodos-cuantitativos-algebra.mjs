import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'metodos-cuantitativos-algebra');

const courseMetadata = {
  title: "Métodos Cuantitativos y Álgebra Matricial",
  slug: "metodos-cuantitativos-algebra",
  code: "CB213",
  description: "Álgebra matricial aplicada, resolución de sistemas lineales Ax = b, factorización LU y Cholesky, autovalores, autovectores, gradientes y matrices hessianas en optimización convexa.",
  credits: 3,
  ects: 6,
  semester: 2,
  isMock: false
};

const modules = [
  {
    slug: "01-algebra-lineal-matricial",
    metadata: {
      title: "Álgebra Lineal Matricial",
      order: 1
    },
    lessons: [
      {
        slug: "01-operaciones-matriciales-determinantes",
        filename: "01-operaciones-matriciales-determinantes.mdx",
        content: `---
title: "Operaciones Matriciales, Determinantes e Inversas"
order: 1
description: "Álgebra de matrices en R^{m x n}, producto matricial, propiedades de determinantes, cálculo de inversas y número de condición kappa(A)."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué condición algebraica necesaria y suficiente determina que una matriz cuadrada A de orden n x n sea invertible (no singular)?"
    options:
      - "Su determinante es estrictamente distinto de cero: det(A) != 0 (y equivalentemente tiene rango completo rango(A) = n)"
      - "La suma de todos sus elementos es positiva"
      - "Es una matriz diagonal de números enteros"
      - "Tiene ceros en su diagonal principal"
    answer: 0
    explanation: "Una matriz cuadrada A es invertible si y solo si det(A) != 0, lo cual equivale a decir que sus vectores columna son linealmente independientes y su núcleo (kernel) contiene únicamente el vector cero."
  - question: "¿Qué mide el Número de Condición kappa(A) = ||A|| * ||A^(-1)|| de una matriz en computación científica e ingeniería?"
    options:
      - "La sensibilidad o estabilidad numérica del sistema ante pequeñas perturbaciones o errores de redondeo en los datos de entrada"
      - "El número exacto de iteraciones que tomará resolver el sistema"
      - "La dimensión del espacio vectorial"
      - "La cantidad de memoria RAM requerida"
    answer: 0
    explanation: "Un número de condición elevado (matriz mal condicionada, kappa(A) >> 1) indica que pequeñísimas variaciones o imprecisiones de redondeo en los datos producen errores monumentales en la solución calculada."
---

# Introducción

> En la ingeniería industrial contemporánea, los problemas rara vez involucran 2 o 3 variables. Una refinería petrolera balancea miles de flujos de masa simultáneos; un modelo de programación lineal asigna recursos a través de 50,000 restricciones; y un algoritmo de aprendizaje automático entrena matrices con millones de pesos. El **Álgebra Matricial** es el lenguaje computacional universal de la optimización y la analítica.

Una matriz no es solo una tabla rectangular de números; representa una **transformación lineal** entre espacios vectoriales $\\mathbb{R}^n \\to \\mathbb{R}^m$.

<Callout type="info">
**Estabilidad Numérica:** En computación real con aritmética de punto flotante de 64 bits (IEEE 754), calcular la inversa explícita $A^{-1}$ es una pésima práctica por costo computacional $\\mathcal{O}(n^3)$ y amplificación de error. En su lugar, los ingenieros resuelven sistemas mediante factorizaciones matriciales directas.
</Callout>

## Objetivos de Aprendizaje
- Dominar el álgebra matricial: producto interno, producto externo, transpuesta y traza.
- Comprender el significado geométrico del determinante como factor de dilatación volumétrica.
- Calcular matrices inversas mediante la adjunta y eliminación gaussiana.
- Evaluar el número de condición $\\kappa(A)$ y la estabilidad de sistemas en Python con NumPy.

---

# Fundamentos Teóricos

### Multiplicación Matricial

Sean $A \\in \\mathbb{R}^{m \\times p}$ y $B \\in \\mathbb{R}^{p \\times n}$. El producto $C = AB \\in \\mathbb{R}^{m \\times n}$ tiene por elemento genérico:

$$c_{ij} = \\sum_{k=1}^p a_{ik} b_{kj}$$

Propiedades clave:
- No conmutativo en general: $AB \\ne BA$.
- Asociativo: $(AB)C = A(BC)$.
- Transpuesta del producto: $(AB)^T = B^T A^T$.

### Propiedades Fundamentales de los Determinantes

Para matrices cuadradas $A, B \\in \\mathbb{R}^{n \\times n}$:
1. $\\det(AB) = \\det(A) \\cdot \\det(B)$
2. $\\det(A^T) = \\det(A)$
3. $\\det(A^{-1}) = \\frac{1}{\\det(A)}$
4. $\\det(c A) = c^n \\det(A)$ para cualquier escalar $c \\in \\mathbb{R}$.

Geométricamente, $|\\det(A)|$ representa el hipervolumen del paralelepípedo generado por los vectores columna de $A$ en $\\mathbb{R}^n$. Si $\\det(A) = 0$, los vectores son linealmente dependientes y el volumen colapsa a una dimensión inferior.

### Número de Condición $\\kappa(A)$

Dada una norma matricial subordinada $\\|\\cdot\\|$:

$$\\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\| \\ge 1$$

En la resolución de $Ax = b$, si el término independiente sufre una perturbación $\\delta b$, el error relativo inducido en la solución $\\delta x$ satisface:

$$\\frac{\\|\\delta x\\|}{\\|x\\|} \\le \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}$$

Si $\\kappa(A) \\approx 1$, la matriz está **bien condicionada**. Si $\\kappa(A) > 10^6$, la matriz está **mal condicionada** y los resultados computacionales pierden cifras significativas de precisión.

---

# Laboratorio en Python: Operaciones Matriciales y Análisis de Condición

\`\`\`python
import numpy as np
import pandas as pd

# 1. Definición de Matrices de Balance de Masa en Planta
A = np.array([
    [4.0, 2.0, 1.0],
    [2.0, 5.0, 2.0],
    [1.0, 2.0, 6.0]
])

B = np.array([
    [10.0, 2.0],
    [3.0,  8.0],
    [1.0,  4.0]
])

# Multiplicación matricial C = A @ B
C = A @ B

# Determinante, Rango y Traza
det_A = np.linalg.det(A)
rango_A = np.linalg.matrix_rank(A)
traza_A = np.trace(A)

# Inversa explícita A^(-1)
A_inv = np.linalg.inv(A)

# Comprobación de identidad: A @ A^(-1) = I
identidad_check = np.allclose(A @ A_inv, np.eye(3))

# 2. Análisis del Número de Condición kappa(A)
kappa_A = np.linalg.cond(A)

# Matriz Mal Condicionada (casi singular, ejemplo Hilbert 4x4)
from scipy.linalg import hilbert
H4 = hilbert(4)
kappa_H4 = np.linalg.cond(H4)

print("=== PROPIEDADES DE LA MATRIZ DE PLANTA A ===")
print(f"Determinante: det(A) = {det_A:.4f}")
print(f"Rango de Columnas: {rango_A} (Rango Completo: {rango_A == 3})")
print(f"Traza: tr(A) = {traza_A:.2f}")
print(f"Número de Condición kappa(A): {kappa_A:.2f} (Bien condicionada)")
print(f"Inversión verificada matemáticamente: {identidad_check}")

print(f"\\n=== COMPARACIÓN CON MATRIZ MAL CONDICIONADA (Hilbert 4x4) ===")
print(f"Número de Condición kappa(H4): {kappa_H4:,.1f}")
print("Alerta: kappa >> 1,000,000. Pequeños errores de redondeo destruyen la solución.")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Álgebra Matricial y Determinantes"
  questions={[
    {
      id: "q_mat_1",
      text: "Si para una matriz cuadrada A de tamaño 3x3 se sabe que det(A) = 5, ¿cuál es el determinante de la matriz 2*A?",
      options: [
        { id: "a", text: "40 (det(c*A) = c^n * det(A) = 2^3 * 5 = 8 * 5 = 40)", isCorrect: true, explanation: "Al multiplicar una matriz n x n por un escalar c, el escalar se factoriza de cada una de sus n filas, por lo que det(c A) = c^n det(A) = 2^3 * 5 = 40." },
        { id: "b", text: "10 (2 * 5 = 10)", isCorrect: false, explanation: "Multiplicar por c solo multiplica una fila por c; para toda la matriz es c^n." },
        { id: "c", text: "25", isCorrect: false, explanation: "Cálculo incorrecto." }
      ]
    },
    {
      id: "q_mat_2",
      text: "¿Por qué una matriz con determinante det(A) = 0.0000001 puede en realidad estar perfectamente bien condicionada?",
      options: [
        { id: "a", text: "Porque el determinante depende de la escala de las unidades de medida (ej. cambiar metros a kilómetros eleva det por 10^(-3n)), mientras que kappa(A) es invariante a la escala global", isCorrect: true, explanation: "det(0.1 * I_10) = 10^(-10) es pequeñísimo, pero la matriz identidad escalada está perfectamente condicionada con kappa = 1.0." },
        { id: "b", text: "Porque el determinante siempre es positivo", isCorrect: false, explanation: "El determinante puede ser negativo." },
        { id: "c", text: "Porque el número de condición no usa la inversa", isCorrect: false, explanation: "kappa(A) depende directamente de la norma de la inversa." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-sistemas-lineales-factorizacion-lu",
        filename: "02-sistemas-lineales-factorizacion-lu.mdx",
        content: `---
title: "Sistemas de Ecuaciones Lineales Ax = b y Factorización LU"
order: 2
description: "Teorema de Rouché-Capelli, eliminación de Gauss-Jordan, descomposición matricial LU (A = LU) con sustitución progresiva y regresiva, y Cholesky."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la principal ventaja algorítmica de descomponer una matriz en A = L * U para resolver Ax = b frente a la eliminación gaussiana directa?"
    options:
      - "Permite resolver múltiples sistemas con la misma matriz A y diferentes vectores b con costo O(n^2) en lugar de repetir la eliminación O(n^3) en cada corrida"
      - "Elimina la necesidad de realizar sumas y multiplicaciones"
      - "Solo funciona si b es el vector nulo"
      - "Garantiza que la matriz sea diagonal"
    answer: 0
    explanation: "Una vez factorizada A = L U (costo O(2/3 n^3)), cualquier nuevo vector de demanda o carga b se resuelve en dos pasos ultrarrápidos de sustitución: L y = b (progresiva) y U x = y (regresiva), con costo O(n^2)."
  - question: "¿Qué teorema establece la clasificación formal de existencia y unicidad de soluciones de un sistema lineal según los rangos matriciales?"
    options:
      - "Teorema de Rouché-Capelli (o Rouché-Frobenius)"
      - "Teorema de Pitágoras"
      - "Teorema del Límite Central"
      - "Teorema de Bayes"
    answer: 0
    explanation: "El Teorema de Rouché-Capelli postula: si rango(A) = rango([A|b]) = n, solución única (compatible determinado); si rango(A) = rango([A|b]) < n, infinitas soluciones; si rango(A) < rango([A|b]), incompatible (sin solución)."
---

# Introducción

> Resolver el balance de energía de una planta química o las fuerzas en una estructura reticular de almacén requiere hallar el vector de incógnitas $x$ que satisface simultáneamente el sistema de ecuaciones lineales $Ax = b$.

Aunque la regla de Cramer es didáctica en bachillerato, su costo factorial $\\mathcal{O}((n+1)!)$ la hace inservible: resolver un sistema de 30 variables con Cramer tomaría más tiempo que la edad del universo. La **Eliminación Gaussiana** y la **Factorización LU** son los motores numéricos de alto rendimiento de la ingeniería.

<Callout type="info">
**Factorización $LU$:** Descompone la matriz cuadrada $A$ en el producto de una matriz triangular inferior unitaria $L$ (*Lower*) y una matriz triangular superior $U$ (*Upper*): $A = LU$.
</Callout>

## Objetivos de Aprendizaje
- Clasificar sistemas de ecuaciones lineales mediante el Teorema de Rouché-Capelli.
- Comprender el algoritmo de Eliminación de Gauss con pivoteo parcial.
- Deducir y aplicar la Descomposición Matricial $LU$ ($A = LU$) y el método de Cholesky ($A = L L^T$).
- Implementar la resolución de sistemas lineales de gran escala en Python con SciPy.

---

# Fundamentos Teóricos

### El Teorema de Rouché-Capelli

Sea el sistema lineal de $m$ ecuaciones con $n$ incógnitas:

$$Ax = b$$

Sea $[A \\mid b]$ la matriz aumentada.
1. **Sistema Incompatible (Sin solución):**
   $$\\text{rango}(A) < \\text{rango}([A \\mid b])$$
2. **Sistema Compatible Determinado (Solución única):**
   $$\\text{rango}(A) = \\text{rango}([A \\mid b]) = n$$
3. **Sistema Compatible Indeterminado (Infinitas soluciones, $n - r$ grados de libertad):**
   $$\\text{rango}(A) = \\text{rango}([A \\mid b]) = r < n$$

### Algoritmo de Factorización $LU$

Dada $A \\in \\mathbb{R}^{n \\times n}$ (con pivoteo $P A = L U$):

$$A = L U$$

$$\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ l_{21} & 1 & 0 \\\\ l_{31} & l_{32} & 1 \\end{bmatrix} \\begin{bmatrix} u_{11} & u_{12} & u_{13} \\\\ 0 & u_{22} & u_{23} \\\\ 0 & 0 & u_{33} \\end{bmatrix}$$

Para resolver $Ax = b$:
1. Se sustituye $A = LU$: $L(Ux) = b$.
2. Se define el vector intermedio $y = Ux$ y se resuelve por **sustitución progresiva** (de arriba hacia abajo):
   $$Ly = b$$
3. Se resuelve para $x$ por **sustitución regresiva** (de abajo hacia arriba):
   $$Ux = y$$

---

# Laboratorio en Python: Factorización LU y Descomposición de Cholesky

\`\`\`python
import numpy as np
import pandas as pd
from scipy import linalg

# Sistema de distribución de cargas en una red logística (3 nodos):
# 3 x_1 + 2 x_2 -   x_3 = 10
# 2 x_1 - 2 x_2 + 4 x_3 = -2
# -x_1 + 0.5 x_2 - x_3 = 0

A = np.array([
    [ 3.0,  2.0, -1.0],
    [ 2.0, -2.0,  4.0],
    [-1.0,  0.5, -1.0]
])

b = np.array([10.0, -2.0, 0.0])

# 1. Factorización LU con Pivoteo: P @ A = L @ U
P, L, U = linalg.lu(A)

print("MATRIZ L (Triangular Inferior Unitaria):")
print(np.round(L, 3))
print("\\nMATRIZ U (Triangular Superior):")
print(np.round(U, 3))

# 2. Resolución en dos pasos: L y = P @ b  -->  U x = y
y = linalg.solve_triangular(L, P @ b, lower=True)
x = linalg.solve_triangular(U, y, lower=False)

# Verificación con solver directo de SciPy
x_directo = np.linalg.solve(A, b)

print(f"\\nSolución Vectorial x calculada vía LU: {np.round(x, 4)}")
print(f"Solución Vectorial vía np.linalg.solve: {np.round(x_directo, 4)}")
print(f"Error residual ||Ax - b||: {np.linalg.norm(A @ x - b):.2e}")

# 3. Factorización de Cholesky (para matrices Simétricas y Definidas Positivas): A_sym = L @ L.T
A_sym = np.array([
    [4.0, 2.0, 1.0],
    [2.0, 5.0, 3.0],
    [1.0, 3.0, 6.0]
])
L_cholesky = linalg.cholesky(A_sym, lower=True)
print("\\nFACTORIZACIÓN DE CHOLESKY (A_sym = L @ L^T):")
print(np.round(L_cholesky, 3))
print("Verificación Cholesky:", np.allclose(L_cholesky @ L_cholesky.T, A_sym))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Sistemas Lineales y Factorización LU"
  questions={[
    {
      id: "q_lu_1",
      text: "Si la matriz aumentada [A|b] de un sistema de 4 variables tiene rango(A) = 3 y rango([A|b]) = 4, ¿qué nos dice el Teorema de Rouché-Capelli?",
      options: [
        { id: "a", text: "El sistema es Incompatible: no existe ninguna combinación de variables que satisfaga las ecuaciones simultáneamente", isCorrect: true, explanation: "Cuando el rango de la matriz de coeficientes es menor que el rango de la matriz aumentada, existe al menos una contradicción matemática (e.g. 0 = 5)." },
        { id: "b", text: "El sistema tiene solución única", isCorrect: false, explanation: "Requiere que ambos rangos sean iguales a 4." },
        { id: "c", text: "El sistema tiene infinitas soluciones con 1 grado de libertad", isCorrect: false, explanation: "Requiere que ambos rangos sean iguales a 3." }
      ]
    },
    {
      id: "q_lu_2",
      text: "¿Bajo qué condición matemática puede aplicarse la Descomposición de Cholesky A = L L^T en lugar de la factorización LU ordinaria?",
      options: [
        { id: "a", text: "La matriz A debe ser estrictamente Simétrica y Definida Positiva (x^T A x > 0 para todo x != 0)", isCorrect: true, explanation: "Cholesky aprovecha la simetría y definición positiva para calcular una única matriz triangular L, reduciendo a la mitad el tiempo de cómputo y el uso de memoria respecto a LU." },
        { id: "b", text: "La matriz debe tener todos sus elementos iguales a 1", isCorrect: false, explanation: "Esa matriz sería singular de rango 1." },
        { id: "c", text: "Solo aplica para matrices con determinante negativo", isCorrect: false, explanation: "Toda matriz definida positiva tiene determinante estrictamente positivo." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-autovalores-optimizacion-cuantitativa",
    metadata: {
      title: "Autovalores y Optimización Cuantitativa",
      order: 2
    },
    lessons: [
      {
        slug: "01-autovalores-autovectores-diagonalizacion",
        filename: "01-autovalores-autovectores-diagonalizacion.mdx",
        content: `---
title: "Autovalores, Autovectores y Diagonalización de Matrices"
order: 1
description: "Ecuación característica det(A - lambda*I) = 0, teorema espectral, multiplicidad algebraica y geométrica, y diagonalización A = P D P^(-1)."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Cómo se define formalmente un autovector v != 0 y su autovalor asociado lambda para una transformación lineal gobernada por la matriz A?"
    options:
      - "A * v = lambda * v (la acción de la matriz sobre el vector no altera su dirección, únicamente lo escala por el factor lambda)"
      - "A * v = 0 siempre"
      - "v * A = lambda"
      - "det(A) * v = lambda"
    answer: 0
    explanation: "Un autovector v representa una dirección invariante de la transformación: aplicar la matriz A equivale a una simple homotecia o multiplicación escalar por lambda: A v = lambda v."
  - question: "¿Qué afirma el Teorema Espectral para matrices reales simétricas (A = A^T)?"
    options:
      - "Todos sus autovalores son estrictamente reales y siempre existe una base ortonormal completa de autovectores que diagonaliza ortogonalmente a A (A = Q D Q^T)"
      - "Todos sus autovalores son imaginarios puros"
      - "La matriz nunca es invertible"
      - "El determinante es siempre igual a 1"
    answer: 0
    explanation: "El teorema espectral garantiza que toda matriz real simétrica es diagonalizable ortogonalmente mediante una matriz ortogonal Q (donde Q^(-1) = Q^T) y sus autovalores son todos números reales."
---

# Introducción

> ¿Hacia dónde se concentran las mayores vibraciones de un puente grúa en una nave industrial? ¿Cómo reduce el algoritmo PCA (*Principal Component Analysis*) un conjunto de 20 variables de calidad a solo 2 factores clave sin perder información? La respuesta matemática en ambos casos radica en el **análisis espectral de autovalores y autovectores**.

Cuando una matriz multiplica a un vector genérico, típicamente lo rota y cambia su longitud. Sin embargo, existen direcciones privilegiadas en las que la matriz **solo dilata o contrae el vector sin rotarlo**: estos son los **autovectores**.

<Callout type="info">
**Potencias de Matrices:** Diagonalizar una matriz $A = P D P^{-1}$ permite calcular potencias gigantescas $A^k = P D^k P^{-1}$ de forma instantánea, elevando simplemente los elementos diagonales de $D$ a la potencia $k$.
</Callout>

## Objetivos de Aprendizaje
- Plantear y resolver la ecuación característica $\\det(A - \\lambda I) = 0$.
- Calcular el espacio propio (*eigenspace*) asociado a cada autovalor.
- Comprender las condiciones de diagonalizabilidad (multiplicidad geométrica = multiplicidad algebraica).
- Aplicar la descomposición espectral en Python con NumPy.

---

# Fundamentos Teóricos

### La Ecuación Característica

Buscamos vectores no nulos $v \\ne 0$ tales que:

$$A v = \\lambda v \\iff (A - \\lambda I) v = 0$$

Para que este sistema homogéneo tenga soluciones no triviales ($v \\ne 0$), el operador debe ser singular:

$$p(\\lambda) = \\det(A - \\lambda I) = 0$$

Este es el **polinomio característico** de grado $n$, cuyas raíces son los autovalores $\\{\\lambda_1, \\dots, \\lambda_n\\}$.

### Propiedades Espectrales Clave

1. La suma de los autovalores es igual a la traza de la matriz:
   $$\\sum_{i=1}^n \\lambda_i = \\text{tr}(A)$$
2. El producto de los autovalores es igual al determinante:
   $$\\prod_{i=1}^n \\lambda_i = \\det(A)$$

### Diagonalización

Si $A$ posee $n$ autovectores linealmente independientes $\\{v_1, \\dots, v_n\\}$, formamos la matriz de paso $P = [v_1 \\mid v_2 \\mid \\dots \\mid v_n]$ y la matriz diagonal $D = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$:

$$A P = P D \\implies A = P D P^{-1}$$

Para cualquier potencia entera $k$:

$$A^k = P D^k P^{-1} = P \\begin{bmatrix} \\lambda_1^k & & 0 \\\\ & \\ddots & \\\\ 0 & & \\lambda_n^k \\end{bmatrix} P^{-1}$$

---

# Laboratorio en Python: Descomposición Espectral y Potencias de Matrices

\`\`\`python
import numpy as np
import pandas as pd

# Matriz de covarianzas de un proceso de manufactura (simétrica)
Sigma = np.array([
    [4.0, 1.5, 0.5],
    [1.5, 3.0, 1.0],
    [0.5, 1.0, 2.0]
])

# 1. Cálculo de Autovalores y Autovectores
autovalores, autovectores = np.linalg.eigh(Sigma)  # 'eigh' optimizado para matrices simétricas/hermitianas

# Ordenar de mayor a menor varianza explicada
idx_orden = np.argsort(autovalores)[::-1]
autovalores = autovalores[idx_orden]
autovectores = autovectores[:, idx_orden]

# 2. Verificación de Propiedades Espectrales
traza_real = np.trace(Sigma)
suma_lambdas = np.sum(autovalores)

det_real = np.linalg.det(Sigma)
prod_lambdas = np.prod(autovalores)

# 3. Reconstrucción Espectral: Sigma = Q @ D @ Q.T
D = np.diag(autovalores)
Q = autovectores
Sigma_reconstruida = Q @ D @ Q.T

# 4. Potenciación Ultrarrápida: Sigma^10
Sigma_pot_10 = Q @ np.diag(autovalores**10) @ Q.T

print("=== ANÁLISIS ESPECTRAL DE LA MATRIZ ===")
print("Autovalores ordenados (Varianza en direcciones principales):")
for i, l in enumerate(autovalores, 1):
    pct = (l / suma_lambdas) * 100.0
    print(f"  lambda_{i}: {l:.4f} ({pct:.2f}% de la varianza total)")

print(f"\\nTraza real: {traza_real:.4f} | Suma de lambdas: {suma_lambdas:.4f}")
print(f"Determinante real: {det_real:.4f} | Producto de lambdas: {prod_lambdas:.4f}")
print(f"Reconstrucción espectral exacta: {np.allclose(Sigma, Sigma_reconstruida)}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Autovalores y Diagonalización"
  questions={[
    {
      id: "q_eig_1",
      text: "Si una matriz A de 3x3 tiene autovalores lambda_1 = 4, lambda_2 = 2, lambda_3 = -1, ¿cuál es el determinante det(A)?",
      options: [
        { id: "a", text: "-8 (el determinante es el producto de todos sus autovalores: 4 * 2 * (-1) = -8)", isCorrect: true, explanation: "Por el teorema de descomposición espectral, det(A) = prod_{i=1}^n lambda_i = 4 * 2 * (-1) = -8." },
        { id: "b", text: "+5", isCorrect: false, explanation: "5 es la suma de autovalores (la traza), no el determinante." },
        { id: "c", text: "0", isCorrect: false, explanation: "Ningún autovalor es cero, por lo que el determinante no es nulo." }
      ]
    },
    {
      id: "q_eig_2",
      text: "¿Qué implica que uno de los autovalores de una matriz A sea exactamente igual a cero (lambda = 0)?",
      options: [
        { id: "a", text: "Que la matriz A es singular (no invertible), ya que det(A) = prod lambda_i = 0", isCorrect: true, explanation: "Si existe lambda = 0, existe un vector no nulo v tal que A v = 0 v = 0, lo que significa que el núcleo (kernel) no es trivial y la matriz carece de inversa." },
        { id: "b", text: "Que la matriz es ortogonal", isCorrect: false, explanation: "Las matrices ortogonales tienen autovalores con módulo |lambda| = 1." },
        { id: "c", text: "Que la traza es cero obligatoriamente", isCorrect: false, explanation: "Los demás autovalores pueden sumar un valor distinto de cero." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-gradiente-hessiano-optimizacion-convexa",
        filename: "02-gradiente-hessiano-optimizacion-convexa.mdx",
        content: `---
title: "Gradiente, Matriz Hessiana y Condiciones de Optimalidad"
order: 2
description: "Cálculo multivariado aplicado, aproximación de Taylor de 2º orden, caracterización de convexidad mediante la Hessiana y algoritmo de descenso de gradiente."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué condición garantiza que un punto crítico x* (donde grad(f)(x*) = 0) sea un Mínimo Local Estricto en optimización multivariada libre?"
    options:
      - "La matriz Hessiana H(x*) es simétrica y Definida Positiva (todos sus autovalores son estrictamente positivos: lambda_i > 0)"
      - "La matriz Hessiana tiene determinante negativo"
      - "El gradiente tiene norma infinita"
      - "Todos los elementos de la Hessiana son cero"
    answer: 0
    explanation: "Por el criterio del desarrollo en serie de Taylor de segundo orden, si grad(f)(x*) = 0 y H(x*) es Definida Positiva, cualquier desplazamiento Delta x produce f(x* + Delta x) - f(x*) aprox (1/2) Delta x^T H Delta x > 0, garantizando un mínimo estricto."
  - question: "¿Qué caracteriza a una función f(x) estrictamente convexa en todo su dominio en la toma de decisiones industriales?"
    options:
      - "Cualquier mínimo local encontrado es automáticamente el Mínimo Global único de toda la función"
      - "La función no puede tener derivadas"
      - "Tiene múltiples puntos de silla oscilatorios"
      - "Solo se puede optimizar en una dimensión"
    answer: 0
    explanation: "La convexidad es la propiedad más codiciada en optimización: garantiza que no existen trampas de óptimos locales subóptimos; cualquier algoritmo convergente alcanzará el óptimo global definitivo."
---

# Introducción

> ¿Cómo ajusta un algoritmo de aprendizaje automático millones de parámetros para minimizar el error de predicción? ¿Cómo determina un ingeniero el plan de producción que minimiza los costos operativos no lineales de una refinería? La respuesta radica en el cálculo multivariado de segundo orden: el **Gradiente** y la **Matriz Hessiana**.

Mientras el vector gradiente apunta en la dirección de máximo crecimiento instantáneo de la función, la matriz Hessiana describe su **curvatura local** en todas las direcciones espaciales.

<Callout type="info">
**Clasificación de Formas Cuadráticas:**
- *Definida Positiva ($H \\succ 0$):* $\\lambda_i > 0, \\forall i$ $\\to$ Curvatura convexa hacia arriba (**Mínimo Local**).
- *Definida Negativa ($H \\prec 0$):* $\\lambda_i < 0, \\forall i$ $\\to$ Curvatura cóncava hacia abajo (**Máximo Local**).
- *Indefinida:* Autovalores con signos mixtos positivos y negativos $\\to$ **Punto de Silla** (*Saddle Point*).
</Callout>

## Objetivos de Aprendizaje
- Calcular el vector gradiente $\\nabla f(x)$ y evaluar las Condiciones de Primer Orden (FOC).
- Construir la Matriz Hessiana $H(x)$ y evaluar las Condiciones de Segundo Orden (SOC).
- Clasificar puntos críticos mediante los autovalores de la Hessiana.
- Implementar el algoritmo de Descenso de Gradiente (*Gradient Descent*) en Python.

---

# Fundamentos Teóricos

### Desarrollo en Serie de Taylor Multivariado

Sea $f: \\mathbb{R}^n \\to \\mathbb{R}$ dos veces diferenciable. Alrededor de un punto $x^*$:

$$f(x^* + \\Delta x) \\approx f(x^*) + \\nabla f(x^*)^T \\Delta x + \\frac{1}{2} \\Delta x^T H(x^*) \\Delta x$$

Donde:
- **Vector Gradiente $\\nabla f(x) \\in \\mathbb{R}^{n \\times 1}$:**
  $$\\nabla f(x) = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1}, & \\frac{\\partial f}{\\partial x_2}, & \\dots, & \\frac{\\partial f}{\\partial x_n} \\end{bmatrix}^T$$
- **Matriz Hessiana $H(x) \\in \\mathbb{R}^{n \\times n}$:**
  $$H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$$
  Por el Teorema de Schwarz, si las segundas derivadas son continuas, $H$ es simétrica ($H = H^T$).

### Algoritmo del Descenso de Gradiente

Para minimizar $f(x)$ sin restricciones partiendo de un punto inicial $x_0$:

$$x_{k+1} = x_k - \\alpha \\nabla f(x_k)$$

Donde $\\alpha > 0$ es la tasa de aprendizaje o tamaño de paso (*learning rate*).

---

# Laboratorio en Python: Optimización Multivariada y Descenso de Gradiente

\`\`\`python
import numpy as np
import pandas as pd

# Función de Costo de Producción Bivariada f(x1, x2):
# x1: Producción Planta Norte, x2: Producción Planta Sur
# f(x1, x2) = 2*(x1 - 4)^2 + (x2 - 6)^2 + 0.5*x1*x2 + 50
def costo(x):
    return 2.0 * (x[0] - 4.0)**2 + (x[1] - 6.0)**2 + 0.5 * x[0] * x[1] + 50.0

def gradiente(x):
    # df/dx1 = 4*(x1 - 4) + 0.5*x2 = 4*x1 - 16 + 0.5*x2
    # df/dx2 = 2*(x2 - 6) + 0.5*x1 = 2*x2 - 12 + 0.5*x1
    df_dx1 = 4.0 * x[0] - 16.0 + 0.5 * x[1]
    df_dx2 = 2.0 * x[1] - 12.0 + 0.5 * x[0]
    return np.array([df_dx1, df_dx2])

def hessiana(x):
    # d2f/dx1^2 = 4, d2f/dx2^2 = 2, d2f/dx1dx2 = 0.5
    return np.array([
        [4.0, 0.5],
        [0.5, 2.0]
    ])

# 1. Análisis de Convexidad de la Hessiana
H = hessiana([0, 0])
lambdas_H = np.linalg.eigvals(H)
es_convexa = np.all(lambdas_H > 0)

print("MATRIZ HESSIANA DEL SISTEMA:")
print(H)
print(f"Autovalores de la Hessiana: {lambdas_H}")
print(f"¿Es estrictamente Definida Positiva (Convexa)? {es_convexa} -> Mínimo Global Garantizado\\n")

# 2. Algoritmo de Descenso de Gradiente
x_k = np.array([0.0, 0.0])  # Punto inicial arbitrario
tasa_alfa = 0.15
tolerancia = 1e-6
max_iter = 100

historial = []

for k in range(max_iter):
    grad = gradiente(x_k)
    norma_grad = np.linalg.norm(grad)
    historial.append({'Iteracion': k, 'x1': x_k[0], 'x2': x_k[1], 'Costo': costo(x_k), 'Norma_Grad': norma_grad})
    
    if norma_grad < tolerancia:
        break
        
    x_k = x_k - tasa_alfa * grad

df_descenso = pd.DataFrame(historial)

print("CONVERGENCIA DEL DESCENSO DE GRADIENTE (Primeras y últimas iteraciones):")
print(pd.concat([df_descenso.head(4), df_descenso.tail(3)]).round(4).to_string(index=False))
print(f"\\n--> PUNTO ÓPTIMO ENCONTRADO: x1* = {x_k[0]:.4f}, x2* = {x_k[1]:.4f}")
print(f"--> COSTO MÍNIMO GLOBAL: USD {costo(x_k):.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Gradiente y Matriz Hessiana"
  questions={[
    {
      id: "q_opt_1",
      text: "Si en un punto crítico x* los autovalores de la matriz Hessiana son lambda_1 = 5.2 y lambda_2 = -1.8, ¿qué tipo de punto es x*?",
      options: [
        { id: "a", text: "Punto de Silla (Saddle Point): la función sube en una dirección y baja en otra", isCorrect: true, explanation: "La presencia de autovalores de signos mixtos (positivos y negativos) define una forma cuadrática indefinida, correspondiente geométricamente a una silla de montar." },
        { id: "b", text: "Mínimo Local Estricto", isCorrect: false, explanation: "Requeriría que todos los autovalores fueran estrictamente positivos." },
        { id: "c", text: "Máximo Local Estricto", isCorrect: false, explanation: "Requeriría que todos los autovalores fueran estrictamente negativos." }
      ]
    },
    {
      id: "q_opt_2",
      text: "¿Por qué en el Descenso de Gradiente se actualiza la posición restando el vector gradiente (x_{k+1} = x_k - alfa * grad(f))?",
      options: [
        { id: "a", text: "Porque el gradiente apunta en la dirección de máxima tasa de crecimiento; por tanto, el negativo (-grad) es la dirección de máximo descenso más empinado (steepest descent)", isCorrect: true, explanation: "Por propiedades geométricas del producto escalar, el ángulo que minimiza la derivada direccional es theta = pi, es decir, la dirección exactamente opuesta al gradiente." },
        { id: "b", text: "Porque el signo negativo anula los errores de redondeo", isCorrect: false, explanation: "Es una deducción analítica de cálculo multivariado de derivadas direccionales." },
        { id: "c", text: "Para evitar tener que calcular la norma del vector", isCorrect: false, explanation: "La dirección -grad define el sentido de avance hacia el fondo del valle." }
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
  console.log("✅ Curso metodos-cuantitativos-algebra generado con éxito!");
}

build();
