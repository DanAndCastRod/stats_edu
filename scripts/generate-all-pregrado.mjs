import { execSync } from 'child_process';

const generators = [
  'generate-course-estadistica-iii.mjs',
  'generate-course-procesos-estocasticos.mjs',
  'generate-course-simulacion.mjs',
  'generate-course-administracion-industrial.mjs',
  'generate-course-ingenieria-economica-finanzas.mjs',
  'generate-course-gestion-produccion-logistica.mjs',
  'generate-course-metodos-cuantitativos-algebra.mjs'
];

console.log("🚀 Iniciando generación completa de los 7 cursos de pregrado de Ingeniería Industrial UTP...\n");

for (const gen of generators) {
  console.log(`▶ Ejecutando scripts/${gen}...`);
  execSync(`node scripts/${gen}`, { stdio: 'inherit' });
}

console.log("\n🔍 Validando todos los cursos...");
execSync('node scripts/validate-all-courses.mjs', { stdio: 'inherit' });
console.log("\n✨ Todos los cursos de pregrado han sido generados y validados con éxito!");
