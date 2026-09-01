(function(){
  const TARGETS = new Set([
    "karen_sanchez",
    "rodrigo_gonzalez",
    "leonardo_gonzalez",
    "omar_azi",
    "rafa_hernandez",
    "scarlet_arianna",
    "scarlett_arianna",
    "anna_georgia",
    "patricio_leigh",
    "maria_ponce",
    "leticia_erguera"
  ]);

  const CYCLE = "Lunes 31 de agosto al sábado 12 de septiembre del 2026";
  const UPDATED = "Actualizado lunes 31 de agosto de 2026";

  const LINKS = {
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    nivel3: "https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing",
    gluteo: "https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1: "https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1: "https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    caderaBanda: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    circuitoElevacion: "https://drive.google.com/open?id=1Jrwnad5LdAZdG1d_75e2QI7U2sEVLcSP",
    apPared: "https://drive.google.com/file/d/1CX6PkR9CrTaOvZxrZPKTyc1mPfcfJ4wp/view?usp=drive_link",
    tobilloBanda: "https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    sentadillaAp: "https://drive.google.com/file/d/1erT1zgvLi0aFMDJb562Y2t7wNwmGWPmj/view?usp=sharing",
    t4l3: "https://drive.google.com/open?id=1wj_ri9Jloap-xOSWoxi7k-mxSa3X5RqH&usp=drive_copy",
    t4l4: "https://drive.google.com/open?id=1BtdMNbAEA77j4-GIMxgreKYNDnbnYeiO&usp=drive_copy",
    t4l5: "https://drive.google.com/open?id=1t4HBd3xhPkQ1IBKOtDe_-qPp4lq47u6i&usp=drive_copy",
    t7l3: "https://drive.google.com/file/d/1GRHKn-kKMmgY0mJ6japbwVK8AqiP8yAv/view?usp=sharing",
    t8l1: "https://drive.google.com/open?id=1c4DKxDT0xTvIPj1dyuCwEcGO-UO2ctIu&usp=drive_copy",
    t8l2: "https://drive.google.com/open?id=1b7_Hv2_uduGKv8JUy0NP_vw-my4U2szi&usp=drive_copy",
    t8l3: "https://drive.google.com/file/d/1D0g3Jmt0weJ90WGhV8LpACklDeghuC-d/view?usp=sharing",
    taebaekL3: "https://drive.google.com/open?id=12_cJJxiyocWcsDvaBqYgdiIJsTIXdfmD&usp=drive_copy",
    jakdari: "https://drive.google.com/open?id=1z0tEpdciDc-QqCm2AqdcJ8Q-wZrUhZ3Z&usp=drive_copy",
    koryoL3: "https://drive.google.com/open?id=10o0AJ_apfYR0Ea07gG8vb1jnpRoC2Mtb&usp=drive_copy"
  };

  function current(){ return new URL(location.href).searchParams.get("alumno") || ""; }
  function isTarget(){ return TARGETS.has(current()); }
  function isEnglish(){ return current() === "anna_georgia"; }
  function h(value){ const div = document.createElement("div"); div.textContent = String(value ?? ""); return div.innerHTML; }

  function item(titulo, dia, enfoque, reps, tipo, url){
    const data = { titulo, dia, enfoque, reps, tipo: tipo || (url ? "video" : "info") };
    if(url) data.url = url;
    return data;
  }

  function commonChanonaflex(en){
    return en ? [
      item("Pre-Chanonaflex - Initial Stretch", "BEFORE TRAINING", "Use it to prepare the body before the main work.", "Follow the video", "video", LINKS.pre),
      item("Chanonaflex From Proposal - Level 3", "MONDAY - WEDNESDAY - FRIDAY / TUESDAY - THURSDAY - SATURDAY as assigned", "Work on range, control and body alignment without forcing the movement.", "Follow the video", "video", LINKS.nivel3)
    ] : [
      item("Pre-Chanonaflex - Estiramiento inicial", "ANTES DE ENTRENAR", "Usarlo para preparar el cuerpo antes del trabajo principal.", "Según indicación del video", "video", LINKS.pre),
      item("Chanonaflex Desde Propuesta - Nivel 3", "LUNES - MIÉRCOLES - VIERNES / MARTES - JUEVES - SÁBADO según asignación", "Trabajar rango, control y alineación del cuerpo sin forzar el movimiento.", "Según indicación del video", "video", LINKS.nivel3)
    ];
  }

  function commonIsometric(en){
    return en ? [
      item("Glute and Hook - Active Isometric - Intermediate", "MONDAY - FRIDAY", "Work glute strength, hip control and hook-kick support.", "Follow the video", "video", LINKS.gluteo),
      item("Active Isometric - Yop Chagui - Level 1", "TUESDAY - THURSDAY", "Work chamber, support leg, hip control and body alignment.", "Follow the video", "video", LINKS.yopIso1),
      item("Active Isometric - Ap Chagui - Level 1", "WEDNESDAY - SATURDAY", "Work front-kick strength, knee lift and clean leg recovery.", "Follow the video", "video", LINKS.apIso1)
    ] : [
      item("Glúteo y gancho - Isométrico activo - Intermedio", "LUNES - VIERNES", "Trabajar fuerza de glúteo, control de cadera y base para gancho.", "Según indicación del video", "video", LINKS.gluteo),
      item("Isométrico Activo - Yop Chagui - Nivel 1", "MARTES - JUEVES", "Trabajar cámara, pierna de apoyo, control de cadera y alineación.", "Según indicación del video", "video", LINKS.yopIso1),
      item("Isométrico activo - Ap Chagui - Nivel 1", "MIÉRCOLES - SÁBADO", "Trabajar fuerza de Ap Chagui, elevación de rodilla y recobro limpio.", "Según indicación del video", "video", LINKS.apIso1)
    ];
  }

  function commonPateo(en){
    return en ? [
      item("Hip rotation with elastic band", "MONDAY - WEDNESDAY - FRIDAY", "Work hip direction, resistance and control.", "30 reps / 2 series", "video", LINKS.caderaBanda),
      item("Elevation + hold + circular circuit", "MONDAY - WEDNESDAY - FRIDAY", "Work knee elevation, hold and circular-kick control.", "20 reps / 3 series", "video", LINKS.circuitoElevacion),
      item("Ap Chagui against wall", "MONDAY - FRIDAY", "Work front-kick alignment, support leg and posture.", "20 reps / 2 series", "video", LINKS.apPared),
      item("Ankle strengthening exercise with band", "MONDAY TO FRIDAY", "Strengthen the ankle and support base for cleaner kicking.", "10 reps each side / 1 series", "video", LINKS.tobilloBanda),
      item("Ap Chagui Squat", "MONDAY - FRIDAY", "Work leg strength and technical Ap Chagui control.", "30 reps total / 2 series", "video", LINKS.sentadillaAp),
      item("Yop Chagui + floor touch + balance", "MONDAY - WEDNESDAY", "Work Yop Chagui chamber, floor touch control and balance without rushing.", "5 reps / 2 series", "info", "")
    ] : [
      item("Torción de cadera con banda elástica", "LUNES - MIÉRCOLES - VIERNES", "Trabajar dirección de cadera, resistencia y control.", "30 reps / 2 series", "video", LINKS.caderaBanda),
      item("Circuito elevacion + sostener + circular", "LUNES - MIÉRCOLES - VIERNES", "Trabajar elevación de rodilla, sostén y control del pateo circular.", "20 reps / 3 series", "video", LINKS.circuitoElevacion),
      item("Ap Chagui contra pared", "LUNES - VIERNES", "Trabajar alineación del Ap Chagui, pierna de apoyo y postura.", "20 reps / 2 series", "video", LINKS.apPared),
      item("Ejercicio de fortalecimiento de tobillo con banda", "LUNES A VIERNES", "Fortalecer tobillo y base de apoyo para un pateo más limpio.", "10 reps por lado / 1 serie", "video", LINKS.tobilloBanda),
      item("Sentadilla Ap Chagui", "LUNES - VIERNES", "Trabajar fuerza de piernas y control técnico de Ap Chagui.", "30 reps (ambas es una) / 2 series", "video", LINKS.sentadillaAp),
      item("Yop Chagui + toque piso + equilibrio", "LUNES - MIÉRCOLES", "Trabajar cámara de Yop Chagui, toque controlado al piso y equilibrio sin prisa.", "5 reps / 2 series", "info", "")
    ];
  }

  function commonErrors(en){
    return en ? [
      "Taeguk 8: avoid lifting the heel too early in the transitions; keep the stance connected before moving forward.",
      "Taeguk 8: avoid throwing the arms before the legs are organized; arms and feet must arrive with control.",
      "Koryo: avoid crossing the feet in line 2; keep the legs encapsulated during the turn and transition.",
      "Koryo: avoid letting the torso fall forward in line 3; keep the chamber, recovery and landing controlled.",
      "Keumgang: avoid opening the Santul Makki preparation too much; keep the path closed and clear.",
      "Keumgang: avoid unstable Jakdari Sogui; the support foot, hip and torso must stay aligned.",
      "Taebaek: avoid soft arm finishes; each block and strike must finish with a clear stop.",
      "Taebaek: avoid rushing the stance transitions; first organize the base, then finish the technique."
    ] : [
      "Taeguk 8: evita levantar el talón antes de tiempo en las transiciones; mantén la posición conectada antes de avanzar.",
      "Taeguk 8: evita lanzar los brazos antes de ordenar las piernas; brazos y pies deben llegar con control.",
      "Koryo: evita cruzar los pies en la línea 2; mantén las piernas en encapsulación durante el giro y la transición.",
      "Koryo: evita que el torso se vaya hacia el frente en la línea 3; mantén cámara, recobro y aterrizaje controlado.",
      "Keumgang: evita abrir demasiado la preparación de Santul Makki; conserva la trayectoria cerrada y clara.",
      "Keumgang: evita un Jakdari Sogui inestable; el pie de apoyo, la cadera y el torso deben mantenerse alineados.",
      "Taebaek: evita terminar los brazos suaves; cada defensa y golpe debe finalizar con un corte claro.",
      "Taebaek: evita correr las transiciones de posiciones; primero organiza la base y después finaliza la técnica."
    ];
  }

  function finalNotes(en){
    return en ? [
      "These next two weeks should be slightly lighter than the previous ones. If you feel overloaded or you are not performing the way you know you can, lower the intensity slightly by removing two reps or lowering the movement height, but always protect the technique. Technique is not negotiable.",
      "We continue focusing on fine details. Do not focus on the maximum speed of the whole poomsae; focus on the speed of each movement and its correct finish.",
      "Have a great training cycle. Let’s keep working properly and giving it everything."
    ] : [
      "Estas siguientes dos semanas deben ser ligeramente menos pesadas que las anteriores. Si sientes que tienes una sobrecarga o no estás rindiendo como tú te conoces, baja ligeramente la intensidad, ya sea quitando dos reps o bajando la altura del movimiento, pero siempre protegiendo la técnica; esa no es negociable.",
      "Seguimos con el enfoque de los detalles finos. No te enfoques en la velocidad máxima de toda la poomsae, sino en la velocidad de cada movimiento y su finalización correcta.",
      "Feliz entrenamiento y seguimos dándole con todo como se debe."
    ];
  }

  function basePoomsae(en){
    return en ? [
      item("Taeguk 8 - Line 1", "MONDAY - WEDNESDAY", "Work arm and leg transitions with clean strikes and stable direction.", "10 min per line / 1 series", "audio", LINKS.t8l1),
      item("Taeguk 8 - Line 2", "MONDAY - WEDNESDAY", "Work punches, arm path and foot transition without rushing the base.", "10 min per line / 1 series", "audio", LINKS.t8l2),
      item("Taeguk 8 - Line 3", "MONDAY - WEDNESDAY", "Work timing, preparation and clear technical finish.", "10 min per line / 1 series", "video", LINKS.t8l3),
      item("Taebaek - Line 3", "TUESDAY - THURSDAY", "Work strong stances, rhythm and precise preparation.", "30 min / 1 series", "audio", LINKS.taebaekL3),
      item("Keumgang Jakdari Sogui", "WEDNESDAY - SATURDAY", "Work Jakdari Sogui with socks, hip control and body alignment.", "15 min per line / 2 series / with socks", "video", LINKS.jakdari),
      item("Koryo - Line 3", "FRIDAY - SATURDAY", "Work Yop Chagui chamber, recovery, torso alignment and controlled landing.", "30 min / 1 series", "audio", LINKS.koryoL3)
    ] : [
      item("Taeguk 8 - Línea 1", "LUNES - MIÉRCOLES", "Trabajar golpes y transiciones de brazos y piernas con dirección estable.", "10 min por línea / 1 serie", "audio", LINKS.t8l1),
      item("Taeguk 8 - Línea 2", "LUNES - MIÉRCOLES", "Trabajar golpes, trayectoria de brazos y transición de pies sin apresurar la base.", "10 min por línea / 1 serie", "audio", LINKS.t8l2),
      item("Taeguk 8 - Línea 3", "LUNES - MIÉRCOLES", "Trabajar timing, preparación y finalización técnica clara.", "10 min por línea / 1 serie", "video", LINKS.t8l3),
      item("Taebaek - Línea 3", "MARTES - JUEVES", "Trabajar posiciones fuertes, ritmo y preparación precisa.", "30 min / 1 serie", "audio", LINKS.taebaekL3),
      item("Keumgang Jakdari Sogui", "MIÉRCOLES - SÁBADO", "Trabajar Jakdari Sogui con calcetas, control de cadera y alineación del cuerpo.", "15 min por línea / 2 series / con calcetas", "video", LINKS.jakdari),
      item("Koryo - Línea 3", "VIERNES - SÁBADO", "Trabajar cámara de Yop Chagui, recobro, torso alineado y aterrizaje controlado.", "30 min / 1 serie", "audio", LINKS.koryoL3)
    ];
  }

  function poomsaeFor(id){
    const en = id === "anna_georgia";
    if(id === "karen_sanchez"){
      return [
        item("Taeguk 4 - Línea 3", "LUNES - MIÉRCOLES", "Trabajar transición, pies y dirección con control.", "10 min por línea", "audio", LINKS.t4l3),
        item("Taeguk 4 - Línea 4", "LUNES - MIÉRCOLES", "Trabajar Ap Chagui, backfist, recobro y ritmo.", "10 min por línea", "video", LINKS.t4l4),
        item("Taeguk 4 - Línea 5", "LUNES - MIÉRCOLES", "Trabajar la referencia de línea 4 y 5 para reforzar continuidad, ritmo y cierre.", "10 min por línea", "audio", LINKS.t4l5),
        item("Keumgang - Línea 3", "MARTES - JUEVES", "Trabajar línea 3 con ritmo claro y control de base.", "10 min / 1 serie", "audio", LINKS.keumgangL3 || "https://drive.google.com/open?id=1qIR-Y7aZQolSGThfIknVjy1WNYZy7JQq&usp=drive_copy"),
        item("Keumgang Jakdari Sogui", "MIÉRCOLES - SÁBADO", "Trabajar Jakdari Sogui con calcetas, control de cadera y alineación del cuerpo.", "10 min por línea / 1 serie / con calcetas", "video", LINKS.jakdari),
        item("Taeguk 7 - Línea 3", "MARTES - JUEVES", "Trabajar línea 3 con calcetas, equilibrio, dirección y preparación exacta.", "10 min / 1 serie / con calcetas", "video", LINKS.t7l3)
      ];
    }
    if(id === "rodrigo_gonzalez"){
      return [
        item("Taeguk 8 - Línea 1", "LUNES - MIÉRCOLES", "Trabajar golpes y transiciones de brazos y piernas con dirección estable.", "10 min por línea / 1 serie", "audio", LINKS.t8l1),
        item("Taeguk 8 - Línea 2", "LUNES - MIÉRCOLES", "Trabajar golpes, trayectoria de brazos y transición de pies sin apresurar la base.", "10 min por línea / 1 serie", "audio", LINKS.t8l2),
        item("Taeguk 8 - Línea 3", "LUNES - MIÉRCOLES", "Trabajar timing, preparación y finalización técnica clara.", "10 min por línea / 1 serie", "video", LINKS.t8l3),
        item("Keumgang Jakdari Sogui", "MARTES - JUEVES", "Trabajar Jakdari Sogui con control de cadera, equilibrio y alineación del cuerpo.", "15 min por línea / 1 serie", "video", LINKS.jakdari)
      ];
    }
    return basePoomsae(en);
  }

  function poomsaeDays(id, en){
    if(id === "karen_sanchez") return "Taeguk 4: LUNES - MIÉRCOLES / Keumgang: MARTES - JUEVES / Jakdari: MIÉRCOLES - SÁBADO / Taeguk 7: MARTES - JUEVES";
    if(id === "rodrigo_gonzalez") return "Taeguk 8: LUNES - MIÉRCOLES / Keumgang Jakdari Sogui: MARTES - JUEVES";
    return en
      ? "Taeguk 8: MONDAY - WEDNESDAY / Taebaek: TUESDAY - THURSDAY / Jakdari: WEDNESDAY - SATURDAY / Koryo: FRIDAY - SATURDAY"
      : "Taeguk 8: LUNES - MIÉRCOLES / Taebaek: MARTES - JUEVES / Jakdari: MIÉRCOLES - SÁBADO / Koryo: VIERNES - SÁBADO";
  }

  function summaryFor(id, en){
    const pDays = poomsaeDays(id, en);
    return en
      ? `ChanonaFlex: before training and assigned days. Active isometrics: Monday-Friday / Tuesday-Thursday / Wednesday-Saturday. Kicking work: Monday-Wednesday-Friday / Monday-Friday / Monday-Wednesday. Poomsae: ${pDays}.`
      : `ChanonaFlex: antes de entrenar y días asignados. Isométrico activo: lunes y viernes / martes y jueves / miércoles y sábado. Pateo técnico: lunes, miércoles y viernes / lunes a viernes / lunes y miércoles. Poomsae: ${pDays}.`;
  }

  function mutatePlan(plan, id){
    if(!plan || !TARGETS.has(id)) return plan;
    const en = id === "anna_georgia";
    plan.updated_at = UPDATED;
    plan.ciclo = CYCLE;
    plan.enfoque_corto = en ? "August 31 to September 12 cycle: fine details and controlled workload" : "Ciclo 31 de agosto al 12 de septiembre: detalles finos y carga controlada";
    plan.enfoque = summaryFor(id, en);
    plan.chanonaflexDias = en ? "Pre-Chanonaflex: before training / Level 3: assigned days" : "Pre-Chanonaflex: ANTES DE ENTRENAR / Nivel 3: DÍAS ASIGNADOS";
    plan.chanonaflex = commonChanonaflex(en);
    plan.isometricoDias = en ? "Glute and Hook: MONDAY - FRIDAY / Yop Chagui Level 1: TUESDAY - THURSDAY / Ap Chagui Level 1: WEDNESDAY - SATURDAY" : "Glúteo y gancho: LUNES - VIERNES / Yop Chagui Nivel 1: MARTES - JUEVES / Ap Chagui Nivel 1: MIÉRCOLES - SÁBADO";
    plan.isometrico = commonIsometric(en);
    plan.pateoDias = en ? "MONDAY - WEDNESDAY - FRIDAY / MONDAY TO FRIDAY / MONDAY - WEDNESDAY" : "LUNES - MIÉRCOLES - VIERNES / LUNES A VIERNES / LUNES - MIÉRCOLES";
    plan.pateoTecnico = commonPateo(en);
    plan.poomsaeDias = poomsaeDays(id, en);
    plan.poomsae = poomsaeFor(id);
    plan.indicacionesExtras = commonErrors(en);
    plan.notasFinales = finalNotes(en);
    return plan;
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      const id = current();
      if(TARGETS.has(id)) mutatePlan(plan, id);
      previousRenderPage(plan, alumno);
      scheduleApply();
    };
  }

  function card(itemData, index, badge){
    const type = itemData.tipo === "audio" ? "AUDIO" : itemData.tipo === "video" ? "VIDEO" : "INFO";
    const action = itemData.url ? `<div class="actions"><a class="action primary" href="${h(itemData.url)}" target="_blank" rel="noreferrer">${itemData.tipo === "audio" ? "🎧 Abrir audio" : "▶ Reproducir"}</a></div>` : "";
    return `<article class="itemRow"><div class="itemTop"><div><p class="itemTitle">${h(itemData.titulo)}</p><div class="meta daysMeta"><b>Días:</b> ${h(itemData.dia)}</div><div class="meta"><b>Enfoque:</b> ${h(itemData.enfoque)}</div><div class="meta"><b>Reps:</b> ${h(itemData.reps)}</div></div><div class="badgeRow"><span class="badge">${index}</span><span class="badge ${type !== "INFO" ? "ok" : ""}">${type}</span><span class="badge red">${h(badge)}</span></div></div>${action}</article>`;
  }

  function notesCard(text, index){
    return `<article class="itemRow"><div class="itemTop"><div><p class="itemTitle">${h(text)}</p></div><div class="badgeRow"><span class="badge">${index}</span><span class="badge">INFO</span></div></div></article>`;
  }

  function renderItems(items, badge){
    if(!items || !items.length) return `<div class="empty">No asignado en este ciclo.</div>`;
    return `<div class="cardsGrid">${items.map((x,i)=>card(x,i+1,badge)).join("")}</div>`;
  }

  function setSection(id, title, subtitle, items, badge){
    const section = document.getElementById(id);
    if(!section) return;
    const h3 = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(h3) h3.textContent = title;
    if(eyebrow) eyebrow.textContent = subtitle;
    if(body) body.innerHTML = renderItems(items, badge);
  }

  function setNotesSection(id, title, subtitle, notes){
    const section = document.getElementById(id);
    if(!section) return;
    const h3 = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(h3) h3.textContent = title;
    if(eyebrow) eyebrow.textContent = subtitle;
    if(body) body.innerHTML = `<div class="cardsGrid">${notes.map((x,i)=>notesCard(x,i+1)).join("")}</div>`;
  }

  function updateHero(){
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

  function updateResumen(id, en){
    const section = document.getElementById("resumen");
    const body = section?.querySelector(".sectionBody");
    if(!body) return;
    const p = body.querySelector("p");
    if(p) p.textContent = summaryFor(id, en);
    [...body.querySelectorAll("li")].forEach(li => {
      const text = (li.textContent || "").toLowerCase();
      if(text.includes("chanonaflex")) li.innerHTML = `<b>ChanonaFlex:</b> ${h(en ? "before training and assigned days" : "antes de entrenar y días asignados")}`;
      if(text.includes("isométr") || text.includes("isometric")) li.innerHTML = `<b>${en ? "Active isometrics" : "Isométricos"}:</b> ${h(en ? "Monday-Friday / Tuesday-Thursday / Wednesday-Saturday" : "lunes y viernes / martes y jueves / miércoles y sábado")}`;
      if(text.includes("pateo") || text.includes("kick")) li.innerHTML = `<b>${en ? "Kicking work" : "Pateo técnico"}:</b> ${h(en ? "Monday-Wednesday-Friday / Monday to Friday / Monday-Wednesday" : "lunes, miércoles y viernes / lunes a viernes / lunes y miércoles")}`;
      if(text.includes("poomsae")) li.innerHTML = `<b>Poomsae:</b> ${h(poomsaeDays(id, en))}`;
    });
  }

  function applyDom(){
    const id = current();
    if(!TARGETS.has(id)) return;
    const en = id === "anna_georgia";
    updateHero();
    updateResumen(id, en);
    setSection("chanonaflex", "ChanonaFlex", en ? "Flexibility" : "Flexibilidad", commonChanonaflex(en), "ChanonaFlex");
    setSection("isometricos", en ? "Active Isometrics" : "Isométricos", en ? "Strength and control" : "Fuerza y control", commonIsometric(en), en ? "Isometric" : "Isométrico");
    setSection("pateo", en ? "Technical Kicking" : "Pateo técnico", en ? "Strength / control / kicking" : "Fuerza / control / pateo", commonPateo(en), en ? "Kicking" : "Pateo");
    setSection("poomsae", "Poomsae", en ? "Specific technical work" : "Trabajo técnico específico", poomsaeFor(id), "Poomsae");
    setNotesSection("extras", en ? "Coach Notes" : "Indicaciones del profesor", en ? "Common mistakes to avoid" : "Errores comunes que debemos evitar", commonErrors(en));
    setNotesSection("notas", en ? "Final Notes" : "Notas finales", en ? "How to work this cycle" : "Cómo trabajar este ciclo", finalNotes(en));
  }

  let queued = false;
  function scheduleApply(){
    if(queued) return;
    queued = true;
    setTimeout(() => { queued = false; applyDom(); }, 80);
  }

  document.addEventListener("click", () => setTimeout(applyDom, 120), true);
  document.addEventListener("change", () => setTimeout(applyDom, 120), true);
  [250, 700, 1200, 2000, 3200, 5000].forEach(ms => setTimeout(applyDom, ms));
})();
