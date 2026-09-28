from .common import write_course_meta, write_module_meta, write_lesson

def build_s0():
    print("Building S0 Courses...")
    
    # -------------------------------------------------------------
    # COURSE 1: mioe-s0-nivelatorio-matlab-python (IOD10)
    # -------------------------------------------------------------
    c1_slug = "mioe-s0-nivelatorio-matlab-python"
    c1_dir = write_course_meta(
        slug=c1_slug,
        title="Computación Científica y Álgebra Matricial: MATLAB y Python",
        code="IOD10",
        description="Nivelatorio de posgrado en computación científica aplicada: vectorización, álgebra lineal numérica, resolución de grandes sistemas lineales y algoritmos numéricos de optimización univariada."
    )
    
    # Module 1: 01-algebra-matricial-computacional
    m1_dir = write_module_meta(c1_dir, "01-algebra-matricial-computacional", "Módulo 1: Álgebra Matricial y Computación Numérica", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_dir,
        filename="01-vectorizacion-algebra-lineal-numerica.mdx",
        title="Vectorización y Fundamentos de Álgebra Lineal Numérica",
        order=1,
        description="Operaciones tensoriales, producto interno, normas matriciales inducidas y eficiencia computacional por vectorización.",
        bloom_level="APPLY",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la principal ventaja algorítmica de la vectorización frente a bucles iterativos for en Python/MATLAB?",
                "options": [
                    "Aprovecha las subrutinas optimizadas de bajo nivel BLAS/LAPACK y ejecución SIMD en la CPU.",
                    "Reduce la precisión de punto flotante a enteros de 8 bits para acelerar el cálculo.",
                    "Convierte automáticamente cualquier matriz dispersa en densa sin costo en memoria.",
                    "Garantiza convergencia cuadrática en problemas no lineales no convexos."
                ],
                "answer": 0,
                "explanation": "La vectorización delega las operaciones a bibliotecas nativas compiladas en C/Fortran (BLAS y LAPACK), ejecutando instrucciones vectoriales SIMD (Single Instruction, Multiple Data) y reduciendo el overhead del intérprete de Python."
            }
        ],
        content_body="""# Vectorización y Álgebra Lineal Numérica en Posgrado

> En el modelado cuantitativo de operaciones y estadística multivariada, los algoritmos operan sobre tensores y matrices de alta dimensionalidad. Reemplazar bucles escalares tradicionales por operaciones vectorizadas no es solo una convención estética: es un requisito de viabilidad computacional.

## 1. Fundamentos Matemáticos: Espacios Vectoriales y Normas Inducidas

Consideremos un espacio vectorial euclidiano $\\mathbb{R}^n$ equipado con el producto interno canónico:
$$\\langle \\mathbf{x}, \\mathbf{y} \\rangle = \\mathbf{x}^\\top \\mathbf{y} = \\sum_{i=1}^n x_i y_i$$

Para una matriz $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$, la **norma matricial inducida** (u operatorial) por la norma vectorial $p$ se define formalmente como:
$$\\|\\mathbf{A}\\|_p = \\sup_{\\mathbf{x} \\neq \\mathbf{0}} \\frac{\\|\\mathbf{A}\\mathbf{x}\\|_p}{\\|\\mathbf{x}\\|_p} = \\max_{\\|\\mathbf{x}\\|_p = 1} \\|\\mathbf{A}\\mathbf{x}\\|_p$$

Las tres normas inducidas más relevantes en optimización son:
1. **Norma 1 (Máxima suma de columnas):**
   $$\\|\\mathbf{A}\\|_1 = \\max_{1 \\le j \\le n} \\sum_{i=1}^m |a_{ij}|$$
2. **Norma Espectral / Norma 2 (Valor singular máximo):**
   $$\\|\\mathbf{A}\\|_2 = \\sqrt{\\lambda_{\\max}(\\mathbf{A}^\\top \\mathbf{A})} = \\sigma_{\\max}(\\mathbf{A})$$
3. **Norma Infinito (Máxima suma de filas):**
   $$\\|\\mathbf{A}\\|_\\infty = \\max_{1 \\le i \\le m} \\sum_{j=1}^n |a_{ij}|$$

Adicionalmente, la **norma de Frobenius** (no inducida, pero de álgebra tensorial Hilbert-Schmidt):
$$\\|\\mathbf{A}\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2} = \\sqrt{\\operatorname{tr}(\\mathbf{A}^\\top \\mathbf{A})}$$

<Callout type="info">
**Propiedad de Submultiplicatividad:** Para cualquier norma matricial inducida y matrices compatibles $\\mathbf{A}$ y $\\mathbf{B}$, se cumple rigurosamente que $\\|\\mathbf{A}\\mathbf{B}\\| \\le \\|\\mathbf{A}\\| \\|\\mathbf{B}\\|$.
</Callout>

---

## 2. Paradigma de Vectorización vs. Bucles Escalares

En lenguajes interpretados como Python y MATLAB, un bucle `for` incurre en *overhead* de interpretación por cada iteración, comprobación dinámica de tipos y saltos de memoria en caché. La vectorización traslada el cómputo a núcleos optimizados de **BLAS** (Basic Linear Algebra Subprograms) y **LAPACK**, aprovechando registros vectoriales AVX-512 de la CPU.

```python
import numpy as np
import time

n = 2000
A = np.random.randn(n, n)
x = np.random.randn(n)

# 1. Enfoque escalar con bucle for (Ineficiente)
t0 = time.perf_counter()
y_scalar = np.zeros(n)
for i in range(n):
    total = 0.0
    for j in range(n):
        total += A[i, j] * x[j]
    y_scalar[i] = total
t_scalar = time.perf_counter() - t0

# 2. Enfoque vectorizado BLAS (np.dot / A @ x)
t0 = time.perf_counter()
y_vectorized = A @ x
t_vectorized = time.perf_counter() - t0

print(f"Tiempo bucle escalar:    {t_scalar:.4f} s")
print(f"Tiempo BLAS vectorizado: {t_vectorized:.6f} s")
print(f"Aceleración alcanzada:   {t_scalar / t_vectorized:.1f}x")
np.testing.assert_allclose(y_scalar, y_vectorized, atol=1e-8)
```

---

## 3. Broadcasting y Producto de Kronecker

En optimización multietapa y modelos estocásticos, con frecuencia se requiere acoplar sistemas de variables mediante el **Producto de Kronecker** $\\mathbf{A} \\otimes \\mathbf{B}$:
$$\\mathbf{A} \\otimes \\mathbf{B} = \\begin{bmatrix} a_{11}\\mathbf{B} & \\cdots & a_{1n}\\mathbf{B} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m1}\\mathbf{B} & \\cdots & a_{mn}\\mathbf{B} \\end{bmatrix}$$

El broadcasting en NumPy permite aplicar operaciones binarias sobre matrices de dimensiones compatibles sin duplicación redundante de memoria física, reduciendo la huella de asignación en memoria RAM.
""",
        quiz_component="""<Quiz
  title="Quiz Conceptual: Vectorización y Normas Matriciales"
  questions={[
    {
      id: "q_norm_spec",
      text: "Si la matriz A es simétrica definida positiva, ¿cuál es la relación entre su norma espectral ||A||_2 y sus valores propios lambda_i?",
      options: [
        { id: "a", text: "||A||_2 es igual al valor propio de mayor magnitud |lambda_max|", isCorrect: true, explanation: "Correcto: Para matrices simétricas, los valores singulares sigma_i coinciden con los valores absolutos de los valores propios |lambda_i|." },
        { id: "b", text: "||A||_2 es igual a la traza de la matriz dividida por n", isCorrect: false, explanation: "La traza es la suma de los valores propios, no el valor máximo." },
        { id: "c", text: "||A||_2 es el determinante de A elevado a la 1/n", isCorrect: false, explanation: "Eso corresponde a la media geométrica de los valores propios." },
        { id: "d", text: "||A||_2 siempre es igual a 1 independientemente de la escala", isCorrect: false, explanation: "La norma depende de la magnitud de la transformación lineal." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_dir,
        filename="02-resolucion-sistemas-ecuaciones-lineales.mdx",
        title="Resolución de Grandes Sistemas de Ecuaciones Lineales y Factorización",
        order=2,
        description="Descomposición LU, Cholesky, QR, condicionamiento numérico y estabilidad computacional de sistemas lineales.",
        bloom_level="ANALYZE",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "En un sistema lineal Ax = b, si el número de condición kappa(A) = ||A|| * ||A^(-1)|| es del orden de 10^12 en aritmética de doble precisión (float64), ¿qué ocurre con la solución calculada?",
                "options": [
                    "Se pierden aproximadamente 12 de los 16 dígitos significativos de precisión por amplificación de errores.",
                    "El sistema no tiene solución bajo ninguna circunstancia matemática.",
                    "La solución siempre es idénticamente cero.",
                    "El algoritmo Simplex requiere infinitas iteraciones para converger."
                ],
                "answer": 0,
                "explanation": "El número de condición actúa como un factor de amplificación de perturbaciones relativas: ||Delta x||/||x|| <= kappa(A) * (||Delta b||/||b||). Con kappa(A) = 10^12 y una precisión de máquina eps = 10^(-16), solo quedan ~4 dígitos significativos confiables."
            }
        ],
        content_body="""# Grandes Sistemas de Ecuaciones Lineales y Factorización Matricial

