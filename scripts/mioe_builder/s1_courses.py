from .common import write_course_meta, write_module_meta, write_lesson

def build_s1():
    print("Building S1 Courses...")
    
    # -------------------------------------------------------------
    # COURSE 3: mioe-s1-programacion-lineal-avanzada (IO113)
    # -------------------------------------------------------------
    c3_slug = "mioe-s1-programacion-lineal-avanzada"
    c3_dir = write_course_meta(
        slug=c3_slug,
        title="Programación Lineal Avanzada",
        code="IO113",
        description="Teoría poliédrica, geometría de la optimización, Simplex Revisado con actualización de factores de base, descomposición a gran escala y generación de columnas."
    )
    
    # Module 1: 01-teoria-poliedros-simplex-revisado
    m1_c3_dir = write_module_meta(c3_dir, "01-teoria-poliedros-simplex-revisado", "Módulo 1: Teoría Poliédrica y Simplex Revisado", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c3_dir,
        filename="01-poliedros-convexos-direcciones-extremas.mdx",
        title="Poliedros Convexos, Vértices y Direcciones Extremas",
        order=1,
        description="Teorema de representación de Minkowski-Weyl, conos poliédricos, bases adyacentes y caracterización algebraica de puntos extremos.",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "De acuerdo con el Teorema de Representación de Minkowski-Weyl, ¿cómo se descompone formalmente cualquier punto x de un poliedro no acotado P = {x : Ax <= b, x >= 0}?",
                "options": [
                    "Como la suma de una combinación convexa de sus puntos extremos finitos más una combinación cónica no negativa de sus direcciones extremas.",
                    "Como el producto tensorial de sus autovalores dominantes.",
                    "Como una serie de Fourier truncada en el orden m.",
                    "Como una combinación lineal entera con coeficientes de Gomory."
                ],
                "answer": 0,
                "explanation": "El Teorema de Minkowski-Weyl establece que P = conv(V) + cone(D), donde conv(V) es el politopo generado por los puntos extremos finitos y cone(D) es el cono de recesión generado por las direcciones extremas del poliedro."
            }
        ],
        content_body="""# Teoría Poliédrica, Puntos Extremos y Direcciones de Descenso

> La Programación Lineal Avanzada trasciende la mera aritmética de tableros para fundamentarse en la geometría diferencial y algebraica de los poliedros convexos en espacios $\\mathbb{R}^n$.

---

## 1. Conos de Recesión y Direcciones Extremas

Sea el poliedro convexo $\\mathcal{P} = \\{ \\mathbf{x} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{x} = \\mathbf{b}, \\, \\mathbf{x} \\ge \\mathbf{0} \\}$.
Un vector no nulo $\\mathbf{d} \\in \\mathbb{R}^n$ con $\\mathbf{d} \\neq \\mathbf{0}$ es una **dirección de recesión** de $\\mathcal{P}$ si para todo $\\mathbf{x} \\in \\mathcal{P}$ y todo $\\theta \\ge 0$:
$$\\mathbf{x} + \\theta \\mathbf{d} \\in \\mathcal{P}$$

Sustituyendo en las restricciones:
$$\\mathbf{A}(\\mathbf{x} + \\theta \\mathbf{d}) = \\mathbf{b} \\implies \\mathbf{A}\\mathbf{x} + \\theta \\mathbf{A}\\mathbf{d} = \\mathbf{b} \\implies \\mathbf{A}\\mathbf{d} = \\mathbf{0}, \\quad \\mathbf{d} \\ge \\mathbf{0}$$

El conjunto de todas las direcciones de recesión forma el **cono de recesión** $\\operatorname{rec}(\\mathcal{P})$:
$$\\operatorname{rec}(\\mathcal{P}) = \\{ \\mathbf{d} \\in \\mathbb{R}^n : \\mathbf{A}\\mathbf{d} = \\mathbf{0}, \\, \\mathbf{d} \\ge \\mathbf{0} \\}$$

Una dirección $\\mathbf{d} \\in \\operatorname{rec}(\\mathcal{P})$ es una **dirección extrema** si no puede descomponerse como suma de dos direcciones no colineales de $\\operatorname{rec}(\\mathcal{P})$.

---

## 2. Teorema de Representación de Minkowski-Weyl

<Callout type="info">
**Teorema de Minkowski-Weyl:** Todo poliedro convexo $\\mathcal{P}$ que contenga al menos un punto extremo puede representarse como:
$$\\mathcal{P} = \\left\\{ \\sum_{k=1}^K \\lambda_k \\mathbf{v}_k + \\sum_{j=1}^J \\mu_j \\mathbf{d}_j : \\sum_{k=1}^K \\lambda_k = 1, \\, \\lambda_k \\ge 0, \\, \\mu_j \\ge 0 \\right\\}$$
donde $\\{\\mathbf{v}_1, \\dots, \\mathbf{v}_K\\}$ es el conjunto finito de **puntos extremos** y $\\{\\mathbf{d}_1, \\dots, \\mathbf{d}_J\\}$ es el conjunto finito de **direcciones extremas** normalizadas.
</Callout>

### Caracterización de Problemas No Acotados
Para un problema de minimización $\\min \\mathbf{c}^\\top \\mathbf{x}$, si existe una dirección extrema $\\mathbf{d}_j$ tal que:
$$\\mathbf{c}^\\top \\mathbf{d}_j < 0$$
entonces haciendo $\\mu_j \\to \\infty$, el valor de la función objetivo tiende a $-\\infty$, certificando analíticamente que el problema es **no acotado**.

---

## 3. Demostración Computacional en Python

```python
import numpy as np

# Matriz de restricciones de un poliedro no acotado
# x1 - x2 <= 2, x1, x2 >= 0
# En forma estándar con holgura s1: x1 - x2 + s1 = 2
A = np.array([[1.0, -1.0, 1.0]])
b = np.array([2.0])
c = np.array([-2.0, -3.0, 0.0]) # Minimizar -2x1 - 3x2

# Dirección de recesión d = [1, 1, 0]^T
d = np.array([1.0, 1.0, 0.0])

# Verificación de que d pertenece al cono de recesión: A @ d == 0 y d >= 0
val_Ad = A @ d
costo_direccion = c @ d

print(f"A @ d: {val_Ad} (Debe ser idénticamente 0)")
print(f"Costo de la dirección c^T @ d: {costo_direccion:.2f}")

if np.allclose(val_Ad, 0) and costo_direccion < 0:
    print("¡Certificado analítico: El problema es NO ACOTADO a lo largo del rayo d!")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Geometría Poliédrica"
  questions={[
    {
      id: "q_poly_bounded",
      text: "¿Bajo qué condición topológica un poliedro P es un politopo acotado (compacto)?",
      options: [
        { id: "a", text: "Cuando su cono de recesión contiene únicamente el vector nulo: rec(P) = {0}", isCorrect: true, explanation: "Correcto: Si no existen direcciones no nulas d >= 0 tales que Ad = 0, el conjunto no puede extenderse infinitamente y es compacto." },
        { id: "b", text: "Cuando todos los coeficientes c_j son estrictamente positivos", isCorrect: false, explanation: "La propiedad de acotamiento es intrínseca a la región factible P, independiente de c." },
        { id: "c", text: "Cuando m = n exactamente", isCorrect: false, explanation: "Eso solo indica que el sistema cuadrado tiene solución única si es invertible." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c3_dir,
        filename="02-algebra-simplex-revisado-factorizacion-eta.mdx",
        title="Álgebra del Simplex Revisado y Factorización Eta",
        order=2,
        description="Operación eficiente sobre bases invertidas, vectores multiplicadores simplex, matrices elementales Eta y actualización computacional.",
        bloom_level="EVALUATE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el método Simplex Revisado, ¿por qué se utiliza la actualización de matrices elementales Eta E_k en lugar de reinvertir la base B en cada iteración?",
                "options": [
                    "Porque la actualización Eta reduce el costo computacional de O(m^3) a O(m^2) operaciones por iteración y preserva la esparsidad.",
                    "Porque elimina por completo la necesidad de almacenar el vector de costos.",
                    "Porque transforma el problema en una ecuación cuadrática continua.",
                    "Porque evita el uso de números racionales."
                ],
                "answer": 0,
                "explanation": "Al reemplazar una sola columna de la base B en cada paso, la nueva inversa B_{k+1}^(-1) = E_k B_k^(-1) se obtiene multiplicando por una matriz Eta elemental (la identidad modificada en una columna), requiriendo solo O(m^2) o menos con estructuras esparsas."
            }
        ],
        content_body="""# Álgebra del Simplex Revisado y Factorización Eta

> En problemas lineales industriales con decenas de miles de restricciones, reinvertir la matriz básica $\\mathbf{B}$ con costo $O(m^3)$ en cada pivoteo es inviable. El **Simplex Revisado con matrices Eta** actualiza la inversa con complejidad $O(m^2)$ preservando esparsidad.

---

## 1. El Algoritmo Simplex Revisado

En cada iteración:
1. **Calcular multiplicador dual (BSTEP):**
   Resolver para $\\boldsymbol{\\pi}$:
   $$\\mathbf{B}^\\top \\boldsymbol{\\pi} = \\mathbf{c}_B \\implies \\boldsymbol{\\pi}^\\top = \\mathbf{c}_B^\\top \\mathbf{B}^{-1}$$
2. **Elegir variable entrante $x_q$ (PRICING):**
   $$r_q = c_q - \\boldsymbol{\\pi}^\\top \\mathbf{A}_{\\cdot q} = \\min_{j \\in N} \\{ c_j - \\boldsymbol{\\pi}^\\top \\mathbf{A}_{\\cdot j} \\}$$
   Si $r_q \\ge 0$, la base actual es óptima.
3. **Calcular vector de dirección en la base (FSTEP):**
   Resolver para $\\mathbf{d}$:
   $$\\mathbf{B} \\mathbf{d} = \\mathbf{A}_{\\cdot q} \\implies \\mathbf{d} = \\mathbf{B}^{-1} \\mathbf{A}_{\\cdot q}$$
4. **Regla del cociente mínimo (RSTEP):**
   $$\\theta^* = \\min_{i : d_i > 0} \\frac{x_{B,i}}{d_i} = \\frac{x_{B,p}}{d_p}$$
   La variable básica $p$-ésima sale de la base.
5. **Actualización de base (UPSTEP):**
   La nueva base $\\mathbf{B}_{new}$ difiere de $\\mathbf{B}$ únicamente en que su columna $p$-ésima es reemplazada por $\\mathbf{A}_{\\cdot q}$.

---

## 2. Matrices Elementales Eta ($E$)

La nueva inversa satisface:
$$\\mathbf{B}_{new}^{-1} = \\mathbf{E}_k \\mathbf{B}^{-1}$$
donde $\\mathbf{E}_k$ es una matriz idéntica a la identidad $\\mathbf{I}_m$, excepto en su columna $p$-ésima:
$$\\mathbf{E}_k = \\begin{bmatrix} 1 & & \\eta_1 & & \\\\ & \\ddots & \\vdots & & \\\\ & & \\eta_p & & \\\\ & & \\vdots & \\ddots & \\\\ & & \\eta_m & & 1 \\end{bmatrix}, \\quad \\text{con } \\eta_p = \\frac{1}{d_p}, \\quad \\eta_i = -\\frac{d_i}{d_p} \\, (i \\neq p)$$

---

## 3. Implementación en Python

