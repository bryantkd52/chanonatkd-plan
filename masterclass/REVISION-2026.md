# Revisión ChanonaTKD 2026–2027 (NO PUBLICADA)

Esta rama contiene una propuesta de cinco páginas. **No se fusionó con main ni se modificó la web pública**.

## Las cinco rutas previstas tras aprobar y publicar
- `/masterclass/` — Inicio.
- `/masterclass/system/` — ChanonaTKD System.
- `/masterclass/personal/` — Personal Training.
- `/masterclass/academia/` — Academia Digital CTKD.
- `/masterclass/curriculum/` — Mi currículum.

Todas usan el mismo menú y modo claro/oscuro. Sus enlaces funcionan al entrar directamente en cada ruta.

## Cómo abrir una vista de revisión en tu equipo
1. Descarga esta rama (Code → Download ZIP) y descomprímela.
2. Abre una terminal en la carpeta del repositorio.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000/masterclass/?revision=1`.
5. Desde esa página prueba las demás rutas. Para cerrar el servidor pulsa Ctrl+C.

**Importante:** los testimonios ficticios se muestran solo al usar `?revision=1`. Al abrir la página normal se ocultan automáticamente. Las estrellas son ilustrativas y no representan reseñas verificadas.

## Configuración editable
- `masterclass/assets/content.js`: nueve miniclases, tres por programa, y video provisional de la muestra de plan.
- `masterclass/assets/testimonios-ejemplo.js`: diez ejemplos ficticios de testimonios.
- `masterclass/assets/system-beginners-demo.json`: copia independiente del nivel Principiantes extraída de `data/planes/plan_chanonatkd_system.json` (estado 2026-10-16). Se conservan títulos, frecuencia, días, series, repeticiones, descansos, indicaciones y 10 ejercicios.
- `masterclass/assets/site.js`: menú, tema, controles de video y modal, navegación y eventos analíticos.
- `masterclass/assets/site.css`: Liquid Glass, responsive, foco y reduced-motion.
- `masterclass/imagenes/`: imágenes existentes reutilizadas. No se modificaron los originales.

## Detalles importantes
- La copia del plan **no reutiliza los enlaces privados de videos** de los alumnos. Los 10 recursos están sustituidos por un reproductor de prueba con el video público autorizado. La estructura de la pestaña Principiantes corresponde a la fuente real.
- La pestaña Principiantes no tiene Poomsae ni clases grabadas asignadas individualmente en el JSON consultado; se declara así. El video provisional de la sección Clases es solo una prueba de interfaz, no una clase auténtica asociada al nivel.
- Los nueve reproductores de miniclases usan por ahora el mismo enlace de YouTube autorizado. No se reproducen solos; al cambiar de clase se desmonta el reproductor anterior.
- Los videos *no listados* de YouTube pueden compartirse mediante su enlace. El sitio no limita su acceso.
- Los precios USD/EUR reflejan exactamente los tres valores confirmados; no se recalculan. Las menciones a PayPal reflejan el cargo internacional vigente registrado de 6 USD/EUR.
- Las consultas WhatsApp identifican programa y conservan información UTM del origen en la sesión cuando existe.
- El archivo JS emite eventos `ctkd_pagina_visitada`, `ctkd_abrir_muestra_plan`, `ctkd_miniclase_iniciada`, `ctkd_avance_miniclase`, `ctkd_whatsapp_click`, `ctkd_consulta_pago_dividido` en `window.dataLayer`, pero **no está conectada ninguna analítica externa**.

## Pendiente antes de aprobar publicación
- Nueve enlaces definitivos de miniclases.
- Videos exclusivos de la muestra (sin enlaces originales de alumnos).
- Fotografías y testimonios auténticos, así como resultados documentados.
- Validación visual en teléfono, tableta, laptop y escritorio con navegador real.
- Conexión/configuración de analítica (GA4, Meta Pixel u otra).
- Revisión comercial de las imágenes antiguas que pudieran conservar nombres anteriores (System FULL/Super Curso).
- Autorización posterior y explícita de Bryan para publicar o integrar cambios a `main`.

**No se tocaron** `plan/index.html`, `plan/app.js`, `plan/styles.css`, `data/alumnos.json` ni los planes activos.
