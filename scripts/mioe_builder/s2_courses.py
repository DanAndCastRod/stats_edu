from .common import write_course_meta, write_module_meta, write_lesson

def build_s2():
    print("Building S2 Courses...")
    
    # -------------------------------------------------------------
    # COURSE 7: mioe-s2-programacion-no-lineal (IO213)
    # -------------------------------------------------------------
    c7_slug = "mioe-s2-programacion-no-lineal"
    c7_dir = write_course_meta(
        slug=c7_slug,
        title="Programación No Lineal",
        code="IO213",
        description="Optimización continua no lineal: caracterización de convexidad, métodos de descenso de gradiente con búsqueda de línea de Armijo, métodos Cuasi-Newton (BFGS), condiciones KKT, dualidad lagrangiana y métodos de penalización/barrera."
    )
    
    # Module 1: 01-optimizacion-no-lineal-sin-restricciones
    m1_c7_dir = write_module_meta(c7_dir, "01-optimizacion-no-lineal-sin-restricciones", "Módulo 1: Optimización Sin Restricciones", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c7_dir,
        filename="01-funciones-convexas-gradiente-armijo.mdx",
        title="Funciones Convexas y Gradiente Descendente con Búsqueda de Armijo",
        order=1,
        description="Hessiano semidefinido positivo, curvatura local, tasa de descenso, condición suficiente de Armijo y convergencia global.",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el algoritmo de Descenso del Gradiente con búsqueda lineal inexacta, ¿cuál es el propósito matemático de la Condición de Armijo f(x_k + alpha * d_k) <= f(x_k) + c_1 * alpha * grad(f)^T d_k?",
                "options": [
                    "Garantizar una disminución suficiente en el valor de la función objetivo proporcional a la magnitud del paso y la pendiente direccional.",
                    "Forzar a que la matriz Hessiana sea siempre diagonal.",
                    "Asegurar que el tamaño de paso alpha sea estrictamente mayor a 100.",
                    "Convertir el problema en una ecuación diferencial estocástica."
                ],
                "answer": 0,
                "explanation": "La condición de Armijo evita pasos excesivamente grandes que sobrepasen el mínimo (overshooting) imponiendo que el decremento real sea al menos una fracción c_1 in (0, 1) de la disminución predicha por el plano tangente lineal."
            }
        ],
        content_body="""# Funciones Convexas y Gradiente Descendente con Búsqueda de Armijo

> La optimización no lineal modela fenómenos físicos, cinéticos y económicos donde las relaciones no son proporcionales. La **convexidad** es la divisoria de aguas fundamental entre problemas tratables polinomialmente y problemas NP-difíciles.

---

## 1. Caracterización Rigurosa de Convexidad

Sea una función dos veces continuamente diferenciable $f: \\Omega \\to \\mathbb{R}$, con $\\Omega \\subseteq \\mathbb{R}^n$ abierto y convexo.

1. **Condición de Primer Orden:** $f$ es convexa si y solo si para todo $\\mathbf{x}, \\mathbf{y} \\in \\Omega$:
   $$f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^\\top (\\mathbf{y} - \\mathbf{x})$$
   (La función se encuentra siempre por encima de cualquiera de sus hiperplanos tangentes).

2. **Condición de Segundo Orden:** $f$ es convexa si y solo si su **Matriz Hessiana** $\\nabla^2 f(\\mathbf{x})$ es semidefinida positiva para todo $\\mathbf{x} \\in \\Omega$:
   $$\\mathbf{d}^\\top \\nabla^2 f(\\mathbf{x}) \\mathbf{d} \\ge 0, \\quad \\forall \\mathbf{d} \\in \\mathbb{R}^n$$
   Si $\\nabla^2 f(\\mathbf{x}) \\succ 0$ (estrictamente definida positiva), la función es **estrictamente convexa** y su mínimo es único.

---

## 2. El Método de Descenso del Gradiente

Iteración fundamental:
$$\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k \\mathbf{d}_k, \\quad \\mathbf{d}_k = -\\nabla f(\\mathbf{x}_k)$$

### Búsqueda de Línea Inexacta: Condición de Armijo
Calcular el paso óptimo exacto $\\alpha_k = \\arg\\min_{\\alpha > 0} f(\\mathbf{x}_k - \\alpha \\nabla f(\\mathbf{x}_k))$ es computacionalmente costoso. En su lugar, el algoritmo de *Backtracking Armijo* reduce $\\alpha$ geométricamente ($\\alpha \\leftarrow \\rho \\alpha$, con $\\rho \\in (0, 1)$) hasta satisfacer:
$$f(\\mathbf{x}_k + \\alpha_k \\mathbf{d}_k) \\le f(\\mathbf{x}_k) + c_1 \\alpha_k \\nabla f(\\mathbf{x}_k)^\\top \\mathbf{d}_k$$
con parámetro típico $c_1 = 10^{-4}$.

---

## 3. Implementación Numérica en Python

```python
import numpy as np

def gradiente_armijo(f, grad_f, x0, alpha_init=1.0, c1=1e-4, rho=0.5, tol=1e-6, max_iter=200):
    x = np.array(x0, dtype=float)
    historia = [x.copy()]
    
    for k in range(max_iter):
        g = grad_f(x)
        if np.linalg.norm(g) < tol:
            print(f"Convergencia en iteración {k}: ||grad|| = {np.linalg.norm(g):.2e}")
            break
            
        d = -g # Dirección de máximo descenso
        alpha = alpha_init
        
        # Búsqueda de línea con condición de Armijo
        while f(x + alpha * d) > f(x) + c1 * alpha * np.dot(g, d):
            alpha *= rho
            if alpha < 1e-12:
                break
                
        x = x + alpha * d
        historia.append(x.copy())
        
    return x, historia

# Función cuadrática mal condicionada f(x, y) = 10*x^2 + y^2
f_cuad = lambda x: 10.0*x[0]**2 + x[1]**2
grad_cuad = lambda x: np.array([20.0*x[0], 2.0*x[1]])

x_min, trayectoria = gradiente_armijo(f_cuad, grad_cuad, x0=[5.0, 5.0])
print(f"Mínimo alcanzado: [{x_min[0]:.6f}, {x_min[1]:.6f}]")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Gradiente y Convexidad"
  questions={[
    {
      id: "q_armijo_zigzag",
      text: "Cuando una función cuadrática tiene un número de condición kappa(Hessiano) muy elevado (ej. kappa = 1000), ¿qué fenómeno cinemático afecta al Gradiente Descendente estándar?",
      options: [
        { id: "a", text: "Efecto de zig-zag o encajonamiento en valles estrechos, enlenteciendo dramáticamente la convergencia hacia el óptimo", isCorrect: true, explanation: "Correcto: El gradiente apunta casi ortogonal a la dirección hacia el mínimo real en fondos de valle estrechos, produciendo oscilaciones perpendiculares de avance muy lento." },
        { id: "b", text: "El método se vuelve inmediatamente instantáneo en 1 paso", isCorrect: false, explanation: "Un alto número de condición ralentiza el descenso." },
        { id: "c", text: "El gradiente se vuelve idénticamente nulo en todas partes", isCorrect: false, explanation: "El gradiente solo se anula en los puntos estacionarios." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c7_dir,
        filename="02-metodos-cuasi-newton-bfgs.mdx",
        title="Métodos Cuasi-Newton y Actualización BFGS",
        order=2,
        description="Ecuación secante, aproximación iterativa de la inversa del Hessiano H_k, actualización de rango 2 de Broyden-Fletcher-Goldfarb-Shanno.",
        bloom_level="EVALUATE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la propiedad fundamental de la fórmula de actualización de Broyden-Fletcher-Goldfarb-Shanno (BFGS) para la aproximación de la inversa del Hessiano H_k?",
                "options": [
                    "Preserva la simetría y la condición estrictamente definida positiva de H_k en cada iteración siempre que se cumpla la condición de curvatura y_k^T s_k > 0.",
                    "Calcula exactamente las derivadas simbólicas de orden tres.",
                    "Anula los costos reducidos de las variables no básicas.",
                    "Transforma el espacio euclidiano en un conjunto discreto de enteros."
                ],
                "answer": 0,
                "explanation": "La actualización BFGS garantiza algebraicamente que si H_k es simétrica definida positiva, la matriz sucesora H_{k+1} también lo será, asegurando que la dirección d = -H_{k+1} grad(f) sea siempre una dirección de descenso factible."
            }
        ],
        content_body="""# Métodos Cuasi-Newton y Actualización BFGS

> El método clásico de Newton $\\mathbf{x}_{k+1} = \\mathbf{x}_k - [\\nabla^2 f(\\mathbf{x}_k)]^{-1} \\nabla f(\\mathbf{x}_k)$ posee convergencia cuadrática, pero requiere calcular e invertir el Hessiano en cada paso con costo $O(n^3)$. Los **métodos Cuasi-Newton** aproximan la curvatura utilizando únicamente diferencias de gradientes de primer orden.

---

## 1. La Ecuación Secante

Sean los desplazamientos en posición y gradiente entre iteraciones consecutivas:
$$\\mathbf{s}_k = \\mathbf{x}_{k+1} - \\mathbf{x}_k$$
$$\\mathbf{y}_k = \\nabla f(\\mathbf{x}_{k+1}) - \\nabla f(\\mathbf{x}_k)$$

Por el teorema del valor medio, para aproximar la matriz Hessiana $\\mathbf{B}_{k+1} \\approx \\nabla^2 f$ se impone la **Ecuación Secante**:
$$\\mathbf{B}_{k+1} \\mathbf{s}_k = \\mathbf{y}_k \\iff \\mathbf{H}_{k+1} \\mathbf{y}_k = \\mathbf{s}_k$$
donde $\\mathbf{H}_{k+1} \\approx [\\nabla^2 f]^{-1}$ es la aproximación de la inversa del Hessiano.

---

## 2. La Fórmula de Actualización BFGS

La actualización de rango 2 de **Broyden, Fletcher, Goldfarb y Shanno** (1970) para $\\mathbf{H}_k$:
$$\\mathbf{H}_{k+1} = (\\mathbf{I} - \\rho_k \\mathbf{s}_k \\mathbf{y}_k^\\top) \\mathbf{H}_k (\\mathbf{I} - \\rho_k \\mathbf{y}_k \\mathbf{s}_k^\\top) + \\rho_k \\mathbf{s}_k \\mathbf{s}_k^\\top$$
donde:
$$\\rho_k = \\frac{1}{\\mathbf{y}_k^\\top \\mathbf{s}_k}$$

<Callout type="info">
**Condición de Curvatura:** Para que $\\mathbf{H}_{k+1}$ conserve la definición positiva, se requiere que:
$$\\mathbf{y}_k^\\top \\mathbf{s}_k > 0$$
Esta condición se satisface automáticamente si el tamaño de paso $\\alpha_k$ satisface las **Condiciones de Wolfe** (Armijo + curvatura).
</Callout>

---

## 3. Implementación en Python vs. SciPy

