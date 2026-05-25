# ChanonaTKD Plan — Reglas permanentes del proyecto

Este repositorio contiene la interfaz pública de planes de entrenamiento de ChanonaTKD y los archivos JSON que alimentan esa interfaz. Estas reglas aplican a toda tarea de generación, edición, auditoría o mantenimiento realizada con asistencia de IA.

## 1. Protección de ramas y archivos existentes

- Trabajar únicamente en la rama indicada por Bryan para cada tarea.
- Mientras exista la rama `sistema-seguro-codex-2026`, usarla para mejoras de seguridad, normalización y validación.
- **No modificar directamente `main`**, no hacer merge y no abrir pull requests hacia `main` sin autorización expresa de Bryan después de revisar los cambios.
- No borrar, renombrar ni mover planes existentes sin una instrucción explícita.
- No modificar `plan/index.html`, `plan/app.js`, `plan/styles.css` ni `data/alumnos.json` salvo que la tarea lo solicite expresamente y se explique el impacto antes de hacerlo.

## 2. Contrato actual de la interfaz

La página funciona con este flujo y debe conservarse compatible:

1. `plan/index.html` carga `plan/app.js`.
2. La URL recibe el identificador mediante `?alumno=<id>`.
3. `plan/app.js` busca el alumno en `data/alumnos.json`.
4. La propiedad `plan` del alumno apunta a un archivo dentro de `data/planes/`.

No cambiar este flujo durante tareas de generación de planes.

### Llaves obligatorias para planes nuevos o planes actualizados

Todo archivo nuevo o modificado dentro de `data/planes/` debe conservar estas llaves, aunque una sección no tenga ejercicios asignados:

```json
{
  "updated_at": "",
  "nivel": "",
  "ciclo": "",
  "enfoque_corto": "",
  "enfoque": "",
  "chanonaflexDias": "",
  "chanonaflex": [],
  "isometricoDias": "",
  "isometrico": [],
  "pateoDias": "",
  "pateoTecnico": [],
  "poomsaeDias": "",
  "poomsae": [],
  "apuntes": [],
  "notasFinales": []
}
```

- `extras` es opcional y solo debe utilizarse cuando Bryan lo solicite o cuando ya forme parte del plan que se está actualizando.
- Las secciones de ejercicios deben ser arrays. Si no se asignan ejercicios, usar `[]`, nunca objetos vacíos como `{}`.
- `apuntes` y `notasFinales` siempre deben ser arrays de strings.

### Estructura de recursos

Los objetos de recursos deben conservar campos coherentes con su sección:

- Base mínima: `titulo`, `tipo`, `url`.
- En `chanonaflex`, incluir `dia` cuando corresponda.
- En `pateoTecnico` y `poomsae`, incluir `enfoque` y `reps` cuando el contenido sea un ejercicio asignado.
- En `isometrico`, mantener `tags` como array cuando se utilicen etiquetas.

## 3. Tipos de recurso permitidos

Mientras `plan/app.js` no se actualice para soportar otros tipos, utilizar únicamente:

- `"video"`
- `"audio"`
- `"folder"`

No usar valores como `"ejercicio"`, `"EJERCICIO - NO VIDEO"` o variantes similares, porque la interfaz actual puede mostrarlos incorrectamente.

Si Bryan requiere un ejercicio sin enlace, reportar primero que la interfaz necesita soporte seguro para ese tipo antes de incorporarlo a un plan nuevo.

## 4. Política estricta de URLs y biblioteca de medios

- No inventar, modificar, corregir, acortar ni sustituir URLs.
- No seleccionar un video “parecido” o “más cercano” cuando no exista un recurso exacto autorizado.
- Cuando exista `data/media-library.json`, será la única fuente autorizada para insertar recursos en planes nuevos o actualizados.
- Hasta que `data/media-library.json` sea creado y aprobado, solo se pueden conservar URLs de un plan existente o hacer labores de auditoría; no se deben asignar recursos nuevos de forma automática.
- Si un ejercicio solicitado no se encuentra en la biblioteca aprobada, detener la generación del plan e informar qué recurso necesita confirmación de Bryan.
- Los audios de timing de poomsae solo pueden asignarse dentro del array `poomsae`.

## 5. Privacidad: repositorio y página pública

Este repositorio puede ser visible públicamente. Por ello:

- No agregar información de pagos, renovaciones, suscripciones, correos, teléfonos, direcciones o datos de contacto de alumnos.
- No agregar diagnósticos médicos, cirugías, lesiones detalladas, antecedentes clínicos ni notas de salud identificables dentro de planes públicos.
- No agregar evaluaciones privadas, comentarios sensibles o información que un alumno no debería ver publicada junto a su nombre.
- Cuando una consideración de seguridad física sea indispensable para un plan público, redactarla de forma general y mínima, por ejemplo: “trabajar de forma progresiva y suspender ante dolor”, sin revelar antecedentes personales.
- Si una tarea solicita incluir información sensible, detenerse e informar que debe manejarse fuera del repositorio público.

## 6. Identidad y separación entre alumnos

- Nunca mezclar ejercicios, correcciones, nivel, género de tratamiento, metas o notas finales entre alumnos.
- El nombre visible y archivo asignado del alumno deben tomarse de `data/alumnos.json` o de una instrucción explícita de Bryan.
- No corregir, completar o cambiar nombres por inferencia.
- Si hay ambigüedad entre el alumno indicado y el archivo asociado, detenerse y reportar la discrepancia antes de editar.

## 7. Redacción técnica y deducciones

- Redactar en español, con tono profesional y motivacional propio de ChanonaTKD.
- Se pueden utilizar términos como `timing`, `control neuromuscular`, `eje corporal`, `encapsulación` y `corte de movimiento` cuando correspondan técnicamente.
- No afirmar deducciones reglamentarias numéricas (`.1`, `.3`) como hecho si no existe una referencia validada proporcionada por Bryan o almacenada en el repositorio.
- Si la referencia no existe, redactar la corrección técnica sin asignar un descuento numérico.

## 8. Validación obligatoria antes de aprobar cambios futuros

Cuando existan `schemas/training-plan.schema.json` y `scripts/validate-plan.js`:

- Todo plan nuevo o modificado debe validarse antes de considerarse terminado.
- La validación debe comprobar estructura, arrays, tipos de recurso, URLs autorizadas y ausencia de datos sensibles evidentes.
- No afirmar que un plan está listo si la validación falla.

Mientras dichos archivos no existan, cualquier tarea de planes debe limitarse a auditoría o requerir revisión manual completa de Bryan antes de publicarse.

## 9. Alcance de esta fase de seguridad

Hasta que Bryan apruebe la biblioteca oficial de medios y el validador:

- Se permite crear documentación, esquemas, scripts de auditoría y validadores dentro de la rama segura.
- Se permite analizar planes existentes sin modificarlos.
- No se deben generar ni publicar planes nuevos automáticamente.
- No se deben cambiar los archivos de la interfaz pública sin revisión previa de Bryan.
