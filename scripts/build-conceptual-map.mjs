import fs from "fs";
import path from "path";
import { blockAStats } from "./data/block-a-stats.mjs";
import { blockBOpt } from "./data/block-b-opt.mjs";
import { blockCStochastic } from "./data/block-c-stochastic.mjs";
import { blockDManagement } from "./data/block-d-management.mjs";
import { blockEPosgrado } from "./data/block-e-posgrado.mjs";

const OUTPUT_FILE = path.join(process.cwd(), "content", "MAPA_CONCEPTUAL_MODULOS.md");

const allBlocks = [
  { name: "Bloque A: Probabilidad, Inferencia y Estadística Aplicada", modules: blockAStats },
  { name: "Bloque B: Optimización Determinística e Investigación de Operaciones", modules: blockBOpt },
  { name: "Bloque C: Procesos Estocásticos, Colas y Simulación", modules: blockCStochastic },
  { name: "Bloque D: Producción, Logística, Economía y Gestión", modules: blockDManagement },
  { name: "Bloque E: Posgrado Avanzado MIOE y Métodos Cuantitativos", modules: blockEPosgrado }
];

let totalMods = 0;
allBlocks.forEach(b => { totalMods += b.modules.length; });

let md = `# Mapa Conceptual y Refinamiento Teórico de Módulos Curriculares
> **Facultad de Ingeniería Industrial — Universidad Tecnológica de Pereira (UTP)**  
> **Área Académica:** Investigación de Operaciones y Estadística  
> **Laboratorio Asociado:** Laboratorio GEIO (Gestión y Estudios en Investigación de Operaciones)  
> **Documento Maestro de Cobertura Integral (100% de los ${totalMods} Módulos Curriculares - 21 Asignaturas)**

---

## 1. Presentación y Propósito Formativo

El presente documento constituye el **compendio canónico de refinamiento conceptual y matemático** de la totalidad de asignaturas del Área de Investigación de Operaciones y Estadística de la Facultad de Ingeniería Industrial de la Universidad Tecnológica de Pereira (UTP). 

Cada módulo curricular ha sido analizado, formalizado y contrastado con la literatura científica internacional más prestigiosa y las fuentes académicas canónicas (Bertsimas, Montgomery, Ross, Hillier & Lieberman, Taha, Sterman, Charnes & Cooper, Markowitz, Rockafellar & Uryasev, Walpole & Myers, Blank & Tarquin).

### Estructura Estándar de Refinamiento por Módulo:
1. **Identificación Institucional:** Código oficial UTP, nombre de la asignatura, número de módulo, título y coordinación académica responsable.
2. **Competencias y Resultados de Aprendizaje:** Capacidades específicas del ingeniero industrial o magíster en IO y Estadística.
3. **Fundamentación Teórica y Formulación Matemática:** Definiciones rigurosas, deducción analítica de teoremas, supuestos formales y formulación KaTeX.
4. **Literatura Canónica & Contraste Web:** Obras rectoras, aportes teóricos de los autores y discusión de validez.
5. **Aplicación Práctica en Ingeniería Industrial:** Casos concretos de optimización de planta, calidad, logística o finanzas en el contexto de Colombia y el Eje Cafetero.
6. **Mapeo de Herramienta Computacional:** Vinculación directa con la suite de herramientas interactivas (\`/tools#...\`) o laboratorios de código en vivo en WebAssembly (\`<PyodideRunner />\`).

---

## 2. Índice General de Asignaturas y Módulos (${totalMods} Módulos)

`;

allBlocks.forEach((b, bIdx) => {
  md += `### ${b.name} (${b.modules.length} Módulos)\n`;
  let currentCourse = "";
  b.modules.forEach(m => {
    if (m.courseCode !== currentCourse) {
      currentCourse = m.courseCode;
      md += `\n- **${m.courseTitle} [${m.courseCode}]**:\n`;
    }
    md += `  * [Módulo ${m.moduleNumber}: ${m.moduleTitle}](#${m.id})\n`;
  });
  md += "\n";
});

md += `---

## 3. Desarrollo Detallado Módulo a Módulo (Refinamiento al 100%)

`;

allBlocks.forEach(b => {
  md += `\n# ${b.name}\n\n`;
  b.modules.forEach(m => {
    md += `<a id="${m.id}"></a>\n`;
    md += `## [${m.courseCode}] ${m.courseTitle} — Módulo ${m.moduleNumber}: ${m.moduleTitle}\n\n`;
    md += `- **Coordinación Académica:** ${m.coordination}\n`;
    md += `- **Competencia Formativa:** ${m.competencies}\n\n`;
    md += `${m.theoryMath}\n\n`;
    md += `${m.literatureContrast}\n\n`;
    md += `${m.industrialApplication}\n\n`;
    md += `> **Interacción Computacional:** ${m.toolMapping}\n\n`;
    md += `---\n\n`;
  });
});

md += `\n## 4. Matriz Global de Trazabilidad Curricular y Herramientas Computacionales

| Módulo | Asignatura | Código | Herramienta Asociada | Motor de Cálculo / Librería |
| :--- | :--- | :---: | :--- | :--- |
${allBlocks.flatMap(b => b.modules).map(m => `| M${m.moduleNumber}: ${m.moduleTitle.slice(0, 32)}... | ${m.courseTitle.slice(0, 24)} | ${m.courseCode} | \`${m.toolMapping.split(":")[1]?.trim().slice(0, 36) || "Laboratorio"}\` | KaTeX / NumPy / Wasm |`).join("\n")}

---
*Documento compilado y validado para la plataforma Stats Edu (Facultad de Ingeniería Industrial - UTP).*
`;

fs.writeFileSync(OUTPUT_FILE, md, "utf8");
console.log(`Documento maestro generado exitosamente: ${OUTPUT_FILE}`);
console.log(`Total de módulos documentados: ${totalMods}`);