```python
import numpy as np
from scipy.optimize import minimize

# Función de Rosenbrock ("valle de la banana"): f(x, y) = 100*(y - x^2)^2 + (1 - x)^2
def rosenbrock(x):
    return 100.0 * (x[1] - x[0]**2)**2 + (1.0 - x[0])**2

def grad_rosenbrock(x):
    df_dx = -400.0 * x[0] * (x[1] - x[0]**2) - 2.0 * (1.0 - x[0])
    df_dy = 200.0 * (x[1] - x[0]**2)
    return np.array([df_dx, df_dy])

# Resolución con BFGS
x0 = np.array([-1.2, 1.0])
res_bfgs = minimize(rosenbrock, x0, jac=grad_rosenbrock, method="BFGS")

print("--- RESULTADO OPTIMIZACIÓN BFGS ---")
print(f"Éxito:                   {res_bfgs.success}")
print(f"Solución x*:             {res_bfgs.x}")
print(f"Valor óptimo f(x*):      {res_bfgs.fun:.2e}")
print(f"Número de iteraciones:   {res_bfgs.nit}")
print(f"Evaluaciones de gradiente: {res_bfgs.njev}")
print(f"Inversa Hessiana aprox:\n{res_bfgs.hess_inv}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Métodos Cuasi-Newton"
  questions={[
    {
      id: "q_lbfgs_memory",
      text: "¿Por qué en problemas de aprendizaje profundo o gran escala con n = 10^6 variables se utiliza L-BFGS (Limited-Memory BFGS) en vez de BFGS clásico?",
      options: [
        { id: "a", text: "Porque L-BFGS no almacena la matriz densa H_k de n x n (que requeriría terabytes de RAM), sino solo los últimos m vectores s_k e y_k", isCorrect: true, explanation: "Correcto: L-BFGS almacena únicamente los últimos m pares de vectores (típicamente m entre 5 y 20) y calcula el producto H_k * grad(f) mediante el algoritmo recursivo de dos lazos con costo de memoria O(m * n)." },
        { id: "b", text: "Porque L-BFGS es un algoritmo heurístico no exacto", isCorrect: false, explanation: "L-BFGS es un algoritmo determinista con fundamento matemático riguroso." },
        { id: "c", text: "Porque L-BFGS solo funciona para enteros", isCorrect: false, explanation: "Opera en el espacio continuo R^n." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-optimizacion-con-restricciones-kkt
    m2_c7_dir = write_module_meta(c7_dir, "02-optimizacion-con-restricciones-kkt", "Módulo 2: Optimización con Restricciones y KKT", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c7_dir,
        filename="01-condiciones-optimalidad-kkt.mdx",
        title="Condiciones de Optimalidad Karush-Kuhn-Tucker (KKT)",
        order=1,
        description="Condiciones de optimalidad Karush-Kuhn-Tucker KKT, multiplicadores de Lagrange, métodos de penalización y barrera.",
        bloom_level="ANALYZE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "En un problema de minimización con restricciones de desigualdad g_i(x) <= 0, ¿cuál es el signo obligatorio de los multiplicadores de Lagrange mu_i en las condiciones de optimalidad KKT?",
                "options": [
                    "mu_i >= 0 (no negativos), garantizando que el gradiente de la función objetivo sea una combinación cónica opuesta a los gradientes de las restricciones activas.",
                    "mu_i <= 0 siempre.",
                    "mu_i puede tomar cualquier valor real libre sin restricción.",
                    "mu_i debe ser estrictamente un número imaginario."
                ],
                "answer": 0,
                "explanation": "En minimización, mu_i >= 0 es la condición de factibilidad dual. Si mu_i fuera negativo, sería posible desplazarse hacia el interior de la región factible disminuyendo aún más el valor de la función objetivo, contradiciendo la optimalidad."
            }
        ],
        content_body="""# Condiciones de Optimalidad de Karush-Kuhn-Tucker (KKT)

> Las condiciones de KKT (derivadas independientemente por Karush en 1939 y Kuhn-Tucker en 1951) constituyen la piedra angular analítica de la optimización con restricciones no lineales.

---

## 1. Planteamiento General del Problema

$$\\begin{aligned}
\\min_{\\mathbf{x} \\in \\mathbb{R}^n} \\quad & f(\\mathbf{x}) \\\\
\\text{s.a.} \\quad & g_i(\\mathbf{x}) \\le 0, \\quad i=1,\\dots,m \\\\
& h_j(\\mathbf{x}) = 0, \\quad j=1,\\dots,p
\\end{aligned}$$

La función **Lagrangiana** se define como:
$$\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\mu}, \\boldsymbol{\\lambda}) = f(\\mathbf{x}) + \\sum_{i=1}^m \\mu_i g_i(\\mathbf{x}) + \\sum_{j=1}^p \\lambda_j h_j(\\mathbf{x})$$

---

## 2. El Teorema KKT de Primer Orden

Si $\\mathbf{x}^*$ es un mínimo local y satisface una condición de regularidad o **Cualificación de Restricciones** (como LICQ: los gradientes de las restricciones activas son linealmente independientes), entonces existen multiplicadores únicos $\\boldsymbol{\\mu}^*$ y $\\boldsymbol{\\lambda}^*$ tales que:

1. **Estacionariedad:**
   $$\\nabla_\\mathbf{x} \\mathcal{L}(\\mathbf{x}^*, \\boldsymbol{\\mu}^*, \\boldsymbol{\\lambda}^*) = \\nabla f(\\mathbf{x}^*) + \\sum_{i=1}^m \\mu_i^* \\nabla g_i(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j^* \\nabla h_j(\\mathbf{x}^*) = \\mathbf{0}$$
2. **Factibilidad Primal:**
   $$g_i(\\mathbf{x}^*) \\le 0, \\quad \\forall i=1,\\dots,m$$
   $$h_j(\\mathbf{x}^*) = 0, \\quad \\forall j=1,\\dots,p$$
3. **Factibilidad Dual:**
   $$\\mu_i^* \\ge 0, \\quad \\forall i=1,\\dots,m$$
4. **Holgura Complementaria:**
   $$\\mu_i^* g_i(\\mathbf{x}^*) = 0, \\quad \\forall i=1,\\dots,m$$

<Callout type="info">
**Suficiencia en Problemas Convexos:** Si la función objetivo $f(\\mathbf{x})$ es convexa, las funciones de desigualdad $g_i(\\mathbf{x})$ son convexas y las de igualdad $h_j(\\mathbf{x})$ son afines (lineales), entonces las condiciones KKT son **necesarias y suficientes** para la optimalidad global.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Condiciones KKT"
  questions={[
    {
      id: "q_licq_importance",
      text: "¿Por qué es indispensable que se cumpla la Cualificación de Restricciones (ej. LICQ) para garantizar la existencia de multiplicadores KKT en un mínimo local?",
      options: [
        { id: "a", text: "Para evitar que el cono de direcciones factibles esté restringido geométricamente de modo que los gradientes de las restricciones se anulen o se vuelvan coplanares espurios", isCorrect: true, explanation: "Correcto: Si LICQ o MFCQ fallan (ej. cúspides o restricciones redundantes tangentes en el óptimo), pueden existir mínimos locales donde ningún vector de multiplicadores finitos KKT satisfaga la ecuación de estacionariedad." },
        { id: "b", text: "Para que el problema sea automáticamente lineal", isCorrect: false, explanation: "LICQ aplica a problemas generales no lineales." },
        { id: "c", text: "Para eliminar los multiplicadores lambda_j", isCorrect: false, explanation: "Los multiplicadores de igualdad siguen existiendo." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c7_dir,
        filename="02-metodos-penalizacion-barrera.mdx",
        title="Métodos de Penalización Exterior y Barrera Logarítmica Interior",
        order=2,
        description="Método SUMT (Sequential Unconstrained Minimization Technique), funciones de pérdida cuadrática, barrera logarítmica y métodos de punto interior.",
        bloom_level="CREATE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En el método de Barrera Logarítmica Interior de Frisch para problemas con restricciones g_i(x) <= 0, ¿qué ocurre si un punto de prueba x intenta cruzar la frontera de factibilidad hacia el exterior?",
                "options": [
                    "El término de barrera -mu * sum ln(-g_i(x)) tiende asintóticamente a +infinito, forzando a los algoritmos de optimización a permanecer estrictamente en el interior factible.",
                    "La función objetivo se convierte en un polinomio de Chebyshev.",
                    "El gradiente cambia de signo hacia cero de forma discontinua.",
                    "El punto es proyectado sobre el origen automáticamente."
                ],
                "answer": 0,
                "explanation": "Cuando g_i(x) -> 0^- (la frontera), -g_i(x) -> 0^+ y ln(-g_i(x)) -> -infinito, por lo que el término de penalización interior -mu * ln(-g_i(x)) -> +infinito, erigiendo una barrera infranqueable que confina las iteraciones a la región estrictamente factible."
            }
        ],
        content_body="""# Métodos de Penalización y Barrera Logarítmica (SUMT)

> Las Técnicas de Minimización No Restringida Secuencial (**SUMT**) transforman un problema complejo con restricciones en una sucesión de problemas no restringidos resolubles mediante BFGS o Newton.

---

## 1. Método de Penalización Exterior Cuadrática

Para el problema $\\min f(\\mathbf{x})$ s.a. $g_i(\\mathbf{x}) \\le 0$:
$$P(\\mathbf{x}; \\rho_k) = f(\\mathbf{x}) + \\frac{\\rho_k}{2} \\sum_{i=1}^m [\\max(0, g_i(\\mathbf{x}))]^2$$
- Las iteraciones $\\mathbf{x}(\\rho_k)$ se aproximan al óptimo desde el **exterior** (violando levemente las restricciones).
- A medida que el parámetro de penalización crece ($\\rho_k \\to \\infty$), la solución no restringida $\\mathbf{x}^*(\\rho_k)$ converge formalmente a la solución óptima del problema original $\\mathbf{x}^*$.
- **Inconveniente Numérico:** Cuando $\\rho_k \\to \\infty$, la matriz Hessiana $\\nabla^2 P$ se vuelve extremadamente mal condicionada ($\\kappa \\to \\infty$), exigiendo métodos cuasi-Newton robustos.

---

## 2. Método de Barrera Logarítmica Interior (Frisch, 1955)

Para optimizar estrictamente en el interior factible $\\{ \\mathbf{x} : g_i(\\mathbf{x}) < 0 \\}$:
$$B(\\mathbf{x}; \\mu_k) = f(\\mathbf{x}) - \\mu_k \\sum_{i=1}^m \\ln(-g_i(\\mathbf{x}))$$
- El parámetro de barrera se reduce progresivamente: $\\mu_k \\to 0$.
- La trayectoria suave $\\mathbf{x}^*(\\mu_k)$ parametrizada por $\\mu > 0$ se denomina la **Trayectoria Central** (*Central Path*).
- Constituye el fundamento matemático de los **Métodos de Puntos Interiores Modernos** (Karmarkar, Nesterov, Nemirovski).

---

## 3. Implementación en Python

```python
import numpy as np
from scipy.optimize import minimize

# Minimizar f(x) = (x1 - 2)^2 + (x2 - 1)^2 sujeto a g(x) = x1 + x2 - 2 <= 0
f = lambda x: (x[0] - 2.0)**2 + (x[1] - 1.0)**2
g = lambda x: x[0] + x[1] - 2.0

def penalizacion_exterior(rho, x_init):
    # Función no restringida penalizada
    P = lambda x: f(x) + 0.5 * rho * (max(0.0, g(x)))**2
    res = minimize(P, x_init, method="BFGS")
    return res.x

x_k = np.array([0.0, 0.0])
print(f"{'rho':<10} | {'x1':<10} | {'x2':<10} | {'g(x)':<10} | {'f(x)':<10}")
print("-" * 55)

for rho in [1, 10, 100, 1000, 10000]:
    x_k = penalizacion_exterior(rho, x_k)
    print(f"{rho:<10} | {x_k[0]:<10.4f} | {x_k[1]:<10.4f} | {g(x_k):<10.4f} | {f(x_k):<10.4f}")