> Resolver $\\mathbf{A}\\mathbf{x} = \\mathbf{b}$ con $\\mathbf{A} \\in \\mathbb{R}^{n \\times n}$ es el núcleo numérico de cada iteración del método Simplex, de los métodos de puntos interiores y del ajuste de modelos econométricos multivariados. Invertir explícitamente $\\mathbf{A}^{-1}$ es un error conceptual y numérico severo que debe evitarse a nivel de posgrado.

---

## 1. Descomposiciones Fundamentales

### A. Factorización LU con Pivoteo Parcial ($P A = L U$)
Cualquier matriz invertible $\\mathbf{A}$ puede descomponerse como:
$$\\mathbf{P}\\mathbf{A} = \\mathbf{L}\\mathbf{U}$$
donde $\\mathbf{P}$ es una matriz de permutación ortogonal, $\\mathbf{L}$ es triangular inferior con unos en la diagonal (*unitriangular*), y $\\mathbf{U}$ es triangular superior.
- **Costo algorítmico:** $\\frac{2}{3}n^3$ operaciones de punto flotante (FLOPs).
- **Resolución:** $\\mathbf{L}\\mathbf{y} = \\mathbf{P}\\mathbf{b}$ (sustitución progresiva, $n^2$ FLOPs), seguido de $\\mathbf{U}\\mathbf{x} = \\mathbf{y}$ (sustitución regresiva, $n^2$ FLOPs).

### B. Factorización de Cholesky ($A = L L^\\top$)
Si $\\mathbf{A}$ es **simétrica y estrictamente definida positiva** (SPSD/SPD, como las matrices de covarianza y matrices hessianas en mínimos locales):
$$\\mathbf{A} = \\mathbf{L}\\mathbf{L}^\\top$$
donde $\\mathbf{L}$ es triangular inferior con entradas diagonales estrictamente positivas $l_{ii} > 0$.
- **Costo algorítmico:** $\\frac{1}{3}n^3$ FLOPs (el doble de rápido que LU y numéricamente incondicionalmente estable, sin requerir pivoteo).

### C. Factorización QR (Householder / Gram-Schmidt modificado)
$$\\mathbf{A} = \\mathbf{Q}\\mathbf{R}$$
donde $\\mathbf{Q}$ es ortogonal ($\\mathbf{Q}^\\top \\mathbf{Q} = \\mathbf{I}$) y $\\mathbf{R}$ es triangular superior. Es el método por excelencia para problemas de mínimos cuadrados $\\min \\|\\mathbf{A}\\mathbf{x} - \\mathbf{b}\\|_2$.

---

## 2. Número de Condición y Estabilidad Numérica

El **número de condición** de una matriz no singular respecto a la norma inducida se define como:
$$\\kappa(\\mathbf{A}) = \\|\\mathbf{A}\\| \\cdot \\|\\mathbf{A}^{-1}\\|$$
Para la norma euclidiana $L_2$:
$$\\kappa_2(\\mathbf{A}) = \\frac{\\sigma_{\\max}(\\mathbf{A})}{\\sigma_{\\min}(\\mathbf{A})}$$

Si el vector del término independiente sufre una perturbación $\\mathbf{b} \\to \\mathbf{b} + \\delta \\mathbf{b}$, el error relativo en la solución $\\mathbf{x}$ satisface la cota rigurosa:
$$\\frac{\\|\\delta \\mathbf{x}\\|}{\\|\\mathbf{x}\\|} \\le \\kappa(\\mathbf{A}) \\frac{\\|\\delta \\mathbf{b}\\|}{\\|\\mathbf{b}\\|}$$