```python
import numpy as np

def update_eta(B_inv, d, p):
    \"\"\"Actualiza B_inv multiplicando por la matriz elemental Eta E.\"\"\"
    m = len(d)
    eta = np.zeros(m)
    eta[p] = 1.0 / d[p]
    for i in range(m):
        if i != p:
            eta[i] = -d[i] / d[p]
            
    # Construcción de la matriz Eta
    E = np.eye(m)
    E[:, p] = eta
    
    # Nueva inversa
    B_inv_new = E @ B_inv
    return B_inv_new, E

# Demostración numérica
B_inv_old = np.array([
    [1.0, 0.0],
    [-2.0, 1.0]
])
# Vector de columna transformada d = B^(-1) @ A_{.q}
d_vec = np.array([2.0, 4.0])
p_pivot = 0 # Sale la fila 0

B_inv_next, E_mat = update_eta(B_inv_old, d_vec, p_pivot)
print("Matriz Eta E:")
print(E_mat)
print("\nNueva inversa B_inv_new:")
print(B_inv_next)
```
""",
        quiz_component="""<Quiz
  title="Quiz: Simplex Revisado y Matrices Eta"
  questions={[
    {
      id: "q_eta_chain",
      text: "En implementaciones comerciales como CPLEX o Gurobi, ¿por qué periódicamente se 'reinvierten' las bases tras un número fijado de iteraciones (ej. cada 50 iteraciones)?",
      options: [
        { id: "a", text: "Para evitar la acumulación de errores de redondeo numérico en la cadena de factores Eta y purgar el llenado (fill-in) de no ceros", isCorrect: true, explanation: "Correcto: Tras muchas iteraciones, la cadena de matrices Eta B^(-1) = E_k ... E_1 B_0^(-1) consume memoria y propaga errores de punto flotante. La refactorización LU restaura la precisión." },
        { id: "b", text: "Porque el algoritmo olvida el óptimo alcanzado", isCorrect: false, explanation: "La base define unívocamente la solución." },
        { id: "c", text: "Para cambiar la función objetivo a un modelo no lineal", isCorrect: false, explanation: "El modelo permanece lineal." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-descomposicion-generacion-columnas
    m2_c3_dir = write_module_meta(c3_dir, "02-descomposicion-generacion-columnas", "Módulo 2: Descomposición y Generación de Columnas", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c3_dir,
        filename="01-principio-descomposicion-dantzig-wolfe.mdx",
        title="Principio de Descomposición de Dantzig-Wolfe",
        order=1,
        description="Estructura angular en bloques, problema maestro restringido (RMP), subproblemas convexos y precios sombra coordinadores.",
        bloom_level="ANALYZE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la estructura matemática requerida en un problema de optimización lineal para aplicar con máxima eficiencia la Descomposición de Dantzig-Wolfe?",
                "options": [
                    "Una estructura 'angular en bloques' con restricciones acopladoras generales y bloques de restricciones independientes por división/periodo.",
                    "Una matriz de restricciones completamente ortogonal sin ninguna variable compartida.",
                    "Un problema no lineal con restricciones sinusoidales continuas.",
                    "Una matriz estrictamente antisimétrica de dimensión impar."
                ],
                "answer": 0,
                "explanation": "La descomposición explota estructuras donde un conjunto de restricciones comunes (recursos corporativos compartidos) acopla varios subsistemas independientes, permitiendo resolver subproblemas desacoplados coordinados por un Problema Maestro."
            }
        ],
        content_body="""# Principio de Descomposición de Dantzig-Wolfe

> Desarrollado por George Dantzig y Philip Wolfe (1960), este principio permite resolver problemas lineales con millones de variables explotando estructuras matriciales angulares en bloques mediante precios descentralizados.

---

## 1. Estructura Angular en Bloques

Consideremos el problema:
$$\\begin{aligned}
\\min \\quad & \\mathbf{c}_1^\\top \\mathbf{x}_1 + \\mathbf{c}_2^\\top \\mathbf{x}_2 + \\dots + \\mathbf{c}_K^\\top \\mathbf{x}_K \\\\
\\text{s.a.} \\quad & \\mathbf{L}_1 \\mathbf{x}_1 + \\mathbf{L}_2 \\mathbf{x}_2 + \\dots + \\mathbf{L}_K \\mathbf{x}_K = \\mathbf{b}_0 \\quad & (\\text{Restricciones de Acoplamiento}) \\\\
& \\mathbf{A}_k \\mathbf{x}_k = \\mathbf{b}_k, \\, \\mathbf{x}_k \\ge \\mathbf{0} \\quad (k=1,\\dots,K) & (\\text{Subproblemas Independientes } X_k)
\\end{aligned}$$

---

## 2. El Problema Maestro y los Subproblemas

Aplicando el Teorema de Minkowski-Weyl a cada politopo acotado $X_k = \\operatorname{conv}(\\{\\mathbf{v}_k^1, \\dots, \\mathbf{v}_k^{P_k}\\})$, cualquier $\\mathbf{x}_k \\in X_k$ se expresa como:
$$\\mathbf{x}_k = \\sum_{p=1}^{P_k} \\lambda_k^p \\mathbf{v}_k^p, \\quad \\sum_{p=1}^{P_k} \\lambda_k^p = 1, \\quad \\lambda_k^p \\ge 0$$

### Problema Maestro Restringido (RMP)
En lugar de enumerar todos los vértices extremos $P_k$ (número astronómico), el RMP trabaja sobre un subconjunto inicial pequeño de propuestas generadas.

Sean $\\boldsymbol{\\pi}$ el vector dual de las restricciones de acoplamiento y $\\sigma_k$ el multiplicador de convexidad.

### Subproblema de Precios $k$-ésimo
Para evaluar si existe un nuevo vértice extremo que reduzca el costo:
$$\\min_{\\mathbf{x}_k \\in X_k} \\left( \\mathbf{c}_k^\\top - \\boldsymbol{\\pi}^\\top \\mathbf{L}_k \\right) \\mathbf{x}_k - \\sigma_k$$

- Si el valor óptimo del subproblema es $< 0$, el nuevo vértice óptimo $\\mathbf{x}_k^*$ genera una **columna con costo reducido negativo** que se incorpora al RMP.
- Si para todos los subproblemas el valor mínimo es $\\ge 0$, la solución del RMP es el **óptimo global exacto**.
""",
        quiz_component="""<Quiz
  title="Quiz: Descomposición de Dantzig-Wolfe"
  questions={[
    {
      id: "q_dw_prices",
      text: "¿Qué papel económico desempeñan los multiplicadores duales pi de las restricciones de acoplamiento transferidos desde el Maestro a los Subproblemas?",
      options: [
        { id: "a", text: "Actúan como precios internos de transferencia que penalizan a cada subsistema por el consumo de los recursos corporativos escasos", isCorrect: true, explanation: "Correcto: pi ajusta el vector de costos unitarios de los subproblemas a (c_k - pi^T L_k), coordinando de forma descentralizada el uso óptimo de recursos escasos compartidos." },
        { id: "b", text: "Obligan a los subproblemas a anular su producción", isCorrect: false, explanation: "Los precios incentivan propuestas eficientes, no el cese de operaciones." },
        { id: "c", text: "Son números aleatorios sin interpretación económica", isCorrect: false, explanation: "Son precios sombra de equilibrio de mercado." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c3_dir,
        filename="02-generacion-columnas-cutting-stock.mdx",
        title="Algoritmo de Generación de Columnas y el Cutting Stock Problem",
        order=2,
        description="Formulación de Gilmore-Gomory, subproblema de la mochila (Knapsack) desacoplado y resolución computacional en Python.",
        bloom_level="CREATE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "En la formulación de Gilmore-Gomory para el problema de corte de patrones (Cutting Stock Problem), ¿cómo se formula matemáticamente el subproblema de generación de columnas para determinar el patrón entrante más rentable?",
                "options": [
                    "Como un problema de la Mochila Entera (Knapsack) donde los pesos son los anchos w_i, la capacidad es el rollo maestro W y los valores de utilidad son los precios sombra duales pi_i.",
                    "Como un problema de ordenamiento topológico en grafos acíclicos.",
                    "Como una factorización de valores singulares de una matriz aleatoria.",
                    "Como un modelo cuadrático sin restricciones de capacidad."
                ],
                "answer": 0,
                "explanation": "El costo reducido de un patrón a = [a_1, ..., a_m]^T es 1 - pi^T a. Para minimizar el costo reducido se maximiza pi^T a sujeto a sum w_i a_i <= W, lo cual es exactamente un problema de la Mochila Entera 0-1/acotado."
            }
        ],
        content_body="""# Generación de Columnas y el Cutting Stock Problem

> En 1961, P. Gilmore y R. Gomory revolucionaron la optimización combinatoria al formular el problema de corte de material (*Cutting Stock Problem*) resolviendo implícitamente problemas con millones de variables mediante la generación bajo demanda de columnas factibles.

---

## 1. Formulación de Gilmore-Gomory

Una fábrica de papel dispone de rollos maestros de ancho estándar $W$. Se deben satisfacer demandas de $d_i$ piezas de ancho $w_i$ ($i=1,\\dots,m$).

Un **patrón de corte** $j$ es un vector entero $\\mathbf{a}_j = [a_{1j}, a_{2j}, \\dots, a_{mj}]^\\top$ que satisface:
$$\\sum_{i=1}^m w_i a_{ij} \\le W, \\quad a_{ij} \\in \\mathbb{Z}_+$$

### Problema Maestro Relajado (RMP):
$$\\begin{aligned}
\\min \\quad & \\sum_{j=1}^P x_j \\\\
\\text{s.a.} \\quad & \\sum_{j=1}^P a_{ij} x_j \\ge d_i, \\quad \\forall i=1,\\dots,m \\\\
& x_j \\ge 0
\\end{aligned}$$

---

## 2. El Subproblema de Fijación de Precios (*Pricing Problem*)

Dado el vector de multiplicadores duales $\\boldsymbol{\\pi} \\ge \\mathbf{0}$ obtenido del RMP:
El costo reducido de una columna generada por un patrón $\\mathbf{a}$ es:
$$r(\\mathbf{a}) = 1 - \\sum_{i=1}^m \\pi_i a_i$$

Para encontrar la columna más atractiva ($r(\\mathbf{a}) < 0$), minimizamos $r(\\mathbf{a})$, lo cual es equivalente a resolver el **Problema de la Mochila (Knapsack)**:
$$\\begin{aligned}
z_{KS}^* = \\max \\quad & \\sum_{i=1}^m \\pi_i a_i \\\\
\\text{s.a.} \\quad & \\sum_{i=1}^m w_i a_i \\le W \\\\
& a_i \\in \\mathbb{Z}_+, \\quad i=1,\\dots,m
\\end{aligned}$$

<Callout type="info">
**Criterio de Parada:**
- Si $z_{KS}^* > 1$, entonces $r(\\mathbf{a}^*) = 1 - z_{KS}^* < 0$: se añade la columna $\\mathbf{a}^*$ al RMP y se reoptimiza.
- Si $z_{KS}^* \\le 1$, ninguna columna puede mejorar la solución actual: la solución del RMP es el **óptimo global exacto de la relajación lineal**.
</Callout>

---

## 3. Implementación Completa en Python

```python
import numpy as np
from scipy.optimize import linprog

def solve_cutting_stock(W, widths, demands, max_iters=20):
    m = len(widths)
    # Patrones iniciales diagonales triviales: floor(W / w_i)
    patterns = []
    for i in range(m):
        pat = np.zeros(m)
        pat[i] = int(W // widths[i])
        patterns.append(pat)
        
    patterns = np.array(patterns).T # Matriz m x n_patrones
    
    for it in range(max_iters):
        # 1. Resolver RMP
        n_p = patterns.shape[1]
        c = np.ones(n_p)
        res = linprog(c, A_ub=-patterns, b_ub=-np.array(demands), bounds=(0, None), method="highs")
        
        pi = res.ineqlin.marginals # Precios sombra duales
        
        # 2. Resolver Subproblema Mochila (heurística voraz / programación dinámica)
        # Max sum(pi_i * a_i) s.a. sum(w_i * a_i) <= W
        # Para ilustración con DP exacta:
        dp = np.zeros(int(W) + 1)
        best_choice = [[] for _ in range(int(W) + 1)]
        for cap in range(1, int(W) + 1):
            for i in range(m):
                if widths[i] <= cap:
                    val = dp[cap - int(widths[i])] + pi[i]
                    if val > dp[cap]:
                        dp[cap] = val
                        best_choice[cap] = best_choice[cap - int(widths[i])] + [i]
                        
        z_ks = dp[int(W)]
        new_pattern = np.zeros(m)
        for idx in best_choice[int(W)]:
            new_pattern[idx] += 1
            
        print(f"Iteración {it+1}: RMP rollos={res.fun:.2f}, Valor Mochila={z_ks:.4f}")
        
        if z_ks <= 1.0 + 1e-6:
            print(">>> ¡Optimalidad alcanzada! Ningún patrón mejora el costo.")
            return res.fun, patterns, res.x
            
        # Añadir nueva columna
        patterns = np.column_stack([patterns, new_pattern])
        
    return res.fun, patterns, res.x

W_master = 100
item_widths = [22, 35, 42]
item_demands = [110, 85, 40]

min_rolls, final_patterns, x_opt = solve_cutting_stock(W_master, item_widths, item_demands)
print(f"Mínimo teórico de rollos maestros: {min_rolls:.2f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Generación de Columnas"
  questions={[
    {
      id: "q_cg_integrality",
      text: "¿Qué procedimiento se utiliza cuando la solución final del algoritmo de Gilmore-Gomory arroja variables fraccionarias de patrones y se requieren rollos enteros?",
      options: [
        { id: "a", text: "Integrar la generación de columnas dentro de un árbol de Branch and Bound (algoritmo Branch and Price)", isCorrect: true, explanation: "Correcto: El algoritmo Branch and Price resuelve el RMP mediante generación de columnas en cada nodo del árbol de ramificación para obtener soluciones enteras puras óptimas." },
        { id: "b", text: "Truncar todos los decimales a cero independientemente de la demanda", isCorrect: false, explanation: "Eso violaría las restricciones de demanda no satisfaciendo a los clientes." },
        { id: "c", text: "Reemplazar los anchos por números imaginarios", isCorrect: false, explanation: "Las dimensiones físicas son reales y estrictamente positivas." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 4: mioe-s1-analisis-multivariado (IO123)
    # -------------------------------------------------------------
    c4_slug = "mioe-s1-analisis-multivariado"
    c4_dir = write_course_meta(
        slug=c4_slug,
        title="Análisis Multivariado",
        code="IO123",
        description="Modelado probabilístico en R^p, distribución normal multivariante, contrastes de hipótesis vectoriales de Hotelling, PCA, análisis factorial y discriminante."
    )
    
    # Module 1: 01-distribucion-normal-multivariada
    m1_c4_dir = write_module_meta(c4_dir, "01-distribucion-normal-multivariada", "Módulo 1: Normal Multivariada y Test de Hotelling", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c4_dir,
        filename="01-vector-medias-matriz-covarianza-wishart.mdx",
        title="Vector de Medias, Matriz de Covarianzas y Distribución de Wishart",
        order=1,
        description="Densidad normal p-dimensional, distancia de Mahalanobis, elipsoides de confianza y distribución matricial de Wishart.",
        bloom_level="ANALYZE",
        est_minutes=65,
        quiz_frontmatter=[
            {
                "question": "En la distribución Normal Multivariada N_p(mu, Sigma), ¿qué representa geométricamente la forma cuadrática (x - mu)^T Sigma^(-1) (x - mu) = c^2?",
                "options": [
                    "Un elipsoide centrado en mu cuyos ejes principales están alineados con los vectores propios de Sigma y longitudes proporcionales a las raíces cuadradas de los valores propios.",
                    "Un hiperplano infinito ortogonal al vector de medias.",
                    "Una parábola degenerada sin curvatura.",
                    "Una esfera perfecta unitaria independientemente de las covarianzas."
                ],
                "answer": 0,
                "explanation": "La distancia cuadrática de Mahalanobis genera superficies de contorno de densidad constante con forma elipsoidal, donde la descomposición espectral de Sigma define las direcciones y magnitudes de la dispersión de los datos."
            }
        ],
        content_body="""# La Distribución Normal Multivariada y la Distribución de Wishart

> La inferencia estadística sobre múltiples variables correlacionadas requiere generalizar el cálculo escalar a vectores aleatorios $\\mathbf{X} \\in \\mathbb{R}^p$ y matrices aleatorias de dispersión.

---

## 1. Función de Densidad Normal Multivariante

Un vector aleatorio $\\mathbf{X} = [X_1, \\dots, X_p]^\\top$ sigue una distribución **Normal Multivariante** $\\mathcal{N}_p(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$ si su función de densidad de probabilidad conjunta es:
$$f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left( -\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^\\top \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\right)$$

donde:
- $\\boldsymbol{\\mu} = \\mathbb{E}[\\mathbf{X}] \\in \\mathbb{R}^p$ es el vector de medias poblacionales.
- $\\boldsymbol{\\Sigma} = \\mathbb{E}[(\\mathbf{X}-\\boldsymbol{\\mu})(\\mathbf{X}-\\boldsymbol{\\mu})^\\top] \\in \\mathbb{R}^{p \\times p}$ es la matriz de covarianzas, simétrica y estrictamente definida positiva ($\\boldsymbol{\\Sigma} \\succ 0$).

---

## 2. Distancia de Mahalanobis y Contornos de Densidad

La **distancia estadística de Mahalanobis** entre una observación $\\mathbf{x}$ y el centroide $\\boldsymbol{\\mu}$ es:
$$D_M^2(\\mathbf{x}, \\boldsymbol{\\mu}) = (\\mathbf{x} - \\boldsymbol{\\mu})^\\top \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})$$

<Callout type="info">
**Propiedad de Distribución:** Si $\\mathbf{X} \\sim \\mathcal{N}_p(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$, la distancia cuadrática de Mahalanobis sigue exactamente una distribución Chi-cuadrado con $p$ grados de libertad:
$$D_M^2(\\mathbf{X}, \\boldsymbol{\\mu}) \\sim \\chi_p^2$$
Por tanto, el elipsoide $\\{ \\mathbf{x} : (\\mathbf{x}-\\boldsymbol{\\mu})^\\top \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x}-\\boldsymbol{\\mu}) \\le \\chi_{p}^2(1-\\alpha) \\}$ contiene exactamente el $(1-\\alpha)100\\%$ de la masa de probabilidad.
</Callout>

---

## 3. La Distribución Matricial de Wishart

En estadística univariada, la suma de cuadrados $\\sum (X_i - \\bar{X})^2 / \\sigma^2 \\sim \\chi_{n-1}^2$. Su contraparte multivariada es la **Distribución de Wishart**.

Dadas $n$ observaciones independientes e idénticamente distribuidas $\\mathbf{X}_1, \\dots, \\mathbf{X}_n \\sim \\mathcal{N}_p(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$, la matriz de dispersión muestral:
$$\\mathbf{A} = (n-1) \\mathbf{S} = \\sum_{i=1}^n (\\mathbf{X}_i - \\bar{\\mathbf{X}})(\\mathbf{X}_i - \\bar{\\mathbf{X}})^\\top$$
sigue una distribución de Wishart con $n-1$ grados de libertad:
$$\\mathbf{A} \\sim \\mathcal{W}_p(n-1, \\boldsymbol{\\Sigma})$$
La distribución de Wishart es fundamental para derivar las distribuciones de los estadísticos multivariados de Hotelling, Wilks, Roy y Pillai.
""",
        quiz_component="""<Quiz
  title="Quiz: Geometría de la Normal Multivariada"
  questions={[
    {
      id: "q_cov_ortho",
      text: "Si dos componentes X_1 y X_2 de un vector normal multivariado tienen covarianza Cov(X_1, X_2) = 0, ¿qué se puede afirmar sobre su independencia estocástica?",
      options: [
        { id: "a", text: "Son estrictamente independientes (propiedad exclusiva de la distribución Normal)", isCorrect: true, explanation: "Correcto: Para la Normal multivariada, la incorrelación lineal (covarianza cero) es condición necesaria y suficiente para la independencia estadística mutua." },
        { id: "b", text: "No son independientes, solo ortogonales en media", isCorrect: false, explanation: "En distribuciones generales esto es cierto, pero en la Normal covarianza nula implica independencia estricta." },
        { id: "c", text: "Tienen varianzas idénticas", isCorrect: false, explanation: "La covarianza nula no restringe las varianzas individuales." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c4_dir,
        filename="02-inferencia-vectorial-test-t2-hotelling.mdx",
        title="Inferencia Vectorial y Test T² de Hotelling",
        order=2,
        description="Generalización multivariada de la prueba t de Student, contrastes simultáneos, regiones elipsoidales y MANOVA de una vía.",
        bloom_level="EVALUATE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "Al contrastar H0: mu = mu_0 frente a H1: mu != mu_0 con un estadístico T^2 de Hotelling muestral en R^p con n observaciones, ¿cuál es la relación exacta de distribución bajo H0?",
                "options": [
                    "((n - p) / (p * (n - 1))) * T^2 sigue exactamente una distribución F de Fisher con p y n - p grados de libertad.",
                    "T^2 sigue una distribución t de Student unidimensional con n - 1 grados de libertad.",
                    "T^2 es idénticamente igual a la constante de Euler.",
                    "T^2 diverge asintóticamente a una distribución Poisson."
                ],
                "answer": 0,
                "explanation": "Harold Hotelling demostró que bajo H0, la transformación lineal ((n - p) / (p*(n-1))) * T^2 sigue con total exactitud una distribución F_{p, n-p}, permitiendo contrastes de hipótesis vectoriales insesgados."
            }
        ],
        content_body="""# Inferencia Vectorial y Test T² de Hotelling

> Cuando un ingeniero industrial analiza simultáneamente múltiples indicadores de calidad (resistencia mecánica, elongación, rugosidad), ejecutar pruebas $t$ univariadas por separado infla catastróficamente el error tipo I familiar (problema de multiplicidad). El **Test $T^2$ de Hotelling** evalúa el vector conjuntamente.

---

## 1. El Estadístico T² de Hotelling para Una Muestra

Para contrastar:
$$H_0: \\boldsymbol{\\mu} = \\boldsymbol{\\mu}_0 \\quad \\text{vs.} \\quad H_1: \\boldsymbol{\\mu} \\neq \\boldsymbol{\\mu}_0$$
a partir de una muestra aleatoria de tamaño $n$ con vector de medias muestral $\\bar{\\mathbf{x}}$ y matriz de covarianza muestral $\\mathbf{S}$:
$$T^2 = n (\\bar{\\mathbf{x}} - \\boldsymbol{\\mu}_0)^\\top \\mathbf{S}^{-1} (\\bar{\\mathbf{x}} - \\boldsymbol{\\mu}_0)$$

Bajo la hipótesis nula $H_0$, el estadístico transformado sigue una distribución $F$:
$$F_{\\text{calc}} = \\frac{n - p}{p(n - 1)} T^2 \\sim \\mathcal{F}_{p, n - p}$$

Se rechaza $H_0$ a un nivel de significancia $\\alpha$ si:
$$T^2 > \\frac{p(n-1)}{n-p} F_{\\alpha}(p, n-p)$$

---

## 2. Test T² para Dos Muestras Independientes

Dadas dos poblaciones con tamaños $n_1$ y $n_2$, medias muestrales $\\bar{\\mathbf{x}}_1, \\bar{\\mathbf{x}}_2$ y matriz de covarianza agrupada común:
$$\\mathbf{S}_{pooled} = \\frac{(n_1 - 1)\\mathbf{S}_1 + (n_2 - 1)\\mathbf{S}_2}{n_1 + n_2 - 2}$$

El estadístico de dos muestras es:
$$T^2 = \\frac{n_1 n_2}{n_1 + n_2} (\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_2)^\\top \\mathbf{S}_{pooled}^{-1} (\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_2)$$
con distribución bajo $H_0: \\boldsymbol{\\mu}_1 = \\boldsymbol{\\mu}_2$:
$$\\frac{n_1 + n_2 - p - 1}{p(n_1 + n_2 - 2)} T^2 \\sim \\mathcal{F}_{p, n_1 + n_2 - p - 1}$$

---

## 3. Implementación en Python con SciPy

```python
import numpy as np
from scipy import stats

def hotelling_t2_one_sample(X, mu_0):
    n, p = X.shape
    x_bar = np.mean(X, axis=0)
    S = np.cov(X, rowvar=False) # Matriz de covarianza insesgada
    
    diff = x_bar - mu_0
    S_inv = np.linalg.inv(S)
    
    T2 = n * (diff.T @ S_inv @ diff)
    F_stat = ((n - p) / (p * (n - 1))) * T2
    p_value = 1.0 - stats.f.cdf(F_stat, dfn=p, dfd=n - p)
    
    return T2, F_stat, p_value

# Simulación de control de calidad con 3 variables físicas
np.random.seed(42)
n_muestras = 50
p_vars = 3
mu_objetivo = np.array([120.0, 50.0, 15.0])

# Proceso real ligeramente desviado en la primera variable
mu_real = np.array([123.5, 49.8, 15.1])
Sigma_proceso = np.array([
    [9.0, 2.0, 1.0],
    [2.0, 4.0, 0.5],
    [1.0, 0.5, 1.0]
])

datos = np.random.multivariate_normal(mu_real, Sigma_proceso, size=n_muestras)

T2, F, p_val = hotelling_t2_one_sample(datos, mu_objetivo)
print(f"Estadístico T2:    {T2:.4f}")
print(f"F transformado:    {F:.4f}")
print(f"Valor p:           {p_val:.6e}")
if p_val < 0.05:
    print(">>> Conclusión: Se rechaza H0. El vector de medias difiere significativamente del estándar.")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Hotelling y MANOVA"
  questions={[
    {
      id: "q_bonferroni_t2",
      text: "¿Por qué el elipsoide de confianza de Hotelling es superior a construir intervalos univariados individuales de Bonferroni para cada variable?",
      options: [
        { id: "a", text: "Porque captura formalmente la covarianza entre las variables, evitando aceptar puntos fuera del soporte real o rechazar puntos factibles altamente correlacionados", isCorrect: true, explanation: "Correcto: Los intervalos univariados forman una caja ortogonal que ignora la orientación oblicua del elipsoide inducida por las covarianzas no nulas." },
        { id: "b", text: "Porque duplica el tamaño de muestra de forma ficticia", isCorrect: false, explanation: "El tamaño de muestra no se altera." },
        { id: "c", text: "Porque siempre produce intervalos más anchos en todas las direcciones", isCorrect: false, explanation: "En ciertas direcciones correlacionadas el elipsoide es más estrecho y preciso." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-reduccion-dimensionalidad-clasificacion
    m2_c4_dir = write_module_meta(c4_dir, "02-reduccion-dimensionalidad-clasificacion", "Módulo 2: Reducción de Dimensionalidad y Clasificación", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c4_dir,
        filename="01-analisis-componentes-principales-pca-factorial.mdx",
        title="Análisis de Componentes Principales (PCA) y Factorial Exploratorio",
        order=1,
        description="Descomposición espectral de la matriz de covarianza, varianza explicada acumulada, scree plot, rotación Varimax y cargas factoriales.",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el Análisis de Componentes Principales (PCA), ¿cuál es la propiedad matemática de los valores propios lambda_i de la matriz de covarianza Sigma respecto a la varianza explicada?",
                "options": [
                    "lambda_i es exactamente la varianza de la i-ésima componente principal Y_i = v_i^T X, y la suma total de valores propios equivale a la varianza total de las variables originales.",
                    "lambda_i representa el sesgo asintótico del estimador.",
                    "Todos los valores propios son estrictamente números imaginarios puros.",
                    "Los valores propios siempre suman 1 sin importar las dimensiones."
                ],
                "answer": 0,
                "explanation": "Por el teorema de descomposición espectral, Var(Y_i) = v_i^T Sigma v_i = lambda_i. Además, sum lambda_i = tr(Sigma), por lo que la proporción de varianza explicada por la componente i es lambda_i / sum lambda_k."
            }
        ],
        content_body="""# Análisis de Componentes Principales (PCA) y Análisis Factorial

> La alta dimensionalidad ($p$ grande) introduce redundancia por colinealidad y la "maldición de la dimensionalidad". El **PCA** y el **Análisis Factorial Exploratorio (EFA)** permiten reducir el espacio preservando la estructura latente esencial.

---

## 1. Derivación Variacional del PCA

Buscamos una combinación lineal $Y_1 = \\mathbf{a}_1^\\top \\mathbf{X}$ tal que su varianza sea máxima sujeta a que $\\mathbf{a}_1$ sea un vector unitario:
$$\\max_{\\mathbf{a}_1} \\operatorname{Var}(\\mathbf{a}_1^\\top \\mathbf{X}) = \\mathbf{a}_1^\\top \\boldsymbol{\\Sigma} \\mathbf{a}_1 \\quad \\text{s.a.} \\quad \\mathbf{a}_1^\\top \\mathbf{a}_1 = 1$$

Formulando el Lagrangiano:
$$\\mathcal{L}(\\mathbf{a}_1, \\lambda_1) = \\mathbf{a}_1^\\top \\boldsymbol{\\Sigma} \\mathbf{a}_1 - \\lambda_1 (\\mathbf{a}_1^\\top \\mathbf{a}_1 - 1)$$
Derivando e igualando a cero:
$$\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{a}_1} = 2\\boldsymbol{\\Sigma}\\mathbf{a}_1 - 2\\lambda_1 \\mathbf{a}_1 = \\mathbf{0} \\implies \\boldsymbol{\\Sigma}\\mathbf{a}_1 = \\lambda_1 \\mathbf{a}_1$$

Esto demuestra que $\\mathbf{a}_1$ es el **vector propio** correspondiente al **mayor valor propio** $\\lambda_1 = \\lambda_{\\max}(\\boldsymbol{\\Sigma})$.

---

## 2. Modelo de Análisis Factorial Exploratorio (EFA)

A diferencia de PCA (que es una transformación ortogonal de datos), el Análisis Factorial postula un **modelo generativo probabilístico**:
$$\\mathbf{X} - \\boldsymbol{\\mu} = \\mathbf{L}\\mathbf{F} + \\boldsymbol{\\epsilon}$$
donde:
- $\\mathbf{F} \\sim \\mathcal{N}_m(\\mathbf{0}, \\mathbf{I})$ es el vector de $m < p$ factores comunes latentes no observables.
- $\\mathbf{L} \\in \\mathbb{R}^{p \\times m}$ es la matriz de **cargas factoriales** (*factor loadings*).
- $\\boldsymbol{\\epsilon} \\sim \\mathcal{N}_p(\\mathbf{0}, \\boldsymbol{\\Psi})$ es el vector de factores específicos (errores únicos), con $\\boldsymbol{\\Psi} = \\operatorname{diag}(\\psi_1, \\dots, \\psi_p)$.

La covarianza de $\\mathbf{X}$ se descompone exactamente como:
$$\\boldsymbol{\\Sigma} = \\mathbf{L}\\mathbf{L}^\\top + \\boldsymbol{\\Psi}$$

### Rotación Ortogonal Varimax
Para facilitar la interpretación de los factores, se aplica una matriz de rotación ortogonal $\\mathbf{T}$ (con $\\mathbf{T}\\mathbf{T}^\\top = \\mathbf{I}$) que maximiza la varianza de los cuadrados de las cargas dentro de cada columna (criterio de Kaiser):
$$V = \\sum_{j=1}^m \\left[ \\frac{1}{p} \\sum_{i=1}^p \\left( \\frac{l_{ij}^2}{h_i^2} \\right)^2 - \\left( \\frac{1}{p} \\sum_{i=1}^p \\frac{l_{ij}^2}{h_i^2} \\right)^2 \\right]$$
""",
        quiz_component="""<Quiz
  title="Quiz: PCA y Factorial"
  questions={[
    {
      id: "q_pca_standardize",
      text: "¿Por qué es crucial estandarizar los datos (usar la matriz de correlación R en lugar de covarianza Sigma) antes de aplicar PCA cuando las variables tienen escalas físicas dispares?",
      options: [
        { id: "a", text: "Para evitar que variables con escalas numéricas arbitrariamente grandes (ej. ingresos en millones) dominen artificialmente los primeros componentes", isCorrect: true, explanation: "Correcto: Si no se estandariza a varianza unitaria, la variable con mayor varianza numérica absoluta monopolizará el primer vector propio sin reflejar la correlación real." },
        { id: "b", text: "Porque el determinante de Sigma siempre es negativo si no se estandariza", isCorrect: false, explanation: "Sigma es definida semipositiva, su determinante nunca es negativo." },
        { id: "c", text: "Para reducir el número de observaciones n", isCorrect: false, explanation: "La estandarización transforma columnas, no elimina filas." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c4_dir,
        filename="02-analisis-discriminante-lineal-lda.mdx",
        title="Análisis Discriminante Lineal (LDA) y Clasificación Multivariante",
        order=2,
        description="Criterio de Fisher de maximización de dispersión entre clases vs intra clases, regla de clasificación de Bayes y fronteras lineales.",
        bloom_level="APPLY",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el criterio del discriminante lineal de Fisher, ¿cuál es la función objetivo que maximiza el vector de proyección w para separar dos clases?",
                "options": [
                    "El cociente de Rayleigh J(w) = (w^T S_B w) / (w^T S_W w), maximizando la separación entre medias y minimizando la dispersión interna.",
                    "La suma de los elementos de la diagonal de la matriz identidad.",
                    "El valor absoluto del determinante de la matriz de confusión.",
                    "La entropía cruzada evaluada en el centroide global."
                ],
                "answer": 0,
                "explanation": "Fisher formuló LDA maximizando el cociente entre la dispersión inter-clases (S_B) y la dispersión intra-clases (S_W). La solución óptima es proporcional a w proportional to S_W^(-1) (mu_1 - mu_2)."
            }
        ],
        content_body="""# Análisis Discriminante Lineal (LDA) y Clasificación

> Mientras que PCA es una técnica **no supervisada** que busca máxima varianza global, el **Análisis Discriminante Lineal de Fisher (LDA)** es un método **supervisado** diseñado para proyectar los datos a un subespacio de máxima separabilidad entre clases.

---

## 1. El Criterio de Dispersión de Fisher

Consideremos $K$ clases con medias $\\boldsymbol{\\mu}_k$ y tamaños $N_k$.
Definimos:
1. **Matriz de Dispersión Intra-Clases (*Within-class Scatter*):**
   $$\\mathbf{S}_W = \\sum_{k=1}^K \\sum_{\\mathbf{x} \\in C_k} (\\mathbf{x} - \\boldsymbol{\\mu}_k)(\\mathbf{x} - \\boldsymbol{\\mu}_k)^\\top$$
2. **Matriz de Dispersión Inter-Clases (*Between-class Scatter*):**
   $$\\mathbf{S}_B = \\sum_{k=1}^K N_k (\\boldsymbol{\\mu}_k - \\boldsymbol{\\mu})(\\boldsymbol{\\mu}_k - \\boldsymbol{\\mu})^\\top$$
   donde $\\boldsymbol{\\mu}$ es la media global ponderada.

El vector óptimo de proyección $\\mathbf{w}$ maximiza el **Cociente de Rayleigh generalizado**:
$$J(\\mathbf{w}) = \\frac{\\mathbf{w}^\\top \\mathbf{S}_B \\mathbf{w}}{\\mathbf{w}^\\top \\mathbf{S}_W \\mathbf{w}}$$

Derivando respecto a $\\mathbf{w}$ e igualando a cero:
$$\\mathbf{S}_W^{-1} \\mathbf{S}_B \\mathbf{w} = \\lambda \\mathbf{w}$$
Los vectores directores óptimos corresponden a los vectores propios de la matriz $\\mathbf{S}_W^{-1} \\mathbf{S}_B$. Como el rango de $\\mathbf{S}_B$ es a lo sumo $K-1$, el número máximo de funciones discriminantes es $\\min(p, K-1)$.

---

## 2. Regla de Clasificación Bayesiana y Frontera Lineal

Bajo el supuesto de que cada clase sigue una distribución $\\mathcal{N}_p(\\boldsymbol{\\mu}_k, \\boldsymbol{\\Sigma})$ con **matriz de covarianza idéntica** $\\boldsymbol{\\Sigma}$, la regla de máxima verosimilitud a posteriori (MAP) asigna una nueva observación $\\mathbf{x}$ a la clase que maximiza la función discriminante lineal:
$$\\delta_k(\\mathbf{x}) = \\mathbf{x}^\\top \\boldsymbol{\\Sigma}^{-1} \\boldsymbol{\\mu}_k - \\frac{1}{2} \\boldsymbol{\\mu}_k^\\top \\boldsymbol{\\Sigma}^{-1} \\boldsymbol{\\mu}_k + \\ln(\\pi_k)$$
donde $\\pi_k = P(C_k)$ es la probabilidad a priori de la clase $k$.

<Callout type="info">
**Frontera Lineal vs Cuadrática (QDA):** Si las matrices de covarianza de las clases no son idénticas ($\\boldsymbol{\\Sigma}_j \\neq \\boldsymbol{\\Sigma}_k$), los términos cuadráticos $\\mathbf{x}^\\top \\boldsymbol{\\Sigma}_k^{-1} \\mathbf{x}$ no se cancelan, originando el **Análisis Discriminante Cuadrático (QDA)** con fronteras hiperbólicas o parabólicas.
</Callout>

---

## 3. Implementación en Python con Scikit-Learn

```python
import numpy as np
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

# Generación de datos sintéticos de 3 tipos de fallas industriales
np.random.seed(42)
n_samples = 40
# 3 variables: vibración, temperatura, presión
mu_falla1 = [10.0, 80.0, 5.0]
mu_falla2 = [25.0, 85.0, 4.2]
mu_falla3 = [15.0, 110.0, 7.8]
Sigma_comun = np.eye(3) * 2.0

X1 = np.random.multivariate_normal(mu_falla1, Sigma_comun, n_samples)
X2 = np.random.multivariate_normal(mu_falla2, Sigma_comun, n_samples)
X3 = np.random.multivariate_normal(mu_falla3, Sigma_comun, n_samples)

X = np.vstack([X1, X2, X3])
y = np.array([0]*n_samples + [1]*n_samples + [2]*n_samples)

# Ajuste de LDA
lda = LinearDiscriminantAnalysis(n_components=2)
X_lda = lda.fit_transform(X, y)

print("--- REPORTE LDA ---")
print(f"Razón de varianza explicada por los 2 ejes: {lda.explained_variance_ratio_}")
print(f"Precisión de ajuste: {lda.score(X, y)*100:.2f}%")

# Clasificación de una nueva observación en planta
nueva_lectura = np.array([[22.0, 84.0, 4.5]])
prediccion = lda.predict(nueva_lectura)
probabilidades = lda.predict_proba(nueva_lectura)
print(f"Falla diagnosticada: Clase {prediccion[0]}")
print(f"Probabilidades posteriores: {np.round(probabilidades, 4)}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: LDA y Fronteras de Decisión"
  questions={[
    {
      id: "q_lda_qda_choice",
      text: "¿En qué circunstancia práctica es obligatorio optar por QDA (Quadratic Discriminant Analysis) en lugar de LDA?",
      options: [
        { id: "a", text: "Cuando las pruebas de homogeneidad de matrices de covarianza (como el test M de Box) demuestran que las clases poseen matrices de covarianza significativamente distintas", isCorrect: true, explanation: "Correcto: Si Sigma_i != Sigma_j, el supuesto fundacional de LDA se viola y la frontera de decisión óptima es necesariamente cuadrática." },
        { id: "b", text: "Cuando el número de variables p es menor que 2", isCorrect: false, explanation: "LDA funciona perfectamente en cualquier dimensión p >= 1." },
        { id: "c", text: "Cuando todas las probabilidades a priori son exactamente iguales", isCorrect: false, explanation: "Las probabilidades a priori iguales simplifican la constante, pero no alteran la linealidad de la frontera." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 5: mioe-s1-diseno-experimentos (IO133)
    # -------------------------------------------------------------
    c5_slug = "mioe-s1-diseno-experimentos"
    c5_dir = write_course_meta(
        slug=c5_slug,
        title="Diseño de Experimentos y Superficie de Respuesta",
        code="IO133",
        description="Metodología formal para la optimización de procesos industriales: factoriales completos 2^k, fraccionados 2^(k-p), resolución y alias, diseños centrales compuestos (CCD) y deseabilidad multirespuesta."
    )
    
    # Module 1: 01-disenos-factoriales-completos-fraccionados
    m1_c5_dir = write_module_meta(c5_dir, "01-disenos-factoriales-completos-fraccionados", "Módulo 1: Factoriales Completos y Fraccionados", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c5_dir,
        filename="01-disenos-factoriales-2k-interacciones.mdx",
        title="Diseños Factoriales 2^k, Efectos Principales e Interacciones",
        order=1,
        description="Modelos lineales de efectos fijos, cálculo de contrastes ortogonales, suma de cuadrados de Yates y gráficas de probabilidad normal de efectos.",
        bloom_level="APPLY",
        est_minutes=65,
        quiz_frontmatter=[
            {
                "question": "En un diseño factorial 2^k con n réplicas, ¿cuál es la fórmula analítica para calcular la Suma de Cuadrados (SS) asociada a cualquier efecto o interacción a partir de su contraste ortogonal C?",
                "options": [
                    "SS = (Contraste)^2 / (n * 2^k)",
                    "SS = Contraste / (n * k)",
                    "SS = (Contraste)^2 / (2 * k)",
                    "SS = sqrt(Contraste) * n"
                ],
                "answer": 0,
                "explanation": "Debido a la ortogonalidad perfecta de los vectores de signos (+1 y -1) en un diseño factorial 2^k, cada efecto tiene 1 grado de libertad y su suma de cuadrados es exactamente el cuadrado del contraste dividido entre el número total de corridas N = n * 2^k."
            }
        ],
        content_body="""# Diseños Factoriales 2^k, Efectos Principales e Interacciones

> En la experimentación industrial, variar un factor a la vez (*One-Factor-At-A-Time - OFAT*) es un grave error metodológico que ignora las **interacciones** entre factores. Los diseños $2^k$ evalúan simultáneamente $k$ factores en 2 niveles (bajo $-1$ y alto $+1$) con máxima eficiencia estadística.

---

## 1. El Modelo Matemático Factorial

Para un diseño con 3 factores ($A, B, C$):
$$y_{ijkm} = \\mu + \\tau_i^A + \\tau_j^B + \\tau_k^C + (\\tau\\tau)_{ij}^{AB} + (\\tau\\tau)_{ik}^{AC} + (\\tau\\tau)_{jk}^{BC} + (\\tau\\tau\\tau)_{ijk}^{ABC} + \\epsilon_{ijkm}$$

Los factores son normalizados a variables codificadas $x_i \\in \\{-1, +1\\}$:
$$x = \\frac{\\text{Valor Real} - \\text{Centro}}{\\text{Semirango}}$$

---

## 2. Contrastes Ortogonales y Estimación de Efectos

El vector de signos para cualquier interacción se obtiene multiplicando término a término las columnas de los factores componentes:
$$\\mathbf{c}_{AB} = \\mathbf{c}_A \\odot \\mathbf{c}_B$$

Dado el contraste ortogonal $C = \\mathbf{c}^\\top \\mathbf{y}$:
1. **Efecto Promedio del Factor:**
   $$\\text{Efecto} = \\frac{C}{n 2^{k-1}}$$
2. **Suma de Cuadrados (con 1 grado de libertad):**
   $$SS = \\frac{C^2}{n 2^k}$$

<Callout type="info">
**Gráfico de Probabilidad Normal de Efectos (C. Daniel, 1959):** Cuando se realiza una única réplica ($n=1$), no existe estimación de error puro en el ANOVA. Al graficar los efectos estimados sobre papel de probabilidad normal, los efectos no significativos (ruido blanco) se alinean a lo largo de una línea recta, mientras que los efectos activos reales se desvían ostensiblemente.
</Callout>

---

## 3. Script en Python

```python
import numpy as np
import pandas as pd

# Matriz de diseño factorial 2^3 en orden estándar
# Columnas: A, B, C
X = np.array([
    [-1, -1, -1],
    [ 1, -1, -1],
    [-1,  1, -1],
    [ 1,  1, -1],
    [-1, -1,  1],
    [ 1, -1,  1],
    [-1,  1,  1],
    [ 1,  1,  1]
])

# Rendimiento observado de un reactor químico (unidades de producto)
y = np.array([55.0, 72.0, 60.0, 84.0, 57.0, 76.0, 63.0, 95.0])

# Cálculo de efectos principales e interacciones
efectos = {}
k = 3
N = 2**k

# Efectos principales
for idx, name in enumerate(["A", "B", "C"]):
    contraste = np.dot(X[:, idx], y)
    efecto = contraste / (N / 2)
    ss = (contraste ** 2) / N
    efectos[name] = (efecto, ss)

# Interacción AB
c_AB = X[:, 0] * X[:, 1]
contraste_AB = np.dot(c_AB, y)
efectos["AB"] = (contraste_AB / (N / 2), (contraste_AB**2) / N)

print(f"{'Factor/Interacción':<18} | {'Efecto Estimado':<16} | {'Suma Cuadrados (SS)':<16}")
print("-" * 55)
for k_name, (ef, ss) in efectos.items():
    print(f"{k_name:<18} | {ef:<16.2f} | {ss:<16.2f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Diseños Factoriales 2^k"
  questions={[
    {
      id: "q_yates_ortho",
      text: "¿Por qué los coeficientes de regresión beta_i del modelo ajustado y_hat = beta_0 + sum beta_i x_i son exactamente la mitad de los efectos principales calculados?",
      options: [
        { id: "a", text: "Porque el efecto mide el cambio total al pasar de -1 a +1 (un salto de 2 unidades), mientras que beta_i es la pendiente por unidad de cambio", isCorrect: true, explanation: "Correcto: El efecto representa Delta y sobre Delta x = (+1) - (-1) = 2. Por ende, beta_i = Efecto / 2." },
        { id: "b", text: "Porque se aplica una penalización de Tikhonov por defecto", isCorrect: false, explanation: "No se trata de regularización, sino de la definición geométrica del rango unitario codificado." },
        { id: "c", text: "Porque los grados de libertad se dividen entre 2", isCorrect: false, explanation: "Los grados de libertad de cada efecto en 2^k son exactamente 1." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c5_dir,
        filename="02-factoriales-fraccionados-estructuras-alias.mdx",
        title="Factoriales Fraccionados 2^(k-p), Generadores y Resolución",
        order=2,
        description="Reducción de corridas experimentales, relaciones definidoras, estructuras de confusión de alias y diseños de resolución III, IV y V.",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En un diseño factorial fraccionado de Resolución IV (Res IV), ¿cuál es la estructura de confusión (alias) garantizada?",
                "options": [
                    "Ningún efecto principal está confundido con interacciones dobles, pero las interacciones dobles están confundidas entre sí.",
                    "Los efectos principales están confundidos con interacciones dobles.",
                    "Todos los efectos están libres de cualquier confusión hasta interacciones de orden cuatro.",
                    "El diseño requiere el doble de corridas que el factorial completo."
                ],
                "answer": 0,
                "explanation": "En Resolución IV, la longitud de la palabra más corta en la relación definidora es 4 (ej. I = ABCD). Por tanto, los efectos principales se confunden con triples (A = BCD, despreciables), pero las interacciones dobles se confunden por pares (AB = CD)."
            }
        ],
        content_body="""# Factoriales Fraccionados 2^(k-p) y Estructuras de Alias

> Cuando el número de factores $k$ crece, ejecutar $2^k$ corridas resulta económicamente prohibitivo ($2^7 = 128$ experimentos). El **Principio de Esparsidad de Efectos** establece que la mayor parte de la respuesta es explicada por efectos principales e interacciones dobles. Los factoriales fraccionados $2^{k-p}$ aprovechan esta propiedad.

---

## 1. Construcción mediante Generadores y Relación Definidora

Para diseñar un factorial fraccionado $2^{4-1}$ (mitad de fracción, 8 corridas en lugar de 16):
1. Se seleccionan los primeros $k-p = 3$ factores básicos: $A, B, C$.
2. Se asigna el cuarto factor $D$ al producto de los básicos (**Generador de diseño**):
   $$D = A \\cdot B \\cdot C$$
3. Multiplicando ambos lados por $D$ (sabiendo que $D^2 = I$, la columna de unos):
   $$I = A B C D \\quad (\\text{Relación Definidora})$$

---

## 2. Estructura de Alias (Confusión)

Multiplicando cualquier término por la relación definidora $I = ABCD$, obtenemos sus cadenas de alias:
- $A \\cdot I = A(ABCD) = A^2 BCD \\implies \\mathbf{[A] = A + BCD}$
- $B \\cdot I = B(ABCD) = A B^2 CD \\implies \\mathbf{[B] = B + ACD}$
- $AB \\cdot I = AB(ABCD) = A^2 B^2 CD \\implies \\mathbf{[AB] = AB + CD}$

El analista no estima el efecto puro de $A$, sino la suma lineal $\\beta_A + \\beta_{BCD}$.

---

## 3. Clasificación de Resolución Experimental

<Callout type="info">
- **Resolución III:** Los efectos principales no están confundidos entre sí, pero sí están confundidos con interacciones dobles ($[A] = A + BC$). Adecuados para tamizaje inicial (*screening*).
- **Resolución IV:** Los efectos principales están limpios de interacciones dobles ($[A] = A + BCD$), pero las interacciones dobles están confundidas entre sí ($[AB] = AB + CD$).
- **Resolución V:** Los efectos principales están limpios de dobles y triples, y las interacciones dobles están limpias de otras interacciones dobles ($[AB] = AB + CDE$). Excelente para modelado riguroso.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Factoriales Fraccionados"
  questions={[
    {
      id: "q_alias_plackett",
      text: "Si en un diseño factorial fraccionado 2^(3-1) con I = ABC se observa un efecto significativo en el contraste de [A], ¿a qué se puede atribuir formalmente si el proceso tiene interacciones fuertes?",
      options: [
        { id: "a", text: "Al efecto principal del factor A, a la interacción BC, o a una combinación de ambos", isCorrect: true, explanation: "Correcto: Dado que [A] = A + BC en Resolución III, la significancia estadística no puede aislar si proviene del factor individual A o de la sinergia entre B y C sin corridas de desconfusión (foldover)." },
        { id: "b", text: "Exclusivamente al error experimental aleatorio", isCorrect: false, explanation: "Si el efecto supera el umbral crítico, no se debe a mero ruido aleatorio." },
        { id: "c", text: "A que el modelo es estrictamente parabólico", isCorrect: false, explanation: "Los factoriales de 2 niveles no pueden detectar curvatura cuadrática pura." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-metodologia-superficie-respuesta
    m2_c5_dir = write_module_meta(c5_dir, "02-metodologia-superficie-respuesta", "Módulo 2: Metodología de Superficie de Respuesta (RSM)", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c5_dir,
        filename="01-disenos-ccd-box-behnken-segundo-orden.mdx",
        title="Diseños Central Compuesto (CCD) y Box-Behnken",
        order=1,
        description="Modelos polinomiales de segundo orden, puntos axiales alfa, rotatabilidad, esfericidad y análisis de puntos de silla y óptimos.",
        bloom_level="ANALYZE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En un Diseño Central Compuesto (CCD) para k factores, ¿cuál es el valor exacto de la distancia axial alfa para garantizar la propiedad de Rotatabilidad?",
                "options": [
                    "alpha = (2^k)^(1/4) = (F)^(1/4)",
                    "alpha = k^2 / 2",
                    "alpha = sqrt(k)",
                    "alpha = 1 siempre"
                ],
                "answer": 0,
                "explanation": "Un diseño es rotatable si la varianza de la respuesta predicha Var(y_hat) es constante en todos los puntos equidistantes del centro del diseño. Para lograr esto en un CCD con F puntos factoriales, se requiere alpha = (F)^(1/4)."
            }
        ],
        content_body="""# Metodología de Superficie de Respuesta (RSM): CCD y Box-Behnken

> Cuando un proceso industrial se encuentra en la vecindad del óptimo, la relación entre las variables de control y la respuesta deja de ser lineal y exhibe curvatura cuadrática. La **Metodología de Superficie de Respuesta (RSM)** ajusta modelos polinomiales de segundo orden.

---

## 1. El Modelo Polinomial Cuadrático

$$\\hat{y} = \\beta_0 + \\sum_{i=1}^k \\beta_i x_i + \\sum_{i=1}^k \\beta_{ii} x_i^2 + \\sum_{i < j} \\beta_{ij} x_i x_j$$

En notación matricial compacta:
$$\\hat{y} = \\beta_0 + \\mathbf{x}^\\top \\mathbf{b} + \\mathbf{x}^\\top \\mathbf{B} \\mathbf{x}$$
donde $\\mathbf{B}$ es la matriz hessiana simétrica de coeficientes cuadráticos e interacciones:
$$\\mathbf{B} = \\begin{bmatrix} \\beta_{11} & \\frac{1}{2}\\beta_{12} & \\cdots \\\\ \\frac{1}{2}\\beta_{12} & \\beta_{22} & \\cdots \\\\ \\vdots & \\vdots & \\ddots \\end{bmatrix}$$

---

## 2. Tipos de Diseños de Segundo Orden

### A. Diseño Central Compuesto (CCD)
Compuesto por tres bloques geométricos:
1. $2^k$ puntos de un factorial completo o fraccionado de Resolución V.
2. $2k$ puntos axiales o estrella localizados en $(\\pm \\alpha, 0, \\dots, 0)$, $(0, \\pm \\alpha, \\dots, 0)$, etc.
3. $n_c$ puntos centrales replicados en el origen $(0, 0, \\dots, 0)$ para estimar el error puro y la varianza central.

- **Rotatabilidad:** Se cumple si $\\alpha = (2^k)^{1/4}$. Para $k=2$, $\\alpha = (4)^{1/4} = \\sqrt{2} \\approx 1.414$.

### B. Diseño Box-Behnken
Evita combinaciones extremas donde todos los factores estén simultáneamente en sus niveles altos o bajos. Los puntos experimentales se ubican en los puntos medios de las aristas del hipercubo de factores más puntos centrales. Es altamente valorado en procesos químicos donde los extremos provocan descomposición del producto.

---

## 3. Análisis Canónico del Punto Estacionario

El punto estacionario $\\mathbf{x}_0$ se obtiene igualando el vector gradiente a cero:
$$\\nabla \\hat{y} = \\mathbf{b} + 2\\mathbf{B}\\mathbf{x} = \\mathbf{0} \\implies \\mathbf{x}_0 = -\\frac{1}{2} \\mathbf{B}^{-1} \\mathbf{b}$$

La naturaleza de la superficie se determina mediante los **valores propios** $\\lambda_i$ de la matriz $\\mathbf{B}$:
- Si todos $\\lambda_i < 0$: El punto $\\mathbf{x}_0$ es un **Máximo Global**.
- Si todos $\\lambda_i > 0$: El punto $\\mathbf{x}_0$ es un **Mínimo Global**.
- Si los $\\lambda_i$ tienen signos mixtos: $\\mathbf{x}_0$ es un **Punto de Silla** (*Saddle Point*), requiriendo exploración en la dirección del autovector asociado al gradiente de mejora.
""",
        quiz_component="""<Quiz
  title="Quiz: Superficie de Respuesta"
  questions={[
    {
      id: "q_rsm_center_pts",
      text: "¿Cuál es la función crítica de incluir múltiples réplicas en el punto central (0, 0, ..., 0) en un diseño CCD?",
      options: [
        { id: "a", text: "Proporcionar una estimación pura del error experimental independiente del modelo y controlar la precisión de predicción en el centro", isCorrect: true, explanation: "Correcto: Las réplicas idénticas en el centro permiten calcular la suma de cuadrados de error puro (SSPE) para contrastar la falta de ajuste (Lack of Fit) del modelo cuadrático." },
        { id: "b", text: "Reducir el número de factores k", isCorrect: false, explanation: "No altera la cantidad de variables independientes." },
        { id: "c", text: "Garantizar que todos los valores propios sean cero", isCorrect: false, explanation: "Si los autovalores fueran cero no existiría curvatura." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c5_dir,
        filename="02-optimizacion-multirespuesta-deseabilidad.mdx",
        title="Optimización Multirespuesta por Función de Deseabilidad de Derringer",
        order=2,
        description="Funciones individuales de deseabilidad d_i(y_i), deseabilidad global geométrica D y optimización simultánea no lineal en Python.",
        bloom_level="CREATE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En el enfoque de deseabilidad de Derringer y Suich, ¿por qué la deseabilidad global D se calcula como la media geométrica ponderada de las deseabilidades individuales d_i en lugar de una suma aritmética?",
                "options": [
                    "Porque si una sola respuesta crítica es completamente inaceptable (d_i = 0), la deseabilidad global D se anula automáticamente a cero.",
                    "Porque la media geométrica siempre es mayor que la media aritmética.",
                    "Porque elimina la necesidad de evaluar los límites de especificación.",
                    "Porque linealiza las ecuaciones diferenciales del sistema."
                ],
                "answer": 0,
                "explanation": "La propiedad multiplicativa de la media geométrica D = (d_1 * ... * d_m)^(1/m) actúa como una barrera estricta: si un producto no cumple los estándares mínimos en una sola dimensión esencial (ej. toxicidad d_tox = 0), todo el producto es descartado globalmente."
            }
        ],
        content_body="""# Optimización Multirespuesta: Deseabilidad de Derringer-Suich

> En la industria real, nunca se optimiza una sola variable. Un proceso metalúrgico debe simultáneamente **maximizar la dureza** ($y_1$), **minimizar el costo de energía** ($y_2$) y mantener la **rugosidad superficial en un valor nominal exacto** ($y_3$).

---

## 1. Transformación de Deseabilidad Individual ($d_i$)

La metodología de Derringer y Suich (1980) transforma cada respuesta predicha $\\hat{y}_i$ en una escala adimensional normalizada $d_i \\in [0, 1]$:

### A. Para Maximizar ($y_i \\ge T_i$):
$$d_i(\\hat{y}_i) = \\begin{cases} 0 & \\text{si } \\hat{y}_i < L_i \\\\ \\left( \\frac{\\hat{y}_i - L_i}{T_i - L_i} \\right)^{s_i} & \\text{si } L_i \\le \\hat{y}_i \\le T_i \\\\ 1 & \\text{si } \\hat{y}_i > T_i \\end{cases}$$

### B. Para Minimizar ($y_i \\le T_i$):
$$d_i(\\hat{y}_i) = \\begin{cases} 1 & \\text{si } \\hat{y}_i < T_i \\\\ \\left( \\frac{U_i - \\hat{y}_i}{U_i - T_i} \\right)^{t_i} & \\text{si } T_i \\le \\hat{y}_i \\le U_i \\\\ 0 & \\text{si } \\hat{y}_i > U_i \\end{cases}$$

### C. Para Valor Objetivo Nominal ($y_i = T_i$):
$$d_i(\\hat{y}_i) = \\begin{cases} \\left( \\frac{\\hat{y}_i - L_i}{T_i - L_i} \\right)^{s_i} & \\text{si } L_i \\le \\hat{y}_i \\le T_i \\\\ \\left( \\frac{U_i - \\hat{y}_i}{U_i - T_i} \\right)^{t_i} & \\text{si } T_i < \\hat{y}_i \\le U_i \\\\ 0 & \\text{si } \\hat{y}_i < L_i \\text{ o } \\hat{y}_i > U_i \\end{cases}$$

---

## 2. Deseabilidad Global Compuesta ($D$)

Las $m$ deseabilidades individuales se consolidan mediante una **media geométrica ponderada**:
$$D = \\left( d_1^{w_1} \\times d_2^{w_2} \\times \\dots \\times d_m^{w_m} \\right)^{\\frac{1}{\\sum_{i=1}^m w_i}}$$
donde $w_i$ refleja la importancia relativa de cada respuesta.

---

## 3. Optimización Numérica en Python con SciPy

```python
import numpy as np
from scipy.optimize import minimize

# Respuestas estimadas por modelos cuadráticos de segundo orden
# x = [x1, x2] factores de temperatura y presión en rango codificado [-1.5, 1.5]
def y1_dureza(x):
    return 80.0 + 5.0*x[0] - 3.0*x[1] - 4.0*x[0]**2 - 2.0*x[1]**2 + 3.0*x[0]*x[1]

def y2_costo(x):
    return 150.0 + 15.0*x[0] + 20.0*x[1] + 10.0*x[0]**2 + 12.0*x[1]**2

# Funciones de deseabilidad
def d1_max(val, L=70.0, T=90.0): # Maximizar dureza
    if val < L: return 0.0
    if val > T: return 1.0
    return (val - L) / (T - L)

def d2_min(val, T=140.0, U=200.0): # Minimizar costo
    if val < T: return 1.0
    if val > U: return 0.0
    return (U - val) / (U - T)

# Función objetivo a maximizar: Deseabilidad Global D
def neg_desirability(x):
    v1 = y1_dureza(x)
    v2 = y2_costo(x)
    d1 = d1_max(v1)
    d2 = d2_min(v2)
    D = np.sqrt(d1 * d2)
    return -D # Para minimizar con scipy

# Búsqueda numérica acotada
res = minimize(neg_desirability, x0=[0.0, 0.0], bounds=[(-1.5, 1.5), (-1.5, 1.5)], method="L-BFGS-B")

x_opt = res.x
D_opt = -res.fun
print(f"Condiciones operativas óptimas (x1*, x2*): [{x_opt[0]:.3f}, {x_opt[1]:.3f}]")
print(f"Dureza predicha:                         {y1_dureza(x_opt):.2f} (d1 = {d1_max(y1_dureza(x_opt)):.3f})")
print(f"Costo predicho:                          {y2_costo(x_opt):.2f} (d2 = {d2_min(y2_costo(x_opt)):.3f})")
print(f"Deseabilidad Global Óptima D*:           {D_opt:.4f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Optimización Multirespuesta"
  questions={[
    {
      id: "q_derringer_weights",
      text: "¿Qué impacto tiene incrementar el exponente s_i > 1 en la función de deseabilidad individual d_i?",
      options: [
        { id: "a", text: "Vuelve la función más exigente, penalizando severamente valores que se alejan del objetivo óptimo", isCorrect: true, explanation: "Correcto: Con s_i > 1 la curva es convexa, asignando deseabilidades muy bajas hasta que la respuesta se aproxima estrechamente a la meta ideal T_i." },
        { id: "b", text: "Convierte la respuesta en una constante independiente de x", isCorrect: false, explanation: "La respuesta sigue dependiendo de x a través del modelo de regresión." },
        { id: "c", text: "Transforma la respuesta en una variable aleatoria de Poisson", isCorrect: false, explanation: "Es una función de deseabilidad determinista." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 6: mioe-s1-simulacion-dinamica-sistemas (IO143)
    # -------------------------------------------------------------
    c6_slug = "mioe-s1-simulacion-dinamica-sistemas"
    c6_dir = write_course_meta(
        slug=c6_slug,
        title="Simulación de Dinámica de Sistemas",
        code="IO143",
        description="Pensamiento sistémico y modelado matemático continuo: bucles de realimentación positiva y negativa, arquetipos organizacionales, diagramas de Forrester (Stock & Flow) e integración numérica de ecuaciones diferenciales."
    )
    
    # Module 1: 01-pensamiento-sistemico-bucles-retroalimentacion
    m1_c6_dir = write_module_meta(c6_dir, "01-pensamiento-sistemico-bucles-retroalimentacion", "Módulo 1: Pensamiento Sistémico y Ciclos Causales", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c6_dir,
        filename="01-diagramas-ciclo-causal-cld.mdx",
        title="Diagramas de Ciclo Causal (CLD) y Bucles de Retroalimentación",
        order=1,
        description="Polaridad de enlaces causales, bucles reforzadores (R) y balanceadores (B), bucle dominante y no linealidad causal.",
        bloom_level="UNDERSTAND",
        est_minutes=60,
        quiz_frontmatter=[
            {
                "question": "¿Cómo se determina rigurosamente la polaridad neta de un bucle de retroalimentación cerrado en un Diagrama de Ciclo Causal (CLD)?",
                "options": [
                    "Contando el número de enlaces causales negativos (-): si es impar, el bucle es de Balance (B); si es par o cero, es Reforzador (R).",
                    "Calculando la suma de los tiempos de retardo de las variables.",
                    "Verificando si la variable con mayor valor es positiva.",
                    "Contando el número total de nodos impares del sistema."
                ],
                "answer": 0,
                "explanation": "Matemáticamente, la derivada en cadena dX/dX a lo largo del bucle es el producto de las derivadas parciales de cada enlace. Cada enlace negativo aporta un signo (-1). Por lo tanto, un número impar de enlaces negativos produce una derivada neta negativa, induciendo un comportamiento autorregulador o de balance (B)."
            }
        ],
        content_body="""# Pensamiento Sistémico y Diagramas de Ciclo Causal (CLD)

> En sistemas industriales complejos, la intuición basada en causa-efecto lineal inmediata fracasa debido a la presencia de **bucles de retroalimentación**, **no linealidades** y **retrasos temporales**. La Dinámica de Sistemas (fundada por Jay Forrester en el MIT) modela la estructura que gobierna este comportamiento.

---

## 1. Polaridad de Enlaces Causales

Un enlace causal de la variable $X$ a la variable $Y$ describe la dirección del cambio:
- **Polaridad Positiva ($+$):** $\\frac{\\partial Y}{\\partial X} > 0$. Si $X$ aumenta, $Y$ aumenta respecto a lo que habría sido; si $X$ disminuye, $Y$ disminuye.
- **Polaridad Negativa ($-$):** $\\frac{\\partial Y}{\\partial X} < 0$. Si $X$ aumenta, $Y$ disminuye respecto a lo que habría sido; si $X$ disminuye, $Y$ aumenta.

---

## 2. Tipología de Bucles de Retroalimentación

Un ciclo cerrado de influencias causales conforma un **bucle de retroalimentación**:

### A. Bucles de Refuerzo o Realimentación Positiva ($R$)
Generan crecimiento exponencial autoacelerado o colapso acelerado:
$$\\frac{dX}{dt} = k X, \\quad (k > 0) \\implies X(t) = X_0 e^{kt}$$
Ejemplo: Efecto boca a boca en ventas, adopción de innovaciones tecnológicas.

### B. Bucles de Balance o Realimentación Negativa ($B$)
Buscan un objetivo o estado de equilibrio dinámico, contrarrestando desviaciones:
$$\\frac{dX}{dt} = -\\frac{1}{\\tau}(X - X_{\\text{objetivo}}) \\implies X(t) = X_{\\text{objetivo}} + (X_0 - X_{\\text{objetivo}})e^{-t/\\tau}$$
Ejemplo: Control de inventarios por punto de reorden, autorregulación de capacidad productiva.

<Callout type="info">
**Cambio de Dominancia de Bucles (Loop Dominance):** En el crecimiento logístico de una población o mercado de productos (Curva S), inicialmente domina el bucle reforzador de contagio ($R$), pero a medida que el mercado se satura, el bucle balanceador de capacidad de carga ($B$) toma el control dinámico, estabilizando el sistema en el límite asintótico.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Dinámica de Ciclos Causales"
  questions={[
    {
      id: "q_cld_dominance",
      text: "¿Qué patrón de comportamiento temporal genera típicamente un sistema compuesto por un bucle reforzador R acoplado a un bucle balanceador B con un retraso temporal significativo?",
      options: [
        { id: "a", text: "Oscilaciones sostenidas, amortiguadas o caóticas alrededor del objetivo (overshoot and collapse)", isCorrect: true, explanation: "Correcto: El retraso temporal impide que la acción correctiva del bucle balanceador actúe a tiempo, provocando que el sistema sobrepase la capacidad de soporte (overshoot) y oscile." },
        { id: "b", text: "Crecimiento estrictamente lineal constante", isCorrect: false, explanation: "Los sistemas de retroalimentación con retrasos son intrínsecamente no lineales." },
        { id: "c", text: "Equilibrio estático instantáneo sin fluctuaciones", isCorrect: false, explanation: "Los retrasos impiden el equilibrio inmediato." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c6_dir,
        filename="02-arquetipos-sistemicos-complejidad.mdx",
        title="Arquetipos Sistémicos y Complejidad Dinámica",
        order=2,
        description="Estructuras clásicas: límites al crecimiento, desplazamiento de la carga, tragedia de los comunes y erosión de metas en ingeniería.",
        bloom_level="ANALYZE",
        est_minutes=65,
        quiz_frontmatter=[
            {
                "question": "En el arquetipo sistémico 'Desplazamiento de la Carga' (Shifting the Burden), ¿cuál es la consecuencia estructural de aplicar repetidamente soluciones sintomáticas de corto plazo?",
                "options": [
                    "Alivian temporalmente el síntoma del problema pero atrofian la capacidad interna para aplicar la solución fundamental de largo plazo, generando adicción al parche.",
                    "Eliminan la necesidad de volver a invertir en mantenimiento.",
                    "Transforman el sistema en una cadena de Markov ergódica.",
                    "Aumentan la capacidad fundamental automáticamente por sinergia."
                ],
                "answer": 0,
                "explanation": "El arquetipo describe cómo una solución sintomática rápida disminuye la presión percibida para abordar la causa raíz, degradando la capacidad fundamental y creando un efecto secundario que intensifica la dependencia de la intervención sintomática."
            }
        ],
        content_body="""# Arquetipos Sistémicos y Complejidad Dinámica

> Los **Arquetipos Sistémicos** (popularizados por Peter Senge en *La Quinta Disciplina*) son patrones genéricos de estructura y comportamiento que se repiten transversalmente en plantas industriales, cadenas logísticas y ecosistemas económicos.

---

## 1. Arquetipos Clásicos en Ingeniería Industrial

### A. Límites al Crecimiento (*Limits to Growth*)
- **Estructura:** Un bucle reforzador ($R$) impulsa un crecimiento inicial rápido, hasta que el nivel del sistema topa con una restricción física o de mercado que activa un bucle balanceador ($B$).
- **Ejemplo Industrial:** Crecimiento explosivo de una startup de manufactura que satura la capacidad del departamento de calidad, disparando devoluciones de clientes.
- **Punto de Apalancamiento:** No presionar más el bucle de crecimiento; remover o expandir proactivamente la capacidad limitante antes de colisionar contra ella.

### B. Tragedia de los Bienes Comunes (*Tragedy of the Commons*)
- **Estructura:** Múltiples agentes persiguen beneficios individuales aprovechando un recurso común compartido no exclusivo, hasta que la sobreexplotación colectiva colapsa el recurso para todos.
- **Ejemplo Industrial:** Varias líneas de producción compitiendo agresivamente por el mismo equipo central de mantenimiento o la misma red de aire comprimido.

### C. Erosión de Metas (*Drifting Goals*)
- **Estructura:** Cuando surge una brecha entre el desempeño real y la meta institucional, en lugar de intensificar la acción correctiva, la organización relaja o degrada los estándares de calidad para "cumplir" artificialmente.

---

## 2. Puntos de Apalancamiento (*Leverage Points*)

Donella Meadows clasificó los lugares para intervenir en un sistema complejo según su efectividad:
1. **Parámetros numéricos (Bajo apalancamiento):** Cambiar subsidios, multas o tamaños de lote.
2. **Estructura de flujos e inventarios:** Alterar la topología de la red de suministro.
3. **Reglas del sistema y bucles de información:** Modificar incentivos y acceso a métricas en tiempo real.
4. **Metas y paradigmas mentales (Máximo apalancamiento):** Rediseñar el propósito del sistema.
""",
        quiz_component="""<Quiz
  title="Quiz: Arquetipos Sistémicos"
  questions={[
    {
      id: "q_archetype_escalation",
      text: "En el arquetipo de 'Escalamiento' (guerra de precios o competencia industrial desmedida), ¿cuál es la intervención estratégica recomendada?",
      options: [
        { id: "a", text: "Negociar acuerdos multilaterales que cambien la meta a una victoria conjunta o diversificar hacia mercados no disputados", isCorrect: true, explanation: "Correcto: Si cada parte solo reacciona agresivamente al avance del competidor, los bucles de balance acoplados actúan como un gran bucle reforzador destructivo que consume los márgenes de ambos." },
        { id: "b", text: "Duplicar la inversión bélica hasta la quiebra total del rival", isCorrect: false, explanation: "Eso acelera la destrucción de valor de toda la industria." },
        { id: "c", text: "Ignorar las acciones de la competencia sin medir ventas", isCorrect: false, explanation: "La inacción absoluta no resuelve la presión competitiva." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-modelado-niveles-flujos-ecuaciones
    m2_c6_dir = write_module_meta(c6_dir, "02-modelado-niveles-flujos-ecuaciones", "Módulo 2: Diagramas de Niveles, Flujos y Ecuaciones", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c6_dir,
        filename="01-diagramas-stock-flow-ecuaciones.mdx",
        title="Diagramas de Stock y Flow y Formulación Matemática",
        order=1,
        description="Variables de nivel (integradores), tasas de flujo, variables auxiliares, formulación diferencial continua e integración de Euler y Runge-Kutta.",
        bloom_level="APPLY",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la ecuación matemática continua fundamental que gobierna el valor de una variable de nivel (Stock) S(t) en función de sus tasas de entrada In(t) y salida Out(t)?",
                "options": [
                    "S(t) = S(t_0) + integral de t_0 a t [In(s) - Out(s)] ds  <=>  dS/dt = In(t) - Out(t)",
                    "S(t) = In(t) * Out(t)",
                    "S(t) = d(In)/dt + d(Out)/dt",
                    "S(t) = e^(In(t)) / Out(t)"
                ],
                "answer": 0,
                "explanation": "Los stocks son acumuladores integrales de memoria del sistema: almacenan el balance neto entre flujos de entrada y salida a lo largo del tiempo. Instantáneamente, su derivada temporal es dS/dt = In(t) - Out(t)."
            }
        ],
        content_body="""# Diagramas de Stock y Flow y Formulación Matemática

> Mientras que los diagramas de ciclo causal cualifican las relaciones, los **Diagramas de Niveles y Flujos (Stock & Flow)** de Forrester traducen la estructura a un sistema riguroso de ecuaciones diferenciales acopladas no lineales.

---

## 1. Elementos Estructurales

1. **Variables de Nivel (Stock o Estado):** Representan acumulaciones físicas o informacionales (inventario, mano de obra, capital). Tienen memoria y persisten si el tiempo se detuviera.
   $$S(t) = S(t_0) + \\int_{t_0}^t \\left[ \\text{Entradas}(s) - \\text{Salidas}(s) \\right] ds$$
2. **Variables de Flujo (Rate):** Representan tasas de cambio instantáneas por unidad de tiempo (unidades/día, personas/mes).
3. **Variables Auxiliares y Constantes:** Expresan relaciones intermedias de decisión algebraica y parámetros tecnológicos.

---

## 2. Métodos Numéricos de Integración

Dado el sistema $\\frac{d\\mathbf{S}}{dt} = \\mathbf{f}(\\mathbf{S}, t)$:

### Método de Euler (Primer Orden):
$$S_{k+1} = S_k + \\Delta t \\cdot \\left[ \\text{In}(S_k) - \\text{Out}(S_k) \\right]$$
- **Riesgo:** Si el paso $\\Delta t$ es superior a la constante de tiempo más rápida del sistema, Euler genera inestabilidad numérica artificial y oscilaciones espurias.

### Método de Runge-Kutta de 4to Orden (RK4):
Evalúa la pendiente en 4 puntos de prueba con error de truncamiento local $O(\\Delta t^5)$, garantizando estabilidad y precisión en sistemas altamente dinámicos.

---

## 3. Simulación en Python con `scipy.integrate`

```python
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Modelo de producción e inventario con realimentación
# Stocks: Inventario (I), Tasa de Producción Suavizada (P)
def sistema_produccion(t, y, demanda_base, tiempo_ajuste_inv, tiempo_ajuste_prod):
    I, P = y
    
    # Demanda externa con escalón repentino en t=10
    demanda = demanda_base if t < 10 else demanda_base * 1.5
    
    # Inventario deseado: 5 días de cobertura
    inventario_deseado = demanda * 5.0
    
    # Tasa de producción deseada
    produccion_deseada = demanda + (inventario_deseado - I) / tiempo_ajuste_inv
    
    # Ecuaciones diferenciales:
    dI_dt = P - demanda
    dP_dt = (produccion_deseada - P) / tiempo_ajuste_prod
    
    return [dI_dt, dP_dt]

# Simulación 60 días
t_span = (0, 60)
t_eval = np.linspace(0, 60, 600)
y0 = [500.0, 100.0] # I0, P0

sol = solve_ivp(
    sistema_produccion, t_span, y0, t_eval=t_eval,
    args=(100.0, 3.0, 5.0), method="RK45"
)

print(f"Simulación exitosa: {sol.success}")
print(f"Inventario final t=60:   {sol.y[0, -1]:.2f}")
print(f"Producción final t=60:   {sol.y[1, -1]:.2f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Modelado de Stock y Flow"
  questions={[
    {
      id: "q_stock_test",
      text: "¿Cuál es el 'test de la fotografía' para distinguir conceptualmente un Stock de un Flujo?",
      options: [
        { id: "a", text: "Si el tiempo se congela en un instante infinitesimal, los Stocks siguen existiendo con un valor medible, mientras que los Flujos cesan a cero", isCorrect: true, explanation: "Correcto: El agua acumulada en un tanque (stock) sigue allí si congelas el tiempo, pero la velocidad del chorro que entra o sale (flujo) requiere una duración dt > 0 para manifestarse." },
        { id: "b", text: "Los stocks siempre son números negativos", isCorrect: false, explanation: "Los stocks representan cantidades acumuladas típicamente no negativas." },
        { id: "c", text: "Los flujos se miden en kilogramos puros sin dimensión temporal", isCorrect: false, explanation: "Los flujos tienen dimensión de cantidad por unidad de tiempo (ej. kg/s)." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c6_dir,
        filename="02-simulacion-retrasos-material-informacion.mdx",
        title="Retrasos de Material e Información y Efecto Látigo (Bullwhip)",
        order=2,
        description="Funciones de retardo exponencial de primer y tercer orden, desajustes en cadenas de suministro y simulación numérica en Python.",
        bloom_level="CREATE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En la teoría de control y dinámica de sistemas, ¿cuál es la diferencia matemática esencial entre un retraso de información y un retraso de material?",
                "options": [
                    "El retraso de material conserva estrictamente la masa física en tránsito (lo que entra debe salir), mientras que el de información es un suavizamiento exponencial de una señal de percepción.",
                    "El retraso de información solo opera con números primos.",
                    "El retraso de material siempre es instantáneo con retardo cero.",
                    "No existe ninguna diferencia algebraica entre ambos."
                ],
                "answer": 0,
                "explanation": "Un retraso de material almacena inventario físico en tránsito conservando la materia (pipeline). Un retraso de información es un filtro pasa-bajos que pondera exponencialmente observaciones pasadas para formar expectativas de pronóstico."
            }
        ],
        content_body="""# Retrasos de Material e Información y el Efecto Látigo (Bullwhip)

> Los desajustes más severos en logística y cadenas de suministro industriales se originan en la presencia de **retrasos temporales** de información y transporte. El célebre **Efecto Látigo** (*Bullwhip Effect*) demuestra cómo pequeñas variaciones en la demanda del consumidor final provocan oscilaciones catastróficas en los fabricantes aguas arriba.

---

## 1. Retrasos de Información: Suavizamiento Exponencial

Para una señal de entrada $u(t)$, la percepción retrasada de información $x(t)$ sigue una ecuación diferencial de retardo de primer orden con constante de tiempo $\\tau$:
$$\\frac{dx}{dt} = \\frac{u(t) - x(t)}{\\tau}$$
Su respuesta en el dominio de Laplace es:
$$H(s) = \\frac{X(s)}{U(s)} = \\frac{1}{\\tau s + 1}$$

---

## 2. Retrasos de Material de Orden Superior (Erlang)

Un retardo de material de orden $n$ (como una línea de transporte en etapas sucesivas) se modela encadenando $n$ tanques en serie con tiempo de residencia $\\tau/n$ cada uno:
$$\\frac{d x_1}{dt} = \\text{In}(t) - \\frac{n}{\\tau} x_1$$
$$\\frac{d x_i}{dt} = \\frac{n}{\\tau} x_{i-1} - \\frac{n}{\\tau} x_i, \\quad (i=2,\\dots,n)$$
Para $n=3$, la función de transferencia es un filtro de tercer orden:
$$H(s) = \\frac{1}{\\left(\\frac{\\tau}{3}s + 1\\right)^3}$$
A diferencia del retraso de 1er orden (que responde instantáneamente en $t=0^+$), el retardo de 3er orden exhibe una curva en 'S' con un retraso efectivo real antes de que el flujo de salida comience a emerger.

---

## 3. Demostración del Efecto Látigo en Python

```python
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Simulación de una cadena de 3 eslabones: Minorista, Mayorista, Fábrica
def cadena_suministro(t, y):
    I_ret, I_who, I_fac = y[:3]   # Inventarios
    D_perc_ret, D_perc_who = y[3:] # Demandas percibidas
    
    # Demanda final del cliente: pulso transitorio de +20% entre t=10 y t=15
    demanda_cliente = 100.0 + (20.0 if 10 <= t <= 15 else 0.0)
    
    # Eslabón 1: Minorista
    tau_info = 4.0
    dD_ret = (demanda_cliente - D_perc_ret) / tau_info
    pedido_ret = max(0, D_perc_ret + (200.0 - I_ret) / 2.0)
    
    # Eslabón 2: Mayorista
    dD_who = (pedido_ret - D_perc_who) / tau_info
    pedido_who = max(0, D_perc_who + (300.0 - I_who) / 2.0)
    
    # Eslabón 3: Fábrica
    produccion_fac = max(0, pedido_who + (400.0 - I_fac) / 2.0)
    
    # Dinámica de inventarios
    dI_ret = pedido_ret - demanda_cliente
    dI_who = pedido_who - pedido_ret
    dI_fac = produccion_fac - pedido_who
    
    return [dI_ret, dI_who, dI_fac, dD_ret, dD_who]

sol = solve_ivp(cadena_suministro, (0, 50), [200.0, 300.0, 400.0, 100.0, 100.0], t_eval=np.linspace(0, 50, 500))

# Evaluación de la amplificación
amp_cliente = 20.0 # Perturbación inicial
# Se observa la sobreoscilación en los pedidos aguas arriba
print("--- EFECTO LÁTIGO SIMULADO ---")
print(f"Perturbación en cliente final:  +{amp_cliente:.1f}%")
print(f"Inventario mín Minorista:       {np.min(sol.y[0]):.1f}")
print(f"Inventario mín Mayorista:       {np.min(sol.y[1]):.1f}")
print(f"Inventario mín Fábrica:         {np.min(sol.y[2]):.1f}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Retrasos y Bullwhip"
  questions={[
    {
      id: "q_bullwhip_mitigation",
      text: "¿Cuál es la contramedida estructural de mayor apalancamiento para eliminar el efecto látigo en una cadena logística moderna?",
      options: [
        { id: "a", text: "Compartir los datos del punto de venta final (POS) en tiempo real con todos los eslabones (VMI / CPFR), eliminando el retraso de información distorsionada", isCorrect: true, explanation: "Correcto: Si todos los eslabones planifican sobre la demanda real del cliente final en vez de sobre los pedidos inflados del eslabón adyacente, se erradica la amplificación de variabilidad." },
        { id: "b", text: "Aumentar el tiempo de espera de entrega a 6 meses", isCorrect: false, explanation: "Aumentar los retrasos amplifica la inestabilidad del sistema." },
        { id: "c", text: "Eliminar todos los inventarios de seguridad dejando la planta desprotegida", isCorrect: false, explanation: "Generaría rupturas de stock masivas ante la primera fluctuación." }
      ]
    }
  ]}
/>"""
    )
    print("S1 Courses built successfully.")

if __name__ == "__main__":
    build_s1()
