# Reglas de Comportamiento y Directrices del Proyecto: Stats Edu

## 1. Regla de Comportamiento Mandatoria: Uso de Bitácora (`BITACORA.md`)
- **Registro continuo**: En cada sesión, tarea o ciclo de desarrollo relevante, el agente debe consultar, actualizar y mantener la bitácora del proyecto en el archivo [`BITACORA.md`](./BITACORA.md) ubicado en la raíz del repositorio.
- **Estructura de la Bitácora**:
  1. **Fecha y Hora (ISO / Local)**.
  2. **Objetivo de la sesión**: Lo solicitado por el usuario y los requerimientos abordados.
  3. **Acciones ejecutadas**: Cambios de código, nuevos módulos, componentes interactivos, pruebas E2E.
  4. **Decisiones arquitectónicas y técnicas**: Explicación de por qué se tomó una decisión (ej. Cloudflare Pages Static Export, almacenamiento local de progreso, integración de visualizadores).
  5. **Estado de verificación**: Resultados de `tsc --noEmit`, linters y pruebas Playwright.
  6. **Próximos pasos y compromisos pendientes**: Tareas abiertas para sesiones futuras.

---

## 2. Enfoque Académico e Institucional
- La plataforma representa el portal formativo del **Área de Investigación de Operaciones y Estadística** de la **Facultad de Ingeniería Industrial** de la **Universidad Tecnológica de Pereira (UTP)**.
- El diseño visual de la interfaz debe priorizar la sobriedad, legibilidad y rigor de un portal universitario de ingeniería, con modo claro (Light Mode) predeterminado, tipografía limpia, notación matemática KaTeX rigurosa y visualizaciones científicas interactivas.

---

## 3. Compatibilidad con Despliegue Estático en Cloudflare Pages
- Mantener la configuración `output: 'export'` en `next.config.ts`.
- Evitar dependencias de runtime Node.js del lado del servidor o Server Actions que impidan la generación estática a `out/`.
- El seguimiento del avance estudiantil y evaluaciones interactivas debe operar en el cliente (actualmente vía `localStorage` y extensible a proveedores de autenticación cliente como Supabase Auth / PKCE).