---

## 3. Implementación Numérica Rigurosa en SciPy

```python
import numpy as np
import scipy.linalg as la

# Generación de un sistema simétrico definido positivo mal condicionado (tipo Hilbert)
n = 8
H = la.hilbert(n)
x_true = np.ones(n)
b = H @ x_true

# 1. Cálculo del número de condición espectral
kappa_H = np.linalg.cond(H)
print(f"Condicionamiento kappa_2(H): {kappa_H:.2e}")

# 2. Factorización de Cholesky: H = L @ L.T
c, lower = la.cho_factor(H)
x_chol = la.cho_solve((c, lower), b)

# 3. Factorización LU con pivoteo parcial: P @ H = L @ U
lu, piv = la.lu_factor(H)
x_lu = la.lu_solve((lu, piv), b)

print(f"Error relativo Cholesky: {la.norm(x_chol - x_true) / la.norm(x_true):.2e}")
print(f"Error relativo LU:       {la.norm(x_lu - x_true) / la.norm(x_true):.2e}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Factorización y Condicionamiento Numérico"
  questions={[
    {
      id: "q_cholesky_req",
      text: "¿Cuál es el requisito indispensable para aplicar la descomposición de Cholesky A = L L^T a una matriz A?",
      options: [
        { id: "a", text: "Que A sea simétrica y estrictamente definida positiva (x^T A x > 0 para todo x != 0)", isCorrect: true, explanation: "Correcto: Si A no es definida positiva, los términos diagonales l_ii involucrarían raíces cuadradas de números negativos o ceros." },
        { id: "b", text: "Que A sea triangular estrictamente superior", isCorrect: false, explanation: "Una matriz simétrica no puede ser triangular superior a menos que sea diagonal." },
        { id: "c", text: "Que todos los elementos de A sean números enteros pares", isCorrect: false, explanation: "La propiedad es espectral y algebraica, no de paridad numérica." },
        { id: "d", text: "Que el determinante sea negativo", isCorrect: false, explanation: "Una matriz definida positiva tiene determinante estrictamente positivo." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-analisis-datos-algoritmos
    m2_dir = write_module_meta(c1_dir, "02-analisis-datos-algoritmos", "Módulo 2: Estructuras Matriciales, Visualización y Algoritmos", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_dir,
        filename="01-estructuras-matriciales-visualizacion.mdx",
        title="Estructuras de Datos Matriciales y Visualización Científica",
        order=1,
        description="Manipulación de matrices esparsas, mapas de calor, superficies 3D y visualización científica de tensores.",
        bloom_level="APPLY",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "¿Por qué el formato Compressed Sparse Row (CSR) es preferido frente a matrices densas en la resolución de problemas de flujo en redes y programación lineal a gran escala?",
                "options": [
                    "Almacena únicamente las entradas no nulas reduciendo la complejidad de almacenamiento de O(n^2) a O(nnz) y optimiza productos matriz-vector.",
                    "Permite invertir la matriz directamente en tiempo constante O(1).",
                    "Elimina la necesidad de calcular gradientes en optimización no lineal.",
                    "Convierte problemas no convexos en formulaciones de transporte lineal."
                ],
                "answer": 0,
                "explanation": "En sistemas con millones de variables donde la densidad de entradas no nulas es menor al 1%, el formato CSR almacena solo los valores no nulos y sus índices, acelerando drásticamente el producto matriz-vector en O(nnz)."
            }
        ],
        content_body="""# Estructuras de Datos Matriciales y Visualización Científica

> En problemas de Investigación de Operaciones a escala industrial (ruteo, planificación de cadenas de suministro, despacho eléctrico), la matriz de restricciones $\\mathbf{A}$ puede tener dimensiones de $10^5 \\times 10^5$, pero con más del $99.8\\%$ de sus coeficientes iguales a cero. El uso de estructuras esparsas (*sparse matrices*) es mandatorio.

---

## 1. Formatos de Matrices Esparsas

### A. Coordinate Format (COO)
Almacena tres vectores de longitud $\\text{nnz}$ (número de no ceros): `(row, col, data)`. Es el formato ideal para ensamblar y construir matrices de restricciones de forma incremental.

### B. Compressed Sparse Row (CSR)
Almacena tres vectores:
- `data`: elementos no nulos leídos fila por fila.
- `indices`: índices de columna correspondientes a cada elemento.
- `indptr`: punteros que indican el inicio de cada fila en `data`.
Es óptimo para slicing de filas y operaciones de producto matriz-vector $\\mathbf{y} = \\mathbf{A}\\mathbf{x}$.

### C. Compressed Sparse Column (CSC)
Análogo a CSR pero por columnas. Es el formato estándar consumido por solvers de Simplex de alto rendimiento (como HiGHS y OSQP) para operaciones de pivoteo columnar.

---

## 2. Manipulación y Visualización Científica en Python

```python
import numpy as np
import scipy.sparse as sp
import matplotlib.pyplot as plt

# 1. Construcción de una matriz esparsa tridiagonal de gran escala
n = 10000
diagonals = [np.ones(n - 1) * -1, np.ones(n) * 2, np.ones(n - 1) * -1]
A_sparse = sp.diags(diagonals, [-1, 0, 1], shape=(n, n), format="csr")

mem_dense = (n * n * 8) / (1024 ** 2)  # MB si fuera densa
mem_sparse = (A_sparse.data.nbytes + A_sparse.indices.nbytes + A_sparse.indptr.nbytes) / (1024 ** 2)

print(f"Dimensión: {n} x {n}")
print(f"Memoria requerida formato denso:  {mem_dense:.2f} MB")
print(f"Memoria requerida formato CSR:    {mem_sparse:.4f} MB")
print(f"Ahorro de memoria:                {(1 - mem_sparse/mem_dense)*100:.2f}%")