# La solución teórica KKT exacta es x* = [1.5, 0.5] con f(x*) = 0.5000
```
""",
        quiz_component="""<Quiz
  title="Quiz: Penalización y Barrera"
  questions={[
    {
      id: "q_barrier_multiplier",
      text: "¿Cuál es la relación matemática entre el parámetro de barrera mu y los multiplicadores de Lagrange KKT mu_i a lo largo de la trayectoria central?",
      options: [
        { id: "a", text: "mu_i(mu) = -mu / g_i(x*(mu)), el cual converge exactamente al multiplicador dual óptimo KKT mu_i* cuando mu tiende a cero", isCorrect: true, explanation: "Correcto: Al igualar el gradiente de la función de barrera a cero: grad(f) + sum (-mu / g_i) grad(g_i) = 0. Definiendo mu_i = -mu / g_i, se recupera la condición de estacionariedad KKT exacta." },
        { id: "b", text: "mu_i es el inverso del logaritmo natural de mu", isCorrect: false, explanation: "La relación proviene de la derivada del logaritmo d/dx ln(-g) = -grad(g)/(-g)." },
        { id: "c", text: "mu_i no guarda ninguna relación con mu", isCorrect: false, explanation: "Los métodos de barrera son métodos primal-duales que actualizan ambas variables simultáneamente." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 8: mioe-s2-metaheuristicas (IO223)
    # -------------------------------------------------------------
    c8_slug = "mioe-s2-metaheuristicas"
    c8_dir = write_course_meta(
        slug=c8_slug,
        title="Metaheurísticas y Optimización Combinatoria",
        code="IO223",
        description="Algoritmos avanzados para problemas NP-difíciles: metaheurísticas de trayectoria (Recocido Simulado, Búsqueda Tabú con memoria adaptativa) y algoritmos poblacionales (Algoritmos Genéticos con cruces de permutación y PSO aplicado a ruteo y secuenciación)."
    )
    
    # Module 1: 01-metaheuristicas-trayectoria
    m1_c8_dir = write_module_meta(c8_dir, "01-metaheuristicas-trayectoria", "Módulo 1: Metaheurísticas de Trayectoria", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c8_dir,
        filename="01-busqueda-local-recocido-simulado.mdx",
        title="Búsqueda Local y Recocido Simulado (Simulated Annealing)",
        order=1,
        description="Estructuras de vecindad, criterio de aceptación de Metrópolis e^(-Delta E / T), esquemas de enfriamiento geométrico y evasión de mínimos locales.",
        bloom_level="APPLY",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el algoritmo de Recocido Simulado (Simulated Annealing), ¿cuál es el Criterio de Aceptación de Metrópolis para un movimiento que deteriora la función objetivo (Delta E = E(s_nuevo) - E(s_actual) > 0 en minimización)?",
                "options": [
                    "Se acepta con una probabilidad estrictamente positiva P = exp(-Delta E / T), donde T es la temperatura del sistema.",
                    "Se rechaza automáticamente en el 100% de los casos.",
                    "Se acepta únicamente si la iteración es par.",
                    "Se reinicia la búsqueda desde un punto aleatorio."
                ],
                "answer": 0,
                "explanation": "El criterio de Metrópolis permite escapar de óptimos locales aceptando probabilísticamente soluciones peores. A altas temperaturas T, la probabilidad es cercana a 1 (exploración amplia); a bajas temperaturas T, la probabilidad se aproxima a 0 (convergencia a búsqueda local pura)."
            }
        ],
        content_body="""# Búsqueda Local y Recocido Simulado (Simulated Annealing)

> Los problemas de optimización combinatoria en logística y planificación industrial (TSP, VRP, Job Shop) son NP-difíciles: el espacio de búsqueda crece factorialmente ($n!$). Las metaheurísticas exploran estos espacios de forma inteligente sin quedar atrapadas en óptimos locales.

---

## 1. Paisajes de Aptitud y Óptimos Locales

Dado un espacio discreto $\\mathcal{S}$ y una estructura de vecindad $\\mathcal{N}: \\mathcal{S} \\to 2^\\mathcal{S}$:
Un punto $s^* \\in \\mathcal{S}$ es un **óptimo local** si:
$$f(s^*) \\le f(s), \\quad \\forall s \\in \\mathcal{N}(s^*)$$
Una búsqueda local descendente estándar (*Hill Climbing*) se detiene irreversiblemente al alcanzar el primer óptimo local.

---

## 2. Recocido Simulado (*Simulated Annealing*)

Propuesto por Kirkpatrick, Gelatt y Vecchi (1983), emula el enfriamiento termodinámico controlado de metales fundidos para alcanzar estados cristalinos de mínima energía.

### Criterio de Aceptación de Metrópolis:
Dado un estado actual $s$ y un vecino generado aleatoriamente $s' \\in \\mathcal{N}(s)$:
$$\\Delta E = f(s') - f(s)$$
$$P(\\text{aceptar } s') = \\begin{cases} 1 & \\text{si } \\Delta E \\le 0 \\\\ \\exp\\left(-\\frac{\\Delta E}{T}\\right) & \\text{si } \\Delta E > 0 \\end{cases}$$

### Cronograma de Enfriamiento (*Cooling Schedule*):
1. **Geométrico (Estándar industrial):**
   $$T_{k+1} = \\alpha T_k, \\quad \\alpha \\in [0.85, 0.99]$$
2. **Logarítmico (Convergencia asintótica al óptimo global demostrada por Geman & Geman):**
   $$T_k = \\frac{T_0}{\\ln(1 + k)}$$

---

## 3. Implementación en Python para el TSP

```python
import numpy as np

def simulated_annealing_tsp(dist_matrix, T0=1000.0, alpha=0.98, max_iter=1000):
    n = len(dist_matrix)
    # Solución inicial: permutación aleatoria
    current_sol = np.random.permutation(n)
    
    def costo(tour):
        return sum(dist_matrix[tour[i], tour[(i+1)%n]] for i in range(n))
        
    current_cost = costo(current_sol)
    best_sol = current_sol.copy()
    best_cost = current_cost
    
    T = T0
    for it in range(max_iter):
        # Operador de vecindad 2-opt (inversión de un segmento)
        i, j = np.sort(np.random.choice(n, size=2, replace=False))
        neighbor = current_sol.copy()
        neighbor[i:j+1] = neighbor[i:j+1][::-1]
        
        neighbor_cost = costo(neighbor)
        delta_E = neighbor_cost - current_cost
        
        # Criterio de Metrópolis
        if delta_E <= 0 or np.random.rand() < np.exp(-delta_E / T):
            current_sol = neighbor
            current_cost = neighbor_cost
            if current_cost < best_cost:
                best_cost = current_cost
                best_sol = current_sol.copy()
                
        T *= alpha # Enfriamiento
        
    return best_sol, best_cost

# Matriz de distancias simétrica 10 ciudades
np.random.seed(42)
coords = np.random.rand(10, 2) * 100
D = np.linalg.norm(coords[:, None, :] - coords[None, :, :], axis=-1)

