# ChanonaTKD Plan — Reglas permanentes del proyecto

Este repositorio contiene la interfaz de planes de entrenamiento de ChanonaTKD y los archivos JSON que alimentan esa interfaz. La página se comparte operativamente mediante enlaces individuales, pero el repositorio y/o los archivos desplegados pueden ser accesibles según la configuración de visibilidad. Estas reglas aplican a toda tarea de generación, edición, auditoría o mantenimiento realizada con asistencia de IA.

## 1. Protección de ramas y archivos existentes

- Trabajar únicamente en la rama indicada por Bryan para cada tarea.
- Mientras exista la rama `sistema-seguro-codex-2026`, usarla para mejoras de seguridad, normalización y validación.
- **No modificar directamente `main`**, no hacer merge y no abrir pull requests hacia `main` sin autorización expresa de Bryan después de revisar los cambios.
- No borrar, renombrar ni mover planes existentes sin una instrucción explícita.
- No modificar `plan/index.html`, `plan/app.js` ni `plan/styles.css` salvo que la tarea lo solicite expresamente y se explique el impacto antes de hacerlo.
- `data/alumnos.json` solo puede modificarse por instrucción expresa de Bryan. Se permite actualizar fechas de renovación bajo las reglas de la sección 6.

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
- `data/media-library.json` junto con `data/media-library-review.json` son la fuente autorizada para insertar recursos en planes nuevos o actualizados hasta que exista una biblioteca consolidada final.
- Si un ejercicio solicitado no se encuentra en la biblioteca aprobada, detener la generación del plan e informar qué recurso necesita confirmación de Bryan.
- Los audios de timing de poomsae solo pueden asignarse dentro del array `poomsae`.

## 5. Datos mostrados al alumno y límites de información

Bryan ha indicado que desea conservar en la experiencia del alumno sus datos operativos del entrenamiento, incluyendo la próxima fecha de renovación mostrada en su enlace individual.

Se permite conservar y actualizar, dentro de `data/alumnos.json`:

- `nombre`
- `plan`
- `plan_activo`
- `suscripcion_activa`, incluyendo la próxima fecha de renovación solicitada por Bryan
- `objetivo_proximo`

Reglas que permanecen vigentes:

- No agregar datos bancarios, CLABE, comprobantes, importes pagados, correos, teléfonos, direcciones ni datos de contacto de alumnos.
- No inventar, inferir o actualizar fechas de renovación sin la fecha exacta indicada por Bryan.
- No agregar diagnósticos médicos, cirugías o antecedentes clínicos nuevos salvo instrucción expresa de Bryan para una necesidad técnica del plan; si se solicita, advertir antes que el archivo se entrega mediante enlace y puede no constituir acceso autenticado.
- No agregar evaluaciones privadas o comentarios que Bryan no pretenda mostrar al alumno en su propio plan.

## 6. Actualización controlada de renovaciones

El campo que actualmente muestra la siguiente fecha de pago o renovación es:

```json
"suscripcion_activa": "Proxima renovación 21 de abril"
```

y se encuentra en:

```text
data/alumnos.json
```

Cuando Bryan solicite una actualización de pago o renovación:

1. Identificar exactamente al alumno por su clave y nombre dentro de `data/alumnos.json`.
2. Modificar únicamente el campo `suscripcion_activa`, salvo que Bryan solicite expresamente cambiar otro campo.
3. Utilizar la fecha exacta proporcionada por Bryan y no calcular ni suponer renovaciones futuras.
4. Antes de publicar el cambio, reportar: alumno, texto anterior y texto nuevo.
5. Realizar primero el cambio en una rama segura o propuesta revisable; no modificar `main` sin autorización expresa.

Ejemplo de cambio permitido:

```json
"suscripcion_activa": "Próxima renovación 8 de junio de 2026"
```

## 7. Identidad y separación entre alumnos

- Nunca mezclar ejercicios, correcciones, nivel, género de tratamiento, metas, fecha de renovación o notas finales entre alumnos.
- El nombre visible y archivo asignado del alumno deben tomarse de `data/alumnos.json` o de una instrucción explícita de Bryan.
- No corregir, completar o cambiar nombres por inferencia.
- Si hay ambigüedad entre el alumno indicado y el archivo asociado, detenerse y reportar la discrepancia antes de editar.

## 8. Redacción técnica y deducciones

- Redactar en español, con tono profesional y motivacional propio de ChanonaTKD.
- Se pueden utilizar términos como `timing`, `control neuromuscular`, `eje corporal`, `encapsulación` y `corte de movimiento` cuando correspondan técnicamente.
- No afirmar deducciones reglamentarias numéricas (`.1`, `.3`) como hecho si no existe una referencia validada proporcionada por Bryan o almacenada en el repositorio.
- Si la referencia no existe, redactar la corrección técnica sin asignar un descuento numérico.

## 9. Validación obligatoria antes de aprobar cambios futuros

- Todo plan nuevo o modificado debe validarse mediante `scripts/validate-plan.js` antes de considerarse terminado.
- La validación comprueba estructura, arrays, tipos de recurso, URLs autorizadas y datos sensibles evidentes dentro de los planes.
- La actualización de `suscripcion_activa` en `data/alumnos.json` es un flujo administrativo autorizado separado de la validación de planes; deberá incorporarse a una validación específica del directorio de alumnos antes de automatizar cambios masivos.
- No afirmar que un plan está listo si la validación falla.

## 10. Alcance de esta fase de seguridad

Hasta que Bryan apruebe expresamente la integración final a `main`:

- Se permite crear documentación, esquemas, scripts de auditoría y validadores dentro de la rama segura.
- Se permite analizar planes existentes sin modificarlos.
- Se permite preparar actualizaciones de `suscripcion_activa` cuando Bryan proporcione alumno y fecha exacta.
- No se deben generar ni publicar planes nuevos automáticamente sin validar.
- No se deben cambiar los archivos de la interfaz sin revisión previa de Bryan.