# 2. Visualización científica del patrón de dispersión (Sparsity Pattern)
plt.figure(figsize=(6, 6))
plt.spy(A_sparse[:100, :100], markersize=2, color='navy')
plt.title(f"Patrón de dispersión (primeras 100 filas) - nnz={A_sparse.nnz}")
plt.xlabel("Columnas")
plt.ylabel("Filas")
plt.grid(True, linestyle="--", alpha=0.5)
```
""",
        quiz_component="""<Quiz
  title="Quiz: Matrices Esparsas y Formatos Computacionales"
  questions={[
    {
      id: "q_sparse_csc",
      text: "¿Cuál es la principal ventaja operativa de la estructura CSC frente a CSR en el algoritmo Simplex?",
      options: [
        { id: "a", text: "Permite acceder y extraer eficientemente columnas enteras A_{.j} para calcular costos reducidos y vectores pivote", isCorrect: true, explanation: "Correcto: En el método Simplex se trabaja directamente sobre columnas entrantes A_{.j}, por lo que CSC minimiza el tiempo de acceso de memoria." },
        { id: "b", text: "Duplica la precisión de cálculo a 128 bits automáticamente", isCorrect: false, explanation: "El formato de almacenamiento no altera el tipo de dato de punto flotante." },
        { id: "c", text: "Evita que el determinante sea nulo", isCorrect: false, explanation: "La invertibilidad depende de la independencia lineal, no de la estructura de datos." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_dir,
        filename="02-algoritmos-optimizacion-univariada.mdx",
        title="Algoritmos Numéricos de Optimización Univariada",
        order=2,
        description="Método de la Sección Dorada, interpolación parabólica y método de Newton 1D para optimización unidimensional.",
        bloom_level="EVALUATE",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "En el método de la Sección Dorada para minimizar una función unimodal en [a, b], ¿qué propiedad geométrica permite evaluar solo UN punto nuevo por iteración?",
                "options": [
                    "La razón áurea phi = (sqrt(5) - 1)/2 asegura que uno de los puntos interiores previos coincide con el nuevo punto de prueba tras la contracción.",
                    "El método siempre selecciona la derivada igual a cero en el punto medio.",
                    "La función se asume ortogonal al vector de gradientes.",
                    "El paso de descenso se multiplica por la matriz identidad."
                ],
                "answer": 0,
                "explanation": "Gracias a la propiedad algebraica del número áureo phi^2 = 1 - phi, al descartar uno de los extremos del intervalo, el punto interior que sobrevive se posiciona exactamente a la fracción áurea del nuevo intervalo acortado."
            }
        ],
        content_body="""# Algoritmos Numéricos de Optimización Univariada

> La optimización univariada (resolución de $\\min_{x \\in \\mathbb{R}} f(x)$ en un intervalo $[a, b]$) es la base indispensable de la **búsqueda de línea** (*line search*) en métodos multivariados avanzados como Gradiente Descendente, BFGS y Algoritmos de Direcciones Conjugadas.

---

## 1. Método de la Sección Dorada (*Golden Section Search*)

Para funciones estrictamente unimodales donde no se dispone de información analítica de la derivada $f'(x)$, el método de la sección dorada divide el intervalo $[a, b]$ utilizando el número áureo:
$$\\phi = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887$$

Se determinan dos puntos interiores de prueba:
$$x_1 = b - \\phi (b - a)$$
$$x_2 = a + \\phi (b - a)$$

### Regla de Reducción:
- Si $f(x_1) < f(x_2)$, el mínimo no puede encontrarse en $[x_2, b]$. El nuevo intervalo es $[a, x_2]$, y se reutiliza $x_1$ como el nuevo $x_2'$.
- Si $f(x_1) \\ge f(x_2)$, el mínimo no puede encontrarse en $[a, x_1]$. El nuevo intervalo es $[x_1, b]$, y se reutiliza $x_2$ como el nuevo $x_1'$.

La longitud del intervalo en la iteración $k$ decrece a una tasa lineal exacta:
$$L_k = \\phi^k (b_0 - a_0)$$

---

## 2. Método de Newton Univariado

Si $f(x) \\in C^2(\\mathbb{R})$ y se calculan $f'(x)$ y $f''(x)$, el método de Newton aproxima localmente la función por su expansión de Taylor de segundo orden:
$$f(x_k + \\Delta x) \\approx f(x_k) + f'(x_k)\\Delta x + \\frac{1}{2} f''(x_k)(\\Delta x)^2$$

Imponiendo la condición de primer orden para minimizar la parábola osculatriz ($\\frac{d}{d(\\Delta x)} = 0$):
$$x_{k+1} = x_k - \\frac{f'(x_k)}{f''(x_k)}$$

<Callout type="info">
**Convergencia Cuadrática:** Si $f''(x^*) > 0$ y $x_0$ está suficientemente cerca del mínimo $x^*$, el error en cada paso satisface:
$$|x_{k+1} - x^*| \\le M |x_k - x^*|^2$$
lo que duplica el número de dígitos exactos en cada iteración.
</Callout>

---

## 3. Implementación en Python

```python
import numpy as np

def golden_section_search(f, a, b, tol=1e-6):
    phi = (np.sqrt(5) - 1) / 2
    x1 = b - phi * (b - a)
    x2 = a + phi * (b - a)
    f1, f2 = f(x1), f(x2)
    
    iters = 0
    while (b - a) > tol:
        iters += 1
        if f1 < f2:
            b = x2
            x2 = x1
            f2 = f1
            x1 = b - phi * (b - a)
            f1 = f(x1)
        else:
            a = x1
            x1 = x2
            f1 = f2
            x2 = a + phi * (b - a)
            f2 = f(x2)
            
    x_opt = (a + b) / 2
    return x_opt, f(x_opt), iters

# Función objetivo de prueba no lineal
f_cost = lambda x: x**4 - 3*x**3 + 2