tour, dist_opt = simulated_annealing_tsp(D)
print(f"Ruta óptima encontrada: {tour}")
print(f"Distancia total recorrida: {dist_opt:.2f} km")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Recocido Simulado"
  questions={[
    {
      id: "q_sa_cooling_rate",
      text: "¿Qué ocurre si la tasa de enfriamiento es excesivamente acelerada (ej. alpha = 0.1 en un esquema geométrico)?",
      options: [
        { id: "a", text: "El sistema sufre un 'congelamiento prematuro' (quenching), quedando atrapado en un óptimo local deficiente idéntico a una búsqueda voraz", isCorrect: true, explanation: "Correcto: Si la temperatura cae demasiado rápido, la probabilidad de aceptar movimientos de escape exp(-Delta E/T) colapsa a cero casi de inmediato, anulando la capacidad de exploración global." },
        { id: "b", text: "El algoritmo garantiza el óptimo global en 2 segundos", isCorrect: false, explanation: "La aceleración excesiva destruye la garantía de exploración global." },
        { id: "c", text: "La distancia recorrida se vuelve negativa", isCorrect: false, explanation: "Las distancias métricas son no negativas." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c8_dir,
        filename="02-busqueda-tabu-listas-memoria.mdx",
        title="Búsqueda Tabú y Gestión de Memoria Adaptativa",
        order=2,
        description="Lista tabú de corto plazo, criterio de aspiración, memoria de mediano plazo (intensificación) y largo plazo (diversificación).",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el marco de la Búsqueda Tabú (Fred Glover), ¿cuál es la función del Criterio de Aspiración?",
                "options": [
                    "Permite anular el estatus 'tabú' de un movimiento prohibido si este conduce a una solución estrictamente mejor que la mejor solución histórica encontrada hasta el momento.",
                    "Acelera el paso de integración numérica en ecuaciones diferenciales.",
                    "Obliga a visitar todas las ciudades en orden ascendente.",
                    "Reinicia las variables continuas a cero."
                ],
                "answer": 0,
                "explanation": "La lista tabú prohíbe atributos de movimientos para evitar ciclar entre soluciones ya visitadas. Sin embargo, si un movimiento clasificado como tabú bate el récord histórico de aptitud, es imposible que forme parte de un ciclo vicioso previo, por lo que se acepta prioritariamente."
            }
        ],
        content_body="""# Búsqueda Tabú y Estructuras de Memoria Adaptativa

> Ideada por Fred Glover en 1986, la **Búsqueda Tabú (Tabu Search)** sustituye el azar del Recocido Simulado por el uso explícito de estructuras de **memoria adaptativa flexible** para guiar la exploración combinatoria.

---

## 1. Memoria de Corto Plazo: La Lista Tabú

Para evitar ciclos infinitos entre soluciones vecinas recientes ($s \\leftrightarrow s'$), los atributos de los últimos movimientos ejecutados se declaran **prohibidos (Tabú)** durante un número determinado de iteraciones, denominado **Tabu Tenure** ($T_t$).

### Operación:
En cada iteración $k$, se evalúa la vecindad completa $\\mathcal{N}(s)$ y se selecciona el **mejor movimiento disponible**, incluso si deteriora la función objetivo, siempre que no esté en la Lista Tabú $\\mathcal{T}$.

---

## 2. Criterio de Aspiración

Una restricción tabú puede ser revocada si el movimiento satisface el **Criterio de Aspiración por Defecto**:
$$\\text{Si } f(s') < f(s_{\\text{best}}), \\quad \\text{entonces } s' \\text{ es aceptada aunque esté catalogada como Tabú.}$$

---

## 3. Memorias de Mediano y Largo Plazo

<Callout type="info">
1. **Memoria de Mediano Plazo (Intensificación):** Registra los atributos más frecuentes de las mejores soluciones históricas de alta aptitud, forzando a la búsqueda a explorar a fondo esas regiones promisorias.
2. **Memoria de Largo Plazo (Diversificación):** Penaliza los atributos que han sido visitados con demasiada frecuencia a lo largo de toda la historia, expulsando la búsqueda hacia regiones inexploradas del espacio de soluciones.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Búsqueda Tabú"
  questions={[
    {
      id: "q_tabu_tenure_impact",
      text: "¿Cuál es el riesgo de fijar un Tabu Tenure (longitud de la lista tabú) excesivamente grande?",
      options: [
        { id: "a", text: "Restringe en exceso la vecindad accesible, impidiendo el paso por caminos que conectan con soluciones de alta calidad", isCorrect: true, explanation: "Correcto: Un tenure muy largo acota drásticamente las opciones viables y puede asfixiar la búsqueda, mientras que uno muy corto no previene los ciclos cerrados." },
        { id: "b", text: "Convierte el problema en un sistema determinista lineal", isCorrect: false, explanation: "El problema subyacente sigue siendo combinatorio." },
        { id: "c", text: "Provoca que la memoria RAM se agote instantáneamente", isCorrect: false, explanation: "El tenure típicamente oscila entre 7 y 20 elementos, ocupando bytes despreciables." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-metaheuristicas-poblacionales
    m2_c8_dir = write_module_meta(c8_dir, "02-metaheuristicas-poblacionales", "Módulo 2: Metaheurísticas Poblacionales", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c8_dir,
        filename="01-algoritmos-geneticos-operadores-permutacion.mdx",
        title="Algoritmos Genéticos y Operadores de Cruce OX y PMX",
        order=1,
        description="Selección por torneo y ruleta, cruces especializados para permutaciones (Order Crossover OX, Partially Mapped Crossover PMX) aplicados al TSP.",
        bloom_level="CREATE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "¿Por qué los operadores de cruce estándar (como el cruce en un punto de 1-point crossover) NO pueden aplicarse directamente a problemas de permutación como el TSP o Flow Shop?",
                "options": [
                    "Porque generarían individuos infactibles con ciudades duplicadas y ciudades ausentes, violando la biyección de la permutación.",
                    "Porque reducen la tasa de mutación a cero.",
                    "Porque requieren que todos los genes sean números flotantes continuos.",
                    "Porque invierten la dirección del tiempo evolutivo."
                ],
                "answer": 0,
                "explanation": "En problemas de ordenamiento, cada elemento debe aparecer exactamente una vez. Un cruce estándar en un punto cortaría los cromosomas e intercambiaría colas, duplicando inevitablemente genes presentes en la cabeza y omitiendo otros, destruyendo la condición de permutación factible."
            }
        ],
        content_body="""# Algoritmos Genéticos y Operadores de Cruce OX y PMX

> Los **Algoritmos Genéticos (AG)** emulan los principios de la evolución biológica neodarwiniana: selección natural, recombinación genética (cruce) y mutación sobre una población de cromosomas.

---

## 1. Operadores de Cruce para Permutaciones

En problemas combinatorios de rutas y secuencias, un individuo es una permutación de $\\{1, 2, \\dots, n\\}$. Se requieren operadores que preserven la integridad:

### A. Cruce de Orden (Order Crossover - OX)
1. Se seleccionan dos puntos de corte aleatorios y se copia el segmento intermedio del Padre 1 directamente al Hijo.
2. Los genes restantes se toman del Padre 2 comenzando desde el segundo punto de corte, preservando el orden relativo y omitiendo aquellos genes que ya fueron insertados desde el Padre 1.

### B. Cruce Mapeado Parcialmente (Partially Mapped Crossover - PMX)
1. Se copia el segmento intermedio del Padre 1 al Hijo.
2. Para cada posición fuera del segmento, se buscan los genes equivalentes mediante una serie de mapeos biyectivos definidos por los pares de genes alineados en el segmento cruzado de ambos padres.

---

## 2. Operador de Mutación por Inversión (2-Opt)

La mutación introduce variabilidad genética evitando la convergencia prematura. En permutaciones, la **mutación por inversión** selecciona dos posiciones y revierte el orden de la subsecuencia:
$$[1, 2, \\mathbf{3, 4, 5}, 6] \\to [1, 2, \\mathbf{5, 4, 3}, 6]$$

---

## 3. Implementación del Cruce OX en Python

```python
import numpy as np

def order_crossover_ox(p1, p2):
    n = len(p1)
    # Puntos de corte
    cx1, cx2 = np.sort(np.random.choice(n, size=2, replace=False))
    
    hijo = np.full(n, -1)
    # Copia del segmento central del Padre 1
    hijo[cx1:cx2+1] = p1[cx1:cx2+1]
    
    # Llenado desde Padre 2 en orden circular
    current_pos = (cx2 + 1) % n
    for gene in np.concatenate([p2[cx2+1:], p2[:cx2+1]]):
        if gene not in hijo:
            hijo[current_pos] = gene
            current_pos = (current_pos + 1) % n
            
    return hijo

padre_A = np.array([1, 2, 3, 4, 5, 6, 7, 8])
padre_B = np.array([8, 7, 6, 5, 4, 3, 2, 1])

hijo_descendiente = order_crossover_ox(padre_A, padre_B)
print(f"Padre 1:  {padre_A}")
print(f"Padre 2:  {padre_B}")
print(f"Hijo OX:  {hijo_descendiente}")
assert len(set(hijo_descendiente)) == len(padre_A), "¡Fallo de permutación!"
print("¡Permutación biyectiva válida garantizada!")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Algoritmos Genéticos"
  questions={[
    {
      id: "q_ga_elitism",
      text: "¿Por qué la estrategia de 'Elitismo' (preservar intacto al mejor individuo de la generación k en la generación k+1) es una práctica universalmente recomendada?",
      options: [
        { id: "a", text: "Garantiza que la aptitud del mejor individuo de la población sea monótona no decreciente a lo largo de las generaciones, evitando perder la mejor solución hallada por cruzamientos destructivos", isCorrect: true, explanation: "Correcto: Sin elitismo, los operadores estocásticos de cruce y mutación pueden destruir accidentalmente el mejor genoma descubierto en generaciones intermedias." },
        { id: "b", text: "Aumenta la tasa de recombinación al 100%", isCorrect: false, explanation: "El elitismo preserva 1 o pocos individuos, no altera la tasa general." },
        { id: "c", text: "Convierte al algoritmo en una red neuronal profunda", isCorrect: false, explanation: "Sigue siendo un algoritmo evolutivo poblacional." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c8_dir,
        filename="02-enjambre-particulas-pso-vrp-scheduling.mdx",
        title="Optimización por Enjambre de Partículas (PSO) en Scheduling y VRP",
        order=2,
        description="Vectores de velocidad y posición, componente cognoscitivo vs social, factor de inercia omega y discretización para problemas combinatorios.",
        bloom_level="CREATE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "En la ecuación canónica de actualización de velocidad del Enjambre de Partículas (PSO), ¿qué efecto ejerce el factor de inercia omega sobre el comportamiento del enjambre?",
                "options": [
                    "Valores altos de omega favorecen la exploración global en el espacio; valores bajos promueven la explotación refinada en torno a los mejores puntos hallados.",
                    "Fuerza a las partículas a colisionar entre sí.",
                    "Anula el componente social del enjambre.",
                    "Multiplica la dimensión del espacio por una constante."
                ],
                "answer": 0,
                "explanation": "El peso de inercia omega modula el impacto de la velocidad previa. Al inicio se utiliza omega cercano a 0.9 para exploración amplia, reduciéndolo linealmente hacia 0.4 para intensificación local final."
            }
        ],
        content_body="""# Optimización por Enjambre de Partículas (PSO) en Sistemas Industriales

> Desarrollado por James Kennedy y Russell Eberhart (1995), el **PSO (Particle Swarm Optimization)** modela el comportamiento emergente coordinado de bandadas de aves o bancos de peces mediante inteligencia colectiva.

---

## 1. Cinemática Continua del Enjambre

Cada partícula $i$ en un espacio continuo posee:
- Posición actual: $\\mathbf{x}_i^t \\in \\mathbb{R}^d$
- Velocidad actual: $\\mathbf{v}_i^t \\in \\mathbb{R}^d$
- Mejor posición histórica personal (*Personal Best*): $\\mathbf{p}_i \\in \\mathbb{R}^d$
- Mejor posición encontrada por todo el enjambre (*Global Best*): $\\mathbf{g}^* \\in \\mathbb{R}^d$

### Ecuaciones de Movimiento:
$$\\mathbf{v}_i^{t+1} = \\omega \\mathbf{v}_i^t + c_1 r_1 (\\mathbf{p}_i - \\mathbf{x}_i^t) + c_2 r_2 (\\mathbf{g}^* - \\mathbf{x}_i^t)$$
$$\\mathbf{x}_i^{t+1} = \\mathbf{x}_i^t + \\mathbf{v}_i^{t+1}$$

donde:
- $\\omega$: Inercia de movimiento.
- $c_1$: Coeficiente cognitivo (confianza individual).
- $c_2$: Coeficiente social (confianza comunitaria).
- $r_1, r_2 \\sim \\mathcal{U}(0, 1)$: Componentes estocásticas independientes.

---

## 2. Discretización de PSO: Regla SPV (*Smallest Position Value*)

Para aplicar PSO a problemas combinatorios como **Job Shop Scheduling** o **Ruteo de Vehículos (VRP)**:
1. Las partículas evolucionan en un espacio continuo $\\mathbb{R}^n$.
2. La posición continua $\\mathbf{x}_i = [0.82, -0.45, 1.30, 0.12]$ se transforma a una secuencia de trabajos ordenando los índices según el valor de sus componentes (**SPV rule**):
   $$\\text{Orden: } [-0.45, 0.12, 0.82, 1.30] \\implies \\text{Permutación: } [2, 4, 1, 3]$$
Esto permite optimizar funciones combinatorias complejas empleando operadores vectoriales continuos.
""",
        quiz_component="""<Quiz
  title="Quiz: PSO y Heurísticas de Enjambre"
  questions={[
    {
      id: "q_pso_topology",
      text: "¿Cuál es la diferencia entre la topología global gbest y la topología local lbest en PSO?",
      options: [
        { id: "a", text: "gbest conecta a todas las partículas convergiendo más rápido pero con mayor riesgo de óptimo local; lbest conecta solo vecinos inmediatos de anillo, manteniendo mayor diversidad", isCorrect: true, explanation: "Correcto: La topología local lbest ralentiza la propagación de la información de la mejor partícula a través del anillo, evitando el colapso prematuro del enjambre en óptimos locales atractivos pero engañosos." },
        { id: "b", text: "lbest no requiere calcular velocidades", isCorrect: false, explanation: "Ambas usan las mismas ecuaciones de velocidad." },
        { id: "c", text: "gbest opera exclusivamente con números primos", isCorrect: false, explanation: "Ambas son continuas en R^d." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 9: mioe-s2-optimizacion-financiera (IO233)
    # -------------------------------------------------------------
    c9_slug = "mioe-s2-optimizacion-financiera"
    c9_dir = write_course_meta(
        slug=c9_slug,
        title="Optimización Financiera y Gestión de Riesgo",
        code="IO233",
        description="Modelación cuantitativa de inversiones: teoría de cartera media-varianza de Markowitz, deducción matricial de la frontera eficiente, modelo CAPM, métricas de riesgo coherentes (VaR, CVaR) y programación estocástica con apalancamiento."
    )
    
    # Module 1: 01-teoria-moderna-portafolio-markowitz
    m1_c9_dir = write_module_meta(c9_dir, "01-teoria-moderna-portafolio-markowitz", "Módulo 1: Teoría Clásica de Portafolio y Markowitz", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c9_dir,
        filename="01-frontera-eficiente-media-varianza.mdx",
        title="Frontera Eficiente Media-Varianza y Portafolio de Mínima Varianza",
        order=1,
        description="Formulación cuadrática matricial de Markowitz, cálculo analítico con multiplicadores de Lagrange y resolución con CVXPY.",
        bloom_level="ANALYZE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En el modelo clásico de Markowitz para n activos con vector de rendimientos mu y matriz de covarianza Sigma, ¿cuál es la ecuación analítica del portafolio de Mínima Varianza Global (GMVP) con venta en corto permitida?",
                "options": [
                    "w_GMVP = (Sigma^(-1) * 1) / (1^T * Sigma^(-1) * 1)",
                    "w_GMVP = (1/n) * 1",
                    "w_GMVP = Sigma * mu",
                    "w_GMVP = det(Sigma) * 1"
                ],
                "answer": 0,
                "explanation": "Al minimizar (1/2) w^T Sigma w sujeto únicamente a que la suma de ponderaciones sea 1 (1^T w = 1), el Lagrangiano arroja la solución exacta w* = (Sigma^(-1) 1) / (1^T Sigma^(-1) 1), minimizando el riesgo diversificable sin fijar una rentabilidad objetivo."
            }
        ],
        content_body="""# Teoría Clásica de Portafolios de Markowitz

> En 1952, Harry Markowitz formalizó el principio de que los inversores racionales buscan **maximizar el rendimiento esperado para un nivel dado de riesgo** o **minimizar el riesgo para un rendimiento objetivo**.

---

## 1. Formulación Cuadrática de Markowitz

Dado un universo de $n$ activos financieros:
- Vector de rendimientos esperados: $\\boldsymbol{\\mu} \\in \\mathbb{R}^n$
- Matriz de covarianzas: $\\boldsymbol{\\Sigma} \\in \\mathbb{R}^{n \\times n}$ (con $\\boldsymbol{\\Sigma} \\succ 0$)
- Vector de ponderaciones de cartera: $\\mathbf{w} = [w_1, \\dots, w_n]^\\top$

El problema de optimización cuadrática para una rentabilidad objetivo $\\mu_0$:
$$\\begin{aligned}
\\min_{\\mathbf{w}} \\quad & \\frac{1}{2} \\mathbf{w}^\\top \\boldsymbol{\\Sigma} \\mathbf{w} \\\\
\\text{s.a.} \\quad & \\mathbf{w}^\\top \\boldsymbol{\\mu} = \\mu_0 \\\\
& \\mathbf{w}^\\top \\mathbf{1} = 1
\\end{aligned}$$

---

## 2. Deducción Matricial con Multiplicadores de Lagrange

Planteamos el Lagrangiano:
$$\\mathcal{L}(\\mathbf{w}, \\lambda_1, \\lambda_2) = \\frac{1}{2}\\mathbf{w}^\\top \\boldsymbol{\\Sigma} \\mathbf{w} - \\lambda_1 (\\mathbf{w}^\\top \\boldsymbol{\\mu} - \\mu_0) - \\lambda_2 (\\mathbf{w}^\\top \\mathbf{1} - 1)$$

Derivando respecto a $\\mathbf{w}$:
$$\\nabla_\\mathbf{w} \\mathcal{L} = \\boldsymbol{\\Sigma} \\mathbf{w} - \\lambda_1 \\boldsymbol{\\mu} - \\lambda_2 \\mathbf{1} = \\mathbf{0} \\implies \\mathbf{w} = \\boldsymbol{\\Sigma}^{-1}(\\lambda_1 \\boldsymbol{\\mu} + \\lambda_2 \\mathbf{1})$$

Definiendo las constantes fundamentales de Markowitz:
$$A = \\mathbf{1}^\\top \\boldsymbol{\\Sigma}^{-1} \\boldsymbol{\\mu}, \\quad B = \\boldsymbol{\\mu}^\\top \\boldsymbol{\\Sigma}^{-1} \\boldsymbol{\\mu}, \\quad C = \\mathbf{1}^\\top \\boldsymbol{\\Sigma}^{-1} \\mathbf{1}, \\quad D = BC - A^2 > 0$$

La varianza mínima en función de la rentabilidad esperada $\\mu_0$ describe la **hipérbola en el plano $(\\sigma, \\mu)$**:
$$\\sigma^2(\\mu_0) = \\frac{C \\mu_0^2 - 2A \\mu_0 + B}{D}$$

---

## 3. Implementación con CVXPY

```python
import cvxpy as cp
import numpy as np

# Datos sintéticos de 4 activos (Acciones USA, Bonos, Commodities, Emergentes)
mu = np.array([0.12, 0.04, 0.08, 0.15])
Sigma = np.array([
    [0.040, 0.005, 0.010, 0.020],
    [0.005, 0.010, 0.002, 0.004],
    [0.010, 0.002, 0.030, 0.015],
    [0.020, 0.004, 0.015, 0.060]
])

# CVXPY: Min Varianza sujeto a no venta en corto (w >= 0) y mu_target = 10%
w = cp.Variable(4, nonneg=True)
mu_target = 0.10

objective = cp.Minimize(cp.quad_form(w, Sigma))
constraints = [
    cp.sum(w) == 1,
    mu @ w >= mu_target
]

prob = cp.Problem(objective, constraints)
prob.solve()

print("--- PORTAFOLIO EFICIENTE DE MARKOWITZ ---")
print(f"Estado del solver:       {prob.status}")
print(f"Ponderaciones óptimas w*: {np.round(w.value, 4)}")
print(f"Rendimiento esperado:     {np.dot(mu, w.value)*100:.2f}%")
print(f"Volatilidad (sigma_p):    {np.sqrt(prob.value)*100:.2f}%")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Frontera de Markowitz"
  questions={[
    {
      id: "q_markowitz_short",
      text: "¿Qué impacto geométrico tiene prohibir las ventas en corto (imponer la restricción w_i >= 0) sobre la frontera eficiente?",
      options: [
        { id: "a", text: "La frontera se vuelve una curva convexa por tramos contenida estrictamente en el interior o sobre el límite de la hipérbola sin restricciones", isCorrect: true, explanation: "Correcto: Al añadir restricciones de no negatividad w >= 0 se contrae la región factible, por lo que el riesgo de la cartera para un retorno dado será siempre igual o superior al caso no restringido." },
        { id: "b", text: "La frontera se vuelve una línea recta horizontal", isCorrect: false, explanation: "La frontera sigue siendo convexa y curvada." },
        { id: "c", text: "La volatilidad de todos los activos se anula a cero", isCorrect: false, explanation: "El riesgo de los activos individuales no depende de las restricciones de asignación." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c9_dir,
        filename="02-modelo-capm-portafolio-tangente.mdx",
        title="Modelo CAPM, Portafolio Tangente y Capital Market Line",
        order=2,
        description="Inclusión de activo libre de riesgo r_f, ratio de Sharpe, determinación del coeficiente Beta beta_i y descomposición del riesgo sistemático.",
        bloom_level="EVALUATE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el modelo CAPM (Capital Asset Pricing Model), ¿qué tipo de riesgo es remunerado en el mercado con una prima de rentabilidad esperada E(R_i) - r_f?",
                "options": [
                    "Exclusivamente el riesgo sistemático no diversificable medido por el coeficiente Beta beta_i.",
                    "El riesgo total medido por la varianza de la acción.",
                    "El riesgo puramente idiosincrático de la empresa.",
                    "El riesgo de liquidez medido por el volumen transado."
                ],
                "answer": 0,
                "explanation": "El teorema central del CAPM establece que en equilibrio, los inversores diversifican eficientemente todo el riesgo específico/idiosincrático. Por tanto, el mercado solo compensa el riesgo sistemático de mercado capturado por beta_i = Cov(R_i, R_m) / Var(R_m)."
            }
        ],
        content_body="""# Modelo CAPM, Portafolio Tangente y Capital Market Line

> Cuando se introduce un **activo libre de riesgo** (bonos del tesoro soberano con rendimiento seguro $r_f$), la frontera de Markowitz deja de ser una curva hiperbólica y se transforma en una línea recta: la **Capital Market Line (CML)**.

---

## 1. El Portafolio Tangente y el Ratio de Sharpe

El **Portafolio Tangente** $\\mathbf{w}_T$ es la combinación de activos riesgosos que maximiza la pendiente de la recta de asignación de capital, conocida como el **Ratio de Sharpe**:
$$\\max_{\\mathbf{w}} \\operatorname{SR}(\\mathbf{w}) = \\frac{\\mathbf{w}^\\top \\boldsymbol{\\mu} - r_f}{\\sqrt{\\mathbf{w}^\\top \\boldsymbol{\\Sigma} \\mathbf{w}}} \\quad \\text{s.a.} \\quad \\mathbf{w}^\\top \\mathbf{1} = 1$$

Analíticamente, el vector óptimo tangente satisface:
$$\\mathbf{w}_T = \\frac{\\boldsymbol{\\Sigma}^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})}{\\mathbf{1}^\\top \\boldsymbol{\\Sigma}^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})}$$

---

## 2. Capital Market Line (CML) y Teorema de Separación

<Callout type="info">
**Teorema de Separación de Fondos de Tobin (1958):** La decisión de inversión se divide en dos pasos totalmente independientes:
1. **Paso Técnico:** Determinar el portafolio óptimo de activos riesgosos $\\mathbf{w}_T$ (idéntico para todos los inversionistas).
2. **Paso de Preferencia:** Decidir qué porcentaje del capital asignar al activo libre de riesgo vs el portafolio tangente, según la aversión al riesgo del individuo.
</Callout>

La ecuación de la CML es:
$$\\mathbb{E}[R_p] = r_f + \\left( \\frac{\\mathbb{E}[R_T] - r_f}{\\sigma_T} \\right) \\sigma_p$$

---

## 3. La Ecuación Fundamental del CAPM

Para cualquier activo o portafolio individual $i$:
$$\\mathbb{E}[R_i] = r_f + \\beta_i (\\mathbb{E}[R_m] - r_f)$$
donde el coeficiente **Beta** mide la sensibilidad al mercado:
$$\\beta_i = \\frac{\\operatorname{Cov}(R_i, R_m)}{\\operatorname{Var}(R_m)}$$

### Descomposición del Riesgo Total:
$$\\sigma_i^2 = \\underbrace{\\beta_i^2 \\sigma_m^2}_{\\text{Riesgo Sistemático}} + \\underbrace{\\sigma_{\\epsilon_i}^2}_{\\text{Riesgo Idiosincrático}}$$
""",
        quiz_component="""<Quiz
  title="Quiz: CAPM y Ratio de Sharpe"
  questions={[
    {
      id: "q_capm_alpha",
      text: "Si un gestor de fondos de inversión obtiene un activo con Alpha de Jensen positivo (alpha_i > 0), ¿qué significa respecto a la valoración teórica del CAPM?",
      options: [
        { id: "a", text: "El activo generó una rentabilidad superior a la requerida por su nivel de riesgo sistemático, indicando que está infravalorado (subvaluado) por el mercado", isCorrect: true, explanation: "Correcto: El Alpha de Jensen alpha = E(R) - [r_f + beta(E(R_m) - r_f)] mide la habilidad superior de generación de valor por encima del benchmark ajustado por riesgo." },
        { id: "b", text: "El activo tiene volatilidad infinita", isCorrect: false, explanation: "No está relacionado con una divergencia de volatilidad." },
        { id: "c", text: "El activo debe venderse inmediatamente", isCorrect: false, explanation: "Un alpha positivo es señal de oportunidad de compra de activos subvaluados." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-medidas-riesgo-programacion-estocastica
    m2_c9_dir = write_module_meta(c9_dir, "02-medidas-riesgo-programacion-estocastica", "Módulo 2: Medidas de Riesgo Coherente y CVaR", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c9_dir,
        filename="01-medidas-riesgo-var-expected-shortfall-cvar.mdx",
        title="Valor en Riesgo (VaR) y Conditional Value at Risk (CVaR)",
        order=1,
        description="Axiomas de medidas de riesgo coherentes de Artzner, no subaditividad del VaR, formulación lineal de Rockafellar-Uryasev para CVaR.",
        bloom_level="ANALYZE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "¿Cuál es la deficiencia matemática fundamental del Valor en Riesgo (VaR) por la cual NO clasifica como una Medida de Riesgo Coherente en el sentido de Artzner?",
                "options": [
                    "Viola el axioma de Subaditividad: el VaR de una cartera diversificada puede ser mayor que la suma de los VaR individuales, desincentivando la diversificación.",
                    "No puede calcularse en distribuciones continuas.",
                    "Siempre es un número estrictamente negativo.",
                    "Requiere conocer el futuro con certeza determinista."
                ],
                "answer": 0,
                "explanation": "El axioma de subaditividad rho(X + Y) <= rho(X) + rho(Y) formaliza matemáticamente que 'diversificar reduce el riesgo'. El VaR puede violar este axioma en distribuciones no normales o colas pesadas, mientras que el CVaR (Expected Shortfall) sí es rigurosamente coherente y convexo."
            }
        ],
        content_body="""# Medidas de Riesgo Coherente: VaR y Conditional Value at Risk (CVaR)

> Tras las crisis financieras globales, regular el riesgo mediante la varianza (que penaliza simétricamente ganancias y pérdidas) o el **VaR** (que ignora la severidad de las pérdidas en la cola extrema) fue sustituido por el **CVaR** o *Expected Shortfall*.

---

## 1. Axiomas de Medidas de Riesgo Coherente (Artzner et al., 1999)

Una medida de riesgo $\\rho: \\mathcal{L} \\to \\mathbb{R}$ es **coherente** si satisface 4 axiomas:
1. **Subaditividad (La diversificación protege):**
   $$\\rho(X + Y) \\le \\rho(X) + \\rho(Y)$$
2. **Homogeneidad Positiva (Escala):**
   $$\\rho(\\lambda X) = \\lambda \\rho(X), \\quad \\forall \\lambda \\ge 0$$
3. **Monotonicidad:**
   $$\\text{Si } X \\le Y \\text{ casi seguramente} \\implies \\rho(X) \\ge \\rho(Y)$$
4. **Invarianza ante Traslaciones (Efectivo sin riesgo):**
   $$\\rho(X + c) = \\rho(X) - c, \\quad \\forall c \\in \\mathbb{R}$$

---

## 2. Definición Formal de VaR y CVaR

Sea la función de pérdida $L(\\mathbf{w}, \\mathbf{r}) = -\\mathbf{w}^\\top \\mathbf{r}$.
Para un nivel de confianza $\\alpha \\in (0, 1)$ (ej. $\\alpha = 0.95$):

### Valor en Riesgo (VaR):
$$\\operatorname{VaR}_\\alpha(\\mathbf{w}) = \\min \\{ \\gamma \\in \\mathbb{R} : P(L(\\mathbf{w}, \\mathbf{r}) \\le \\gamma) \\ge \\alpha \\}$$

### Conditional Value at Risk (CVaR / Expected Shortfall):
Es el valor esperado de las pérdidas condicional a haber superado el umbral del VaR:
$$\\operatorname{CVaR}_\\alpha(\\mathbf{w}) = \\mathbb{E}[L(\\mathbf{w}, \\mathbf{r}) \\mid L(\\mathbf{w}, \\mathbf{r}) \\ge \\operatorname{VaR}_\\alpha(\\mathbf{w})]$$

---

## 3. Teorema de Linealización Convexa de Rockafellar y Uryasev (2000)

R. T. Rockafellar y S. Uryasev demostraron que el CVaR puede optimizarse mediante una función auxiliar convexa sin calcular previamente el VaR:
$$F_\\alpha(\\mathbf{w}, \\gamma) = \\gamma + \\frac{1}{1-\\alpha} \\mathbb{E}\\left[ \\max(0, -\\mathbf{w}^\\top \\mathbf{r} - \\gamma) \\right]$$

Dado un conjunto de $S$ escenarios históricos o generados por Monte Carlo con probabilidad $p_s = 1/S$:
$$\\min_{\\mathbf{w}, \\gamma, \\mathbf{u}} \\quad \\gamma + \\frac{1}{(1-\\alpha)S} \\sum_{s=1}^S u_s$$
$$\\begin{aligned}
\\text{sujeto a} \\quad & u_s \\ge -\\mathbf{w}^\\top \\mathbf{r}_s - \\gamma, \\quad \\forall s=1,\\dots,S \\\\
& u_s \\ge 0, \\quad \\forall s=1,\\dots,S \\\\
& \\mathbf{w}^\\top \\mathbf{1} = 1, \\, \\mathbf{w} \\ge \\mathbf{0}
\\end{aligned}$$
¡Esto transforma un problema de riesgo de colas complejas en un **Programa Lineal estándar** resoluble a escala masiva!
""",
        quiz_component="""<Quiz
  title="Quiz: VaR vs CVaR"
  questions={[
    {
      id: "q_cvar_linear",
      text: "¿Cuál es la ventaja computacional crucial de la formulación de Rockafellar-Uryasev para la optimización de carteras?",
      options: [
        { id: "a", text: "Convierte el problema de minimizar CVaR en un problema de programación lineal convexa, garantizando óptimos globales con solvers como HiGHS o CPLEX", isCorrect: true, explanation: "Correcto: A diferencia del VaR (que genera superficies no convexas y discontinuas con múltiples mínimos locales), el CVaR formulado con variables auxiliares de holgura u_s es perfectamente lineal y convexo." },
        { id: "b", text: "Elimina la necesidad de contar con datos de rendimiento", isCorrect: false, explanation: "Requiere escenarios de rendimiento r_s." },
        { id: "c", text: "Asume que todas las pérdidas son cero", isCorrect: false, explanation: "Modela la severidad exacta de las colas de pérdida." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c9_dir,
        filename="02-optimizacion-estocastica-carteras-restricciones.mdx",
        title="Optimización Estocástica de Carteras con Restricciones de Apalancamiento",
        order=2,
        description="Programación lineal con múltiples escenarios estocásticos de rendimiento, límites de venta en corto y límites de exposición por sector en Python.",
        bloom_level="CREATE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "En la optimización estocástica de carteras, ¿cómo se modela rigurosamente una restricción regulatoria de apalancamiento bruto (gross leverage) con cota L_max?",
                "options": [
                    "sum |w_i| <= L_max, linealizable mediante variables auxiliares w_i = w_i^+ - w_i^- con sum (w_i^+ + w_i^-) <= L_max",
                    "sum w_i^2 = L_max",
                    "w_i * w_j = L_max",
                    "det(W) <= L_max"
                ],
                "answer": 0,
                "explanation": "El apalancamiento bruto es la suma de posiciones largas (w_i^+) y cortas (|w_i^-|). Se descompone la variable libre en w_i = w_i^+ - w_i^- con w_i^+, w_i^- >= 0, formulando la restricción de apalancamiento como sum (w_i^+ + w_i^-) <= L_max."
            }
        ],
        content_body="""# Optimización Estocástica de Carteras con Restricciones Reales

> En la gestión cuantitativa institucional (hedge funds, fondos de pensiones), los modelos deben incorporar restricciones operativas del mundo real: **apalancamiento máximo**, **costos de transacción**, **límites de concentración sectorial** y **condiciones estocásticas de liquidez**.

---

## 1. Formulación Estocástica Multiescenario

Supongamos $S$ escenarios discretos de retorno $\\mathbf{r}_s \\in \\mathbb{R}^n$, cada uno con probabilidad $\\pi_s$.
Buscamos la cartera que minimiza el riesgo de cola (CVaR) sujeta a una rentabilidad esperada mínima $\\bar{\\mu}$ y restricciones de apalancamiento:

$$\\begin{aligned}
\\min_{\\mathbf{w}, \\gamma, \\mathbf{u}} \\quad & \\gamma + \\frac{1}{1-\\alpha} \\sum_{s=1}^S \\pi_s u_s \\\\
\\text{s.a.} \\quad & u_s \\ge -\\mathbf{w}^\\top \\mathbf{r}_s - \\gamma, \\quad \\forall s=1,\\dots,S \\\\
& u_s \\ge 0, \\quad \\forall s=1,\\dots,S \\\\
& \\sum_{s=1}^S \\pi_s (\\mathbf{w}^\\top \\mathbf{r}_s) \\ge \\bar{\\mu} \\\\
& \\sum_{i=1}^n w_i = 1 \\\\
& \\sum_{i=1}^n |w_i| \\le L_{\\max} \\quad (\\text{Límite de Apalancamiento})
\\end{aligned}$$

---

## 2. Implementación Completa en Python con CVXPY

```python
import cvxpy as cp
import numpy as np

# Simulación de 500 escenarios estocásticos de 5 activos financieros
np.random.seed(42)
S = 500
n_assets = 5

mu_anual = np.array([0.14, 0.10, 0.06, 0.08, 0.12]) / 252 # Rendimiento diario
vol_diaria = np.array([0.025, 0.018, 0.008, 0.012, 0.022])
corr = np.array([
    [1.0, 0.4, 0.1, 0.2, 0.5],
    [0.4, 1.0, 0.2, 0.3, 0.4],
    [0.1, 0.2, 1.0, 0.1, 0.0],
    [0.2, 0.3, 0.1, 1.0, 0.3],
    [0.5, 0.4, 0.0, 0.3, 1.0]
])
cov = np.outer(vol_diaria, vol_diaria) * corr

# Matriz de retornos por escenario (S x n)
R_scenarios = np.random.multivariate_normal(mu_anual, cov, size=S)

# Parámetros del problema
alpha = 0.95
mu_target = 0.0004 # Retorno diario objetivo
L_max = 1.3        # Máximo 130% de apalancamiento bruto (permite 30% cortos)

# Variables CVXPY
w = cp.Variable(n_assets)
gamma = cp.Variable()
u = cp.Variable(S, nonneg=True)

# Pérdida en cada escenario: L_s = -R_s @ w
losses = -R_scenarios @ w
cvar = gamma + (1.0 / ((1.0 - alpha) * S)) * cp.sum(u)

objective = cp.Minimize(cvar)
constraints = [
    u >= losses - gamma,
    cp.sum(w) == 1.0,
    cp.norm1(w) <= L_max,
    (1.0 / S) * cp.sum(R_scenarios @ w) >= mu_target,
    w <= 0.40 # Límite de concentración por activo (máx 40%)
]

prob = cp.Problem(objective, constraints)
prob.solve()

print("--- CARTERA ESTOCÁSTICA CVaR ÓPTIMA ---")
print(f"Estado:                     {prob.status}")
print(f"Ponderaciones w*:           {np.round(w.value, 4)}")
print(f"Apalancamiento bruto ||w||: {np.sum(np.abs(w.value)):.3f}")
print(f"CVaR 95% diario estimado:   {prob.value*100:.2f}%")
print(f"VaR 95% diario (gamma*):    {gamma.value*100:.2f}%")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Optimización Estocástica"
  questions={[
    {
      id: "q_stoch_norm1",
      text: "¿Por qué el operador cp.norm1(w) <= L_max es computacionalmente preferido frente a variables binarias para restringir el apalancamiento?",
      options: [
        { id: "a", text: "Porque norm1 es una función convexa disciplinada (DCP) que preserva la formulación como un programa lineal continuo sin explosión combinatoria", isCorrect: true, explanation: "Correcto: La norma L1 es puramente lineal a trozos y convexa, resoluble en milisegundos mediante cualquier solver LP, a diferencia de restricciones enteras que inducen complejidad NP-hard." },
        { id: "b", text: "Porque la norma 1 obliga a que todos los pesos sean números enteros", isCorrect: false, explanation: "La norma 1 aplica sobre números reales continuos." },
        { id: "c", text: "Porque anula los costos de transacción", isCorrect: false, explanation: "Los costos de transacción pueden modelarse conjuntamente." }
      ]
    }
  ]}
/>"""
    )
    
    # -------------------------------------------------------------
    # COURSE 10: mioe-s2-analisis-envolvente-datos-dea (IO243)
    # -------------------------------------------------------------
    c10_slug = "mioe-s2-analisis-envolvente-datos-dea"
    c10_dir = write_course_meta(
        slug=c10_slug,
        title="Análisis Envolvente de Datos (DEA)",
        code="IO243",
        description="Medición no paramétrica de eficiencia técnica y de escala: Unidades de Toma de Decisión (DMUs), modelos CCR (CRS) y BCC (VRS) en orientaciones input y output, análisis de holguras (slacks), benchmarking y modelos de red multietapa."
    )
    
    # Module 1: 01-fundamentos-modelos-ccr-bcc
    m1_c10_dir = write_module_meta(c10_dir, "01-fundamentos-modelos-ccr-bcc", "Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC", 1)
    
    # Lesson 1.1
    write_lesson(
        mod_dir=m1_c10_dir,
        filename="01-medicion-eficiencia-dmus-modelo-ccr.mdx",
        title="Medición de Eficiencia Técnica Relativa y Modelo CCR (CRS)",
        order=1,
        description="Conjunto de posibilidades de producción (PPS), rendimientos constantes a escala, formulación fraccional de Charnes-Cooper y dual lineal envolvente.",
        bloom_level="ANALYZE",
        est_minutes=70,
        quiz_frontmatter=[
            {
                "question": "En el modelo CCR de Charnes, Cooper y Rhodes (1978) con orientación a entradas (input-oriented), ¿qué significa que una DMU obtenga un score de eficiencia theta* = 0.82?",
                "options": [
                    "Que la DMU es ineficiente y podría producir exactamente su mismo nivel de salidas reduciendo proporcionalmente todos sus insumos en un 18%.",
                    "Que la DMU tiene 82 empleados en plantilla.",
                    "Que la DMU genera un 82% de margen de utilidad financiera neta.",
                    "Que el modelo matemático tiene un 18% de error residual."
                ],
                "answer": 0,
                "explanation": "El score theta* en orientación input mide la contracción radial máxima factible de los insumos preservando la producción de bienes: theta* = 0.82 indica que la DMU requiere solo el 82% de sus insumos actuales para operar sobre la frontera de mejores prácticas."
            }
        ],
        content_body="""# Análisis Envolvente de Datos (DEA): Eficiencia y Modelo CCR

> El **Análisis Envolvente de Datos (DEA)** es una técnica no paramétrica fundamentada en programación lineal para evaluar la **eficiencia técnica relativa** de un conjunto de Unidades de Toma de Decisiones (**DMUs** homogéneas: hospitales, sucursales bancarias, plantas industriales) con múltiples insumos y múltiples productos.

---

## 1. El Conjunto de Posibilidades de Producción (PPS)

Dadas $n$ DMUs, cada una consumiendo un vector de insumos $\\mathbf{x}_j \\in \\mathbb{R}^m$ para producir salidas $\\mathbf{y}_j \\in \\mathbb{R}^s$ ($j=1,\\dots,n$).
Bajo los postulados de Charnes, Cooper y Rhodes (1978):
1. **Factibilidad de las observaciones:** $(\\mathbf{x}_j, \\mathbf{y}_j) \\in PPS$.
2. **Rendimientos Constantes a Escala (CRS):** Si $(\\mathbf{x}, \\mathbf{y}) \\in PPS \\implies (k\\mathbf{x}, k\\mathbf{y}) \\in PPS$ para todo $k > 0$.
3. **Convexidad y Libre Disposición (*Free Disposability*):**

$$PPS_{CCR} = \\left\\{ (\\mathbf{x}, \\mathbf{y}) : \\mathbf{x} \\ge \\sum_{j=1}^n \\lambda_j \\mathbf{x}_j, \\, \\mathbf{y} \\le \\sum_{j=1}^n \\lambda_j \\mathbf{y}_j, \\, \\lambda_j \\ge 0 \\right\\}$$

---

## 2. Formulación del Modelo CCR (Orientado a Entradas)

### A. Modelo Fraccional Primal (Charnes-Cooper):
Para evaluar la DMU objetivo $o$:
$$\\max_{\\mathbf{u}, \\mathbf{v}} \\quad \\frac{\\mathbf{u}^\\top \\mathbf{y}_o}{\\mathbf{v}^\\top \\mathbf{x}_o} \\quad \\text{s.a.} \\quad \\frac{\\mathbf{u}^\\top \\mathbf{y}_j}{\\mathbf{v}^\\top \\mathbf{x}_j} \\le 1, \\, \\forall j=1,\\dots,n, \\quad \\mathbf{u}, \\mathbf{v} \\ge \\mathbf{0}$$

### B. Transformación a Modelo Multiplicador Lineal:
Imponiendo $\\mathbf{v}^\\top \\mathbf{x}_o = 1$:
$$\\max_{\\mathbf{u}, \\mathbf{v}} \\quad \\mathbf{u}^\\top \\mathbf{y}_o \\quad \\text{s.a.} \\quad \\mathbf{u}^\\top \\mathbf{y}_j - \\mathbf{v}^\\top \\mathbf{x}_j \\le 0, \\, \\forall j, \\quad \\mathbf{v}^\\top \\mathbf{x}_o = 1$$

### C. Modelo Envolvente Dual (Forma Canónica):
$$\\begin{aligned}
\\min_{\\theta, \\boldsymbol{\\lambda}} \\quad & \\theta \\\\
\\text{s.a.} \\quad & \\sum_{j=1}^n \\lambda_j \\mathbf{x}_j \\le \\theta \\mathbf{x}_o \\quad (\\text{Insumos}) \\\\
& \\sum_{j=1}^n \\lambda_j \\mathbf{y}_j \\ge \\mathbf{y}_o \\quad (\\text{Productos}) \\\\
& \\lambda_j \\ge 0, \\, \\forall j
\\end{aligned}$$

<Callout type="info">
**Diagnóstico de Eficiencia:**
- La DMU $o$ es **técnicamente eficiente** si y solo si $\\theta^* = 1$ y todas las holguras son nulas ($s^{-*} = \\mathbf{0}, s^{+*} = \\mathbf{0}$).
- Si $\\theta^* < 1$, la DMU es **ineficiente**, y el vector $\\theta^* \\mathbf{x}_o$ define su objetivo de reducción radial.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Modelo CCR"
  questions={[
    {
      id: "q_dea_frontier_points",
      text: "¿Qué representan las DMUs con ponderadores lambda_j* > 0 en la solución del modelo envolvente de una DMU ineficiente?",
      options: [
        { id: "a", text: "El conjunto de pares de referencia eficientes (Peer Group) que demuestran empíricamente cómo producir más con menos recursos", isCorrect: true, explanation: "Correcto: Las DMUs del peer group son unidades 100% eficientes con mezclas operativas similares a la unidad evaluada, sirviendo como modelo benchmark directo para sus metas de mejora." },
        { id: "b", text: "Las DMUs que quebraron financieramente", isCorrect: false, explanation: "Al contrario, son las mejores de su clase (best performers)." },
        { id: "c", text: "Unidades idénticas en todas sus dimensiones", isCorrect: false, explanation: "Pueden tener diferentes tamaños; el modelo proyecta su combinación lineal convexa." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 1.2
    write_lesson(
        mod_dir=m1_c10_dir,
        filename="02-modelo-bcc-rendimientos-variables-escala.mdx",
        title="Modelo BCC y Rendimientos Variables a Escala (VRS)",
        order=2,
        description="Restricción de convexidad sum lambda_j = 1, descomposición de la eficiencia técnica global en eficiencia técnica pura y de escala.",
        bloom_level="EVALUATE",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En el análisis DEA, ¿cómo se descompone matemáticamente la Eficiencia Técnica Global (CCR) a partir de los scores del modelo BCC?",
                "options": [
                    "Eficiencia Técnica Global (CCR) = Eficiencia Técnica Pura (BCC) * Eficiencia de Escala (SE)",
                    "Eficiencia Global = Eficiencia Pura + Eficiencia de Escala",
                    "Eficiencia Global = Eficiencia Pura / Eficiencia de Escala",
                    "Eficiencia Global = log(Eficiencia Pura)"
                ],
                "answer": 0,
                "explanation": "El modelo BCC añade la restricción sum lambda_j = 1, aislando la gestión operativa pura del impacto del tamaño físico de la planta. Se deduce que theta_CCR* = theta_BCC* * SE, donde SE = theta_CCR* / theta_BCC* <= 1."
            }
        ],
        content_body="""# Modelo BCC y Rendimientos Variables a Escala (VRS)

> En la realidad de la ingeniería industrial, una planta pequeña puede operar con impecable gestión gerencial pero sufrir desventajas competitivas por no alcanzar la escala mínima eficiente. El modelo **BCC (Banker, Charnes y Cooper, 1984)** desacopla la eficiencia operativa pura del tamaño de la operación.

---

## 1. El Modelo Envolvente BCC

El modelo BCC incorpora la **restricción de convexidad** $\\sum_{j=1}^n \\lambda_j = 1$:

$$\\begin{aligned}
\\min_{\\theta_B, \\boldsymbol{\\lambda}} \\quad & \\theta_B \\\\
\\text{s.a.} \\quad & \\sum_{j=1}^n \\lambda_j \\mathbf{x}_j \\le \\theta_B \\mathbf{x}_o \\\\
& \\sum_{j=1}^n \\lambda_j \\mathbf{y}_j \\ge \\mathbf{y}_o \\\\
& \\sum_{j=1}^n \\lambda_j = 1 \\quad (\\text{Restricción de Convexidad VRS}) \\\\
& \\lambda_j \\ge 0, \\, \\forall j
\\end{aligned}$$

Al restringir la combinación a una combinación convexa estricta, la frontera envolvente se ciñe más estrechamente a los datos, garantizando que:
$$\\theta_{CCR}^* \\le \\theta_{BCC}^*$$

---

## 2. Descomposición de la Eficiencia: Escala vs. Gestión Pura

- **Eficiencia Técnica Global ($TE = \\theta_{CCR}^*$):** Eficiencia total bajo rendimientos constantes.
- **Eficiencia Técnica Pura ($PTE = \\theta_{BCC}^*$):** Eficiencia atribuible exclusivamente a la calidad de la administración y procesos internos.
- **Eficiencia de Escala ($SE$):**
  $$SE = \\frac{\\theta_{CCR}^*}{\\theta_{BCC}^*} \\le 1$$

---

## 3. Identificación del Tipo de Rendimientos a Escala

Analizando el término dual libre $u_0^*$ del modelo multiplicador BCC:
- **Rendimientos Crecientes a Escala (IRS):** $u_0^* < 0$. La DMU es subóptimamente pequeña; duplicar los insumos generaría más del doble de productos.
- **Rendimientos Decrecientes a Escala (DRS):** $u_0^* > 0$. La DMU sufre de deseconomías de escala por hipertrofia o burocracia.
- **Escala Óptima (CRS):** $u_0^* = 0$. La DMU opera en el tamaño óptimo de escala.
""",
        quiz_component="""<Quiz
  title="Quiz: Modelo BCC y Eficiencia de Escala"
  questions={[
    {
      id: "q_bcc_score_diff",
      text: "Si una DMU obtiene theta_BCC* = 1.0 pero theta_CCR* = 0.75, ¿cuál es el diagnóstico operativo preciso?",
      options: [
        { id: "a", text: "Su gestión gerencial interna es 100% eficiente (no desperdicia insumos para su escala), pero su tamaño de planta es inadecuado respecto a la escala de máxima productividad", isCorrect: true, explanation: "Correcto: PTE = 1.0 certifica excelencia gerencial en sus procesos, mientras que SE = 0.75 / 1.0 = 0.75 indica una pérdida del 25% atribuible a operar fuera del tamaño óptimo de escala." },
        { id: "b", text: "La DMU debe cerrar de inmediato", isCorrect: false, explanation: "Es eficiente en sus procesos; requiere ajustar su escala de producción." },
        { id: "c", text: "El modelo BCC falló por multicolinealidad", isCorrect: false, explanation: "El DEA no asume ninguna forma funcional paramétrica." }
      ]
    }
  ]}
/>"""
    )
    
    # Module 2: 02-analisis-slacks-benchmarking-redes
    m2_c10_dir = write_module_meta(c10_dir, "02-analisis-slacks-benchmarking-redes", "Módulo 2: Slacks, Benchmarking y Modelos en Red", 2)
    
    # Lesson 2.1
    write_lesson(
        mod_dir=m2_c10_dir,
        filename="01-analisis-holguras-slacks-benchmarking.mdx",
        title="Análisis de Holguras (Slacks) y Determinación de Pares de Benchmarking",
        order=1,
        description="Fase II del modelo DEA: maximización de slacks de insumos y productos, frontera eficiente de Pareto-Koopmans y metas de mejoramiento para DMUs ineficientes.",
        bloom_level="APPLY",
        est_minutes=75,
        quiz_frontmatter=[
            {
                "question": "En la evaluación DEA, ¿por qué es obligatoria la Fase II de maximización de holguras (slacks) tras obtener el score radial theta*?",
                "options": [
                    "Para satisfacer el criterio de eficiencia estricta de Pareto-Koopmans: una DMU puede tener theta* = 1 pero presentar excesos no nulos de insumos o déficits de salidas en holguras marginales.",
                    "Para convertir los insumos en dólares constantes.",
                    "Para calcular la inversa de la matriz tecnológica.",
                    "Para forzar a que las ponderaciones lambda sumen cero."
                ],
                "answer": 0,
                "explanation": "La reducción radial proyecta la DMU sobre la frontera isométrica, pero puede quedar en una cara no horizontal donde sobran insumos (s^- > 0) o faltan productos (s^+ > 0). Solo cuando theta* = 1 y todos los slacks son idénticamente cero se alcanza la eficiencia estricta de Pareto-Koopmans."
            }
        ],
        content_body="""# Análisis de Holguras (Slacks) y Benchmarking en DEA

> La proyección radial $\\theta^* \\mathbf{x}_o$ no siempre conduce a un punto plenamente eficiente en el sentido de **Pareto-Koopmans**: pueden existir holguras (*slacks*) no radiales remanentes.

---

## 1. El Modelo de Dos Fases y Eficiencia de Pareto-Koopmans

### Fase I:
Resolver el modelo envolvente para determinar la contracción radial óptima $\\theta^*$.

### Fase II: Maximización de Holguras
Fijando $\\theta = \\theta^*$, se resuelven las holguras de exceso de insumos $\\mathbf{s}^- \\in \\mathbb{R}^m$ y déficit de productos $\\mathbf{s}^+ \\in \\mathbb{R}^s$:
$$\\begin{aligned}
\\max_{\\boldsymbol{\\lambda}, \\mathbf{s}^-, \\mathbf{s}^+} \\quad & \\sum_{i=1}^m s_i^- + \\sum_{r=1}^s s_r^+ \\\\
\\text{s.a.} \\quad & \\sum_{j=1}^n \\lambda_j x_{ij} + s_i^- = \\theta^* x_{io}, \\quad \\forall i=1,\\dots,m \\\\
& \\sum_{j=1}^n \\lambda_j y_{rj} - s_r^+ = y_{ro}, \\quad \\forall r=1,\\dots,s \\\\
& \\lambda_j \\ge 0, \\, s_i^- \\ge 0, \\, s_r^+ \\ge 0
\\end{aligned}$$

---

## 2. Metas de Proyección Operativa (*Targets*)

Para una DMU ineficiente $o$, las **metas operativas de mejoramiento** para alcanzar la frontera de mejores prácticas son:
$$\\hat{x}_{io} = \\theta^* x_{io} - s_i^{-*}, \\quad \\forall i=1,\\dots,m$$
$$\\hat{y}_{ro} = y_{ro} + s_r^{+*}, \\quad \\forall r=1,\\dots,s$$

---

## 3. Implementación en Python con SciPy

```python
import numpy as np
from scipy.optimize import linprog

# Evaluación de 5 plantas industriales con 2 insumos (Horas, Capital) y 1 producto (Producción)
X_data = np.array([
    [10.0, 15.0],  # D1
    [20.0, 10.0],  # D2
    [30.0, 30.0],  # D3
    [12.0, 10.0],  # D4
    [25.0, 18.0]   # D5
]) # Insumos (5 x 2)
Y_data = np.array([[100.0], [100.0], [120.0], [90.0], [110.0]]) # Productos (5 x 1)

def dea_ccr_input(X, Y, dmu_eval):
    n, m = X.shape
    s = Y.shape[1]
    
    # Variables: [theta, lambda_1, ..., lambda_n]
    c = np.zeros(1 + n)
    c[0] = 1.0 # Minimizar theta
    
    # Restricciones de Insumos: sum(lambda_j * x_ij) - theta * x_io <= 0
    # Restricciones de Salidas: -sum(lambda_j * y_rj) <= -y_ro
    A_ub = []
    b_ub = []
    
    x_o = X[dmu_eval]
    y_o = Y[dmu_eval]
    
    for i in range(m):
        row = np.zeros(1 + n)
        row[0] = -x_o[i]
        row[1:] = X[:, i]
        A_ub.append(row)
        b_ub.append(0.0)
        
    for r in range(s):
        row = np.zeros(1 + n)
        row[1:] = -Y[:, r]
        A_ub.append(row)
        b_ub.append(-y_o[r])
        
    bounds = [(0, None)] + [(0, None)] * n
    res = linprog(c, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method="highs")
    
    theta_opt = res.x[0]
    lambdas = res.x[1:]
    return theta_opt, lambdas

print(f"{'DMU':<6} | {'Score CCR (theta*)':<20} | {'Estado':<16} | {'Pares Benchmark'}")
print("-" * 65)

for d in range(len(X_data)):
    score, lam = dea_ccr_input(X_data, Y_data, d)
    peers = [f"D{j+1}" for j, l in enumerate(lam) if l > 1e-4]
    estado = "Eficiente" if score >= 0.9999 else "Ineficiente"
    print(f"D{d+1:<5} | {score:<20.4f} | {estado:<16} | {', '.join(peers)}")
```
""",
        quiz_component="""<Quiz
  title="Quiz: Slacks y Benchmarking"
  questions={[
    {
      id: "q_slack_pareto",
      text: "¿Qué implicación tiene para una empresa ineficiente descubrir un exceso de holgura s_i^- > 0 en el insumo mano de obra?",
      options: [
        { id: "a", text: "Que además de la reducción radial proporcional general, la empresa debe recortar una cantidad adicional neta s_i^- de horas para eliminar el desperdicio puro de personal", isCorrect: true, explanation: "Correcto: La meta de insumo x_hat = theta* x - s^- exige una doble corrección: primero la escala radial proporcional y segundo el ajuste fino eliminando los excesos improductivos directos." },
        { id: "b", text: "Que la empresa debe contratar más personal", isCorrect: false, explanation: "Un exceso de insumo indica redundancia, no escasez." },
        { id: "c", text: "Que el precio sombra del insumo es negativo", isCorrect: false, explanation: "En formulaciones estándar los precios sombra son no negativos." }
      ]
    }
  ]}
/>"""
    )
    
    # Lesson 2.2
    write_lesson(
        mod_dir=m2_c10_dir,
        filename="02-modelos-dea-redes-multietapa.mdx",
        title="Modelos DEA en Redes Multietapa (Network DEA)",
        order=2,
        description="Apertura de la 'caja negra' de las DMUs, variables intermedias de enlace, eficiencia en serie de producción y comercialización, y formulación computacional.",
        bloom_level="CREATE",
        est_minutes=80,
        quiz_frontmatter=[
            {
                "question": "En un modelo Network DEA en serie de dos etapas (ej. Etapa 1: Fabricación, Etapa 2: Ventas), ¿cuál es la propiedad multiplicativa de la eficiencia global theta_global demostrada por Kao y Hwang?",
                "options": [
                    "La eficiencia global de la DMU es exactamente el producto de las eficiencias técnicas de sus subetapas internas: theta_global = theta_etapa1 * theta_etapa2.",
                    "La eficiencia global es la suma de las eficiencias.",
                    "La eficiencia global siempre es mayor a 1.0.",
                    "Las eficiencias internas son independientes y no tienen relación con la global."
                ],
                "answer": 0,
                "explanation": "Kao y Hwang (2008) demostraron que al abrir la caja negra de la DMU y vincular las salidas de la etapa 1 como entradas de la etapa 2 (variables intermedias z), la eficiencia total del sistema se descompone de forma multiplicativa: theta_sistema = theta_1 * theta_2."
            }
        ],
        content_body="""# Modelos DEA en Redes Multietapa (Network DEA)

> El DEA clásico trata a cada DMU como una **caja negra** (*black box*), ignorando los procesos internos y subdepartamentos. El **Network DEA** (desarrollado por Färe, Grosskopf, Kao y Tone) abre la caja negra modelando redes en serie, en paralelo y con retroalimentación.

---

## 1. Estructura en Serie de Dos Etapas

Consideremos un proceso industrial de dos etapas:
1. **Etapa 1 (Producción/Manufactura):** Consume insumos externos $\\mathbf{x} \\in \\mathbb{R}^m$ y genera productos intermedios $\\mathbf{z} \\in \\mathbb{R}^p$.
2. **Etapa 2 (Comercialización/Ventas):** Consume los productos intermedios $\\mathbf{z}$ y genera salidas finales $\\mathbf{y} \\in \\mathbb{R}^s$.

Las variables $\\mathbf{z}$ son **bienes de enlace** (*linking variables*): simultáneamente son salidas de la etapa 1 e insumos de la etapa 2.

---

## 2. Formulación Multiplicativa (Kao & Hwang, 2008)

Sean $\\mathbf{w}$ el vector de multiplicadores de las variables intermedias:
$$\\text{Eficiencia Etapa 1: } E_o^1 = \\frac{\\mathbf{w}^\\top \\mathbf{z}_o}{\\mathbf{v}^\\top \\mathbf{x}_o}, \\qquad \\text{Eficiencia Etapa 2: } E_o^2 = \\frac{\\mathbf{u}^\\top \\mathbf{y}_o}{\\mathbf{w}^\\top \\mathbf{z}_o}$$

La **Eficiencia Global del Sistema** se factoriza exactamente como:
$$E_o = \\frac{\\mathbf{u}^\\top \\mathbf{y}_o}{\\mathbf{v}^\\top \\mathbf{x}_o} = \\left( \\frac{\\mathbf{w}^\\top \\mathbf{z}_o}{\\mathbf{v}^\\top \\mathbf{x}_o} \\right) \\times \\left( \\frac{\\mathbf{u}^\\top \\mathbf{y}_o}{\\mathbf{w}^\\top \\mathbf{z}_o} \\right) = E_o^1 \\times E_o^2$$

<Callout type="info">
**Diagnóstico Causal Profundo:** Una DMU puede tener una baja eficiencia global del $60\\%$ ($E_o = 0.60$). El DEA tradicional no sabe dónde intervenir. El Network DEA revela si la falla está en manufactura ($E_o^1 = 0.62, E_o^2 = 0.97$) o en ventas ($E_o^1 = 0.98, E_o^2 = 0.61$), orientando con precisión la inversión de capital de mejora.
</Callout>
""",
        quiz_component="""<Quiz
  title="Quiz: Network DEA"
  questions={[
    {
      id: "q_network_dea_advantage",
      text: "¿Cuál es la principal ventaja gerencial de implementar Network DEA frente al DEA tradicional de caja negra en una corporación multinacional?",
      options: [
        { id: "a", text: "Identifica con precisión qué departamento o subproceso específico de la cadena de valor es responsable de la ineficiencia global observada", isCorrect: true, explanation: "Correcto: Al conectar los flujos intermedios internos, el Network DEA aísla los cuellos de botella organizacionales específicos, evitando culpar erróneamente a toda la organización por ineficiencias localizadas en una subunidad." },
        { id: "b", text: "Elimina la necesidad de computar restricciones lineales", isCorrect: false, explanation: "El modelo sigue requiriendo optimización lineal." },
        { id: "c", text: "Garantiza que todas las plantas sean eficientes por definición", isCorrect: false, explanation: "El modelo sigue evaluando objetivamente la frontera empírica." }
      ]
    }
  ]}
/>"""
    )
    print("S2 Courses built successfully.")

if __name__ == "__main__":
    build_s2()
