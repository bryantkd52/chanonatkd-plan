(function(){
  const TARGET_ID = "leticia_erguera";
  const VERSION = "leticia-poomsae-20260908-fix-1";
  const CYCLE = "Lunes 31 de agosto al sábado 12 de septiembre del 2026";
  const UPDATED = "Actualizado martes 8 de septiembre de 2026";

  const LINKS = {
    t5l1: "https://drive.google.com/open?id=1nS4odRmRR7Da-q3oGTI1UOYhuqKpzCah&usp=drive_copy",
    t5l2: "https://drive.google.com/open?id=1sYO2lMMZOuZF7-doTLcXFO7itTmlKVe1&usp=drive_copy",
    t5l3: "https://drive.google.com/open?id=1yFJM2dRU3-OJCETZq5i9iYkz72W2aOnT&usp=drive_copy",
    t5l4: "https://drive.google.com/open?id=1FwqSElEVd8CZ6QQNKTFSjow2yYjUgwxG&usp=drive_copy",
    t5l5: "https://drive.google.com/open?id=1k8rtRGCKO6yzMMRfFNw1709X3XHHmPHf&usp=drive_copy",
    t5l6: "https://drive.google.com/open?id=1838t3kpNzYH2Bxq39v_3WWh03o5tepR2&usp=drive_copy",
    t8l1: "https://drive.google.com/open?id=1c4DKxDT0xTvIPj1dyuCwEcGO-UO2ctIu&usp=drive_copy",
    t8l2: "https://drive.google.com/open?id=1b7_Hv2_uduGKv8JUy0NP_vw-my4U2szi&usp=drive_copy",
    t8l3: "https://drive.google.com/file/d/1D0g3Jmt0weJ90WGhV8LpACklDeghuC-d/view?usp=sharing",
    taebaekL3: "https://drive.google.com/open?id=12_cJJxiyocWcsDvaBqYgdiIJsTIXdfmD&usp=drive_copy",
    jakdari: "https://drive.google.com/open?id=1z0tEpdciDc-QqCm2AqdcJ8Q-wZrUhZ3Z&usp=drive_copy",
    koryoL3: "https://drive.google.com/open?id=10o0AJ_apfYR0Ea07gG8vb1jnpRoC2Mtb&usp=drive_copy"
  };

  const POOMSAE = [
    item("Taeguk 5 - Línea 1", "LUNES - MIÉRCOLES", "Trabajo principal de Taeguk 5 línea 1, cuidando base, trayectoria y cierre firme.", "10 min por línea / 1 serie", LINKS.t5l1, "Principal"),
    item("Taeguk 5 - Línea 2", "LUNES - MIÉRCOLES", "Trabajo principal de Taeguk 5 línea 2, cuidando transición, aterrizaje y preparación del golpe.", "10 min por línea / 1 serie", LINKS.t5l2, "Principal"),
    item("Taeguk 5 - Línea 3", "LUNES - MIÉRCOLES", "Trabajo principal de Taeguk 5 línea 3, cuidando Sonnal, codazo, timing y finalización.", "10 min por línea / 1 serie", LINKS.t5l3, "Principal"),
    item("Taeguk 5 - Línea 4", "MARTES - JUEVES", "Trabajo principal de Taeguk 5 línea 4, cuidando Are, Montong, Ap Chagui y posición de apoyo.", "10 min por línea / 1 serie", LINKS.t5l4, "Principal"),
    item("Taeguk 5 - Línea 5", "MARTES - JUEVES", "Trabajo principal de Taeguk 5 línea 5, cuidando Olgul, Yop Chagui, codazo y recobro.", "10 min por línea / 1 serie", LINKS.t5l5, "Principal"),
    item("Taeguk 5 - Línea 6", "MARTES - JUEVES", "Trabajo principal de Taeguk 5 línea 6, cuidando Are, Ap Chagui, golpe y cierre estable.", "10 min por línea / 1 serie", LINKS.t5l6, "Principal"),

    item("Taeguk 8 - Línea 1", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar transición de brazos y piernas sin perder dirección.", "10 min por línea / 1 serie", LINKS.t8l1, "Respaldo"),
    item("Taeguk 8 - Línea 2", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar golpes, trayectoria de brazos y base estable.", "10 min por línea / 1 serie", LINKS.t8l2, "Respaldo"),
    item("Taeguk 8 - Línea 3", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar timing, preparación y finalización clara.", "10 min por línea / 1 serie", LINKS.t8l3, "Respaldo"),
    item("Taebaek - Línea 3", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar posiciones fuertes, ritmo y preparación precisa.", "30 min / 1 serie", LINKS.taebaekL3, "Respaldo"),
    item("Keumgang Jakdari Sogui", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar Jakdari Sogui con calcetas, control de cadera y alineación.", "15 min por línea / 2 series / con calcetas", LINKS.jakdari, "Respaldo"),
    item("Koryo - Línea 3", "", "Material de respaldo para su entrenamiento con sus chicos. Trabajar cámara, recobro, torso alineado y aterrizaje controlado.", "30 min / 1 serie", LINKS.koryoL3, "Respaldo")
  ];

  const ERRORS = [
    "Taeguk 5: evita que los pies se crucen o se desordenen en las transiciones; primero organiza la base y después finaliza la técnica.",
    "Taeguk 5: evita terminar codazos, golpes y defensas sin corte; cada movimiento debe cerrar firme y con trayectoria clara.",
    "Taeguk 5: evita que el torso se incline al patear; mantén el cuerpo alineado desde la preparación hasta el aterrizaje.",
    "Taeguk 5: evita perder la cámara y el recobro en Yop Chagui; la rodilla debe regresar con control antes de caer.",
    "Taeguk 5: evita correr el ritmo de Sonnal y codazo; trabaja primero dirección, preparación y finalización correcta.",
    "Taeguk 5: evita aterrizar sin control después de Ap Chagui o Yop Chagui; cuida bola del pie, talón y posición final."
  ];

  const FINAL_NOTES = [
    "IMPORTANTE: En la sección de Poomsae, solo entrena las de Taeguk 5. Las otras estarán de respaldo por si las necesitas para tu entrenamiento con tus chicos.",
    "Estas siguientes dos semanas deben ser ligeramente menos pesadas que las anteriores. Si sientes que tienes una sobrecarga o no estás rindiendo como tú te conoces, baja ligeramente la intensidad, ya sea quitando dos reps o bajando la altura del movimiento, pero siempre protegiendo la técnica; esa no es negociable.",
    "Seguimos con el enfoque de los detalles finos. No te enfoques en la velocidad máxima de toda la Poomsae, sino en la velocidad de cada movimiento y su finalización correcta.",
    "Feliz entrenamiento y seguimos dándole con todo como se debe."
  ];

  function current(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function isLeticia(){
    return current() === TARGET_ID;
  }

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function norm(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function item(titulo, dia, enfoque, reps, url, tag){
    const data = { titulo, enfoque, reps, tipo:"video", url, tags:[tag] };
    if(dia) data.dia = dia;
    return data;
  }

  function patchPlan(plan){
    if(!plan || !isLeticia()) return plan;
    plan.ciclo = CYCLE;
    plan.updated_at = UPDATED;
    plan.poomsaeDias = "Taeguk 5: lunes y miércoles / martes y jueves";
    plan.poomsae = POOMSAE.map(entry => ({ ...entry, tags:[...(entry.tags || [])] }));
    plan.indicacionesExtras = ERRORS;
    plan.notasFinales = FINAL_NOTES;
    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      previousRenderPage(plan, alumno);
      patchPlan(plan);
      schedulePatch();
    };
  }

  function findSectionByTitle(words){
    return [...document.querySelectorAll("section")].find(section => {
      const title = norm(section.querySelector("h3")?.textContent || "");
      return words.every(word => title.includes(norm(word)));
    });
  }

  function renderPoomsaeItem(entry, index){
    const dayLine = entry.dia ? `<div class="meta daysMeta"><b>Días:</b> ${h(entry.dia)}</div>` : "";
    const tag = entry.tags && entry.tags[0] ? `<span class="badge red">${h(entry.tags[0])}</span>` : "";
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(entry.titulo)}</p>
            ${dayLine}
            <div class="meta"><b>Enfoque:</b> ${h(entry.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${h(entry.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index + 1}</span><span class="badge ok">VIDEO</span>${tag}</div>
        </div>
        <div class="actions"><a class="action primary" href="${h(entry.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>
      </article>`;
  }

  function renderPoomsaeSection(){
    return `
      <div class="systemNotice"><strong>IMPORTANTE:</strong> Solo entrena las líneas de <b>Taeguk 5</b>. Los demás videos quedan como respaldo para tu trabajo con tus chicos.</div>
      <div class="cardsGrid">${POOMSAE.map(renderPoomsaeItem).join("")}</div>`;
  }

  function renderTextCards(items){
    return `<div class="cardsGrid">${items.map((text, index) => `
      <article class="itemRow">
        <div class="itemTop">
          <div><p class="itemTitle">${h(text)}</p></div>
          <div class="badgeRow"><span class="badge">${index + 1}</span><span class="badge">INFO</span></div>
        </div>
      </article>`).join("")}</div>`;
  }

  function patchHero(){
    const sub = document.getElementById("planSub");
    if(sub){
      const text = sub.textContent || "";
      sub.textContent = text.includes("• Para:")
        ? text.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
    }

    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  function patchResumen(){
    const section = document.getElementById("resumen") || findSectionByTitle(["resumen"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.leticiaResumenVersion === VERSION) return;
    body.dataset.leticiaResumenVersion = VERSION;

    body.querySelectorAll("li, .meta, p").forEach(node => {
      const text = norm(node.textContent || "");
      if(text.includes("poomsae")){
        node.textContent = "Poomsae: lunes y miércoles / martes y jueves.";
      }
    });
  }

  function patchPoomsae(){
    const section = document.getElementById("poomsae") || findSectionByTitle(["poomsae"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.leticiaPoomsaeVersion === VERSION) return;
    body.dataset.leticiaPoomsaeVersion = VERSION;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Poomsae";
    if(eyebrow) eyebrow.textContent = "Taeguk 5 principal + respaldo";
    body.innerHTML = renderPoomsaeSection();
  }

  function patchIndicaciones(){
    const section = findSectionByTitle(["indicaciones"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.leticiaIndicacionesVersion === VERSION) return;
    body.dataset.leticiaIndicacionesVersion = VERSION;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Indicaciones Extras";
    if(eyebrow) eyebrow.textContent = "Errores comunes de Taeguk 5";
    body.innerHTML = renderTextCards(ERRORS);
  }

  function patchFinalNotes(){
    const section = findSectionByTitle(["notas"]);
    const body = section?.querySelector(".sectionBody");
    if(!body || body.dataset.leticiaNotasVersion === VERSION) return;
    body.dataset.leticiaNotasVersion = VERSION;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    if(title) title.textContent = "Notas finales";
    if(eyebrow) eyebrow.textContent = "Cómo trabajar este ciclo";
    body.innerHTML = renderTextCards(FINAL_NOTES);
  }

  function patchDom(){
    if(!isLeticia()) return;
    patchHero();
    patchResumen();
    patchPoomsae();
    patchIndicaciones();
    patchFinalNotes();
  }

  function schedulePatch(){
    setTimeout(patchDom, 0);
    setTimeout(patchDom, 250);
    setTimeout(patchDom, 700);
    setTimeout(patchDom, 1300);
  }

  document.addEventListener("click", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  document.addEventListener("change", () => {
    setTimeout(patchDom, 120);
    setTimeout(patchDom, 450);
  }, true);

  schedulePatch();
})();