x_opt, min_val, iters = golden_section_search(f_cost, 0, 3)
print(f"Óptimo numérico x*: {x_opt:.6f}")
print(f"Valor mínimo f(x*): {min_val:.6f}")
print(f"Iteraciones:        {iters}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Optimización Univariada y Convergencia"
  questions={[
    {
      id: "q_newton_fail",
      text: "¿Bajo qué condición el método de Newton univariado divergerá o se desplazará hacia un máximo local en lugar de un mínimo?",
      options: [
        { id: "a", text: "Cuando la segunda derivada f''(x_k) sea estrictamente negativa o cercana a cero", isCorrect: true, explanation: "Correcto: Si f''(x_k) < 0, la aproximación cuadrática local es cóncava y el paso se dirige hacia el vértice de un máximo local." },
        { id: "b", text: "Cuando el intervalo sea un conjunto cerrado y conexo", isCorrect: false, explanation: "Los conjuntos compactos favorecen la convergencia de métodos acotados." },
        { id: "c", text: "Cuando la primera derivada sea idénticamente nula en el óptimo", isCorrect: false, explanation: "f'(x*) = 0 es precisamente la condición necesaria de optimalidad." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 2: mioe-s0-nivelatorio-investigacion-operaciones (IOA10)
    # -------------------------------------------------------------
    c2_slug = "mioe-s0-nivelatorio-investigacion-operaciones"
    c2_dir = write_course_meta(
        slug=c2_slug,
        title="Fundamentos de Investigación de Operaciones",
        code="IOA10",
        description="Nivelatorio de posgrado en modelación matemática determinística, dualidad lineal estricta, interpretación económica y algoritmos computacionales."
    )
    
    # Module 1: 01-fundamentos-optimizacion-lineal
    m1_c2_dir = write_module_meta(c2_dir, "01-fundamentos-optimizacion-lineal", "Módulo 1: Modelado Matemático y Dualidad", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c2_dir,
        filename="01-modelado-matematico-formal.mdx",
        title="Modelado Matemático Formal y Espacios de Decisión",
        order=1,
        description="Construcción rigurosa de modelos lineales, conjuntos convexos de decisión, funciones cóncavas/convexas y geometría de la frontera.",
        bloom_level="APPLY",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "En la teoría de optimización convexa, ¿por qué cualquier mínimo local de un programa lineal es garantizadamente un mínimo global?",
                "options": [
                    "Porque la función objetivo es lineal (convexa y cóncava simultáneamente) y la región factible es un poliedro convexo.",
                    "Porque el número de variables de decisión siempre es menor que el número de restricciones.",
                    "Porque la matriz de coeficientes A siempre tiene determinante unitario.",
                    "Porque las variables de decisión están forzadas a valores discretos enteros."
                ],
                "answer": 0,
                "explanation": "En un problema de optimización convexo (minimizar una función convexa sobre un conjunto convexo), el teorema fundamental de convexidad garantiza que todo mínimo local es también un mínimo global."
            }
        ],
        content_body="""# Modelado Matemático Formal y Geometría de la Programación Lineal

> Un modelo de optimización lineal formaliza matemáticamente la asignación óptima de recursos limitados entre actividades competitivas, garantizando consistencia dimensional y rigor axiomático.

---

## 1. Formulación Matricial Estándar

Un problema general de Programación Lineal (PL) en su forma estándar se define como:
$$\\begin{aligned}
\\min_{\\mathbf{x} \\in \\mathbb{R}^n} \\quad & \\mathbf{c}^\\top \\mathbf{x} \\\\
\\text{sujeto a} \\quad & \\mathbf{A}\\mathbf{x} = \\mathbf{b} \\\\
& \\mathbf{x} \\ge \\mathbf{0}
\\end{aligned}$$

donde:
- $\\mathbf{x} \\in \\mathbb{R}^n$ es el vector de variables de decisión.
- $\\mathbf{c} \\in \\mathbb{R}^n$ es el vector de costos unitarios.
- $\\mathbf{A} \\in \\mathbb{R}^{m \\times n}$ es la matriz de coeficientes tecnológicos con $\\operatorname{rango}(\\mathbf{A}) = m < n$.
- $\\mathbf{b} \\in \\mathbb{R}^m$ es el vector de disponibilidad de recursos (lado derecho), con $\\mathbf{b} \\ge \\mathbf{0}$.

---

## 2. Geometría de los Espacios de Decisión: Poliedros Convexos

El conjunto de soluciones factibles define un **poliedro convexo**:
$$\\mathcal{P} = \\{ \\mathbf{x} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{x} = \\mathbf{b}, \\, \\mathbf{x} \\ge \\mathbf{0} \\}$$

### Definiciones Clave:
1. **Conjunto Convexo:** Un conjunto $C \\subseteq \\mathbb{R}^n$ es convexo si para cualesquiera $\\mathbf{x}, \\mathbf{y} \\in C$ y todo $\\alpha \\in [0, 1]$:
   $$\\alpha \\mathbf{x} + (1-\\alpha) \\mathbf{y} \\in C$$
2. **Punto Extremo (Vértice):** Un punto $\\mathbf{x} \\in \\mathcal{P}$ es un punto extremo si no puede expresarse como combinación convexa propia de dos puntos distintos de $\\mathcal{P}$:
   $$\\mathbf{x} = \\alpha \\mathbf{y} + (1-\\alpha) \\mathbf{z}, \\quad \\alpha \\in (0, 1) \\implies \\mathbf{x} = \\mathbf{y} = \\mathbf{z}$$

<Callout type="info">
**Teorema Fundamental de la Programación Lineal:** Si el poliedro $\\mathcal{P}$ tiene al menos un punto extremo y la función objetivo está acotada inferiormente en $\\mathcal{P}$, entonces existe una solución óptima que es un punto extremo de $\\mathcal{P}$.
</Callout>

---

## 3. Formulación Compacta Indexada en Python

```python
import pulp

# Definición de conjuntos e índices
PRODUCTOS = ["P1", "P2", "P3"]
RECURSOS = ["Corte", "Ensamble", "Acabado"]

c = {"P1": 45.0, "P2": 60.0, "P3": 50.0}
b = {"Corte": 120.0, "Ensamble": 180.0, "Acabado": 100.0}

A = {
    ("Corte", "P1"): 1.5, ("Corte", "P2"): 2.0, ("Corte", "P3"): 1.0,
    ("Ensamble", "P1"): 2.0, ("Ensamble", "P2"): 3.0, ("Ensamble", "P3"): 2.5,
    ("Acabado", "P1"): 1.0, ("Acabado", "P2"): 1.0, ("Acabado", "P3"): 1.5,
}

# Modelo de Maximización
model = pulp.LpProblem("Plan_Produccion_Formal", pulp.LpMaximize)

# Variables de decisión continuas no negativas
x = pulp.LpVariable.dicts("Prod", PRODUCTOS, lowBound=0, cat=pulp.LpContinuous)

# Función Objetivo
model += pulp.lpSum([c[j] * x[j] for j in PRODUCTOS]), "Utilidad_Total"

# Restricciones de capacidad
for i in RECURSOS:
    model += pulp.lpSum([A[(i, j)] * x[j] for j in PRODUCTOS]) <= b[i], f"Capacidad_{i}"

# Resolución
model.solve(pulp.PULP_CBC_CMD(msg=False))
print(f"Estado del solver: {pulp.LpStatus[model.status]}")
for j in PRODUCTOS:
    print(f"Producción {j}: {x[j].varValue:.2f} unidades")
print(f"Utilidad Óptima Z*: ${pulp.value(model.objective):.2f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Geometría y Poliedros Convexos"
  questions={[
    {
      id: "q_poly_extreme",
      text: "En un poliedro convexo P = {x : Ax = b, x >= 0}, ¿cuál es el número máximo teórico de puntos extremos que puede poseer?",
      options: [
        { id: "a", text: "A lo sumo el coeficiente binomial C(n, m) = n! / (m! (n-m)!)", isCorrect: true, explanation: "Correcto: Corresponde al número de formas de elegir m columnas linealmente independientes de la matriz A (bases B) entre las n columnas disponibles." },
        { id: "b", text: "Infinitos vértices no numerables", isCorrect: false, explanation: "Un poliedro definido por un número finito de semiespacios tiene un número finito de vértices." },
        { id: "c", text: "Exactamente n * m vértices", isCorrect: false, explanation: "La relación es combinatoria sobre las bases, no el producto de dimensiones." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c2_dir,
        filename="02-teoria-dualidad-interpretacion-economica.mdx",
        title="Teoría de la Dualidad e Interpretación Económica",
        order=2,
        description="Formulación primal-dual canónica, teoremas de dualidad débil y fuerte, holgura complementaria y precios sombra.",
        bloom_level="ANALYZE",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "De acuerdo con el Teorema de Holgura Complementaria, si en la solución óptima de un problema de maximización la restricción del recurso i tiene holgura estrictamente positiva (s_i* > 0), ¿cuál es el precio sombra y_i* correspondiente?",
                "options": [
                    "y_i* = 0 (el recurso no está saturado y una unidad adicional no añade valor a la función objetivo).",
                    "y_i* = 1 siempre por normalización.",
                    "y_i* tiende a infinito positivo.",
                    "y_i* es igual al costo reducido de la variable más rentable."
                ],
                "answer": 0,
                "explanation": "El teorema exige que y_i * (b_i - a_i^T x) = 0. Si el recurso sobra (b_i - a_i^T x > 0), obligatoriamente su multiplicador dual y_i* debe ser cero, reflejando que el recurso es económicamente superabundante en el óptimo."
            }
        ],
        content_body="""# Teoría de la Dualidad e Interpretación Económica

> Todo problema de optimización lineal lineal lleva intrínseco un problema espejo denominado **Problema Dual**. La dualidad no es únicamente un artefacto algebraico: provee la fundamentación económica de los precios de equilibrio en mercados competitivos.

---

## 1. El Par Primal-Dual Canónico

Consideremos el problema primal simétrico de maximización y su correspondiente dual simétrico:

### Primal (P):
$$\\begin{aligned}
\\max_{\\mathbf{x}} \\quad & Z = \\mathbf{c}^\\top \\mathbf{x} \\\\
\\text{s.a.} \\quad & \\mathbf{A}\\mathbf{x} \\le \\mathbf{b} \\\\
& \\mathbf{x} \\ge \\mathbf{0}
\\end{aligned}$$

### Dual (D):
$$\\begin{aligned}
\\min_{\\mathbf{y}} \\quad & W = \\mathbf{b}^\\top \\mathbf{y} \\\\
\\text{s.a.} \\quad & \\mathbf{A}^\\top \\mathbf{y} \\ge \\mathbf{c} \\\\
& \\mathbf{y} \\ge \\mathbf{0}
\\end{aligned}$$

---

## 2. Teoremas Fundamentales de Dualidad

### Teorema de Dualidad Débil
Si $\\mathbf{x}$ es factible para (P) e $\\mathbf{y}$ es factible para (D), entonces:
$$\\mathbf{c}^\\top \\mathbf{x} \\le \\mathbf{y}^\\top \\mathbf{A}\\mathbf{x} \\le \\mathbf{y}^\\top \\mathbf{b} = \\mathbf{b}^\\top \\mathbf{y}$$
*Corolario:* Si $\\mathbf{c}^\\top \\bar{\\mathbf{x}} = \\mathbf{b}^\\top \\bar{\\mathbf{y}}$, entonces $\\bar{\\mathbf{x}}$ y $\\bar{\\mathbf{y}}$ son simultáneamente soluciones óptimas de sus respectivos problemas.

### Teorema de Dualidad Fuerte
Si el problema primal (P) tiene una solución óptima finita $\\mathbf{x}^*$, entonces el problema dual (D) también posee una solución óptima finita $\\mathbf{y}^*$, y los valores óptimos coinciden exactamente:
$$\\mathbf{c}^\\top \\mathbf{x}^* = \\mathbf{b}^\\top \\mathbf{y}^*$$

### Teorema de Holgura Complementaria (*Complementary Slackness*)
Sean $\\mathbf{x}^*$ e $\\mathbf{y}^*$ soluciones factibles primal y dual. Son mutuamente óptimas si y solo si:
1. $y_i^* (b_i - \\mathbf{a}_{i\\cdot} \\mathbf{x}^*) = 0, \\quad \\forall i=1, \\dots, m$
2. $x_j^* (\\mathbf{a}_{\\cdot j}^\\top \\mathbf{y}^* - c_j) = 0, \\quad \\forall j=1, \\dots, n$

---

## 3. Interpretación Económica: Los Precios Sombra

En el óptimo, la derivada parcial de la función objetivo respecto a la disponibilidad del recurso $b_i$ es:
$$y_i^* = \\frac{\\partial Z^*}{\\partial b_i}$$

Cada variable dual $y_i^*$ cuantifica la **disposición marginal a pagar** por una unidad adicional del recurso escaso $i$. Si una empresa puede adquirir una hora extra de ensamble a un costo menor que $y_{\\text{ensamble}}^*$, la operación incrementará su beneficio neto.

```python
import pulp

# Demostración del Teorema de Dualidad Fuerte en Python
prob = pulp.LpProblem("Dualidad_Fuerte", pulp.LpMaximize)

x1 = pulp.LpVariable("x1", lowBound=0)
x2 = pulp.LpVariable("x2", lowBound=0)

prob += 3*x1 + 5*x2, "Z"
c1 = prob += 2*x1 + 3*x2 <= 12, "Recurso_1"
c2 = prob += 2*x1 + 1*x2 <= 8,  "Recurso_2"

prob.solve(pulp.PULP_CBC_CMD(msg=False))

print(f"Valor Primal Óptimo Z*:  {pulp.value(prob.objective):.4f}")
print(f"Precio Sombra y1* (pi_1): {c1.pi:.4f}")
print(f"Precio Sombra y2* (pi_2): {c2.pi:.4f}")

# Comprobación valor dual W = b1*y1 + b2*y2
W_dual = 12 * c1.pi + 8 * c2.pi
print(f"Valor Dual Óptimo W*:    {W_dual:.4f}")
assert abs(pulp.value(prob.objective) - W_dual) < 1e-6, "¡Fallo en Dualidad Fuerte!"
```
""",
        quiz_component="""<Quiz
  title="Quiz: Teoremas de Dualidad"
  questions={[
    {
      id: "q_unbounded_dual",
      text: "Si el problema primal es no acotado (su función objetivo puede crecer indefinidamente hacia +infinito), ¿qué se deduce sobre el problema dual?",
      options: [
        { id: "a", text: "El problema dual es estrictamente infactible (su región factible es el conjunto vacío)", isCorrect: true, explanation: "Correcto: Por dualidad débil, si el dual fuera factible con solución y, b^T y actuaría como cota superior finita para el primal, contradiciendo que el primal sea no acotado." },
        { id: "b", text: "El problema dual también es no acotado", isCorrect: false, explanation: "Un problema de minimización no acotado hacia -infinito no puede emparejarse con un primal no acotado." },
        { id: "c", text: "El problema dual tiene solución óptima finita y = 0", isCorrect: false, explanation: "Contradice el teorema de dualidad débil." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-metodos-solucion-computacional
    m2_c2_dir = write_module_meta(c2_dir, "02-metodos-solucion-computacional", "Módulo 2: Algoritmos y Solvers Computacionales", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c2_dir,
        filename="01-algoritmo-simplex-matricial.mdx",
        title="Álgebra Matricial del Algoritmo Simplex",
        order=1,
        description="Formulación compacta en base B, costos reducidos relativos, criterio de parada y transición de bases invertibles.",
        bloom_level="ANALYZE",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "En la formulación matricial del Simplex, ¿cuál es la expresión formal de los costos reducidos r_N para las variables no básicas en un problema de minimización?",
                "options": [
                    "r_N = c_N^T - c_B^T B^(-1) N",
                    "r_N = c_B^T B^(-1) b",
                    "r_N = B^(-1) N c_N",
                    "r_N = det(B) * c_N"
                ],
                "answer": 0,
                "explanation": "El costo reducido representa la derivada direccional proyectada: c_N^T - c_B^T B^(-1) N. Si r_N >= 0 para minimización, cualquier incremento en variables no básicas aumentaría el costo, demostrando optimalidad."
            }
        ],
        content_body="""# Álgebra Matricial del Algoritmo Simplex

> El algoritmo Simplex ideado por George Dantzig (1947) no es un procedimiento de tableros manuales: es una secuencia algebraica rigurosa de transiciones entre bases no singulares $\\mathbf{B} \\in \\mathbb{R}^{m \\times m}$ de la matriz de restricciones.

---

## 1. Partición Básica y Soluciones Básicas Factibles

Dada la matriz de restricciones $\\mathbf{A} = [\\mathbf{B} \\mid \\mathbf{N}]$ y el vector de variables particionado $\\mathbf{x} = [\\mathbf{x}_B^\\top, \\mathbf{x}_N^\\top]^\\top$:
$$\\mathbf{B}\\mathbf{x}_B + \\mathbf{N}\\mathbf{x}_N = \\mathbf{b}$$

Haciendo $\\mathbf{x}_N = \\mathbf{0}$, la **solución básica** asociada a la base $\\mathbf{B}$ es:
$$\\mathbf{x}_B = \\mathbf{B}^{-1}\\mathbf{b}$$

La solución es **básica factible (SBF)** si satisface además la no negatividad:
$$\\mathbf{x}_B = \\mathbf{B}^{-1}\\mathbf{b} \\ge \\mathbf{0}$$

---

## 2. Derivación de los Costos Reducidos

El valor de la función objetivo para cualquier solución factible se expresa como:
$$Z = \\mathbf{c}_B^\\top \\mathbf{x}_B + \\mathbf{c}_N^\\top \\mathbf{x}_N$$
Despejando $\\mathbf{x}_B = \\mathbf{B}^{-1}\\mathbf{b} - \\mathbf{B}^{-1}\\mathbf{N}\\mathbf{x}_N$:
$$Z = \\mathbf{c}_B^\\top \\mathbf{B}^{-1}\\mathbf{b} + \\left(\\mathbf{c}_N^\\top - \\mathbf{c}_B^\\top \\mathbf{B}^{-1}\\mathbf{N}\\right) \\mathbf{x}_N$$

El vector de **costos reducidos** $\\mathbf{r}_N^\\top$ asociado a las variables no básicas es:
$$\\mathbf{r}_N^\\top = \\mathbf{c}_N^\\top - \\mathbf{c}_B^\\top \\mathbf{B}^{-1}\\mathbf{N}$$

<Callout type="info">
**Criterio de Optimalidad:**
- Para **Minimización:** La base $\\mathbf{B}$ es óptima si $\\mathbf{r}_N \\ge \\mathbf{0}$.
- Para **Maximización:** La base $\\mathbf{B}$ es óptima si $\\mathbf{r}_N \\le \\mathbf{0}$.
</Callout>

---

## 3. Implementación Matricial en NumPy

```python
import numpy as np

def simplex_matricial_paso(A, b, c, B_idx, N_idx):
    \"\"\"Calcula un paso algebraico del Simplex Matricial.\"\"\"
    B = A[:, B_idx]
    N = A[:, N_idx]
    cB = c[B_idx]
    cN = c[N_idx]
    
    # Inversa de base (o resolución de sistemas B @ xB = b)
    xB = np.linalg.solve(B, b)
    
    # Multiplicador simplex pi^T = cB^T @ B^(-1)
    pi = np.linalg.solve(B.T, cB)
    
    # Costos reducidos: r_N^T = cN^T - pi^T @ N
    r_N = cN - pi @ N
    
    print(f"Variables básicas:    {B_idx}")
    print(f"Valores x_B:          {np.round(xB, 4)}")
    print(f"Vector multiplicador: {np.round(pi, 4)}")
    print(f"Costos reducidos r_N: {np.round(r_N, 4)}")
    
    es_optimo = np.all(r_N >= -1e-8)  # Para minimización
    return es_optimo, xB, pi, r_N

# Ejemplo canónico con holguras
A = np.array([
    [1.0, 2.0, 1.0, 0.0],
    [3.0, 2.0, 0.0, 1.0]
])
b = np.array([6.0, 12.0])
c = np.array([-2.0, -3.0, 0.0, 0.0])  # Minimizar -2x1 - 3x2

# Base inicial trivial: columnas de holgura (idx 2 y 3)
es_opt, xB, pi, r_N = simplex_matricial_paso(A, b, c, [2, 3], [0, 1])
print(f"¿Es óptima la base inicial?: {es_opt}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Simplex Matricial"
  questions={[
    {
      id: "q_ratio_test",
      text: "¿Por qué en la regla del cociente mínimo x_Bi / y_ik solo se consideran denominadores estrictamente positivos y_ik > 0?",
      options: [
        { id: "a", text: "Porque si y_ik <= 0, incrementar la variable entrante no disminuye la variable básica correspondiente, no poniendo en riesgo su no negatividad", isCorrect: true, explanation: "Correcto: Si todos los y_ik <= 0, la variable entrante puede crecer hasta infinito sin que ninguna variable básica se vuelva negativa, implicando que el problema es no acotado." },
        { id: "b", text: "Porque no se puede dividir algebraicamente por cero o negativos en ninguna ecuación", isCorrect: false, explanation: "Algebraicamente la división existe; el motivo es la preservación de la factibilidad x >= 0." },
        { id: "c", text: "Porque garantiza que el determinante de la base permanezca constante", isCorrect: false, explanation: "El determinante cambia tras cada pivoteo." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c2_dir,
        filename="02-solvers-optimizacion-python.mdx",
        title="Implementación y Resolución con Solvers Modernos en Python",
        order=2,
        description="Modelado y resolución de problemas industriales a gran escala mediante SciPy, PuLP y CVXPY con análisis post-óptimo.",
        bloom_level="CREATE",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la principal ventaja arquitectónica de CVXPY frente a solvers lineales dedicados para modelado matemático avanzado?",
                "options": [
                    "Aplica las reglas de Disciplined Convex Programming (DCP) para verificar automáticamente la convexidad del problema antes de llamar al solver numérico subyacente.",
                    "Es un lenguaje ensamblador para chips cuánticos.",
                    "Solo admite variables enteras booleanas.",
                    "No requiere ninguna librería matemática en el sistema operativo."
                ],
                "answer": 0,
                "explanation": "CVXPY implementa la metodología DCP, analizando la composición matemática del grafo computacional para certificar que el problema es formalmente convexo, transformándolo a formas cónicas estándar para solvers como ECOS, SCS, Clarabel y OSQP."
            }
        ],
        content_body="""# Solvers Modernos de Optimización en Python: SciPy, PuLP y CVXPY

> En la práctica del ingeniero posgraduado, la formulación matemática se traduce a frameworks computacionales de alto nivel que compilan modelos hacia motores numéricos industriales (*solvers*) como **HiGHS**, **CBC**, **OSQP** y **Gurobi**.

---

## 1. El Ecosistema de Solvers en Python

| Framework | Enfoque Principal | Solvers Integrados / Soportados |
| :--- | :--- | :--- |
| **`scipy.optimize.linprog`** | PL continuo estándar y de gran escala | HiGHS (Dual Simplex, Interior Point) |
| **`PuLP`** | PL y Programación Entera Mixta (MIP) | CBC, GLPK, CPLEX, Gurobi |
| **`CVXPY`** | Programación Convexa Disciplinada (DCP): LP, QP, SOCP, SDP | Clarabel, OSQP, SCS, MOSEK |

---

## 2. Resolución a Gran Escala con SciPy y el Solver HiGHS

El solver **HiGHS** (desarrollado en la Universidad de Edimburgo) es el estándar libre de mayor rendimiento para problemas lineales y enteros continuos.

```python
import numpy as np
from scipy.optimize import linprog

# Minimizar c^T x sujeto a A_ub x <= b_ub, A_eq x == b_eq
c = np.array([-5.0, -4.0, -6.0])

A_ub = np.array([
    [1.0, 1.0, 1.0],   # Horas totales
    [3.0, 2.0, 4.0]    # Materia prima
])
b_ub = np.array([100.0, 250.0])

bounds = [(0, None), (0, None), (0, None)]

res = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method="highs-ds")

print("--- REPORTE SCI-PY / HIGHS ---")
print(f"Éxito en convergencia: {res.success}")
print(f"Solución x*:           {res.x}")
print(f"Costo Óptimo Z*:       {res.fun:.4f}")
print(f"Precios sombra duales: {res.ineqlin.marginals}")
print(f"Holguras de recursos:  {res.ineqlin.slack}")
```

---

## 3. Modelado Convexo Robusto con CVXPY

```python
import cvxpy as cp
import numpy as np

# Definición de variables vectoriales
n_vars = 3
x = cp.Variable(n_vars, nonneg=True)

# Parámetros del modelo
c_cost = np.array([5.0, 4.0, 6.0])
A_mat = np.array([[1.0, 1.0, 1.0], [3.0, 2.0, 4.0]])
b_vec = np.array([100.0, 250.0])

# Formulación DCP (Disciplined Convex Programming)
objective = cp.Maximize(c_cost @ x)
constraints = [A_mat @ x <= b_vec]

problem = cp.Problem(objective, constraints)
problem.solve(solver=cp.CLARABEL)

print("--- REPORTE CVXPY ---")
print(f"Estado:               {problem.status}")
print(f"Valor óptimo máximo:  {problem.value:.4f}")
print(f"Asignación óptima x*: {x.value}")
print(f"Multiplicadores dual: {constraints[0].dual_value}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Solvers de Optimización"
  questions={[
    {
      id: "q_solver_highs",
      text: "¿Por qué el método highs-ds (Dual Simplex) suele ser preferido frente a Primal Simplex en problemas de optimización lineal?",
      options: [
        { id: "a", text: "Es más robusto numéricamente ante perturbaciones y permite arranques en caliente (warm-start) inmediatos tras añadir restricciones", isCorrect: true, explanation: "Correcto: El Dual Simplex mantiene la optimalidad dual mientras busca la factibilidad primal, permitiendo reoptimizar de forma instantánea al añadir planos de corte en algoritmos de Branch and Bound." },
        { id: "b", text: "Porque no requiere matrices invertibles", isCorrect: false, explanation: "Ambos métodos operan sobre bases invertibles B." },
        { id: "c", text: "Porque convierte problemas NP-difíciles en problemas lineales en tiempo O(1)", isCorrect: false, explanation: "El algoritmo Simplex mantiene su complejidad exponencial en el peor de los casos." }
      ]
    }
  ]}
/>"""
    )
    print("S0 Courses built successfully.")

if __name__ == "__main__":
    build_s0()
